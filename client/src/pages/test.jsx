import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { paymentReserve } from '../redux/action'; // Importa tu acción de Redux

const PaymentForm = ({ idTuristic }) => {
  const dispatch = useDispatch();
  const [priceAdult, setPriceAdult] = useState(0);
  const [priceMenor, setPriceMenor] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(paymentReserve(idTuristic, { priceAdult, priceMenor }));
  };

  return (
    <div>
      <h2>Reserva de Pago</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Precio Adulto:
          <input
            type="number"
            value={priceAdult}
            onChange={(e) => setPriceAdult(e.target.value)}
          />
        </label>
        <br />
        <label>
          Precio Menor:
          <input
            type="number"
            value={priceMenor}
            onChange={(e) => setPriceMenor(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Reservar Pago</button>
      </form>
    </div>
  );
};

export default PaymentForm;
