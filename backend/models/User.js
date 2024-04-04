const mongoose = require('mongoose');
const Schema = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    //these 2 are newly added fields
    confirmPassword: {
        type: String,
        required: true,
    },
    // upto here
    accountType: {
        type: String,
        required: true,
        enum: ['Admin', 'Student', 'Instructor'],
    },
    additonalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },],
    image: {
        type: String,
        required: true,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseProgress",
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }

});

module.exports = mongoose.model("User", userSchema);