var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var db = require('./config/db');
mongoose.connect(db.url);

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes')(app, express);
app.use('/api', apiRoutes);


app.listen(port);

exports = module.exports = app;