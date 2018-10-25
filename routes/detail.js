const _ = require('lodash');
const axios = require('axios');

const data = require('./data');
var articles = data.articles;

var getArticle = (req, res) => {
    var id = parseInt(req.params.id, 10);
    var article = _.find(articles, ['id', id]);
    res.render('detail', {
        pageTitle: 'Resource Detail',
        googlemapapikey: process.env.GoogleMapsAPIKey,
        article: article
    });
};

module.exports = {
    getArticle
};