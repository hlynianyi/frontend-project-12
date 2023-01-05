import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './slices/index.js';
// i18next

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <div className='d-flex flex-column h-100'>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
  
);
