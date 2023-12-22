const { User, Post, Comment } = require('../../database/models');

module.exports = {
  DetailsTuristic: async (req, res) => {
    const { idTuristic } = req.params; // Cambia el nombre del parámetro
    try {
      const postDetails = await Post.findByPk(idTuristic, {
        include: [
          { model: User },
          {
            model: Comment,
            as: 'comments',
            include: [{ model: User, as: 'user' }], // Incluye el modelo User asociado a los comentarios
          },
        ],
      });

      if (postDetails) {
        res.status(200).json({ details: postDetails });
      } else {
        res.status(404).json({
          message: 'No existen detalles de la publicación',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
