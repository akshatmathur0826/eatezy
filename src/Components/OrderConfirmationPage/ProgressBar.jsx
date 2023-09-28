import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You can use FontAwesome icons for visual representation

const ProgressBar = ({ initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    // Simulate progress updates with setTimeout
    const simulateProgress = () => {
      setTimeout(() => {
        switch (status.toLowerCase()) {
          case 'accepted':
            setStatus('In Progress');
            break;
          case 'in progress':
            setStatus('Ready');
            break;
          case 'ready':
            // Order is ready; no further progress
            break;
          default:
            setStatus('Unknown Status');
            break;
        }
      }, 3000); // Simulate a 3-second delay for status updates
    };

    simulateProgress();
  }, [status]);

  const getStatusText = () => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'Order Accepted';
      case 'in progress':
        return 'Order in Progress';
      case 'ready':
        return 'Order Ready for Pickup';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <FontAwesomeIcon icon="check-circle" className="status-icon" />;
      case 'in progress':
        return <FontAwesomeIcon icon="spinner" className="status-icon" spin />;
      case 'ready':
        return <FontAwesomeIcon icon="bell" className="status-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="progress-bar">
      <div className={`status-indicator ${status.toLowerCase()}`}>
        {getStatusIcon()} {getStatusText()}
      </div>
    </div>
  );
};

export default ProgressBar;
