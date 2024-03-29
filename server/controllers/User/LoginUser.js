require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
module.exports = {
  LoginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('Contraseña incorrecta');
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      const tokenPayload = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('Inicio de sesión exitoso');
      return res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
