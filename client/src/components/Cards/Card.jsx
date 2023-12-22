import React, { useState, useEffect } from "react";
import "./Cards.scss";
import Carousel from "react-bootstrap/Carousel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { AllPostTuristic, dataPersonal } from "../../redux/action";

function Card() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.allPost);
  const token = useSelector((state) => state.token);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    dispatch(AllPostTuristic());
    dispatch(dataPersonal(token));

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch, token]);

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

  //--------------- detectar mobile------------------------------
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    // Agrega un listener para manejar cambios en el tamaño de la pantalla
    mediaQuery.addListener(handleResize);

    // Limpia el listener cuando el componente se desmonta
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  const maxLength = isMobile ? 9 : 14;

  return (
    <div className="card-container-post">
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
                    <Carousel interval={null} className="swiper-container">
                      {info.imageFile.map((imageSrc, imageIndex) => (
                        <Carousel.Item key={imageIndex}>
                          <a
                            href={"/rooms/" + info.id}
                            target="_blank"
                            className="text-link"
                          >
                            <div className="image-container">
                              <img
                                srcset={imageSrc}
                                alt={imageSrc}
                                className="card-img"
                              />
                            </div>
                          </a>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    <span className="content-icon-favoritos">
                    <i class="ri-bookmark-line"></i>
                    </span>
                  </div>

                  <div className="desc-hover">
                    <a
                      href={"/rooms/" + info.id}
                      target="_blank"
                      className="text-link"
                    >
                      {info.status === "Público" ? (
                        <div className="shadow-card">
                          <div className="card-info-flex">
                            <a href={"/rooms/" + info.id} className="text-link">
                              {/*  {info.title.split(" ").length > 2 ? (
                                <h3 className="card-title">
                                  {info.title
                                    .split(" ")
                                    .slice(0, 2)
                                    .join(" ")}
                                  ...
                                </h3>
                              ) : ( */}
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

                                  /* marginRight: "10px",
                                  marginTop: "5px", */
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
                                /* margin: "0.2rem",
                                fontSize: "1rem", */
                                color: "var(--black)",
                              }}
                              className="price-none"
                            >
                              <span
                              /* style={{
                                  fontWeight: "600",
                                  marginLeft: "10px",
                                }} */
                              >
                                {data.updatedAt.slice(0, 10)}
                              </span>{" "}
                            </p>
                            <p
                              style={{
                                /* margin: "0.2rem",
                                fontSize: "1rem", */
                                color: "var(--black)",
                              }}
                              className="price-none"
                            >
                              <span
                              /* style={{
                                  fontWeight: "600",
                                  marginLeft: "10px",
                                }} */
                              >
                                Gratis
                              </span>{" "}
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
                              href={"/rooms/" + info.id}
                              target="_blank"
                              className="text-link"
                            >
                              {/*   {info.title.split(" ").length > 2 ? (
                                <h3 className="card-title">
                                  {info.title
                                    .split(" ")
                                    .slice(0, 2)
                                    .join(" ")}
                                  ...
                                </h3>
                              ) : ( */}
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

                                  /* marginRight: "10px",
                                  marginTop: "5px", */
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
                                /* margin: "0.2rem",
                                fontSize: "1rem", */
                                color: "var(--black)",
                              }}
                              className="price-none"
                            >
                              <span
                              /* style={{
                                  fontWeight: "600",
                                  marginLeft: "10px",
                                }} */
                              >
                                ${info.price}
                              </span>{" "}
                              por persona
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
