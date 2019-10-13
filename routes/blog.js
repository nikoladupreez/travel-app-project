var express = require('express');
var app = express();
var express = require('express');
const uploadCloud   = require('./config/cloudinary.js');
const UserCountry = require("../models/userCountry");
const Country = require("../models/country");
const User = require("../models/user");
const Post = require('../models/post');
const City = require('../models/city');
const mongoose = require('mongoose');

/* GET country-blog page. */
app.get('/:id', function(req, res, next) {
  UserCountry.findById(req.params.id)
    .populate('country')
    .populate({
      path: 'posts',
      populate: {
                  path: 'city'
                }
    })
    .then((userCountry) => {
      userCountry.posts.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
      })
      res.render('post-page/post-page', {userCountry});
    })
    .catch((err) => {
      res.send(err.message);
    })
});

/* ADD blog post on page. */
app.get('/:id/add-blog', function(req, res, next) {
  UserCountry.findById(req.params.id)
      .populate({
        path: 'country',
        populate: {
                    path: 'cities'
                  }
      })
      .then((userCountry) => {
        const cities = userCountry.country.cities;
        res.render('post-page/blog-add', {cities, userCountry})
      })
      .catch((err)=> {
        res.send(err.message)
      })
});

app.post('/:id/add-blog', uploadCloud.single('image'), function(req, res, next) {
  Post.create({
        type: 'blog',
        blog:   true,
        image_URL: req.file.url,
        title: req.body.title,
        city: mongoose.Types.ObjectId(req.body.cityId),
        date: req.body.date,
        story: req.body.story
  })
  .then((post) => {
      return UserCountry.update({_id: req.params.id}, {$push: {posts: post}})
  })
  .then((userCountry) => {
      res.redirect(`/profile/country/${req.params.id}`)
  })
  .catch((err)=> {
    res.send(err.message)
  })
});


/* edit post on page. */
app.get('/:id/edit-blog/:postId', function(req, res, next) {
  Post.findById(req.params.postId)
      .populate('city')
      .then((post) => {
          UserCountry.findById(req.params.id)
          .populate({
            path: 'country',
            populate: {
                        path: 'cities'
                      }
          })
          .then((userCountry) => {
            const cities = userCountry.country.cities;
            res.render('post-page/blog-edit', {post, cities, userCountry});
          })
          .catch((err)=> {
            res.send(err.message);
          })
      })
      .catch((err) => {
        res.send(err.message);
    })
});

app.post('/:id/edit-blog/:postId', uploadCloud.single('image'), (req, res) => {
  let updateBlog = {
                    title: req.body.title,
                    city: req.body.cityId,
                    date: req.body.date,
                    story: req.body.story
                   }
  if(req.file) {
      updateBlog.image_URL = req.file.url;
  }

  Post.findOneAndUpdate( {_id: req.params.postId}, updateBlog )
      .then((post) => {
        res.redirect(`/profile/country/${req.params.id}`)
      })
      .catch((err) => {
        res.send(err);
    })         
});

app.get('/:id/delete-blog/:postId', (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
  .then((blog) => {     
      res.redirect(`/profile/country/${req.params.id}`);
  })
  .catch((err) => {
      res.send(err);
  })
});

/* ADD gallery on page. */
app.get('/:id/add-gallery', function(req, res, next) {
  UserCountry.findById(req.params.id)
  .populate({
    path: 'country',
    populate: {
                path: 'cities'
              }
  })
  .then((userCountry) => {
    const cities = userCountry.country.cities;
    res.render('post-page/gallery-add', {cities, userCountry})
  })
  .catch((err)=> {
    res.send(err.message)
  })
});

app.post('/:id/add-gallery', uploadCloud.single('image'), function(req, res, next) {
  Post.create({
                type: 'gallery',
                blog:   false,
                image_URL: req.file.url,
                title: req.body.title,
                city: mongoose.Types.ObjectId(req.body.cityId),
                date: req.body.date,
      })
      .then((post) => {
          return UserCountry.update({_id: req.params.id}, {$push: {posts: post}})
      })
      .then((userCountry) => {
          res.redirect(`/profile/country/${req.params.id}`)
      })
      .catch((err)=> {
          res.send(err.message)
      })
});


/* edit gallery on page. */
app.get('/:id/edit-gallery/:postId', function(req, res, next) {
  Post.findById(req.params.postId)
  .populate('city')
  .then((post) => {
      UserCountry.findById(req.params.id)
      .populate({
        path: 'country',
        populate: {
                    path: 'cities'
                  }
      })
      .then((userCountry) => {
        const cities = userCountry.country.cities;
        res.render('post-page/gallery-edit', {post, cities, userCountry});
      })
      .catch((err)=> {
        res.send(err.message);
      })
  })
  .catch((err) => {
    res.send(err.message);
})
});

app.post('/:id/edit-gallery/:postId', uploadCloud.single('image'), (req, res) => {
    let updateBlog = {
                      title: req.body.title,
                      city: req.body.cityId,
                      date: req.body.date,
                      story: req.body.story
                     }
    if(req.file) {
    updateBlog.image_URL = req.file.url;
    }

    Post.findOneAndUpdate( {_id: req.params.postId}, updateBlog )
        .then((post) => {
          res.redirect(`/profile/country/${req.params.id}`)
        })
        .catch((err) => {
          res.send(err);
        })         
})

app.get('/:id/delete-gallery/:postId', (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
  .then((gallery) => {     
      res.redirect(`/profile/country/${req.params.id}`);
  })
  .catch((err) => {
      res.send(err);
  })
});



module.exports = app;