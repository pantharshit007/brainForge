const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.uploadImageToCloudinary = async (file, folder, height, quality, tag) => {
    try {
        const options = { folder };

        if (tag) options.tags = tag;
        if (height) options.height = height;
        if (quality) {
            options.quality = quality
            // transformation: [{ quality: quality }] // Apply quality setting 
        }

        // set resolution of images automatically: video/image/raw
        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);

    } catch (err) {
        console.log('> Failed to upload image:', err.message);
    }
}
