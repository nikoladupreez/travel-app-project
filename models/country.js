const mongoose = require("mongoose");

const Country = mongoose.model("countries", {
    name: String,
    cities: [{type: mongoose.Types.ObjectId, ref: "cities"}]
    
});

module.exports = Country;