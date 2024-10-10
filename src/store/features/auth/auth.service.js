import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiClient, axiosWithoutToken } from "../../../api/index";
export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/admin/loginAdmin", data);

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
      const response = await axiosWithoutToken.post(
        "/admin/change-password",
        data
      );

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
      const response = await axiosWithoutToken.post("/admin/logout");

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
  "verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/admin/verifyAdminToken");
      console.log(response?.data?.data?.isLoggedIn);

      return response?.data?.data?.isLoggedIn;
    } catch (error) {
      console.log("Token verification failed:", error);
      return rejectWithValue(error);
    }
  }
);

