import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import useNavigate hook
import "./Login.scss";

function Login({ onAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // create an instance of navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      onAuthenticated(true);

      navigate("/admin-dashboard"); // navigate to the admin dashboard
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
