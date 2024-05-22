const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoute')
const profileRoutes = require('./profileRoute')
const courseRoutes = require('./courseRoute')
const paymentRoutes = require('./paymentRoute')
const contactRoutes = require('./contactRoute')

// TODO: ADD A isDemo ROUTE FOR DEMO ACCOUNT 
router.use('/auth', userRoutes)
router.use('/profile', profileRoutes)
router.use('/course', courseRoutes)
router.use('/payment', paymentRoutes)
router.use('/contact', contactRoutes)


module.exports = router;