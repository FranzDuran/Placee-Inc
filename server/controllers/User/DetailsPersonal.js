require('dotenv').config();
const bcrypt = require('bcrypt');
const { jwtVerify } = require("jose");
const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const key = '111111111111111111111111'; // hard code
const iv = '2222222222222222'; // Vector de inicialización aleatorio (16 bytes)
const { UserDetails } = require("../../database/models");


// Función para descifrar el token
function decryptToken(encryptedToken) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf8');
  decryptedToken += decipher.final('utf8');
  return decryptedToken;
}

module.exports = {
  DetailsPersonal: async (req, res) => {
    const { identify, country, city  } = req.body;


    try {

        const personal = await UserDetails.create({
            identify,
            country,
            city
        })

        res.status(200).send(personal)

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
