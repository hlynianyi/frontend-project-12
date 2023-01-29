import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [loggedIn, setLoggedIn] = useState(user);

  const logIn = (tkn, username) => {
    localStorage.setItem('token', tkn);
    localStorage.setItem('user', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={
      {
        loggedIn, logIn, logOut, user, token
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
