/* eslint-disable import/no-anonymous-default-export */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import io from 'socket.io-client';
import resources from './locales/index';
import App from './components/App';
import store from './slices/index';
import ModalComponent from './components/Modals/ModalComponent';
import 'react-toastify/dist/ReactToastify.css';

export const socket = new io();

export default () => {
  i18n.use(initReactI18next).init({
    fallbackLng: 'ru',
    resources,
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  const root = ReactDOM.createRoot(document.getElementById('chat'));

  root.render(
    <div className="d-flex flex-column h-100">
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
            <ModalComponent />
            <ToastContainer />
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </div>,
  );
};
