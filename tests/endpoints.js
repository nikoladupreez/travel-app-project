var newman = require('newman'); // require newman in your project
var mongoose = require("mongoose")

var countries = require("../countries.json")
var Country = require("../models/country")
var City = require("../models/city")
var User = require("../models/user")
var mongoose = require("mongoose")

mongoose.connect()
  .then(()=> {
    console.log("connected to mongodb");
    return Promise.all([Country.remove({}), City.remove({}), User.remove({})])
  })
  .then(()=> {
      console.log("Collections dropped")
      return seedPromise()
  })
  .then(()=> {
    newman.run({
        collection: require('./ontrack.postman_collection.json'),
        reporters: 'cli'
    }, function (err) {
        if (err) { throw err; }
        console.log('collection run complete!');
    });    
  })
  .catch((err)=> {
    console.log("Not connected to mongodb error", err);
  })


  var seedPromise = new Promise(function(resolve, reject){
    var countryPromises = []
    Object.keys(countries).forEach((key) => {
        countryPromises.push(Country.create({name: key})
            .then((country)=> {
                var cities = []
                countries[key].forEach((city)=> {
                    cities.push(City.create({name: city, country: country._id}))
                })
                return Promise.all(cities)
            })
            .then((cities)=> {
                var cityIds = cities.map((city)=> city._id)
                return Country.findByIdAndUpdate(cities[0].country, {cities: cityIds})
            })
        )
    });
    
    Promise.all(countryPromises)
        .then(()=> {
            console.log("DB populated")
            resolve()
        })
        .catch((err)=> {
            console.log("DB seeding error", err)
            reject()
        })
  })
