from pydantic import BaseModel

class AudioFile(BaseModel):
    audio_name: str
    audio_url: str
