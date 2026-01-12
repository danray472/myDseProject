// Home.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import DeviceCard from '../Components/DeviceCard';
import MobileMenu from '../Components/MobileMenu';
import { NavLink } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Home.css';

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedCount, setCompletedCount] = useState(0)

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchCompletedDevices = async () => {
      try {
        const response = await api.get('/devices');
        setCompletedCount(response.data.length);
      } catch (error) {
        console.error('Error fetching completed devices:', error);
      }
    };

    fetchCompletedDevices();
  }, []);

  const links = [
    { to: '/AllDevices', text: 'All-devices' },
    { to: '/InRepair', text: 'In-repair' },
    { to: '/CompletedDevices', text: 'Completed-devices' },
    { to: '/ReceivedDevices', text: 'Received-devices' },
    { to: '/AddDevice', text: 'Add-device' },
    { to: '/RemovedDevices', text: 'Trash Bin' }
  ];

  return (
    <div>
      <div className="container">
        <Header />
        <ul className="desktop">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to} className="desktop-link" activeClassName="current">
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <h4 className='head'>Total devices:{completedCount}</h4>
      <div>
        <DeviceCard searchTerm={searchTerm} />
      </div>
      {showMenu && <MobileMenu links={links} onClose={toggleMenu} />}
      <Footer className="footer" />
    </div>
  );
}

export default Home;
