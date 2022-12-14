import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import Pic from '../pictures/login.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();

  useEffect(() => {

  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const userToken = await axios.post('/api/v1/login', values);
        console.log(': usertoken :', userToken.data)
      } catch {
        formik.setErrors();
      }
      
    },
  });

  return (
    <div className="container-fuild h-100">
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-121 col-md-6 d-flex align-items-center justify-content-center'>
                <img src={Pic} className='rounded-circle' alt="Войти"/>
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control 
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="Ваш ник"
                    id="username"
                    name="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                    disabled={formik.isSubmitting}
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="Пароль"
                    id="password"
                    name="password"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={formik.isSubmitting} variant="outline-primary">Войти</Button>
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