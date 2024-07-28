// src/components/Alert.js
import React from 'react';
import './Alert.css';

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
      <button onClick={onClose} className="close-btn">&times;</button>
    </div>
  );
};

export default Alert;