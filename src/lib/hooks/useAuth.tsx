"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { API_ROUTES } from "@/constants/routes";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "SELLER";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkSession = async () => {
    try {
      const response = await axios.get(API_ROUTES.AUTH.SESSION, {
        withCredentials: true,
      });

      if (response.data.isAuthenticated && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      API_ROUTES.AUTH.LOGIN,
      { action: "login", email, password },
      { withCredentials: true },
    );

    if (response.data.user) {
      setUser(response.data.user);
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        API_ROUTES.AUTH.LOGOUT,
        { action: "logout" },
        { withCredentials: true },
      );
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
