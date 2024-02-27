import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalPaquetes.module.scss";
import { addDays, isSameDay } from "date-fns";
import Row from "react-bootstrap/Row";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ModalPaquetes = ({
  isOpen,
  onClose,
  children,
  onChange,
  detail,
  setDetail,
}) => {
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
  const handleAddMore = () => {
    setDetail((prevState) => ({
      ...prevState,
      additionalPrices: [
        ...prevState.additionalPrices,
        { label: "", value: null },
      ],
    }));
  };

  const handleAdditionalPriceChange = (index, event) => {
    const { name, value } = event.target;

    setDetail((prevState) => ({
      ...prevState,
      additionalPrices: prevState.additionalPrices.map((price, i) =>
        i === index ? { ...price, [name]: parseInt(value, 10) } : price
      ),
    }));
  };

  const handleAdditionalLabelChange = (index, event) => {
    const updatedPrices = [...detail.additionalPrices];
    updatedPrices[index].label = event.target.value;
    setDetail((prevState) => ({
      ...prevState,
      additionalPrices: updatedPrices,
    }));
  };

  //---------------------------------------------------------
  const handleSpecialPackage = (value) => {
    console.log("boleano");
    setDetail((prevState) => ({
      ...prevState,
      hasSpecialPackage: value,
    }));
  };

  const handleSpecialPackageName = (e) => {
    console.log("name");
    setDetail((prevState) => ({
      ...prevState,
      specialPackageName: e.target.value,
    }));
  };

  const handleType = (e) => {
    setDetail((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));
  };

  const handlePrecioTotal = (e) => {
    setDetail((prevState) => ({
      ...prevState,
      specialPrecioTotal: e.target.value,
    }));
  };

  const handleSpecialPackageItem = (e) => {
    console.log("items");
    setDetail((prevState) => ({
      ...prevState,
      specialPackageItem: e.target.value,
    }));
  };

  const handleAddSpecialPackageItem = () => {
    console.log("add item");
    if (detail.specialPackageItem.trim() !== "") {
      console.log("add item 1");
      setDetail((prevState) => ({
        ...prevState,
        specialPackageItems: [
          ...prevState.specialPackageItems,
          detail.specialPackageItem,
        ],
        specialPackageItem: "",
      }));
    }
  };

  const handleRemoveSpecialPackageItem = (index) => {
    const updatedItems = [...detail.specialPackageItems];
    updatedItems.splice(index, 1);
    setDetail((prevState) => ({
      ...prevState,
      specialPackageItems: updatedItems,
    }));
  };
  return (
    modalOpen && (
      <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-header"]}>
            <div className={styles.contentFile} id={styles.fileTitle}>
              <div className={styles.leftColumn} id={styles.leftColumnTitle}>
                <h2 className={styles.title}>
                  Agregue un paquete exclusivo a su sitio
                </h2>
              </div>
            </div>
            <button className={styles["close-button"]} onClick={onClose}>
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div className={styles["modal-content"]}>
            <div className={styles.modalContainer} id={styles.modalContainerId}>
              <>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label className="label-status">
                      Nombre del pase o paquete
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del pase o paquete"
                      value={detail.specialPackageName}
                      onChange={handleSpecialPackageName}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label className="label-status">Incluye:</Form.Label>

                    <Card className={styles["card-container"]}>
                      <Card.Body className={styles["card-body"]}>
                        {detail.specialPackageItems?.map((details, index) => (
                          <span key={index} className={styles["card-span"]}>
                            {details}
                            <button
                              onClick={() =>
                                handleRemoveSpecialPackageItem(index)
                              }
                              size="sm"
                              className={styles["card-span-btn"]}
                            >
                              X
                            </button>
                          </span>
                        ))}
                      </Card.Body>
                    </Card>

                    <InputGroup className={styles.contentInputForm}>
                      <Form.Control
                        className={styles.inputForm}
                        type="text"
                        placeholder="Ingrese un elemento"
                        value={detail.specialPackageItem}
                        onChange={handleSpecialPackageItem}
                      />
                      <Button
                        id={styles.buttonBlack}
                        variant="success"
                        onClick={handleAddSpecialPackageItem}
                      >
                        Agregar
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Row>

                {/* PRECIO TOTAL DEL PAQUETE */}
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label className="label-status">Total</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Total"
                        value={detail.specialPrecioTotal}
                        onChange={handlePrecioTotal}
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
              </>
            </div>
          </div>

          <div className={styles["modal-footer"]}>
            {nextStep && (
              <button
                onClick={() => setNextStep(false)}
                className={styles.btnAtras}
              >
                Atras
              </button>
            )}

            <button className={styles["reservar-button"]} onClick={onChange}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalPaquetes;
