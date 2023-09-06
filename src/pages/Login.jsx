import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import validationSchema from '../validation/login';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../features/auth/authSlice';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const errorMessage = useSelector((state) => {
    return state.auth.errorMessage;
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const isLogin = useSelector((state) => state.auth.isLogin);

  const handleSubmit = async (userData) => {
    setIsLoading(true);
    try {
      dispatch(loginUserAsync(userData));
      dispatch(loginSuccess());
    } catch (err) {
      console.log('Error in login', err);
      dispatch(loginFailure('Some thing wrong went'));
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const token = localStorage.getItem('token');
  const renderPage = async () => {
    if (token) {
      navigate('/');
    }
  };

  useEffect(() => {
    renderPage();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="form-wrap">
          <div className="main-heading">
            <h3>Login</h3>
            {errorMessage ? (
              <h5 style={{ color: '#c20302' }}>{errorMessage}</h5>
            ) : null}
          </div>
          <div className="form-box">
            <div className="form-group">
              <Field
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {isLoading && (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Login
              </button>
            </div>
          </div>
          <div className="go-to-back">
            <Link to="/register">Register</Link>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
