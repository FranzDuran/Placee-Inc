import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";
import Avatar from "@mui/material/Avatar";
import { Layout, Menu, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { dataPersonal } from "../../redux/action";
import { CameraOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import FooterMobileAdmin from "./FooterMobileAdmin/FooterMobileAdmin";
const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const datapersonal = useSelector((state) => state.datapersonal);
  const token = useSelector((state) => state.token);
  const [start, setStart] = useState(true);
  const [myWebSite, setMyWebSite] = useState(false);
  useEffect(() => {
    dispatch(dataPersonal(token));
  }, [token]);

  const handleStart = (e) => {
    setMyWebSite(false);
    setStart(true);
  };

  const handleMyWebSite = (e) => {
    setStart(false);
    setMyWebSite(true);
  };

  //-----------------------------------
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    console.log(isMenuVisible);
  };

  return (
    <Layout
      /* style={{
        marginTop: "7em",
      }} */
      className={styles.body}
    >
      <FooterMobileAdmin />

      <div
        className={` ${styles.containerBody}  ${
          isMenuVisible ? styles.verticalMenu : styles.visible
        }`}
      >
        <Sider
          /*      trigger={null}
        collapsible
        collapsed={collapsed} */
          id="menu-left"
          width={360}
          className={styles.containerMenu}
        >
          <button className={styles["toggle-menu-btn"]} onClick={toggleMenu}>
            {isMenuVisible ? (
              <i class="ri-arrow-right-double-line"></i>
            ) : (
              <i class="ri-arrow-left-double-line"></i>
            )}
          </button>
          <div className={styles["avatar-anfitrion"]}>
            <div className={styles["perfil-content"]}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  //marginLeft: "2em",
                  background: datapersonal.avatar
                    ? `url(${datapersonal.avatar})`
                    : datapersonal.backgroundColor,

                  backgroundSize: "cover",
                }}
              >
                {datapersonal.avatar ? (
                  <div></div>
                ) : (
                  <div>
                    {datapersonal.name && datapersonal.name[0].toUpperCase()}
                  </div>
                )}
              </Avatar>
              <CameraOutlined className={styles["camera-hostess"]} />
            </div>
            <div>
              <p>
                {datapersonal.name} {datapersonal.lastName}
              </p>
              <p>{datapersonal.email}</p>
              <Button id="close-sesion">Cerrar sesión</Button>
            </div>
          </div>
          <div className={styles.menuItemContent}>
            <ul className="menu-anfitrion">
              <Link to="/admin/inicio">
                <li className="items-anfitrion">Inicio</li>
              </Link>
              <Link to="/admin/mi sitio">
                <li className="items-anfitrion">Mi sitio</li>
              </Link>
              <Link to="/admin/reservaciones">
                <li className="items-anfitrion">Reservaciones</li>
              </Link>

              <Link to="/admin/historial de reservas">
                <li className="items-anfitrion">Historial de reservas</li>
              </Link>
              <Link to="/admin/reclamos">
                <li className="items-anfitrion">Reclamos</li>
              </Link>

              <Link to="/admin/reclamos">
                <li className="items-anfitrion">Comentarios</li>
              </Link>
            </ul>
          </div>
        </Sider>
        <Layout
          style={{
            background: "#fff",
          }}
        >
          <Header
            style={{
              padding: 0,
              background: "#fff",
            }}
          ></Header>
          <Content
            key="1"
            style={{
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Outlet />{" "}
            {/* Agrega el componente Outlet para mostrar rutas secundarias */}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default Admin;
