import React, { useState, useEffect } from "react";

import { Switch } from "@headlessui/react";
import "./RegisterForm.scss";
import { UserRegister } from "../../redux/action";
import { useDispatch } from "react-redux";
import { countries } from "../../assets/codeCountry/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
//import '@sweetalert2/theme-bulma/bulma.scss';
import { Modal } from "antd";
import LoginForms from "../LoginForms/LoginForms";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RegisterForm({
  setIsModalOpen,
  setIsModalOpenRegister,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApiError, contextHolderError] = message.useMessage();

  const [register, setRegister] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: " ",
  });

  //const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setIsModalOpenRegister(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Success = () => {
    messageApi.open({
      type: "success",
      content: "Registrado correctamente",
    });
  };

  const Error = () => {
    messageApiError.open({
      type: "error",
      content: "El email ya esta registrado",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoadingSuccess(true);
    setTimeout(async () => {
      try {
        const Register = await dispatch(UserRegister(register));
        if (Register) {
          Success();
        }
      } catch (error) {
        Error();
        console.log(error);
      } finally {
        setLoadingSuccess(false);
        setIsSubmitting(false);
      }
    }, 3000);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountry = (event) => {
    const { name, value } = event.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));
  };

  const handleCountryChange = (event) => {
    const selectedCountryIndex = event.target.selectedIndex;
    const selectedCountryCode = countries[selectedCountryIndex].phone;
    setSelectedCountry(selectedCountryCode);

    // You can set the phone number here if you want
    // Assuming you want to include the country code as well
    setRegister((prevRegister) => ({
      ...prevRegister,
      phone: `+${selectedCountryCode}${" "}`,
    }));
  };

  return (
    <div>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 responsive-register">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#05A1A1] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Registrarse
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <a className="text-color" onClick={showModal}>
              Inicia sesión
            </a>
            .
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-global"
                  value={register.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Apellido
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-global"
                  value={register.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Correo electronico
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-global"
                  value={register.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="password"
                  id="password"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-global"
                  value={register.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="telefono"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Teléfono
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-0  text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm input-global"
                    onChange={handleCountryChange}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.phone}>
                        {country.code} (+{country.phone})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-36 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-global"
                  value={register.phone}
                  onChange={handleCountry}
                  required
                />
              </div>
            </div>

            <Switch.Group
              as="div"
              className="flex gap-x-4 sm:col-span-2"
              style={{ marginBottom: "2em" }}
            >
              <div className="flex h-6 items-center ">
              <Switch
      checked={agreed}
      onChange={setAgreed}
      className={classNames(
        agreed ? "button-color" : "bg-gray-200",
        "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ",
        isSubmitting && "pointer-events-none" // Desactiva la interacción cuando se está procesando el registro
      )}
    >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                Aceptas nuestra{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 text-color"
                >
                  política de privacidad.
                </a>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 button-color"
              disabled={!agreed} 
          >
              {loadingSuccess ? (
                <CircularProgress
                  size={16}
                  thickness={5}
                  sx={{ color: "#fff" }}
                />
              ) : (
                "Registrarse"
              )}
            </button>
          </div>
          {contextHolder}
          {contextHolderError}
        </form>
      </div>
    </div>
  );
}
