import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  //   baseURL: `${URL}/fyp`,
  baseURL: `${URL}/fyp`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token"); // Get access token from localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach JWT token to Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
