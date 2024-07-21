// src/pages/Map.js
import React from 'react';
import './Map.css';

const Map = () => {
  return (
    <div className="map-page">
      <div className="map-header">
          <img className="user-photo" src="https://via.placeholder.com/50" alt="Profile" />
          <h2 className="user-name">Pedro</h2>
        <div className="user-location">
          <p className="location-text">Cll 4a Sur #15</p>
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
