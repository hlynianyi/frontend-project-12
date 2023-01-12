import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import loginPicture from '../assets/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button, } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setSubmitting(true);

        const { data } = await axios.post('/api/v1/login', values);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.username);

        setAuthFailed(false);
        setSubmitting(false);

        navigate('/')
      } catch (error){
        setSubmitting(false);
        if (error.message === 'Network Error') {
          toast.error(t('toastify.network'));
        };
        if (error.response.status === 401) {
          setAuthFailed(true);
        };
      };
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fuild h-100">
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img src={loginPicture} className='rounded-circle' alt="Войти"/>
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">
                  {t('login.entry')}
                </h1>
                <FloatingLabel
                  controlId='username'
                  label={t('login.username')}
                  className="mb-3">
                  <Form.Control
                    required
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder={t('login.username')}
                    name="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    disabled={formik.isSubmitting}/>
                </FloatingLabel>
                <FloatingLabel
                  controlId='password'
                  label={t('login.password')}
                  className='mb-4'>
                  <Form.Control 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder={t('login.password')}
                    name="password"
                    autoComplete="password"
                    isInvalid={authFailed}
                    required
                    disabled={formik.isSubmitting} />
                  <Form.Control.Feedback type='invalid' tooltip>
                    {t('errors.login')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button className="w-100 mb-3" type="submit" disabled={isSubmitting} variant="outline-primary">{t('login.entry')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('login.question')}</span>
                  {t('login.space')}
                  <Link to="/signup">{t('login.signup')}</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;