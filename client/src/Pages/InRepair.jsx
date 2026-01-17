import React, { useState, useEffect } from 'react';
import api from '../api';
import SearchBar from '../Components/SearchBar';
import InRepairDevicesCard from '../Components/InrepairDevicesCard.jsx';
import './Home.css';

function InRepair() {
  const [searchTerm, setSearchTerm] = useState('');
  const [completedCount, setCompletedCount] = useState(0)

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    const fetchCompletedDevices = async () => {
      try {
        const response = await api.get('/devices/In-repair');
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
          <h2 className="page-title">In Repair</h2>
          <p className="page-subtitle">Devices currently being serviced.</p>
        </div>
        <div className="page-header-search">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <section className="device-feed">
        <InRepairDevicesCard searchTerm={searchTerm} />
      </section>
    </div>
  );
}

export default InRepair;
