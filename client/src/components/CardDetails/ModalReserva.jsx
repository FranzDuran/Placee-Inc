import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalReserva.module.scss";

const servicios = [
  { servicio: "Piscinas", precio: 10 },
  { servicio: "Discotecas", precio: 20 },
  { servicio: "Comedor", precio: 15 },
  { servicio: "Baño", precio: 15 },
  { servicio: "Wifi", precio: 5 },
];

const serviciosExclusivos = {
  nombre: "Super pase de privilegios",
  precio: 200,
  servicios: ["Piscinas", "Discotecas", "Comedor", "Baño", "Wifi"],
};

const ModalReserva = ({ isOpen, onClose, children, onChange }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  const handleInputChange = (event) => {
    // Lógica para actualizar el total según tus necesidades
    // Puedes hacer cálculos aquí y luego llamar a setTotalValue con el nuevo valor
  };

  const [adultQuantity, setAdultQuantity] = useState(0);
  const handleIncreaseAdult = () => {
    setAdultQuantity(adultQuantity + 1);
    setTotalValue(totalValue + 20); // Precio definido por adulto
  };

  const handleDecreaseAdult = () => {
    if (adultQuantity > 0) {
      setAdultQuantity(adultQuantity - 1);
      setTotalValue(totalValue - 20); // Precio definido por adulto
    }
  };

  const [minorQuantity, setMinorQuantity] = useState(0);
  const handleIncreaseMinor = () => {
    setMinorQuantity(minorQuantity + 1);
    setTotalValue(totalValue + 20); // Precio definido por adulto
  };

  const handleDecreaseMinor = () => {
    if (minorQuantity > 0) {
      setMinorQuantity(minorQuantity - 1);
      setTotalValue(totalValue - 20); // Precio definido por adulto
    }
  };

  const [serviceQuantities, setServiceQuantities] = useState(
    new Array(servicios.length).fill(0)
  );

  const handleServiceIncrease = (index) => {
    const newQuantities = [...serviceQuantities];
    newQuantities[index] += 1;
    setServiceQuantities(newQuantities);
    setTotalValue(totalValue + servicios[index].precio);
  };

  const handleServiceDecrease = (index) => {
    if (serviceQuantities[index] > 0) {
      const newQuantities = [...serviceQuantities];
      newQuantities[index] -= 1;
      setServiceQuantities(newQuantities);
      setTotalValue(totalValue - servicios[index].precio);
    }
  };

  return (
    modalOpen && (
      <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-header"]}>
            <button className={styles["close-button"]} onClick={closeModal}>
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div className={styles["modal-content"]}>
            <div className={styles.modalContainer}>
              <div className={styles.contentFile} id={styles.fileTitle}>
                <div className={styles.leftColumn} id={styles.leftColumnTitle}>
                  <h2 className={styles.title}>Reservado en IRTRA PETAPA</h2>
                </div>
                <div className={styles.rightColumn}>
                  <div className={styles.titleResult}>
                    Total: <span>${totalValue}</span>{" "}
                  </div>
                </div>
              </div>
              <div className={styles.contentFile}>
                <div className={styles.leftColumn}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePicker}
                    placeholderText="Fecha"
                  />
                </div>
                <div className={styles.rightColumn}>
                  <div className={styles.titleResult}>
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Ninguna"}
                  </div>
                </div>
              </div>

              <div className={styles.contentFile}>
                <div className={styles.leftColumn}>
                  <div className={styles.priceSection}>
                    <span className={styles.price}>$20</span>
                    <span className={styles.titlePrice}>Adulto</span>
                    <div className={styles.quantitySection}>
                      <button
                        className={styles.btnDecrease}
                        onClick={handleDecreaseAdult}
                      >
                        -
                      </button>
                      <button
                        className={styles.btnIncrease}
                        onClick={handleIncreaseAdult}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.rightColumn}>
                  <span className={styles.titleResult}>
                    {" "}
                    <span className={styles.numberResult}>
                      {adultQuantity}
                    </span>{" "}
                    Reservaciones
                  </span>
                </div>
              </div>
              <div className={styles.contentFile}>
                <div className={styles.leftColumn}>
                  <div className={styles.priceSection}>
                    <span className={styles.price}>$10</span>
                    <span className={styles.titlePrice}>Menores</span>
                    <div className={styles.quantitySection}>
                      <button
                        className={styles.btnDecrease}
                        onClick={handleDecreaseMinor}
                      >
                        -
                      </button>
                      <button
                        className={styles.btnIncrease}
                        onClick={handleIncreaseMinor}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.rightColumn}>
                  <span className={styles.titleResult}>
                    {" "}
                    <span className={styles.numberResult}>
                      {minorQuantity}
                    </span>{" "}
                    Reservaciones
                  </span>
                </div>
              </div>

              <div className={styles.textContent}>
                <p className={styles.text}>
                  IRTRA cuenta con servicios adicionales y paquetes exclusivos,
                  los cuales puedes reservar.
                </p>
                <p className={styles.text}>Reserva un servicio adicional</p>
              </div>
              {servicios.map((item, index) => (
                <div className={styles.contentFile} key={index}>
                  <div className={styles.leftColumn}>
                    <div className={styles.priceSection}>
                      <span className={styles.price}>${item.precio}</span>
                      <span className={styles.titlePrice}>{item.servicio}</span>
                      <div className={styles.quantitySection}>
                        <button
                          className={styles.btnDecrease}
                          onClick={() => handleServiceDecrease(index)}
                        >
                          -
                        </button>
                        <button
                          className={styles.btnIncrease}
                          onClick={() => handleServiceIncrease(index)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightColumn}>
                    <span className={styles.titleResult}>
                      <span className={styles.numberResult}>
                        {serviceQuantities[index]}
                      </span>{" "}
                      Entradas
                    </span>
                  </div>
                </div>
              ))}
              <div className={styles.textContent}>
                <p className={styles.text}>
                  Reservar un paquete exclusivo de servicios
                </p>
              </div>
              <div className={styles.containerBoxExclusivo}>
                <h3 className={styles.titleBoxExclusivo}>
                  {serviciosExclusivos.nombre}
                </h3>
                <div className={styles.contentBoxExclusivo}>
                  <h4>Contiene:</h4>
                  <div className={styles.containerServices}>
                    {serviciosExclusivos.servicios.map((item, index) => (
                      <span className={styles.servicesItem} key={index}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.contentPriceExclusivo} >
                  <p className={styles.textExclusivo} >Reservar por:</p>
                  <span className={styles.priceExclusivo} >${serviciosExclusivos.precio}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["modal-footer"]}>
            <button className={styles["reservar-button"]} onClick={onChange}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalReserva;
