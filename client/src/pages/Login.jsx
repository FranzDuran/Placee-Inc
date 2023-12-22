import LoginForms from "../components/LoginForms/LoginForms";
import { useState, useEffect } from "react";
import BeatLoader from "react-loading";
import "../Loading.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../components/LoginForms/LoginForms.scss";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Cambiar el estado a "false" después de cierto tiempo
    }, 1000);
  }, []);

  const [show, setShow] = useState(false);

  const handleCloseLogin = () => setShow(false);
  const handleShowLogin = () => setShow(true);
  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <BeatLoader color="#8B008B" size="80" />
        </div>
      ) : (
        <div>
          <Button variant="primary" onClick={handleShowLogin}>
            Launch demo modal
          </Button>

          <Modal show={show} onHide={handleCloseLogin}>
            <Modal.Header closeButton />

            <Modal.Body>
              <LoginForms />
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}
