// Modal.js
import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import ModalReclamos from "./ModalReclamos";
import styles from "./ModalSeleccion.module.scss";

const ModalSeleccion = ({ onClose, setIsModalOpen }) => {
  const [isModalComentarios, setIsModalComentarios] = useState(false);
  const [isModalReclamos, setIsModalReclamos] = useState(false);

  const handleComentar = () => {
    // Lógica para el botón "Comentar"
    setIsModalComentarios(true);
    //setIsModalOpen(false)
    console.log("Comentar");
  };

  const handleReclamo = () => {
    // Lógica para el botón "Hacer un reclamo"
    setIsModalReclamos(true);
    console.log("Hacer un reclamo");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose}>
            <i class="ri-close-line"></i>
          </button>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.btnSeleccion} onClick={handleComentar}>
            Comentar
          </button>
          {isModalComentarios && (
            <ModalComponent
              onClose={onClose} isModalOpen={isModalComentarios}
            />
          )}
    
          <button className={styles.btnSeleccion} onClick={handleReclamo}>
            Hacer un reclamo
          </button>
          {isModalReclamos && (
            <ModalReclamos
              onClose={onClose} isModalOpen={isModalReclamos}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSeleccion;
