import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CaloriesPage from './Pages/CaloriesPage';
import ExercisePage from './Pages/ExercisePage';
import SleepPage from './Pages/SleepPage';
import DashboardPage from './Pages/DashboardPage';
import Login from './components/User/Login';
import Register from './components/User/Register';

function App() {
    return (
        <Router>
            {/* Updated navigation section */}
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/calories">Calories Tracker</Link></li>
                    <li><Link to="/exercise">Exercise Tracker</Link></li>
                    <li><Link to="/sleep">Sleep Tracker</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li> {/* New link for registration */}
                </ul>
            </nav>

            {/* Route definitions */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Register route */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/calories" element={<CaloriesPage />} />
                <Route path="/exercise" element={<ExercisePage />} />
                <Route path="/sleep" element={<SleepPage />} />
                <Route path="/" element={<Login />} /> {/* Default route to login */}
            </Routes>
        </Router>
    );
}

export default App;





