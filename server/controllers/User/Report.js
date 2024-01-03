const { Comment, User, Post, Reports} = require('../../database/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  
    ReportPost: async (req, res) => {
    try {
      const { authorization } = req.headers;

      jwt.verify(authorization, process.env.FIRMA_TOKEN, async (err, decoded) => {
        if (err) {
          return res.sendStatus(401);
        }

        const { text, postId } = req.body; // Agrega postId al cuerpo de la solicitud

        // Verifica si la publicación (Post) existe
        const post = await Post.findByPk(postId);
        if (!post) {
          console.log( 'La publicación no existe' );

          return res.status(404).json({ error: 'La publicación no existe' });
        }

        // Crea un nuevo comentario y asocia la publicación y el usuario
        const reports = await Reports.create({
          text,
          userId: decoded.id,
          postId: post.id, // Asocia el comentario con la publicación
        }, {
          include: [{ model: User, as: 'user' }, { model: Post, as: 'post' }],
        });
        
        // El comentario ahora incluirá las asociaciones con el usuario y la publicación
     

        console.log('Reportes creado exitosamente');
        res.status(201).json({ message: 'Reportes creado exitosamente' });
      });
    } catch (error) {
      console.error('Error al crear el Reporte:', error);
      res.status(500).json({ error: 'Ocurrió un error al crear el Reporte' });
    }
  }
};
