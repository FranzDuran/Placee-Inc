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

  const asia = [
    { name: 'Afganistán', countryCode: 'af' },
    { name: 'Arabia Saudita', countryCode: 'sa' },
    { name: 'Armenia', countryCode: 'am' },
    { name: 'Azerbaiyán', countryCode: 'az' },
    { name: 'Baréin', countryCode: 'bh' },
    { name: 'Bangladés', countryCode: 'bd' },
    { name: 'Birmania', countryCode: 'mm' },
    { name: 'Brunéi', countryCode: 'bn' },
    { name: 'Bután', countryCode: 'bt' },
    { name: 'Camboya', countryCode: 'kh' },
    { name: 'Catar', countryCode: 'qa' },
    { name: 'China', countryCode: 'cn' },
    { name: 'Chipre', countryCode: 'cy' },
    { name: 'Corea', countryCode: 'kr' },
    { name: 'Emiratos', countryCode: 'ae' },
    { name: 'Filipinas', countryCode: 'ph' },
    { name: 'Georgia', countryCode: 'ge' },
    { name: 'India', countryCode: 'in' },
    { name: 'Indonesia', countryCode: 'id' },
    { name: 'Irak', countryCode: 'iq' },
    { name: 'Irán', countryCode: 'ir' },
    { name: 'Israel', countryCode: 'il' },
    { name: 'Japón', countryCode: 'jp' },
    { name: 'Jordania', countryCode: 'jo' },
    { name: 'Kazajistán', countryCode: 'kz' },
    { name: 'Kirguistán', countryCode: 'kg' },
    { name: 'Kuwait', countryCode: 'kw' },
    { name: 'Laos', countryCode: 'la' },
    { name: 'Líbano', countryCode: 'lb' },
    { name: 'Malasia', countryCode: 'my' },
    { name: 'Maldivas', countryCode: 'mv' },
    { name: 'Mongolia', countryCode: 'mn' },
    { name: 'Nepal', countryCode: 'np' },
    { name: 'Omán', countryCode: 'om' },
    { name: 'Pakistán', countryCode: 'pk' },
    { name: 'Palestina', countryCode: 'ps' },
    { name: 'Singapur', countryCode: 'sg' },
    { name: 'Siria', countryCode: 'sy' },
    { name: 'Sri Lanka', countryCode: 'lk' },
    { name: 'Tailandia', countryCode: 'th' },
    { name: 'Tayikistán', countryCode: 'tj' },
    { name: 'Turkmenistán', countryCode: 'tm' },
    { name: 'Turquía', countryCode: 'tr' },
    { name: 'Uzbekistán', countryCode: 'uz' },
    { name: 'Vietnam', countryCode: 'vn' },
    { name: 'Yemen', countryCode: 'ye' },
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
{asia.map((country) => (
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
