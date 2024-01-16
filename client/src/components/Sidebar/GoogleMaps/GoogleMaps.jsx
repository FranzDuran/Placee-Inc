import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import SearchBox from './SearchBox';

const mapContainerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px',
};

const defaultCenter = {
  lat: -12.02577326193344, // Latitud inicial
  lng: -77.31745482108892, // Longitud inicial
};

const GoogleMaps = ({ onAddressChange }) => {
  const apiKey = 'AIzaSyAcXdSPbAYdJBp_1uV9aD6eFekk2yWivbk';
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
  

  /* const onLoad = (map) => {
    setMap(map);
  }; */

  const onMarkerDragEnd = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const onPlacesChanged = () => {
    const places = new window.google.maps.places.PlacesService(map);
    // Aquí puedes usar el objeto 'places' para buscar información adicional sobre el lugar seleccionado.
    // Puedes acceder a la dirección utilizando places.getDetails()
    map && map.panTo(markerPosition);
  };

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setMarkerPosition(latLng);
      onPlacesChanged();
      onAddressChange(selectedAddress);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
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
    </LoadScript>
  );
};

export default GoogleMaps;
