import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {
  FaSave,
  FaTicketAlt,
  FaLaptopMedical,
  FaUser,
  FaEnvelope
} from 'react-icons/fa';
import './AddDevice.css';

const AddDevice = ({ onClose }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    ticketNumber: '',
    deviceType: '',
    customerName: '',
    customerEmail: '',
    deviceState: 'In-repair',
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

  return (
    <div className="home-dashboard">
      <header className="page-header-compact">
        <div className="page-header-text">
          <h2 className="page-title">Add Device</h2>
          <p className="page-subtitle">Create a new service ticket for the inventory.</p>
        </div>
      </header>

      <div className="add-device-wrapper">
        <div className="modern-form-card">
          <form onSubmit={handleSaveDevice} className="add-device-form">
            <div className="form-row">
              <div className="modern-form-group">
                <label className="modern-label">
                  <FaTicketAlt className="label-icon" /> Ticket Number
                </label>
                <div className="modern-input-wrapper">
                  <input
                    type="text"
                    name="ticketNumber"
                    value={deviceInfo.ticketNumber}
                    onChange={handleInputChange}
                    className="modern-input"
                    placeholder="e.g. TKT-12345"
                    required
                  />
                </div>
              </div>

              <div className="modern-form-group">
                <label className="modern-label">
                  <FaLaptopMedical className="label-icon" /> Device Type
                </label>
                <div className="modern-input-wrapper">
                  <input
                    type="text"
                    name="deviceType"
                    value={deviceInfo.deviceType}
                    onChange={handleInputChange}
                    className="modern-input"
                    placeholder="Laptop, Phone, etc."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="modern-label">
                <FaUser className="label-icon" /> Customer Name
              </label>
              <div className="modern-input-wrapper">
                <input
                  type="text"
                  name="customerName"
                  value={deviceInfo.customerName}
                  onChange={handleInputChange}
                  className="modern-input"
                  placeholder="Full name of customer"
                  required
                />
              </div>
            </div>

            <div className="modern-form-group">
              <label className="modern-label">
                <FaEnvelope className="label-icon" /> Customer Email
              </label>
              <div className="modern-input-wrapper">
                <input
                  type="email"
                  name="customerEmail"
                  value={deviceInfo.customerEmail}
                  onChange={handleInputChange}
                  className="modern-input"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <button
                type="submit"
                disabled={loading}
                className="premium-save-button"
              >
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <FaSave className="save-icon" /> Save Device
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;
