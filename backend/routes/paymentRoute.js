const express = require('express');
const router = express.Router()

const { receivePayment, verifySignature, sendPaymentSuccessEmail } = require('../controllers/Payments');
const { auth, isStudent } = require('../middleware/authMiddleware');

// -------- Payment Routes -------- //

// receive Payment router
router.post('/capturePayment', auth, isStudent, receivePayment)
// verify signature form razorpay router
router.post('/verifyPayment', auth, isStudent, verifySignature)
// send successful payment email
router.post('/sendPaymentSuccessEmail', auth, isStudent, sendPaymentSuccessEmail)


module.exports = router;