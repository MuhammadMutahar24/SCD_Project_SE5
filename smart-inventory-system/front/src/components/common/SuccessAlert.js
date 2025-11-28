import React from 'react';

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="success-message">
      <strong>Success!</strong>
      <p>{message}</p>
      {onClose && (
        <button 
          onClick={onClose} 
          className="btn-success btn-small"
          style={{ marginTop: '10px' }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default SuccessAlert;