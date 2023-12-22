import React, { useCallback, useState } from "react";
import styles from "./ModalReclamos.module.scss";
import { CommentPost, DetailsPostTuristic } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ModalReclamos = ({ onClose, isModalOpen }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const detailpost = useSelector((state) => state.detailpost);

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [comment, setComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setIsButtonDisabled(false);
  };

  const handleCommentChange = (event) => {
    const newText = event.target.value;
    setComment(newText);
    // Habilita/deshabilita el botón en función de si hay texto en el textarea
    setIsButtonDisabled(newText.trim() === "");
  };

  /* const handleCommentChange = (event) => {
    setComment(event.target.value);
  }; */

  useEffect(() => {
    dispatch(DetailsPostTuristic(detailpost.id));
  }, []);

  
  useCallback(() => {}, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(CommentPost({ text: comment, postId: detailpost.id }, token));
    onClose();
  };

  return (
    <>
       <form onSubmit={handleCommentSubmit}>
        <div
          className={`${styles.modalOverlay} ${
            isModalOpen ? styles.visible : styles.oculto
          }`}
        >
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
              Cancelar
            </button>
            <button className={styles.closeButtonMobile} onClick={onClose}>
              <i className="ri-close-fill"></i>
            </button>
            <div className={styles.boxTwo}>
              <h3 className={styles.title}>Escribe tu reclamo</h3>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Escribe tu comentario aquí..."
              />
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={styles.btnComentar}
              >
                Enviar reclamo
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModalReclamos;
