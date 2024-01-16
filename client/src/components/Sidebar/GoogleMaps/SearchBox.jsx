import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import React, { useState } from 'react';
import styles from './GoogleMaps.module.scss';

const SearchBox = ({ onSelect }) => {
  const [address, setAddress] = useState('');
  
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      onSelect(selectedAddress, latLng);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  const handleInputChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSearchClick = () => {
    // Llama a handleSelect cuando se hace clic en el botón de búsqueda
    handleSelect(address);
  };

  return (
    <PlacesAutocomplete
    value={address}
    onChange={handleInputChange}
    onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={styles.containerSearch}>
          <div className={styles.contentInput} >
          <input
            className={styles.input}
            {...getInputProps({ placeholder: 'Buscar dirección' })}
          />
          <button className={styles.searchButton} onClick={handleSearchClick}>
          <i class="ri-map-pin-2-fill"></i>
          </button>
          </div>
          <div
            className={`${
              suggestions.length !== 0 ? styles.results : styles.resultsNone
            } `}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.placeId}
                {...getSuggestionItemProps(suggestion)}
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
export default SearchBox;
