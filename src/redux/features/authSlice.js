import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    details: "",
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    }
    
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
