const { User, Post, Comment } = require('../../database/models') 

module.exports = {
  AllUser: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [{ model: Post }, {model: Comment, as: 'comments'}] // Usa 'include' en lugar de 'includes'
      });

      if (users.length > 0) {
        res.status(200).send(users);
      } else {
        res.status(404).send({
          message: 'No existen usuarios'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
