import React, { useState, useEffect } from 'react';
import api from '../api';
import SearchBar from '../Components/SearchBar';
import DeviceCard from '../Components/DeviceCard';
import './Home.css';

function AllDevices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [completedCount, setCompletedCount] = useState(0);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
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


  return (
    <div className="home-dashboard">
      <header className="page-header-compact">
        <div className="page-header-text">
          <h2 className="page-title">All Devices</h2>
          <p className="page-subtitle">Manage all inventory items here.</p>
        </div>
        <div className="page-header-search">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <section className="device-feed">
        <DeviceCard searchTerm={searchTerm} />
      </section>
    </div>
  );
}

export default AllDevices;
