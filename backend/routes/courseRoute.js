const express = require('express');
const router = express.Router()

const { createCourse, getAllCourses, getCourseDetails } = require('../controllers/CourseController');
const { isInstructor, auth } = require('../middleware/authMiddleware');

// -------- Course Routes -------- //

// create course router: INSTRUCTOR
router.post('/createCourse', auth, isInstructor, createCourse)
// get all courses router
router.get('/getAllCourses', getAllCourses)
// get course details
router.get('/getCourseDetails', getCourseDetails)

module.exports = router;