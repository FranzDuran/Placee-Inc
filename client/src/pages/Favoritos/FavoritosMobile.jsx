import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import style from "./FavoritosMobile.module.scss";
import styles from "./Favoritos.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export default function FavoritosMobile({
  favoriteCards,
  Nudo,
  getRandomColor,
  loading,
  maxLength,
  handleFavoriteClick,
  searchTerm,
  handleSearchClick,
  handleSearchTermChange,
  renderSuggestions,
}) {
  const [view, setView] = useState("cards"); // Estado para controlar qué vista se muestra
  return (
    <div className={style.mobileContent}>
      <div className={style.header}>
        <Link to="/">
          <img src={Nudo} alt="logo" className={style.logo} />
        </Link>
      </div>
      <div className={style.titleContainer}>
        <div className={style.contentTitle}>
          <div className={style.numberContent}>
            <span>{favoriteCards.length}</span>
            <i class="ri-bookmark-fill" id={style.iconFavoritos}></i>
          </div>

          <div className={style.search}>
            <input
              className={style.inputSearch}
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button className={style.btnSearch} onClick={handleSearchClick}>
              <i className="ri-search-line"></i>
            </button>

            {renderSuggestions() && (
              <div className={style.suggestionsCont}>
                {renderSuggestions()}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.btnContainer}>
        {/* Botón para mostrar la vista de lista */}
        <button
          className={`${style.btnImage} ${
            view === "cards" ? style.btnActive : ""
          }`}
          onClick={() => setView("cards")}
        >
          <i className="ri-list-check"></i>
        </button>
        {/* Botón para mostrar la vista de galería */}
        <button
          className={`${style.btnImage} ${
            view === "gallery" ? style.btnActive : ""
          }`}
          onClick={() => setView("gallery")}
        >
          <i className="ri-grid-line"></i>
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : favoriteCards.length > 0 ? (
        <>
          {/* Mostrar la vista de lista si el estado es "cards" */}
          {view === "cards" && (
            <div className={style.cardsContainerLista}>
              {favoriteCards.map((card, index) => (
                <div className={style.card} key={index}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    className={style.swiperContainer}
                    //navigation
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {card.imageFile.map((image, idx) => (
                      <SwiperSlide key={idx} className={style.swiperSlide}>
                        <div className={style.imageContainer} key={idx}>
                          <img
                            src={image}
                            alt={`Imagen ${idx}`}
                            className={style.image}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button
                    className={style.iconFavoritos}
                    onClick={() => handleFavoriteClick(card.id)}
                  >
                    <i className="ri-bookmark-line"></i>
                  </button>
                  <a href={`/rooms/${card.id}`}>
                    <div className={style.textCard}>
                      <h3>{card.title}</h3>
                      <Avatar id={style.avatar}>
                        {card.avatar ? (
                          <img src={card.avatar} alt={`Imagen`} />
                        ) : (
                          <div
                            style={{
                              backgroundColor: getRandomColor(),
                              color: "white",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                            }}
                          >
                            {card.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Mostrar la vista de galería si el estado es "gallery" */}
          {view === "gallery" && (
            <div className={style.containerGallery}>
              <div className={style.gallery}>
                {favoriteCards.map((card, index) => (
                  <div className={style.galleryItem} key={index}>
                    <a href={`/rooms/${card.id}`}>
                      <img
                        src={card.imageFile[0]}
                        alt={`Imagen`}
                        className={style.galleryImagen}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={style.containerSinFavoritos}>
          <h2>No hay cartas favoritas disponibles.</h2>
        </div>
      )}
    </div>
  );
}
