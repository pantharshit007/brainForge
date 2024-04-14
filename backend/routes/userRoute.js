const express = require('express')
const router = express.Router()

const { signup, login, sendOtpMessage, changePassword } = require('../controllers/Auth')
const { auth } = require('../middleware/authMiddleware')
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword')

// -------- Authentication Routes -------- //

// Route for user signup
router.post('/signup', signup)
// Route for user login
router.post('/login', login)
// Route for authenticating emai via OTP : Email
router.post('/sendotp', sendOtpMessage)
// Route to change your password
router.post('/changepassword', auth, changePassword)

// -------- Password Reset Routes -------- //

//Route for generating reset password token
router.post("/reset-password-token", resetPasswordToken)
// Route for reseting user's password post verification
router.post('resetpassword', resetPassword)


module.exports = router;