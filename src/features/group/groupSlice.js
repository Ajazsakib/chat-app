import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

export const createGroupAsync = createAsyncThunk(
  'group/create',
  async (groupData, thunkAPI) => {
    try {
      const res = await axios.post(
        'https://demo-react-ugyr.onrender.com/api/chat/create_chat',
        groupData,
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

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    showCreateGroupPopup: false,
    hideCreateGroupPopup: false,
    groupChat: [],
  },
  reducers: {
    openCreateGroupPopup: (state, action) => {
      state.showCreateGroupPopup = true;
    },
    closeCreateGroupPopup: (state, action) => {
      state.showCreateGroupPopup = false;
    },
    success: (state, action) => {
      state.groupChat = action.payload;
    },
  },
});

export const { openCreateGroupPopup, closeCreateGroupPopup, success } =
  groupSlice.actions;
export default groupSlice.reducer;
