import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../redux/action";
import "./LoginForms.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/Logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import { Button } from "react-bootstrap";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa"; // Importa los iconos de Facebook y Google
import { Modal } from "antd";
import BeatLoader from "react-loading";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import RegisterForm from "../RegisterForm/RegisterForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function LoginForms({setIsModalOpen, setIsModalOpenRegister, isModalOpenRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [open, setOpen] = React.useState(false);

  const loginError = useSelector((state) => state.loginError);
  const [fullscreen, setFullscreen] = React.useState(true);

  //const [isModalOpenRegister, setIsModalOpenRegister] = React.useState(false);

  const showModalRegister = () => {
    setIsModalOpenRegister(true);
    setIsModalOpen(false)
  };

  const handleOkRegister = () => {
    setIsModalOpenRegister(false);
  };

  const handleCancelRegister = () => {
    setIsModalOpenRegister(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      // Aquí deberías tener la lógica de autenticación, por ejemplo, una llamada a la API para verificar las credenciales

      const authenticationSuccess = await dispatch(UserLogin(email, password));

      if (authenticationSuccess) {
        navigate("/");
        // Si la autenticación es exitosa, redirige al usuario a la página de inicio
      } else {
        // Si la autenticación falla, muestra una alerta
        setOpen(true);
      }
    }
  };

  const handleFacebookLogin = () => {
    // Implementa tu lógica de inicio de sesión con Facebook aquí
    console.log("Inicio de sesión con Facebook");
  };

  const handleGoogleLogin = () => {
    // Implementa tu lógica de inicio de sesión con Google aquí
    console.log("Inicio de sesión con Google");
  };

  return (
    <>
      <div className="login-container">
        <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8 container-login">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Iniciar sesión en su cuenta
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm container-form">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Button
                  variant="primary"
                  onClick={handleFacebookLogin}
                  className="flex w-full justify-center rounded-md button-login px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <FaFacebookSquare className="mr-2" /> Iniciar sesión con
                  Facebook
                </Button>
              </div>
              <div>
                <Button
                  variant="danger"
                  onClick={handleGoogleLogin}
                  className="flex w-full justify-center rounded-md button-login px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <FaGoogle className="mr-2" /> Iniciar sesión con Google
                </Button>
              </div>
              <div className="horizontal-line-with-o">
                <div className="line"></div> {/* Línea a la izquierda */}
                <div className="letter">O</div> {/* Letra "O" en el medio */}
                <div className="line"></div> {/* Línea a la derecha */}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 input-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 text-color"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button
                  style={{ backgroundColor: "#05A1A1", borderColor: "#05A1A1" }}
                  type="submit"
                  className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  button-color-iniciar"
                >
                  Iniciar sesión
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              ¿No tiene cuenta?{" "}
              <a
                className="font-semibold leading-6 text-indigo-600 text-color"
                onClick={showModalRegister}
              >
                Registrarse
              </a>
            </p>
          </div>
        </div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              El email o contraseñas es incorrecta
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <Modal
        visible={isModalOpenRegister}
        onOk={handleOkRegister}
        onCancel={handleCancelRegister}
        footer={null} // Esto quita los botones "Ok" y "Cancel"
      >
        <RegisterForm />
      </Modal>
    </>
  );
}
