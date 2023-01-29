import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index';

const init = async () => {
  const i18n = i18next.createInstance();

  i18n.use(initReactI18next).init({
    fallbackLng: 'ru',
    resources,
  });
  
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default init;
