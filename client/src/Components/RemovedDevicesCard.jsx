// RemovedDevicesCard.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import './cards.css';
import Spinner from './Spinner';
import SingleDeviceCardDelete from './SingleDeviceCardDelete';
import { useSnackbar } from 'notistack';

const RemovedDevicesCard = ({ searchTerm }) => {
  const [Trash, setTrash] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchRemovedDevices = async () => {
      try {
        const response = await api.get('/devices/Trash');
        setTrash(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching completed devices:', error);
      }
    };

    fetchRemovedDevices();
  }, []);

  const handleDelete = async (deviceId) => {
    try {
      // Send DELETE request to backend API to delete the device
      await api.delete(`/devices/${deviceId}`);
      console.log('Device deleted successfully:', deviceId);
      enqueueSnackbar('Device deleted successfully', { variant: 'success' });
      // Update the state to remove the deleted device from the list
      setTrash(Trash.filter(device => device._id !== deviceId));
    } catch (error) {
      console.error('Error deleting device:', error);
      // Handle deletion error
    }
  };

  useEffect(() => {
    const filtered = Trash.filter(device =>
      device.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevices(filtered);
  }, [searchTerm, Trash]);

  return (
    <div className="card-container">
      <div className='device-list'>
        {Loading ? <Spinner /> :
          filteredDevices.map(device => (
            <SingleDeviceCardDelete key={device._id} device={device} onDelete={handleDelete} />
          ))}
      </div>
    </div>
  );
};

export default RemovedDevicesCard;
