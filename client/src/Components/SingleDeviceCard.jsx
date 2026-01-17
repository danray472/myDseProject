import React from 'react';
import { FaTicketAlt, FaMobileAlt, FaUser, FaEnvelope, FaCalendarAlt, FaHistory, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import required icons
import './cards.css';
import EditDeviceModal from '../Pages/EditDeviceModal';
import { useState } from 'react';

const SingleDeviceCard = ({ device }) => {
  const [showHistory, setShowHistory] = useState(false);

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

        <div className='card-actions'>
          <button
            className="history-toggle-btn"
            onClick={() => setShowHistory(!showHistory)}
            title="View Repair History"
          >
            <FaHistory /> {showHistory ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div className='edit-button-div'>
            <EditDeviceModal className="modal-container" device={device} />
          </div>
        </div>

        {showHistory && (
          <div className="repair-timeline">
            <h6><FaHistory /> Repair Timeline</h6>
            <div className="timeline-items">
              {device.statusLogs && device.statusLogs.length > 0 ? (
                device.statusLogs.map((log, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <span className="log-status">{log.status}</span>
                      <p className="log-note">{log.note}</p>
                      <span className="log-time">
                        {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>
                ))
              ).reverse() : (
                <p className="no-history">No history recorded yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleDeviceCard;
