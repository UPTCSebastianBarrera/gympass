// src/pages/Map.js
import React from 'react';
import './Map.css';

const Map = () => {
  return (
    <div className="map-page">
      <div className="map-header">
        <img src="profile-pic-url" alt="Profile" />
        <div>
          <h2>Pedro</h2>
          <p>Cll 4a Sur #15</p>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search gyms..." />
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
