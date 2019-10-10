var express = require('express');
const UserCountry = require("../models/userCountry");
const Country = require("../models/country");
var app = express();


/* GET profile page. */
app.get('/:id', function(req, res, next) {
  let user = userInfo;
  res.render('profile', {user});
});



/* GET edit page. */
app.get('/:id/edit', function(req, res) {
  res.render('profile-edit');
});

/* ADD country on page. */
app.get('/:id/add-country', function(req, res) {
  console.log(req)
  Country.find({})
  .then((countries) => {
    res.render('country-add',{userInfo, countries});
  })
  .catch((err)=> {
    res.send(err.message)
})
});

app.post('/:id/add-country', function(req, res){
  debugger;
  UserCountry.create({
    name: mongoose.Types.ObjectId(req.body.country-name),
    image_URL: req.body.image
  })
  .then((country)=>{
    debugger;
    userInfo.countries.push(country);
    res.redirect(`/profile/${userInfo._id}`);
  } )
  .catch((err)=> {
    res.send(err.message)
})
});

/* EDIT country on page. */
app.get('/:id/edit-country', function(req, res, next) {
  res.render('country-edit');
});


module.exports = app;
  