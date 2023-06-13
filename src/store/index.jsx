import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import playListReducer from "./slices/playlists";

const store = configureStore({
  reducer: {
    playlist: playListReducer,
  },
  devTools: true,
});
export default store;
