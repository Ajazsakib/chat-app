import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfileDetailAsync = createAsyncThunk(
  'user/profile',
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(
        'https://demo-react-ugyr.onrender.com/api/user/userDetails',

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.user; // Assuming you want to return the user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const token = localStorage.getItem('token');
export const updateProfileDetailAsync = createAsyncThunk(
  'user/update',
  async (updateData, thunkAPI) => {
    try {
      const res = await axios.post(
        'https://demo-react-ugyr.onrender.com/api/user/update_user',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, 'update');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchUserAsync = createAsyncThunk(
  'user/search',
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://demo-react-ugyr.onrender.com/api/user/searchUser?q=${query}`
      );

      thunkAPI.dispatch(setSearchResults(res.data));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUserChatAsync = createAsyncThunk(
  'user/chat',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        'https://demo-react-ugyr.onrender.com/api/chat/create_chat',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, 'user response');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: {},
    query: '',
    searchUserResult: [],
  },
  reducers: {
    getProfileSuccess: (state, action) => {
      state.userProfile = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchUserResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileDetailAsync.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getProfileDetailAsync.rejected, (state, action) => {
        // Handle rejected case, if needed
      });
  },
});

export const { getProfileSuccess, setSearchResults } = userSlice.actions;
export default userSlice.reducer;
