const { Reports } = require('../../database/models');

module.exports = {
  DeleteComment: async (req, res) => {
    const { reportId } = req.params;

    try {
      // Verificar si la publicación existe
      const report = await Reports.findByPk(reportId);

      if (!report) {
        console.log('Reporte no encontrado');
        return res.status(404).json({ message: 'Reporte no encontrado' });
      }

      // Eliminar la publicación
      await report.destroy();
      console.log('Reporte eliminado exitosamente');
      res.status(200).json({ message: 'Reporte eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
