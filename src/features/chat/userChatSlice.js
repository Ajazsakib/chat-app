import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const userChatSlice = createSlice({
    name: "userChat",
    initialState: {
        showUserCreatePopup: false
    },

    reducers: {
        openUserCreatePopup: (state) =>
        {
            state.showUserCreatePopup = true
        },
        closeUserCreatePopup: (state) =>
        {
            state.showUserCreatePopup = false
        }
    }
})




export const { openUserCreatePopup, closeUserCreatePopup } = userChatSlice.actions
export default userChatSlice.reducer