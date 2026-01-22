import axios from "axios";

/**
 * Create Axios instance
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Set or remove auth token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("taskforge_token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("taskforge_token");
    delete api.defaults.headers.common["Authorization"];
  }
};

/**
 * Load token from localStorage on app start
 */
export const loadAuthToken = () => {
  const token = localStorage.getItem("taskforge_token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

/**
 * Request Interceptor
 * Adds JWT token automatically to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taskforge_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Handles global API errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Auto logout on token expiry or invalid token
    if (status === 401) {
      localStorage.removeItem("taskforge_token");
      window.location.href = "/";
    }

    return Promise.reject({
      status,
      message: error.response?.data?.message || "Something went wrong",
      data: error.response?.data || null
    });
  }
);

export default api;
