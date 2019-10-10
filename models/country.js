const mongoose = require("mongoose");

const Country = mongoose.model("country", {
    countries: String,
    image_URL: String,
    cities: [{type: mongoose.Types.ObjectId, ref: "cities"}]
    
});

module.exports = Country;