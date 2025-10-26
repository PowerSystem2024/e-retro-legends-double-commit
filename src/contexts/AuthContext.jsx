import React, { createContext, useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'buyer' or 'seller'
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch(
        "https://e-retro-back.vercel.app/api/profile",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(data.user);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        "https://e-retro-back.vercel.app/api/profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(data.user);
    } catch (err) {
      setError(err);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("user");
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await fetch(
        "https://e-retro-back.vercel.app/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(data.user);
    } catch (err) {
      setError(err);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    userRole,
    user,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
