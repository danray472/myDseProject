import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditDeviceState.css'
import { FaArrowLeft } from 'react-icons/fa';

const EditDevice = ({ device, onClose }) => {
  const [editedDevice, setEditedDevice] = useState({
    deviceState: device.deviceState // Only deviceState can be edited
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Access navigate function
  const location = useLocation(); // Access location information

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDevice({ ...editedDevice, [name]: value });
  };

  const handleEditDevice = (e) => {
    e.preventDefault();
    setLoading(true);
    api.patch(`/devices/${device._id}`, editedDevice)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Device status updated successfully', { variant: 'success' });
        onClose(); // Close the edit modal after successful update
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating device status', { variant: 'error' });
        console.error('Error updating device status:', error);
      });
  };

  const handleBackButtonClick = () => {
    onClose(); // Close the modal
  };

  return (
    <div className='modal-container' style={{ zIndex: 9999 }}>
      <FaArrowLeft className="back-button" title="Council" onClick={handleBackButtonClick} /> {/* Back button */}
      <h3 className='header'>Edit Device Status</h3>
      <form onSubmit={handleEditDevice}>
        <div className='divide'>
          <label>Device State:</label>
          <select
            className='select'
            name="deviceState"
            value={editedDevice.deviceState}
            onChange={handleInputChange}
          >
            <option className='select-text' value="In-repair">In-repair</option>
            <option className='select-text' value="Completed">Completed</option>
            <option className='select-text' value="Received">Received</option>
            <option className='select-text' value="Trash">Move to Trash</option>
          </select>
        </div>
        <button className='button' type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'} 
        </button>
      </form>
    </div>
  );
};

export default EditDevice;
