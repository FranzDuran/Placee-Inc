import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";

const PlaceDetailsModal = ({
  show,
  handleClose,
  handleAddDetail,
  handleDeleteDetail,
  handleUploadAll,
  showStatus,
  validated,
  detail,
  handleDetailChange,
  selectedCheckboxes,
  handleCheckboxChange,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          El lugar cuenta con:{" "}
          <span className={showStatus === "Público" ? "label-status" : ""}>
            (Modal)
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            {show.listDetails.map((details, index) => (
              <span
                key={index}
                className="mr-2"
                style={{
                  fontSize: "14px",
                  maxHeight: "80px",
                  background: "#DFDFDF",
                  padding: "5px",
                  borderRadius: "5px",
                  lineHeight: "30pt",
                }}
              >
                {details}
                <button
                  onClick={() => handleDeleteDetail(index)}
                  size="sm"
                  className="ml-2"
                >
                  X
                </button>
              </span>
            ))}
          </Card.Body>
        </Card>
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            placeholder="Nuevo detalle"
            value={detail}
            onChange={handleDetailChange}
            className="flex-grow-1 mr-2"
            isInvalid={!show.listDetails && validated}
          />
          <Button variant="primary" onClick={handleAddDetail}>
            Agregar
          </Button>
          <Form.Control.Feedback type="invalid">
            Por favor seleccione una opción de capacidad de personas.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <h5>Seleccionar detalles:</h5>
          {[...Array(10).keys()].map((index) => (
            <Form.Check
              key={index}
              type="checkbox"
              id={`checkbox-${index}`}
              label={`Opción ${index + 1}`}
              checked={selectedCheckboxes[index] || false}
              onChange={() => handleCheckboxChange(index)}
            />
          ))}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleUploadAll}>
          Subir todo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlaceDetailsModal;
