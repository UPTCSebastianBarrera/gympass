// src/pages/Map.js
import React, { useState, useEffect } from 'react';
import './Map.css';

const Map = () => {
  const [userData, setUserData] = useState({ name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' });

  useEffect(() => {
    // Fetch user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div className="map-page">
      <div className="map-header">
        <img className="user-photo" src={userData.profilePicture} alt="Profile" />
        <h2 className="user-name">{userData.name}</h2>
        <div className="user-location">
          <p className="location-text">{userData.address}</p>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar gimnasio ..." />
        <div className="tags">
          <button>Crossfit</button>
          <button>24 hr</button>
          <button>Pesas</button>
          <button>Cardio</button>
        </div>
      </div>
      <div className="map">
        {/* Insert map component here */}
      </div>
    </div>
  );
};

export default Map;
