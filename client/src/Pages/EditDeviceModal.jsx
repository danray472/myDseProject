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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
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
