const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00177100',
    database: 'learning_base',
    multipleStatements: true
})

module.exports = mysqlConnection;