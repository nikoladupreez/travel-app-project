var express = require('express');
var app = express();

/* GET explorer page. */
app.get('/', function(req, res, next) {
  res.render('explorer');
});

module.exports = app;