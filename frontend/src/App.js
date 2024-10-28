

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar/Navbar"; // Added Navbar import
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Dashboard from "./pages/Dashboard/DashboardPage";
import CaloriesPage from "./pages/Calories/CaloriesPage"; // Updated CaloriesPage import path
import ExercisePage from "./pages/Exercise/ExercisePage"; // Updated ExercisePage import path
import SleepPage from "./pages/Sleep/SleepPage"; // Updated SleepPage import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calorie-log" element={<CaloriesPage />} /> {/* Added CaloriesPage route */}
        <Route path="/exercise-log" element={<ExercisePage />} /> {/* Added ExercisePage route */}
        <Route path="/sleep-log" element={<SleepPage />} /> {/* Added SleepPage route */}
      </Routes>
    </Router>
  );
}

export default App;
