import { Link } from "react-router-dom";
import "./Start.scss";

export default function Start() {
  return (
    <div className="start-container" id="Inicio">
      <Link to="/anfitrion/mi sitio">
        <div className="start-img">
        <i class="ri-profile-line"></i>
          <h2>Mi sitio</h2>
        </div>
      </Link>
      <Link to="/anfitrion/reservaciones">
        <div className="start-img">
        <i class="ri-calendar-2-line"></i>
          <h2>Reservaciones</h2>
        </div>
      </Link>
      <Link to="/anfitrion/historial de reservas">
        <div className="start-img">
        <i class="ri-file-search-line"></i>
          <h2>Historial de reservas</h2>
        </div>
      </Link>
      <Link to="/anfitrion/reclamos">
        <div className="start-comment">
        <i class="ri-file-warning-line" ></i>
          <h2>Reclamos</h2>
        </div>
      </Link>
      <Link to="/anfitrion/comentarios">
        <div className="start-comment">
        <i class="ri-message-2-line" ></i>
          <h2>Comentarios</h2>
        </div>
      </Link>
    </div>
  );
}
