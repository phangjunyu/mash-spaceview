var express = require('express'),
  path = require('path')
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Box = require('./api/models/box'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Boxesdb');

//set pug as template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./api/routes/routes'); //importing route
app.use('/api', routes)

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('spaceview mapview started on: ' + port);
