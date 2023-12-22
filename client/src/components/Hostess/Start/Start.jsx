import { Link } from "react-router-dom";
import "./Start.scss";

export default function Start() {
  return (
    <div className="start-container" id="Inicio">
      <Link to="/anfitrion/mi sitio">
        <div className="start-img">
          <img
            srcSet={require("../../../assets/images/mi-sitio.png")}
            alt="Not found"
          />
          <h2>Mi sitio</h2>
        </div>
      </Link>
      <Link to="/anfitrion/reservaciones">
        <div className="start-img">
          <img
            srcSet={require("../../../assets/images/reservations.png")}
            alt="Not found"
          />
          <h2>Reservaciones</h2>
        </div>
      </Link>
      <Link to="/anfitrion/historial de reservas">
        <div className="start-img">
          <img
            srcSet={require("../../../assets/images/historial.jpg")}
            alt="Not found"
          />
          <h2>Historial de reservas</h2>
        </div>
      </Link>
      <Link to="/anfitrion/reclamos">
        <div className="start-comment">
          <img
            srcSet={require("../../../assets/images/reclamos.jpg")}
            alt="Not found"
          />
          <h2>Reclamos</h2>
        </div>
      </Link>
      <Link to="/anfitrion/comentarios">
        <div className="start-comment">
          <img
            srcSet={require("../../../assets/images/comentarios.jpg")}
            alt="Not found"
          />
          <h2>Comentarios</h2>
        </div>
      </Link>
    </div>
  );
}
