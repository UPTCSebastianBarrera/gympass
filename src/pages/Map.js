import React, { useState, useEffect } from 'react';
import './Map.css';
import UserLocationMap from '../components/UserLocationMap';

const Map = () => {
  const [userData, setUserData] = useState({ name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' });
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
        }
      );
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
          <button>Más cerca</button>
        </div>
      </div>
      <div className="map">
        <UserLocationMap position={userPosition} />
      </div>
    </div>
  );
};

export default Map;
