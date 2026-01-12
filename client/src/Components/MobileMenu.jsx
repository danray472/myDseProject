import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import './MobileMenu.css';

const MobileMenu = ({ links, onClose }) => {
  const [showMenu, setShowMenu] = useState(true);

  const handleClickLink = (to) => {
    onClose(); // Close the menu when clicking a link
  };

  return (
    <div className={`mobile-menu ${showMenu ? 'open' : ''}`}>
      <div className="menu-header">
        <div className="close-icon" title="close menu" onClick={onClose}>
          <MdClose />
        </div>
      </div>
      <div className="menu-body">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to} className="menu-link" onClick={() => handleClickLink(link.to)}>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
