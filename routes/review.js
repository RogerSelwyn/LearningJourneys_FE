const _ = require('lodash');
const axios = require('axios');

var getReview = async (req, res, next) => {
    var id = parseInt(req.params.id, 10);
    try {
        const resourcePromise = axios.get(process.env.RESTAPIURL+ 'resources/' + id +'/');
        const averageRatingPromise = axios.get(process.env.RESTAPIURL+ 'resources/' + id + '/get_average_rating/');
        const feedbackPromise = axios.get(process.env.RESTAPIURL+ 'feedback/?resource' + id);
        const [resourceData, averageRatingData, feedbackData] = await Promise.all([resourcePromise, averageRatingPromise, feedbackPromise]);
        var resource = resourceData.data;
        var averageRating = averageRatingData.data;
        var feedback = feedbackData.data;
    }  catch (e) {
        console.error(e); 
    };
    resource.averageRating = averageRating.average_rating;
    resource.feedback = feedback;

    res.render('review', {
        pageTitle: 'review',
        resource: resource
    });
};


module.exports = {
    getReview
};