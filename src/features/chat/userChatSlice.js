import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

export const fetchChatAsync = createAsyncThunk(
  'userChat/chat',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        'https://demo-react-ugyr.onrender.com/api/chat/getChats',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      thunkAPI.dispatch(success(res.data.getChat));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userChatSlice = createSlice({
  name: 'userChat',
  initialState: {
    showUserCreatePopup: false,
    getAllChat: [],
  },

  reducers: {
    openUserCreatePopup: (state) => {
      state.showUserCreatePopup = true;
    },
    closeUserCreatePopup: (state) => {
      state.showUserCreatePopup = false;
    },
    success: (state, action) => {
      state.getAllChat = action.payload;
    },
  },
});

export const { openUserCreatePopup, closeUserCreatePopup, success } =
  userChatSlice.actions;
export default userChatSlice.reducer;
