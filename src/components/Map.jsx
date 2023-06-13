import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import styles from "../styles/Map.module.css";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-icon.png';

let iconUbicacion = new L.icon({
  iconUrl: icon,
  iconShadow: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ lat, lon }) => {
  const defaultPosition = [-34.61, -58.38];
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && lat && lon) {
      const mapInstance = mapRef.current.leafletElement;
      mapInstance.flyTo([lat, lon], 13);
    }
  }, [lat, lon]);

  return (
    <div>
      <MapContainer
        center={lat && lon ? [lat, lon] : defaultPosition}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.mapContainer}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={lat && lon ? [lat, lon] : defaultPosition} icon={iconUbicacion}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};


export default Map;
