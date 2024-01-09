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

  const handleReportChange = (event) => {
    setReport(event.target.value);
  };

  useEffect(() => {
    dispatch(DetailsPostTuristic(detailpost.id));
  }, []);

  useCallback(() => {}, []);

  const handleReportsSubmit = (e) => {
    e.preventDefault();
    dispatch(ReportsPost({ text: report, postId: detailpost.id }, token));
  };

  return (
    <>
      <form onSubmit={handleReportsSubmit}>
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.boxTwo}>
              <h3 className={styles.title}>Escribe tu reclamo</h3>
              <textarea
                value={report}
                onChange={handleReportChange}
                placeholder="Escribe tu comentario aquí..."
              />
              <button type="submit" className={styles.btnComentar}>
                Enviar reclamo
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModalReclamos;
