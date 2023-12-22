import React from "react";
import "./header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Nudo from '../../assets/logo/Nudo.png';

function Header() {
  return (
    <div className="navbar-container2">
      <Link to='/'>
        <img src={Nudo} alt="logo" className="navbar-logo" />

      </Link>
      <div className="search-bar">
        <Search />

      </div>
      <div className="profile-container">
        <Link to="/public">
        </Link>
        <div className="airbnb-your-home">
          <LanguageIcon sx={{ fontSize: "1.3rem" }} id='icons-lenguage' />
        </div>
        <div className="profile-div">
          <BasicMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;
