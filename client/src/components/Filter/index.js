import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { containerClasses } from '@mui/material';
import './styles.css';



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
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function FloatingActionButtonZoom() {
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
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  const america = [
    "Canadá",
    "Estados Unidos",
    "México",
    "Belice",
    "Costa Rica",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "Nicaragua",
    "Panamá",
    "Antigua y Barbuda",
    "Bahamas",
    "Barbados",
    "Cuba",
    "Dominica",
    "Granada",
    "Haití",
    "Jamaica",
    "Puerto Rico",
    "República Dominicana",
    "San Cristóbal y Nieves",
    "Santa Lucía",
    "San Vicente y las Granadinas",
    "Trinidad y Tobago",
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Perú",
    "Surinam",
    "Uruguay",
    "Venezuela"
  ]


  const europa = [
    "Albania",
    "Alemania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaiyán",
    "Bélgica",
    "Bielorrusia",
    "Bosnia y Herzegovina",
    "Bulgaria",
    "Chipre",
    "Ciudad del Vaticano",
    "Croacia",
    "Dinamarca",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estonia",
    "Finlandia",
    "Francia",
    "Georgia",
    "Grecia",
    "Hungría",
    "Irlanda",
    "Islandia",
    "Italia",
    "Kazajistán",
    "Letonia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Malta",
    "Moldavia",
    "Mónaco",
    "Montenegro",
    "Noruega",
    "Países Bajos",
    "Polonia",
    "Portugal",
    "Reino Unido",
    "República Checa",
    "Rumania",
    "Rusia",
    "San Marino",
    "Serbia",
    "Suecia",
    "Suiza",
    "Turquía",
    "Ucrania"
  ];

  const asia = [
    "Afganistán",
    "Arabia Saudita",
    "Armenia",
    "Azerbaiyán",
    "Bangladesh",
    "Baréin",
    "Birmania (Myanmar)",
    "Brunéi",
    "Bután",
    "Camboya",
    "Catar",
    "China",
    "Chipre",
    "Corea del Norte",
    "Corea del Sur",
    "Emiratos Árabes Unidos",
    "Filipinas",
    "Georgia",
    "India",
    "Indonesia",
    "Irak",
    "Irán",
    "Israel",
    "Japón",
    "Jordania",
    "Kazajistán",
    "Kirguistán",
    "Kuwait",
    "Laos",
    "Líbano",
    "Malasia",
    "Maldivas",
    "Mongolia",
    "Nepal",
    "Omán",
    "Pakistán",
    "Palestina",
    "Qatar",
    "Rusia",
    "Singapur",
    "Siria",
    "Sri Lanka",
    "Tailandia",
    "Tayikistán",
    "Timor Oriental",
    "Turkmenistán",
    "Turquía",
    "Uzbekistán",
    "Vietnam",
    "Yemen"
  ];

  const africa = [
    "Angola",
    "Argelia",
    "Benín",
    "Botsuana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Camerún",
    "Chad",
    "Comoras",
    "Congo",
    "Costa de Marfil",
    "Egipto",
    "Eritrea",
    "Esuatini (Suazilandia)",
    "Etiopía",
    "Gabón",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Guinea Ecuatorial",
    "Kenia",
    "Lesoto",
    "Liberia",
    "Libia",
    "Madagascar",
    "Malaui",
    "Malí",
    "Marruecos",
    "Mauricio",
    "Mauritania",
    "Mozambique",
    "Namibia",
    "Níger",
    "Nigeria",
    "República Centroafricana",
    "República Democrática del Congo",
    "Ruanda",
    "Santo Tomé y Príncipe",
    "Senegal",
    "Seychelles",
    "Sierra Leona",
    "Somalia",
    "Sudáfrica",
    "Sudán",
    "Sudán del Sur",
    "Tanzania",
    "Togo",
    "Túnez",
    "Uganda",
    "Yibuti",
    "Zambia",
    "Zimbabue"
  ];
  const oceania = [
    "Australia",
    "Fiyi",
    "Islas Marshall",
    "Islas Salomón",
    "Kiribati",
    "Micronesia",
    "Nauru",
    "Nueva Zelanda",
    "Palaos",
    "Papúa Nueva Guinea",
    "Samoa",
    "Tonga",
    "Tuvalu",
    "Vanuatu"
  ];
  
  const URL ='https://http2.mlstatic.com/D_NQ_NP_2X_951973-MLA70217884926_062023-F.webp'

  return (
    <div className='filter-container'>

      <Box
        sx={{
          bgcolor: 'background.paper',
          width: "100%",
          position: 'relative',
          minHeight: 200,
          marginTop: '20px',
          
        }}
      >

        <AppBar position="static" color="default">
  
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
            
            >
            <Tab sx={{ height: '100px', background: '#ffff', boxShadow: '0px 0px 10px'}} label="America" {...a11yProps(0)} />
            <Tab sx={{ height: '100px', background: '#ffff'}} label="Europa" {...a11yProps(1)} />
            <Tab sx={{ height: '100px', background: '#ffff'}} label="Asia" {...a11yProps(2)} />
            <Tab sx={{ height: '100px', background: '#ffff'}} label="Africa" {...a11yProps(3)} />
            <Tab sx={{ height: '100px', background: '#ffff'}} label="Oceania" {...a11yProps(4)} />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}

        >
          <TabPanel value={value} index={0} dir={theme.direction} >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {america.map(country => (

                <Tab label={country} />
              ))}

            </Tabs>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {europa.map(country => (

                <Tab label={country} />
              ))}
            </Tabs>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {asia.map((country, index) => (

                <Tab label={country}  id={index}/>
              ))}
            </Tabs>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {africa.map(country => (

                <Tab label={country} />
              ))}
            </Tabs>
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {oceania.map(country => (

                <Tab label={country} />
              ))}
            </Tabs>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}