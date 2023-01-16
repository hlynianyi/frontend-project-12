import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useState, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import signupPicture from '../assets/signup.jpg';
import routes from '../routes';

const Signup = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, t('errors.loginLength'))
        .max(20, t('errors.loginLength'))
        .required(t('errors.required')),
      password: yup.string()
        .min(6, t('errors.passwordLength'))
        .required(t('errors.required')),
      confirmPassword: yup.string()
        .required(t('errors.required'))
        .oneOf([yup.ref('password'), null], t('errors.confirmation')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        setSubmitting(true);

        const response = await axios.post(routes.signUp(), { username, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);

        setSubmitting(false);
        setSignupFailed(false);

        navigate('/');
      } catch (error) {
        setSubmitting(false);
        if (error.message === 'Network Error') {
          toast.error(t('toastify.network'));
        }
        if (error.response.status === 409) {
          setSignupFailed(true);
        }
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
                <img src={signupPicture} alt={t('signup.title')} className="rounded-circle" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <FloatingLabel
                  controlId="username"
                  label={t('signup.username')}
                  className="mb-3"
                >
                  <Form.Control
                    required
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder={t('signup.username')}
                    name="username"
                    autoComplete="username"
                    isInvalid={signupFailed || formik.errors.username}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label={t('signup.password')}
                  className="mb-3"
                >
                  <Form.Control
                    required
                    placeholder={t('signup.password')}
                    name="password"
                    autoComplete="new-password"
                    type="password"
                    aria-describedby="passwordHelpBlock"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    isInvalid={signupFailed || formik.errors.password}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="confirmPassword"
                  label={t('signup.passwordConfirmation')}
                  className="mb-4"
                >
                  <Form.Control
                    required
                    placeholder={t('signup.passwordConfirmation')}
                    name="confirmPassword"
                    autoComplete="new-password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    isInvalid={signupFailed || formik.errors.confirmPassword}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword || t('errors.userExist')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                  disabled={isSubmitting}
                >
                  {t('signup.toRegister')}
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
