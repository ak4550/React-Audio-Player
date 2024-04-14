import './App.css';
import Login from './components/login/login';
import Home from './components/home/home';
import React, { useContext } from 'react';
import AppState from './store/AppState';

function App() {
  const ctx = useContext(AppState);
  return (
    <>
      {ctx.token ? <Home /> : <Login />}
    </>
  )
}

export default App;