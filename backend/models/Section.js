const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    sectionName: {
        type: String,
    },
    subSection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection',
        required: true,
    }],
    totalSectionDuration: {
        type: Number,
        default: 0,
    },


});

module.exports = mongoose.model("Section", sectionSchema);