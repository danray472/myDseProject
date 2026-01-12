import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleDeviceCard from './SingleDeviceCard'; // Import the DeviceCard component
import './cards.css';
import Spinner from './Spinner';

const InRepairDeviceCard = ({searchTerm}) => {
  const [InRepair, setInRepair] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    const fetchInRepairDevices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/devices/In-repair'); // Update the endpoint to fetch completed devices
        setInRepair(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching completed devices:', error);
      }
    };

    fetchInRepairDevices();
  }, []);

  useEffect(() => {
    const filtered = InRepair.filter(device =>
      (typeof searchTerm === 'string') && // Check if searchTerm is a string
      (device.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredDevices(filtered);
  }, [searchTerm, InRepair]);
  return (
    <div className="card-container">
      <div className='device-list'>
     {Loading ? <Spinner/> :
        filteredDevices.map(device => (
          <SingleDeviceCard key={device._id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default InRepairDeviceCard;
