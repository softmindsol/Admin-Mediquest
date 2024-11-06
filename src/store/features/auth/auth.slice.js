import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, logout, verifyToken } from "./auth.service";
const initialState = {
  admin: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  selectedUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, _) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        localStorage.setItem("user", true);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
        state.isLoading = false;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
        localStorage.removeItem("user");
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
