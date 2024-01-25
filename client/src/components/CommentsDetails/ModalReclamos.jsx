import React, { useCallback, useState } from "react";
import styles from "./ModalReclamos.module.scss";
import { DetailsPostTuristic, ReportsPost } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ModalReclamos = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const detailpost = useSelector((state) => state.detailpost);

  const [report, setReport] = useState("");
  //console.log(report);
  const handleReportChange = (event) => {
    console.log(event.target.value);
    setReport(event.target.value);
  };

  useEffect(() => {
    dispatch(DetailsPostTuristic(detailpost.id));
  }, []);

  useCallback(() => {}, []);

  const handleReportsSubmit = () => {
    console.log("datos", report);
     //e.preventDefault();
    dispatch(ReportsPost({ text: report, postId: detailpost.id }, token));
  };

  return (
    <>
      <div className={styles.boxTwo}>
        <h3 className={styles.title}>Escribe tu reclamo</h3>
        <textarea
          value={report}
          onChange={handleReportChange}
          placeholder="Escribe tu comentario aquí..."
        />
        <button
          className={styles.btnComentar}
          onClick={handleReportsSubmit}
        >
          Enviar reclamo
        </button>
      </div>
    </>
  );
};

export default ModalReclamos;
