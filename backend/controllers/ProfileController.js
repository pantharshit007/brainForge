const Profile = require("../models/Profile");
const User = require("../models/User");

//update Profile: we aren't creating here because its already created in auth.js/controllers
async function updateProfile(req, res) {
    try {
        //fetch data
        const { gender, dataOfBirth = "", about = "", contactNumber, } = req.body;

        //fetching user Id from the payload send during login
        const userId = req.user.id;

        // validating the user info
        if (!userId || !contactNumber || !gender) {
            return res.status(403).json({
                success: false,
                message: 'Feild missing in Profile.'
            })
        }

        // fetching profile deetails which includes in user Schma
        const userInfo = await User.findById(userId);
        const profileId = userInfo.additonalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile data
        profileDetails.gender = gender;
        profileDetails.dataOfBirth = dataOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        //save the update dB changes
        profileDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated/created successfully',
            data: profileDetails
        })

    } catch (err) {
        console.log("> Error creating profile: " + err.message)
        return res.status(403).json({
            success: false,
            message: "Error creating profile: " + err.message,
        })
    }
}

// delete Profile
async function deleteProfile(req, res) {
    try {
        //fetching profile id
        const userId = req.body.id;

        //validation
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additonalDetails });

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
            data: userDetails,
        })

    } catch (error) {
        console.log("> Failed to fetch all user data" + error.message)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all user data" + error.message,
        })
    }
}

module.exports = {
    updateProfile,
    deleteProfile,
    getAllUsersDetail
}