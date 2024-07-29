import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: require('./UserLocation.png'),
  iconSize: [30, 51],
  iconAnchor: [10, 51],
});

const gymIcon = new L.Icon({
  iconUrl: require('./GymUbi.png'),
  iconSize: [35, 41],
  iconAnchor: [6, 41],
});

const UserLocationMap = forwardRef(({ position, gyms, onSelectGym }, ref) => {
  const mapRef = useRef(null);

  useImperativeHandle(ref, () => ({
    centerMap() {
      if (mapRef.current) {
        mapRef.current.setView(position, mapRef.current.getZoom());
      }
    }
  }));

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position);
    }
  }, [position]);

  const handleGymClick = (gym) => {
    onSelectGym(gym);
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={userIcon}>
        <Popup>Estás aquí</Popup>
      </Marker>
      {gyms.map((gym) => (
        <Marker key={gym._id} position={[gym.coords.lat, gym.coords.lon]} icon={gymIcon}>
          <Popup>
            <div className="gym-popup" onClick={() => handleGymClick(gym)}>
              <strong>{gym.name}</strong><br />
              {gym.description}<br />
              Dirección: {gym.address}<br />
              Horario: {gym.schedule}<br />
              Precio: {gym.price}<br />
              Planes: {gym.plans.join(", ")}<br />
              Tags: {gym.tags.join(", ")}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default UserLocationMap;
