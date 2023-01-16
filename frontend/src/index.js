import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import store from './slices/index.js';
import ModalComponent from './components/Modals/ModalComponent';
import 'react-toastify/dist/ReactToastify.css';
import './i18next';

const rollbarConfig = {
  accessToken: '57f43b9d49b640e2a3e47f9c2e67e1fe',
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
  </div>
  );
