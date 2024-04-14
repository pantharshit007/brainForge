const express = require('express');
const router = express.Router()

const { receivePayment, verifySignature } = require('../controllers/Payments');
const { auth, isStudent } = require('../middleware/authMiddleware');

// -------- Payment Routes -------- //

// receive Payment router
router.post('/capturePayment', auth, isStudent, receivePayment)
// verify signature form razorpay router
router.post('/verifyPayment', auth, isStudent, verifySignature)


module.exports = router;