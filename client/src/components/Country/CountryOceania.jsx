import * as React from "react";
import PropTypes from "prop-types";
//import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { containerClasses } from "@mui/material";
import "./index.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Table, Flag } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [values, setValues] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

export default function CountryAmerica() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };






  const oceania = [
    { name: 'Australia', countryCode: 'au' },
    { name: 'Fiyi', countryCode: 'fj' },
    { name: 'Islas Marshall', countryCode: 'mh' },
    { name: 'Islas Salomón', countryCode: 'sb' },
    { name: 'Kiribati', countryCode: 'ki' },
    { name: 'Micronesia', countryCode: 'fm' },
    { name: 'Nauru', countryCode: 'nr' },
    { name: 'Nueva Zelanda', countryCode: 'nz' },
    { name: 'Palaos', countryCode: 'pw' },
    { name: 'Papúa Nueva Guinea', countryCode: 'pg' },
    { name: 'Samoa', countryCode: 'ws' },
    { name: 'Timor Oriental', countryCode: 'tl' },
    { name: 'Tonga', countryCode: 'to' },
    { name: 'Tuvalu', countryCode: 'tv' },
    { name: 'Vanuatu', countryCode: 'vu' },
  ];
  
  

  
  return (
    <div className="country-container">
       <Tabs
    value={value}
    onChange={handleChange}
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
  >
  {oceania.map((country) => (
        <div className="country-name" key={country.id}>
        <Tab
          sx={{
            '&:focus': {
              color: '#8B008B',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '160px', // Ajusta el valor según el espacio deseado
          }}
          label={
            <div className="country-filter">
              <span>{country.name}</span>
              <div>
                <p className="flag-container">
                  {<Flag id="flag-img" name={country.countryCode} />}
                </p>
              </div>
            </div>
          }
        />
      </div>
  ))}

      </Tabs>
    </div>
  );
}
