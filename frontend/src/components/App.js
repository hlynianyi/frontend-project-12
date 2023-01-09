import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { actions as messageActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import Error from './ErrorPage.jsx';
import NavigationBar from './NavigationBar.jsx';
import socket from '../socket.js';
import AuthProvider from '../context/AuthProvider';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token');
  return isAuth ? <Outlet /> : <Navigate to="/login"/>
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messageActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
  })

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<Error />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
