import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { StarIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDropzone } from "react-dropzone";
import Autocomplete from "@mui/material/Autocomplete";
import { createPost } from "../../redux/action";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/Add";

import BeatLoader from "react-loading";
import MenuItem from "@mui/material/MenuItem";
import "dayjs/locale/es";
import dayjs from "dayjs";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Upload, Space, DatePicker, Select, Tag } from "antd";
import Fab from "@mui/material/Fab";
import CancelIcon from "@mui/icons-material/Cancel";
import { dataPersonal } from "../../redux/action";

const steps = ["Caracterisitcas", "Fotos", "Publicar"];
const validate = (input) => {
  let errors = {};

  if (!input.title) {
    errors.title = "el nombre es requerido";
  }

  if (!input.description) {
    errors.description = "la descripcion es requerido";
  }

  if (!input.summary) {
    errors.summary = "El resumen es requerido";
  }
  if (!input.status) {
    errors.status = "El estado es requerido";
  }
  if (input.status === "Privado") {
    if (!input.people) {
      errors.people = "La capacidad es requerida";
    }

    if (!input.continent) {
      errors.continent = "El continente es requerido";
    }
    if (!input.country) {
      errors.country = "El país es requerido";
    }
    if (!input.daysAtentions) {
      errors.daysAtentions = "Los dias de atencion al cliente es requerido";
    }
    if (!input.hoursAtetionsInitial) {
      errors.hoursAtetionsInitial =
        "El horario de inicio de atencion al cliente es requerido";
    }
    if (!input.hoursAtentionsFinally) {
      errors.hoursAtentionsFinally =
        "El horario de final de atencion al cliente es requerido";
    }
    if (!input.reservedDates) {
      errors.reservedDates =
        "Los dias no disponibles tienen que estar seleccionado";
    }

    if (!input.listDetails) {
      errors.listDetails =
        "Los dias no disponibles tienen que estar seleccionado";
    }
  }

  return errors;
};

const validateImage = (input) => {
  let errors = {};

  if (input.imageFile.length >= 4) {
    errors.imageFile = "Debes subir al menos 4 imágenes";
  }

  if (!input.imageFile) {
    errors.imageFile = "Debes subir al menos 4 imágenes";
  }

  return errors;
};

