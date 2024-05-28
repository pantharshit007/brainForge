const { deleteImageCloudinary, deleteContentByTag, deleteFolder, } = require("./deleteContent");

exports.test = async () => {
    try {
        // Deleting a specific image
        // await deleteImageCloudinary('FolderApp/Mediamodifier-Design_lgbjwy');
        // console.log('Specific image deleted');

        // // Deleting resources by tag
        // await deleteContentByTag('dp');
        // console.log('Content with tag "dp" deleted');

        // Deleting a folder's resources
        await deleteFolder('UserDP');
        console.log('>>> Folder resources deleted');

    } catch (err) {
        console.error('Error in deletion process:', err.message);
    }
};
