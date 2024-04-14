const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoute')
const profileRoutes = require('./profileRoute')
const courseRoutes = require('./courseRoute')
const paymentRoutes = require('./paymentRoute')
const contactRoutes = require('./contactRoute')

router.use('/auth', userRoutes)
router.use('/profile', profileRoutes)
router.use('/course', courseRoutes)
router.use('/payment', paymentRoutes)
router.use('/reach', contactRoutes)


module.exports = router;