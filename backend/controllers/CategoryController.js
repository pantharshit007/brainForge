const Category = require("../models/Category")

// creating a new Category based on subject
async function createCategory(req, res) {
    try {
        const { name, description } = req.body;

        // input data validation
        if (!name || !description) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        await Category.create({ name, description });

        return res.status(200).json({
            success: true,
            message: 'Category created successfully.',
        })

    } catch (err) {
        console.log('> Error while creating Category: ' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Error while creating Category: ' + err.message
        })
    }
}

// fetching all the category present
async function getAllCategorys(req, res) {
    try {
        const allCategorys = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: 'All tags fetched successfully',
            AllCategorys: allCategorys
        });

    } catch (err) {
        console.log('> Error while fetching all Category' + err.message)
        return res.status(404).json({
            success: false,
            message: 'Error while fetching all Category' + err.message
        })
    }
}

module.exports = {
    createCategory,
    getAllCategorys
}