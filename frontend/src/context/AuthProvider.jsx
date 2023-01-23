import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
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
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
