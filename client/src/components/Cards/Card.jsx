import React, { useState, useEffect } from "react";
import "./Cards.scss";
import Carousel from "react-bootstrap/Carousel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { AllPostTuristic, dataPersonal } from "../../redux/action";
import InputSearch from "../InputSearch/InputSearch";

function Card() {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCards, setFilteredCards] = useState([]);
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.allPost);
  const token = useSelector((state) => state.token);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  useEffect(() => {
    dispatch(dataPersonal(token));

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(AllPostTuristic());

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    let totalImagesToLoad = 0;
    allPost.forEach((data) => {
      data.Posts.forEach((info) => {
        totalImagesToLoad += info.imageFile.length;
      });
    });

    let loadedImages = 0;

    function handleImageLoad() {
      loadedImages++;
      if (loadedImages === totalImagesToLoad) {
        setImagesLoaded(true);
      }
    }

    if (totalImagesToLoad > 0) {
      allPost.forEach((data) => {
        data.Posts.forEach((info) => {
          info.imageFile.forEach((imageSrc) => {
            const img = new Image();
            img.src = imageSrc;
            img.onload = handleImageLoad;
          });
        });
      });
    } else {
      setImagesLoaded(true);
    }
  }, [allPost]);

  const totalLength = allPost
    ? allPost.reduce((sum, post) => sum + post.Posts.length, 0)
    : 0;

  const maxLength = 14;

  const filterFunction = (data, searchTerm) => {
    return data.filter((item) =>
      item.Posts.some((info) =>
        info.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  //------------- FAVORITOS -----------------------
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    // Obtener las tarjetas favoritas desde el almacenamiento local al cargar el componente
    const storedFavoriteCards = localStorage.getItem("favoriteCards");
    if (storedFavoriteCards) {
      setFavoriteCards(JSON.parse(storedFavoriteCards));
    }
  }, []);

  const handleFavoriteClick = (idCard) => {
    // Buscar la tarjeta en los datos disponibles
    const cardFilter = allPost.find((data) =>
      data.Posts.some((info) => info.id === idCard)
    );

    const card = cardFilter.Posts.filter((item) => item.id === idCard);

    const cardObjeto = card[0];
    cardObjeto.avatar = cardFilter.avatar;
    cardObjeto.name = cardFilter.name;

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
    } else {
      // Si la tarjeta no está en favoritos, agregarla
      const updatedFavorites = [...favoriteCards, cardObjeto];
      setFavoriteCards(updatedFavorites);
      localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="card-container-post">
      {/*    <InputSearch data={allPost} filterFunction={filterFunction} setFilteredData={setFilteredCards} /> */}
      {isLoading ? (
        <Grid className="loading-skeleton">
          {Array.from(new Array(totalLength)).map((item, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" id="skeleton" />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width="50%" />
                <Skeleton width="30%" />
              </Box>
            </Box>
          ))}
        </Grid>
      ) : (
        imagesLoaded && (
          <div className="cards-flex">
            {allPost.map((data, i) =>
              data.Posts.map((info, index) => (
                <div className="card-box" key={index}>
                  <div className="carousel-container">
                    <Carousel
                      interval={null}
                      className="swiper-container custom-carousel"
                    >
                      {info.imageFile.map((imageSrc, imageIndex) => (
                        <Carousel.Item
                          key={imageIndex}
                          className="custom-carousel-item"
                        >
                          <a
                            href={`/rooms/${info.id}`}
                            target="_blank"
                            className="text-link"
                          >
                            <div className="image-container">
                              <img
                                srcSet={imageSrc}
                                alt={imageSrc}
                                className="card-img"
                              />
                            </div>
                          </a>
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <span
                      className="content-icon-favoritos"
                      onClick={() => handleFavoriteClick(info.id)}
                    >
                      <i className="ri-bookmark-line"></i>
                    </span>
                  </div>

                  <div className="desc-hover">
                    <a
                      href={`/rooms/${info.id}`}
                      target="_blank"
                      className="text-link"
                    >
                      {info.status === "Público" ? (
                        <div className="shadow-card">
                          <div className="card-info-flex">
                            <a href={`/rooms/${info.id}`} className="text-link">
                              <h3 className="card-title">{info.title}</h3>
                            </a>
                            <div>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  background: data.avatar
                                    ? `url(${data.avatar})`
                                    : data.backgroundColor,
                                  backgroundSize: "cover",
                                }}
                                className="perfil-avatar-content"
                              >
                                {data.avatar ? (
                                  <div></div>
                                ) : (
                                  <div>
                                    {data.name && data.name[0].toUpperCase()}
                                  </div>
                                )}
                              </Avatar>
                            </div>
                          </div>

                          <p>
                            <p
                              style={{
                                color: "var(--black)",
                              }}
                              className="price-none"
                            >
                              <span>{data.updatedAt.slice(0, 10)}</span>{" "}
                            </p>
                            <p
                              style={{
                                color: "var(--black)",
                              }}
                              className="price-none"
                            >
                              <span>Gratis</span>{" "}
                            </p>
                          </p>

                          {info.summary.split(" ").length > maxLength ? (
                            <p className="summary-card">
                              {info.summary
                                .split(" ")
                                .slice(0, maxLength)
                                .join(" ")}
                              ...
                            </p>
                          ) : (
                            <p className="summary-card">{info.summary}</p>
                          )}
                        </div>
                      ) : (
                        <div className="shadow-card">
                          <div className="card-info-flex">
                            <a
                              href={`/rooms/${info.id}`}
                              target="_blank"
                              className="text-link"
                            >
                              <h3 className="card-title">{info.title}</h3>
                            </a>
                            <div>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  background: data.avatar
                                    ? `url(${data.avatar})`
                                    : data.backgroundColor,
                                  backgroundSize: "cover",
                                }}
                              >
                                {data.avatar ? (
                                  <div></div>
                                ) : (
                                  <div>
                                    {data.name && data.name[0].toUpperCase()}
                                  </div>
                                )}
                              </Avatar>
                            </div>
                          </div>

                          <p>
                            <p
                              style={{
                                color: "var(--black)",
                              }}
                              className="price-none"
                            >
                              <span>${info.price}</span> por persona
                            </p>
                          </p>
                          {info.summary.split(" ").length > maxLength ? (
                            <p className="summary-card">
                              {info.summary
                                .split(" ")
                                .slice(0, maxLength)
                                .join(" ")}
                              ...
                            </p>
                          ) : (
                            <p className="summary-card">{info.summary}</p>
                          )}
                        </div>
                      )}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Card;
