const express = require('express');
const router = express.Router();
const routerUser = require('./user_routers');
const postRouter = require('./turistic_routers');
const hostessRouter = require('./hostess_routers')
const statusRouter = require('./server-routers')
const paymentRoutes = require('./payment.routes')
/* const paymentRoutes = require('./payment.routes') */

router.use('/', routerUser, postRouter, hostessRouter, statusRouter, paymentRoutes)

module.exports = router