import Axios from "axios";
const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshTokens = async () => {
  try {
    const response = await axios.post("/auth/refreshAccessToken", null, {
      withCredentials: true,
    });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshTokens();
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const axiosWithoutToken = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { axios, axiosWithoutToken };
