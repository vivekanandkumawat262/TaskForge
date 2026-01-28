import api, { setAuthToken } from "./apiClient";

/**
 * Register a new user
 * @param {Object} userData
 * @returns {Object} response data
 */
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Login user
 * @param {String} email
 * @param {String} password
 * @returns {Object} response data
 */
export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    if (res.data.token) {
      setAuthToken(res.data.token);
    }

    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Get current logged-in user (optional API)
 * @returns {Object} user data
 */
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
    console.log(res.data)
    return res.data;

  } catch (err) {
    throw err;
  }
};

/**
 * Logout user
 */
export const logout = () => {
  setAuthToken(null);
};
