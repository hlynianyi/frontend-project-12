import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import io from 'socket.io-client';
import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index';
import SocketContext from './context/SocketContext';
import { actions as messageActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    fallbackLng: 'ru',
    resources,
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messageActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });

  const promisifyEmit = (fn) => (...args) => new Promise((resolve, reject) => {
    fn(...args, (response) => {
      if (response.status === 'ok') {
        resolve(response.status);
      } else {
        reject(response);
      }
    });
  });

  const socketApi = {
    newMessage: promisifyEmit(socket.emit.bind(socket, 'newMessage')),
    newChannel: promisifyEmit(socket.emit.bind(socket, 'newChannel')),
    renameChannel: promisifyEmit(socket.emit.bind(socket, 'renameChannel')),
    removeChannel: promisifyEmit(socket.emit.bind(socket, 'removeChannel')),
  };

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <SocketContext.Provider value={socketApi}>
              <App />
            </SocketContext.Provider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default init;
