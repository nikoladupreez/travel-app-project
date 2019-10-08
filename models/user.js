const mongoose = require("mongoose");

const User = mongoose.model("user", {
    username: {type: String, required: [true, "Username"]},
    password: {type: String, required: [true, "Password"]},
    email: {
        type: String, 
        required: [true, "Please enter your email!"]
    },
    name: {type: String, required: [true, "Please enter your name!"]}
})

module.exports = User;