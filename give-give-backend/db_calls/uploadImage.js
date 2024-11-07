const { poolPromise } = require('../config/dbConfig')
const { uploadImageToBlob } = require('../config/blobStorageConfig')

exports.uploadPixelatedImage = async(image, id) => {
    try{
        const url = uploadImageToBlob(image, "pixelimages");
        console.log(url);

        const pool = await poolPromise;

        const result = await pool.request()
            .input('Id', id)
            .input("ImageUrl", url)
            .query("EXEC [dbo].[CreateToyWithImageURL] @ChildId = @Id, @ImageURL = @ImageUrl");

        if(result.recordset.length === 0){
            console.error("failed creating toy item")
            return false;
        } 
        else{
            return true;
        }
        
    }
    
    catch{
        console.error("failed uploading image");
        return false;
    } 
}