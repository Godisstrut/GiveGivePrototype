const sql = require('mssql');

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

module.exports = {
    sql,
    poolPromise,
};