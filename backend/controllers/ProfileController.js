const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require('dotenv').config();
const USER_PFP = process.env.USER_PFP

//update Profile: we aren't creating here because its already created in auth.js/controllers
async function updateProfile(req, res) {
    try {
        //fetch data
        const { gender, dateOfBirth = "", about = "", contactNumber, } = req.body;

        //fetching user Id from the payload send during login
        const userId = req.user.id;

        // TODO: update validation with zod on only mobile if provided
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

        // Validate gender: Male | Female | Others
        if (!['Male', 'Female', 'Others'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid gender value. Gender must be one of: Male, Female, Others',
            });
        }

        // update profile data
        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        //save the update dB changes
        profileDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: profileDetails    //ToRemove later
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
        const userId = req.user.id

        // validate picture to be jpg, jpeg, png
        const supportingType = ['jpg', 'png', 'jpeg'];
        const fileType = displayPicture.name.split('.')[1].toLowerCase();

        if (!supportingType.includes(fileType)) {
            return res.status(404).json({
                success: false,
                message: 'File type not supported.'
            })
        }

        // upload image to cloudinary 
        const uploadedImg = await uploadImageToCloudinary(displayPicture, USER_PFP, 1000, 1000)

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
            data: updateProfileImg  //ToRemove later
        })

    } catch (err) {
        console.log('> Failer to upload PFP: ' + err.message)
        return res.status(500).json({
            success: false,
            message: 'Failer to upload PFP: ' + err.message,
        })
    }
}

module.exports = {
    updateProfile,
    deleteProfile,
    getAllUsersDetail,
    updateProfilePicture
}