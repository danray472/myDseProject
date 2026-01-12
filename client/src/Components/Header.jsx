import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <header>
      {/* Wrap the logo inside a NavLink to make it clickable */}
      <NavLink to="/Home" exact title="Home ALL-Devices" className="header-link">
        <img
          className="setlogo"  
          src="logo.png" 
          alt="Logo" 
          style={{ width: '80px', height: '70px', padding: '', marginLeft: '10%', borderRadius: '20%', marginTop: '0' }} 
        />

        <div className="company-name-container">
          <h2 className='header-mobile' title="Home">ElectroRenew</h2>
          <span className="registered-symbol">®</span>
        </div>
      </NavLink>
 
   
    </header>
  );
}

export default Header;
