var express = require('express');
var app = express();

/* GET country page. */
app.get('/', function(req, res, next) {
  res.render('country');
});

// /* ADD post page. */
// app.get('/add-post', function(req, res, next) {
//   res.render('post-add');
// });

module.exports = app;