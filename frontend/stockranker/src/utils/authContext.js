import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch the current user
  useEffect(() => {
    api
      .get("/users/me", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api({
        method: "post",
        url: "/auth/jwt/login",
        data: {
          username: username,
          password: password,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      // User is logged in, reload the page
      window.location.reload();
    }
  }, [isLoggedIn]);

  const register = async (username, password) => {
    try {
      const response = await api({
        method: "post",
        url: "/auth/register",
        data: {
          email: username,
          password: password,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/jwt/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
