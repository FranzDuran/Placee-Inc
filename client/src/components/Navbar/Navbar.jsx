import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "../Header/ProfileMenu";
import { Link } from "react-router-dom";
import Nudo from '../../assets/logo/Nudo.png';

function Navbar() {
  return (
    <div className="navbar-container2">
      <Link to='/'>
        <img src={Nudo} alt="logo" className="navbar-logo" />

      </Link>
  
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

export default Navbar;
