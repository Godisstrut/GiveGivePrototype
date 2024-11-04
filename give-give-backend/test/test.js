const { poolPromise } = require('../config/dbConfig')

// GET request to fetch all parents
exports.getAllParents = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Parent');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// POST request to create a new parent
exports.createParent = async (req, res) => {
    
};