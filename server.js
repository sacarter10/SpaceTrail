//external libraries + setup
require("babel-core/register");

var express = require('express');
var app = express();
var request = require('request');

var hbs = require('handlebars');
var cons = require('consolidate');

var React = require('react');
var ReactDOM = require('react-dom/server');

var Planets = require('./jsx/planets/planets.jsx');

//use handlebars as a templating engine 
app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);
app.use(express.bodyParser());

// react server-side rendering stuff
var PlanetComponent = React.createFactory(Planets);

//serve pages 
app.get('/', function(req, res) {
    res.render('index', {secret: "Roll to hit."});
});
 
app.get('/trees', function(req, res) {
    res.render('trees.hbs');
});

app.get('/galactic-opera', function(req, res) {
	 	request('http://www.astro-phys.com/api/de406/states?bodies=%20sun,%20mercury,%20venus,%20earth,%20mars,%20jupiter,%20saturn,%20neptune,%20uranus,%20pluto&unit=au&callback=',
  			function (error, response, body) { 
  				if (!error && response.statusCode == 200) {
  					var data = JSON.parse(body);

					  res.render('galactic-opera.hbs', {
              starDate: data.date,
							planets: ReactDOM.renderToString(PlanetComponent({data: data}))
						});
  				} else {
  					res.render('galactic-opera.hbs', {
  						planets: null
  					});
  				}
  			});

});

//serve static files
app.use(express.static('public'));

//start server
var port = process.env.PORT || 3000; 
app.listen(port, function() {
    console.log("Lust for Lassitude is running at localhost:" + port);
});
