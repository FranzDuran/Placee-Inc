import React, { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./Search.scss";
import FilterCard from "../FilterCard/FilterCard";
import InputSearch from "../InputSearch/InputSearch";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";

import { OnlyAllPost } from "../../redux/action";

export default function Searchs() {
  const dispatch = useDispatch();
  const onlypost = useSelector((state) => state.onlypost);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);
  console.log(onlypost);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    dispatch(OnlyAllPost());
  }, [dispatch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <div className="search-button">
        <button onClick={toggleDrawer} className="btn-search">
          Buscar por tipo
        </button>
        <div className="vertical-line"></div>

        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar..."
            onClick={() => setIsSearch(true)}
          />
          <Paper
            sx={{
              width: 320,
              maxWidth: "100%",
              position: "absolute",
              marginTop: "3em",
              textAlign: "center",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            {isSearch &&
              onlypost &&
              onlypost.map((data) => (
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <Avatar
                        src={data.imageFile && data.imageFile[0]}
                        sx={{
                          width: 60,
                          height: 60,
                        }}
                        className="perfil-avatar-content"
                      >
                        {data.avatar ? (
                          <div></div>
                        ) : (
                          <div>{data.name && data.name[0].toUpperCase()}</div>
                        )}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText>
                      {data.title}
                      <ListItemText sx={{ color: "gray" }}>
                        {data.continent}, {data.country}{" "}
                      </ListItemText>
                    </ListItemText>
                  </MenuItem>
                  <Divider />
                </MenuList>
              ))}
          </Paper>

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
        <div className="content-input-search">
          <InputSearch />
        </div>
        <div className="content-filter-card">
          <FilterCard />
        </div>
      </Drawer>
    </div>
  );
}
