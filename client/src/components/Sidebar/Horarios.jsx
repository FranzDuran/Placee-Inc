import React, { useState } from "react";
import styles from "./Horarios.module.scss";
const Horarios = ({onGuardarClick }) => {
  const [horarios, setHorarios] = useState([
    { dia: "Lunes", inicio: "", fin: "", cerrado: false },
    { dia: "Martes", inicio: "", fin: "", cerrado: false },
    { dia: "Miércoles", inicio: "", fin: "", cerrado: false },
    { dia: "Jueves", inicio: "", fin: "", cerrado: false },
    { dia: "Viernes", inicio: "", fin: "", cerrado: false },
    { dia: "Sábado", inicio: "", fin: "", cerrado: false },
    { dia: "Domingo", inicio: "", fin: "", cerrado: false },
  ]);

  const handleInputChange = (index, campo, valor) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index][campo] = valor;
    setHorarios(nuevosHorarios);
  };

  const toggleCerrado = (index) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index].cerrado = !nuevosHorarios[index].cerrado;
    setHorarios(nuevosHorarios);
  };
  const handleGuardarClick = () => {
    // Llama a la función del componente padre y pasa los horarios actuales
    onGuardarClick(horarios);
  };

  return (
    <div className={styles.container}>
      <h3>Horarios</h3>
      <form>
        {horarios.map((horario, index) => (
          <div key={index} className={styles.formGroup}>
            <label className={styles.label}>{horario.dia}</label>
            {horario.cerrado ? (
              <span className={styles.cerradoText}>Cerrado</span>
            ) : (
              <>
                <input
                  type="time"
                  value={horario.inicio}
                  onChange={(e) =>
                    handleInputChange(index, "inicio", e.target.value)
                  }
                  className={styles.inputTime}
                />
                <span>-</span>
                <input
                  type="time"
                  value={horario.fin}
                  onChange={(e) =>
                    handleInputChange(index, "fin", e.target.value)
                  }
                  className={styles.inputTime}
                />
              </>
            )}
            <input
              type="checkbox"
              checked={horario.cerrado}
              onChange={() => toggleCerrado(index)}
            />
          </div>
        ))}
      </form>
      <button onClick={handleGuardarClick} className={styles.button}>
        Guardar
      </button>
    </div>
  );
};

export default Horarios;
