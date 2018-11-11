const _ = require('lodash');
const axios = require('axios');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GoogleMapsAPIKey,
    Promise: Promise
});

const googlemaps = require('../utilities/googlemaps');

var getDetail = async (req, res) => {
    var id = parseInt(req.params.id, 10);
    try {
        const resourcePromise = axios.get(process.env.RESTAPIURL+ 'resources/' + id +'/');
        const feedbackPromise = axios.get(process.env.RESTAPIURL+ 'feedback_full/?resource=' + id);
        const [resourceData, feedbackData] = await Promise.all([resourcePromise, feedbackPromise]);
        var resource = resourceData.data;
        var feedback = feedbackData.data;
    }  catch (e) {
        console.error(e); 
    };
    try {
        var ratingData = await axios.get(process.env.RESTAPIURL+ 'resources/' + id + '/get_average_rating/');
        resource.averageRating = Math.round(ratingData.data.average_rating*2)/2;
    } catch (e) {
        console.error(e); 
    };

    resource.feedback = feedback;

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
    getDetail
};