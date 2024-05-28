const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.deleteImageCloudinary = async (public_id, type = 'upload', resource_type) => {
    try {
        // invalidate: to remove cached content
        // resource_type: 'video'  //for video files
        const options = { type, invalidate: true };

        if (resource_type) {
            options.resource_type = resource_type;
        }

        return await cloudinary.uploader.destroy(public_id, options)

    } catch (err) {
        console.log('> Failed to delete Image from Cloudinary:', err.message);
        throw err;
    }
}

// deleting content based of tags: dp/ courseName
exports.deleteContentByTag = async (tag, resource_type) => {
    try {
        if (!resource_type) {
            await cloudinary.api.delete_resources_by_tag(tag)
        } else {
            await cloudinary.api.delete_resources_by_tag(tag, { resource_type: 'image' }) //doesn't require
            await cloudinary.api.delete_resources_by_tag(tag, { resource_type: 'video' })
        }
        return

    } catch (err) {
        console.log('Error deleting resources by tag: ' + err.message);
        throw err;
    }
}

// Deleting Resources in a Folder
exports.deleteFolder = async (folder) => {
    try {
        // Delete all resources within the folder
        const result = await cloudinary.api.delete_resources_by_prefix(folder);

        // Delete the empty folder
        const folderResult = await cloudinary.api.delete_folder(folder);

        return { resources: result, folder: folderResult };

    } catch (err) {
        throw err;
    }
}


// https://cloudinary.com/documentation/deleting_assets_tutorial

// Deleting Multiple Resources
// exports.deleteMany = async (files) => {
//     await cloudinary.api.delete_resources(['source'])
// }


