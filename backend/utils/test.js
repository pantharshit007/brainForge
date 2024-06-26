const { deleteImageCloudinary, deleteContentByTag, deleteFolder, } = require("./deleteContent");

exports.test = async () => {
    try {
        // Deleting a specific image
        await deleteImageCloudinary('FolderApp/[file_name]');
        console.log('Specific image deleted');

        // Deleting resources by tag
        await deleteContentByTag('dp');
        console.log('Content with tag "dp" deleted');

        // Deleting a folder's resources + folder
        await deleteFolder('UserDP');
        console.log('Folder resources deleted');

    } catch (err) {
        console.error('Error in deletion process:', err.message);
    }
};
