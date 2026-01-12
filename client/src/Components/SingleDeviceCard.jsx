import React from 'react';
import { FaTicketAlt, FaMobileAlt, FaUser, FaEnvelope, FaCalendarAlt, FaPencilAlt  } from 'react-icons/fa'; // Import required icons
import './cards.css'; 
import EditDeviceModal from '../Pages/EditDeviceModal';

const SingleDeviceCard = ({ device }) => {
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
       <div className='edit-button-div'> <EditDeviceModal className="modal-container" device={device}/> <FaPencilAlt /> {/* Pass the device prop here */}</div>
      </div>
    </div>
  );
};

export default SingleDeviceCard;
