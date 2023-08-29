import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../features/auth/authSlice';
import { registerSuccess, registerFailure } from '../features/auth/authSlice';
import validationSchema from '../validation/register';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const initialValues = {
    username: '',
    phoneNumber: 0,
    email: '',
    password: '',
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isRegistered = useSelector((state) => state.auth.isRegistered);

  const handleSubmit = async (userData) => {
    console.log(userData);
    try {
      dispatch(registerUserAsync(userData));
      dispatch(registerSuccess());
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(registerFailure());
    }
    if (isRegistered) {
      alert('Data Submitted Succesfully');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="form-wrap">
          <div className="main-heading">
            <h3>Register</h3>
          </div>
          <div className="form-box">
            <div className="form-group">
              <Field
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="Contact Number"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error"
              />
            </div>
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
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </div>
          </div>
          <div className="go-to-back">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
