const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { deleteFolder } = require("../utils/deleteContent");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secConverter");

require('dotenv').config();
const USER_PFP = process.env.USER_PFP

//update Profile: we aren't creating here because its already created in auth.js/controllers
async function updateProfile(req, res) {

    try {
        //fetch data
        const { firstName, lastName, gender, dateOfBirth = "", about = "", contactNumber, } = req.body;

        //fetching user Id from the payload send during login
        const userId = req.user.id;

        // TODO: update validation with zod on only mobile if provided: don't find any use as of now or forgotten.
        // validating the user info 
        // if (!userId || !contactNumber || !gender) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Feild missing in Profile.'
        //     })
        // }

        // fetching profile deetails which includes in user Schma
        const userInfo = await User.findById(userId);
        const profileId = userInfo.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // Validate gender: Male | Female | Others | Prefer not ot say | Transgender
        if (!["Male", "Female", "Transgender", "Prefer not to say", "Other"].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid gender value. Gender must be one of: Male, Female, Others',
            });
        }

        // update user data
        userInfo.firstName = firstName;
        userInfo.lastName = lastName;

        // update profile data
        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        //save the update dB changes
        userInfo.save();
        profileDetails.save();

        // updated user data
        const updatedUserInfo = await User.findById(userId)
            .populate("additionalDetails").exec()

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUserInfo    //ToRemove later: Not possible we are using this
        })

    } catch (err) {
        console.log("> Error updating profile: " + err.message)
        return res.status(403).json({
            success: false,
            message: "Error updating profile: " + err.message,
        })
    }
}

// delete Profile
async function deleteProfile(req, res) {
    try {
        //fetching profile id
        const userId = req.user.id;

        //validation
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // removing all the images of Display Picture from cloudinary
        const email = userDetails.email
        const username = email.split('@')[0]
        const PFP_LOCATION = USER_PFP + '/@' + username

        await deleteFolder(PFP_LOCATION)

        //TODO: before removing user remove user from all the enrolled Course
        // we can use courseId from user.courses within a for loop to remove user from respective courses.

        // delete respective user connected to profile
        await User.findByIdAndDelete({ _id: userId });

        return res.status(200).json({
            success: true,
            message: 'Profile deleted successfully',
        })

    } catch (err) {
        console.log("> Error deleting profile failed: " + err.message)
        return res.status(403).json({
            success: false,
            message: "Error deleting profile failed: " + err.message,
        })
    }
}

// get all user details
async function getAllUsersDetail(req, res) {
    try {
        const userId = req.user.id
        const userDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec()

        return res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,  //ToRemove later
        })

    } catch (error) {
        console.log("> Failed to fetch all user data" + error.message)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all user data" + error.message,
        })
    }
}

// update user profile picture
async function updateProfilePicture(req, res) {
    try {
        // receive image from body-file
        const displayPicture = req.files.displayPicture

        if (!displayPicture) {
            console.log('> No display picture found')
            return res.status(404).json({
                success: false,
                message: 'No display picture found'
            })
        }
        const userId = req.user.id

        const userInfo = await User.findById(userId)
        const email = userInfo.email
        const username = email.split('@')[0]
        const PFP_LOCATION = USER_PFP + '/@' + username

        // validate picture to be jpg, jpeg, png: NOT NEEDED NOW SINCE WE ARE CHECKING FROM FE
        //// const supportingType = ['jpg', 'png', 'jpeg', 'gif'];
        //// const fileType = displayPicture.name.split('.')[1].toLowerCase();
        //
        //// if (!supportingType.includes(fileType)) {
        ////     return res.status(404).json({
        ////         success: false,
        ////         message: 'File type not supported.'
        ////     })
        //// }

        // upload image to cloudinary 
        const tag = ['dp']
        const uploadedImg = await uploadImageToCloudinary(displayPicture, PFP_LOCATION, 1000, 1000, tag)

        // update User schema with new Img url
        const updateProfileImg = await User.findByIdAndUpdate(
            { _id: userId },
            { image: uploadedImg.secure_url },
            { new: true },
        )

        // return response
        return res.status(200).json({
            success: true,
            message: 'Profile Picture updated!',
            data: updateProfileImg  //TODO: ToRemove later
        })

    } catch (err) {
        console.log('> Failed to upload PFP: ' + err.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to upload PFP: ' + err.message,
        })
    }
}

