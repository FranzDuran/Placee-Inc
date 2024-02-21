  import { useState } from 'react';
  import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
  import "./InputSearch.scss";
  export default function InputSearch({ data, filterFunction, setFilteredData }) {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      filterData(value);
    };
  
    const filterData = (value) => {
      const filtered = filterFunction(data, value);
      setFilteredData(filtered);
    };
  
    return (
      <div className="input-search5">
        <div className="content-input-search5">
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
  