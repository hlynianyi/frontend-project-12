import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import ModalComponent from './components/Modals/ModalComponent';
import './i18next';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <div className='d-flex flex-column h-100'>
    <Provider store={store}>
      <App />
      <ModalComponent />
    </Provider>
  </div>
  
);
