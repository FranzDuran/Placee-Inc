import { useState } from 'react';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./InputSearch.scss";

export default function InputSearch({ cards, setFilteredCards }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterCards(value);
  };

  const filterCards = (value) => {
    const filtered = cards.filter(card => {
      return card.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCards(filtered);
  };

  return (
    <div className="input-search5">
      <div className="content-input-search5" >
        <input 
          type="text" 
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="inputsearch-icon5">
          <SearchRoundedIcon className="icons-searchinput5" />
        </button>
      </div>
    </div>
  );
}
