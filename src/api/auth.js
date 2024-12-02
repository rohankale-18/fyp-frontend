import axiosInstance from "./axiosInstance";

export const login = async (loginIdentifier, password) => {
  const response = await axiosInstance.post("/login", {
    loginIdentifier,
    password,
  });

  // Store the token in localStorage
  if (response.data.access_token) {
    localStorage.setItem("auth-token", response.data.access_token);
  }

  return response;
};

export const signup = async (username, email, password) => {
  return await axiosInstance.post("/signup", { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("auth-token");
  axiosInstance.interceptors.request.use(
    (config) => {
      delete config.headers.Authorization; // Ensure Authorization is not included
      return config;
    },
    (error) => Promise.reject(error)
  );
};
