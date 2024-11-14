const { poolPromise } = require('../../config/dbConfig');
const { uploadImageToBlob } = require('../../config/blobStorageConfig');

exports.uploadPixelatedImage = async(image, id, Title, Tags, Age_recommendation, Price_recommendation) => {
    try {
        // Upload the image to blob storage and retrieve the URL
        const url = await uploadImageToBlob(image, "pixelimages");
        console.log(url);

        if (!url) {
            console.error("Image URL is empty");
            return null;
        }

        // Waits for the database connection to be available to execute
        const pool = await poolPromise;

        // Execute procedure to create a pixelated image and a toy with a reference to the pixelated image
        const result = await pool.request()
            .input('Id', id)
            .input('ImageUrl', url)
            .input('Name', Title)
            .input('Tags', Tags)
            .input('Age_range', Age_recommendation)
            .input('Price_range', Price_recommendation)
            .query("EXEC [dbo].[InsertInitialToyWithImageURL] @ChildId = @Id, @ImageURL = @ImageUrl, @Name = @Name, @Tags = @Tags, @Age_range = @Age_range, @Price_range = @Price_range");

        // Check if a toy is returned; if not, the procedure failed
        if (result.recordset.length === 0) {
            console.error("Failed creating toy item");
            return null;
        } else {
            return result.recordset[0].Id;
        }
    } catch (error) {
        // Catch block with error parameter to provide specific error details
        console.error("Failed uploading image:", error);
        return false;
    }
};
