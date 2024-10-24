import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Import Login component

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} /> {/* Set Login as the default route */}
              {/* Other routes */}
          </Routes>
      </Router>
  );
}

export default App;