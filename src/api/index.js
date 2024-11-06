import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosWithToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const MAX_RETRY_COUNT = 1;
axiosWithoutToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

//       if (originalRequest._retryCount > MAX_RETRY_COUNT) {
//         return Promise.reject(new Error("Max retry attempts reached"));
//       }

//       console.log(error);

      try {
        const response = await axiosWithoutToken.post(
          "/admin/refresh-access-token",
          {},
          { withCredentials: true }
        );

        console.log("Hellooooooo");

        console.log("🚀 ~ response:", response);

//         if (response.data.status === 400) {
//           console.log("Hello");

          localStorage.removeItem("isLoggedIn");
          window.location.href = "/log-in";
          // toast.error("Login again");
          console.log("Hello");

//           return Promise.reject("Error");
//         }

        return axiosWithoutToken(originalRequest);
      } catch (err) {
        console.log("🚀 ~ err:", err);
        console.log(err.response.status === 401);

        if (err.response && err.response.data.status === 401) {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/log-in";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
// axiosWithoutToken.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { response } = error;

//     if (response && response.data.error === "Refresh token expires") {
//       await toast.error("Session expired. Please log in again.");
//       localStorage.removeItem("user");
//       // Redirect to the login page
//       setTimeout(() => {
//         window.location.href = `${import.meta.env.VITE_FRONTENT_URL}/log-in`;
//       }, 1000);
//     }

//     return Promise.reject(error);
//   }
// );

export { axiosWithToken, apiClient };
