import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './init.js';
import { Provider } from 'react-redux';
import store from './slices/index';

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(
  <div className="d-flex flex-column h-100">
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
);
