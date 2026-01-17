// EditDeviceModal.jsx
import React, { useState } from 'react';
import EditDeviceState from '../Components/EditDeviceState';
import ModernModal from '../Components/ModernModal';
import './Home.css';

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
      <button className='modern-edit-btn' onClick={handleOpenModal}>
        Edit
      </button>

      <ModernModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Edit Device Status"
      >
        {device && <EditDeviceState device={device} onClose={handleCloseModal} />}
      </ModernModal>
    </div>
  );
};

export default EditDeviceModal;
