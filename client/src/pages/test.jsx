import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
/* import FilterCard from "../FilterCard/FilterCard"; */
import Autocomplete from "@mui/material/Autocomplete";

// Define las opciones fuera del componente
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

export default function Searchs() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  
    const results = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
  
    setSearchResults(results);
  };
  

  return (
    <div className="search-container">
      <div className="search-button">
        <button onClick={toggleDrawer} className="btn-search">
          Buscar por tipo
        </button>
        <div className="vertical-line"></div>

        <div className="input-container">
          <Autocomplete
            freeSolo
            disableClearable
            options={options}
            onChange={(event, value) => handleSearch(value)}
            renderInput={(params) => (
              <CustomInput
                {...params}
                label="Buscar en Facebook"
                margin="normal"
                variant="outlined"
              />
            )}
          />
          <button>
            <SearchRoundedIcon />
          </button>
        </div>
      </div>
      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        className="container-modal-filter"
      >
        <h3 className="x-search" onClick={toggleDrawer}>
          &times;
        </h3>
   {/*      <div className="content-input-search">
          <InputSearch />
        </div> */}
   {/*      <div className="content-filter-card">
          <FilterCard />
        </div> */}
      </Drawer>
    </div>
  );
}

function CustomInput(props) {
  return (
    <input
      type="text"
      placeholder="Buscar..."
      {...props.inputProps}
      onChange={(e) => {
        if (typeof props.onChange === 'function') {
          props.onChange(e.target.value);
        }
      }}
    />
  );
}
