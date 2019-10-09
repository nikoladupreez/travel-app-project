const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const transporter = require("../../mailer/mailer");
var createError = require('http-errors');
var jwt = require('jsonwebtoken');


//sign up
router.get("/signup", (req,res)=> {
    res.render("auth/signup");
})

router.post("/signup", (req,res)=> {
    User.findOne({$or: [{username: req.body.username, email: req.body.email}]})
        .then((user)=> {
            if(user) res.send("User with this email or username already exists")
            else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err) res.send(err.message)
                    else {
                        User.create({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            name: req.body.firstname
                        })
                        .then((user)=> {
                            transporter.sendMail({
                                from: '"Fred Foo 👻" <IronhackDemo2@gmail.com>', // sender address
                                to: user.email, // list of receivers
                                subject: 'Welcome to OnTrack', // Subject line
                                text: 'Welcome!', // plain text body
                                html: `<b>Hello, ${user.firstname}, thank you for signing up.</b>` // html body
                            })
                            .then((info)=> {
                                res.redirect("/auth/login")
                            })
                            .catch((error)=> {
                                res.send("ERROR ERROR")
                            })
                        })
                        .catch((err)=> {
                            res.send(err.message)
                        })
                    }
                })
            }
        })
    })   

//login
router.get("/login", (req,res)=> {
    res.render("auth/login");
})

//reset
router.get("/get-reset-link", (req,res)=> {
    res.render("auth/reset-part1");
})

router.get("/reset", (req,res)=> {
    res.render("auth/reset-part2");
})

//logout


module.exports = router;