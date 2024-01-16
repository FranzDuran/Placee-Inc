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
const { User, Post } = require('../database/models')
require('dotenv').config();








const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://placee-inc.vercel.app/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Aquí puedes almacenar el perfil del usuario en tu base de datos si es necesario
  return done(null, profile);
}));

// Serialización y deserialización del usuario para almacenar en la sesión
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Rutas de autenticación
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
   

    // Redirigir a la ruta deseada con el token
    res.redirect(`https://placee-inc.vercel.app`);
  }
);

// Ruta protegida
router.get('/profile', isAuthenticated, async (req, res) => {
  const user = req.user;

  try {

    const existingUser = await User.findOne({
      where: { email: user._json.email },
      include: [{ model: Post }]
    });



    if (existingUser) {
      console.log('Usuario Existente' );
      res.json(existingUser);
    } else {
      const newUser = await User.create({
        name: user._json.given_name,
        lastName: user._json.family_name,
        email: user._json.email,
        avatar: user._json.picture,
      });

      console.log('Nuevo Usuario Creado');
      res.json(newUser);
    }
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    res.status(500).json({ error: 'Error al iniciar sesión con Google' });
  }
});




// Middleware para verificar autenticación
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}


router.get('/logout', (req, res) => {
  req.logout(); // Este método es proporcionado por Passport para cerrar sesión
  res.redirect('/'); // Redirige a la página de inicio o a donde desees después de cerrar sesión
});

// Otra forma de cerrar sesión y manejar la respuesta
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Sesión cerrada exitosamente' });
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