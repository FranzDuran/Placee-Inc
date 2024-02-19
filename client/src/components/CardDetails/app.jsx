import ModalReserva from "./ModalReserva";
import React, {useEffect, useState} from "react" ;

export default function App() {
  const [modalOpenReserve, setModalOpenReserve] = useState(false);

  const openModalReserve = () => {
    setModalOpenReserve(true);
  };

  const closeModalReserve = () => {
    setModalOpenReserve(false);
  };
  return (
    <div>
      <div id="seccion1"></div>
      <div id="seccion2"></div>
      <div id="seccion3"></div>
      <div id="seccion4"></div>
      <button onClick={openModalReserve}>Reservar</button>
      <ModalReserva isOpen={modalOpenReserve} onClose={closeModalReserve} />
    </div>
  );
}
