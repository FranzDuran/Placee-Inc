import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "antd";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { useParams, Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import styles from "./DetailPost.module.scss";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Space } from "antd";
import ButtonBootstrap from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UpdatePhoto from "../UpdatePhoto/UpdatePhoto";
import ModalBootstrap from "react-bootstrap/Modal";
import EditIcon from "@mui/icons-material/Edit";
import ButtonMaterial from "@mui/material/Button";

import GalleryModal from "../../CardDetails/GalleryModal.jsx";
import ModalServicios from "./ModalServicios";
import ModalPaquetes from "./ModalPaquetes";

import { useSelector, useDispatch } from "react-redux";
import {
  dataPersonal,
  DetailsPostTuristic,
  updatePersonal,
  DeletePost,
  updatepost,
} from "../../../redux/action";

const { confirm } = Modal;

export default function DetailPost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();

  //---- Me traigo la data del post -----
  const detailpost = useSelector((state) => state.detailpost);
  console.log(detailpost);

  const token = useSelector((state) => state.token);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  const [showTittle, setShowTittle] = useState(false);
  const [showContinent, setShowContinent] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showPriceMenores, setShowPriceMenores] = useState(false);
  const [showPriceTransporte, setShowPriceTransporte] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showPolitic, setShowPolitic] = useState(false);

  const [detail, setDetail] = useState({
    title: "",
    continent: "",
    country: "",
    status: "",
    price: null,
    priceMenores: null,
    summary: "",
    description: "",
    people: "",
    listDetails: "",
    infoImportant: "",
    priceTransporte: null,
    transportes: [],
    additionalPrices: [],
    specialPackageName: "",
    specialPrecioTotal: "",
    specialPackageItem: [],
  });
  console.log(detail);

  useEffect(() => {
    if (detailpost) {
      setDetail({
        title: detailpost.title,
        continent: detailpost.continent,
        country: detailpost.country,
        status: detailpost.status,
        price: detailpost.price,
        priceMenores: detailpost.priceMenores,
        summary: detailpost.summary,
        description: detailpost.description,
        people: detailpost.people,
        listDetails: detailpost.listDetails,
        infoImportant: detailpost.infoImportant,
        priceTransporte: detailpost.priceTransporte,
        transportes: detailpost.transportes,
        additionalPrices: detailpost.additionalPrices,
        specialPackageName: detailpost.specialPackageName,
        specialPrecioTotal: detailpost.specialPrecioTotal,
        specialPackageItem: detailpost.specialPackageItems,
      });
      setSelectedItems(detailpost.transportes);
    }
  }, [detailpost]);

  const handleCloseTitle = () => {
    console.log("cerrar modal");
    setShowTittle(false);
    setShowContinent(false);
    setShowStatus(false);
    setShowPrice(false);
    setShowPriceMenores(false);
    setShowPriceTransporte(false);
    setShowSummary(false);
    setShowDescription(false);
    setShowPeople(false);
    setShowList(false);
    setShowPolitic(false);
  };
  const handleShowTitle = () => setShowTittle(true);

  const handleShowContinent = () => setShowContinent(true);
  const handleShowStatus = () => setShowStatus(true);
  const handleShowPrice = () => setShowPrice(true);
  const handleShowPriceMenores = () => setShowPriceMenores(true);
  const handleShowPriceTransporte = () => setShowPriceTransporte(true);
  const handleShowSummary = () => setShowSummary(true);
  const handleShowDescription = () => setShowDescription(true);
  const handleShowPeople = () => setShowPeople(true);
  const handleShowList = () => setShowList(true);
  const handleShowPolitic = () => setShowPolitic(true);

  const handleDelete = () => {
    dispatch(DeletePost(postId));
    navigate("/anfitrion/mi sitio");
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Seguro que quieres eliminar tu publicación?",
      icon: <ExclamationCircleFilled />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    dispatch(dataPersonal(token));
    dispatch(DetailsPostTuristic(postId));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dispatching updatepost...");
    dispatch(updatepost(postId, detail))
      .then(() => {
        console.log("updatepost successful, fetching updated detailpost...");
        // Fetch the updated detailpost after successful update
        dispatch(DetailsPostTuristic(postId));
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });

    handleCloseTitle();
  };

  const handleOnClose = () => {
    setShow(false);
  };

  const handleTitle = (e) => {
    setDetail({
      ...detail,
      title: e.target.value,
    });
  };

  //-------- TRANSPOSTE -------------------------

  const [mostrarCheckbox, setMostrarCheckbox] = useState(false);
  const [selectedItems, setSelectedItems] = useState(detail.transportes);

  const handleCheckboxTransporte = (item) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);

    // Aquí, utilizamos la función de setState para asegurarnos de tener acceso al valor actualizado de selectedItems.
    setDetail((prevDetail) => ({
      ...prevDetail,
      transportes: updatedItems,
    }));
  };

  const handleLabelClick = () => {
    setMostrarCheckbox(!mostrarCheckbox);
  };

  /* const handlePriceTransporte = (e) => {
    console.log(e.target.value)
    e.preventDefault();
    setDetail((prevState) => ({
      ...prevState,
      priceTransporte: parseInt(e.target.value, 10),
    }));
  }; */
  //------------- MODAL SERVICIOS -------------------------------------

  const [modalOpenServicios, setModalOpenServicios] = useState(false);

  const openModalServicios = () => {
    setModalOpenServicios(true);
  };

  const closeModalServicios = () => {
    setModalOpenServicios(false);
  };

  //------------------------------------------------------------------
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal1 = () => setShowModal1(false);
  const handleCloseModal2 = () => setShowModal2(false);

  const handleShowModals = () => {
    console.log("1");
    setShowModal1(true);
    setShowModal2(true);
  };

  return (
    <div className={styles["container-updatePublic"]}>
      <div className={styles["card-update"]}>
        <div className={styles.tabletOneTop}>
          <div className={styles["card-image"]}>
            <div className={styles["title-subtitle"]}>
              <div className={styles.titleContent}>
                <h1>{detailpost.title}</h1>
                <div onClick={handleShowTitle}>
                  <i className="ri-edit-2-line" id={styles.btnEditTitle}></i>
                </div>

                <ModalBootstrap show={showTittle} onHide={handleCloseTitle}>
                  <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <ModalBootstrap.Header closeButton>
                      <ModalBootstrap.Title>Titulo</ModalBootstrap.Title>
                    </ModalBootstrap.Header>
                    <ModalBootstrap.Body>
                      <Form className="modal-titleupdate">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label></Form.Label>
                          <Form.Control
                            type="text"
                            autoFocus
                            placeholder="Titulo"
                            value={detail.title && detail.title}
                            onChange={handleTitle}
                            className={styles.inputForm}
                          />
                        </Form.Group>
                      </Form>
                    </ModalBootstrap.Body>

                    <ModalBootstrap.Footer>
                      <ButtonBootstrap
                        variant="secondary"
                        onClick={handleCloseTitle}
                        className={styles.btnModalCancelar}
                      >
                        Cancelar
                      </ButtonBootstrap>
                      <ButtonBootstrap
                        type="submit"
                        variant="primary"
                        className={styles.btnModalGuardar}
                      >
                        Guardar cambio
                      </ButtonBootstrap>
                    </ModalBootstrap.Footer>
                  </form>
                </ModalBootstrap>
              </div>
              <div className={styles["update-btn-container"]}>
                <div className={styles["update-title-country"]}>
                  <span className={styles["sub-title"]}>
                    {detailpost.continent}, {detailpost.country}.
                  </span>

                  <Button
                    variant="primary"
                    onClick={handleShowContinent}
                    className={styles["country-btn"]}
                  >
                    <i className="ri-edit-2-line"></i>
                  </Button>

                  <ModalBootstrap
                    show={showContinent}
                    onHide={handleCloseTitle}
                  >
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                      <ModalBootstrap.Header closeButton>
                        <ModalBootstrap.Title></ModalBootstrap.Title>
                      </ModalBootstrap.Header>
                      <ModalBootstrap.Body>
                        <Form className="modal-titleupdate">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Continente</Form.Label>
                            <Form.Control
                              type="text"
                              autoFocus
                              placeholder={detailpost.continent}
                              value={detail.continent}
                              onChange={(e) =>
                                setDetail({
                                  ...detail,
                                  continent: e.target.value,
                                })
                              }
                              className={styles.inputForm}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Pais</Form.Label>

                            <Form.Control
                              type="text"
                              autoFocus
                              placeholder={detailpost.country}
                              value={detail.country}
                              onChange={(e) =>
                                setDetail({
                                  ...detail,
                                  country: e.target.value,
                                })
                              }
                              className={styles.inputForm}
                            />
                          </Form.Group>
                        </Form>
                      </ModalBootstrap.Body>
                      <ModalBootstrap.Footer>
                        <ButtonBootstrap
                          variant="secondary"
                          onClick={handleCloseTitle}
                          className={styles.btnModalCancelar}
                        >
                          Cancelar
                        </ButtonBootstrap>
                        <ButtonBootstrap
                          type="submit"
                          variant="primary"
                          className={styles.btnModalGuardar}
                        >
                          Guardar cambio
                        </ButtonBootstrap>
                      </ModalBootstrap.Footer>
                    </form>
                  </ModalBootstrap>
                </div>
                <div className={styles["update-title-status"]}>
                  <span className={styles["sub-title"]}>
                    Estado: {detailpost.status}
                  </span>

                  <Button
                    variant="primary"
                    /* className="btn-black" */
                    onClick={handleShowStatus}
                    className={styles["status-btn"]}
                  >
                    <i className="ri-edit-2-line"></i>
                  </Button>

                  <ModalBootstrap show={showStatus} onHide={handleCloseTitle}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <ModalBootstrap.Header closeButton>
                        <ModalBootstrap.Title>Estado</ModalBootstrap.Title>
                      </ModalBootstrap.Header>
                      <ModalBootstrap.Body>
                        <Form className="modal-titleupdate">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label></Form.Label>
                            <Form.Control
                              type="text"
                              autoFocus
                              placeholder="Estado"
                              value={detail.status}
                              onChange={(e) =>
                                setDetail({ ...detail, status: e.target.value })
                              }
                              className={styles.inputForm}
                            />
                          </Form.Group>
                        </Form>
                      </ModalBootstrap.Body>
                      <ModalBootstrap.Footer>
                        <ButtonBootstrap
                          variant="secondary"
                          onClick={handleCloseTitle}
                          className={styles.btnModalCancelar}
                        >
                          Cancelar
                        </ButtonBootstrap>
                        <ButtonBootstrap
                          type="submit"
                          variant="primary"
                          className={styles.btnModalGuardar}
                        >
                          Guardar cambio
                        </ButtonBootstrap>
                      </ModalBootstrap.Footer>
                    </form>
                  </ModalBootstrap>
                </div>
              </div>
              <div className={styles["btn-delete-content"]}>
                <a href={"/rooms/" + postId} target="_blank">
                  <Space wrap>
                    <Button
                      onClick={showDeleteConfirm}
                      type="dashed"
                      className={styles["btn-delete"]}
                    >
                      Ir a publicación
                    </Button>
                  </Space>
                </a>
              </div>

              <div
                className={styles["btn-delete-content"]}
                id={styles.btnEliminarPubli}
              >
                <Space wrap>
                  <Button
                    onClick={showDeleteConfirm}
                    type="dashed"
                    className={styles["btn-delete"]}
                  >
                    Eliminar publicacion
                  </Button>
                </Space>
              </div>
            </div>
            <div className={styles.contentImage}>
              <div className={styles.imageContainer}>
                <Carousel
                  interval={null}
                  className={styles["swiper-anfitrion"]}
                >
                  {detailpost.imageFile &&
                    detailpost.imageFile.map((imageSrc, imageIndex) => (
                      <Carousel.Item key={imageIndex}>
                        <div>
                          <img
                            src={imageSrc}
                            alt={imageSrc}
                            className={styles["img-update"]}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                </Carousel>

                {/* {values.map((v, idx) => ( */}
                <Button
                  variant="primary"
                  //key={idx}
                  className={styles["editar-hostess"]}
                  onClick={() => handleShow(true)}
                >
                  <EditIcon className={styles["icon-editar"]} />
                  {/* {typeof v === "string" && `below ${v.split("-")[0]}`} */}
                </Button>

                {show && (
                  <GalleryModal
                    images={detailpost.imageFile}
                    onClose={handleOnClose}
                  />
                )}
                {/* ))} */}
                {/* <ModalBootstrap
                  show={show}
                  fullscreen={fullscreen}
                  onHide={() => setShow(false)}
      
                >
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title></ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body >
                    <UpdatePhoto fotos={detailpost.imageFile} />
                  </ModalBootstrap.Body>
                </ModalBootstrap> */}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabletOneBottom}>
          <div className={styles["container-direction"]}>
            <div className={styles["card-direction"]}>
              <div className={styles["container-ubicacion"]}>
                <span className={styles["direction"]}>Dirección</span>
                <Button
                  className={styles.btnUbicacion}
                  //onClick={handleShowModals}
                >
                  <span id="go-btn">Editar Ubicacion</span>
                </Button>
              </div>
              <Card className={styles["card-detailpost"]}>
                <p>{detailpost.addressMap || "--"}</p>
              </Card>
              <div className={styles["publication-btn"]}></div>
            </div>
            <div className={styles["update-title-price"]}>
              <div className={styles["card-price"]}>
                <span className={styles["direction"]}>Precio Adultos:</span>
                <Card className={styles.price}>
                  <p> ${detailpost.price}</p>
                </Card>
              </div>
              <ButtonMaterial
                onClick={handleShowPrice}
                className={styles.btnEditPrice}
                sx={{
                  color: "#8B008B",
                  borderRadius: "50px",
                  padding: "10px",
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                }}
              >
                <i className="ri-edit-2-line" id={styles["edit-icon"]}></i>
              </ButtonMaterial>
              <ModalBootstrap show={showPrice} onHide={handleCloseTitle}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>Precio</ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body>
                    <Form className="modal-titleupdate">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          placeholder="Precio adulto"
                          value={detail.price}
                          onChange={(e) =>
                            setDetail({ ...detail, price: e.target.value })
                          }
                          className={styles.inputForm}
                        />
                      </Form.Group>
                    </Form>
                  </ModalBootstrap.Body>
                  <ModalBootstrap.Footer>
                    <ButtonBootstrap
                      variant="secondary"
                      onClick={handleCloseTitle}
                      className={styles.btnModalCancelar}
                    >
                      Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap
                      type="submit"
                      variant="primary"
                      className={styles.btnModalGuardar}
                    >
                      Guardar cambio
                    </ButtonBootstrap>
                  </ModalBootstrap.Footer>
                </form>
              </ModalBootstrap>
              <div className={styles["card-price"]}>
                <span className={styles["direction"]}>Precio Niños:</span>
                <Card className={styles.price}>
                  <p> ${detailpost.priceMenores}</p>
                </Card>
              </div>
              <ButtonMaterial
                onClick={handleShowPriceMenores}
                className={styles.btnEditPrice}
                sx={{
                  color: "#8B008B",
                  borderRadius: "50px",
                  padding: "10px",
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                }}
              >
                <i className="ri-edit-2-line" id={styles["edit-icon"]}></i>
              </ButtonMaterial>
              <ModalBootstrap show={showPriceMenores} onHide={handleCloseTitle}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>Precio Niños</ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body>
                    <Form className="modal-titleupdate">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          placeholder="Precio niños"
                          value={detail.pripriceMenoresce}
                          onChange={(e) =>
                            setDetail({
                              ...detail,
                              priceMenores: e.target.value,
                            })
                          }
                          /* onChange={(e) =>
                            setDetail({ ...detail, price: e.target.value })
                          } */
                          className={styles.inputForm}
                        />
                      </Form.Group>
                    </Form>
                  </ModalBootstrap.Body>
                  <ModalBootstrap.Footer>
                    <ButtonBootstrap
                      variant="secondary"
                      onClick={handleCloseTitle}
                      className={styles.btnModalCancelar}
                    >
                      Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap
                      type="submit"
                      variant="primary"
                      className={styles.btnModalGuardar}
                    >
                      Guardar cambio
                    </ButtonBootstrap>
                  </ModalBootstrap.Footer>
                </form>
              </ModalBootstrap>
            </div>

            <div className={styles.containerSelectTransporte}>
              <Button
                className={styles.btnTransporte}
                onClick={handleLabelClick}
              >
                <span id="go-btn">
                  Seleccione el tipo de transporte permitido
                </span>
              </Button>

              {mostrarCheckbox && (
                <div className={styles.containerCheckboxTransporte}>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Automovil"
                      checked={selectedItems.includes("Automovil")}
                      onChange={() => handleCheckboxTransporte("Automovil")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Moto"
                      checked={selectedItems.includes("Moto")}
                      onChange={() => handleCheckboxTransporte("Moto")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Bicicleta"
                      checked={selectedItems.includes("Bicicleta")}
                      onChange={() => handleCheckboxTransporte("Bicicleta")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Bus"
                      checked={selectedItems.includes("Bus")}
                      onChange={() => handleCheckboxTransporte("Bus")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Camion"
                      checked={selectedItems.includes("Camion")}
                      onChange={() => handleCheckboxTransporte("Camion")}
                    />
                  </Form.Group>
                  <button onClick={(e) => handleSubmit(e)}>Guardar</button>
                </div>
              )}
            </div>

            <div className={styles["update-title-price"]}>
              <div className={styles["card-price"]}>
                <span className={styles["direction"]}>Precio Transporte:</span>
                <Card className={styles.price}>
                  <p> ${detailpost.priceTransporte}</p>
                </Card>
              </div>
              <ButtonMaterial
                onClick={handleShowPriceTransporte}
                className={styles.btnEditPrice}
                sx={{
                  color: "#8B008B",
                  borderRadius: "50px",
                  padding: "10px",
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                }}
              >
                <i className="ri-edit-2-line" id={styles["edit-icon"]}></i>
              </ButtonMaterial>
              <ModalBootstrap
                show={showPriceTransporte}
                onHide={handleCloseTitle}
              >
                <form onSubmit={(e) => handleSubmit(e)}>
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>
                      Precio transporte
                    </ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body>
                    <Form className="modal-titleupdate">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          placeholder={detailpost.priceTransporte}
                          value={detail.priceTransporte}
                          onChange={(e) =>
                            setDetail({
                              ...detail,
                              priceTransporte: parseInt(e.target.value, 10),
                            })
                          }
                          className={styles.inputForm}
                        />
                      </Form.Group>
                    </Form>
                  </ModalBootstrap.Body>
                  <ModalBootstrap.Footer>
                    <ButtonBootstrap
                      variant="secondary"
                      onClick={handleCloseTitle}
                      className={styles.btnModalCancelar}
                    >
                      Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap
                      type="submit"
                      variant="primary"
                      className={styles.btnModalGuardar}
                    >
                      Guardar cambio
                    </ButtonBootstrap>
                  </ModalBootstrap.Footer>
                </form>
              </ModalBootstrap>
            </div>

            <div className={styles["publication-btn"]}>
              <Button
                className={styles.btnServicios}
                onClick={handleShowModals}
              >
                <span id="go-btn">Ir a Servicios Adicionales y Paquetes</span>
              </Button>
            </div>
            <ModalServicios
              isOpen={showModal1}
              onClose={handleCloseModal1}
              setDetail={setDetail}
              detail={detail}
              children={detailpost}
            />
            <ModalPaquetes
              isOpen={showModal2}
              onClose={handleCloseModal2}
              setDetail={setDetail}
              detail={detail}
              children={detailpost}
            />
          </div>
        </div>
      </div>
      <div className={styles.tabletTwo}>
        <div className={styles["accordion-bg"]}>
          <Accordion
            className={styles["accordion-container"]}
            defaultActiveKey="0"
          >
            <div className={styles["update-title-accordion"]}>
              <Accordion.Item className={styles.accordion} eventKey="0">
                <div>
                  <Accordion.Header id="header-accordion">
                    Resumen del Lugar
                  </Accordion.Header>
                  <Accordion.Body>
                    {detailpost.summary}
                    <div className={styles.iconsEdit}>
                      <ButtonMaterial
                        onClick={handleShowSummary}
                        sx={{
                          color: "#8B008B",
                          borderRadius: "50px",
                          padding: "10px",
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                          margin: "0 0 0 auto",
                        }}
                      >
                        <EditIcon />
                      </ButtonMaterial>
                    </div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>

              <ModalBootstrap show={showSummary} onHide={handleCloseTitle}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>
                      Resumen del Lugar
                    </ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body>
                    <Form className={styles["modal-titleupdate"]}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          placeholder={detailpost.summary}
                          value={detail.summary}
                          onChange={(e) =>
                            setDetail({ ...detail, summary: e.target.value })
                          }
                          className={styles.inputForm}
                        />
                      </Form.Group>
                    </Form>
                  </ModalBootstrap.Body>
                  <ModalBootstrap.Footer>
                    <ButtonBootstrap
                      variant="secondary"
                      onClick={handleCloseTitle}
                      className={styles.btnModalCancelar}
                    >
                      Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap
                      type="submit"
                      variant="primary"
                      className={styles.btnModalGuardar}
                    >
                      Guardar cambio
                    </ButtonBootstrap>
                  </ModalBootstrap.Footer>
                </form>
              </ModalBootstrap>
            </div>

            <div className="update-title">
              <Accordion.Item className="accordion" eventKey="1">
                <div>
                  <Accordion.Header>Descripción</Accordion.Header>
                  <Accordion.Body>
                    {detailpost.description}
                    <div className={styles.iconsEdit}>
                      <ButtonMaterial
                        onClick={handleShowDescription}
                        sx={{
                          color: "#8B008B",
                          borderRadius: "50px",
                          padding: "10px",
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                        }}
                      >
                        <EditIcon />
                      </ButtonMaterial>
                    </div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>

              <ModalBootstrap show={showDescription} onHide={handleCloseTitle}>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>Descripción</ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body>
                    <Form className="modal-titleupdate">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          placeholder={detailpost.description}
                          value={detail.description}
                          onChange={(e) =>
                            setDetail({
                              ...detail,
                              description: e.target.value,
                            })
                          }
                          className={styles.inputForm}
                        />
                      </Form.Group>
                    </Form>
                  </ModalBootstrap.Body>
                  <ModalBootstrap.Footer>
                    <ButtonBootstrap
                      variant="secondary"
                      onClick={handleCloseTitle}
                      className={styles.btnModalCancelar}
                    >
                      Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap
                      type="submit"
                      variant="primary"
                      className={styles.btnModalGuardar}
                    >
                      Guardar cambio
                    </ButtonBootstrap>
                  </ModalBootstrap.Footer>
                </form>
              </ModalBootstrap>
            </div>
            <div className="update-title">
              <Accordion.Item className="accordion" eventKey="2">
                <div>
                  <Accordion.Header>Capacidad de personas</Accordion.Header>
                  <Accordion.Body>
                    {detailpost.people}
                    <div className={styles.iconsEdit}>
                      <ButtonMaterial
                        onClick={handleShowPeople}
                        sx={{
                          color: "#8B008B",
                          borderRadius: "50px",
                          padding: "10px",
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                        }}
                      >
                        <EditIcon />
                      </ButtonMaterial>
                    </div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>

              <ModalBootstrap show={showPeople} onHide={handleCloseTitle}>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                  <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>
                      Capacidad de personas
                    </ModalBootstrap.Title>
                  </ModalBootstrap.Header>
                  <ModalBootstrap.Body>
                    <Form className="modal-titleupdate">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          placeholder={detailpost.people}
                          value={detail.people}
                          onChange={(e) =>
                            setDetail({ ...detail, people: e.target.value })
                          }
                          className={styles.inputForm}
                        />
                      </Form.Group>
                    </Form>
                  </ModalBootstrap.Body>
                  <ModalBootstrap.Footer>
                    <ButtonBootstrap
                      variant="secondary"
                      onClick={handleCloseTitle}
                      className={styles.btnModalCancelar}
                    >
                      Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap
                      type="submit"
                      variant="primary"
                      className={styles.btnModalGuardar}
                    >
                      Guardar cambio
                    </ButtonBootstrap>
                  </ModalBootstrap.Footer>
                </form>
              </ModalBootstrap>
            </div>
            <div className="update-title">
              <Accordion.Item className="accordion" eventKey="3">
                <div>
                  <Accordion.Header>Cuenta con:</Accordion.Header>
                  <Accordion.Body>
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {detailpost.listDetails &&
                        detailpost.listDetails.map((list, index) => (
                          <li key={index} className="text-gray-400">
                            <span className="text-gray-600">{list}</span>
                          </li>
                        ))}
                    </ul>
                    <div className={styles.iconsEdit}>
                      <ButtonMaterial
                        onClick={handleShowList}
                        sx={{
                          color: "#8B008B",
                          borderRadius: "50px",
                          padding: "10px",
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                        }}
                      >
                        <EditIcon />
                      </ButtonMaterial>
                    </div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>

              <ModalBootstrap show={showList} onHide={handleCloseTitle}>
                <ModalBootstrap.Header closeButton>
                  <ModalBootstrap.Title>Cuenta con:</ModalBootstrap.Title>
                </ModalBootstrap.Header>
                <ModalBootstrap.Body>
                  <Form className="modal-titleupdate">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label></Form.Label>
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {detailpost.listDetails &&
                          detailpost.listDetails.map((list, index) => (
                            <li key={index} className="text-gray-400">
                              <span className="text-gray-600">{list}</span>
                            </li>
                          ))}
                      </ul>
                      <Form.Control
                        type="text"
                        autoFocus
                        placeholder={detailpost.listDetails}
                        value={detail.listDetails}
                        className={styles.inputForm}
                      />
                    </Form.Group>
                  </Form>
                </ModalBootstrap.Body>
                <ModalBootstrap.Footer>
                  <ButtonBootstrap
                    variant="secondary"
                    onClick={handleCloseTitle}
                    className={styles.btnModalCancelar}
                  >
                    Cancelar
                  </ButtonBootstrap>
                  <ButtonBootstrap className={styles.btnModalGuardar}>
                    Guardar cambio
                  </ButtonBootstrap>
                </ModalBootstrap.Footer>
              </ModalBootstrap>
            </div>
            <div className="update-title">
              <Accordion.Item className="accordion" eventKey="4">
                <div>
                  <Accordion.Header>Políticas del lugar</Accordion.Header>
                  <Accordion.Body>
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {detailpost.infoImportant &&
                        detailpost.infoImportant.map((list, index) => (
                          <li key={index} className="text-gray-400">
                            <span className="text-gray-600">{list}</span>
                          </li>
                        ))}
                    </ul>
                    <div className={styles.iconsEdit}>
                      <ButtonMaterial
                        onClick={handleShowPolitic}
                        sx={{
                          color: "#8B008B",
                          borderRadius: "50px",
                          padding: "10px",
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                        }}
                      >
                        <EditIcon />
                      </ButtonMaterial>
                    </div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>

              <ModalBootstrap show={showPolitic} onHide={handleCloseTitle}>
                <ModalBootstrap.Header className="header-modal" closeButton>
                  <ModalBootstrap.Title>
                    Políticas del lugar
                  </ModalBootstrap.Title>
                </ModalBootstrap.Header>
                <ModalBootstrap.Body>
                  <Form className="modal-titleupdate">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label></Form.Label>
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {detailpost.infoImportant &&
                          detailpost.infoImportant.map((list, index) => (
                            <li key={index} className="text-gray-400">
                              <span className="text-gray-600">{list}</span>
                            </li>
                          ))}
                      </ul>
                      <Form.Control
                        type="text"
                        autoFocus
                        placeholder={detailpost.infoImportant}
                        value={detail.infoImportant}
                        className={styles.inputForm}
                      />
                    </Form.Group>
                  </Form>
                </ModalBootstrap.Body>
                <ModalBootstrap.Footer>
                  <ButtonBootstrap
                    variant="secondary"
                    onClick={handleCloseTitle}
                    className={styles.btnModalCancelar}
                  >
                    Cancelar
                  </ButtonBootstrap>
                  <ButtonBootstrap className={styles.btnModalGuardar}>
                    Guardar cambio
                  </ButtonBootstrap>
                </ModalBootstrap.Footer>
              </ModalBootstrap>
            </div>

            <Card className={styles.fechaHora}>
              <p>Fecha y horario del sitio:</p>
            </Card>
            <div className={styles["slide-container"]}>
              <Splide
                options={{
                  type: "slide", // Tipo de transición (slide)
                  perPage: 1, // Número de elementos a mostrar en un slide
                  perMove: 1, // Número de elementos a mover en cada transición
                  pagination: false,
                }}
              >
                <SplideSlide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1em",
                  }}
                >
                  <Card className={styles["card-calendar"]}>
                    <p>lun</p>
                    <p>10</p>
                    <p>oct</p>
                  </Card>
                  <Card className={styles["card-calendar"]}>
                    <p>mar</p>
                    <p>10</p>
                    <p>oct</p>
                  </Card>
                  <Card className={styles["card-calendar"]}>
                    <p>mié</p>
                    <p>10</p>
                    <p>oct</p>
                  </Card>
                </SplideSlide>
              </Splide>
              <Card className={styles["card-calendar1"]}>
                <p>Ver todas las fechas</p>
              </Card>
            </div>
            <div>
              <input type="num" />
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
