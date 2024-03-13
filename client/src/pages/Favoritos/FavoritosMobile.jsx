import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import styles from "./FavoritosMobile.module.scss";

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
}) {
  const [view, setView] = useState("cards"); // Estado para controlar qué vista se muestra
  return (
    <div className={styles.mobileContent}>
      <div className={styles.header}>
        <Link to="/">
          <img src={Nudo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.contentTitle}>
          <div className={styles.numberContent}>
            <span>{favoriteCards.length}</span>
            <i class="ri-bookmark-fill" id={styles.iconFavoritos}></i>
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
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        {/* Botón para mostrar la vista de lista */}
        <button
          className={`${styles.btnImage} ${
            view === "cards" ? styles.btnActive : ""
          }`}
          onClick={() => setView("cards")}
        >
          <i className="ri-list-check"></i>
        </button>
        {/* Botón para mostrar la vista de galería */}
        <button
          className={`${styles.btnImage} ${
            view === "gallery" ? styles.btnActive : ""
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
            <div className={styles.cardsContainerLista}>
              {favoriteCards.map((card, index) => (
                <div className={styles.card} key={index}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    className={styles.swiperContainer}
                    //navigation
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
            <div className={styles.containerGallery}>
              <div className={styles.gallery}>
                {favoriteCards.map((card, index) => (
                  <div className={styles.galleryItem} key={index}>
                    <a href={`/rooms/${card.id}`}>
                      <img
                        src={card.imageFile[0]}
                        alt={`Imagen`}
                        className={styles.galleryImagen}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.containerSinFavoritos}>
          <h2>No hay cartas favoritas disponibles.</h2>
        </div>
      )}
    </div>
  );
}
