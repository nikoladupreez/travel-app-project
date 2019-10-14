var express = require('express');
var app = express();
const transporter = require("../mailer/mailer");

/* GET contact page. */
app.get('/', function(req, res, next) {
  res.render('contact');
});

app.post('/', function (req, res, next){
  transporter.sendMail({
    from: '"OnTrack" <Ontrack-ironhack@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Contact', // Subject line
    text: 'Hello!', // plain text body
    html: `<b>Hello, ${req.body.name}, thank you for contacting us.</b>` // html body
})
.then((info)=> {
  transporter.sendMail({
    from: '"OnTrack" <Ontrack-ironhack@gmail.com>', // sender address
    to: '"OnTrack" <Ontrack-ironhack@gmail.com>', // list of receivers
    subject: `Contact from ${req.body.name}`, // Subject line
    text: 'Hello!', // plain text body
    html: `<b>Customer ${req.body.name} has the following concern: <br> ${req.body.note}</b>` // html body
  })
  .then((info)=>{
    res.redirect("/");
  })
  .catch((err)=> {
    res.send(err.message);
  })
})
.catch((err)=> {
    res.send(err.message);

})
})

module.exports = app;