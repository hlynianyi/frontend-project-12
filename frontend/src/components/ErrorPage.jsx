import React from 'react';
import NotFoundPic from '../assets/not_found_page.svg';

const Error = () => {
  return (
    <div className="text-center">
    <img className='img-fluid h-25' src={NotFoundPic} alt="Page was not Found" />
    <h1 className='h4 text-muted'>Страница не найдена!</h1>
    <p className='text-muted'>Но вы можете перейти 
      <a href="/"> на главную страницу</a>
    </p>
  </div>
  );
}

export default Error;