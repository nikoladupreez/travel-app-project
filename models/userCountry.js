const mongoose = require("mongoose");

const UserCountry = mongoose.model("userCountry", {
    name: String,
    image_URL: String,
    posts: [{type:mongoose.Types.ObjectId, ref:"posts"}]
})

module.exports = UserCountry;