import React, { useState } from 'react';
import Select from 'react-select';
import './Map.css';
import UserLocationMap from '../components/UserLocationMap';
import useInitializeData from '../services/Map/useInitializeData';
import { useNavigate } from 'react-router-dom';

const tagOptions = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Crossfit', label: 'Crossfit' },
  { value: '24 hr', label: '24 hr' },
  { value: 'Pesas', label: 'Pesas' },
  { value: 'Cardio', label: 'Cardio' },
  { value: 'Cycling', label: 'Cycling' },
  { value: 'Yoga', label: 'Yoga' },
  { value: 'Spinning', label: 'Spinning' },
  { value: 'Natación', label: 'Natación' },
  { value: 'Pilates', label: 'Pilates' },
  { value: 'Zumba', label: 'Zumba' },
  { value: 'Boxeo', label: 'Boxeo' }
];

const Map = () => {
  const [userPosition, setUserPosition] = useState([5.5353, -73.3678]);
  const [geoError, setGeoError] = useState(null);
  const [gyms, setGyms] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({'xd':'xd'});

  const [selectedTags, setSelectedTags] = useState([{ value: 'Todos', label: 'Todos' }]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useInitializeData(setGyms, setUserData,setUserPosition, setGeoError);

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []);
  };

  const handleGymSelect = (gym) => {
    navigate('/booking', { state: { gym } });
  };

  const filteredGyms = gyms.filter((gym) => {
    const matchesTags = selectedTags.some(tag => tag.value === 'Todos') || selectedTags.some((tag) => gym.tags.includes(tag.value));
    const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  const centerMapOnUser = () => {
    if (mapRef.current) {
      mapRef.current.centerMap();
    }
  };

  const mapRef = React.useRef(null);

  return (
    <div className="map-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar gimnasio ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          isMulti
          value={selectedTags}
          onChange={handleTagChange}
          options={tagOptions}
          className="tag-select"
          placeholder="Seleccionar etiquetas..."
        />
        <button className="center-button" onClick={centerMapOnUser}>Centrar en mi ubicación</button>
      </div>
      {geoError && <div className="geo-error">{geoError}</div>}
      <div className="map-container">
        {filteredGyms.length > 0 ? (
          <UserLocationMap ref={mapRef} position={userPosition} gyms={filteredGyms} onSelectGym={handleGymSelect} />
        ) : (
          <div className="no-gyms-message">No se encontraron gimnasios</div>
        )}
      </div>
    </div>
  );
};

export default Map;
