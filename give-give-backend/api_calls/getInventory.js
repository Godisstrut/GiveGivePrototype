const { poolPromise } = require('../config/dbConfig')

// GET request to try logging in as a user
exports.getInventory = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'No id found in paramterer' });
        }
        
        const pool = await poolPromise;

        //Query to the database
        const result = await pool.request()
        .input('ID', id)
        .query('EXEC [dbo].[GetChildProfileFromId] @ChildId = @ID');

        //Database returns a 400 error incase the id does not return any profile.
        if(result.recordset.length === 0) {
            res.status(400).json({message: 'No profile Found'});
        }
        //If the profile is found return it.
        else{
            res.json(result.recordset);
        }    
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};