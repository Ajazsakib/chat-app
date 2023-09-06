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

export const fetchGroupMemberAsync = createAsyncThunk(
  'group/fetch',
  async (chatId, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://demo-react-ugyr.onrender.com/api/chat/getGroupUser?id=${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data);
      thunkAPI.dispatch(fetchMemberAsync(res.data.data));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    showCreateGroupPopup: false,

    showAddmemberPopup: false,

    showMembarInGroup: false,

    groupChat: [],

    memberInGroup: [],
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
    openAddMemberPopup: (state) => {
      state.showAddmemberPopup = true;
    },
    closeAddMemberPopup: (state) => {
      state.showAddmemberPopup = false;
    },
    openMemberInGroupPopup: (state) => {
      state.showMembarInGroup = true;
    },
    closeMemberInGroupPopup: (state) => {
      state.showMembarInGroup = false;
    },
    fetchMemberAsync: (state, action) => {
      state.memberInGroup = action.payload;
    },
  },
});

export const {
  openCreateGroupPopup,
  closeCreateGroupPopup,
  success,
  openAddMemberPopup,
  closeAddMemberPopup,
  openMemberInGroupPopup,
  closeMemberInGroupPopup,
  fetchMemberAsync,
  memberInGroup,
} = groupSlice.actions;
export default groupSlice.reducer;
