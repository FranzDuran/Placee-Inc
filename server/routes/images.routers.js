const { Router } = require('express');
const router = Router();
const multer = require('multer');
const upload = multer();
const { FilesCreate, FilesDetail  } = require('../controllers/User/PostImages')


router.post('/upload', upload.single('imagen'), FilesCreate);
router.get('/files/:id', FilesDetail);





module.exports = router



