import React from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import Main from './Components/Main/Main';
import Auth from './Components/Auth/Auth';

function App() {

  const location = useLocation()

  if (location.pathname === "/auth/login" || location.pathname === "/auth/registration") {
    return <Auth />
  } else {
    return <Main />
  }

}

export default App;
