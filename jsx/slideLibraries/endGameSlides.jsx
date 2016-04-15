var React = require('react');

module.exports	= {
	1: {
		message: 
		function (gameState) {
			return <span>
				<p>At long last your journey has come to an end. Ahead lies your future home, asteroid #9298.</p>
				<p>Do you scout the asteroid for the best place to land?</p> 
				<p>(This will use one gallon of fuel, but increase your chances of landing successfully.)</p> 
			</span>
		},
		handleInput: function (gameState, input) {
			var firstLetter = input[0].toLowerCase();

			if (firstLetter == 's') {
				gameState.fuel -= 1;
				gameState.currentSlide = "1b";

				return gameState;
			} else {
				gameState.asteroidLandingProbability -= 0.2;
				gameState.currentSlide = "1c";

				return gameState;
			}
		},
		options: [
			{ code: "S", text: "Scout the asteroid"},
			{ code: "L", text: "Land where you are" }
		]
	},
	"1b": {
		message: function (gameState) {
			return <p>
				Rotating your ship around the asteroid you find a medium sized crater perfect for anchoring your ship in.
			</p>
		},
		handleInput: function (gameState, input) {
			var landedSuccessfully = (Math.random() <= gameState.asteroidLandingProbability);

			if (landedSuccessfully) {
				gameState.currentSlide = "won";
			} else {
				gameState.currentSlide = "crashed";
			}

			return gameState;
		},
		options: [
			{ code: "C", text: "Continue"}
		]
	},
	"1c": {
		message: function (gameState) {
			return <p>
				You fire the landing harpoons at the asteroid right where you are.
			</p>
		},
		handleInput: function (gameState, input) {
			var landedSuccessfully = (Math.random() <= gameState.asteroidLandingProbability);

			if (landedSuccessfully) {
				gameState.currentSlide = "won";
			} else {
				gameState.currentSlide = "crashed";
			}

			return gameState;
		},
		options: [
			{ code: "C", text: "Continue"}
		]
	},
	"crashed": {
		message: function (gameState) {
			return <span>
				<p>
					The asteroid is approaching to fast. There is not enough time to slow down. 
				</p>
				<p>			
					You made it to the asteroid, but did not succeed in landing. This is the end.
				</p>
			</span>
		},
		handleInput: function (gameState, input) {
			gameState.currentSlide = "dead";

			return gameState;
		},
		options: [
			{ code: "C", text: "Continue"}
		]
	},

	"dead": {
		message: function (gameState) {
			return <p>
				You die. 
			</p>;
		},
		handleInput: function (gameState, input) {					
			return gameState;
		},
		options: [
		]	
	},

	"won": {
		message: function (gameState) {
			return <p>
				You won!!!! You live happily ever after, mining asteroids.
			</p>
		},
		handleInput: function (gameState, input) {
			return gameState;
		},
		options: [
		]	
	}
}