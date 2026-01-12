import React from 'react';
import api from '../api';
import RemovedDevicesCard from '../Components/RemovedDevicesCard';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import { NavLink, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Home.css';
import MobileMenu from '../Components/MobileMenu';
import { FaTrash } from 'react-icons/fa';


 function RemovedDevices() {

  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
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
  
    const links = [
      { to: '/AllDevices', text: 'All-devices'},
      { to: '/InRepair', text: 'In-repair' },
      { to: '/CompletedDevices', text: 'Completed-devices' },
      { to: '/ReceivedDevices', text: 'Received-devices' },
      { to: '/AddDevice', text: 'Add-device' },
      { to: '/RemovedDevices', text: 'Trash Bin' }
    ];

    useEffect(() => {
      const fetchCompletedDevices = async () => {
        try {
          const response = await api.get('/devices/Trash');
          setCompletedCount(response.data.length);
        } catch (error) {
          console.error('Error fetching completed devices:', error);
        }
      };
  
      fetchCompletedDevices();
    }, []);
  
  
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
      <div>
      <h4 className='head'>
        <FaTrash/> Trash. Total:{completedCount}
      </h4>
    </div>
  <RemovedDevicesCard searchTerm={searchTerm}/>

     {/* Render MobileMenu component */}
     {showMenu && <MobileMenu links={links} onClose={toggleMenu} />}
      {/* Render Footer */}
      <Footer classNmae="footer" />
    </div>
)
}

export default RemovedDevices;