import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosWithToken } from "../../../api";

export const uploadQuestions = createAsyncThunk(
  "uploadQuestion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post(
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
        error?.response?.data?.error &&
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

      const response = await axiosWithToken.get(`/questions/get-questions`, {
        params,
      });

      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.error && toast.error(error?.response?.data?.error);
      return rejectWithValue(error);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async ({ documentId, questionId }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.delete(
        `/questions/delete-question/${documentId}/${questionId}`
      );
      toast.success(response?.data?.message);

      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.error && toast.error(error?.response?.data?.error);
      return rejectWithValue(error);
    }
  }
);

// export const getSingleQuestion = createAsyncThunk(
//   "getSingleQuestion",
//   async ({ documentId, questionId }, { rejectWithValue }) => {
//     try {
//       const response = await axiosWithToken.patch(
//         `/questions/get-single-question/${documentId}/${questionId}`
//       );
//       return response?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error);
//       return rejectWithValue(error);
//     }
//   }
// );

export const editQuestion = createAsyncThunk(
  "editQuestion",
  async ({ documentId, questionId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.patch(
        `/questions/update-question/${documentId}/${questionId}`,
        data
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      error?.response?.data?.error && toast.error(error?.response?.data?.error);
      return rejectWithValue(error);
    }
  }
);

export const getDocumentQuestion = createAsyncThunk(
  "getDocumentQuestions",
  async ({ documentId, pageNo }) => {
    try {
      const response = await axiosWithToken.get(
        `/questions/get-doc-question/${documentId}?pageNo=${pageNo}`
      );

      return response?.data;
    } catch (error) {
      error?.response?.data?.error && toast.error(error?.response?.data?.error);
      return rejectWithValue(error);
    }
  }
);

export const getQuestion = createAsyncThunk(
  "getQuestion",
  async ({ documentId, questionId, pageNo }, { rejectWithValue }) => {
    const params = {};

    if (pageNo) {
      params.pageNo = pageNo;
    }

    try {
      const response = await axiosWithToken.get(
        `/questions/get-question/${documentId}/${questionId}`,
        {
          params,
        }
      );

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllDocQuestions = createAsyncThunk(
  "getAllDocQuestions",
  async ({ pageNo }, { rejectWithValue }) => {
    const params = {};

    if (pageNo) {
      params.pageNo = pageNo;
    }

    try {
      const response = await axiosWithToken.get(
        `/questions/get-all-questions`,
        {
          params,
        }
      );

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
