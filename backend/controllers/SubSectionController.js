const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const Course = require('../models/Course');

require('dotenv').config();
const VIDEO_FOLDER = process.env.VIDEO_FOLDER

// Sub-Section Creation
async function createSubSection(req, res) {

    try {
        //fetching data
        const { sectionId, title, description, courseId } = req.body;

        //extracting file data
        const video = req.files.video;

        //validate input data
        if (!sectionId || !title || !description || !video || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //Finding the courseName
        const courseDetail = await Course.findByIdAndUpdate(
            courseId,
            { $inc: { totalLectures: 1 } },
            { new: true },
        )

        if (!courseDetail) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const courseName = courseDetail.courseName;

        // updating the video upload path and tag: brainForge/VIDEO_FOLDER/SubSection/courseName/sectionId
        const SUBSECTION_LOCATION = VIDEO_FOLDER + '/' + courseName + '/' + sectionId
        const tag = [courseName]

        // upload the video on cloudinary.
        let uploadedVideoDetails = await uploadImageToCloudinary(video, SUBSECTION_LOCATION, null, null, tag);

        if (!uploadedVideoDetails?.success) {
            return res.status(404).json({
                success: false,
                message: uploadedVideoDetails?.message
            })
        }

        uploadedVideoDetails = uploadedVideoDetails.result

        //create a new Sub-Section in dB
        const newSubSection = await SubSection.create({
            title,
            description,
            timeDuration: `${uploadedVideoDetails.duration}`,
            videoUrl: uploadedVideoDetails?.secure_url
        });

        // Update the corresponding section with the newly created sub-section and update the total time duration
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: { subSection: newSubSection._id },
                $inc: { totalSectionDuration: uploadedVideoDetails.duration }  //total += new
            },
            { new: true },
        ).populate('subSection')

        return res.status(201).json({
            success: true,
            message: 'Sub-Section Created successfully',
            updatedSection: updatedSection
        })

    } catch (err) {
        console.log("> Error Creating Sub-Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Creating Sub-Section: " + err.message
        })
    }
}

// Sub-Section Updation
async function updateSubSection(req, res) {
    try {
        // fetching required input data
        const { sectionId, subSectionId, title, description, courseName } = req.body;
        // const video = req.files.video || req.files;  //produces error if not provided

        //validate input data
        if (!subSectionId || !sectionId) {
            return res.status(404).json({
                success: false,
                message: 'No Sub-Section/Section ID found.',
            })
        }

        const subSectionDetails = await SubSection.findById(subSectionId)
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: 'No Sub-Section found.',
            })
        }

        // Store old duration
        const oldDuration = parseFloat(subSectionDetails.timeDuration) || 0;

        // updating the video upload path
        const SUBSECTION_LOCATION = VIDEO_FOLDER + '/' + courseName + '/' + sectionId

        //check if title is updated
        if (title !== undefined) {
            subSectionDetails.title = title
        }
        // check if description is updated
        if (description !== undefined) {
            subSectionDetails.description = description
        }
        //check if video got an update?
        let newDuration = oldDuration;
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            let updateVideoDetails = await uploadImageToCloudinary(video, SUBSECTION_LOCATION);

            if (!updateVideoDetails?.success) {
                return res.status(404).json({
                    success: false,
                    message: updateVideoDetails?.message
                })
            }

            updateVideoDetails = updateVideoDetails.result

            subSectionDetails.videoUrl = updateVideoDetails?.secure_url;
            subSectionDetails.timeDuration = `${updateVideoDetails?.duration}`
            newDuration = parseFloat(updateVideoDetails?.duration);
        }

        await subSectionDetails.save();

        // update Section: Update the totalSectionDuration of the section only if the video was updated
        let updatedSection;
        if (newDuration === oldDuration) {
            updatedSection = await Section.findById(sectionId)
                .populate("subSection")
        } else {
            const durationDifference = newDuration - oldDuration;
            updatedSection = await Section.findByIdAndUpdate(
                sectionId,
                { $inc: { totalSectionDuration: durationDifference } },
                { new: true }
            ).populate('subSection')
        }

        return res.status(200).json({
            success: true,
            message: 'Sub-Section updated successfully',
            updatedSection: updatedSection,
        })

    } catch (err) {
        console.log("> Error Updating Sub-Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Updating Sub-Section: " + err.message
        })
    }
}

// Sub-Sub Section Deletion
async function deleteSubSection(req, res) {
    try {
        //section ID: from URl using params
        const { sectionId, subSectionId, courseId } = req.body

        if (!sectionId || !subSectionId) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        //deleting the Sub-section from section dB
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $pull: { subSection: subSectionId } },
            { new: true }
        ).populate('subSection');

        if (!updatedSection) {
            console.log('> Section Not Found: ' + sectionId);
            return res.status(404).json({
                success: false,
                message: 'Section Not Found!'
            })
        }

        // deleting sub-section from dB
        const updatedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        // update the totalLectures
        await Course.findByIdAndUpdate(
            courseId,
            { $inc: { totalLectures: -1 } },
        )

        if (!updatedSubSection) {
            console.log('> Sub-Section Not Found: ' + sectionId);
            return res.status(404).json({
                success: false,
                message: 'Sub-Section Not Found!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Sub-Section deleted successfully',
            updatedSection: updatedSection
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