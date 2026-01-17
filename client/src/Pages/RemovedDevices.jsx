import React, { useState, useEffect } from 'react';
import api from '../api';
import RemovedDevicesCard from '../Components/RemovedDevicesCard';
import SearchBar from '../Components/SearchBar';
import { FaTrash } from 'react-icons/fa';
import './Home.css';

function RemovedDevices() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    // Analytics/fetching logic if needed later
  }, []);

  return (
    <div className="home-dashboard page-container">
      <header className="page-header-compact">
        <div className="page-header-text">
          <h2 className="page-title"><FaTrash /> Trash Bin</h2>
          <p className="page-subtitle">Removed or cancelled devices.</p>
        </div>
        <div className="page-header-search">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <section className="device-feed">
        <RemovedDevicesCard searchTerm={searchTerm} />
      </section>
    </div>
  );
}

export default RemovedDevices;
