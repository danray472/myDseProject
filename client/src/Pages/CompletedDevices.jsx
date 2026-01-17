// CompletedDevices.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import SearchBar from '../Components/SearchBar';
import CompletedDeviceCard from '../Components/CompletedDeviceCard';
import './Home.css';

function CompletedDevices() {
  const [completedCount, setCompletedCount] = useState(0);
  const [completedDevices, setCompletedDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

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

  return (
    <div className="home-dashboard page-container">
      <header className="page-header-compact">
        <div className="page-header-text">
          <h2 className="page-title">Completed Devices</h2>
          <p className="page-subtitle">Devices ready for pickup/delivery.</p>
        </div>
        <div className="page-header-search">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <section className="device-feed">
        <CompletedDeviceCard searchTerm={searchTerm} completedDevices={completedDevices} />
      </section>
    </div>
  );
}

export default CompletedDevices;
