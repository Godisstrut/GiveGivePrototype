const sql = require('mssql');
require('dotenv').config();
// Database configuration credentials (neeeds to be removed when uploading to server)
const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER, 
    database: process.env.DATABASE_NAME,
    options: {
        encrypt: true, 
        enableArithAbort: true
    }
};

// Connecting to database making it possible to call the database from other classes
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to Azure SQL Database');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ', err);
        process.exit(1);
    });

// Exports the poolPromise for use of other classes
module.exports = {
    sql,
    poolPromise,
};