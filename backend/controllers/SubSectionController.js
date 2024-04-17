const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();
const VIDEO_FOLDER = process.env.VIDEO_FOLDER

// Section Creation
async function createSubSection(req, res) {

    try {
        //fetching data
        const { sectionId, title, description } = req.body;

        //extracting file data
        const video = req.files.video;

        //validate input data
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }

        // upload the video on cloudinary.
        const uploadedVideoDetails = await uploadImageToCloudinary(video, VIDEO_FOLDER);

        //create a new Sub-Section in dB
        const newSubSection = await SubSection.create({
            title,
            description,
            timeDuration: `${uploadedVideoDetails.duration}`,
            videoUrl: uploadedVideoDetails.secure_url
        });

        // update sub section ID in section Schema
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: { subSection: newSubSection._id }
            },
            { new: true },
        ).populate('subSection')

        return res.status(201).json({
            success: true,
            message: 'Sub-Section Created successfully',
            updatedSection: updatedSection  //ToRemove later
        })

    } catch (err) {
        console.log("> Error Creating Sub-Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Creating Sub-Section: " + err.message
        })
    }
}

// Section Updation
async function updateSubSection(req, res) {
    try {
        // fetching required input data
        const { sectionId, subSectionId, title, description } = req.body;
        // const video = req.files.video || req.files;  //produces error if not provided

        //validate input data
        if (!subSectionId) {
            return res.status(404).json({
                success: false,
                message: 'No Sub-Section ID found.',
            })
        }

        const subSectionDetails = await SubSection.findById(subSectionId)
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: 'No Sub-Section found.',
            })
        }
        //check if title is updated
        if (title !== undefined) {
            subSectionDetails.title = title
        }
        // check if description is updated
        if (description !== undefined) {
            subSectionDetails.description = description
        }
        //check if video got an update?
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const updateVideoDetails = await uploadImageToCloudinary(video, VIDEO_FOLDER);

            subSectionDetails.videoUrl = updateVideoDetails.secure_url;
            subSectionDetails.timeDuration = `${updateVideoDetails.duration}`
        }

        await subSectionDetails.save();

        //section update
        // const updatedSection = await Section.findById(sectionId).populate(
        //     "subSection"
        //   )

        return res.status(200).json({
            success: true,
            message: 'Sub-Section updated successfully',
            data: subSectionDetails
        })

    } catch (err) {
        console.log("> Error Updating Sub-Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Updating Sub-Section: " + err.message
        })
    }
}

// Sub Section Deletion
async function deleteSubSection(req, res) {
    try {
        //section ID: from URl using params
        const { sectionId, subSectionId } = req.body

        if (!sectionId || !subSectionId) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        //deleting the Sub-section from section dB
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $pull: { subSection: subSectionId } }
        ).populate("subSection");

        // deleting sub-section from dB
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success: true,
            message: 'Sub-Section deleted successfully',
            sectionData: updatedSection     //ToRemove later
        })

    } catch (err) {
        console.log("> Error Deleting Sub-Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Deleting Sub-Section: " + err.message
        })
    }
}


module.exports = {
    createSubSection,
    updateSubSection,
    deleteSubSection,
}