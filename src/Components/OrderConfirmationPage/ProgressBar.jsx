import React, { useState, useEffect, useRef } from 'react';
import './ProgressBar.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You can use FontAwesome icons for visual representation
import { faBell, faSpinner, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const ProgressBar = ({ initialStatus }) => {
  //console.log(initialStatus)
  const [status, setStatus] = useState(initialStatus);
  //console.log(status)

  useEffect(() => {

    //console.log(status.toLowerCase())
    switch (initialStatus.toLowerCase()) {

      case 'accepted':
        setStatus('accepted');
        break;
      case 'in-progress':
        setStatus('in-progress');
        break;
      case 'ready for pickup':
        setStatus('ready')
        break;
      default:
        setStatus('waitingtoaccept');
        break;
    }

  }, [initialStatus]);

  const getStatusText = () => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'Order Accepted';
      case 'in-progress':
        return 'Order in Progress';
      case 'ready':
        return 'Order Ready for Pickup';
      default:
        return 'Waiting to Accept';
    }
  };

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <FontAwesomeIcon icon={faCircleCheck} className="status-icon" />
      case 'in-progress':
        return <FontAwesomeIcon icon={faSpinner} spin className="status-icon" />;
      case 'ready':
        return <FontAwesomeIcon icon={faBell} className="status-icon" />;
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
