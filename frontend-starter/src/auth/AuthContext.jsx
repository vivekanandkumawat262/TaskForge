import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logout } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("taskforge_token");

    // ⛔ NO TOKEN → DO NOT CALL /me
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // ✅ CALL /me ONLY ONCE
    getCurrentUser()
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        // ⛔ clear invalid token
        localStorage.removeItem("taskforge_token");
        setUser(null);
      })
      .finally(() => {
        // ⛔ ALWAYS STOP LOADING
        setLoading(false);
      });
  }, []); // 🚨 EMPTY ARRAY — DO NOT ADD DEPENDENCIES

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.user);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        loading,
        login,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
