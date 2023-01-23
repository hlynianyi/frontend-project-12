import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './init.js';
import store from './slices/index';

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(
  <div className="d-flex flex-column h-100">
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
);
