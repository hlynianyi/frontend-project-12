import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import ModalComponent from './components/Modals/ModalComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '5790453b9cb7441d9130fba46a61f056',
  environment: 'production',
};


function TestError() {
  const a = null;
  return a.hello();
}

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(
  <div className='d-flex flex-column h-100'>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <Provider store={store}>
          <App />
          <ModalComponent />
          <ToastContainer />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </div>
);
