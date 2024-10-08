import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
const store = configureStore({
  reducer: {
    user: authSlice,
  },
});

export default store;
