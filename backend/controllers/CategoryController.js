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

// fetch courses based on different category: category Page
async function categoryPageDetails(req, res) {
    try {
        //fetcj category Id
        const categoryId = req.body.categoryId;

        if (!categoryId) {
            return res.status(403).json({
                success: false,
                message: 'No category specified.'
            })
        }

        //get courses for specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();

        //validate 
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'No Data Available',
            })
        }

        // get courses for other categories
        const otherCategories = await Category.find({
            _id: { $ne: categoryId },     // not equal to categoryId
        })
            .populate({
                path: 'courses',
                match: { status: "Published" },
                populate: "ratingAndReviews"
            })
            .exec();

        // get top selling course: TODO: re-think how this works
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        console.log("mostSellingCourses:", mostSellingCourses)

        return res.status(200).json({
            success: true,
            message: 'Category Data has been fetched.',
            data: {
                selectedCategory,
                otherCategories,
                mostSellingCourses
            }
        })

    } catch (err) {
        console.log('> Failed to fetch category data: ' + err.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch category data: ' + err.message
        })
    }
}

module.exports = {
    createCategory,
    getAllCategorys,
    categoryPageDetails
}