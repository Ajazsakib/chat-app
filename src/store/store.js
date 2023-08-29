import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import formReducer from '../features/form/formSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    user: userReducer,
  },
});
