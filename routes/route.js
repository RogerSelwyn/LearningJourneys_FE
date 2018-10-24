const hbs = require('hbs');

var home = (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        careers: [
            {name:'Environment'}, 
            {name:'Construction'}, 
            {name:'Green'}, 
            {name:'Computing'}, 
            {name:'Energy'}, 
            {name:'Music'}, 
            {name:'Film and TV'}, 
            {name:'Electronics'}, 
            {name:'Sport'}, 
            {name:'Food'}, 
            {name:'Transport'}, 
            {name:'Beauty'}, 
            {name:'Medicine'}, 
            {name:'Space'}
        ],
        resourcetypes: [
            {name:'Site Visits'}, 
            {name:'Local Fairs'}, 
            {name:'National Fair’s'}, 
            {name:'Challenge Days'}, 
            {name:'STEM engagement'}, 
            {name:'Award Accreditation'}, 
            {name:'Lesson Activity Plans'}, 
            {name:'Work Experience'}, 
            {name:'Meet an Engineer'}, 
            {name:'CPD'}
        ],
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
        articles: [
            {
                id: 1,
                title: "Tomorrow's Engineers Activity Pack - Cargo Drop",
                description: "These activities aim to introduce students, aged 11-14, to different sectors of engineering and the engineering principles involved. Each of the challenges are fun and hands-on and can be run easily in the classroom or in science clubs! <br /><br /> Cargo Drop - This activity will help pupils to understand the principles of forces and motion as well as give them an appreciation of how to combine materials to protect an object or strengthen a structure.",
                imageurl: "/images/thumb-te-activity-airbus-cargo-drop-dec-2014-1.jpg",
                activitytype: "Activity Plan",
                rating: 4
            },
            {
                id: 2,
                title: "The Space Life Sciences Training Program",
                description: "At NASA we have a commitment to educate and inspire the next generation of scientists. The Space Life Sciences Training Program (SLSTP) enables 10 college students a year to join us on the NASA Ames where they can get hands-on, real world experience working on scientific investigations. Each summer, junior and senior college students solicit research partners, work with mentors, and design a personal research project to explore over a 10-week period.  Please note: SLSTP study opportunities are available to US citizens, only.",
                imageurl: "/images/nasa_slstp_logo_400x400.png",
                activitytype: "STEM Engagement",
                rating: 5
            },
            {
                id: 3,
                title: "Building Transport Links",
                description: "Work alongside Oliver Jefferies who is a Civil Engineer working for Mott MacDonald.<br /><br />He first got inspired when watching a TV show presented by Richard Hammond. It was on Taipei 101 and it was about how they've put this massive pendulum in the top of the building to resist the wind forces to stop the building moving, and I was really interested to see how they used what I was learning in school in a real practical environment.",
                imageurl: "/images/Scape-Group-bidding-500x330.jpg",
                activitytype: "Work Experience",
                rating: 5
            }
        ]
    });
};
var readmore = (req, res) => {
        res.render('readmore', {
        pageTitle: 'Resource Detail',
        googlemapapikey: process.env.GoogleMapsAPIKey,
        article: {
            id: 1,
            title: "Tomorrow's Engineers Activity Pack - Cargo Drop",
            description: "These activities aim to introduce students, aged 11-14, to different sectors of engineering and the engineering principles involved. Each of the challenges are fun and hands-on and can be run easily in the classroom or in science clubs! <br /><br /> Cargo Drop - This activity will help pupils to understand the principles of forces and motion as well as give them an appreciation of how to combine materials to protect an object or strengthen a structure.",
            imageurl: "/images/thumb-te-activity-airbus-cargo-drop-dec-2014-1.jpg",
            activitytype: "Activity Plan",
            rating: 4,
            address: "192 Cargo Drop Road, Stemster, Rutland, RT96 1PZ",
            agegroup: "11-16",
            category: "Inspire",
            lat: 52.6424198, 
            lng: -0.7651507,
            feedback: [
                {
                    title: "Excellent pack",
                    review: "This pack provided everything we needed, with a great layout of information and clear instructions.",
                    rating: 5
                },
                {
                    title: "Great kit",
                    review: "This pack was missing some information that might be useful.",
                    rating: 3
                }
            ],
            resource: [
                {
                    title: "Resource pack",
                    resourceurl: "https://www.tomorrowsengineers.org.uk/media/1556/te-activity-airbus-cargo-drop-dec-2014.pdf"
                },
                {
                    title: "Information pack",
                    resourceurl: "https://www.tomorrowsengineers.org.uk/media/1556/te-activity-airbus-cargo-drop-dec-2014.pdf"
                },
            ]
        },
    });
};

exports.routes = {
    home,
    readmore
}