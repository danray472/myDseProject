// CompletedDevices.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import CompletedDeviceCard from '../Components/CompletedDeviceCard';
import { NavLink, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Home.css';
import MobileMenu from '../Components/MobileMenu';

function CompletedDevices() {
  const [completedCount, setCompletedCount] = useState(0);
  const [completedDevices, setCompletedDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = links.findIndex(link => link.to === currentPath);
    setActiveLink(currentIndex);
  }, []);

  useEffect(() => {
    const fetchCompletedDevices = async () => {
      try {
        const response = await api.get('/devices/Completed');
        setCompletedDevices(response.data);
        setCompletedCount(response.data.length);
      } catch (error) {
        console.error('Error fetching completed devices:', error);
      }
    };

    fetchCompletedDevices();
  }, []);

  const links = [
    { to: '/AllDevices', text: 'All-devices'},
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
              <NavLink
                to={link.to}
                className="desktop-link"
                style={{
                  backgroundColor: activeLink === index ? 'deeppink' : 'transparent',
                  padding: '8px',
                  borderRadius: '10px'
                }}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className="search-bar">
          <SearchBar onSearch={handleSearch}/>
        </div>
      </div>
      <h4 className='head'> Total Completed devices: {completedCount}</h4>
      <CompletedDeviceCard searchTerm={searchTerm} completedDevices={completedDevices}/>
      {showMenu && <MobileMenu links={links} onClose={toggleMenu} />}
      <Footer classNmae="footer" />
    </div>
  );
}

export default CompletedDevices;
