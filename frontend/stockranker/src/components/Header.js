import React, { useState } from "react";
import { useAuth } from "../utils/authContext"; // update the path as per your directory structure

function Header() {
  const { user, login, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <div>
        Welcome, {user.email}! <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={() => login(username, password)}>Login</button>
        <h1>Or Register</h1>
        {/* Here you should add a form for registration just like the login form */}
      </div>
    );
  }
}

export { Header };
