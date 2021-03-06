const mongoose = require("mongoose");

const User = mongoose.model("user", {
    username: {type: String, required: [true, "Username"]},
    password: {type: String, required: [true, "Password"]},
    email: {
        type: String, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, "Please enter your email!"]
    },
    firstname: {type: String, required: [true, "Please enter your first name!"]},
    lastname : {type: String, required: [true, "Please enter your last name!"]},
    countries: [{type: mongoose.Types.ObjectId, ref: "userCountry"}],
    cities: [{type: mongoose.Types.ObjectId, ref: "cities"}],
    about: String,
    image_URL: String
})

module.exports = User;