const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

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
        // TODO: Add Picture update functionality also: hint subSection Update
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
            { _id: sectionId }, { sectionName }, { new: true }
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
        //section ID: from URL using params/body
        const { sectionId, courseId } = req.body

        if (!courseId || !sectionId) {
            return res.status(404).json({
                success: false,
                message: 'No course ID/ section ID specified.'
            })
        }

        // validate section Id: unnecessary db call I think!
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }

        //deleting the section from Course:dB      
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        })

        //delete sub-section under section:dB: NOT REQUIRED AUTO REMOVAL 
        /*await SubSection.deleteMany({
            _id: {
                $in: section.subSection
            }
        })*/

        //deleting the section from Section:dB 
        await Section.findByIdAndDelete(sectionId)

        //find the updated course and return 
        /*const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();*/

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