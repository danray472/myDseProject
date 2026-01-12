import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './modal.css';
import { FaArrowLeft } from 'react-icons/fa';

const AddDevice = ({ onClose }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    ticketNumber: '',
    deviceType: '',
    customerName: '',
    customerEmail: '',
    deviceState: 'In-repair', // Default state
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo({ ...deviceInfo, [name]: value });
  };

  const handleSaveDevice = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post('/devices', deviceInfo)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Device added successfully!', { variant: 'success' });
        if (onClose) {
          onClose();
        } else {
          navigate('/AllDevices');
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating device', { variant: 'error' });
        console.error('Error creating device:', error);
      });
  };

  const handleBackButtonClick = () => {
    navigate('/Home');
  };

  return (
    <div className="add-device-container">
      <div className="modal-content">
        {onClose && (
          <button className="back-button" onClick={onClose}>
            <FaArrowLeft /> Back
          </button>
        )}
        <h2>Add New Device</h2>
        <form onSubmit={handleSaveDevice} className="add-device-form">
          <div className="form-group">
            <label>Ticket Number:</label>
            <input
              type="text"
              name="ticketNumber"
              value={deviceInfo.ticketNumber}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Device Type:</label>
            <input
              type="text"
              name="deviceType"
              value={deviceInfo.deviceType}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={deviceInfo.customerName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Customer Email:</label>
            <input
              type="email"
              name="customerEmail"
              value={deviceInfo.customerEmail}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="submit-button"
          >
            {loading ? 'Saving...' : 'Save Device'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDevice;
