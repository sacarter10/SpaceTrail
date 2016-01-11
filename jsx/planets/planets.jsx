var isNode = typeof module !== 'undefined' && module.exports; 

var React = require('react');
var ReactDOM = require('react-dom');

var Planet = React.createClass({
	render: function () {
		var planetStyle = {
			top: this.props.top,
			left: this.props.left 
		}

		return <span className='planet' style={ planetStyle }>
			{ this.props.name }
		</span>
	}
});

var Planets = React.createClass({
	constants: {
			innerPlanetScaleFactor: 100,
			outerPlanetScaleFactor: 20,
			innerPlanetsArray: ["sun","mercury","venus","earth","mars"]
	},
	getInitialState: function () {
		var that = this;

		if (isNode) {

			var data = this.props.data;

			var results = data.results;

				var planetArray = [];

				for (var planet in results) {
					if ( results.hasOwnProperty( planet ) ) {
						var scaleFactor;
						
						if (that.constants.innerPlanetsArray.indexOf(planet) >= 0){
							scaleFactor = that.constants.innerPlanetScaleFactor;
						} else {
							scaleFactor = that.constants.outerPlanetScaleFactor;
						}

						var planetX = results[planet][0][0] * scaleFactor;
						var planetY = results[planet][0][1] * scaleFactor;
						var top = "calc(" + planetX + "px + 50%)";
						var left = "calc(" + planetY + "px + 50%)";

						var planetObj = { name: planet, top: top, left: left };
						planetArray.push( planetObj );
					}						
				}

		return {
			planets: planetArray, 
			date: data['date']
		}


}
else {
	return {
			planets: [
				{ name: "Sun", top: 0, left: 0 },
				{ name: "mercury", top: 0, left: 0 }, 
				{ name: "venus", top: 0, left: 0 },
				{ name: "earth", top: 0, left: 0 },
				{ name: "mars", top: 0, left: 0 },
				{ name: "jupiter", top: 0, left: 0 },
				{ name: "saturn", top: 0, left: 0 },
				{ name: "uranus", top: 0, left: 0 },
				{ name: "neptune", top: 0, left: 0 },
				{ name: "pluto", top: 0, left: 0 }
			],
			date: ''
		}
}

	
	},
	componentDidMount: function () {
		// $.ajax({
		// 	dataType: "json",
		// 	url: "http://www.astro-phys.com/api/de406/states?bodies=%20sun,%20mercury,%20venus,%20earth,%20mars,%20jupiter,%20saturn,%20neptune,%20uranus,%20pluto&unit=au&callback=",
		// 	data: "",
		// 	success: function (data) {
		// 		var results = data["results"];
		// 		var planetArray = [];

		// 		for (var planet in results) {
		// 			if ( results.hasOwnProperty( planet ) ) {
		// 				var scaleFactor;
						
		// 				if (this.state.innerPlanetsArray.indexOf(planet) >= 0){
		// 					scaleFactor = this.constants.innerPlanetScaleFactor;
		// 				} else {
		// 					scaleFactor = this.constants.outerPlanetScaleFactor;
		// 				}

		// 				var planetX = results[planet][0][0] * scaleFactor;
		// 				var planetY = results[planet][0][1] * scaleFactor;
		// 				var top = "calc(" + planetX + "px + 50%)";
		// 				var left = "calc(" + planetY + "px + 50%)";

		// 				var planetObj = { name: planet, top: top, left: left };
		// 				planetArray.push( planetObj );
		// 			}						
		// 		}

		// 		this.setState( { planets: planetArray } );
		// 		this.setState({ date: data['date'] });
		// 	}.bind(this)
		// });
	},
	render: function () {
		var planets = this.state.planets.map(function (planet) {
      return <Planet
      					key={ planet.name }
	              top={ planet.top }
	              left={ planet.left } 
	              name={ planet.name } >
              </Planet>
    }.bind(this));

		return <div>
			{ planets }
		</div>
	}
});

if (isNode) {
	  module.exports = Planets;
} else {
	ReactDOM.render(<Planets />, document.getElementById("star-date"));	
}