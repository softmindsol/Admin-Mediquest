import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axios, axiosWithoutToken } from "../../../api";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post("/auth/register", data);

      console.log("Hello", response.data);

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const resendMail = createAsyncThunk(
  "resendMail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post(`/auth/resend-mail/${id}`);
      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const checkMail = createAsyncThunk(
  "checkMail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.get(`/auth/check-email/${id}`);

      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post("/auth/login", data);

      console.log("Hello", response.data);

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/changePassword", data);

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/logout", null, {
        withCredentials: true,
      });

      console.log(response.data);

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/verify-token");
      return response.data.isLoggedIn;
    } catch (error) {
      console.error("Token verification failed:", error);
      return rejectWithValue(error);
    }
  }
);
