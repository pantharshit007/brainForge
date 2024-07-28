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

        // Check if the file is an image or a video : file object has a property called mimetype
        const isImage = file.mimetype.startsWith('image');
        const isVideo = file.mimetype.startsWith('video');

        let maxFileSizeInMB = 5; // Maximum file size in MB
        if (isImage) {
            maxFileSizeInMB = 5;
        } else if (isVideo) {
            maxFileSizeInMB = 10;
        }

        if (!checkSize(file, maxFileSizeInMB)) {
            throw new Error('File size exceeds maximum Limit of ' + maxFileSizeInMB + ' MB')
        }

        // set resolution of images automatically: video/image/raw
        options.resource_type = "auto";

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        // this method doesn't provide path, but its faster and duplication not possible
        // return await cloudinary.uploader.upload_large(file.tempFilePath, options);

        return { success: true, result }; // Return success as true along with the result

    } catch (err) {
        console.log('> Failed to upload:', err.message);
        const errorMessage = { success: false, message: err.message };
        return errorMessage
    }
}

function checkSize(file, maxFileSizeInMB) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
    return fileSizeInMB < maxFileSizeInMB;
}