import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalReserva.module.scss";
import { addDays, isSameDay } from "date-fns";
import { useParams } from "react-router-dom";
import {  useDispatch } from "react-redux";
import {  paymentReserve } from "../../redux/action";

const ModalReserva = ({ isOpen, onClose, children, onChange }) => {
  const {
    title,
    specialPackageItems,
    specialPackageName,
    specialPrecioTotal,
    additionalPrices,
    reservedDates,
    price,
    priceMenores,
    priceTransporte,
    transportes,
  } = children;
  //----------------------------------------------------
  const dispatch = useDispatch();
  const { idTuristic } = useParams();

  const [nextStep, setNextStep] = useState(false);
  const [modalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const [totalValue, setTotalValue] = useState(0);

  //------------- RESERVA ADULTO / MENORES ------------------------
  const [reservaQuantities, setReservaQuantities] = useState({
    adult: 0,
    menores: 0,
  });

  const handleReservaIncrease = (type) => {
    setReservaQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: prevQuantities[type] + 1,
    }));

    // Update total value based on the type of reservation
    if (type === "adult") {
      setTotalValue(totalValue + parseFloat(price));
    } else if (type === "menores") {
      setTotalValue(totalValue + priceMenores);
    }
  };

  const handleReservaDecrease = (type) => {
    if (reservaQuantities[type] > 0) {
      setReservaQuantities((prevQuantities) => ({
        ...prevQuantities,
        [type]: prevQuantities[type] - 1,
      }));

      // Update total value based on the type of reservation
      if (type === "adult") {
        setTotalValue(totalValue - price);
      } else if (type === "menores") {
        setTotalValue(totalValue - priceMenores);
      }
    }
  };

  //----------------- TRANSPORTE ---------------------------------

  const [selectedTransportation, setSelectedTransportation] = useState(false);
  const [selectedSubTransportation, setSelectedSubTransportation] = useState(
    []
  );

  // Handler for changing the first select
  const handleTransportationChange = () => {
    setSelectedTransportation(true);
    setSelectedSubTransportation([]);
    setInputValues([]);
  };

  // Handler for changing sub-transportation options
  const handleSubTransportationChange = (event) => {
    const selectedOption = event.target.value;
    if (!selectedSubTransportation.includes(selectedOption)) {
      setSelectedSubTransportation([
        ...selectedSubTransportation,
        selectedOption,
      ]);
      setInputValues([...inputValues, 0]); // Initialize quantity to 0 for new option
    }
  };

  // Handler for removing a sub-transportation option
  const handleRemoveSubTransportation = (optionToRemove, indexToRemove) => {
    setSelectedSubTransportation(
      selectedSubTransportation.filter((option, index) => {
        if (index === indexToRemove) {
          const removedValue = inputValues[indexToRemove] * priceTransporte;
          setTotalValue(totalValue - removedValue);

          // Eliminar el valor correspondiente del totalInputValues
          const newTotalInputValues =
            totalInputValues - inputValues[indexToRemove];
          setTotalInputValues(newTotalInputValues);

          const newInputValues = [...inputValues];
          newInputValues.splice(indexToRemove, 1);
          setInputValues(newInputValues);
        }
        return option !== optionToRemove;
      })
    );
  };

  const [inputValues, setInputValues] = useState([]);
  const [totalInputValues, setTotalInputValues] = useState(0);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    // Actualizar totalInputValues sumando todos los valores de inputValues
    const sumOfInputValues = newInputValues.reduce(
      (sum, inputValue) => sum + parseFloat(inputValue) || 0,
      0
    );
    setTotalInputValues(sumOfInputValues);
  };

  // Handler for increasing quantity of a sub-transportation option
  const handleIncreaseQuantity = (index) => {
    //console.log(index);
    const newInputValues = [...inputValues];
    newInputValues[index] += 1;
    setInputValues(newInputValues);
    setTotalValue(totalValue + priceTransporte);
    handleInputChange(index, newInputValues[index]);
  };

  // Handler for decreasing quantity of a sub-transportation option
  const handleDecreaseQuantity = (index) => {
    if (inputValues[index] > 0) {
      const newInputValues = [...inputValues];
      newInputValues[index] -= 1;
      setInputValues(newInputValues);
      setTotalValue(totalValue - priceTransporte);
      handleInputChange(index, newInputValues[index]);
    }
  };

  //---------------- SERVICIOS -------------------------------------
  const [serviceQuantities, setServiceQuantities] = useState(Array(additionalPrices && additionalPrices.length).fill(0));


  const handleServiceIncrease = (index) => {
    if (additionalPrices && additionalPrices.length > index) {
      setServiceQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = (newQuantities[index] || 0) + 1;
        return newQuantities;
      });
      // Actualizar el valor total sumando el valor del servicio
      setTotalValue(totalValue + additionalPrices[index].value);
    }
  };
  
  const handleServiceDecrease = (index) => {
    if (additionalPrices && additionalPrices.length > index && serviceQuantities[index] > 0) {
      setServiceQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = newQuantities[index] - 1;
        return newQuantities;
      });
      // Actualizar el valor total restando el valor del servicio
      setTotalValue(totalValue - additionalPrices[index].value);
    }
  };
  
  

  //--------------------------------------------------------

  const [precio, setPrecio] = useState(false);
  const handleIncludeSpecialPackageChange = (para) => {
    if (!precio) {
      // Sumar el valor del paquete especial al totalValue
      setTotalValue(
        totalValue + specialPrecioTotal
      );
    } else {
      // Restar el valor del paquete especial del totalValue
      setTotalValue(
        totalValue - specialPrecioTotal
      );
    }
  };

  //-------------- CALENDARIO ----------------------------------------------
  const [selectedDate, setSelectedDate] = useState(null);
  // Inhabilitar fechas en el calendario
  const disabledDates =
    reservedDates && reservedDates.map((dateString) => new Date(dateString));
    const handlePayment = () => {
      dispatch(paymentReserve(idTuristic, totalValue));
  
    };
  
  return (
    modalOpen && (
      <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-header"]}>
            <div className={styles.contentFile} id={styles.fileTitle}>
              <div className={styles.leftColumn} id={styles.leftColumnTitle}>
                <h2 className={styles.title}>Reservado en {title}</h2>
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
              <div
                className={styles.modalContainer}
                id={styles.modalContainerId}
              >
                {additionalPrices.length > 0 && (
                  <div className={styles.textContent}>
                    <p className={styles.text}>
                      IRTRA cuenta con servicios adicionales y paquetes
                      exclusivos, los cuales puedes reservar.
                    </p>
                    <p className={styles.text}>Reserva un servicio adicional</p>
                  </div>
                )}
                {additionalPrices.length > 0 &&
                  additionalPrices.map((item, index) => (
                    <div className={styles.contentFile} key={index}>
                      <div className={styles.leftColumn}>
                        <div className={styles.priceSection}>
                          <span className={styles.price}>${item.value}</span>
                          <span className={styles.titlePrice}>
                            {item.label}
                          </span>
                          <div className={styles.quantitySection}>
                            <button
                              className={styles.btnDecrease}
                              onClick={() => handleServiceDecrease(index)}
                            >
                              -
                            </button>
                            <span className={styles.numberResult}>
                              {serviceQuantities && serviceQuantities[index] || 0}
                            </span>
                            <button
                              className={styles.btnIncrease}
                              onClick={() => handleServiceIncrease(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {specialPackageName && (
                  <div className={styles.textContent}>
                    <p className={styles.text}>
                      Reservar un paquete exclusivo de servicios
                    </p>
                  </div>
                )}
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
                    <button
                      className={styles.priceExclusivo}
                      onClick={() =>
                        handleIncludeSpecialPackageChange(setPrecio(!precio))
                      }
                    >
                      ${specialPrecioTotal}
                    </button>
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
                </div>

                <div className={styles.contentFile}>
                  <div className={styles.leftColumn}>
                    <div className={styles.priceSection}>
                      <span className={styles.price}>$ {price}</span>
                      <span className={styles.titlePrice}>Adulto</span>
                      <div className={styles.quantitySection}>
                        <button
                          className={styles.btnDecrease}
                          onClick={() => handleReservaDecrease("adult")}
                        >
                          -
                        </button>
                        <span className={styles.numberResult}>
                          {reservaQuantities?.adult || 0}
                        </span>
                        <button
                          className={styles.btnIncrease}
                          onClick={() => handleReservaIncrease("adult")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.contentFile}>
                  <div className={styles.leftColumn}>
                    <div className={styles.priceSection}>
                      <span className={styles.price}>$ {priceMenores}</span>
                      <span className={styles.titlePrice}>Menores</span>
                      <div className={styles.quantitySection}>
                        <button
                          className={styles.btnDecrease}
                          onClick={() => handleReservaDecrease("menores")}
                        >
                          -
                        </button>
                        <span className={styles.numberResult}>
                          {reservaQuantities?.menores || 0}
                        </span>
                        <button
                          className={styles.btnIncrease}
                          onClick={() => handleReservaIncrease("menores")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {!nextStep && (
                  <>
                    {/* First select for transportation */}
                    <div className={styles.contentFile}>
                      <div className={styles.leftColumn}>
                        <span className={styles.priceSelect}>
                          $ {priceTransporte}
                        </span>
                        <button
                          className={styles.btnTransporte}
                          onClick={handleTransportationChange}
                        >
                          Transporte
                        </button>
                        <div className={styles.titleResult}>
                          {totalInputValues} Tickets
                        </div>
                      </div>
                    </div>
                    {/* Second select for sub-transportation */}
                    {selectedTransportation && (
                      <>
                        <div className={styles.contentFile}>
                          <div
                            className={styles.leftColumn}
                            id={styles.containerCheckboxs}
                          >
                            {transportes.map((option) => (
                              <div
                                key={option}
                                className={styles.checkboxContent}
                              >
                                <input
                                  type="checkbox"
                                  id={option}
                                  value={option}
                                  checked={selectedSubTransportation.includes(
                                    option
                                  )}
                                  onChange={handleSubTransportationChange}
                                  className={styles.checkboxInput}
                                />
                                <label htmlFor={option}>{option}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className={styles.contentFile}>
                          <div className={styles.leftColumn}>
                            <div className={styles.contentOptions}>
                              {selectedSubTransportation.map(
                                (option, index) => (
                                  <div
                                    key={option}
                                    className={styles.selectedOption}
                                  >
                                    {option}
                                    <div className={styles.counter}>
                                      <button
                                        className={styles.counterButton}
                                        onClick={() =>
                                          handleDecreaseQuantity(index)
                                        }
                                      >
                                        <i className="ri-subtract-line"></i>
                                      </button>
                                      <span className={styles.counterValue}>
                                        {inputValues[index]}
                                      </span>
                                      <button
                                        className={styles.counterButton}
                                        onClick={() =>
                                          handleIncreaseQuantity(index)
                                        }
                                      >
                                        <i className="ri-add-line"></i>
                                      </button>
                                    </div>
                                    <button
                                      className={styles.removeOptionButton}
                                      onClick={() =>
                                        handleRemoveSubTransportation(
                                          option,
                                          index
                                        )
                                      }
                                    >
                                      <i className="ri-close-line"></i>
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {specialPackageItems.length > 0 ||
                  specialPackageName ||
                  specialPrecioTotal ? (
                  <button
                    className={styles.btnSpecial}
                    onClick={() => setNextStep(true)}
                  >
                    Reservar juegos adicionales
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          <div className={styles["modal-footer"]}>
            {nextStep && (
              <button
                onClick={() => setNextStep(false)}
                className={styles.btnAtras}
              >
                Atras
              </button>
            )}
            <button className={styles["reservar-button"]} onClick={handlePayment}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalReserva;
