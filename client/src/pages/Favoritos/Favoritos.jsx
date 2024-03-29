import React, { useEffect, useState, useRef } from "react";
import styles from "./Favoritos.module.scss";
import "swiper/swiper-bundle.css";
import Avatar from "@mui/material/Avatar";
import Nudo from "../../assets/logo/Nudo.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Favoritos.scss";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useSelector } from "react-redux";
import FavoritosMobile from "./FavoritosMobile";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Favoritos() {
  const isResponsive = useMediaQuery("(max-width: 767px)"); // Cambia el valor del ancho máximo según tu necesidad
  const allPost = useSelector((state) => state.allPost);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavoriteCards = localStorage.getItem("favoriteCards");
    if (storedFavoriteCards) {
      try {
        setFavoriteCards(JSON.parse(storedFavoriteCards));
      } catch (error) {
        console.error("Error parsing favorite cards:", error);
      }
    }
    setLoading(false);
  }, []);

  const maxLength = 14;

  //------------- FAVORITOS -----------------------

  const handleFavoriteClick = (idCard) => {
    // Verificar si la tarjeta ya está en favoritos
    const existingFavoriteIndex = favoriteCards.findIndex(
      (favorite) => favorite.id === idCard
    );

    if (existingFavoriteIndex !== -1) {
      // Si la tarjeta ya está en favoritos, eliminarla
      const updatedFavorites = [...favoriteCards];
      updatedFavorites.splice(existingFavoriteIndex, 1);
      setFavoriteCards(updatedFavorites);
      localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
    }
  };

  //----------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  console.log(searchTerm);

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Filter the favorite cards based on the input value
    const filteredCards = favoriteCards.filter((card) =>
      card.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredCards);
  };

  const handleSearchClick = () => {
    // Clear suggestions when search is initiated
    setSuggestions([]);
    // Find the favorite card that exactly matches the search term
    const selectedCard = favoriteCards.find(
      (card) => card.title.toLowerCase() === searchTerm.toLowerCase()
    );

    if (selectedCard) {
      // If a matching card is found, update the state with the selected card
      setFavoriteCards([selectedCard]);
    } else {
      // If no matching card is found, show all favorite cards
      setFavoriteCards(JSON.parse(localStorage.getItem("favoriteCards")) || []);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSuggestions([]); // Clear suggestions after selecting one
    handleSearchClick(); // Perform search directly
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0 || searchTerm === "") {
      return null; // Don't render suggestions if input is empty or no suggestions
    } else {
      return (
        <div className={styles.suggestionsContainer}>
          {suggestions.map((card, index) => (
            <div
              className={styles.suggestion}
              key={index}
              onClick={() => handleSuggestionClick(card.title)}
            >
              <p>{card.title}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      {isResponsive ? (
        <FavoritosMobile
          favoriteCards={favoriteCards}
          Nudo={Nudo}
          loading={loading}
          getRandomColor={getRandomColor}
          maxLength={maxLength}
          handleFavoriteClick={handleFavoriteClick}
          searchTerm={searchTerm}
          handleSearchClick={handleSearchClick}
          handleSearchTermChange={handleSearchTermChange}
          renderSuggestions={renderSuggestions}
        />
      ) : (
        // Renderizar elementos específicos para desktop

        <div className={styles.desktopContent}>
          <div className={styles.header}>
            <span className={styles.btnVolver}>
              <Link to="/">
                <i className="ri-arrow-left-line"></i>
              </Link>
            </span>
            <Link to="/">
              <img src={Nudo} alt="logo" className={styles.logo} />
            </Link>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.contentTitle}>
              <span>{favoriteCards.length}</span>
              <h2>Lugares guardados</h2>
            </div>
            <div className={styles.search}>
              <input
                className={styles.inputSearch}
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <button className={styles.btnSearch} onClick={handleSearchClick}>
                <i class="ri-search-line"></i>
              </button>
              {renderSuggestions()}
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : favoriteCards.length > 0 ? (
            <div className={styles.cardsContainer}>
              {favoriteCards.map((card, index) => (
                <div className={styles.card} key={index}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    className={styles.swiperContainer}
                    navigation
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {card.imageFile.map((image, idx) => (
                      <SwiperSlide key={idx} className={styles.swiperSlide}>
                        <div className={styles.imageContainer} key={idx}>
                          <img
                            src={image}
                            alt={`Imagen ${idx}`}
                            className={styles.image}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button
                    className={styles.iconFavoritos}
                    onClick={() => handleFavoriteClick(card.id)}
                  >
                    <i className="ri-bookmark-line"></i>
                  </button>
                  <a href={`/rooms/${card.id}`}>
                    <div className={styles.textCard}>
                      <h3>{card.title}</h3>
                      <Avatar id={styles.avatar}>
                        {card.avatar ? (
                          <img src={card.avatar} alt={`Imagen`} />
                        ) : (
                          <div
                            style={{
                              backgroundColor: getRandomColor(),
                              color: "white",
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "20px",
                            }}
                          >
                            {card.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </Avatar>
                      <p>
                        {card.price
                          ? "$ " + card.price + " por Adulto"
                          : "Gratis"}
                      </p>
                      {card.priceMenores && (
                        <p>{card.priceMenores + " por Niño"}</p>
                      )}
                      <div className={styles.text}>
                        {card.summary.split(" ").length > maxLength ? (
                          <p className={styles.summaryCard}>
                            {card.summary
                              .split(" ")
                              .slice(0, maxLength)
                              .join(" ")}
                            ...
                          </p>
                        ) : (
                          <p className={styles.summaryCard}>{card.summary}</p>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.containerSinFavoritos}>
              <h2>No hay cartas favoritas disponibles.</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}
