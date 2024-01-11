const express = require('express');
const router = express.Router();
const { RegisterUser } = require('../controllers/User/RegisterUser');
const { LoginUser } = require('../controllers/User/LoginUser');
const { AllUser } = require('../controllers/User/AllUser');
const { DetailUser } = require('../controllers/User/DetailsUser');
const { DetailsPersonal } = require('../controllers/User/DetailsPersonal');
const { Preregister } = require('../controllers/User/Preregister');
const { UserDetail } = require('../controllers/User/UserDetail');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { User } = require('../database/models')








const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
passport.use("auth-google", new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Aquí puedes personalizar cómo manejar el perfil del usuario después de la autenticación
  return done(null, profile);
}));

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Rutas de autenticación
router.get('/auth/google', passport.authenticate("auth-google", {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/auth/google/callback', passport.authenticate('auth-google', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Ruta protegida
router.get('/profile', isAuthenticated, async (req, res) => {
  const user = req.user;

  try {
    console.log('Iniciando /profile');
    
    let userGoogle = await User.findOne({ email: user.email });
    console.log('Usuario encontrado en la base de datos:', userGoogle);

    if (!userGoogle) {
      console.log('Usuario no encontrado, creándolo...');
      userGoogle = await User.create({
        name: user._json.given_name,
        lastName: user._json.family_name,
        email: user._json.email,
        avatar: user._json.picture,
      });
      console.log('Creación del usuario exitosa:', userGoogle);
    }

    // Crear y firmar un token de acceso
    const token = jwt.sign({ userId: userGoogle._id }, process.env.FIRMA_TOKEN, {
      expiresIn: '1h', // Puedes ajustar la duración del token según tus necesidades
    });

    console.log('Inicio de sesión con google');

    // Devolver el token y otros datos relevantes al cliente
    res.json({ token });
  } catch (error) {
    console.error('Error en la ruta /profile:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});
  

// Middleware para verificar la autenticación
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Ruta principal
router.get('/', (req, res) => {
  res.send('¡Bienvenido a tu aplicación!');
});



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

router.post('/auth/register', RegisterUser);
router.post('/auth/login', LoginUser);


router.get('/users', AllUser);
router.get('/user', DetailUser);
router.get('/user/:idUser', UserDetail);

router.post('/user/data', DetailsPersonal);











module.exports = router