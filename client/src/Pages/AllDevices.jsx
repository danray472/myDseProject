import React, { useState, useEffect  } from 'react';
import api from '../api';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import DeviceCard from '../Components/DeviceCard';
import MobileMenu from '../Components/MobileMenu';
import { NavLink } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Home.css';

function AllDevices() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [completedCount, setCompletedCount] = useState(0);

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
  }, [location]);

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
    { to: '/AllDevices', text: 'All-devices'},
    { to: '/InRepair', text: 'In-repair' },
    { to: '/CompletedDevices', text: 'Completed-devices' },
    { to: '/ReceivedDevices', text: 'Received-devices' },
    { to: '/AddDevice', text: 'Add-device' },
    { to: '/RemovedDevices', text: 'Trash Bin' }
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div>
      <div className="container">
        <Header />
        {/* Render links with the header */}
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
                onClick={() => handleLinkClick(index)}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Render mobile menu */}
        <div className="mobile-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className="search-bar">
          <SearchBar onSearch={handleSearch}/>
        </div>
      </div>
      <h4 className='head'>All-devices  total: {completedCount}</h4>
      <DeviceCard searchTerm={searchTerm}/>
      {/* Render MobileMenu component */}
      {showMenu && <MobileMenu links={links} onClose={toggleMenu} />}
      {/* Render Footer */}
      <div></div>
      <Footer />
    </div>
  );
}

export default AllDevices;
