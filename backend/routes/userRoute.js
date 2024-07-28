const express = require('express')
const router = express.Router()

const { signup, login, sendOtpMessage, changePassword } = require('../controllers/Auth')
const { auth, isDemo } = require('../middleware/authMiddleware')
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword')

// -------- Authentication Routes -------- //

// Route for user signup
router.post('/signup', signup)
// Route for user login
router.post('/login', login)
// Route for authenticating emai via OTP : Email
router.post('/sendotp', sendOtpMessage)
// Route to change your password
router.post('/changepassword', auth, isDemo, changePassword)

// -------- Password Reset Routes -------- //

//Route for generating reset password token
router.post("/reset-password-token", isDemo, resetPasswordToken)
// Route for reseting user's password post verification
router.post('/reset-password', resetPassword)


module.exports = router;