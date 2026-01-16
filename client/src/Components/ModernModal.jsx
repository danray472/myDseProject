import React from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiEdit2 } from 'react-icons/fi';
import './ModernModal.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const ModernModal = ({ isOpen, onClose, children, title }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'var(--overlay-dark)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    },
    content: {
      position: 'relative',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0',
      borderRadius: '16px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'visible',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      closeTimeoutMS={300}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="modern-modal-content"
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon-wrapper">
                  <FiEdit2 className="modal-icon" />
                </div>
                <h2 className="modal-title">{title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ModernModal;
