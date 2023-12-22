import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./AccountSettings.scss";
import { Link } from "react-router-dom";
import { FaRegAddressCard } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal } from "../../redux/action";

export default function BasicCard() {
  const dispatch = useDispatch();
  const datapersonal = useSelector((state) => state.datapersonal);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(dataPersonal(token));
  }, [token]);

  
  return (
    <div>
      <div className="text-account">
        <h1>Cuenta</h1>
        <div className="sub-text">
          <p>{datapersonal.name} </p>,<span>{datapersonal.email}</span>-
          <a href="/user/show">ir al perfil</a>
        </div>
      </div>
      <div className="card-container">
        <Link to="/account-settings/personal-info">
          <Card sx={{ minWidth: 275, height: 200 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <FaRegAddressCard className="icons" />
              </Typography>
              <Typography variant="h5" component="div">
                Informacion personal
              </Typography>
              <Typography
                sx={{ mb: 1.5, width: "300px", marginTop: "10px" }}
                color="text.secondary"
              >
                Proporcioná tus datos personales e indicanos cómo podemos
                ponernos en contacto con vos.
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Link to="/account-settings/login-and-security">
          <Card sx={{ minWidth: 275, height: 200 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <MdSecurity className="icons" />
              </Typography>
              <Typography variant="h5" component="div">
                Inicio de sesión y seguridad
              </Typography>
              <Typography
                sx={{ mb: 1.5, width: "300px", marginTop: "10px" }}
                color="text.secondary"
              >
                Actualizá tu contraseña y protegé tu cuenta
              </Typography>
            </CardContent>
          </Card>
        </Link>

        <Link to="/account-settings/payment-methods">
          <Card sx={{ minWidth: 275, height: 200 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <MdOutlinePayments className="icons" />
              </Typography>
              <Typography variant="h5" component="div">
                Pagos y cobros
              </Typography>
              <Typography
                sx={{ mb: 1.5, width: "300px", marginTop: "10px" }}
                color="text.secondary"
              >
                Revisá pagos y cobros
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
