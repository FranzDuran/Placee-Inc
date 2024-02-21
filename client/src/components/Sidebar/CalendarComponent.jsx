import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es"; // Importa el módulo de idioma español
import styles from "./Sidebar.module.scss";

const CalendarComponent = ({ onSaveToDatabase }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    console.log(date);
    const newSelectedDates = [...selectedDates];
    const index = newSelectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (index !== -1) {
      newSelectedDates.splice(index, 1);
    } else {
      newSelectedDates.push(date);
    }

    setSelectedDates(newSelectedDates);
    console.log(newSelectedDates);
  };

  const dayClassNames = (date) => {
    // Apply the same style for all selected dates
    return selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    )
      ? "selected-date"
      : "";
  };

  const handleSaveClick = () => {
    console.log("Fechas seleccionadas:", selectedDates);
    // Llamar a la función del componente padre con las fechas seleccionadas
    onSaveToDatabase(selectedDates);
  };

  return (
    <div className={styles.calendarContent} >
      <span>Selecione los dias cerrados:</span>
      <DatePicker
        selected={null}
        onChange={handleDateChange}
        inline
        calendarClassName="calendar-custom"
        dayClassName={dayClassNames}
        locale={es} // Configura el idioma español
        dateFormat="dd/MM/yyyy"
        // Otros props de configuración según tus necesidades
      />
     {/*  <button onClick={handleSaveClick} className={styles.calendarBtn} >Guardar fechas</button> */}
    </div>
  );
};

export default CalendarComponent;
