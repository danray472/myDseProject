// WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <img className="welcome-logo" src="/logo.png" alt="Logo" /> {/* Reference the logo directly */}
      <h2 className="welcome-heading">Welcome to ElectroRenew</h2>
      <p className="warning-text">Only admins of ElectroRenew are authorized to use this App!!</p>
      <p className="welcome-text">Click the button below to proceed to authentication page</p>
      <Link to="/login" className="next-button">Next</Link>
    </div>
  );
};

export default WelcomePage;
