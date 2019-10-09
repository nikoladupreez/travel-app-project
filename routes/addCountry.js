var express = require('express');
var app = express();

/* ADD Country page. */
app.get('/', function(req, res, next) {
  res.render('addCountry');
});

module.exports = app;