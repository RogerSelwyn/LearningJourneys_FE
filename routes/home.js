const axios = require('axios');

var getHome = async (req, res, next) => {
    try {
        const careersPromise = axios.get(process.env.RESTAPIURL+ 'subject_areas/?ordering=subject_area');
        const resourcetypesPromise = axios.get(process.env.RESTAPIURL+ 'types/?ordering=title');
        const resourcesPromise = axios.get(process.env.RESTAPIURL+ 'resources/');
        const [careersData, resourcetypesData, resourcesData] = await Promise.all([careersPromise, resourcetypesPromise, resourcesPromise]);
        var careers = careersData.data;
        var resourcetypes = resourcetypesData.data;
        var resources = resourcesData.data;
        for (var resource of resources) {
            try {
                var ratingData = await axios.get(process.env.RESTAPIURL+ 'resources/' + resource.id + '/get_average_rating/');
                rating = ratingData.data;
                resource.rating = ratingData.data.average_rating;
            } catch (e) {
                console.error(e); 
            };
        };

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