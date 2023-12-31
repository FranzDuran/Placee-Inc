import { data } from "../Hostess/Comentarios/Data";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./Carrusel.module.scss";
import Modal from "./ModalDetalleComentario";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { DetailsPostTuristic } from "../../redux/action";

const Carousel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [modalPosition, setModalPosition] = useState("");
  const [transition, setTransition] = useState("");


  const { idTuristic } = useParams();
  const dispatch = useDispatch();
  const detailpost = useSelector((state) => state.detailpost);

  useEffect(() => {
    dispatch(DetailsPostTuristic(idTuristic));
  }, [dispatch, idTuristic]);

  
  if (!detailpost.comments) {
    return null; // Puedes mostrar un mensaje de carga aquí si lo deseas
  }

  const openModal = (content) => {
    setModalPosition("0");
    setIsModalOpen(true);
    setContent(content);
  };

  const closeModal = () => {
    //setIsModalOpen(false);
    setModalPosition("150%");
    setTransition("transform 0.5s ease-out");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 500);
  };

  return (
    <>
      <Swiper
        //navigation
        spaceBetween={8}
        slidesPerView={1.15}
        centeredSlides
        loop
        className={styles.swiperContainer}
      >
        {detailpost.comments.map((item, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div
              className={styles.contentComment}
              key={index}
              id="comentarios"
              onClick={() => openModal(item)}
            >
              <span>
                {item.emoji === "corazon" ? (
                  <i className="ri-heart-fill" style={{ color: "#652c90" }}></i>
                ) : item.emoji === "incognito" ? (
                  <i
                    className="ri-error-warning-fill"
                    style={{ color: "#7e00e5" }}
                  ></i>
                ) : (
                  <i
                    className="ri-emotion-normal-fill"
                    style={{ color: "#9463ec" }}
                  ></i>
                )}
              </span>
              <div>
                <img src={item.user.avatar} alt={item.name} />
                <h3>{item.user.name}</h3>
              </div>
              <p>{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ position: "relative" }}>
        <Modal
          onClose={closeModal}
          isModalOpen={isModalOpen}
          content={content}
          position={modalPosition}
          transition={transition}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Link to="/all-comments">
          <button className={styles.button}>Ver todos los comentarios</button>
        </Link>
      </div>
    </>
  );
};

export default Carousel;
