import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Create context with a default value
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  error: null
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error("Error initializing auth state:", err);
      setError("Failed to restore authentication state");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (token, userData) => {
    try {
      setLoading(true);
      setError(null);

      // Validate token
      if (!token || typeof token !== "string") {
        throw new Error("Invalid authentication token");
      }

      // Store auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Authentication failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Clear auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user data
  const updateUser = useCallback((updates) => {
    try {
      const currentData = JSON.parse(localStorage.getItem("userData") || "{}");
      const newData = { ...currentData, ...updates };
      
      localStorage.setItem("userData", JSON.stringify(newData));
      setUser(newData);
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update user data");
      throw err;
    }
  }, []);

  // Get current auth token
  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    error,
    updateUser,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook with type checking
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Optional: Type definitions if using TypeScript
/*
interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  updateUser: (updates: Partial<User>) => void;
  getToken: () => string | null;
}
*/