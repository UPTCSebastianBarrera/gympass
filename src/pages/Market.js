// src/pages/Market.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Market.css';

const Market = () => {
  const [supplements, setSupplements] = useState([]);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState({ name: 'Invitado', profilePicture: 'https://via.placeholder.com/50' });

  useEffect(() => {
    // Fetch supplement data from backend
    const fetchSupplements = async () => {
      const { data } = await axios.get('http://localhost:5000/api/supplements');
      setSupplements(data);
    };

    fetchSupplements();

    // Fetch user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSupplementClick = (supplement) => {
    setSelectedSupplement(supplement);
  };

  const handleOverlayClick = () => {
    setSelectedSupplement(null);
  };

  const filteredSupplements = supplements.filter(supplement =>
    supplement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="market-page">
      <div className="market-header">
        <img className="user-photo" src={userData.profilePicture} alt="Profile" />
        <h2 className="user-name">{userData.name}</h2>
      </div>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search supplements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="tags">
          <button className="tag-button">Proteina</button>
          <button className="tag-button">Pre entreno</button>
          <button className="tag-button">Creatina</button>
          <button className="tag-button">Gainers</button>
        </div>
      </div>
      <div className={`supplements-grid ${selectedSupplement ? 'blurred' : ''}`}>
        {filteredSupplements.map((supplement) => (
          <div className="supplement-item" key={supplement._id} onClick={() => handleSupplementClick(supplement)}>
            <img className="supplement-photo" src={supplement.image} alt={supplement.name} />
            <h3 className="supplement-name">{supplement.name}</h3>
            <p className="supplement-description">{supplement.description}</p>
          </div>
        ))}
      </div>
      {selectedSupplement && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <img className="overlay-photo" src={selectedSupplement.image} alt={selectedSupplement.name} />
            <h3 className="overlay-name">{selectedSupplement.name}</h3>
            <p className="overlay-description">{selectedSupplement.description}</p>
            <p className="overlay-price">{selectedSupplement.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
