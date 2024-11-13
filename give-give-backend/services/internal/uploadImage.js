const { poolPromise } = require('../../config/dbConfig')
const { uploadImageToBlob } = require('../../config/blobStorageConfig')

exports.uploadPixelatedImage = async(image, id, Title, Tags, Age_recommendation, Price_recommendation) => {
    try{
        // Uploads the image to the blob database and saves the url to create a reference to a toy
        const url = await uploadImageToBlob(image, "pixelimages");
        console.log(url);

        //Error handling for if URL is empty

        // Waits for the database connection to be available to execute
        const pool = await poolPromise;

        // Execute procedure to create a pixelated image and a toy with a reference to the pixelated image
        const result = await pool.request()
            .input('Id', id)
            .input("ImageUrl", url)
            .input("Name", Title)
            .input("Tags", Tags)
            .input("Age_range", Age_recommendation)
            .input("Price_range", Price_recommendation)
            .query("EXEC [dbo].[InsertInitialToyWithImageURL] @ChildId = @Id, @ImageURL = @ImageUrl, @Name = @Name, @Tags = @Tags, @Age_range = @Age range, @Price_range = @Price_range");

        // If no toy is returned the procedure failed and will return a false
        if(result.recordset.length === 0){
            console.error("failed creating toy item")
            return null;
        } 

        // If a toy is present in the return then it is successfully created and will return true
        else{
            return result.recordset[0].Id;
        }
        
    }
    
    // Return false if the function fails anywhere
    catch{
        console.error("failed uploading image");
        return false;
    } 
}