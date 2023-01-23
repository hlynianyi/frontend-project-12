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

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const Router = () => (
  <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<Error />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
