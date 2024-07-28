const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { deleteFolder } = require('../utils/deleteContent');

require('dotenv').config();
const VIDEO_FOLDER = process.env.VIDEO_FOLDER

// Section Creation
async function createSection(req, res) {
    try {
        //fetching data
        const sectionName = req.body.sectionName;
        const courseId = req.body.courseId;

        //validate input data
        if (!sectionName || !courseId) {
            return res.status(404).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //create a new Section in dB
        const newSection = await Section.create({ sectionName: sectionName })

        // update section ID in Course Schema
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { courseContent: newSection._id }
            },
            { new: true }
        ).populate({
            //populating both section & subsection in updatedCourse
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        if (!updatedCourse) {
            return res.status(400).send({
                success: false,
                message: 'Course Not Found',
            })
        }

        return res.status(201).json({
            success: true,
            message: 'Section Created successfully',
            updatedCourse: updatedCourse
        })

    } catch (err) {
        console.log("> Error Creating Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Creating Section: " + err.message
        })
    }
}

// Section Updation
async function updateSection(req, res) {
    try {
        // fetching required input data
        const { sectionName, sectionId, courseId } = req.body;

        //validate input data
        if (!sectionName || !sectionId || !courseId) {
            return res.status(404).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //section update
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            { sectionName },
            { new: true }
        )

        //update course
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: { path: "subSection" }
            }).exec();

        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            updatedCourse: updatedCourse
        })

    } catch (err) {
        console.log("> Error Updating Section: " + err.message)
        return res.status(401).json({
            success: false,
            message: "Error Updating Section: " + err.message
        })
    }
}

// Section Deletion
async function deleteSection(req, res) {
    try {
        //section ID: from URL using params/body
        const { sectionId, courseId, courseName } = req.body

        if (!courseId || !sectionId || !courseName) {
            return res.status(404).json({
                success: false,
                message: 'Course ID and Section ID are required.'
            })
        }

        // Finding and deleting the section along with its sub-sections
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found."
            });
        }

        // Deleting Sub-sections
        if (section.subSection.length !== 0) {
            await SubSection.deleteMany({ _id: { $in: section.subSection } });

            // Deleting the lecture videos in section
            const SECTION_LOCATION = VIDEO_FOLDER + '/' + courseName + '/' + sectionId
            await deleteFolder(SECTION_LOCATION);
        }

        // Calculate the number of lectures in the section
        const lectureInSection = section.subSection.length;

        // Updating the course to remove the section and update totalLectures
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: { courseContent: sectionId },
                $inc: { totalLectures: -lectureInSection }
            },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        // Deleting Sections
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
            updatedCourse
        })

    } catch (err) {
        console.log("> Error Deleting Section: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Error Deleting Section: " + err.message
        })
    }
}


module.exports = {
    createSection,
    updateSection,
    deleteSection,
}