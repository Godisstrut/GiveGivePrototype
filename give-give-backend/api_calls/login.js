const { poolPromise } = require('../config/dbConfig')

// GET request to try logging in as a user
exports.login = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'No name found in paramterer' });
        }
        
        const pool = await poolPromise;

        //Query to the database
        const result = await pool.request()
        .input('InputName', name)
        .query('EXEC [dbo].[GetChildIdFromName] @Name = @InputName');

        //Database returns a 400 error incase the username was not found as a row in the database.
        if(result.recordset.length === 0) {
            res.status(400).json({message: 'Invalid username'});
        }
        //If an id is found return it.
        else{
            res.json(result.recordset);
        }    
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};