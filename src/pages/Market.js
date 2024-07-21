// src/pages/Market.js
import React from 'react';
import './Market.css';

const Market = () => {
  return (
    <div className="market-page">
      <div className="market-header">
        <img src="profile-pic-url" alt="Profile" />
        <h2>Pedro</h2>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search supplements..." />
        <div className="tags">
          <button>Proteina</button>
          <button>Pre entreno</button>
          <button>Creatina</button>
          <button>Gainers</button>
        </div>
      </div>
      <div className="supplements-grid">
        {/* Insert supplement components here */}
      </div>
    </div>
  );
};

export default Market;
