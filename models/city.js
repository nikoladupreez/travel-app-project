const mongoose = require("mongoose");

const City = mongoose.model("cities", {
    name: String,
    country: {type: mongoose.Types.ObjectId, ref: "countries"}
})

module.exports = City;