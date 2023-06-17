import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import useNavigate hook
import "./Login.scss";

function Login({ onAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add a new state for loading
  const navigate = useNavigate(); // create an instance of navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Set loading to true when the form is submitted

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
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Login;
