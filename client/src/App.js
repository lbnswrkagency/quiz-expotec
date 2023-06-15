import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import QuizGame from "./Components/QuizGame/QuizGame";
import Login from "./Components/Login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Outlet />
              ) : (
                <Login onAuthenticated={handleAuthentication} />
              )
            }
          >
            <Route
              index
              element={<Login onAuthenticated={handleAuthentication} />}
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/quiz/:uniqueLink" element={<QuizGame />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
