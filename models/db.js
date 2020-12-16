const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass_',
    database: 'learning_base',
    multipleStatements: true
})

module.exports = mysqlConnection;
