
import React from "react";
import styles from "./ModalDetalleComentario.module.scss";

const ModalDetalleComentario = ({ onClose, isModalOpen, content,position, transition }) => {
  return (
    <div
      className={`${styles.modalOverlay} ${
        isModalOpen ? styles.menuslidein : ""
      }`}
      style={{ transition, transform: `translateY(${position})` }}
    >
        <button className={styles.btnClose} onClick={onClose}><i class="ri-close-fill"></i></button>
      <div className={styles.modalContent}>
        <p>{content.paragraph}</p>
      </div>
    </div>
  );
};

export default ModalDetalleComentario;
