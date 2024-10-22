import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDocQuestions,
  getAllQuestions,
  getQuestion,
} from "./question.service";
const initialState = {
  questions: [],
  isLoading: false,
  error: null,
  documentQuestions: {
    currentQuestion: 0,
    totalQuestions: 0,
    questions: {},
    metadata: {},
  },
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
      })
      .addCase(getQuestion.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentQuestions.currentQuestion = action?.payload?.pageNo;
        state.documentQuestions.questions = action.payload?.question;
        state.documentQuestions.totalQuestions = action.payload?.totalQuestions;
        state.documentQuestions.metadata = action.payload?.metadata;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(getAllDocQuestions.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getAllDocQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.documentQuestions.currentQuestion = action?.payload?.pageNo;
        state.documentQuestions.questions =
          action.payload?.allQuestions?.question;
        state.documentQuestions.totalQuestions = action.payload?.totalQuestions;
        state.documentQuestions.metadata = action.payload?.metadata;
      })
      .addCase(getAllDocQuestions.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export default questionSlice.reducer;
