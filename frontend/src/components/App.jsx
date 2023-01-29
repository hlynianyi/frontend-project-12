import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './Router';
import ModalComponent from './Modals/ModalComponent';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../context/AuthProvider';

const App = () => (
  <AuthProvider>
    <Router />
    <ModalComponent />
    <ToastContainer />
  </AuthProvider>
);

export default App;
