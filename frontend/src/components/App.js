import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter, Route, Routes, Navigate, Outlet,
} from 'react-router-dom';
import { actions as messageActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import Error from './ErrorPage.jsx';
import NavigationBar from './NavigationBar.jsx';
import socket from '../socket.js';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token');
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

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
  });

  return (
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
};

export default App;
