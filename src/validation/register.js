// src/validationSchema.js
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  phoneNumber: Yup.number().required('Contact is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  // Add more validation rules for other fields
});

export default validationSchema;
