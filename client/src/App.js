import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import QuizGame from "./Components/QuizGame/QuizGame";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/quiz/:uniqueLink" element={<QuizGame />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
