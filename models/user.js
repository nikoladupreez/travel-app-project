const mongoose = require("mongoose");

const User = mongoose.model("user", {
    username: {type: String, required: [true, "Username"]},
    password: {type: String, required: [true, "Password"]},
    email: {
        type: String, 
        required: [true, "Please enter your email!"]
    },
    firstname: {type: String, required: [true, "Please enter your first name!"]},
    lastname : {type: String, required: [true, "Please enter your last name!"]}
})

module.exports = User;