import { useState } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;