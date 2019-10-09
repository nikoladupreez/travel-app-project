var express = require('express');
var app = express();

/* GET country page. */
app.get('/country', function(req, res, next) {
  res.render('country');
});

/* ADD post page. */
app.get('/country/add-post', function(req, res, next) {
  res.render('post-add');
});

module.exports = app;