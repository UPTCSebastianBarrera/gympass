import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const UserLocationMap = ({ position, gyms }) => {
  const mapRef = useRef(null);

  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [20, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position);
    }
  }, [position]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Estás aquí</Popup>
      </Marker>
      {gyms.map((gym) => (
        gym.coords && (
          <Marker key={gym._id} position={[gym.coords.lat, gym.coords.lon]} icon={customIcon}>
            <Popup>
              <strong>{gym.name}</strong><br />
              {gym.description}<br />
              Dirección: {gym.address}<br />
              Horario: {gym.schedule}<br />
              Precio: {gym.price}<br />
              Planes: {gym.plans.join(", ")}<br />
              Tags: {gym.tags.join(", ")}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default UserLocationMap;
