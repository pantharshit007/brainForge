const Course = require('../models/Course');
const Section = require('../models/Section');

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
            { courseId },
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

        return res.status(201).json({
            success: true,
            message: 'Section Created successfully',
            courseData: updatedCourse
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
        const { sectionName, sectionId } = req.body;

        //validate input data
        if (!sectionName || !sectionId) {
            return res.status(404).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //section update
        const updateSection = await Section.findByIdAndUpdate(
            { sectionId }, { sectionName }, { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            data: updateSection
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
        //section ID: from URl using params
        const { sectionId } = req.params

        // TODO: delete the section id reference form courseSchema
        //deleting the section from dB
        await Section.findByIdAndDelete(sectionId)

        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully'
        })

    } catch (err) {
        console.log("> Error Deleting Section: " + err.message)
        return res.status(401).json({
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