const mongoose = require("mongoose");

const UserCountry = mongoose.model("userCountry", {
    country: {type:mongoose.Types.ObjectId, ref:"countries"},
    image_URL: String,
    posts: [{type:mongoose.Types.ObjectId, ref:"posts"}]
})

module.exports = UserCountry;