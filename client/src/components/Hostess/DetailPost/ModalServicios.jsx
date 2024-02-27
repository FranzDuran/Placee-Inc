import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalServicios.module.scss";
import Row from "react-bootstrap/Row";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ModalServicios = ({
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

  const handleAdditionalLabelChange = (index, event) => {
    const updatedPrices = [...detail.additionalPrices];
    updatedPrices[index].label = event.target.value;
    setDetail((prevState) => ({
      ...prevState,
      additionalPrices: updatedPrices,
    }));
  };

  const handleAdditionalPriceChange = (index, event) => {
    const updatedPrices = [...detail.additionalPrices];
    updatedPrices[index].value = parseInt(event.target.value, 10);
    setDetail((prevState) => ({
      ...prevState,
      additionalPrices: updatedPrices,
    }));
  };

  const handleAddMore = () => {
    setDetail((prevState) => ({
      ...prevState,
      additionalPrices: [
        ...prevState.additionalPrices,
        { label: "", value: "" }, // Añadir un nuevo objeto con valores vacíos
      ],
    }));
  };

  return (
    isOpen && (
      <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-header"]}>
            <div className={styles.contentFile}>
              <h2 className={styles.title}>
                Agregue un servicio adicional a su sitio
              </h2>
            </div>
            <button className={styles["close-button"]} onClick={onClose}>
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className={styles["modal-content"]}>
            <div className={styles.modalContainer}>
              <h4 className={styles["label-title"]}>Agregar precio a:</h4>
              {additionalPrices.map((item, index) => (
                <Row className={styles.row} key={index}>
                  <Form.Group as={Col} className={styles.nameInput}>
                    <Form.Label>{`Nombre`}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={` Ej: Piscina`}
                      value={item.label}
                      onChange={(event) =>
                        handleAdditionalLabelChange(index, event)
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} className={styles.priceInput}>
                    <Form.Label>{`Precio`}</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={item.value}
                        placeholder={`50`}
                        onChange={(event) =>
                          handleAdditionalPriceChange(index, event)
                        }
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
              ))}

              <Button
                id={styles.buttonBlack}
                variant="secondary"
                onClick={handleAddMore}
              >
                Agregar
              </Button>
            </div>
          </div>

          <div className={styles["modal-footer"]}>
            <button className={styles["reservar-button"]} onClick={onChange}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalServicios;
