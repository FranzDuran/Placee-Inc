const express = require('express');
const router = express.Router();
const { StatusServer } = require('../controllers/User/StatusServer')


router.get('/status', StatusServer)


module.exports = router