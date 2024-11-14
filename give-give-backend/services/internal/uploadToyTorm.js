const { poolPromise } = require('../../config/dbConfig');

exports.uploadToyForm = async(Id, Name, Condition, Material, Tags) => {
    try {
        // Waits for the database connection to be available to execute
        const pool = await poolPromise;

        // Execute procedure to create a pixelated image and a toy with a reference to the pixelated image
        const result = await pool.request()
            .input('Id', Id)
            .input('Name', Name)
            .input('Condition', Condition)
            .input('Material', Material)
            .input('Tags', Tags)
            .query("EXEC [dbo].[UpdateToyWithForm] @Id = @Id, @Name = @Name, @Condition = @ Condition, @Material = @Material,  @Tags = @Tags,");

        // Check if a toy is returned; if not, the procedure failed
        if (result.recordset.length === 0) {
            console.error("Failed updating toy item");
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
