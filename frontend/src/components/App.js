import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Navigate,
  Outlet
} from 'react-router-dom';
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
    // socket.on(, (payload) => {
    //   dispatch()
    // });
    // socket.on(, (payload) => {
    //   dispatch()
    // });
    // socket.on(, (payload) => {
    //   dispatch()
    // });
  })

  return (
    <BrowserRouter>
      <Navbar bg="white" expand="lg" className ="shadow-sm">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <Button>Выйти</Button>
          {/* <AuthButton /> */}
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

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from 'react-router-dom';
// import { Button, Navbar } from 'react-bootstrap';
// import Nav from './components/Nav.jsx';
// import Login from './components/Login.jsx';
// import ErrorPage from './components/ErrorPage.jsx';
// import Home, { loader as rootLoader } from './components/Home.jsx';

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Home />,
//       errorElement: <ErrorPage />,
//       loader: rootLoader,
//     },
//     {
//       path: 'login',
//       element: <Login />,
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router}>
      
//       </RouterProvider>
//     </div>
    
    
//   );
// };

// export default App;