import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch the current user
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/auth/jwt/login",
        data: {
          username: "jj@jj.com",
          password: "jj",
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/jwt/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
