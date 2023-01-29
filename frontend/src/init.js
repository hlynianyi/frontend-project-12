import React from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import io from 'socket.io-client';
import resources from './locales/index';
import Router from './components/Router';
import ModalComponent from './components/Modals/ModalComponent';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider';
import SocketContext from './context/SocketContext';
import { actions as messageActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';


i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  resources,
});

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};



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

  const promisifyEmit = (socket, event) => (...args) => {
    return new Promise((resolve, reject) => {
      console.log('args', args);
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
  };

  const socketApi = {
    newMessage: promisifyEmit(socket, 'newMessage'),
    newChannel: promisifyEmit(socket, 'newChannel'),
    removeChannel: promisifyEmit(socket, 'removeChannel'),
    renameChannel: promisifyEmit(socket, 'renameChannel'),
    // newChannel: (name) => {
    //   socket.emit('newChannel', { name }, (response) => {
    //     if (response.status === 'ok') {
    //       dispatch(channelsActions.setCurrentChannelId(response.data.id));
    //     }
    //   });
    // },
    // removeChannel: (id) => socket.emit('removeChannel', { id }, (response) => {
    //   if (response.status === 'ok') {
    //     return response.status;
    //   }
    // }),
    // renameChannel: (id, name) => socket.emit('renameChannel', { id, name }, (response) => {
    //   if (response.status === 'ok') {
    //     return response.status;
    //   }
    // }),
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <SocketContext.Provider value={socketApi}>
            <Router />
            <ModalComponent />
            <ToastContainer />
          </SocketContext.Provider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