// fetch user enrolled courses: OPTIMISED without timeDuration
async function getEnrolledCourses(req, res) {
    try {
        // fetching user details
        const userId = req.user.id

        // User->Course->courseContent[section]->subSection
        const userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                select: "courseName thumbnail courseDescription",   // choose only specific rows
                populate: {
                    path: "courseContent",
                    select: "subSection"    // only require subSection
                }
            })
            .lean();    // return plain JavaScript objects instead of Mongoose document

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'No User Found',
            });
        }

        // calculation progress of course
        const currentProgress = userDetails.courses.map(async (course) => {
            const courseProgressCount = await CourseProgress.findOne({
                courseID: course._id,
                userId: userId
            }).select("completedVideos").lean();

            course.courseProgress = courseProgressCount ? courseProgressCount?.completedVideos.length : 0;

            return course
        })

        userDetails.courses = await Promise.all(currentProgress)

        return res.json({
            success: true,
            message: 'Enrolled Courses',
            data: userDetails.courses
        })

    } catch (err) {
        console.log('> Failed to fetch Enrolled Courses:', err)
        return res.status(500).json({
            success: false,
            message: 'Failed fetching Enrolled Courses: ' + err.message,
        })

    }
}

// fetch Instructor's Dashboard Data
async function instructorDashboard(req, res) {
    try {
        // user:instructor id
        const instructorId = req.user.id

        // fetching courses created by the instructor
        const courseDetails = await Course.find({ instructor: instructorId });

        //fetching course details with total students enrolled and revenue generated
        const courseData = courseDetails.map((course) => {
            const totalStudentEnrolled = course.studentEnrolled.length;
            const totalRevenue = totalStudentEnrolled * course.price

            // create a new object which encompasses all the necessary only fields
            const courseStats = {
                _id: course.id,
                courseName: course.name,
                courseDescription: course.description,
                // new properties
                studentsEnrolled: totalStudentEnrolled,
                revenueGenerated: totalRevenue,
            }

            return courseStats;
        })

        return res.status(200).json({
            success: true,
            message: 'Instructor Dashboard Data',
            courses: courseData
        })

    } catch (err) {
        console.log('> Failed to fetch Instructors Dashboard data:', err.data);
        return res.status(500).json({
            success: false,
            message: 'Failed fetching Instructor Data: ' + err.message
        })
    }
}

// optimized fetch user enrolled courses + totalDuration Calculation
// async function getEnrolledCourses(req, res) {
//     try {
//         const userId = req.user.id;

//         // Fetch user courses and course content with necessary fields
//         let userDetails = await User.findOne({ _id: userId })
//             .populate({
//                 path: "courses",
//                 select: "courseName thumbnail courseDescription",
//                 populate: {
//                     path: "courseContent",
//                     select: "subSection",
//                     populate: {
//                         path: "subSection",
//                         select: "timeDuration"
//                     }
//                 }
//             })
//             .lean();    // converting to plain js object

//         if (!userDetails) {
//             return res.status(400).json({
//                 success: false,
//                 message: `No user found`
//             });
//         }

//         // Calculate total duration and progress for each course
//         const coursePromises = userDetails.courses.map(async (course) => {
//             let totalDurationInSeconds = 0;
//             let subSectionCount = 0;

//             course.courseContent.forEach(section => {
//                 section.subSection.forEach(subSection => {
//                     // adding subSection's video duration
//                     totalDurationInSeconds += parseInt(subSection.timeDuration);
//                 });
//                 // adding total subSection count
//                 subSectionCount += section.subSection.length;
//             });

//             // converting sec's to min/hr
//             course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

//             const courseProgress = await CourseProgress.findOne({
//                 courseID: course._id,
//                 userId: userId
//             }).select("completedVideos").lean();

//             const completedCount = courseProgress ? courseProgress.completedVideos.length : 0;
//             // adding progressPercentage matric with 2 decimal point
//             course.progressPercentage = subSectionCount > 0
//                 ? Math.round((completedCount / subSectionCount) * 10000) / 100
//                 : 100;

//             return course;
//         });

//         // promise all to handle multiple asynchronous operations in parallel
//         userDetails.courses = await Promise.all(coursePromises);

//         return res.status(200).json({
//             success: true,
//             data: userDetails.courses
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

module.exports = {
    updateProfile,
    deleteProfile,
    getAllUsersDetail,
    updateProfilePicture,
    getEnrolledCourses,
    instructorDashboard
}