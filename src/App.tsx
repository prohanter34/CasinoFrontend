import React, { useEffect } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import Main from './Components/Main/Main';
import Auth from './Components/Auth/Auth';
import { useDispatch } from 'react-redux';
import { authByCookiesThunk } from './store/authReducer';

function App() {

  const location = useLocation()
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(authByCookiesThunk())
  }, [])

  if (location.pathname === "/auth/login" || location.pathname === "/auth/registration") {
    return <Auth />
  } else {
    return <Main />
  }

}

export default App;
