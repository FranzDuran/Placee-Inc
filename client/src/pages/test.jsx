import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido a tu aplicación</h1>
      <Link to="/auth/google">Iniciar sesión con Google</Link>
    </div>
  );
}

export default Home;
