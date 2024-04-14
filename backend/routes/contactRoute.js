const express = require('express')
const router = express.Router()
const { contactUser } = require('../controllers/ContactUs')

// -------- Contact Routes -------- //

router.post('/contact', contactUser);

module.exports = router;