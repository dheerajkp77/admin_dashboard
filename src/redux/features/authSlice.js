
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    details: "",
    cartCount: 0,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    cartCount: (state, action) => {
      return {
        ...state,
        cartCount: action.payload,
      };
    },
  },
});

export const { login, cartCount } = authSlice.actions;

export default authSlice.reducer;
