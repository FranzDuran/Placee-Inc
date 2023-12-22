const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token,process.env.FIRMA_TOKEN);
    req.user = decoded; // Agrega el objeto decodificado a la solicitud
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
