// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";




const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, 
    items : [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setUser, clearUser , setItems } = authSlice.actions;
export default authSlice.reducer;