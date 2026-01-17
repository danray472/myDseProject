import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditDeviceState.css';
import { FiSave, FiX } from 'react-icons/fi';

const EditDevice = ({ device, onClose }) => {
  const [editedDevice, setEditedDevice] = useState({
    deviceState: device.deviceState,
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
        onClose();
        // Force reload so history/analytics update immediately
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating device status', { variant: 'error' });
        console.error('Error updating device status:', error);
      });
  };

  return (
    <form className="modal-form" onSubmit={handleEditDevice}>
      <div className="form-group">
        <label className="form-label" htmlFor="deviceState">
          Device Status
        </label>
        <select
          id="deviceState"
          className="form-select"
          name="deviceState"
          value={editedDevice.deviceState}
          onChange={handleInputChange}
        >
          <option value="Received">Received</option>
          <option value="In-repair">In Repair</option>
          <option value="Completed">Completed</option>
          <option value="Trash">Move to Trash</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="note">
          Status Note (Optional)
        </label>
        <textarea
          id="note"
          className="form-textarea"
          name="note"
          value={editedDevice.note}
          onChange={handleInputChange}
          placeholder="Enter details about this status update..."
          rows="3"
        />
      </div>

      <div className="modal-button-group">
        <button
          type="button"
          className="modal-btn modal-btn-secondary"
          onClick={onClose}
          disabled={loading}
        >
          <FiX />
          Cancel
        </button>
        <button
          className="modal-btn modal-btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Updating...
            </>
          ) : (
            <>
              <FiSave />
              Update Status
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditDevice;
