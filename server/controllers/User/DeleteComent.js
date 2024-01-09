const { Comment } = require('../../database/models');

module.exports = {
  DeleteComment: async (req, res) => {
    const { commentId } = req.params;

    try {
      // Verificar si la publicación existe
      // Verificar si la publicación existe
      // Verificar si la publicación existe
      const comment = await Comment.findByPk(commentId);

      if (!comment) {
        console.log('Comentario no encontrada');
        return res.status(404).json({ message: 'Comentario no encontrada' });
      }

      // Eliminar la publicación
      await comment.destroy();
      console.log('Comentario eliminado exitosamente');
      res.status(200).json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
