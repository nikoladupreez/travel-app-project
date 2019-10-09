var express = require('express');
var app = express();

/* GET edit page. */
app.get('/', function(req, res, next) {
  res.render('editProfile');
});

module.exports = app;