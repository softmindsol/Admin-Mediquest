import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestions, getDocumentQuestion } from "./question.service";
const initialState = {
  questions: [],
  isLoading: false,
  error: null,
  documentQuestions: {
    currentPage: 0,
    totalPages: 0,
    questions: [],
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
      .addCase(getDocumentQuestion.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getDocumentQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentQuestions.currentPage = action?.payload?.currentPage;
        state.documentQuestions.questions =action.payload?.questions
        state.documentQuestions.totalPages = action.payload?.totalPages
        state.documentQuestions.metadata = action.payload?.metadata
      })
      .addCase(getDocumentQuestion.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export default questionSlice.reducer;
