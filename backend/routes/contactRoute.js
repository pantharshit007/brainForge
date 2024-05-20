const express = require('express')
const router = express.Router()
const { contactUser } = require('../controllers/ContactUs')

// -------- Contact Routes -------- //

router.post('/contactUs', contactUser);

module.exports = router;