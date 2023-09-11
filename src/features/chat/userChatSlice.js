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

export const addMemberInGroupAsync = createAsyncThunk(
  'userChat/chat',
  async (data, thunkAPI) => {
    try {
      const res = axios.post(
        ' https://demo-react-ugyr.onrender.com/api/chat/addUsers',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res, '>>>>>>>>>>>>>');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userChatSlice = createSlice({
  name: 'userChat',
  initialState: {
    toggle: true,
    showPopup: false,
    getAllChat: [],
    getAllMessages: [],
    chatId: localStorage.getItem('currentChatId') || 0,
    rcvId: 0,
    chatIsGroup: false,
    chatIsOneToOne: false,
    groupChatTitle: '',
  },

  reducers: {
    openCommonPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    closeCommonPopup: (state) => {
      state.showPopup = '';
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
    setReceiverId: (state, action) => {
      state.rcvId = action.payload;
    },
    setToggle: (state, _action) => {
      state.toggle = !state.toggle;
    },
    chatIsGroup: (state) => {
      state.chatIsGroup = true;
    },
    chatIsOneToOne: (state) => {
      state.chatIsGroup = false;
    },
    setGroupChatTitle: (state, action) => {
      state.groupChatTitle = action.payload;
    },
  },
});

export const {
  openCommonPopup,
  closeCommonPopup,
  success,
  fetchChatId,
  fetchMessageAsync,
  setReceiverId,
  setToggle,
  chatIsGroup,
  chatIsOneToOne,
  setGroupChatTitle,
} = userChatSlice.actions;
export default userChatSlice.reducer;
