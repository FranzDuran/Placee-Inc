import { data } from "../Hostess/Comentarios/Data";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./Carrusel.module.scss";
import { Link } from "react-router-dom";
import Modal from "./ModalDetalleComentario";

const Carousel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [modalPosition, setModalPosition] = useState("");
  const [transition, setTransition] = useState("");

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
        {data.map((item, index) => (
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
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
              </div>
              <p>{item.paragraph}</p>
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