export default function FormStepper() {
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const datapersonal = useSelector((state) => state.datapersonal);
  const token = useSelector((state) => state.token);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const [show, setShow] = useState({
    title: "",
    price: "",
    people: "",
    imageFile: [],
    summary: "",
    description: "",
    status: "",
    continent: "",
    country: "",
    daysAtentions: "",
    hoursAtetionsInitial: "",
    hoursAtentionsFinally: "",
    ampmInitial: "",
    ampmFinally: "",
    reservedDates: [],
    listDetails: [],
    infoImportant: [],
  });
  const [detail, setDetail] = useState(""); // Estado para el detalle que se está escribiendo
  const [info, setInfo] = useState(""); // Estado para el detalle que se está escribiendo

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const handleAddDetail = () => {
    if (detail.trim() !== "") {
      setShow((prevState) => ({
        ...prevState,
        listDetails: [...prevState.listDetails, detail],
      }));
      setDetail(""); // Limpia el campo de entrada después de agregar
    }
  };

  const handleDeleteDetail = (index) => {
    const updatedDetails = [...show.listDetails];
    updatedDetails.splice(index, 1);
    setShow((prevState) => ({
      ...prevState,
      listDetails: updatedDetails,
    }));
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };

  const handleAddInfo = () => {
    if (info.trim() !== "") {
      setShow((prevState) => ({
        ...prevState,
        infoImportant: [...prevState.infoImportant, info],
      }));
      setInfo(""); // Limpia el campo de entrada después de agregar
    }
  };

  const handleDeleteInfo = (index) => {
    const updatedDetails = [...show.infoImportant];
    updatedDetails.splice(index, 1);
    setShow((prevState) => ({
      ...prevState,
      infoImportant: updatedDetails,
    }));
  };

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleNext = (event) => {
    const newErrors = validate(show); // Validar los campos
    console.log("New errors:", newErrors); // Agregar este log

    setErrors(newErrors);

    const form = event.currentTarget;
    console.log("Form validity:", form.checkValidity()); // Agregar este log

    if (form.checkValidity() === false || Object.keys(newErrors).length > 0) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true); // Mostrar mensajes de error en los campos requeridos
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setValidated(false); // Reiniciar la validación para el siguiente paso
    }
  };

  const handleNextImage = () => {
    const newErrors = validateImage(show); // Validar las imágenes
    console.log("New errors:", newErrors);

    if (Object.keys(newErrors).length === 0 && show.images.length >= 4) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert("Debes subir al menos 4 imágenes correctamente.");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleImage = useCallback((acceptedFiles) => {
    setShow((prevState) => ({
      ...prevState,
      images: Array.isArray(prevState.images)
        ? [...prevState.images, ...acceptedFiles]
        : acceptedFiles, // Agregamos las nuevas imágenes al array existente
    }));
  }, []);
  const onDrop = useCallback(
    (acceptedFiles) => {
      handleImage(acceptedFiles); // Llamamos a la función handleImage para manejar los archivos aceptados
    },
    [handleImage, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", show.title);
      formData.append("price", show.price);
      formData.append("people", show.people);
      formData.append("summary", show.summary);
      formData.append("description", show.description);
      formData.append("status", show.status);
      formData.append("continent", show.continent);
      formData.append("country", show.country);
      formData.append("daysAtentions", show.daysAtentions);
      formData.append("hoursAtetionsInitial", show.hoursAtetionsInitial);
      formData.append("hoursAtentionsFinally", show.hoursAtentionsFinally);
      formData.append("reservedDates", JSON.stringify(show.reservedDates));
      formData.append("listDetails", JSON.stringify(show.listDetails));
      formData.append("infoImportant", JSON.stringify(show.infoImportant));

      show.images.forEach((image, index) => {
        formData.append("imageFile", image);
      });
      setIsLoading(true);
      const createdPost = await dispatch(createPost(formData, token));
      console.log("Post creado exitosamente:", createdPost);

      const newErrors = validate(show); // Validar los campos
      setErrors(newErrors); // Actualizar los errores

      // Puedes realizar alguna navegación o mostrar un mensaje de éxito aquí
    } catch (error) {
      console.error("Error al crear el post:", error);
      // Manejo de error, muestra un mensaje de error, etc.
    }
    setTimeout(async () => {
      navigate("/");
    }, 1000);
  };

  const handleTittle = (e) => {
    e.preventDefault();
    setShow((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const handleSummary = (e) => {
    e.preventDefault();
    setShow((prevState) => ({
      ...prevState,
      summary: e.target.value,
    }));
  };
  const handleDescription = (e) => {
    e.preventDefault();
    setShow((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setShow((prevState) => ({
      ...prevState,
      price: e.target.value,
    }));
  };
  const handleContinent = (e) => {
    e.preventDefault();
    setShow((prevState) => ({
      ...prevState,
      continent: e.target.value,
    }));
  };
  const handleCountry = (e) => {
    e.preventDefault();
    setShow((prevState) => ({
      ...prevState,
      country: e.target.value,
    }));
  };
  const handlePeople = (event) => {
    const newValue = event.target.value;
    setShow((prevState) => ({
      ...prevState,
      people: newValue,
    }));
  };
  const handleStatus = (event) => {
    const newValue = event.target.value;
    setShow((prevState) => ({
      ...prevState,
      status: newValue,
    }));
  };

  const handleRemove = (index) => {
    const newFilesArray = [...show.images];
    newFilesArray.splice(index, 1);
    setShow((prevState) => ({
      ...prevState,
      images: newFilesArray,
    }));
  };
  /*   const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancelMiniImage = () => setPreviewOpen(false);
  const handlePreviewMiniImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChangeMiniImage = ({ fileList: newFileList }) =>
    setShow(newFileList); */

  const handleAttention = (event) => {
    const newValue = event.target.value;
    setShow((prevState) => ({
      ...prevState,
      daysAtentions: newValue,
    }));
  };

  const handleHoursinitial = (event) => {
    const newValue = event.target.value;
    setShow((prevState) => ({
      ...prevState,
      hoursAtetionsInitial: newValue,
    }));
  };
  const handleHoursFinally = (event) => {
    const newValue = event.target.value;
    setShow((prevState) => ({
      ...prevState,
      hoursAtentionsFinally: newValue,
    }));
  };
  const handleAMPMinitial = (event) => {
    const newValue = event.target.value;
    setShow((prevState) => ({
      ...prevState,
      ampmInitial: newValue,
    }));
  };

  dayjs.locale("es");
  const handleDateSelect = (date) => {
    const updatedSelectedDates = [...show.reservedDates];
    const dateIndex = updatedSelectedDates.findIndex((d) =>
      dayjs(d).isSame(date, "day")
    );

    if (dateIndex !== -1) {
      // Si la fecha ya está seleccionada, la deselecciona
      updatedSelectedDates.splice(dateIndex, 1);
    } else {
      // Si la fecha no está seleccionada, la agrega
      updatedSelectedDates.push(date);
    }

    setShow({
      ...show,
      reservedDates: updatedSelectedDates,
    });
  };
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen); // Invierte el estado del calendario (abrir/cerrar)
  };
  const disabledDate = (current) => {
    // Comprueba si la fecha actual está deshabilitada
    const isDisabled = show.reservedDates.some((date) =>
      dayjs(date).isSame(current, "day")
    );

    // Invierte la deshabilitación (si está deshabilitada, se habilita, y viceversa)
    return isDisabled;
  };

  const options = [
    "Sin limites",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
  ];
  const status = ["Público", "Privado"];
  const continent = ["América", "Europa", "Asia", "África", "Oceanía"];
  const daysatention = [
    "lunes a lunes",
    "lunes a martes",
    "lunes a  miercoles",
    "lunes a jueves",
    "lunes a Viernes",
    "lunes a Sabado",
    "lunes a domingo",
  ];
  const america = [
    "Canadá",
    "Estados Unidos",
    "México",
    "Belice",
    "Costa Rica",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "Nicaragua",
    "Panamá",
    "Antigua y Barbuda",
    "Bahamas",
    "Barbados",
    "Cuba",
    "Dominica",
    "Granada",
    "Haití",
    "Jamaica",
    "Puerto Rico",
    "República Dominicana",
    "San Cristóbal y Nieves",
    "Santa Lucía",
    "San Vicente y las Granadinas",
    "Trinidad y Tobago",
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Perú",
    "Surinam",
    "Uruguay",
    "Venezuela",
  ];

  const europa = [
    "Albania",
    "Alemania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaiyán",
    "Bélgica",
    "Bielorrusia",
    "Bosnia y Herzegovina",
    "Bulgaria",
    "Chipre",
    "Ciudad del Vaticano",
    "Croacia",
    "Dinamarca",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estonia",
    "Finlandia",
    "Francia",
    "Georgia",
    "Grecia",
    "Hungría",
    "Irlanda",
    "Islandia",
    "Italia",
    "Kazajistán",
    "Letonia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Malta",
    "Moldavia",
    "Mónaco",
    "Montenegro",
    "Noruega",
    "Países Bajos",
    "Polonia",
    "Portugal",
    "Reino Unido",
    "República Checa",
    "Rumania",
    "Rusia",
    "San Marino",
    "Serbia",
    "Suecia",
    "Suiza",
    "Turquía",
    "Ucrania",
  ];
  const asia = [
    "Afganistán",
    "Arabia Saudita",
    "Armenia",
    "Azerbaiyán",
    "Bangladesh",
    "Baréin",
    "Birmania (Myanmar)",
    "Brunéi",
    "Bután",
    "Camboya",
    "Catar",
    "China",
    "Chipre",
    "Corea del Norte",
    "Corea del Sur",
    "Emiratos Árabes Unidos",
    "Filipinas",
    "Georgia",
    "India",
    "Indonesia",
    "Irak",
    "Irán",
    "Israel",
    "Japón",
    "Jordania",
    "Kazajistán",
    "Kirguistán",
    "Kuwait",
    "Laos",
    "Líbano",
    "Malasia",
    "Maldivas",
    "Mongolia",
    "Nepal",
    "Omán",
    "Pakistán",
    "Palestina",
    "Qatar",
    "Rusia",
    "Singapur",
    "Siria",
    "Sri Lanka",
    "Tailandia",
    "Tayikistán",
    "Timor Oriental",
    "Turkmenistán",
    "Turquía",
    "Uzbekistán",
    "Vietnam",
    "Yemen",
  ];

  const africa = [
    "Angola",
    "Argelia",
    "Benín",
    "Botsuana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Camerún",
    "Chad",
    "Comoras",
    "Congo",
    "Costa de Marfil",
    "Egipto",
    "Eritrea",
    "Esuatini (Suazilandia)",
    "Etiopía",
    "Gabón",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Guinea Ecuatorial",
    "Kenia",
    "Lesoto",
    "Liberia",
    "Libia",
    "Madagascar",
    "Malaui",
    "Malí",
    "Marruecos",
    "Mauricio",
    "Mauritania",
    "Mozambique",
    "Namibia",
    "Níger",
    "Nigeria",
    "República Centroafricana",
    "República Democrática del Congo",
    "Ruanda",
    "Santo Tomé y Príncipe",
    "Senegal",
    "Seychelles",
    "Sierra Leona",
    "Somalia",
    "Sudáfrica",
    "Sudán",
    "Sudán del Sur",
    "Tanzania",
    "Togo",
    "Túnez",
    "Uganda",
    "Yibuti",
    "Zambia",
    "Zimbabue",
  ];
  const oceania = [
    "Australia",
    "Fiyi",
    "Islas Marshall",
    "Islas Salomón",
    "Kiribati",
    "Micronesia",
    "Nauru",
    "Nueva Zelanda",
    "Palaos",
    "Papúa Nueva Guinea",
    "Samoa",
    "Tonga",
    "Tuvalu",
    "Vanuatu",
  ];

  const tipos = [ "bosques", "playas", "montañas"];
  //retocar
  const [size, setSize] = useState("middle");

  const [infoImportant, setInfoImportant] = useState([]);
  const [word, setWord] = useState("");
  const defaultWords = ["cocina", "baño", "patio", "terraza"];
  const [words, setWords] = useState([...defaultWords]);
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);

  React.useEffect(() => {
    setWords([...defaultWords]);
  }, []);

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleAddWord = () => {
    if (word.trim() !== "") {
      setWords([...words, word]);
      setWord("");
      setInputVisible(false); // Oculta el campo de entrada después de agregar
    }
  };

  const handleDeleteWord = (index) => {
    const updatedWords = [...words];
    updatedWords.splice(index, 1);
    setWords(updatedWords);
  };

  const toggleInput = () => {
    setInputVisible(!inputVisible);
    setWord(""); // Limpia el campo de entrada cuando se oculta
  };

  const handleCheckboxChange = (index) => {
    const updatedSelectedWords = [...show.listDetails];
    if (updatedSelectedWords.includes(index)) {
      updatedSelectedWords.splice(updatedSelectedWords.indexOf(index), 1);
    } else {
      updatedSelectedWords.push(index);
    }
    setSelectedWords(updatedSelectedWords);
  };

  const renderForm = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="post-container">
            <div className="box-container">
              <div className="start-input">
                <Form
                  noValidate
                  validated={validated}
                  className="select-form-container"
                >
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="validationCustomStatus"
                    >
                      <Form.Label className="label-status">Estado</Form.Label>
                      <Form.Select
                        defaultValue={show.status}
                        onChange={handleStatus}
                        aria-label="Estado"
                        required
                        className="select-estado"
                      >
                        <option value="">Seleccione una opción</option>
                        {status.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione una opción.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="validationCustomStatus"
                    >
                      <Form.Label className="label-title">Titulo</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Titulo"
                        defaultValue={show.title}
                        onChange={handleTittle}
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor se requiere un titulo.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="validationCustomStatus"
                    >
                      <Form.Label className="label-status">Tipo de:</Form.Label>
                      <Form.Select
                        defaultValue={show.status}
                        onChange={handleStatus}
                        aria-label="Estado"
                        required
                        className="select-estado"
                      >
                        <option value="">Seleccione una opción</option>
                        {tipos.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione una opción.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    {show.status === "Privado" || show.status === "Público" ? (
                      <Form.Group as={Col}>
                        <Form.Label className="label-title">Precio</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            aria-label="Amount (to the nearest dollar)"
                            type="number"
                            defaultValue={show.price}
                            onChange={handlePrice}
                            required={show.status === "Privado"}
                          />
                          <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    ) : (
                      <div></div>
                    )}
                  </Row>

                  <Row className="mb-3">
                    <Form.Group
                      className="mb-3"
                      controlId="validationCustomSummary"
                    >
                      <Form.Label className="label-title">
                        Resumen del lugar
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        defaultValue={show.summary}
                        onChange={handleSummary}
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor se requiere resumen.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="validationCustomDescription"
                      required
                    >
                      <Form.Label className="label-title">
                        Descripción
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        defaultValue={show.description}
                        onChange={handleDescription}
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor se requiere descripción.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Form>
              </div>

              <div className="action-private">
                <div
                  className={
                    show.status === "Privado" || show.status === "Público"
                      ? "action-box"
                      : ""
                  }
                >
                  <Form.Group
                    as={Col}
                    className="mb-3 select-form-container2"
                    controlId="validationCustomContinent"
                  >
                    {show.status === "Privado" && (
                      <Row className="mb-3">
                        <Form.Label className="label-continent">
                          Continente
                        </Form.Label>
                        <Form.Select
                          defaultValue={show.continent}
                          onChange={handleContinent}
                          aria-label="Continente"
                          className="mb-3"
                          required
                          isInvalid={!show.continent && validated}
                        >
                          <option value="">Seleccione una opción</option>
                          {continent.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Por favor seleccione un continente.
                        </Form.Control.Feedback>
                      </Row>
                    )}
                    {show.status === "Privado" && (
                      <div>
                        {show.continent === "América" ? (
                          <div>
                            <Row className="mb-3">
                              <Form.Label className="label-title">
                                País
                              </Form.Label>
                              <Form.Select
                                defaultValue={show.country}
                                onChange={handleCountry}
                                aria-label="Pais"
                                required
                                isInvalid={!show.country && validated}
                                className="mb-3"
                              >
                                <option value="">Seleccione una opción</option>
                                {america.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                Por favor seleccione un país.
                              </Form.Control.Feedback>
                            </Row>
                          </div>
                        ) : (
                          <div>
                            {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                          </div>
                        )}

                        {show.continent === "Europa" ? (
                          <div>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="validationCustomContinent"
                              >
                                <Form.Label className="label-title">
                                  País
                                </Form.Label>
                                <Form.Select
                                  defaultValue={show.country}
                                  onChange={handleCountry}
                                  aria-label="Pais"
                                  required
                                  isInvalid={!show.country && validated}
                                  className="mb-3"
                                >
                                  <option value="">
                                    Seleccione una opción
                                  </option>
                                  {europa.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  Por favor seleccione un país.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                          </div>
                        ) : (
                          <div>
                            {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                          </div>
                        )}
                        {show.continent === "Asia" ? (
                          <div>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="validationCustomContinent"
                              >
                                <Form.Label className="label-title">
                                  País
                                </Form.Label>
                                <Form.Select
                                  defaultValue={show.country}
                                  onChange={handleCountry}
                                  aria-label="Pais"
                                  required
                                  isInvalid={!show.country && validated}
                                  className="mb-3"
                                >
                                  <option value="">
                                    Seleccione una opción
                                  </option>
                                  {asia.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  Por favor seleccione un país.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                          </div>
                        ) : (
                          <div>
                            {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                          </div>
                        )}

                        {show.continent === "África" ? (
                          <Row className="mb-3">
                            <div>
                              <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="validationCustomContinent"
                              >
                                <Form.Label className="label-title">
                                  País
                                </Form.Label>
                                <Form.Select
                                  defaultValue={show.country}
                                  onChange={handleCountry}
                                  aria-label="Pais"
                                  required
                                  isInvalid={!show.country && validated}
                                  className="mb-3"
                                >
                                  <option value="">
                                    Seleccione una opción
                                  </option>
                                  {africa.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  Por favor seleccione un país.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                          </Row>
                        ) : (
                          <div>
                            {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                          </div>
                        )}

                        {show.continent === "Oceanía" ? (
                          <div>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="validationCustomContinent"
                              >
                                <Form.Label className="label-title">
                                  País
                                </Form.Label>
                                <Form.Select
                                  defaultValue={show.country}
                                  onChange={handleCountry}
                                  aria-label="Pais"
                                  required
                                  isInvalid={!show.country && validated}
                                  className="mb-3"
                                >
                                  <option value="">
                                    Seleccione una opción
                                  </option>
                                  {oceania.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  Por favor seleccione un país.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                          </div>
                        ) : (
                          <div>
                            {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                          </div>
                        )}
                      </div>
                    )}

                    {show.status === "Privado" && (
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="validationCustomContinent"
                        >
                          <Form.Label className="label-title">
                            Dias y horarios de atención
                          </Form.Label>
                          <Form.Select
                            defaultValue={show.daysAtentions}
                            onChange={handleAttention}
                            aria-label="daysAtentions"
                            required
                            isInvalid={!show.daysAtentions && validated}
                            className="mb-3 form-control"
                          >
                            <option value="">Seleccione una opción</option>
                            {daysatention.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Por favor seleccione el horario de atencion al
                            cliente.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                    )}

                    {show.daysAtentions ? (
                      <Row className="mb-3">
                        <div className="hours-container">
                          <TextField
                            id="hours"
                            label="Abre"
                            type="time"
                            className="mb-3"
                            value={show.hoursAtetionsInitial}
                            onChange={handleHoursinitial}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // paso en segundos (5 minutos)
                            }}
                            required
                            isInvalid={!show.hoursAtetionsInitial && validated}
                          />

                          <h5 className="label-title">Hasta</h5>
                          <TextField
                            id="hours"
                            label="Cierre"
                            type="time"
                            value={show.hoursAtentionsFinally}
                            onChange={handleHoursFinally}
                            className="mb-3"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // paso en segundos (5 minutos)
                            }}
                            required
                            isInvalid={!show.hoursAtentionsFinally && validated}
                          />
                        </div>
                      </Row>
                    ) : (
                      <div></div>
                    )}

                    {show.status === "Público" && (
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3 bottom-people"
                          controlId="validationCustomCapacidad"
                        >
                          <Form.Label className="label-continent">
                            Continente
                          </Form.Label>
                          <Form.Select
                            defaultValue={show.continent}
                            onChange={handleContinent}
                            aria-label="Continente"
                            className="mb-3"
                            required
                            isInvalid={!show.continent && validated}
                          >
                            <option value="">Seleccione una opción</option>
                            {continent.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Por favor seleccione un continente.
                          </Form.Control.Feedback>
                          {show.status === "Público" && (
                            <div>
                              {show.continent === "América" ? (
                                <div>
                                  <Row className="mb-3">
                                    <Form.Label className="label-title">
                                      País
                                    </Form.Label>
                                    <Form.Select
                                      defaultValue={show.country}
                                      onChange={handleCountry}
                                      aria-label="Pais"
                                      required
                                      isInvalid={!show.country && validated}
                                      className="mb-3"
                                    >
                                      <option value="">
                                        Seleccione una opción
                                      </option>
                                      {america.map((option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                      Por favor seleccione un país.
                                    </Form.Control.Feedback>
                                  </Row>
                                </div>
                              ) : (
                                <div>
                                  {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                                </div>
                              )}

                              {show.continent === "Europa" ? (
                                <div>
                                  <Row className="mb-3">
                                    <Form.Group
                                      as={Col}
                                      className="mb-3"
                                      controlId="validationCustomContinent"
                                    >
                                      <Form.Label className="label-title">
                                        País
                                      </Form.Label>
                                      <Form.Select
                                        defaultValue={show.country}
                                        onChange={handleCountry}
                                        aria-label="Pais"
                                        required
                                        isInvalid={!show.country && validated}
                                        className="mb-3"
                                      >
                                        <option value="">
                                          Seleccione una opción
                                        </option>
                                        {europa.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un país.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                </div>
                              ) : (
                                <div>
                                  {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                                </div>
                              )}
                              {show.continent === "Asia" ? (
                                <div>
                                  <Row className="mb-3">
                                    <Form.Group
                                      as={Col}
                                      className="mb-3"
                                      controlId="validationCustomContinent"
                                    >
                                      <Form.Label className="label-title">
                                        País
                                      </Form.Label>
                                      <Form.Select
                                        defaultValue={show.country}
                                        onChange={handleCountry}
                                        aria-label="Pais"
                                        required
                                        isInvalid={!show.country && validated}
                                        className="mb-3"
                                      >
                                        <option value="">
                                          Seleccione una opción
                                        </option>
                                        {asia.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un país.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                </div>
                              ) : (
                                <div>
                                  {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                                </div>
                              )}

                              {show.continent === "África" ? (
                                <Row className="mb-3">
                                  <div>
                                    <Form.Group
                                      as={Col}
                                      className="mb-3"
                                      controlId="validationCustomContinent"
                                    >
                                      <Form.Label className="label-title">
                                        País
                                      </Form.Label>
                                      <Form.Select
                                        defaultValue={show.country}
                                        onChange={handleCountry}
                                        aria-label="Pais"
                                        required
                                        isInvalid={!show.country && validated}
                                        className="mb-3"
                                      >
                                        <option value="">
                                          Seleccione una opción
                                        </option>
                                        {africa.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un país.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </div>
                                </Row>
                              ) : (
                                <div>
                                  {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                                </div>
                              )}

                              {show.continent === "Oceanía" ? (
                                <div>
                                  <Row className="mb-3">
                                    <Form.Group
                                      as={Col}
                                      className="mb-3"
                                      controlId="validationCustomContinent"
                                    >
                                      <Form.Label className="label-title">
                                        País
                                      </Form.Label>
                                      <Form.Select
                                        defaultValue={show.country}
                                        onChange={handleCountry}
                                        aria-label="Pais"
                                        required
                                        isInvalid={!show.country && validated}
                                        className="mb-3"
                                      >
                                        <option value="">
                                          Seleccione una opción
                                        </option>
                                        {oceania.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un país.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                </div>
                              ) : (
                                <div>
                                  {/* Aquí puedes agregar contenido adicional que se mostrará cuando no se seleccione "América" */}
                                </div>
                              )}
                            </div>
                          )}
                          <Form.Label className="label-title">
                            Capacidad de persona
                          </Form.Label>
                          <Form.Select
                            defaultValue={show.people}
                            onChange={handlePeople}
                            aria-label="Capacidad de persona"
                            required
                            isInvalid={!show.people && validated}
                            className="mb-3"
                          >
                            <option value="">Seleccione una opción</option>
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Por favor seleccione una opción de capacidad de
                            personas.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div>
                          <span
                            className={
                              show.status === "Público" ? "label-status" : ""
                            }
                          >
                            El lugas cuenta con:
                          </span>
                          <Card>
                            <Card.Body>
                              {show.listDetails.map((details, index) => (
                                <span
                                  key={index}
                                  className="mr-2"
                                  style={{
                                    fontSize: "14px",
                                    maxHeight: "80px",
                                    background: "#DFDFDF",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    lineHeight: "30pt",
                                  }}
                                >
                                  {details}
                                  <button
                                    onClick={() => handleDeleteDetail(index)}
                                    size="sm"
                                    className="ml-2"
                                  >
                                    X
                                  </button>
                                </span>
                              ))}
                            </Card.Body>
                          </Card>
                          <Form.Group className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Nuevo detalle"
                              value={detail}
                              onChange={handleDetailChange}
                              className="flex-grow-1 mr-2"
                              isInvalid={!show.listDetails && validated}
                            />
                            <Button variant="primary" onClick={handleAddDetail}>
                              Agregar
                            </Button>
                            <Form.Control.Feedback type="invalid">
                              Por favor seleccione una opción de capacidad de
                              personas.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div>
                          <Form.Label
                            className={
                              show.status === "Público" ? "label-status" : ""
                            }
                          >
                            Informacion importante:
                          </Form.Label>
                          <Card>
                            <Card.Body>
                              {show.infoImportant.map((important, index) => (
                                <span
                                  key={index}
                                  className="mr-2"
                                  style={{
                                    fontSize: "14px",
                                    maxHeight: "80px",
                                    background: "#DFDFDF",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    lineHeight: "30pt",
                                  }}
                                >
                                  {important}
                                  <button
                                    variant="danger"
                                    onClick={() => handleDeleteInfo(index)}
                                    size="sm"
                                    className="ml-2"
                                  >
                                    X
                                  </button>
                                </span>
                              ))}
                            </Card.Body>
                          </Card>
                          <Form.Group className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Nuevo detalle"
                              value={info}
                              onChange={handleInfoChange}
                              required
                              isInvalid={!show.infoImportant && validated}
                            />
                            <Button variant="primary" onClick={handleAddInfo}>
                              Agregar
                            </Button>
                          </Form.Group>
                        </div>
                      </Row>
                    )}

                    <Row className="mb-3">
                      {show.status === "Privado" ? (
                        <div>
                          <span className="label-title">
                            El lugas cuenta con:
                          </span>
                          <Card>
                            <Card.Body>
                              {show.listDetails.map((details, index) => (
                                <span
                                  key={index}
                                  className="mr-2"
                                  style={{
                                    fontSize: "14px",
                                    maxHeight: "80px",
                                    background: "#DFDFDF",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    lineHeight: "30pt",
                                  }}
                                >
                                  {details}
                                  <button
                                    onClick={() => handleDeleteDetail(index)}
                                    size="sm"
                                    className="ml-2"
                                  >
                                    X
                                  </button>
                                </span>
                              ))}
                            </Card.Body>
                          </Card>
                          <Form.Group className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Nuevo detalle"
                              value={detail}
                              onChange={handleDetailChange}
                              className="flex-grow-1 mr-2"
                              isInvalid={!show.listDetails && validated}
                            />
                            <Button variant="primary" onClick={handleAddDetail}>
                              Agregar
                            </Button>
                            <Form.Control.Feedback type="invalid">
                              Por favor seleccione una opción de capacidad de
                              personas.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            className="mb-3 bottom-people"
                            controlId="validationCustomCapacidad"
                          >
                            <Form.Label
                              className={
                                show.status === "Privado" ? "label-status" : ""
                              }
                            >
                              Capacidad de persona
                            </Form.Label>
                            <Form.Select
                              defaultValue={show.people}
                              onChange={handlePeople}
                              aria-label="Capacidad de persona"
                              required
                              isInvalid={!show.people && validated}
                              className="mb-3"
                            >
                              <option value="">Seleccione una opción</option>
                              {options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Por favor seleccione una opción de capacidad de
                              personas.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Row>
                  </Form.Group>
                </div>
                <div className={show.status === "Privado" ? "rest-info" : ""}>
                  <Row className="mb-3 select-form-container">
                    {show.status === "Privado" ? (
                      <Space
                        className="label-calendar"
                        direction="vertical"
                        size={12}
                      >
                        <Button
                          onClick={toggleCalendar}
                          className="label-title"
                        >
                          <span className="btn-calendario">
                            {calendarOpen
                              ? "Cerrar Calendario"
                              : "Abrir Calendario"}
                          </span>
                        </Button>

                        <DatePicker
                          open={calendarOpen}
                          onOpenChange={() => setCalendarOpen(true)}
                          onChange={handleDateSelect}
                          disabledDate={disabledDate}
                          showToday={false}
                        />
                      </Space>
                    ) : null}
                  </Row>

                  <Row className="mb-3">
                    {show.status === "Privado" ? (
                      <div>
                        <span className="label-title">
                          Informacion importante:
                        </span>
                        <Card>
                          <Card.Body>
                            {show.infoImportant.map((important, index) => (
                              <span
                                key={index}
                                className="mr-2"
                                style={{
                                  fontSize: "14px",
                                  maxHeight: "80px",
                                  background: "#DFDFDF",
                                  padding: "5px",
                                  borderRadius: "5px",
                                  lineHeight: "30pt",
                                }}
                              >
                                {important}
                                <button
                                  variant="danger"
                                  onClick={() => handleDeleteInfo(index)}
                                  size="sm"
                                  className="ml-2"
                                >
                                  X
                                </button>
                              </span>
                            ))}
                          </Card.Body>
                        </Card>
                        <Form.Group className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Nuevo detalle"
                            value={info}
                            onChange={handleInfoChange}
                            required
                            isInvalid={!show.infoImportant && validated}
                          />
                          <Button variant="primary" onClick={handleAddInfo}>
                            Agregar
                          </Button>
                        </Form.Group>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Row>
                </div>
              </div>
            </div>
            <div className="back-next">
              <div className="back-next-footer">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "center",
                    gap: "60px",
                    marginBottom: "60px",
                  }}
                >
                  <Button
                    color="primary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    regresar
                  </Button>
                  <Box />

                  <Button
                    onClick={handleNext}
                    sx={{
                      backgroundColor: "#8B008B",
                      color: "white",
                      ":hover": { backgroundColor: "#8B008B", color: "white" },
                    }}
                    type="button"
                  >
                    Siguiente
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <>
            <div>
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #ddd",
                  borderRadius: "4px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: isDragActive ? "#f8f8f8" : "white",
                }}
              >
                <input {...getInputProps()} required />
                {isDragActive ? (
                  <p>Suelta las imágenes aquí...</p>
                ) : (
                  <div>
                    <p>
                      Arrastra y suelta las imágenes aquí o haz clic para
                      seleccionar.
                    </p>
                    <span>Puedes subir hasta 100 imágenes.</span>
                  </div>
                )}
              </div>
              {errors.imageFile && (
                <div>
                  <p>{errors.imageFile}</p>
                </div>
              )}

              <div>
                {show.images &&
                  show.images.map((photo) => <img src={photo} alt="" />)}
                <div className="prev-mini">
                  {show.images &&
                    show.images.map((file, index) => (
                      <div key={index}>
                        <div className="btn-x">
                          <button
                            type="button"
                            onClick={() => handleRemove(index)}
                          >
                            <strong>X</strong>
                          </button>
                        </div>
                        {file && (
                          <Upload listType="picture-card" disabled>
                            <img
                              alt={`Preview ${index}`}
                              src={URL.createObjectURL(file)}
                              accept=".jpg, .jpeg, .png"
                            />
                          </Upload>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="back-next">
              <div className="back-next-footer">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "center",
                    gap: "60px",
                  }}
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    regresar
                  </Button>
                  <Box />

                  <Button
                    onClick={handleNextImage}
                    sx={{
                      backgroundColor: "#8B008B",
                      color: "white",
                      ":hover": { backgroundColor: "#8B008B", color: "white" },
                    }}
                    type="button"
                  >
                    Siguiente
                  </Button>
                </Box>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="responsive-phone-tablet">
            {isLoading ? (
              <div className="loading-overlay">
                <div>
                  <BeatLoader color="#8B008B" size="80" />
                  <h2>Publicando </h2>
                </div>
              </div>
            ) : (
              <div className="bg-white">
                <div className="pt-6">
                  {/* Image gallery */}
                  {isLoading ? (
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <Skeleton variant="rectangular" id="skeleton1" />
                      </div>
                      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg ">
                          <Skeleton variant="rectangular" id="skeleton2" />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                          <Skeleton variant="rectangular" id="skeleton2" />
                        </div>
                      </div>

                      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <Skeleton variant="rectangular" id="skeleton1" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="me-2 mb-2 ">
                        <div className="title-continent">
                          <h1>{show.title}</h1>
                          {/*    <h1 className="title">Lagos</h1> */}
                        </div>

                        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 fixed-image img-contains">
                          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block ">
                            <img
                              src={URL.createObjectURL(show.images[0])}
                              alt="Not found"
                              className="h-full w-full object-cover object-center hover-image-left"
                            />
                          </div>

                          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                              <img
                                src={URL.createObjectURL(show.images[1])}
                                alt="Not found"
                                className="h-full w-full object-cover object-center hover-image-center"
                              />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg ">
                              <img
                                src={URL.createObjectURL(show.images[2])}
                                alt="Not found"
                                className="h-full w-full object-cover object-center hover-image-center"
                              />
                            </div>
                          </div>
                          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg ">
                            <img
                              src={URL.createObjectURL(show.images[3])}
                              alt="Not found"
                              className="h-full w-full object-cover object-center hover-image-left"
                            />

                            <div>
                              <Fab
                                size="small"
                                id="icons-details"
                                aria-label="add"
                              >
                                <AddIcon />
                                {show.imageFile.length}
                              </Fab>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product info */}
                  <div className=" mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 text-info-normal">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                      <div className="card-text">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex-name">
                          Anfitrión: {datapersonal.name && datapersonal.name}
                          <div className="avatar-container">
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                backgroundColor:
                                  datapersonal.backgroundColor &&
                                  datapersonal.backgroundColor,
                              }}
                            >
                              {datapersonal.name &&
                                datapersonal.name[0].toUpperCase()}
                            </Avatar>
                          </div>
                        </h1>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                          Lugar para visitar.
                        </h1>

                        <div className="continent-country">
                          {show.continent}, {show.country}
                        </div>
                      </div>

                      <div className="horizontal-line-with-o">
                        <div className="line"></div>{" "}
                        {/* Línea a la izquierda */}
                      </div>
                    </div>

                    {/* Options */}

                    <div
                      className={
                        show.status === "Privado" ? "card-reserve" : ""
                      }
                    >
                      {show.status === "Privado" && (
                        <div className="absolute top-0 right-0 p-2">
                          <div
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#000",
                            }}
                          >
                            x
                          </div>
                        </div>
                      )}
                      <div className="mt-4 lg:row-span-3 lg:mt-0 ">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">
                          {show.price ? <span>${show.price}</span> : null}
                          <div>
                            <div className="space-y-6">
                              <h3 className="text-base text-gray-900">
                                {show.people ? (
                                  <div>
                                    <Diversity3RoundedIcon />
                                    {show.people} personas
                                  </div>
                                ) : null}
                              </h3>
                            </div>
                            {show.status === "Privado" ? (
                              <div>
                                <Space direction="vertical" size={12}>
                                  <RangePicker
                                    defaultValue={[
                                      dayjs("2015/01/01", dateFormat),
                                      dayjs("2015/01/01", dateFormat),
                                    ]}
                                    format={dateFormat}
                                  />
                                </Space>
                              </div>
                            ) : null}
                          </div>
                        </p>

                        <form className="mt-10">
                          <button
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 btn-reserve"
                          >
                            Reservar
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                      {/* Description and details */}

                      <div className="space-y-1 card-text">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                          Breve resumen del lugar
                        </h1>
                        <p className="text-base text-gray-900">
                          {show.summary}
                        </p>
                      </div>
                      {show.status === "Privado" ? (
                        <div>
                          <div className="horizontal-line-with-o">
                            <div className="line"></div>{" "}
                            {/* Línea a la izquierda */}
                          </div>

                          <div className="mt-10 card-text-list">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                              Dias de atención al cliente de{" "}
                              {show.daysAtentions}.
                            </h1>

                            <p className="text-sm text-gray-600">
                              de {show.hoursAtetionsInitial}am a{" "}
                              {show.hoursAtentionsFinally}pm
                            </p>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-10">
                        <div>
                          <div className="horizontal-line-with-o">
                            <div className="line"></div>{" "}
                            {/* Línea a la izquierda */}
                          </div>
                          <div className="card-text-list">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                              El lugar cuenta con:
                            </h1>

                            <ul
                              role="list"
                              className="list-disc space-y-2 pl-4 text-sm"
                            >
                              {show.listDetails &&
                                show.listDetails.map((list) => (
                                  <li className="text-gray-400">
                                    <span className="text-gray-600">
                                      {list}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-10">
                          {show.status === "Privado" ? (
                            <div>
                              <div className="horizontal-line-with-o">
                                <div className="line"></div>{" "}
                                {/* Línea a la izquierda */}
                              </div>
                              <div className="card-text-list">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                  información importante
                                </h1>

                                <p className="text-sm text-gray-600">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-2 pl-4 text-sm"
                                  >
                                    {show.infoImportant &&
                                      show.infoImportant.map((list) => (
                                        <li className="text-gray-400">
                                          <span className="text-gray-600">
                                            {list}
                                          </span>
                                        </li>
                                      ))}
                                  </ul>
                                </p>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="horizontal-line-with-o">
                          <div className="line"></div>{" "}
                          {/* Línea a la izquierda */}
                        </div>
                        <div className="mt-10 card-text">
                          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Historia
                          </h1>

                          <p className="text-sm text-gray-600 ">
                            {show.description}
                          </p>
                          <div className="back-next">
                            <div className="back-next-footer">
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  pt: 2,
                                  justifyContent: "center",
                                  gap: "60px",
                                  marginBottom: "60px",
                                }}
                              >
                                <Button
                                  color="inherit"
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  sx={{ mr: 1 }}
                                >
                                  regresar
                                </Button>
                                <Box />
                                <Button
                                  sx={{
                                    backgroundColor: "#8B008B",
                                    color: "white",
                                    ":hover": {
                                      backgroundColor: "#8B008B",
                                      color: "white",
                                    },
                                  }}
                                  type="submit"
                                >
                                  Publicar
                                </Button>
                              </Box>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <Box>
      <div className="exit-public">
        <Link to="/">
          <Button>
            <CancelIcon id="exit-icon-public" />
          </Button>
        </Link>
      </div>
      <div className="public-cancel">
        <Link to="/">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8B008B",
              color: "white",
              ":hover": { backgroundColor: "#8B008B", color: "white" },
            }}
          >
            Cancelar
          </Button>
        </Link>
      </div>
      <Stepper activeStep={activeStep} className="box-all-public">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography sx={{ mt: 5 }}>
        <form action="" method="post" onSubmit={handleSubmit}>
          {renderForm(activeStep)}
        </form>
      </Typography>
    </Box>
  );
}
