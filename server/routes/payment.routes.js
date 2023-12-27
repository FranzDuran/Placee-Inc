const express = require('express');
const router = express.Router();

const {createSession} = require('../controllers/User/Payment')



router.post('/create-checkout-session', createSession )
router.get('/success', (req, res) => res.send('success')  )

router.get('/cancel', (req, res) => res.redirect('cancel') )



module.exports = router