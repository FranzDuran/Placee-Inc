require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.FIRMA_TOKEN; // Cambia esto por una clave secreta segura

function generateToken(user) {
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '8h' });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
