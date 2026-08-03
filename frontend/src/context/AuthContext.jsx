import { createContext, useContext, useEffect, useState } from "react";

import {
  login as loginAPI,
  signup as signupAPI,
  logout as logoutAPI,
  getProfile,
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("access")
  );

  // -----------------------
  // Load Current User
  // -----------------------

  const loadUser = async () => {
    try {
      const res = await getProfile();

      setUser(res.data);

      setAuthenticated(true);
    } catch (err) {
      setUser(null);

      setAuthenticated(false);

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Login
  // -----------------------

  const login = async (credentials) => {
    const res = await loginAPI(credentials);

    localStorage.setItem("access", res.data.access);

    localStorage.setItem("refresh", res.data.refresh);

    await loadUser();

    return res.data;
  };

  // -----------------------
  // Signup
  // -----------------------

  const signup = async (data) => {
    return await signupAPI(data);
  };

  // -----------------------
  // Logout
  // -----------------------

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        await logoutAPI(refresh);
      }
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);

    setAuthenticated(false);
  };

  // -----------------------
  // Initial Load
  // -----------------------

  useEffect(() => {
    if (localStorage.getItem("access")) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated,
        login,
        signup,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);