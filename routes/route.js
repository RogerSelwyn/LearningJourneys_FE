const hbs = require('hbs');

var home = (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page'
    });
};
var readmore = (req, res) => {
        res.render('readmore', {
        pageTitle: 'Resource Detail',
        googlemapapikey: process.env.GoogleMapsAPIKey,
        lat: 52.6424198, 
        lng: -0.7651507
    });
};

exports.routes = {
    home,
    readmore
}