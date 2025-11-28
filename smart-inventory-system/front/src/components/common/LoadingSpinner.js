import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div>
        <div className="spinner"></div>
        <p className="mt-20 text-center">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;