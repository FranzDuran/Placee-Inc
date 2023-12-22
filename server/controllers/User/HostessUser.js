const { User, Post } = require('../../database/models');

module.exports = {
  HostessUser: async (req, res) => {
    const { idHostess } = req.params; // Cambia el nombre del parámetro
    try {
      const postDetails = await User.findByPk(idHostess, {
        include: [{ model: Post }] // Incluye el modelo User
      });

      if (postDetails) {
        res.status(200).send({ details: postDetails });
      } else {
        res.status(404).send({
          message: 'No existen detalles de la publicación'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
