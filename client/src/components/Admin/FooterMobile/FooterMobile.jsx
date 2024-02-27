import * as React from "react";

import "./FooterMobile.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { CameraOutlined } from "@ant-design/icons";

import { dataPersonal } from "../../../redux/action";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

export default function FooterMobile() {
  const dispatch = useDispatch();

  const datapersonal = useSelector((state) => state.datapersonal);
  const token = useSelector((state) => state.token);
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [token]);
  const list = (anchor) => (
    <div className="container-footer-mobile">
      <Button id="close-menu" onClick={toggleDrawer(anchor, false)}>
        <i class="ri-close-fill"></i>
      </Button>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className="avatar-anfitrion-mobile">
          <div className="avatar-perfil-container">
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
              className="avatar-perfil"
            >
              {datapersonal.avatar ? (
                <div></div>
              ) : (
                <div>
                  {datapersonal.name && datapersonal.name[0].toUpperCase()}
                </div>
              )}
            </Avatar>
            <Link to="/user/show">
              <CameraOutlined className="camera-hostess" />
            </Link>
          </div>
          <div className="avatar-perfil-data">
            <p>
              {datapersonal.name} {datapersonal.lastName}
            </p>
            <p>{datapersonal.email}</p>
            <Button id="close-sesion">Cerrar sesión</Button>
          </div>
        </div>

        <div className="list-item-mobile">
          <List>
            <Link to="/anfitrion/inicio">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Inicio"} className="list-item-text" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/anfitrion/mi sitio">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={"Mi sitio"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/anfitrion/reservaciones">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={"Reservaciones"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/anfitrion/historial de reservas">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={"Historial de reservas"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/anfitrion/reclamos">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={"Reclamos"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/anfitrion/comentarios">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={"Comentarios"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </div>
      </Box>
    </div>
  );
  return (
    <div className="footer-Hosstes">
      <div>
        {["bottom"].map((anchor) => (
          <React.Fragment key={anchor}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                onClick={toggleDrawer(anchor, true)}
                label="Menu"
                icon={<MenuIcon />}
              />
            </BottomNavigation>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
