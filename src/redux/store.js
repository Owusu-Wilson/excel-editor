import { configureStore } from "@reduxjs/toolkit";
import currentPageReducer from "./currentPageSlice";
import filterOptionReducer from "./filterOptionSlice";

export const store = configureStore({
  reducer: {
    navigation: currentPageReducer,
    filter: filterOptionReducer,
  },
});
