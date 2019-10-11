var express = require('express');
var app = express();

/* GET country-blog page. */
app.get('/:id', function(req, res, next) {
  res.render('blog-page');
});

/* ADD blog post on page. */
app.get('/:id/add-blog', function(req, res, next) {
  res.render('blog-add');
});

/* edit post on page. */
app.get('/:id/edit-blog', function(req, res, next) {
  res.render('blog-edit');
});

/* ADD gallery on page. */
app.get('/:id/add-gallery', function(req, res, next) {
  res.render('gallery-add');
});

/* edit gallery on page. */
app.get('/:id/edit-gallery', function(req, res, next) {
  res.render('gallery-edit');
});

module.exports = app;