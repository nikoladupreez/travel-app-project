var express = require('express');
var app = express();

/* ADD post page. */
app.get('/', function(req, res, next) {
  res.render('addPost');
});

module.exports = app;