import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalServicios.module.scss";
import Row from "react-bootstrap/Row";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";

const ModalServicios = ({
  isOpen,
  onClose,
  children,
  onChange,
  detail,
  setDetail,
}) => {
  const { additionalPrices } = children;

  const [additionalServices, setAdditionalServices] = useState([
    { label: "", value: "" },
  ]);

  const handleServiceNameChange = (index, event) => {
    const updatedServices = [...additionalServices];
    updatedServices[index].label = event.target.value;
    setAdditionalServices(updatedServices);
  };

  const handleServicePriceChange = (index, event) => {
    const updatedServices = [...additionalServices];
    updatedServices[index].value = event.target.value;
    setAdditionalServices(updatedServices);
  };

  const handleAddService = () => {
    setAdditionalServices([...additionalServices, { label: "", value: "" }]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...additionalServices];
    updatedServices.splice(index, 1);
    setAdditionalServices(updatedServices);
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
                <Row key={index} id={styles.row}>
                  <Form.Group as={Col} id={styles.nameInput}>
                    <Form.Label>{`Nombre`}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={` Ej: Piscina`}
                      value={item.label}
                    />
                  </Form.Group>

                  <Form.Group as={Col} id={styles.priceInput}>
                    <Form.Label>{`Precio`}</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder={`50`}
                        value={item.value}
                      />
                      {/* <InputGroup.Text>.00</InputGroup.Text> */}
                    </InputGroup>
                  </Form.Group>
                  <Button
                    id={styles.eliminarInput}
                    variant="danger"
                    //onClick={() => handleRemoveService(index)}
                  >
                    x
                  </Button>
                </Row>
              ))}

              {additionalServices.map((service, index) => (
                <Row key={index} id={styles.row}>
                  <Form.Group as={Col} id={styles.nameInput}>
                    <Form.Label>{`Nombre`}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={` Ej: Piscina`}
                      value={service.label}
                      onChange={(event) =>
                        handleServiceNameChange(index, event)
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} id={styles.priceInput}>
                    <Form.Label>{`Precio`}</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder={`50`}
                        value={service.value}
                        onChange={(event) =>
                          handleServicePriceChange(index, event)
                        }
                      />
                      {/*  <InputGroup.Text>.00</InputGroup.Text> */}
                    </InputGroup>
                  </Form.Group>
                  <Button
                    id={styles.eliminarInput}
                    variant="danger"
                    onClick={() => handleRemoveService(index)}
                  >
                    x
                  </Button>
                </Row>
              ))}
            </div>
          </div>

          <div className={styles["modal-footer"]}>
            <Button
              id={styles.buttonBlack}
              variant="secondary"
              onClick={handleAddService}
            >
              Agregar
            </Button>
            <button className={styles["guardar-button"]} onClick={onChange}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalServicios;
