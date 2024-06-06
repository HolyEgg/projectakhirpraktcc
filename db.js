const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host : '34.128.87.32',
    user : 'root',
    password : '',
    database : ''
});

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConn;
