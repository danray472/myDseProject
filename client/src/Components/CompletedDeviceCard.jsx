// CompletedDeviceCard.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import SingleDeviceCard from './SingleDeviceCard';
import './cards.css';
import Spinner from './Spinner';

const CompletedDeviceCard = ({ searchTerm }) => {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    const fetchCompletedDevices = async () => {
      try {
        const response = await api.get('/devices/Completed');
        setCompleted(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching completed devices:', error);
      }
    };

    fetchCompletedDevices();
  }, []);

  useEffect(() => {
    const filtered = completed.filter(device =>
      device.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevices(filtered);
  }, [searchTerm, completed]);

  return (
    <div className="card-container">
      <div className='device-list'>
        {loading ? <Spinner /> : (
          filteredDevices.map(device => (
            <SingleDeviceCard key={device._id} device={device} />
          )))}
      </div>
    </div>
  );
};

export default CompletedDeviceCard;
