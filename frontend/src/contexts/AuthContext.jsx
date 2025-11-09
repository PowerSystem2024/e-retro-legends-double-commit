import React, { createContext, useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import { getLocation } from "../utils/getLocation";

const BACK_URL = import.meta.env.VITE_BACK_API_URL
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(""); // 'buyer' or 'seller' <- en la base ya se crea por default comprador o sea 'buyer'
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACK_URL}/api/user/profile`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setIsAuthenticated(false)
        throw new Error(data.message)
      };
      setIsLoading(false);
      setUser(data.user);
      setIsAuthenticated(true);
      setUserRole(data.user.role);
    } catch (err) {
      setError(err);
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        `${BACK_URL}/api/user/login`,
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
      setIsLoading(false)
      await refreshUser();
    } catch (err) {
      setError(err);
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  };

  const register = async ({ name, lastName, email, password, role }) => {
    try {
      setIsLoading(true)
      const { ip, city, country } = getLocation()
      const response = await fetch(
        `${BACK_URL}/api/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, lastName, email, password, role, ip, city, country }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setIsLoading(false);
      setUser(data);
    } catch (err) {
      setError(err);
      setUser(null);
    } finally {
      setIsLoading(false)
    }
  };

  const logout = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${BACK_URL}/api/user/logout`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setIsLoading(false);
    // Limpiar todo localmente
    setUser(null);
    setIsAuthenticated(false);
    setUserRole("");
    setError("");
  } catch (err) {
    setError(err);
  } finally {
    setIsLoading(false)
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
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  const { isAuthenticated, userRole, user, error, login, logout, register, isLoading } = context
  return { isAuthenticated, userRole, user, error, login, logout, register, isLoading } ;
};
