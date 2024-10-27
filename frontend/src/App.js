
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import 'frontend/src/App.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
//import React from 'react';
//import './App.css';
//import Login from './components/Login'; // Import Login component

//function App() {
//  return (
  //  <div className="App">
    //  <Login /> {/* Render Login component */}
   // </div>
 // );
//}

