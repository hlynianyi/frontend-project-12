import axios from 'axios';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, FloatingLabel, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import signupPicture from '../assets/signup.jpg';
import * as yup from 'yup';

const Signup = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({     
      username: yup.string()
        .min(3)
        .max(20,)
        .required('Обязательное поле'),        
      password: yup.string()
        .min(6)
        .max(20,)
        .required('Обязательное поле'),     
      confirmPassword: yup.string()
        .min(6)
        .max(20,)
        .required('Обязательное поле')
        .oneOf([yup.ref('password'), null], 'Пароль должен совпадать'),     
    }),
    onSubmit: async ({ username, password }) => {
      try {
        setSubmitting(true);
        const response = await axios.post('/api/v1/signup', {username, password});
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);
        setSubmitting(false);
        setSignupFailed(false);
        navigate('/');
      } catch (e){
        console.log('e :>> ', e);
        setSubmitting(false);
        // if (e.response.status === 409) {
        //   return setSignupFailed(true);
        // }
        setSignupFailed(true);
      }
    },
  });

  const inputRef = useRef();
    useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupPicture} alt="Регистрация" className="rounded-circle"/>
              </div>
              <Form onSubmit={formik.handleSubmit} className='w-50'>
                <h1 className='text-center mb-4'>Регистрация</h1>
                <FloatingLabel
                  controlId='username'
                  label='Имя пользователя'
                  className="mb-3" >
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  placeholder="Имя пользователя"
                  id="username"
                  name="username"
                  autoComplete="username"
                  isInvalid={signupFailed || formik.errors.username}
                  disabled={formik.isSubmitting} />
                <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId='password'
                  label='Пароль'
                  className='mb-3' >
                  <Form.Control
                    required
                    placeholder="Пароль"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    type='password'
                    aria-describedby='passwordHelpBlock'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    isInvalid={signupFailed || formik.errors.password}
                    disabled={formik.isSubmitting} />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId='confirmPassword'
                  label='Подтвердите пароль'
                  className='mb-4' >
                  <Form.Control
                    required
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    autoComplete="new-password"
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    isInvalid={signupFailed || formik.errors.confirmPassword}
                    disabled={formik.isSubmitting} />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword || 'Пользователь существует'}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                  disabled={isSubmitting} >
                  Зарегистрироваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;