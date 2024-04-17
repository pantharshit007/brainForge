const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'], // only 3 choices
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true,
    }
});

module.exports = mongoose.model("Profile", profileSchema);