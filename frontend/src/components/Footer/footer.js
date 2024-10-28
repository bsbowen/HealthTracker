// src/components/Footer/Footer.js
import React from 'react';
import './footer.css'; // Import the corresponding CSS file for the footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Health Tracker &copy; {new Date().getFullYear()} </p>
      </div>
    </footer>
  );
};

export default Footer;
