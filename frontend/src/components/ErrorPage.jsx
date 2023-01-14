import React from 'react';
import { useTranslation } from 'react-i18next';
import NotFoundPic from '../assets/not_found_page.svg';

const Error = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img className="img-fluid h-25" src={NotFoundPic} alt="Page was not Found" />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.suggestion1')}
        <a href="/">{t('notFound.suggestionLink')}</a>
      </p>
    </div>
  );
};

export default Error;
