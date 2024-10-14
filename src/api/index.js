import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// axiosWithoutToken.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await axiosWithoutToken.post(
//           "/admin/refresh-access-token",
//           {},
//           { withCredentials: true }
//         );

//         const { accessToken } = response.data;
//         // originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

//         // Retry the original request with the new access token
//         return axiosWithoutToken(originalRequest);
//       } catch (err) {
//         // Handle errors from the refresh token request
//         return Promise.reject(err);
//       }
//     }

//     // If the error is not due to an expired token, reject the Promise
//     return Promise.reject(error);
//   }
// );

export { axiosWithoutToken, apiClient };
