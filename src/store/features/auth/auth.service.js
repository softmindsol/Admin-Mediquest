import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiClient, axiosWithToken } from "../../../api/index";
export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/admin/loginAdmin", data);

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error || "Error occur");
        return rejectWithValue(error);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post(
        "/admin/change-password",
        data
      );

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error || "Error occur");
        return rejectWithValue(error);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post("/admin/logout");

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error || "Error occur");
        return rejectWithValue(error);
      }
    }
  }
);

export const verifyToken = createAsyncThunk(
  "verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.get("/admin/verifyAdminToken");

      return response?.data?.data?.isLoggedIn;
    } catch (error) {
      console.log("Token verification failed:", error);
      return rejectWithValue(error);
    }
  }
);

