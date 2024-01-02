import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterBy: null,
};
export const filterOptionSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterOption: (state, action) => {
      console.log("Filtering data by : ", action.payload);
      state.filterBy = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFilterOption } = filterOptionSlice.actions;

export default filterOptionSlice.reducer;
