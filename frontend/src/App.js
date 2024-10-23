import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CaloriesPage from './Pages/CaloriesPage';
import ExercisePage from './Pages/ExercisePage';
import SleepPage from './Pages/SleepPage';
import DashboardPage from './Pages/DashboardPage';
import Login from './components/User/Login';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/calories">Calories Tracker</Link></li>
                    <li><Link to="/exercise">Exercise Tracker</Link></li>
                    <li><Link to="/sleep">Sleep Tracker</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/calories" element={<CaloriesPage />} />
                <Route path="/exercise" element={<ExercisePage />} />
                <Route path="/sleep" element={<SleepPage />} />
                {/* Optionally add a default route for the login */}
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;




