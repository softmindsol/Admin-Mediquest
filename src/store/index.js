import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
const store = configureStore({
  reducer: {
    admin: authSlice,
  },
});

export default store;
