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
//import 'semantic-ui-css/semantic.min.css';

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

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

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

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit",
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  const africa = [
    { name: 'Algeria', countryCode: 'dz' },
    { name: 'Angola', countryCode: 'ao' },
    { name: 'Benin', countryCode: 'bj' },
    { name: 'Botswana', countryCode: 'bw' },
    { name: 'Burkina F.', countryCode: 'bf' },
    { name: 'Burundi', countryCode: 'bi' },
    { name: 'Cameroon', countryCode: 'cm' },
    { name: 'Cape Verde', countryCode: 'cv' },
    { name: 'Chad', countryCode: 'td' },
    { name: 'Comoros', countryCode: 'km' },
    { name: 'Congo', countryCode: 'cd' },
    { name: 'Congo Bra.', countryCode: 'cg' },
    { name: 'Djibouti', countryCode: 'dj' },
    { name: 'Egypt', countryCode: 'eg' },
    { name: ' Guinea', countryCode: 'gq' },
    { name: 'Eritrea', countryCode: 'er' },
    { name: 'Eswatini', countryCode: 'sz' },
    { name: 'Ethiopia', countryCode: 'et' },
    { name: 'Gabon', countryCode: 'ga' },
    { name: 'Gambia', countryCode: 'gm' },
    { name: 'Ghana', countryCode: 'gh' },
    { name: 'Guinea', countryCode: 'gn' },
    { name: 'Guinea-Bi.', countryCode: 'gw' },
    { name: 'Ivory Coast', countryCode: 'ci' },
    { name: 'Kenya', countryCode: 'ke' },
    { name: 'Lesotho', countryCode: 'ls' },
    { name: 'Liberia', countryCode: 'lr' },
    { name: 'Libya', countryCode: 'ly' },
    { name: 'Madagascar', countryCode: 'mg' },
    { name: 'Malawi', countryCode: 'mw' },
    { name: 'Mali', countryCode: 'ml' },
    { name: 'Mauritania', countryCode: 'mr' },
    { name: 'Mauritius', countryCode: 'mu' },
    { name: 'Morocco', countryCode: 'ma' },
    { name: 'Mozambique', countryCode: 'mz' },
    { name: 'Namibia', countryCode: 'na' },
    { name: 'Niger', countryCode: 'ne' },
    { name: 'Nigeria', countryCode: 'ng' },
    { name: 'Rwanda', countryCode: 'rw' },
    { name: 'Sao Tome', countryCode: 'st' },
    { name: 'Senegal', countryCode: 'sn' },
    { name: 'Seychelles', countryCode: 'sc' },
    { name: 'Sierra L.', countryCode: 'sl' },
    { name: 'Somalia', countryCode: 'so' },
    { name: 'Sudafrica', countryCode: 'za' },
    { name: 'Sudan', countryCode: 'ss' },
    { name: 'Sudan', countryCode: 'sd' },
    { name: 'Tanzania', countryCode: 'tz' },
    { name: 'Togo', countryCode: 'tg' },
    { name: 'Tunisia', countryCode: 'tn' },
    { name: 'Uganda', countryCode: 'ug' },
    { name: 'Zambia', countryCode: 'zm' },
    { name: 'Zimbabwe', countryCode: 'zw' }
  ];
  
  // Puedes acceder a la lista de países de África a través de la variable 'africanCountries'
  



  return (
    <div className="country-container">
  <Tabs
    value={value}
    onChange={handleChange}
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
  >
{africa.map((country) => (
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
