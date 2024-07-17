const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secConverter");
const { deleteFolder } = require("../utils/deleteContent");
const mongoose = require('mongoose');

require('dotenv').config();
const MEDIA_FOLDER = process.env.MEDIA_FOLDER
const VIDEO_FOLDER = process.env.VIDEO_FOLDER


//create Courses
async function createCourse(req, res) {
    try {
        const userId = req.user.id;

        // fetching data from body
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
        let { tag: _tag, instructions: _instructions, status } = req.body;

        //fetch the thumbnail Image
        const thumbnail = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        // check if the course is new: No duplicates are allowed
        const isNewCourse = await Course.findOne({ courseName: courseName })
        if (isNewCourse) {
            return res.status(406).json({
                success: false,
                message: 'Duplicate course name.',
            })
        }

        // updating the upload location and adding tag
        const THUMBNAIL_LOCATION = MEDIA_FOLDER + '/' + courseName
        const imageTag = [courseName]

        // validate the input data
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail ||
            !tag.length ||
            !instructions.length
        ) {
            return res.status(403).json({
                success: false,
                message: 'Please fill all the required fields.'
            })
        }

        // update status if not provided
        if (!status || status === undefined) {
            status = "Draft"
        }

        //fetching Instructo's data: userId is the same as instructorID since user is Instructore here
        const instructorDetails = await User.findById(userId);
        // console.log('Instructor Details: ' + instructorDetails);
        //TODO: to check if both id's are same or not : no need since already authenticated via middleware

        //though it's stupid to check since the ID is already authenticated before comming here.
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor not found.'
            })
        }

        // check the validity of the category: using the category ID which is used as a ref in Course Schema
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'No category found.'
            })
        }

        //upload thumbnail Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, THUMBNAIL_LOCATION, null, null, imageTag);

        //creating entry for a new Course in dB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            tag,
            instructions,
        })

        //update user(Instructor)'s data of created course
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: { courses: newCourse._id }
            },
            { new: true }
        );

        //update category schema: add new course to categorys category
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: { courses: newCourse._id }
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'New Course created successfully',
            data: newCourse //TODO: ToRemove later
        });


    } catch (err) {
        console.log('> Error while creating Course: ' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Error while creating course: ' + err.message
        })
    }
}

// fetch all available courses
async function getAllCourses(req, res) {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            instructor: true,
            thumbnail: true,
            ratingAndReviews: true,
        }).populate('instructor').exec();

        return res.status(200).json({
            success: true,
            message: 'Fetched all available courses',
            data: allCourses    //ToRemove later
        })

    } catch (err) {
        console.log('> Failed to fetch all courses: ' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Failed to fetch all courses: ' + err.message
        })
    }
}

//fetch course detail (entirely-Lecvideo)
async function getCourseDetails(req, res) {
    try {
        //fetch course Id
        const { courseId } = req.body;

        // check validity
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: 'Course Id required',
            })
        }

        //fetch course details
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                select: 'firstName lastName image'
            })
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                    select: '-videoUrl' //to exclude videoUrl from populating
                }
            })
            .populate({
                path: 'ratingAndReviews',
                populate: {
                    path: 'user', select: 'firstName lastName accountType image'
                }
            })
            .populate('category')
            .exec()

        // check validity
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'No course Found with id ' + courseId,
            });
        }

        let totalTimeInSeconds = 0;

        // courseDetails.courseContent.forEach((section) => {
        //     section.subSection.forEach((subSection) => {
        //         const timeDurationSeconds = parseInt(subSection.timeDuration)
        //         totalTimeInSeconds += timeDurationSeconds;
        //     })
        // })

        //! using already calculated time from section Modal
        courseDetails.courseContent.forEach(section => {
            const timeDurationSeconds = parseInt(section?.totalSectionDuration)
            totalTimeInSeconds += timeDurationSeconds;
        })

        //convert seconds to proper annotations
        const totalDuration = convertSecondsToDuration(totalTimeInSeconds);

        //response
        return res.status(200).json({
            success: true,
            message: 'Course found!',
            data: {
                courseDetails,
                totalDuration
            }
        })

    } catch (err) {
        console.log("> Failed to retrieve Course Details: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve Course Details: " + err.message,
        })
    }
}

// fetch course details with user specific info
async function getFullCourseDetails(req, res) {
    try {
        //fetch course Id
        const { courseId } = req.body;
        const userId = req.user.id;

        // check validity
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: 'Course Id required',
            })
        }

        //fetch course details
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                select: 'firstName lastName image'
            })
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .exec()


        // check validity
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'No course Found with id ' + courseId,
            });
        }

        //course Progress for specific user
        let courseProgressStatus = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        // only show courses which are in published phase    
        /*if (courseDetails.status === "Draft") {
          return res.status(403).json({
            success: false,
            message: `Accessing a draft course is forbidden`,
          });
        }
        */

        // let totalTimeInSeconds = 0;

        // courseDetails.courseContent.forEach((section) => {
        //     section.subSection.forEach((subSection) => {
        //         const timeDurationSeconds = parseInt(subSection.timeDuration)
        //         totalTimeInSeconds += timeDurationSeconds;
        //     })
        // })

        //! using already calculated time from section Modal
        // courseDetails.courseContent.forEach(section => {
        //     const timeDurationSeconds = parseInt(section.totalSectionDuration)
        //     totalTimeInSeconds += timeDurationSeconds;
        // })

        //convert seconds to proper annotations
        // const totalDuration = convertSecondsToDuration(totalTimeInSeconds);

        // check if their is any progress: if yes then return section ID's
        const completedSection = courseProgressStatus?.completedVideos
            ? courseProgressStatus.completedVideos
            : []

        //response
        return res.status(200).json({
            success: true,
            message: 'Course found!',
            data: {
                courseDetails,
                completedVideos: completedSection
            }
        })

    } catch (err) {
        console.log("> Failed to retrieve Full Course Details: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve Course Details: " + err.message,
        })
    }
}

