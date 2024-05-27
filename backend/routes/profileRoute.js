const express = require('express')
const router = express.Router()

const { updateProfile, deleteProfile, getAllUsersDetail, updateProfilePicture } = require('../controllers/ProfileController')
const { auth } = require('../middleware/authMiddleware')

// -------- Profile Routes -------- //

// update profile router
router.put('/updateProfile', auth, updateProfile)
// delete profile router
router.delete('/deleteProfile', auth, deleteProfile)
// fetch all user profle details router
router.get('/getUserDetails', auth, getAllUsersDetail)
// update display picture router
router.put('/updateDisplayPicture', auth, updateProfilePicture)
// Get Enrolled Courses router
// instructor dashboard


module.exports = router;