const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const transporter = require("../../mailer/mailer");
var createError = require('http-errors');
var jwt = require('jsonwebtoken');

app.get("/signup", (req,res)=> {
    res.render("auth/signup");
})

app.post("/signup", (req,res)=> {
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
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        })
                        .then((user)=> {
                            transporter.sendMail({
                                from: '"OnTrack" <Ontrack-ironhack@gmail.com>', // sender address
                                to: user.email, // list of receivers
                                subject: 'Welcome to OnTrack', // Subject line
                                text: 'Welcome!', // plain text body
                                html: `<b>Hello, ${user.firstname}, thank you for signing up.</b>` // html body
                            })
                            .then((info)=> {
                                res.render("auth/signup-confirm");
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
app.get("/signup-confirm", (req,res) => {
    res.render("auth/signup-confirm");
})

app.get("/login", (req,res)=> {
        res.render("auth/login");
    })
app.post("/login", (req,res)=> {
    User.findOne({"username": req.body.username})
        .then((user)=> {
            if(!user) res.json({loggedIn: false})
            else {
                debugger
                bcrypt.compare(req.body.password, user.password, function(err, equal) {
                    if(err) res.send(err);
                    else if(!equal) res.json({loggedIn: false});
                    else {
                        req.session.user = user;
                        res.redirect("/profile");
                    }
                });
            }
        })
        .catch(err=> {
            res.send("error error", err);
        })
})



app.get("/logout", (req, res)=> {
    req.session.destroy();
    res.redirect("/");
})

app.post("/email-availability", (req,res)=> {
    User.findOne({email: req.body.email})
        .then((user)=> {
            if(user)res.json({available: false})
            else res.json({available: true})
        })
})

app.get("/get-reset-link", (req,res)=> {
    res.render("auth/reset-link")
})

app.post("/get-reset-link", (req,res)=> {
    console.log(req.body);
    if (!req.body){
        res.render("auth/get-reset-link", {errorMessage: `Please fill complete one of the fields.`});
    }
    else if (req.body.username)
    {
        User.findOne({username:req.body.username})
        .then((user) =>{
            jwt.sign({email: user.email}, process.env.jwtSecret, { expiresIn: 60 * 60 }, function(err, token){
                transporter.sendMail({
                    from: '"OnTrack" <Ontrack-ironhack@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject: 'Reset your password ✔', // Subject line
                    text: 'Reset password', // plain text body
                    html: `<b>Password reset for OnTrack: <a href="http://localhost:3000/reset-password?token=${token}">Reset your password</a></b>` // html body
                })
                .then((result)=> {
                    res.send("Email send")
                })
                .catch((err)=> {
                    res.next(createError(400))
                })
            })  
        })
        .catch((err)=> {
            res.next(createError(400))
        })
    }
    else if (req.body.email){
        
    }



   
})

app.get("/reset-username", (req,res)=> {
    res.render("auth/reset-username", {token: req.query.token})
})

app.get("/reset-password", (req,res)=> {
    res.render("auth/reset-password", {token: req.query.token})
})

app.post("/reset-password", (req,res)=> {
    jwt.verify(req.body.token, process.env.jwtSecret, function(err, token){
        if(err) res.send(err)
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err) res.send(err)
            else {
                User.findOneAndUpdate({email: token.email}, {password: hash})
                .then((result)=> {
                    res.redirect("/login")
                })
                .catch((err)=> {
                    res.send(err)
                })
            }
        })
    })
})

module.exports = app;
