import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  RouterProvider,
  Link,
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { Formik } from 'formik';
import Blank from './components/Blank.jsx';
import Login from './components/Login.jsx';

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const logIn = () => {};
  const logOut = () => {};

  useEffect(() => {

  });
  return (<>{children}</>);
}

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      
      <AuthProvider>
        <BrowserRouter>
          <Navbar bg="white" expand="lg" className ="shadow-sm">
            <div className="container">
              <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
              <Button>Выйти</Button>
              {/* <AuthButton /> */}
            </div>
          </Navbar>
          <Routes>
            <Route path="*" element={<Blank />}/>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
