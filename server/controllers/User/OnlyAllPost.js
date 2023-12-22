const { User, Post } = require('../../database/models') 

module.exports = {
    OnlyAllPost: async (req, res) => {
    try {
      const posts = await Post.findAll();

      if (posts.length > 0) {
        res.status(200).send({OnlyPosts: posts});
      } else {
        res.status(404).send({
          message: 'No existen publicación'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
 