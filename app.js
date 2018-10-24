require('./config/config.js')

const express = require('express');
const hbs = require('hbs');

const r = require('./routes/route')

const port = process.env.PORT

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.get('/', r.routes.home);

app.get('/readmore', r.routes.readmore);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
