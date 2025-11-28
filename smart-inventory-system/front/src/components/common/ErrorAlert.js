import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="error-message">
      <strong>Error!</strong>
      <p>{message}</p>
      {onClose && (
        <button 
          onClick={onClose} 
          className="btn-secondary btn-small"
          style={{ marginTop: '10px' }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;