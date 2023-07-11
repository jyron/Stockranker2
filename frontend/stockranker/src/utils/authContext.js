import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch the current user
  useEffect(() => {
    axios
      .get("http://jyronlocal:8000/users/me", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://jyronlocal:8000/auth/jwt/login",
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
      const response = await axios({
        method: "post",
        url: "http://jyronlocal:8000/auth/register",
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
      await axios.post(
        "http://jyronlocal:8000/auth/jwt/logout",
        {},
        { withCredentials: true }
      );
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
