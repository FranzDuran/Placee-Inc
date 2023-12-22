require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Post } = require('../../database/models');

module.exports = {
  DetailUser: async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    try {
      // Verificar el token JWT
      const payload = jwt.verify(authorization, process.env.FIRMA_TOKEN);

      // Obtener todos los datos del usuario desde la base de datos
      const user = await User.findOne({ 
        where: { id: payload.id },
        include: [{ model: Post }]
       });

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Enviar todos los datos del usuario como respuesta
      return res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
