const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { User } = require('../../database/models');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

// Configurar el cliente OAuth2
const oauth2Client = new google.auth.OAuth2({
  clientID: '144481241951-h56ugquntd5ihgg981ku9l8bm6tlq2ts.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'http://localhost:4000/auth/google/callback',
});

passport.use(new GoogleStrategy({
  clientID: '144481241951-h56ugquntd5ihgg981ku9l8bm6tlq2ts.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:4000/auth/google/callback', // Ajusta esto según tu configuración
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email: profile.emails[0].value } });

    if (existingUser) {
      return done(null, existingUser);
    }

    // Si no existe, crea un nuevo usuario
    const newUser = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      // Otras propiedades del usuario que quieras almacenar
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = {
  // Generar URL de autorización
  generateGoogleAuthUrl: () => {
    const scopes = ['profile', 'email']; // Puedes ajustar los alcances según tus necesidades
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });
    return authorizationUrl;
  },

  // Middleware de Passport para iniciar sesión con Google
  responseGoogle: passport.authenticate('google', { scope: ['profile', 'email'] }),

  // Callback de Google OAuth
  responseGoogleCallback: passport.authenticate('google', {
    failureRedirect: '/',
  }, (req, res) => {
    const tokenPayload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      // Otras propiedades del usuario que quieras incluir en el token
    };

    const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

    res.redirect(`http://localhost:4000/login-success?token=${token}`);
  }),
};
