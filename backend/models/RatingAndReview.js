const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingAndReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },

});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);