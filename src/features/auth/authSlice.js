import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerUser } from './api';
import { loginUser } from './api';
export const registerUserAsync = createAsyncThunk(
  'user/sign_up',
  async (userData, thunkAPI) => {
    try {
      const res = await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        'https://demo-react-ugyr.onrender.com/api/user/login',
        userData
      );
      localStorage.setItem('token', res.data.jwtToken);
    } catch (error) {
      thunkAPI.dispatch(loginFailure('msggg'));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    errorMessage: null,
    isRegistered: false,
    isLogin: false,
  },
  reducers: {
    registerSuccess: (state) => {
      state.isLoading = false;
      state.isRegistered = true;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isLogin = true;
    },
    loginFailure: (state, action) => {
      state.errorMessage = action.payload;
      state.isLogin = false;
    },
  },
});

export const { registerSuccess, registerFailure, loginFailure, loginSuccess } =
  authSlice.actions;

export default authSlice.reducer;
