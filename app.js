const express = require('express');
const maria = require('./maria');
var http = require('http');
var path = require('path');
var app = express();
const port = 8080;

// router 설정
const indexRouter = require('./index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//view 경로 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

/* GET home page. */
app.get('/', function(req, res, next) {
    var sql = "SELECT * from post";
    
    maria.query(sql, (err, rows) => {
        if(err){console.log(err);}
        else{
            const arr = [];
            
            for(var i = rows.length-1; i>=0; i--){
                arr.push([rows[i].userID, rows[i].title, rows[i].username, rows[i].todate]);
            }
            console.log(arr);
            res.render('main.ejs', {data: arr});
        }
    });
  }); //localhost:8080으로 메인페이지 열기
  
app.get('/write', function(req, res) {
    res.render('write', { title: 'Express' });
}); //메인 페이지에서 게시글 작성 페이지로 이동

app.get('/post', function(req, res) {
    res.render('main', {title: 'Express'});
});//게시글 작성 페이지에서 메인 페이지로 이동

app.post('/post', function(req, res) {
    var username = req.body.username;
    var title = req.body.title;
    var detail = req.body.detail;
    var params = [username, title, detail];
    
    var sql = "INSERT INTO post(username, title, detail) VALUES(?,?,?)";
    
    maria.query(sql, params, (err, rows) => {
        if(err){console.log(err);}
        else{
        }
    });
    res.redirect('/')
});//게시글 작성 페이지에서 입력 받은 값을 받아와 db에 저장

exports.pagingServerSide = (curpage, pageSize) => {
    const DEFAULT_START_PAGE = 1;
    const DEFAULT_PAGE_SIZE = 10;
    
    if(!curpage || curpage<=0) {curpage = DEFAULT_START_PAGE;}
    if(!pageSize || pageSize <=0) {pageSize = DEFAULT_PAGE_SIZE;}

    let result = {
        offset: (curpage-1) * Number(pageSize),
        limit: Number(pageSize)
    }
    return result;
}



// 연결 종료
//maria.end();