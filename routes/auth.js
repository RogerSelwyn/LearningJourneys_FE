const _ = require('lodash');
const axios = require('axios');

var authLogin = async (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
    });
};

var authLogout = async (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
    }
};

var getAuthToken = async (req, res, next) => {
    try {
        const response = await axios.post(process.env.RESTAPIURL+ 'get_auth_token/',{
            username: req.body.logusername,
            password: req.body.logpassword
        });
        req.session.username = req.body.logusername;
        req.session.token = response.data.token;
        req.session.userid = response.data.id;
    } catch (e) {
        console.log(e)
        return res.redirect('/login')
    };
    return res.redirect('/');
};

module.exports = {
    authLogin,
    authLogout,
    getAuthToken
};