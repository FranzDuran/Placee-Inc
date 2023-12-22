import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./Admin.css";
import Avatar from "@mui/material/Avatar";
import { Layout, Menu, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { dataPersonal } from "../../redux/action";
import {CameraOutlined } from '@ant-design/icons';
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

  return (

    <Layout    
      style={{
             marginTop: '7em',
            }}>
      <FooterMobileAdmin/>

      <Sider
   /*      trigger={null}
        collapsible
        collapsed={collapsed} */
        id="menu-left"
        width={360}
      > 

        <div className="avatar-anfitrion">
          <div>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                marginLeft: "2em",
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
            <CameraOutlined className="camera-hostess" />
          </div>
          <div>
            <p>
              {datapersonal.name} {datapersonal.lastName}
            </p>
            <p>{datapersonal.email}</p>
            <Button id="close-sesion">Cerrar sesión</Button>
          </div>
        </div>
        <div>
          <ul className="menu-anfitrion">
            <Link to="/anfitrion/inicio">
              <li className="items-anfitrion" >Inicio</li>
            </Link>
            <Link to="/anfitrion/mi sitio">
              <li className="items-anfitrion">Mi sitio</li>
            </Link>
            <Link to="/anfitrion/reservaciones">
     
            <li className="items-anfitrion">Reservaciones</li>
            </Link>
            
            <Link to="/anfitrion/historial de reservas">

            <li className="items-anfitrion">Historial de reservas</li>
            </Link>
            <Link to="/anfitrion/reclamos">

            <li className="items-anfitrion">Reclamos</li>
            </Link>

            <Link to="/anfitrion/reclamos">

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
        >

        </Header>
        <Content
            key="1"
            style={{
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
          >
          <Outlet /> {/* Agrega el componente Outlet para mostrar rutas secundarias */}
        </Content>
      </Layout>
    </Layout>

  );
};
export default Admin;
