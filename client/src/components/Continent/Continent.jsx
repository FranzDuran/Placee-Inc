import "./Continent.scss";
import Button from "@mui/material/Button";
import america from "../../assets/icons/icons-america.png";
import europa from "../../assets/icons/icons-europa.png";
import asia from "../../assets/icons/icons-asia.png";
import africa from "../../assets/icons/icons-africa.png";
import oceania from "../../assets/icons/OCEANIA.png";

import { useState, useEffect, useRef } from "react";
import CountryAmerica from "../Country/CountryAmerica";
import CountryEuropa from "../Country/CountryEuropa";
import CountryAsia from "../Country/CountryAsia";
import CountryAfrica from "../Country/CountryAfrica";
import CountryOceania from "../Country/CountryOceania";
import Fade from "@mui/material/Fade";

function Continent() {
  const [showAmerica, setShowAmerica] = useState(false);
  const [showEurope, setShowEurope] = useState(false);
  const [showAsia, setShowAsia] = useState(false);
  const [showAfrica, setShowAfrica] = useState(false);
  const [showOceania, setShowOceania] = useState(false);

  const handleClickAmerica = (e) => {
    e.stopPropagation(); // Evita que el evento se propague y cierre inmediatamente
    setShowAmerica((prev) => !prev);
    setShowEurope(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAsia(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAfrica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowOceania(false); // Ocultar el componente si se hizo clic fuera de él

  };
  const handleClickEurope = (e) => {
    e.stopPropagation(); // Evita que el evento se propague y cierre inmediatamente
    setShowEurope((prev) => !prev);
    setShowAmerica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAsia(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAfrica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowOceania(false); // Ocultar el componente si se hizo clic fuera de él

  };
  const handleClickAsia = (e) => {
    e.stopPropagation(); // Evita que el evento se propague y cierre inmediatamente
    setShowAsia((prev) => !prev);
    setShowAmerica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowEurope(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAfrica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowOceania(false); // Ocultar el componente si se hizo clic fuera de él

  };
  const handleClickAfrica = (e) => {
    e.stopPropagation(); // Evita que el evento se propague y cierre inmediatamente
    setShowAfrica((prev) => !prev);
    setShowAmerica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowEurope(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAsia(false); // Ocultar el componente si se hizo clic fuera de él
    setShowOceania(false); // Ocultar el componente si se hizo clic fuera de él

  };
  const handleClickOceania = (e) => {
    e.stopPropagation(); // Evita que el evento se propague y cierre inmediatamente
    setShowOceania((prev) => !prev);
    setShowAmerica(false); // Ocultar el componente si se hizo clic fuera de él
    setShowEurope(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAsia(false); // Ocultar el componente si se hizo clic fuera de él
    setShowAfrica(false); // Ocultar el componente si se hizo clic fuera de él

  };

  const handleDocumentClick = (e) => {
    // Verificar si el clic ocurrió dentro del componente CountryAmerica
    if (!e.target.closest("#countryAmericaContainer")) {
      setShowAmerica(false); // Ocultar el componente si se hizo clic fuera de él

   
    }
    if (!e.target.closest("#countryEuropeContainer")) {
    // Ocultar el componente si se hizo clic fuera de él
    
      setShowEurope(false); // Ocultar el componente si se hizo clic fuera de él
    }
    if (!e.target.closest("#countryAsiaContainer")) {
     // Ocultar el componente si se hizo clic fuera de él
    setShowAsia(false); // Ocultar el componente si se hizo clic fuera de él

    }

    if (!e.target.closest("#countryAfricaContainer")) {
      // Ocultar el componente si se hizo clic fuera de él
      setShowAfrica(false); // Ocultar el componente si se hizo clic fuera de él
 
     }
     if (!e.target.closest("#handleClickOceania")) {
      // Ocultar el componente si se hizo clic fuera de él
      setShowOceania(false); // Ocultar el componente si se hizo clic fuera de él
 
     }
  };
  useEffect(() => {
    // Agregar el manejador de clics al documento cuando el componente está montado
    document.addEventListener("click", handleDocumentClick);

    // Limpia el manejador de clics cuando el componente se desmonta
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div className="continent-container">
        <Button   onClick={handleClickAmerica}>
          <div className="continent">
            <img src={america} alt="not found" id="continent" />
            <p>America</p>
          </div>
        </Button>
        <Button  onClick={handleClickEurope}>
          <div className="continent">
            <img src={europa} alt="not found" id="continent" />
            <p>Europa</p>
          </div>
        </Button>
        <Button onClick={handleClickAsia}>
          <div className="continent" >
            <img src={asia} alt="not found" id="continent"/>
            <p>Asia</p>
          </div>
        </Button>
        <Button onClick={handleClickAfrica}>
          <div className="continent" >
            <img src={africa} alt="not found" id="continent" />
            <p>Africa</p>
          </div>
        </Button>
        <Button  onClick={handleClickOceania}>
          <div className="continent">
            <img src={oceania} alt="not found"  id="oceania"/>
            <p>Oceania</p>
          </div>
        </Button>
      </div>
      <div>
        <Fade in={showAmerica}>
          <div id="countryAmericaContainer">
            {showAmerica && <CountryAmerica />}
          </div>
        </Fade>
        <Fade in={showEurope}>
          <div id="countryEuropeContainer">
            {showEurope && <CountryEuropa />}
          </div>
        </Fade>
        <Fade in={showAsia}>
          <div id="countryAsiaContainer" >
            {showAsia && <CountryAsia />}
          </div>
        </Fade>
        <Fade in={showAfrica}>
          <div id="countryAfricaContainer" >
            {showAfrica && <CountryAfrica />}
          </div>
        </Fade>
        <Fade in={showOceania}>
          <div id="countryOceaniaContainer" >
            {showOceania && <CountryOceania />}
          </div>
        </Fade>
      </div>
      
    </>
  );
}

export default Continent;
