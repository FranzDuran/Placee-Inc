// PaymentButton.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentReserve } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const PaymentButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const payment = useSelector(state => state.payment);
console.log(payment);
  const handlePayment = () => {
    dispatch(paymentReserve());
    window.location.href =payment.url &&  payment.url;

  };

  return (
    <div>
      <p>Haz clic en el botón para realizar la reserva de pago:</p>
      <button onClick={handlePayment}>Realizar Reserva de Pago</button>
    </div>
  );
};

export default PaymentButton;
