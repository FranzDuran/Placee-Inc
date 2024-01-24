import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import SearchBox from './SearchBox';
import styles from "./GoogleMaps.module.scss"

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px',
};

const defaultCenter = {
  lat: -12.02577326193344,
  lng: -77.31745482108892,
};

const GoogleMaps = ({ onAddressChange }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState('');

  const [initialLocation, setInitialLocation] = useState(null);

  const onLoad = (map) => {
    setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialLatLng = { lat: latitude, lng: longitude };
          setInitialLocation(initialLatLng);
          setMarkerPosition(initialLatLng);
          map.panTo(initialLatLng);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const onMarkerDragEnd = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const onPlacesChanged = () => {
    map && map.panTo(markerPosition);
  };

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setMarkerPosition(latLng);
      onPlacesChanged();
      //onAddressChange(selectedAddress);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  const handleAddressChange = () => {
    onAddressChange(address);
  };

  return (
    <>
      <SearchBox onSelect={handleSelect} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialLocation || defaultCenter}
        zoom={15}
        onLoad={onLoad}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>
      <button id={styles.btnMaps} onClick={handleAddressChange}>Guardar</button>
    </>
  );
};

export default GoogleMaps;
