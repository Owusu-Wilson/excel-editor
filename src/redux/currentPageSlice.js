import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "home",
};
export const currentPageSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    switchPage: (state, action) => {
      console.log("Switch page action called with: ", action.payload);
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
