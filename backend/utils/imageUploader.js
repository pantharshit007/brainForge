const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };

    if (height) options.height = height;
    if (quality) {
        options.quality = quality
        // transformation: [{ quality: quality }] // Apply quality setting 
    }

    // set resolution of images automatically
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);

}
