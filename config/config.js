// If NODE_ENV not set assume development (npm test sets it to 'test', Heroku sets it to 'prod')
var env = process.env.NODE_ENV || 'development';

// Retrieve configuration from config.json and push into the environment (these need to be set manually on Heroku)
if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
};
