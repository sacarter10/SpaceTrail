require("babel-core/register");

var express   = require('express'),
    app       = express(),
    request   = require('request'),
    hbs       = require('handlebars'),
    cons      = require('consolidate'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server'),
    SpaceTrail   = require('./jsx/spaceTrail/app.jsx');

//use handlebars as a templating engine 
app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);
app.use(express.bodyParser());

// react server-side rendering stuff
//var PlanetComponent = React.createFactory(Planets);

app.get('/space-trail', function(req, res) {
  res.render('space-trail.hbs', {
   // spaceTrail: ReactDOM.renderToString(SpaceTrailComponent())
  });
});

// serve static files
app.use(express.static('public'));

// start server
var port = process.env.PORT || 3000; 

app.listen(port, function() {
  console.log("Server is running at localhost:" + port);
});
