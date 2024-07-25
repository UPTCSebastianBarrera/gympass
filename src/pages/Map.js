import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Map.css';
import UserLocationMap from '../components/UserLocationMap';

const Map = () => {
  const [userData, setUserData] = useState({ name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' });
  const [userPosition, setUserPosition] = useState([4.7110, -74.0721]); // Inicialmente Bogotá
  const [geoError, setGeoError] = useState(null); // Estado para manejar errores de geolocalización
  const [gyms, setGyms] = useState([]); // Estado para los gimnasios

  const geocodeAddress = async (address) => {
    try {
      let encodedAddress = encodeURIComponent(address);
      let response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`);

      if (response.data && response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
      }

      // Si no encuentra coordenadas, intenta sin la ciudad
      const addressWithoutCity = address.split(',')[0];
      encodedAddress = encodeURIComponent(addressWithoutCity);
      response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`);

      if (response.data && response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
      }

      console.error(`No coordinates found for address: ${address}`);
      return null;
    } catch (error) {
      console.error(`Error geocoding address: ${address}`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/gyms');
        const gymsWithCoords = await Promise.all(
          data.map(async (gym) => {
            const coords = await geocodeAddress(gym.address);
            return {
              ...gym,
              coords,
            };
          })
        );
        setGyms(gymsWithCoords.filter(gym => gym.coords !== null));
      } catch (error) {
        console.error('Error fetching gyms', error);
      }
    };

    fetchGyms();

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
          setGeoError('No se pudo obtener su ubicación. Asegúrese de que los servicios de ubicación estén habilitados.');
          console.error('Error obteniendo la ubicación', error);
        }
      );
    } else {
      setGeoError('La geolocalización no es compatible con este navegador.');
    }
  }, []);

  return (
    <div className="map-page">
      <div className="map-header">
        <div className="user-info">
          <img className="user-photo" src={userData.profilePicture} alt="Profile" />
          <h2 className="user-name">{userData.name}</h2>
        </div>
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
      {geoError && <div className="geo-error">{geoError}</div>} {/* Mostrar el mensaje de error si hay */}
      <div className="map-container">
        <UserLocationMap position={userPosition} gyms={gyms} />
      </div>
    </div>
  );
};

export default Map;
