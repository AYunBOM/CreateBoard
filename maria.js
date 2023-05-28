const maria = require('mysql');

const conn = maria.createConnection( {
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root1234',
    database: 'board',
    dateStrings: 'date'
});

module.exports = conn;