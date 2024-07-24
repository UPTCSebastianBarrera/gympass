import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const UserLocationMap = ({ position }) => {
  const defaultPosition = [51.505, -0.09];

  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const userPosition = position || defaultPosition;

  return (
    <MapContainer center={userPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={userPosition} icon={customIcon}>
        <Popup>Estás aquí</Popup>
      </Marker>
    </MapContainer>
  );
};

export default UserLocationMap;
