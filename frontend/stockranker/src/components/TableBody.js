import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAuth } from "../utils/authContext";

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

  return <Box></Box>;
}

export { Header };
