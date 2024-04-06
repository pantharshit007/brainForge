const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require('dotenv').config();
const MEDIA_FOLDER = process.env.MEDIA_FOLDER


//create Courses
async function createCourse(req, res) {
    try {
        // fetching data from body
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

        //fetch the thumbnail Image
        const thumbnail = req.files.thumbnail;

        // validate the input data
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category) {
            return res.status(403).json({
                success: false,
                message: 'Please fill all the required fields.'
            })
        }

        //fetching Instructo's data: userId is the same as instructorID since user is Instructore here
        const userId = req.user.id;
        const instructorDetails = await User.findById({ userId });
        console.log('Instructor Details: ' + instructorDetails);
        //TODO: to check if both id's are same or not 

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
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, MEDIA_FOLDER);

        //creating entry for a new Course in dB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage,
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
            data: newCourse
        });


    } catch (err) {
        console.log('> Error while creating Course' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Error while creating course' + err.message
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
            data: allCourses
        })

    } catch (err) {
        console.log('> Failed to fetch all courses: ' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Failed to fetch all courses: ' + err.message
        })
    }
}


module.exports = {
    createCourse,
    getAllCourses
}