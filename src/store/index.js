import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
import questionSlice from "./features/questions/question.slice";
const store = configureStore({
  reducer: {
    admin: authSlice,
    questions: questionSlice,
  },
});

export default store;
