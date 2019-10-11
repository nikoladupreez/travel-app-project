var express = require('express');
var app = express();
const UserCountry = require("../models/userCountry");
const Country = require("../models/country");
const User = require("../models/user");
const mongoose = require('mongoose');

/* GET country-blog page. */
app.get('/:id', function(req, res, next) {
  User.findById(req.session.user._id)
    .then((country)

    )


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