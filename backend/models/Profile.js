const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    gender: {
        type: String,
    },
    dataOfBirth: {
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