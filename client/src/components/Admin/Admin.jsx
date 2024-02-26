import React, { useState, useEffect, useCallback } from "react";
import "./HostessPosts.scss";
import Avatar from "@mui/material/Avatar";
import { Layout, Menu, Button } from "antd";
import Start from "./StartAdmin/StartAdmin";
import { useSelector, useDispatch } from "react-redux";
import { dataPersonal } from "../../redux/action";
import Mywebsite from "./Mywebsite/Mywebsite";
import { CameraOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { updatePersonal } from "../../redux/action";
import FooterMobile from "./FooterMobile/FooterMobile";
import { PhotoCamera } from "@mui/icons-material";
import { alpha, Box, IconButton, styled } from "@mui/material";
import ButtonMaterial from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "remixicon/fonts/remixicon.css";

const { Header, Sider, Content } = Layout;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const datapersonal = useSelector((state) => state.datapersonal);
  const token = useSelector((state) => state.token);
  const [start, setStart] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [update, setUpdate] = useState({
    avatar: "",
  });
  const [myWebSite, setMyWebSite] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);

    // Fetch personal data
    dispatch(dataPersonal(token));
  }, [token, dispatch]);

  const handleSubmit = async (e) => {
    console.log("Formulario enviado", update);
    const formData = new FormData();
    formData.append("avatar", update.avatar);

    try {
      await dispatch(updatePersonal(datapersonal.id, formData));
      console.log("Datos actualizados exitosamente");
      // Opcionalmente, actualiza la interfaz de usuario para reflejar la actualización exitosa
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
    }
  };

  const handleImageChange = useCallback(
    (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        getBase64(file, (imageUrl) => {
          setImagePreview(imageUrl);
          setUpdate((prevUpdate) => ({
            ...prevUpdate,
            avatar: file,
          }));
        });
      }
    },
    [setUpdate, setImagePreview]
  );

  const handleStart = (e) => {
    setMyWebSite(false);
    setStart(true);
  };

  const handleMyWebSite = (e) => {
    setStart(false);
    setMyWebSite(true);
  };

  const handleCancel = (e) => {
    setImagePreview(null);
    setUpdate({
      ...update,
      avatar: null,
    });
  };

  const UploadButton = styled(Box)(({ theme }) => ({
    marginTop: -40,
    marginLeft: 50,
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.palette.background.paper,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary[400]
        : alpha(theme.palette.background.paper, 0.9),
  }));

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    console.log(isMenuVisible);
  };

  return (
    <>
      <Layout className="container-hostess">
        <FooterMobile />

        <div
          className={`container-sider  ${
            isMenuVisible ? "vertical-menu" : "visible"
          }`}
        >
          <button className="toggle-menu-btn" onClick={toggleMenu}>
            {isMenuVisible ? (
              <i class="ri-arrow-right-double-line"></i>
            ) : (
              <i class="ri-arrow-left-double-line"></i>
            )}
          </button>
          <Sider
            /*      trigger={null}
           collapsible
           collapsed={collapsed} */
            id="menu-left"
            /*  width={360} */
          >
            <form
              className="mx-auto mt-16 max-w-xl sm:mt-20 gap-input"
              onSubmit={handleSubmit}
            >
              <div
                className={`avatar-anfitrion  ${
                  isMenuVisible ? "avatar-anfitrion-vertical" : ""
                }`}
              >
                <div>
                  <Link to="/user/show">
                    <Avatar
                      sx={{
                        background: datapersonal.avatar
                          ? `url(${imagePreview || datapersonal.avatar})`
                          : datapersonal.backgroundColor,
                        backgroundSize: "cover",
                      }}
                      className="avatar-anfitrion-perfil"
                    >
                      {datapersonal.avatar ? (
                        <span></span>
                      ) : (
                        <div>
                          {datapersonal.name &&
                            datapersonal.name[0].toUpperCase()}
                        </div>
                      )}
                    </Avatar>
                  </Link>

                  <UploadButton className="avatar-anfitrion-camara">
                    {/* <label htmlFor="upload-btn">
                      <input
                        accept="image/*"
                        id="upload-btn"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      /> */}
                    <IconButton component="span">
                      <Link to="/user/show">
                        <PhotoCamera className="photo-camera" />
                      </Link>
                    </IconButton>
                    {/* </label> */}
                  </UploadButton>
                  {/* Conditionally render Save and Cancel Buttons */}
                  {imagePreview && (
                    <div>
                      <ButtonMaterial
                        variant="contained"
                        color="secondary"
                        type="submit"
                        sx={{ width: 70 }}
                      >
                        Guardar
                      </ButtonMaterial>
                      <ButtonMaterial
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                        sx={{ width: 70 }}
                      >
                        Cancelar
                      </ButtonMaterial>
                    </div>
                  )}
                </div>
                <div className="avatar-anfitrion-perfil-option">
                  <p>
                    {datapersonal.name} {datapersonal.lastName}
                  </p>
                  <p>{datapersonal.email}</p>
                  <Button id="close-sesion">Cerrar sesión</Button>
                </div>
              </div>
            </form>

            <ul className="menu-anfitrion">
              <Link
                to="/admin/inicio"
                className={activeLink === "/anfitrion" ? "active-link" : ""}
                onClick={() => setActiveLink("/admin/inicio")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i className="ri-home-2-line"  id="icon-item-hover"></i>
                  ) : (
                    "Inicio"
                  )}
                </li>
              </Link>
              <Link
                to="/admin/publicar país"
                className={
                  activeLink === "/admin/publicar país" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/publicar país")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? <i class="ri-profile-line"  id="icon-item-hover"></i> : "Publicar país"}
                </li>
              </Link>
              <Link
                to="/admin/registros"
                className={
                  activeLink === "/admin/registros" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/registros")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-calendar-2-line"  id="icon-item-hover"></i>
                  ) : (
                    "Registros"
                  )}
                </li>
              </Link>

              <Link
                to="/admin/sitios"
                className={
                  activeLink === "/admin/sitios"
                    ? "active-link"
                    : ""
                }
                onClick={() =>
                  setActiveLink("/admin/sitios")
                }
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-file-list-3-line"  id="icon-item-hover"></i>
                  ) : (
                    "Sitios"
                  )}
                </li>
              </Link>
              <Link
                to="/admin/información de anfitrión"
                className={
                  activeLink === "/admin/información de anfitrión" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/información de anfitrión")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-file-warning-line"  id="icon-item-hover" ></i>
                  ) : (
                    "Información de anfitrión"
                  )}
                </li>
              </Link>

              <Link
                to="/admin/reservaciones"
                className={
                  activeLink === "/admin/reservaciones" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/reservaciones")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-message-2-line" id="icon-item-hover"></i>
                  ) : (
                    "Reservaciones"
                  )}
                </li>
              </Link>

              <Link
                to="/admin/historial de reservas"
                className={
                  activeLink === "/admin/historial de reservas" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/historial de reservas")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-message-2-line" id="icon-item-hover"></i>
                  ) : (
                    "Historial de reservas"
                  )}
                </li>
              </Link>

              <Link
                to="/admin/reclamos"
                className={
                  activeLink === "/admin/reclamos" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/reclamos")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-message-2-line" id="icon-item-hover"></i>
                  ) : (
                    "Reclamos"
                  )}
                </li>
              </Link>

              <Link
                to="/admin/comentarios"
                className={
                  activeLink === "/admin/comentarios" ? "active-link" : ""
                }
                onClick={() => setActiveLink("/admin/comentarios")}
              >
                <li className="items-anfitrion">
                  {isMenuVisible ? (
                    <i class="ri-message-2-line" id="icon-item-hover"></i>
                  ) : (
                    "Comentarios"
                  )}
                </li>
              </Link>
            </ul>
          </Sider>
        </div>
        <div
          className={`container-description-menu ${
            isMenuVisible ? "container-description-menu-compled" : ""
          }`}
        >
          <Layout
            style={{
              background: "#fff",
            }}
            className="container-description-menu-2"
          >
            {/* <Header
            style={{
              padding: 0,
              background: "#fff",
            }}
          ></Header> */}
            <Content
              key="1"
              style={{
                /* padding: 24,
                minHeight: 280, */
                background: "#fff",
              }}
            >
              <Outlet />{" "}
            </Content>
          </Layout>
        </div>
      </Layout>
    </>
  );
};

export default App;
