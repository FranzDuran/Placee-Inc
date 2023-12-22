require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization'); // Obtén el token de la cabecera de la solicitud

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.FIRMA_TOKEN);
    req.user = { id: decoded.userId }; // Agrega el ID del usuario al objeto de solicitud
    next(); // Continúa con la siguiente función en la ruta
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = {
  authenticate,
};
