const { poolPromise } = require('../config/dbConfig')
const { uploadImageToBlob } = require('../config/blobStorageConfig')

exports.uploadPixelatedImage = async(image, id) => {
    try{
        // Uploads the image to the blob database and saves the url to create a reference to a toy
        const url = uploadImageToBlob(image, "pixelimages");
        console.log(url);

        //Error handling for if URL is empty

        // Waits for the database connection to be available to execute
        const pool = await poolPromise;

        // Execute procedure to create a pixelated image and a toy with a reference to the pixelated image
        const result = await pool.request()
            .input('Id', id)
            .input("ImageUrl", url)
            .query("EXEC [dbo].[CreateToyWithImageURL] @ChildId = @Id, @ImageURL = @ImageUrl");

        // If no toy is returned the procedure failed and will return a false
        if(result.recordset.length === 0){
            console.error("failed creating toy item")
            return false;
        } 

        // If a toy is present in the return then it is successfully created and will return true
        else{
            return true;
        }
        
    }
    
    // Return false if the function fails anywhere
    catch{
        console.error("failed uploading image");
        return false;
    } 
}