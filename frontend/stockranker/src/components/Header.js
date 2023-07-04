import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAuth } from "../utils/authContext";
import { Link } from "react-router-dom";

function Header() {
  const { isLoggedIn, user, login, register, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
    setUsername("");
    setPassword("");
  };

  const handleRegister = () => {
    register(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              StockRanker
            </a>
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {user.email}!
              </Typography>
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <TextField
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                sx={{ marginRight: 1 }}
              />
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                sx={{ marginRight: 1 }}
              />
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="contained" onClick={handleRegister}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Header };
