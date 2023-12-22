const { User, Post, Comment } = require('../../database/models');

module.exports = {
  User: async (req, res) => {
    const { idUser} = req.params; // Cambia el nombre del parámetro
    try {
      const UserDetails = await User.findByPk(idUser, {
        include: [{ model: Post },{model: Comment, as: 'comments'} ] // Incluye el modelo User
      });

      if (UserDetails) {
        res.status(200).send({ UserDetails: UserDetails });
      } else {
        res.status(404).send({
          message: 'No existen detalles del usuario'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
