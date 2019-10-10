var express = require('express');
var app = express();

/* GET profile page. */
app.get('/:id', function(req, res, next) {
  console.log(userInfo);
   let user = userInfo;
  res.render('profile', {user});
});



/* GET edit page. */
app.get('/:id/edit', function(req, res, next) {
  res.render('profile-edit');
});

/* ADD country on page. */
app.get('/:id/add-country', function(req, res, next) {
  res.render('country-add');
});

/* EDIT country on page. */
app.get('/:id/edit-country', function(req, res, next) {
  res.render('country-edit');
});


module.exports = app;
  