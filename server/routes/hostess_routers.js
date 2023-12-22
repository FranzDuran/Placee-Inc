const { Router } = require('express');
const router = Router();

const { HostessUser } = require('../controllers/User/HostessUser');
const { DeletePost } = require('../controllers/User/DeletePost'); 
const { OnlyAllPost } = require('../controllers/User/OnlyAllPost'); 
const { UpdatePost } = require('../controllers/User/UpdatePost'); 






router.get('/hostess/:idHostess', HostessUser)
router.get('/posthostess', OnlyAllPost)

router.put('/post/:postId', UpdatePost)

router.delete('/post/:postId', DeletePost)




module.exports = router