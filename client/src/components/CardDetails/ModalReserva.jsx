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

  // Modificar los objetos en el array
  const modifiedPrices = additionalPrices && additionalPrices.map(item => ({
    label: item.label,
    value: parseInt(item.value, 10)  // Convertir el valor a número
  }));

  console.log(reservedDates);

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

  //const handleInputChange = (event) => { };

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
    new Array(modifiedPrices && modifiedPrices.length).fill(0)
  );
  console.log(serviceQuantities)

  const handleServiceIncrease = (index) => {
    const newQuantities = [...serviceQuantities];
    newQuantities[index] += 1;
    setServiceQuantities(newQuantities);
    setTotalValue(totalValue + modifiedPrices[index].value);
  };

  const handleServiceDecrease = (index) => {
    if (serviceQuantities[index] > 0) {
      const newQuantities = [...serviceQuantities];
      newQuantities[index] -= 1;
      setServiceQuantities(newQuantities);
      setTotalValue(totalValue - modifiedPrices[index].value);
    }
  };

  //--------------------------------------------------------
  const handleIncludeSpecialPackageChange = (event) => {
    // Update totalValue based on selection
    setTotalValue(
      totalValue + parseFloat(specialPrecioTotal.replace(/"/g, ""))
    );
    setNextStep(true)
  };

  const handleExcludeSpecialPackageChange = (event) => {
    setTotalValue(
      totalValue - parseFloat(specialPrecioTotal.replace(/"/g, ""))
    );
    setNextStep(false)
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
  const handleRemoveSubTransportation = (optionToRemove, indexToRemove) => {
    setSelectedSubTransportation(
      selectedSubTransportation.filter((option, index) => {
        if (index === indexToRemove) {
          // Restar el valor del input del totalValue antes de eliminar la opción
          const removedValue = inputValues[index] * 10; // Precio fijo
          setTotalValue(totalValue - removedValue);

          // Resetear el valor del input cuando se elimina la opción
          const newInputValues = [...inputValues];
          newInputValues.splice(index, 1);
          setInputValues(newInputValues);
        }
        return option !== optionToRemove;
      })
    );
  };

  //-----------------------------------------------------
  const [inputValues, setInputValues] = useState([]);
  const [totalInputValues, setTotalInputValues] = useState(0);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // Actualizar totalValue multiplicando el valor del input por el precio correspondiente
    const subtotal = value * 10; // Precio fijo, podrías hacerlo dinámico si es necesario
    setTotalValue(totalValue + subtotal);

    // Actualizar totalInputValues sumando todos los valores de inputValues
    const sumOfInputValues = newInputValues.reduce((sum, inputValue) => sum + parseFloat(inputValue) || 0, 0);
    setTotalInputValues(sumOfInputValues);
  };

  //------------------------------------------------------------
  // Inhabilitar fechas en el calendario
  const disabledDates = reservedDates && reservedDates.map(dateString => new Date(dateString));

  //-------------------------------------------------


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
              <div className={styles.modalContainer} id={styles.modalContainerId} >
                <div className={styles.textContent}>
                  <p className={styles.text}>
                    IRTRA cuenta con servicios adicionales y paquetes exclusivos,
                    los cuales puedes reservar.
                  </p>
                  <p className={styles.text}>Reserva un servicio adicional</p>
                </div>
                {additionalPrices.map((item, index) => (
                  <div className={styles.contentFile} key={index}>
                    <div className={styles.leftColumn}>
                      <div className={styles.priceSection}>
                        <span className={styles.price}>${item.value}</span>
                        <span className={styles.titlePrice}>{item.label}</span>
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
                      excludeDates={disabledDates}
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

                        <span className={styles.priceSelect}>$10</span>
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
                          <span className={styles.numberResult}>
                            {totalInputValues}
                          </span>{" "}
                          Tickets
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
                            <div className={styles.contentOptions}>{selectedSubTransportation.map((option, index) => (
                              <span key={option} className={styles.selectedOption}>
                                {option}
                                <input
                                  type="number"
                                  className={styles.contador}
                                  value={inputValues[index] || ""}
                                  onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <button
                                  className={styles.removeOptionButton}
                                  onClick={() => handleRemoveSubTransportation(option, index)}
                                >
                                  <i className="ri-close-line"></i>
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
                {specialPackageItems ||
                  specialPackageName ||
                  specialPrecioTotal ? (<button className={styles.btnSpecial} onClick={() => handleIncludeSpecialPackageChange()}>Reservar juegos adicionales</button>) : ""}
              </div>
            </div>
          )}
          <div className={styles["modal-footer"]}>
            {nextStep && (<button onClick={() => handleExcludeSpecialPackageChange()}>Atras</button>)}
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
