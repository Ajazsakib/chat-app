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

export const fetchMsgAsync = createAsyncThunk(
  'userChat/chat',
  async (chatId, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://demo-react-ugyr.onrender.com/api/msg/getMsg?chatId=${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      thunkAPI.dispatch(fetchMessageAsync(res.data.msgInfo));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendMessageAsync = createAsyncThunk(
  'userChat/chat',
  async (message, thunkAPI) => {
    try {
      const res = axios.post(
        'https://demo-react-ugyr.onrender.com/api/msg/sendMsg',
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    getAllMessages: [],
    chatId: localStorage.getItem('currentChatId') || 0,
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
    fetchChatId: (state, action) => {
      state.chatId = action.payload;
    },
    fetchMessageAsync: (state, action) => {
      state.getAllMessages = action.payload;
    },
  },
});

export const {
  openUserCreatePopup,
  closeUserCreatePopup,
  success,
  fetchChatId,
  fetchMessageAsync,
} = userChatSlice.actions;
export default userChatSlice.reducer;
