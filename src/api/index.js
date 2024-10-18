import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const MAX_RETRY_COUNT = 1;
axiosWithoutToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log(error);

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      if (originalRequest._retryCount > MAX_RETRY_COUNT) {
        return Promise.reject(new Error("Max retry attempts reached"));
      }

      try {
        await axiosWithoutToken.post(
          "/admin/refresh-access-token",
          {},
          { withCredentials: true }
        );

        // Assuming the response contains the new token
        // const newToken = response.data.token; // Adjust this line according to your API response

        // Optionally, set the new token in the request headers
        // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return axiosWithoutToken(originalRequest);
      } catch (err) {
        // Handle the error from the refresh request
        if (err.response && err.response.status === 401) {
          // If refresh also fails with 401, reject and handle logout or redirect
          return Promise.reject(
            new Error("Session expired. Please log in again.")
          );
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosWithoutToken, apiClient };
