const express = require('express');
const router = express.Router()

// middleware
const { auth, isInstructor, isAdmin, isStudent, isDemo } = require('../middleware/authMiddleware');

// Cousrse controller
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    updateCourse,
    deleteCourse,
    markLectureAsComplete
} = require('../controllers/CourseController');

// Section controller
const { createSection, updateSection, deleteSection } = require('../controllers/SectionContoller');

// Sub Section controller
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSectionController');

// Category controller
const { createCategory, getAllCategorys, categoryPageDetails, activeCategory, disableCategory } = require('../controllers/CategoryController');

// Rating and Review controller
const { createRating, avgRating, getAllRatingAndReview, getCourseRatingAndReview } = require('../controllers/RatingAndReviewCont');



// -------- Course Routes -------- //

// create course router: INSTRUCTOR
router.post('/createCourse', auth, isInstructor, createCourse)
// get all courses router
router.get('/getAllCourses', getAllCourses)
// get course details
router.post('/getCourseDetails', getCourseDetails)
// get Full Course details (user specific) 
router.post('/getFullCourseDetails', auth, getFullCourseDetails)
// get all courses router (Instructor specific)
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses)
// update Course router: INSTRUCTOR
router.put('/updateCourse', auth, isInstructor, updateCourse)
// delete course router: INSTRUCTOR
router.delete('/deleteCourse', auth, isInstructor, deleteCourse)
// mark course lecture as completed: STUDENT
router.put('/updateCourseProgress', auth, isStudent, markLectureAsComplete)

// -------- Section Routes -------- //

// add section router: INSTRUCTOR
router.post('/addSection', auth, isInstructor, createSection)
// update section router: INSTRUCTOR
router.put('/updateSection', auth, isInstructor, updateSection)
// delete section router: INSTRUCTOR
router.delete('/deleteSection', auth, isInstructor, deleteSection)

// -------- Sub Section Routes -------- //

// add sub-section router: INSTRUCTOR
router.post('/addSubSection', auth, isInstructor, createSubSection)
// update sub-section router: INSTRUCTOR
router.put('/updateSubSection', auth, isInstructor, updateSubSection)
// delete sub-section router: INSTRUCTOR
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection)

// -------- Category Routes -------- //

// create category router: ADMIN
router.post('/createCategory', auth, isAdmin, createCategory)
// fetch all category router: 
router.get('/getAllCatogories', getAllCategorys)
// fetch all category router: Protected
router.get('/activeCategory', auth, isInstructor, activeCategory)
// fetch category based courses router
router.post('/getCategoryPageDetails', categoryPageDetails)
// update category active status
router.put('/disableCategory', auth, isAdmin, disableCategory)

// -------- Rating and Review Routes -------- //

// add rating routes: ISSTUDENT
router.post('/createRating', auth, isStudent, createRating)
// Average rating routes: ISSTUDENT
router.get('getAverageRating', avgRating)
// fetch all Rating and Review
router.get('/getReviews', getAllRatingAndReview)
// fetch course Specific Rating and Review
router.get('/getCourseReviews', getCourseRatingAndReview)



module.exports = router;