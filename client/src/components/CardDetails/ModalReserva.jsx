import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalReserva.module.scss";
import { addDays, isSameDay } from 'date-fns';


const servicios = [
  { servicio: "Piscinas", precio: 10 },
  { servicio: "Discotecas", precio: 20 },
  { servicio: "Comedor", precio: 15 },
  { servicio: "Baño", precio: 15 },
  { servicio: "Wifi", precio: 5 },
];

const reservas = [
  { reserva: "Adultos", valor: 10 },
  { reserva: "Menores", valor: 5 },
];

const fechas = [
  "2024-01-26T03:00:00.000Z",
  "2024-01-27T03:00:00.000Z",
  "2024-01-28T03:00:00.000Z",
  "2024-01-30T03:00:00.000Z",
  "2024-01-31T03:00:00.000Z",
];

const transportationOptions = {
  Transporte: ["Automóvil", "Moto", "Bus", "Bicicleta", "Camión"],
};



const ModalReserva = ({ isOpen, onClose, children, onChange }) => {
  const {
    title,
    specialPackageItems,
    specialPackageName,
    specialPrecioTotal,
    horarios,
    additionalPrices,
    reservedDates,
  } = children;

  /* const newAddPrices = additionalPrices && additionalPrices.forEach((reserva) => {
    reserva.value = parseInt(reserva.value, 10);
  }); */

  const [nextStep, setNextStep] = useState(false);

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

  const handleInputChange = (event) => { };

  const [reservaQuantities, setReservaQuantities] = useState(
    new Array(reservas.length).fill(0)
  );

  const handleReservaIncrease = (index) => {
    const newQuantities = [...reservaQuantities];
    newQuantities[index] += 1;
    if (!isNaN(reservas[index].valor)) {
      setReservaQuantities(newQuantities);
      setTotalValue(totalValue + reservas[index].valor);
    }
  };

  const handleReservaDecrease = (index) => {
    if (reservaQuantities[index] > 0) {
      const newQuantities = [...reservaQuantities];
      newQuantities[index] -= 1;
      if (!isNaN(reservas[index].valor)) {
        setReservaQuantities(newQuantities);
        setTotalValue(totalValue - reservas[index].valor);
      }
    }
  };

  //--------------------------------------------------
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

  //--------------------------------------------------------
  const [includeSpecialPackage, setIncludeSpecialPackage] = useState(false);

  const handleIncludeSpecialPackageChange = (event) => {
    setIncludeSpecialPackage(event.target.value === "Si");
    // Update totalValue based on selection
    setTotalValue(
      event.target.value === "Si"
        ? totalValue + parseFloat(specialPrecioTotal.replace(/"/g, ""))
        : totalValue - parseFloat(specialPrecioTotal.replace(/"/g, ""))
    );
  };

  //--------------------------------------------------------------------------------
  // State for the first and second selects
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [selectedSubTransportation, setSelectedSubTransportation] = useState([]);

  // Handler for changing the first select
  const handleTransportationChange = (event) => {
    setSelectedTransportation(event.target.value);
    setSelectedSubTransportation([]);
  };

  // Handler for changing the second select
  const handleSubTransportationChange = (event) => {
    const selectedOption = event.target.value;
    if (!selectedSubTransportation.includes(selectedOption)) {
      setSelectedSubTransportation([...selectedSubTransportation, selectedOption]);
    }
  };

  // Handler for removing a selected option in the second select
  const handleRemoveSubTransportation = (optionToRemove) => {
    setSelectedSubTransportation(
      selectedSubTransportation.filter((option) => option !== optionToRemove)
    );
  };

  return (
    modalOpen && (
      <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-header"]}>
            <div className={styles.contentFile} id={styles.fileTitle}>
              <div className={styles.leftColumn} id={styles.leftColumnTitle}>
                <h2 className={styles.title}>Reservado en {title}</h2>
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.titleResult}>
                  Total: <span>${totalValue}</span>{" "}
                </div>
              </div>
            </div>
            <button className={styles["close-button"]} onClick={closeModal}>
              <i class="ri-close-line"></i>
            </button>
          </div>
          {nextStep ? (
            <div className={styles["modal-content"]}>
              <div className={styles.modalContainer}>
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
                  <div className={styles.containerRadio}>
                    <label className={styles.labelContent}>
                      <input
                        type="radio"
                        value="No"
                        checked={!includeSpecialPackage}
                        onChange={handleIncludeSpecialPackageChange}
                        className={styles.inputRadio}
                      />
                      No
                    </label>
                    <label className={styles.labelContent}>
                      <input
                        type="radio"
                        value="Si"
                        checked={includeSpecialPackage}
                        onChange={handleIncludeSpecialPackageChange}
                        className={styles.inputRadio}
                      />
                      Si
                    </label>
                  </div>
                </div>
                <div className={styles.containerBoxExclusivo}>
                  <h3 className={styles.titleBoxExclusivo}>
                    {specialPackageName}
                  </h3>
                  <div className={styles.contentBoxExclusivo}>
                    <h4>Contiene:</h4>
                    <div className={styles.containerServices}>
                      {specialPackageItems.map((item, index) => (
                        <span className={styles.servicesItem} key={index}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.contentPriceExclusivo}>
                    <p className={styles.textExclusivo}>Reservar por:</p>
                    <span className={styles.priceExclusivo}>
                      ${specialPrecioTotal.replace(/"/g, "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["modal-content"]}>
              <div className={styles.modalContainer}>
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
                {reservas.map((item, index) => (
                  <div className={styles.contentFile} key={index}>
                    <div className={styles.leftColumn}>
                      <div className={styles.priceSection}>
                        <span className={styles.price}>${item.valor}</span>
                        <span className={styles.titlePrice}>{item.reserva}</span>
                        <div className={styles.quantitySection}>
                          <button
                            className={styles.btnDecrease}
                            onClick={() => handleReservaDecrease(index)}
                          >
                            -
                          </button>
                          <button
                            className={styles.btnIncrease}
                            onClick={() => handleReservaIncrease(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.rightColumn}>
                      <span className={styles.titleResult}>
                        <span className={styles.numberResult}>
                          {reservaQuantities[index]}
                        </span>{" "}
                        Reservas
                      </span>
                    </div>
                  </div>
                ))}
                {!nextStep && (
                  <>
                    {/* First select for transportation */}
                    <div className={styles.contentFile}>
                      <div className={styles.leftColumn}>
                        <select
                          value={selectedTransportation}
                          onChange={handleTransportationChange}
                          className={styles.selectInput}
                        >
                          <option value="">Selecciona un transporte</option>
                          {Object.keys(transportationOptions).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.rightColumn}>
                        <div className={styles.titleResult}>
                        </div>
                      </div>
                    </div>
                    {/* Second select for sub-transportation */}
                    {selectedTransportation && (
                      <>
                        <div className={styles.contentFile}>
                          <div className={styles.leftColumn}>
                            <select
                              value={""} // This should be an empty string to reset the select
                              onChange={handleSubTransportationChange}
                              //multiple
                              className={styles.selectInput}
                            >
                              <option value="">Selecciona una opcion</option>
                              {transportationOptions[selectedTransportation].map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                          </div>
                          <div className={styles.rightColumn}>
                            <div className={styles.titleResult}>
                            </div>
                          </div>
                        </div>
                        <div className={styles.contentFile}>
                          <div className={styles.leftColumn}>
                            <div className={styles.contentOptions}>{selectedSubTransportation.map((option) => (
                              <span key={option} className={styles.selectedOption}>
                                {option}
                                <button
                                  className={styles.removeOptionButton}
                                  onClick={() => handleRemoveSubTransportation(option)}
                                >
                                  <i class="ri-close-line"></i>
                                </button>
                              </span>
                            ))}</div>
                          </div>
                          <div className={styles.rightColumn}>
                            <div className={styles.titleResult}>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                <button onClick={() => setNextStep(true)}>Reservar juegos adicionales</button>
              </div>
            </div>
          )}
          <div className={styles["modal-footer"]}>
            {nextStep && (<button onClick={() => setNextStep(false)}>Atras</button>)}
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
