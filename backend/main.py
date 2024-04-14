from datetime import timedelta
from typing import Annotated, List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from models.users_and_token import Token, User
from security.security import get_current_active_user, authenticate_user
from security.security import create_access_token, oauth2_scheme
from util.fake_db import fake_users_db
from util.fake_audio_data import data as audio_data
from models.audio_file import AudioFile
from util.config import ACCESS_TOKEN_EXPIRE_MINUTES


app = FastAPI()

origins = [
    "http://localhost",
    "http://127.0.0.1:3000/*",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:3000/*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/get-audio-files", response_model=List[AudioFile])
async def get_audio_files(
        token: str = Depends(oauth2_scheme)
):
    return [AudioFile(**item) for item in audio_data]
