import React, { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

const LocationSearchBox = ({ onPlaceSelect, apiKey }) => {
  const [searchBox, setSearchBox] = useState(null);

  const handlePlacesChanged = () => {
    const places = searchBox.getPlaces();
    onPlaceSelect(places[0]);
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => setSearchBox(ref)}
      onPlacesChanged={handlePlacesChanged}
    >
      <input
        type="text"
        placeholder="Buscar dirección"
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
        }}
      />
    </StandaloneSearchBox>
  );
};

export default LocationSearchBox;
