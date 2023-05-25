const express = require('express');

var app = express();

const maria = require('./maria');
maria.connect();

function printName()  {
    const name = document.getElementById('name').value;
    document.getElementById("result").innerText = name;
  }