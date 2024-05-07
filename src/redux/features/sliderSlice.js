
import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "sidebar",
  initialState: {
    isSlider: false,
  },
  reducers: {
    slider: (state, action) => {
      return {
        ...state,
        isSlider: action.payload,
      };
    },
  },
});

export const { slider } = sliderSlice.actions;

export default sliderSlice.reducer;
