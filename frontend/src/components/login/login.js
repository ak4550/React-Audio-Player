import React, { useState, useContext } from 'react';
import { Container, TextField, Button } from '@mui/material'
import { Typography } from '@mui/material';
import styles from './login.module.css';
import { ApiService } from '../../service/ApiService';
import AppState from '../../store/AppState';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const ctx = useContext(AppState);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateUsernamePassword = () => {
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length <= 3 || password.length <= 3){
      setError("Username or Password Can't have less 3 characters.")
      return
    }

    try {
      const resp = await ApiService.verifyUser(username, password);
      const token = resp.data.access_token
      ctx.setToken(token);
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      console.error(error);
      setError(error.response.data.detail);
    }

    // Reset the form
    setUsername('');
    setPassword('');
  };


  return (
    <Container component="main" maxWidth="xs"
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <h1>TransOrg</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          className={styles.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={handleUsername}
        />
        <TextField
          className={styles.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error &&
          <Typography align='center'>
            {error}
          </Typography>
        }
        <Button
          className={styles.Button}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
