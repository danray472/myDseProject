import React, { useState, useEffect } from 'react';
import api from '../api';
import SingleDeviceCard from './SingleDeviceCard'; // Import the SingleDeviceCard component
import './cards.css';
import Spinner from './Spinner'; // Import the Spinner component

const DeviceList = ({ searchTerm }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get('/devices');
        setDevices(response.data);
        setLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    const filtered = devices.filter(device =>
      device.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevices(filtered);
  }, [searchTerm, devices]);

  return (
    <div className="card-container">
      <div className='device-list'>
        {/* Conditionally render the Spinner if loading */}
        {loading ? <Spinner /> : (
          // Render device cards if not loading
          filteredDevices.map(device => (
            <SingleDeviceCard key={device._id} device={device} />
          ))
        )}
      </div>
    </div>
  );
};

export default DeviceList;
