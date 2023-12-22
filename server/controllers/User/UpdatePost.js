const { Post } = require('../../database/models');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: 'dz0lruj7k',
  api_key: '128323134832632',
  api_secret: '04JixT8UcmHYY-QfbwSTBzT-L7I'
});

module.exports = {
  UpdatePost: async (req, res) => {
    const { postId } = req.params;
    const {
      title,
      price,
      people,
      summary,
      description,
      status,
      continent,
      infoImportant,
      daysAtentions,
      reservedDates,
      listDetails,
      hoursAtetionsInitial,
      hoursAtentionsFinally,
      country,
    } = req.body;

    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }

      // Actualizar propiedades solo si se proporcionan en la solicitud
      if (title) post.title = title;
      if (price) post.price = price;
      if (people) post.people = people;
      if (summary) post.summary = summary;
      if (description) post.description = description;
      if (status) post.status = status;
      if (continent) post.continent = continent;
      if (infoImportant) post.infoImportant = infoImportant;
      if (daysAtentions) post.daysAtentions = daysAtentions;
      if (reservedDates) post.reservedDates = reservedDates;
      if (listDetails) post.listDetails = listDetails;
      if (hoursAtetionsInitial) post.hoursAtetionsInitial = hoursAtetionsInitial;
      if (hoursAtentionsFinally) post.hoursAtentionsFinally = hoursAtentionsFinally;
      if (country) post.country = country;

      const file = req.file;
      if (file) {
        const cloudinaryUploadResult = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
          quality: 'auto:low',
          fetch_format: 'auto',
        });
        console.log('Imagen subida a Cloudinary:', cloudinaryUploadResult.secure_url);
        post.avatarValue = cloudinaryUploadResult.secure_url;
      }

      // Guardar los cambios en la base de datos
      await post.save();

      console.log('Publicación actualizada');
      res.status(200).json({ message: 'Publicación actualizada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
