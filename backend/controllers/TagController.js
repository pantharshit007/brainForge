const Tag = require("../models/Tags")

// creating a new Tag based on subject
async function createTag(req, res) {
    try {
        const { name, description } = req.body;

        // input data validation
        if (!name || !description) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        await Tag.create({ name, description });

        return res.status(200).json({
            success: true,
            message: 'Tag created successfully.',
        })

    } catch (err) {
        console.log('> Error while creating Tag: ' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Error while creating Tag: ' + err.message
        })
    }
}

// fetching all the tags present
async function getAllTags(req, res) {
    try {
        const allTags = await Tag.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: 'All tags fetched successfully',
            AllTags: allTags
        });

    } catch (err) {
        console.log('> Error while fetching all Tag' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Error while fetching all Tag' + err.message
        })
    }
}

module.exports = {
    createTag,
    showAllTags
}