import React from 'react';
import {
  BrowserRouter, Route, Routes, Navigate, Outlet,
} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import Error from './ErrorPage.jsx';
import NavigationBar from './NavigationBar.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/index.jsx';
import { Container } from 'react-bootstrap';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const Router = () => (
  <BrowserRouter>
    <Container className='d-flex flex-column h-100'>
      <NavigationBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Container>
    
  </BrowserRouter>
);

export default Router;
