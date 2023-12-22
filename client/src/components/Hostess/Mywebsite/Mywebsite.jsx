import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Avatar from "@mui/material/Avatar";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  dataPersonal,
  DetailsPostTuristic,
  DeletePost,
  setSelectedCardId,
} from "../../../redux/action";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { ExclamationCircleFilled } from "@ant-design/icons";
import BeatLoader from "react-loading";
import styles from "./Mywebsite.module.scss";
//import { setSelectedCardId } from "../../../redux/action";

function Mywebsite() {
  const dispatch = useDispatch();
  const { idTuristic } = useParams();
  const datapersonal = useSelector((state) => state.datapersonal);
  //console.log(datapersonal);

  const token = useSelector((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(dataPersonal(token));
    dispatch(DetailsPostTuristic(idTuristic));
  }, [dispatch, token]);

  const handleCardClick = (selectedId) => {
    dispatch(setSelectedCardId(selectedId));
  };

  return (
    <>
      <div className={styles.containerMywebsite}>
        <div className={styles.containerCards}>
          {datapersonal &&
            datapersonal.Posts &&
            datapersonal.Posts.map((data, i) => (
              <div
                className={styles.contentCard}
                key={i}
                onClick={() => handleCardClick(data.id)}
              >
                <div className={styles.carouselContainer}>
                  <Carousel interval={null} className={styles.swiperContainer}>
                    {data.imageFile.map((imageSrc, imageIndex) => (
                      <Carousel.Item key={imageIndex}>
                        <Link to={`/anfitrion/mi sitio/${data.id}`}>
                          <div className={styles.imageContainer}>
                            <img
                              srcSet={imageSrc}
                              alt={imageSrc}
                              className={styles.cardImg}
                            />
                          </div>
                        </Link>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>

                <div className={styles.descriptionCard}>
                  <div className={styles.shadowCard}>
                    <Link to={`/anfitrion/mi sitio/${data.id}`}>
                      <div className={styles["card-info-flex"]}>
                        <h3 className={styles["card-title"]}>{data.title}</h3>
                        <div>
                          <Avatar
                            sx={{
                              /* width: 25,
                              height: 25, */
                              background: datapersonal.avatar
                                ? `url(${datapersonal.avatar})`
                                : datapersonal.backgroundColor,
                              backgroundSize: "cover",
                            }}
                            className={styles["avatar-perfil"]}
                          >
                            {datapersonal.avatar ? (
                              <div></div>
                            ) : (
                              <div>
                                {datapersonal.name &&
                                  datapersonal.name[0].toUpperCase()}
                              </div>
                            )}
                          </Avatar>
                        </div>
                      </div>
                    </Link>
                    <Link to={`/anfitrion/mi sitio/${data.id}`}>
                      <div>
                        <p
                          style={{
                            color: "var(--black)",
                          }}
                          className={styles["price-none"]}
                        >
                          <span>{data.updatedAt.slice(0, 10)}</span>{" "}
                        </p>
                        <p
                          style={{
                            color: "var(--black)",
                          }}
                          className={styles["price-none"]}
                        >
                          <span>Gratis</span>{" "}
                        </p>
                      </div>
                    </Link>
                    <Link to={`/anfitrion/mi sitio/${data.id}`}>
                      {data.summary.split(" ").length > 5 ? (
                        <p className={styles["summary-card"]}>
                          {data.summary.split(" ").slice(0, 5).join(" ")}
                          ...
                        </p>
                      ) : (
                        <p className={styles["summary-card"]}>{data.summary}</p>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Mywebsite;
