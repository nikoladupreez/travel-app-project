var express = require('express');
var app = express();

/* GET country page. */
app.get('/', function(req, res, next) {
  res.render('blog-page');
});

/* ADD blog post on page. */
app.get('/add-blog', function(req, res, next) {
  res.render('blog-add');
});

/* edit post on page. */
app.get('/edit-blog', function(req, res, next) {
  res.render('blog-edit');
});

/* ADD gallery on page. */
app.get('/add-gallery', function(req, res, next) {
  res.render('gallery-add');
});

/* edit gallery on page. */
app.get('/edit-gallery', function(req, res, next) {
  res.render('gallery-edit');
});

module.exports = app;