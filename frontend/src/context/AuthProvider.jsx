import React, { useState } from 'react';
import AuthContext from './AuthContext';

// todo: убрать обращение к localStorage везде кроме AuthProvider
const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [loggedIn, setLoggedIn] = useState(user ? true : false);

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
