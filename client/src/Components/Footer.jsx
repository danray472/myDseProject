import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import './cards.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="logo">
              <i className="fas fa-tools"></i> ElectroRenew Repairing Center
            </h2>
            <p>
              Your one-stop solution for electronic repair services.
            </p>
            <div className="contact">
              <span><i className="far fa-envelope"></i> ElectroRenew254@electronics.ac.ke</span>
            </div>
          </div>
          <div className="footer-section links">
            
            <ul>
              <li className='link'><Link to="/">Home</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ElectroRenew. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
