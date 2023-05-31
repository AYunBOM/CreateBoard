const express = require('express');
const maria = require('./maria');
var http = require('http');
var app = express();
const indexRouter = require('./index');
const port = 8080;

app.use('/', indexRouter);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

app.post('/post', function(req, res) {
    var username = req.body.username;
    var title = req.body.title;
    var detail = req.body.detail;
     
    var sql = "INSERT INTO post(username, title, detail) VALUES(?,?,?)";
    var params = [username, title, detail];

    console.log(params);
    
    maria.query(sql, params, (err, rows) => {
        if(err){
            console.log(err);
        } else{
            console.log(rows.username);
        }
        });
    });

// 연결 종료
//maria.end();