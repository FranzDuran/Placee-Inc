import React, { useCallback, useState } from "react";
import styles from "./ModalComponent.module.scss";
import { CommentPost, DetailsPostTuristic } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ModalComponent = ({ onClose, isModalOpen }) => {
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
    setComment(event.target.value);
  };

  useEffect(() => {
    dispatch(DetailsPostTuristic(detailpost.id));
  }, []);
  useCallback(() => {}, []);
  const handleCommentSubmit = (e) => {
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
              <i class="ri-close-fill"></i>
            </button>
            <div className={styles.boxOne}>
              <h3 className={styles.title}>¿Te ha gustado el sitio?</h3>
              <div className={styles.iconContainer}>
                <div className={styles.icon}>
                  <h4>Si</h4>
                  <span
                    className={`${
                      selectedIcon === "thumbsUp" && styles.selected
                    }`}
                    onClick={() => handleIconClick("thumbsUp")}
                  >
                    <i className="ri-thumb-up-line"></i>
                  </span>
                </div>
                <div className={styles.icon}>
                  <h4>No</h4>
                  <span
                    className={`${
                      selectedIcon === "thumbsDown" && styles.selected
                    }`}
                    onClick={() => handleIconClick("thumbsDown")}
                  >
                    <i className="ri-thumb-down-line"></i>
                  </span>
                </div>
                <div className={styles.icon}>
                  <h4>Tal vez</h4>
                  <span
                    className={` ${
                      selectedIcon === "seriousFace" && styles.selected
                    }`}
                    onClick={() => handleIconClick("seriousFace")}
                  >
                    <i className="ri-emotion-normal-line"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.boxTwo}>
              <h3 className={styles.title}>
                ¿Qué opinas de este sitio?, hazlo saber en la sección de
                comentarios
              </h3>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Escribe tu comentario aquí..."
              />
              <button
                type="submit"
                disabled={isButtonDisabled || !selectedIcon || !comment.trim()}
                className={styles.btnComentar}
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModalComponent;
