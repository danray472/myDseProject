// SingleDeviceCardDelete.js
import React from 'react';
import { FaTicketAlt, FaMobileAlt, FaUser, FaEnvelope, FaCalendarAlt, FaTrash } from 'react-icons/fa'; // Import required icons
import './cards.css'; 

const SingleDeviceCardDelete = ({ device, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function with the device ID or any other necessary data to delete the device
    onDelete(device._id);
  };

  return (
    <div className="card"> {/* Use "card" class here */}
      <div className="card-line">
        <div className="card-container">
          <h5 className="card-title"><FaTicketAlt /> Ticket Number: <span className='ticket-no'>{device.ticketNumber}</span></h5>
          <p className="card-text"><FaMobileAlt /> Device Type: <span className='device-text'>{device.deviceType}</span></p>
          <p className="card-text"><FaUser /> Customer Name: <span className="device-text">{device.customerName}</span></p>
          <p className="card-text"><FaEnvelope /> Customer Email: <span className='device-text'>{device.customerEmail}</span></p> {/* Display the email */}
          <p className="card-text-state">Device State: <span className='device-state'>{device.deviceState}</span></p>
          <p className="card-text"><FaCalendarAlt /> Date: <span className='device-text'>{new Date(device.date).toLocaleDateString()}</span></p> {/* Display the date */}
        </div>
        <div className='delete-container'>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleDelete}>
      <span style={{ marginRight: '5px', color: 'black' }}>
      <FaTrash className="delete-icon" />
      </span>
        <span style={{ color: 'black', textDecoration: 'none' }}>Delete</span>
      </div>
          </div>
          </div>



      </div>
    </div>
  );
};

export default SingleDeviceCardDelete;
