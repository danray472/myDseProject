// EditDeviceModal.jsx
import React, { useState } from 'react';
import EditDeviceState from '../Components/EditDeviceState';
import './Home.css'

const EditDeviceModal = ({ device, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className='edit-button' onClick={handleOpenModal}>Edit device state</button><span>::</span>
      {isOpen && device && <EditDeviceState device={device} onClose={handleCloseModal} />}
    </div>
  );
};

export default EditDeviceModal;
