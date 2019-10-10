var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var session = require("express-session");
var app = express();
var hbs = require('hbs');
require("dotenv").config();
hbs.registerPartials(__dirname + '/views/partials');

app.locals.config = {
  host: process.env.host
}
console.log(process.env.host)
app.use(session({
  secret: 'keyboard cat',
  expires: {maxAge: 6000},
  resave: true,
  saveUninitialized: true
}))

mongoose.connect("mongodb://localhost/ontrack",  { useUnifiedTopology: true , useNewUrlParser: true})
  .then(()=> {
    console.log("connected to mongodb");
  })
  .catch((err)=> {
    console.log("Not connected to mongodb error", err);
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/profile", (req,res,next)=> {
  if(!req.session.user) res.redirect("/login")
  else next()
})

app.use("/", (req,res,next)=> {
  if(req.session.user) res.locals.user = req.session.user;
  next()
})

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth/auth'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
app.use('/profile', require('./routes/profile'));
app.use('/profile/country', require('./routes/country'));
app.use('/explorer', require('./routes/explorer'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
// render the error page
  res.status(err.status || 500);
  res.render('error');
});

// //app listener
// let port = 3000;
// app.listen(port, () => console.log(`OnTrack project is running on port ${port}!`));

module.exports = app;