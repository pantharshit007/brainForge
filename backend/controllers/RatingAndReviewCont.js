const RatingAndReview = require('../models/RatingAndReview')
const Course = require('../models/Course')

// Create Rating
async function createRating(req, res) {

    try {
        //fetch course Id and User Id
        const { userId, courseId } = req.body;
        const { rating, review } = req.body;


        if (!rating || !review) {
            return res.status(406).json({
                success: false,
                message: "Please Enter all the fields"
            })
        }

        // check user Enrollment in the Course: can also use $elemMatch
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentEnrolled: userId
            }
        )

        if (!courseDetails) {
            return res.status(401).json({
                success: false,
                message: 'You are not Enrolled in this course.'
            })
        }

        // check if user has a review already : 1 Time Review
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(405).json({
                success: false,
                message: 'User already has a review.'
            })
        }

        // create new Rating
        const newRatingReview = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating, review,
        })

        //update the course with the new rating & review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: { ratingAndReviews: newRatingReview._id }
            },
            { new: true }
        )

        console.log("rating Added: " + updatedCourseDetails)

        return res.status(200).json({
            success: true,
            message: "Rating and review Added!",
            newRatingReview
        })

    } catch (err) {
        console.log('> Failed to Add Rating and Review: ' + err.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to Add Rating and Review: ' + err.message,
        })

    }
}

// Avergae Rating
async function avgRating(req, res) {
    try {
        // fetch course Id
        const courseId = req.body.courseId;

        //calculate Avergae Rating: return an array whose first elem is avgRating
        const result = await RatingAndReview.aggregate(
            {
                $match: { course: mongoose.Types.ObjectId.createFromHexString(courseId) }
            },
            {
                $group: {
                    _id: null,  //all documents as part of a single group
                    averageRating: { $avg: "$rating" },
                }
            }
        )
        console.log('Average rating: ', result)

        // No rating yet
        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'No One rated this course yet.',
                averageRating: 0,
            })
        }

        // return rating
        return res.status(200).json({
            success: true,
            message: 'This course Average rating is: ',
            averageRating: result[0].averageRating,
        })

    } catch (err) {
        console.log('> Failed to fetch Average rating: ', err.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch Average rating: ' + err.message,
        })
    }
}

// Get All Rating and Review
async function getAllRatingAndReview(req, res) {
    try {
        const allRatingAndReviews = await RatingAndReview.find()
            .sort({ rating: 'desc' })
            .populate({
                path: 'user',
                select: 'firstName lastName email image'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .exec()

        //for case when their are no reviews and ratings
        if (allRatingAndReviews.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'No reviews or ratings found',
                data: []
            })
        }

        return res.status(200).json({
            success: true,
            message: 'All rating & review are fetched successfully.',
            data: allRatingAndReviews,
        })

    } catch (err) {
        console.log('> Failed to fetch All rating & review: ' + err.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch All rating: & review: ' + err.message,
        })
    }
}

// Get specific course rating and review
async function getCourseRatingAndReview(req, res) {
    try {
        const courseId = req.body.courseId;

        // Find ratings and reviews for the specified course
        const courseRatingAndReviews = await RatingAndReview.find({ course: courseId })
            .sort({ rating: 'desc' }) // Sort by rating in descending order
            .populate({
                path: 'user',
                select: 'firstName lastName email image'
            })
            .exec();

        // Check if any ratings and reviews are found for the course
        if (courseRatingAndReviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No ratings or reviews found for the specified course',
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Rating & review for the specified course fetched successfully.',
            data: courseRatingAndReviews,
        });

    } catch (err) {
        console.log('> Failed to fetch rating & review for the specified course: ' + err.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch rating & review for the specified course: ' + err.message,
        });
    }
}


module.exports = {
    createRating,
    avgRating,
    getAllRatingAndReview,
    getCourseRatingAndReview
}