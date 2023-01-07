import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import Error from './ErrorPage.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import socket from '../socket.js';
import { actions as messageActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';


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
      <Navbar bg="white" expand="lg" className ="shadow-sm">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <Button>Выйти</Button>
        </div>
      </Navbar>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Error />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
