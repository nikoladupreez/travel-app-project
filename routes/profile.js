var express = require('express');
const uploadCloud   = require('./config/cloudinary.js');
const mongoose = require('mongoose');
var app = express();

const UserCountry = require("../models/userCountry");
const Country = require("../models/country");
const User = require("../models/user");


/* GET profile page. */
app.get('/', function(req, res, next) {
  User.findById(userInfo.id)
      .populate({
          path: 'countries',
          populate: {
          path: 'country'
        }
      })
      .then((user) => {
        res.render('profile', {user: user});
      })
      .catch((err) => {
        res.send(err.message);
      })
});

/* GET profile page. */
app.get('/traveler/:id', function(req, res, next) {
  User.findById(req.params.id)
  .then((user) => {
    res.render('profile', {user});
  })
  .catch((err) => {
    res.send(err.message);
  })
});

/* GET edit page. */
app.post('/edit', function(req, res) {

});

/* ADD country on page. */
app.get('/add-country', function(req, res) {
  Country.find({})
  .then((countries) => {
    res.render('country-add',{userInfo, countries});
  })
  .catch((err)=> {
    res.send(err.message)
  })
});

app.post('/add-country', uploadCloud.single('image'), function(req, res){
  UserCountry.create({
    country: mongoose.Types.ObjectId(req.body.countryId),
    image_URL: req.file.url
  })
  .then((userCountry)=>{
    User.update({_id: userInfo._id}, {$push: {countries: userCountry}})
    .then((user) => {
        res.redirect(`/profile`);
    })
    .catch((err) => {
      res.send(err.message);
    })
  })
  .catch((err)=> {
    res.send(err.message);
  })
});

/* EDIT country on page. */
app.get('/edit-country/:id', function(req, res) {
  UserCountry.findById(req.params.id)
  .populate('country')
  .then((userCountry) => {
      Country.find({})
      .then((countries) => {
        res.render('country-edit', {userCountry, countries});
      })
      .catch((err)=> {
        res.send(err.message);
      })
  })
  .catch((err) => {
      res.send(err.message);
  })
});

app.post('/edit-country/:id', uploadCloud.single('image'), (req, res) => {
    let updateUserCountry = {
                              country: req.body.countryId
                            };
    if(req.file) {
      updateUserCountry.image_URL = req.file.url;
    }
    
    UserCountry.findOneAndUpdate( {_id: req.params.id}, updateUserCountry )
    .then((userCountry) => {
        res.redirect('/profile');
    })
    .catch((err) => {
        res.send(err);
    })
});

//DELETE country on page 
app.get('/delete-country/:id', (req, res) => {
  UserCountry.findByIdAndRemove(req.params.id)
  .then((userCountry) => {     
      res.redirect("/profile");
  })
  .catch((err) => {
      res.send(err);
  })
});

module.exports = app;
  