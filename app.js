require('./config/config.js')

const express = require('express');
const hbs = require('hbs');
// const helpers = require('handlebars-helpers')(['array']);

const r = require('./routes/route')

const port = process.env.PORT

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
// hbs.registerHelper("filter", helpers.filter);

app.get('/', r.routes.home);

app.get('/readmore/:id', r.routes.readmore);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
