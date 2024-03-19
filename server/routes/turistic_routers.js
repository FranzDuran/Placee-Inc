const { Router } = require('express');
const router = Router();
const { authenticate } = require('../helpers/middleware');
const { PostTuristic } = require('../controllers/User/PostTuristic')
const { AllTuristic } = require('../controllers/User/AllPost')
const { DetailsTuristic } = require('../controllers/User/DetailsTuristic');
const { CommentPost } = require('../controllers/User/CommentPost');
const { ReportPost } = require('../controllers/User/Report');
const { DeleteComment } = require('../controllers/User/DeleteComent');
const { OnlyAllPost } = require('../controllers/User/OnlyAllPost')






const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../uploads')); // Usa path.join para obtener la ruta absoluta
          },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });



router.post('/post', authenticate, upload.array('imageFile', 1000), PostTuristic);
router.post('/comment',  CommentPost);
router.delete('/comment/:commentId',  DeleteComment);
router.delete('/report/:reportId',  DeleteComment);


router.post('/reports',  ReportPost);


router.get('/turistic', AllTuristic)
router.get('/allposts', OnlyAllPost)



router.get('/turistic/:idTuristic', DetailsTuristic)







module.exports = router