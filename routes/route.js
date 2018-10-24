const hbs = require('hbs');

var home = (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page'
    });
};
var readmore = (req, res) => {
        res.render('readmore', {
        pageTitle: 'Resource Detail',
        mapapikey: process.env.GoogleMapsAPIKey
    });
};

exports.routes = {
    home,
    readmore
}