const Profile = require("../models/Profile");
const User = require("../models/User");
const { deleteFolder } = require("../utils/deleteContent");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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

// * getEnrolledCourses
// * instructorDashboard

module.exports = {
    updateProfile,
    deleteProfile,
    getAllUsersDetail,
    updateProfilePicture
}