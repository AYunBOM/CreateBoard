const maria = require('mysql');

const conn = maria.createConnection( {
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root1234',
    database: 'board',
    dateStrings: 'date'
});
conn.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('mariaDB connecting...')
    }
});

module.exports = conn;