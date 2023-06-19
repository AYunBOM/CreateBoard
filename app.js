const express = require('express');
const maria = require('./maria');
var http = require('http');
var path = require('path');
var app = express();
const port = 8080;
var page_num = 5;

// router 설정
const indexRouter = require('./index');
app.use('/', indexRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//view 경로 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

/* GET home page. */
app.get('/', function(req, res, next) {
    res.redirect('/1');
}); //localhost:8080으로 메인페이지 열기

app.get('/write', function(req, res) {
    res.render('write', { title: 'Express' });
}); //메인 페이지에서 게시글 작성 페이지로 이동

app.get('/:pageNum', function(req, res, next) {
    var pageNum = req.params.pageNum;
    if (pageNum < 1){
        pageNum = 1;
    }
    if (isNaN(req.query.page_num)==false) {
        page_num = parseInt(req.query.page_num)
        if (page_num <1){
            page_num = 5;
        }
        pageNum = 1;
    }

    maria.query("SELECT username, title, detail, date_format(todate,'%Y-%m-%d %H:%i') todate, userID FROM post;", (err, rows) => {
        if(err){console.log(err);}
        else{
            const arr = [];
            for(var i = rows.length-1; i>=0; i--){
                arr.push([rows[i].userID, rows[i].title, rows[i].username, rows[i].todate]);
            }
            res.render('main.ejs', {data: arr, page: pageNum, length: rows.length-1, page_num: page_num, pass:true});
        }
    });
}); //localhost:8080으로 메인페이지 열기
  
app.post('/write', function(req, res) {
    var username = req.body.username;
    var title = req.body.title;
    var detail = req.body.detail;
    var params = [username, title, detail];
    
    maria.query("INSERT INTO post(username, title, detail) VALUES(?,?,?)", params, (err, rows) => {
        if(err){console.log(err);}
    });
    res.redirect('/1')
});//게시글 작성 페이지에서 입력 받은 값을 받아와 db에 저장


app.get('/read/:userID',function(req,res){
    maria.query("select * from post where userID=?", req.params.userID, function(err,rows){
        if(err){console.error(err)}
        else {
            maria.query("SELECT commname, comm, date_format(todate,'%Y-%m-%d %H:%i'), todate, commID FROM commboard WHERE userID=?",req.params.userID, (err, rows2) => {
                if(err){console.log(err);}
                else{
                    res.render('read', {arr: rows2, rows: rows, length: rows2.length});
                }
            });
        }
    });
});//게시글 별 댓글 등록하기

app.get("/read/delete/:userID", function (req, res) {
    maria.query('delete from commboard where userID = ?', req.params.userID, (err, rows) => {
        maria.query('delete from post where userID = ?', req.params.userID, (err, rows) => {
            res.redirect('/1');
        });
    });
});//게시글 삭제&해당 게시글에 등록되어있는 댓글도 삭제

app.get("/read/delete2/:commID", function (req, res) {
    maria.query('select userID from commboard where commID = ?', req.params.commID, (err, userID) => {
        maria.query('delete from commboard where commID = ?', req.params.commID, (err, rows) => {
            res.redirect('/read/'+userID[0].userID);
        });
    });
});//게시글 별 댓글 삭제

app.post("/read/:userID", function (req, res) {
    var commname = req.body.commname;
    var comm = req.body.comm;
    const userID = req.body.userID;
    var params = [commname, comm, userID];

    maria.query("INSERT INTO commboard(commname, comm, userID) VALUES(?,?,?)", params, (err, rows) => {
        if(err){console.log(err);}
        res.redirect('/read/'+userID);
    });
});//댓글 상세정보 가지고 오기

// 연결 종료
//maria.end();