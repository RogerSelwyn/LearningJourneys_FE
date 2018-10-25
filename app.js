require('./config/config.js')

const express = require('express');
const session = require('express-session')
const hbs = require('hbs');
// const helpers = require('handlebars-helpers')(['array']);

const r = require('./routes/route')

const port = process.env.PORT

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// hbs.registerHelper("filter", helpers.filter);
hbs.registerHelper('breaklines', text => {
    text = hbs.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new hbs.SafeString(text);
});

app.use(session({
    secret: process.env.SessionPWD,
    resave: true,
    saveUninitialized: false,
    name: process.env.SessionName,
    maxAge: 3600000
  }));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('/', r.routes.home.getHome);

app.get('/login', r.routes.auth.authLogin);

app.post('/login', r.routes.auth.getAuthToken);

app.get('/logout', r.routes.auth.authLogout);

app.get('/detail/:id', r.routes.detail.getArticle);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
