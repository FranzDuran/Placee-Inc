require('dotenv').config()
const express = require('express');
const app = express();
const routers = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.PORT || 4000

const cloudinary = require('cloudinary').v2; // Importa la SDK de Cloudinary
cloudinary.config({
  cloud_name: 'dz0lruj7k',
  api_key: '128323134832632',
  api_secret: '04JixT8UcmHYY-QfbwSTBzT-L7I'
});  

app.use(cors())
app.use(session({
  secret: process.env.FIRMA_TOKEN, // Cambia esto con una cadena secreta real
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use('/', routers)



app.listen(PORT, () => {

    console.log(`server on port ${PORT}`);
})

