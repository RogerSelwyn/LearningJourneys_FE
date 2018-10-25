const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GoogleMapsAPIKey,
    Promise: Promise
});


var geocode = (inputAddress) => {
    var response =  googleMapsClient.geocode(inputAddress)
        .asPromise()
        .then((response) => {
            return response.json.results;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
    return response;
};

  module.exports = {
      geocode
  }