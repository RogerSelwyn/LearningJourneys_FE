const axios = require('axios');
const _ = require('lodash');

var getHome = async (req, res, next) => {
    var filterreq = false
    if (req.session.subjectfilters) {
        filterreq = true;
    };
    
    try {
        var filters = '';
        var addchar = '?';
        if (filterreq) {
            for (var subject of req.session.subjectfilters) {
                filters += addchar + 'resource_subject_area=' + subject.id
                addchar = '&';
            }
        }
        console.log('filters', filters);
        const careersPromise = axios.get(process.env.RESTAPIURL+ 'subject_areas/?ordering=subject_area' + filters);
        const resourcetypesPromise = axios.get(process.env.RESTAPIURL+ 'types/?ordering=title');
        const resourcesPromise = axios.get(process.env.RESTAPIURL+ 'resources/' + filters);
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

    // if (!filterreq) {
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
    // } else {
    //     res.send(resources);
    // }
};

var filter = async (req, res, next) => {
    var subjectfilters = [];
    if (req.session.subjectfilters) {
        subjectfilters = req.session.subjectfilters;
    };
    var resourcetypefilters = [];
    if (req.session.resourcetypefilters) {
        resourcetypefilters = req.session.resourcetypefilters;
    };
    if (req.query.subjectid) {
        var removeId = _.find(subjectfilters, ['id', req.query.subjectid])
        if(removeId) {
             subjectfilters.splice(removeId,1)
        } else {
            subjectfilters.push({id:req.query.subjectid});
        }
   }
    else if (req.query.rtid) {
        var removeId = _.find(resourcetypefilters, ['id', req.query.rtid])
        if(removeId) {
            resourcetypefilters.splice(removeId,1)
        } else {
            resourcetypefilters.push({id:req.query.rtid});
        }
    };
    req.session.subjectfilters = subjectfilters;
    req.session.resourcetypefilters = resourcetypefilters;
    console.log(req.session.subjectfilters, req.session.resourcetypefilters);
    return res.redirect('/');
};


module.exports = {
    filter, 
    getHome
};