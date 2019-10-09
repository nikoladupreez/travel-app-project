var express = require('express');
var app = express();

/* GET about page. */
app.get('/', function(req, res, next) {
  res.render('about');
});

module.exports = app;