var express = require('express');
var app = express();

/* GET home page. */
app.get('/', function(req, res, next) {
  console.log("reached")
  res.render('index');
});

module.exports = app;