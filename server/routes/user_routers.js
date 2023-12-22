const express = require('express');
const router = express.Router();
const { RegisterUser } = require('../controllers/User/RegisterUser');
const { LoginUser } = require('../controllers/User/LoginUser');
const { AllUser } = require('../controllers/User/AllUser');
const { DetailUser } = require('../controllers/User/DetailsUser');
const { DetailsPersonal } = require('../controllers/User/DetailsPersonal');
const { Preregister } = require('../controllers/User/Preregister');
const { User } = require('../controllers/User/User');
const { responseGoogle, responseGoogleCallback } = require('../controllers/User/LoginGoogle');

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






router.put('/user/preregister/:userId', upload.single('avatar'), Preregister);
router.get('/auth/google', responseGoogle);
router.get('/auth/google/callback', responseGoogleCallback);
router.post('/auth/register', RegisterUser);
router.post('/auth/login', LoginUser);


router.get('/users', AllUser);
router.get('/user', DetailUser);
router.get('/user/:idUser', User);

router.post('/user/data', DetailsPersonal);











module.exports = router