const { poolPromise } = require('../../config/dbConfig');

exports.uploadToyForm = async (Id, Name, Condition, Material, Tags) => {
    console.log('Vi är i uploadtoyform')
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('Id', Id)
            .input('Name', Name)
            .input('Condition', Condition)
            .input('Material', Material)
            .input('Tags', Tags)
            .query(`
                EXEC [dbo].[UpdateToyWithForm] 
                @Id = @Id, 
                @Name = @Name, 
                @Condition = @Condition, 
                @Material = @Material, 
                @Tags = @Tags
            `);

            return result;

        } catch (error) {
            console.error("Failed uploading toy:", error);
            throw error;
    }
};
