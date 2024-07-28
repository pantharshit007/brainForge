const express = require('express')
const router = express.Router()

const { updateProfile, deleteProfile, getAllUsersDetail, updateProfilePicture, getEnrolledCourses, instructorDashboard, existingUser } = require('../controllers/ProfileController')
const { auth, isInstructor, isAdmin, isDemo } = require('../middleware/authMiddleware')

// -------- Profile Routes -------- //

// update profile router
router.put('/updateProfile', auth, isDemo, updateProfile)
// delete profile router
router.delete('/deleteProfile', auth, isDemo, deleteProfile)
// fetch all user profle details router
router.get('/getUserDetails', auth, getAllUsersDetail)
// update display picture router
router.put('/updateDisplayPicture', auth, isDemo, updateProfilePicture)

// Get Enrolled Courses router
router.get('/getEnrolledCourses', auth, getEnrolledCourses)
// instructor dashboard
router.get('/instructorDashboard', auth, isInstructor, instructorDashboard)

// admin dashboard data
router.get('/adminDashboard', auth, isAdmin, existingUser)


module.exports = router;