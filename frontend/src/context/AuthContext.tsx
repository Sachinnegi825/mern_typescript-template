//Authcontext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, AuthState, UpdateProfileData } from "../types";
import { authAPI, userAPI } from "../services/api.service";

// Initial auth state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
  loading: true,
  error: null,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(initialState);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (!auth.token) {
        setAuth((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const { user } = await authAPI.getCurrentUser();
        setAuth({
          user,
          token: auth.token,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem("token");
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    loadUser();
  }, [auth.token]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));
      const { token, user } = await authAPI.login({ email, password });

      // Save token to localStorage
      localStorage.setItem("token", token);

      setAuth({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));
      const { token, user } = await authAPI.signup({ name, email, password });

      // Save token to localStorage
      localStorage.setItem("token", token);

      setAuth({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  // Update profile
  const updateProfile = async (data: UpdateProfileData) => {
    try {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));
      const { user } = await userAPI.updateProfile(data);

      setAuth((prev) => ({
        ...prev,
        user,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    auth,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
