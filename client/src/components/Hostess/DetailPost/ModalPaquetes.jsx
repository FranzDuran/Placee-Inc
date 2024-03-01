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
  const { specialPackageItems, specialPackageName, specialPrecioTotal } =
    children;
  //----------------------------------------------------

  const handleSpecialPackage = (value) => {
    console.log("boleano");
    setDetail((prevState) => ({
      ...prevState,
      hasSpecialPackage: value,
    }));
  };

  const handleSpecialPackageName = (e) => {
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
    setDetail((prevState) => ({
      ...prevState,
      specialPackageItem: e.target.value,
    }));
  };

  const handleAddSpecialPackageItem = () => {
    if (detail.specialPackageItem.trim() !== "") {
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
    isOpen && (
      <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-header"]}>
            <div className={styles.contentFile}>
              <h2 className={styles.title}>
                Agregue un paquete exclusivo a su sitio
              </h2>
            </div>
            <button className={styles["close-button"]} onClick={onClose}>
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div className={styles["modal-content"]}>
            <div className={styles.modalContainer}>
              <>
                <Row id={styles.row}>
                  <Form.Group as={Col}>
                    <Form.Label className="label-status">
                      Nombre del pase o paquete
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del pase o paquete"
                      value={specialPackageName}
                      onChange={handleSpecialPackageName}
                    />
                  </Form.Group>
                </Row>

                <Row id={styles.row}>
                  <Form.Group as={Col} classNam={styles.containerRow} >
                    <Form.Label className="label-status">Incluye:</Form.Label>

                    <Card className={styles.cardContainer}>
                      <Card.Body className={styles.cardBody}>
                        {specialPackageItems?.map((details, index) => (
                          <span key={index} className={styles.cardSpan}>
                            {details}
                            <button
                              onClick={() =>
                                handleRemoveSpecialPackageItem(index)
                              }
                              size="sm"
                              className={styles.btnCard}
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
                <Row id={styles.row}>
                  <Form.Group as={Col}>
                    <Form.Label className="label-status">Total</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Total"
                        value={specialPrecioTotal}
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
            <button className={styles["guardar-button"]} onClick={onChange}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalPaquetes;
