const sql = require('mssql');

// Database configuration credentials (neeeds to be removed when uploading to server)
const config = {
    user: 'GGxMAU.DEV.132',
    password: 'xWI301)gh8mc',
    server: 'sqlgivegive.database.windows.net', 
    database: 'GiveGiveDatabase',
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