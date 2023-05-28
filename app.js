const express = require('express');

var app = express();

const maria = require('./maria');

maria.connect(function(err){
    if (err) throw err;
    console.log("You are connected");
});

// const info = {
//     "name": '영주',
//     "title": '공주병',
//     "detail" : '말기인 듯 하다.',
//     "ID" : '101'
// };

$title = $_POST["title"];
$name =$_POST["name"];
$detail =$_POST["detail"];

var sql = "INSERT INTO test(username, title, detail) VALUES('$name','$title','$detail',?)";
//var params = [info['name'], info['title'], info['detail'], info['ID']]
maria.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else{
        console.log(rows.name);
    }
});

// 연결 종료
maria.end();