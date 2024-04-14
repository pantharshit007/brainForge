const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: {
        type: String,
        trim: true,
        required: true,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RatingAndReview',
    }],
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    studentEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    instructions: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    }


});

module.exports = mongoose.model("Course", courseSchema);