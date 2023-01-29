import React from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import Router from './Router';
import ModalComponent from './Modals/ModalComponent';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../context/AuthProvider';
import SocketContext from '../context/SocketContext';
import { actions as messageActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const App = () => {
  const dispatch = useDispatch();
  const socket = io();

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

  const promisifyEmit = (event) => (...args) => 
    new Promise((resolve, reject) => {
      switch (event) {
        case 'newMessage': {
          socket.emit(event, ...args, (response) => {
            if (response.status === 'ok') {
              resolve(response.status);
            } else {
              reject(response);
            }
          });
          break;
        }
        case 'newChannel': {
          const extract = args[0];
          const { name } = extract;
          socket.emit(event, { name }, (response) => {
            if (response.status === 'ok') {
              dispatch(channelsActions.setCurrentChannelId(response.data.id));
              resolve(response.status);
            } else {
              reject(response);
            }
          });
          break;
        }
        case 'renameChannel': {
          const extract = args[0];
          const { id, name } = extract;
          socket.emit('renameChannel', { id, name }, (response) => {
            if (response.status === 'ok') {
              resolve(response.status);
            } else {
              reject(response);
            }
          });
          break;
        }
        case 'removeChannel': {
          const extract = args[0];
          const { id } = extract;
          socket.emit('removeChannel', { id }, (response) => {
            if (response.status === 'ok') {
              resolve(response.status);
            } else {
              reject(response);
            }
          });
          break;
        }
        default:
          throw new Error('Неизвестная ошибка');
      }
    });

  const socketApi = {
    newMessage: promisifyEmit('newMessage'),
    newChannel: promisifyEmit('newChannel'),
    removeChannel: promisifyEmit('removeChannel'),
    renameChannel: promisifyEmit('renameChannel'),
  };

  return (
    <AuthProvider>
      <SocketContext.Provider value={socketApi}>
        <Router />
        <ModalComponent />
        <ToastContainer />
      </SocketContext.Provider>
    </AuthProvider>
  );
};

export default App;
