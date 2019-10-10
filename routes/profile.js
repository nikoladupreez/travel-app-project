var express = require('express');
var app = express();

/* GET profile page. */
app.get('/', function(req, res, next) {
  debugger
  let arr = ["dg", "hfkl", 'sdfdas', 'sdfs', 'asf']
  res.render('profile', {arr});
});

/* GET edit page. */
app.get('/edit', function(req, res, next) {
  res.render('profile-edit');
});

/* ADD country on page. */
app.get('/add-country', function(req, res, next) {
  res.render('country-add');
});

/* EDIT country on page. */
app.get('/edit-country', function(req, res, next) {
  res.render('country-edit');
});


module.exports = app;
  