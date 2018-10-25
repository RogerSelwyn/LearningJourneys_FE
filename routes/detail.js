const _ = require('lodash');
const axios = require('axios');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GoogleMapsAPIKey,
    Promise: Promise
});

const googlemaps = require('../utilities/googlemaps');

var getArticle = async (req, res) => {
    var id = parseInt(req.params.id, 10);
    try {
        const resourcePromise = axios.get(process.env.RESTAPIURL+ 'resources/' + id +'/');
        const averageRatingPromise = axios.get(process.env.RESTAPIURL+ 'resources/' + id + '/get_average_rating/');
        const ratingPromise = axios.get(process.env.RESTAPIURL+ 'resources/' + id + '/get_average_rating/');
        const feedbackPromise = axios.get(process.env.RESTAPIURL+ 'feedback/?resource' + id);
        const [resourceData, averageRatingData, feedbackData] = await Promise.all([resourcePromise, averageRatingPromise, feedbackPromise]);
        var resource = resourceData.data;
        var averageRating = averageRatingData.data;
        var feedback = feedbackData.data;
    }  catch (e) {
        console.error(e); 
    };
    // resource.rating = ratingData.data.value;
    resource.averageRating = averageRating.average_rating;
    resource.feedback = feedback;
    console.log(resource.feedback);
    var response = null;
    if (resource.resource_location != null) {
        response = await googlemaps.geocode({address:resource.resource_location.location});
    }
    if (response != null) {
        resource.lat = response[0].geometry.location.lat;
        resource.lng = response[0].geometry.location.lng;
    }

    res.render('detail', {
        pageTitle: 'Resource Detail',
        googlemapapikey: process.env.GoogleMapsAPIKey,
        resource: resource
    });
};

module.exports = {
    getArticle
};