import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestions } from "./question.service";
const initialState = {
  questions: [],
  isLoading: false,
  error: null,
  selectedQuetion: {},
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export default questionSlice.reducer;
