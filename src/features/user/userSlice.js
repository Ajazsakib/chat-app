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

      console.log(res.data.user, 'called');

      return res.data.user; // Assuming you want to return the user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: {},
  },
  reducers: {
    getProfileSuccess: (state, action) => {
      state.userProfile = action.payload;
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

export const { getProfileSuccess } = userSlice.actions;
export default userSlice.reducer;