// fetch courses under a specific Instructor
async function getInstructorCourses(req, res) {
    try {
        //fetch instructor id 
        const instructorId = req.user.id;

        //find all the courses created by the instructor in latest to oldest order
        const instructorCourses = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 });

        //return res
        res.status(200).json({
            success: true,
            message: 'Instructor Created Courses.',
            data: instructorCourses
        })

    } catch (err) {
        console.log('> Failed to fetch Instructor Courses: ' + err.message);
        res.status(500).json({
            success: false,
            message: 'Course Fetching Failed:' + err.message
        })

    }
}

// update course [edit]
async function updateCourse(req, res) {
    try {
        // fetching course id
        const { courseId } = req.body;

        // changes in course: updates
        const updates = req.body;

        // find the course we are updating
        const courseDetails = await Course.findById(courseId);

        if (!courseDetails) {
            return res.status(500).json({
                success: false,
                message: 'Course not found',
            })
        }

        // updating the upload location and adding tag
        const courseName = courseDetails.courseName;
        const THUMBNAIL_LOCATION = MEDIA_FOLDER + '/' + courseName
        const imageTag = [courseName]

        // update thumbnail: If send from FE via req.files
        if (req.files && req.files.thumbnailImage) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, THUMBNAIL_LOCATION, null, null, imageTag);
            courseDetails.thumbnail = thumbnailImage.secure_url;
        }

        // update the fields that are send within the req body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key == 'tag' || key == 'instructions') {
                    courseDetails[key] = JSON.parse(updates[key]);
                } else {
                    courseDetails[key] = updates[key];
                }
            }
        }

        // save the new changes to the course DB
        courseDetails.save();

        // update state of course with new data
        //? TODO: find a way so that only the data whcih is updated passed or unneccessary is removed like addition, rating 
        const updatedCourse = await Course.findOne({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        // send response
        res.status(200).json({
            success: true,
            message: 'Course updated!',
            data: updatedCourse
        })

    } catch (err) {
        console.log('> Failed to update Course:', err.message)
        res.status(500).json({
            success: false,
            message: "Failed to update Course: " + err.message
        })
    }
}

// delete the course
async function deleteCourse(req, res) {
    try {
        // fetching course Id from body
        const courseId = req.body.courseId;

        // find the course 
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // unenroll students from the Course
        const studentsEnrolled = course.studentEnrolled;
        const unenrolledStudentPromise = User.updateMany(
            { _id: { $in: studentsEnrolled } },
            { $pull: { course: courseId } }
        );

        // Get all sub-section ID's to delete
        const courseSections = course.courseContent;
        const subSectionIds = [];

        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);

            // pushing all sub-section ID's to array
            if (section) {
                subSectionIds.push(...section.subSection);
            }
        }

        // Delete all sub-section and section in parallel
        const deleteSubSectionsPromise = SubSection.deleteMany({ _id: { $in: subSectionIds } });
        const deleteSectionsPromise = Section.deleteMany({ _id: { $in: courseSections } });

        // Delete image folder of related course
        const THUMBNAIL_LOCATION = MEDIA_FOLDER + '/' + course.courseName
        await deleteFolder(THUMBNAIL_LOCATION);

        // Delete coureseVideos of subSection
        const COURSE_LOCATION = VIDEO_FOLDER + '/' + course.courseName
        await deleteFolder(COURSE_LOCATION);

        // Delete the course
        const deleteCoursePromise = Course.findByIdAndDelete(courseId);

        // Wait for all operations to complete
        await Promise.all([
            unenrolledStudentPromise,
            deleteSubSectionsPromise,
            deleteSectionsPromise,
            deleteCoursePromise
        ])

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });

    } catch (err) {
        console.log('> Failed to delete Course: ' + err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete Course: ' + err.message,
        })
    }
}

// update course completed by student 
async function markLectureAsComplete(req, res) {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        if (!courseId || !subSectionId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // Convert IDs to ObjectId
        const userObjId = mongoose.Types.ObjectId.createFromHexString(userId);
        const courseObjId = mongoose.Types.ObjectId.createFromHexString(courseId);
        const subSectionObjId = mongoose.Types.ObjectId.createFromHexString(subSectionId);

        // Find the course progress document
        const progress = await CourseProgress.findOne({
            userId: userObjId,
            courseID: courseObjId,
        });

        // Check if the sub-section ID is already in the completed videos array
        if (progress && progress.completedVideos.includes(subSectionObjId)) {
            return res.status(400).json({
                success: false,
                message: "Lecture already marked as complete",
            });
        }

        // If not already completed, push the sub-section ID into the completed videos array
        await CourseProgress.findOneAndUpdate(
            { userId: userObjId, courseID: courseObjId },
            { $push: { completedVideos: subSectionObjId } }
        );

        return res.status(200).json({
            success: true,
            message: "Lecture marked as complete",
        });

    } catch (err) {
        console.log('> Failed to update Lecture status: ' + err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update Lecture status: ' + err.message,
        });
    }
}


module.exports = {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    updateCourse,
    deleteCourse,
    markLectureAsComplete
}