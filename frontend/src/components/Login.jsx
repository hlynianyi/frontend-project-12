import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import loginPicture from '../assets/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button, } from 'react-bootstrap';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
      const userToken = await axios.post('/api/v1/login', values);
      localStorage.setItem('token', userToken.data.token);
      localStorage.setItem('user', userToken.data.username);
      setAuthFailed(false);
      navigate('/')
      } catch (e){
        console.log('Token issue.. (login.jsx)', e);
        setAuthFailed(true);
        formik.resetForm();
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
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel
                  controlId='username'
                  label='Ваш ник'
                  className="mb-3">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  placeholder="Ваш ник"
                  id="username"
                  name="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  disabled={formik.isSubmitting}/>
                </FloatingLabel>
                <FloatingLabel
                  controlId='password'
                  label='Пароль'
                  className='mb-4'>
                  <Form.Control 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="Пароль"
                    id="password"
                    name="password"
                    autoComplete="password"
                    isInvalid={authFailed}
                    required
                    disabled={formik.isSubmitting} />
                  <Form.Control.Feedback type='invalid' tooltip>
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button className="w-100 mb-3" type="submit" disabled={formik.isSubmitting} variant="outline-primary">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <Link to="/signup"> Регистрация</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;