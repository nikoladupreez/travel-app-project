const mongoose = require("mongoose");

const Post = mongoose.model("posts", {
    type: String,
    blog: Boolean,
    image_URL: {type:String, required:[true, "Please enter an image"]},
    title: {type:String, required:[true, "Please enter a Title"]},
    city: {type: mongoose.Types.ObjectId, ref: "cities"},
    date: {type:String, required:[true, "Please enter a date of your trip!"]},
    story: String
})

module.exports = Post;