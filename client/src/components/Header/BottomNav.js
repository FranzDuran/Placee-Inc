import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import './header.scss';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Drawer from "@mui/material/Drawer";
import FilterCard from '../FilterCard/FilterCard';
import InputSearch from "../InputSearch/InputSearch";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const anchor = "top"; // Definir el valor de 'anchor' fuera del map

  return (
    <div className="bottom-nav">
      {["top"].map((anchor) => (
        <div key={anchor}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recentes" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon />} />
            <BottomNavigationAction
              onClick={toggleDrawer(anchor, true)}
              label="Buscar"
              icon={<SearchRoundedIcon />}
            />
          </BottomNavigation>
        </div>
      ))}

      {/* Fuera del mapeo */}
      <div>
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
      </div>
    </div>
  );
}
