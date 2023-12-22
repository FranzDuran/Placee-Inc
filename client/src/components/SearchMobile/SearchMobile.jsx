import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Continent from '../Continent/Continent';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import  './SearchMobile.scss';
import FilterCard from '../FilterCard/FilterCard';
import InputSearch from '../InputSearch/InputSearch';


export default function SearchMobile() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div className='search-container'>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{color: "#000",  }}>
             <div>
             <span>Buscar</span>
             <SearchRoundedIcon className="search-icon" />
            </div>
              </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <h3
            className="x-search"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            &times;
          </h3>
          <div>
              <InputSearch />
            </div>
            <div>
           
              <FilterCard />
            </div>
            
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}