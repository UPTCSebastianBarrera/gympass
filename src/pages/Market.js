// src/pages/Market.js
import React, { useState, useEffect } from 'react';
import './Market.css';

const mockSupplementsData = [
  { id: 1, name: 'Gold Whey', description: 'Updated today', price: '$29.99', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Dinamize ISO 100', description: 'Updated yesterday', price: '$35.99', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Smart Whey Pure', description: 'Updated 2 days ago', price: '$25.99', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Funat Whey Protein', description: 'Updated today', price: '$27.99', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Bi-Pro Classic', description: 'Updated yesterday', price: '$32.99', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Whey Protein Plus', description: 'Updated 3 days ago', price: '$24.99', image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Optimum Nutrition Whey', description: 'Updated 4 days ago', price: '$31.99', image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'MuscleTech NitroTech', description: 'Updated 5 days ago', price: '$36.99', image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Body Fortress Whey', description: 'Updated 6 days ago', price: '$22.99', image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Dymatize Elite Whey', description: 'Updated a week ago', price: '$28.99', image: 'https://via.placeholder.com/150' }
];

const Market = () => {
  const [supplements, setSupplements] = useState([]);
  const [selectedSupplement, setSelectedSupplement] = useState(null);

  useEffect(() => {
    // Simulate fetching data from backend
    setSupplements(mockSupplementsData);
  }, []);

  const handleSupplementClick = (supplement) => {
    setSelectedSupplement(supplement);
  };

  const handleOverlayClick = () => {
    setSelectedSupplement(null);
  };

  return (
    <div className="market-page">
      <div className="market-header">
        <img className="user-photo" src="https://via.placeholder.com/50" alt="Profile" />
        <h2 className="user-name">Pedro</h2>
      </div>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search supplements..." />
        <div className="tags">
          <button className="tag-button">Proteina</button>
          <button className="tag-button">Pre entreno</button>
          <button className="tag-button">Creatina</button>
          <button className="tag-button">Gainers</button>
        </div>
      </div>
      <div className={`supplements-grid ${selectedSupplement ? 'blurred' : ''}`}>
        {supplements.map((supplement) => (
          <div className="supplement-item" key={supplement.id} onClick={() => handleSupplementClick(supplement)}>
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
