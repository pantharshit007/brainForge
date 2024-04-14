const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSectionSchema = new Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    videoUrl: {
        tyoe: String,
    },

});

module.exports = mongoose.model("SubSection", subSectionSchema);