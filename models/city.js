const mongoose = require("mongoose");

const City = mongoose.model("cities", {
    country: [String]
})

module.exports = City;