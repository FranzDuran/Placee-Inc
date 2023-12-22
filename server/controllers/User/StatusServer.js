

module.exports = {
  StatusServer: async (req, res) => {

    try {
        res.sendStatus(200); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
