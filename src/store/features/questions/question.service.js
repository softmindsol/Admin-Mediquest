import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithoutToken } from "../../../api";
import toast from "react-hot-toast";

export const uploadQuestions = createAsyncThunk(
  "uploadQuestion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post(
        "/questions/add-questions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        console.log(error);
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);
export const getAllQuestions = createAsyncThunk(
  "getAllQuestions",
  async (
    {
      topic,
      semester,
      city,
      startDate,
      endDate,
      deployed,
      exam_variable,
      search,
      pageNo,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      // Constructing the params object conditionally
      const params = {
        ...(topic && { topic }),
        ...(semester && { semester }),
        ...(city && { city }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(deployed !== undefined && { deployed }),
        ...(exam_variable && { exam_variable }),
        ...(search && { search }),
        ...(pageNo !== undefined && { pageNo }),
      };

      const response = await axiosWithoutToken.get(`/questions/get-questions`, {
        params,
      });

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
      return rejectWithValue(error);
    }
  }
);


export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async ({ documentId, questionId }, { rejectWithValue }) => {
    console.log("Hello from delete request", documentId, questionId);

    try {
      const response = await axiosWithoutToken.delete(
        `/questions/delete-question/${documentId}/${questionId}`
      );
      toast.success(response?.data?.message);
      console.log(response.data);

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
      return rejectWithValue(error);
    }
  }
);


