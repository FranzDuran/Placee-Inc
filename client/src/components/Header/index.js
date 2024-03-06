import React, { useEffect, useState, useRef } from "react";
import "./header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import { Link } from "react-router-dom";
import Search from "../Search/Searchs";
import Nudo from "../../assets/logo/Nudo.png";

function Header() {
  const [favoriteCards, setFavoriteCards] = useState([]);
 
  useEffect(() => {
    const storedFavoriteCards = localStorage.getItem("favoriteCards");
    if (storedFavoriteCards) {
      try {
        setFavoriteCards(JSON.parse(storedFavoriteCards));
      } catch (error) {
        console.error("Error parsing favorite cards:", error);
      }
    }
  }, []);

  return (
    <div className="navbar-container2">
      <Link to="/">
        <img src={Nudo} alt="logo" className="navbar-logo" />
      </Link>
      <div className="search-bar">
        <Search />
      </div>
      <div className="profile-container">
        <div className="container-favoritos">
          <Link to="/favoritos">
            <i class="ri-heart-line" id="icon-favoritos"></i>
          </Link>
          {/* {favoriteCards.length > 0 && (
            <span className="item-favorito">{favoriteCards.length}</span>
          )} */}
        </div>
        <div className="airbnb-your-home">
          <LanguageIcon sx={{ fontSize: "1.3rem" }} id="icons-lenguage" />
        </div>
        <div className="profile-div">
          <BasicMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;
