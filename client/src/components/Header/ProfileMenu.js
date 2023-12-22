import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "./header.scss";
import "./../../Loading.scss";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { dataPersonal, logoutUser } from "../../redux/action";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import LoginForms from "../LoginForms/LoginForms";
import { Modal } from "antd";
import BootstrapModal from "react-bootstrap/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";
import MenuItem from "@mui/material/MenuItem";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DetailsPostTuristic } from "../../redux/action";
import { UserPostDetails } from "../../redux/action";

export default function BasicMenu() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [openPublic, setOpenPublic] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenRegister, setIsModalOpenRegister] = React.useState(false);

  const values = [true];
  const [fullscreen, setFullscreen] = React.useState(true);
  const [modalPublic, setModalPublic] = React.useState(false);

  console.log(datapersonal.Posts);

  React.useEffect(() => {
    dispatch(DetailsPostTuristic(datapersonal.id));
  }, [dispatch]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setAnchorEl(null);
    setModalPublic(true);
  }

  const showModalRegister = () => {
    setAnchorEl(null);
    setIsModalOpen(false);
    setIsModalOpenRegister(true);
  };

  const handleOkRegister = () => {
    setIsModalOpenRegister(false);
  };

  const handleCancelRegister = () => {
    setIsModalOpenRegister(false);
  };

  const showModal = () => {
    setAnchorEl(null);
    setIsModalOpenRegister(false);
    setIsModalOpen(true);
    setOpenPublic(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Cambiar el estado de isLoading a "false" después de cierto tiempo
    }, 2000);
  }, []);

  const handleClickOpenLogout = () => {
    setAnchorEl(null);
    setOpenLogout(true);
    setIsModalOpen(false);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    setOpenLogout(false);
  };

  const handleClickOpenPublic = () => {
    setAnchorEl(null);

    setOpenPublic(true);
  };

  const handleClosePublic = () => {
    setAnchorEl(null);
    setOpenPublic(false);
  };

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  const handleLogout = () => {
    // Realizar el cierre de sesión en Redux
    dispatch(logoutUser());

    setOpenLogout(false);
    localStorage.removeItem("token");

    // Limpiar token en Local Storage
    navigate("/");
    // Redirigir al usuario a la página de inicio de sesión
  };

  const List = () => (
    <div className="modal-anfitrion-container">
      <div className="text-join-initial">
        <div>
          <img
            srcSet={require("../../assets/images/Atardecer.png")}
            alt="not found"
          />
        </div>
        <div className="text-initial">
          <h1>
            "Estamos comprometidos en dar a conocer tu sitio para que forme
            parte de los sitios más emocionantes, importantes e históricos de
            todo el mundo y que estén disponibles en un mismo{" "}
            <span id="lugar-modal">lugar</span>
            ."{" "}
          </h1>
        </div>
      </div>

      <div className="text-modal-2">
        <div className="text-join-family">
          <h1>
            Al unirte a <span className="color-title">Place enc</span>,
            obtendrás acceso a una audiencia diversa de viajeros y entusiastas
            del turismo que están buscando nuevas experiencias y destinos.
            Regístrate como propietario o administrador de un sitio turístico.
            Una vez que hayas creado tu perfil, podrás cargar fotos,
            descripciones, horarios de operación y cualquier otra información
            relevante sobre tu sitio.
          </h1>
        </div>
        <div className="image-modal1">
          <img
            src={require("../../assets/images/MOSAICO 2.png")}
            alt="not found"
          />
        </div>
      </div>
      <div className="text-plecee-end">
        <h1>
          {" "}
          <HelpOutlineIcon id="icons-question" /> ¡Únete a{" "}
          <span className="color-title">Place enc</span> y haz que tu sitio
          turístico forme parte del portafolio mundial de lugares turísticos!
        </h1>
      </div>
    </div>
  );

  return (
    <div className="account-menu">
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="menu">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {isLoading ? (
                <div>
                  <Grid>
                    <Box>
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </Grid>
                </div>
              ) : (
                <div>
                  {token ? (
                    datapersonal.avatar ? (
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          background: datapersonal.avatar
                            ? `url(${datapersonal.avatar})`
                            : datapersonal.backgroundColor,
                          backgroundSize: "cover",
                        }}
                      >
                        <div></div>
                      </Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: datapersonal.backgroundColor,
                        }}
                      >
                        <div>
                          {datapersonal.name &&
                            datapersonal.name[0].toUpperCase()}
                        </div>
                      </Avatar>
                    )
                  ) : (
                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                  )}
                </div>
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </div>
      {!token ? (
        <div className="container-lore">
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              ".MuiPaper-root": {
                minWidth: "200px",
                //height: "100vh",
                borderRadius: "1rem",
                boxShadow:
                  "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
              },
            }}
          >
            <MenuItem className="menu-items" onClick={showModal}>
              Iniciar sesión
            </MenuItem>

            <MenuItem onClick={showModalRegister} className="menu-items">
              Registrate
            </MenuItem>

            <MenuItem onClick={handleClickOpenPublic} className="menu-items">
              Publicar
            </MenuItem>

            <div
              style={{
                height: "1px",
                backgroundColor: "var(--grey)",
                width: "100%",
              }}
            />
          </Menu>
          <Modal
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null} // Esto quita los botones "Ok" y "Cancel"
            className="modal-login"
          >
            <LoginForms
              setIsModalOpen={setIsModalOpen}
              setIsModalOpenRegister={setIsModalOpenRegister}
              isModalOpenRegister={isModalOpenRegister}
            />
          </Modal>
          <Modal
            visible={isModalOpenRegister}
            onOk={handleOkRegister}
            onCancel={handleCancelRegister}
            footer={null} // Esto quita los botones "Ok" y "Cancel"
            className="modal-card"
          >
            <RegisterForm
              setIsModalOpen={setIsModalOpen}
              setIsModalOpenRegister={setIsModalOpenRegister}
            />
          </Modal>
        </div>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            ".MuiPaper-root": {
              minWidth: "200px",
              borderRadius: "1rem",
              boxShadow:
                "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
            },
          }}
        >
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--grey)",
              width: "100%",
            }}
          />
          <Link to="/account-settings">
            <MenuItem className="menu-items" onClick={handleClose}>
              Cuenta
            </MenuItem>
          </Link>
          {/*         <MenuItem className="menu-items" onClick={handleClose}>
              Informacion Personal
            </MenuItem> */}
          {datapersonal.Posts && datapersonal.Posts.length > 0 ? (
            <div>
              <Link to="/anfitrion">
                <MenuItem className="menu-items" onClick={handleClose}>
                  Modo anfitrión
                </MenuItem>
              </Link>
              <Link to="/public">
                <MenuItem className="menu-items" onClick={handleClose}>
                  Publicar
                </MenuItem>
              </Link>
            </div>
          ) : null}

          {datapersonal.Posts && datapersonal.Posts.length < 1 ? (
            <div>
              {values.map((v, idx) => (
                <MenuItem onClick={() => handleShow(v)} className="menu-items">
                  Unase placee enc como anfitrion
                </MenuItem>
              ))}
            </div>
          ) : null}

          <>
            <Button variant="transparent" onClick={handleClickOpenLogout}>
              <MenuItem className="content-menu-item-close" >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Button>
          </>
        </Menu>
      )}

      <Dialog
        open={openLogout}
        onClose={handleClosePublic}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro de que desea cerrar la sesión? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Antes de continuar, nos gustaría confirmar: ¿Está seguro de que
            desea cerrar la sesión? Este paso finalizará su sesión actual.
            Agradecemos su uso de nuestros servicios y esperamos volver a verle
            pronto.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="btn-modal">
          <Button onClick={handleLogout}>Cerrar sesión</Button>
          <Button onClick={handleCloseLogout} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog
          open={openPublic}
          onClose={handleClosePublic}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Tiene interés en generar una publicación en este momento?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Para dar inicio a la creación de una publicación, le invitamos
              cordialmente a acceder a su cuenta. En caso de no contar con un
              registro previo en nuestra plataforma, le recomendamos
              encarecidamente llevar a cabo el proceso de registro. Agradecemos
              de antemano su colaboración y comprensión.
            </DialogContentText>
          </DialogContent>
          <DialogActions className="btn-modal">
            <Button onClick={showModal}>Iniciar sesión</Button>
            <Button onClick={handleClosePublic}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <BootstrapModal
        show={modalPublic}
        fullscreen={fullscreen}
        onHide={() => setModalPublic(false)}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>
            <Link to="/">
              <img
                src={require("../../assets/logo/Nudo.png")}
                alt="Not found"
                className="logo-modal-join"
              />
            </Link>
          </BootstrapModal.Title>
          <div className="container-button-modal">
            <Link to="/preregister">
              <Button>
                <span id="text-btn-join">
                  <span>+</span> Unirse como anfitrion
                </span>
              </Button>
            </Link>
          </div>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{List()}</BootstrapModal.Body>
      </BootstrapModal>
    </div>
  );
}
