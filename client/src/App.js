import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
