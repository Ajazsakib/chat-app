import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import formReducer from '../features/form/formSlice';
import userReducer from '../features/user/userSlice';
import groupReducer from '../features/group/groupSlice';
import userChatReducer from "../features/chat/userChatSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    user: userReducer,
    group: groupReducer,
    userChat: userChatReducer
  },
});
