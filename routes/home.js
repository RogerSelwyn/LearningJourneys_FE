const _ = require('lodash');
const axios = require('axios');

var getHome = async (req, res, next) => {
    try {
        const careersPromise = axios.get(process.env.RESTAPIURL+ 'subject_areas/');
        const resourcetypesPromise = axios.get(process.env.RESTAPIURL+ 'types/');
        const resourcesPromise = axios.get(process.env.RESTAPIURL+ 'resources/');
        const [careersData, resourcetypesData, resourcesData] = await Promise.all([careersPromise, resourcetypesPromise, resourcesPromise]);
        var careers = _.sortBy(careersData.data, 'subject_area');
        var resourcetypes = _.sortBy(resourcetypesData.data, 'title');
        var resources = resourcesData.data;
        resources.forEach(async resource => {
            try {
                console.log('-------------------------', resource.id)
                // var ratingData = await axios.get(process.env.RESTAPIURL+ 'resources/' + resource.id + '/get_average_rating/');
                // var rating = ratingData.data;
                // console.log(resource.id, rating)
                resource.rating = 5;
            } catch (e) {
                console.error(e); 
            };
        });

    } catch (e) {
        console.error(e); 
    };

    res.render('home', {
        pageTitle: 'Home Page',
        careers: careers,
        resourcetypes: resourcetypes,
        agegroups: [
            {name:'4-6'}, 
            {name:'7-10'}, 
            {name:'11-14'}, 
            {name:'15-18'}
        ],
        distances: [
            {name:'0-50 miles'}, 
            {name:'51-100 miles'}, 
            {name:'101-200 miles'}, 
            {name:'200+ miles'}
        ],
        resources: resources
    });
};

module.exports = {
    getHome
};