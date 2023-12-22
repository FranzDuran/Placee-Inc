const express = require('express');
const router = express.Router();
const routerUser = require('./user_routers');
const postRouter = require('./turistic_routers');
const hostessRouter = require('./hostess_routers')
const statusRouter = require('./server-routers')


router.use('/', routerUser, postRouter, hostessRouter, statusRouter)


module.exports = router