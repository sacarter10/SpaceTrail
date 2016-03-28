var React = require('react');
var Constants = require('../constants/constants.js');
var Helpers = require('./helpers.js');

module.exports = { 
	0: { 
		message: function () {
			return <p>
				Are you ready?
			</p>;
		}, 
		handleInput: function (gameState, input) {
			gameState.currentSlide += 1;

			return gameState;
		},
		options: [
			{ code: "A",
				text: "Yes" }
		] 
	},
	1: { 
		message: function () {
			return <span>
				<p>Welcome to Space Trail.</p>
				<p>
					After completion of the world&apos;s 
					first space elevator, thousands of pioneers are making the challenging journey 
					to space in search of wealth, adventure, or a better life. A few pioneers set 
					their sights on Mars, or Titan, but most attempt to stake claim to a new home 
					in the asteroid belt.
				</p>
			</span> 
		}, 
		handleInput: function (gameState, input) {
			gameState.currentSlide = gameState.currentSlide + 1;

			return gameState;
		},
		options: [
			{ code: "A",
				text: "Continue"}
		]  		
	},

	2: { 
		message: function () {
			return <span>
			<p>You and your crew can choose from a background in the following:</p>
			</span>
		},		
		handleInput: function(gameState, input) {
			var numInput = parseInt(input);

			if (numInput < 4) {
				gameState.player.background = numInput;
				gameState.money = Constants.startingMoneyByClass[gameState.player.background];
				
				gameState.currentSlide = 3;
			} else {
				gameState.currentSlide = "2a";
			}
			return gameState;
		}, 
		options: [
			{ code: 1,
				text: "Programmer"},
			{ code: 2, 
				text: "Miner"},
			{ code: 3,
		  	text: "Recently Unemployed Elevator Constructor"},
		  { code: 4,
				text: "Explanation of Backgrounds"}
		] 
	},

	"2a": { 
		message: function () {
		return <span>
			<h4>Backgrounds:</h4>
			<ul className="numbered-list">
			<li>
				<em>Programmer</em>
				<p>
					You and your co-workers are tired of the long days spent in cubicles.
					The adventure of space awaits, the perfect way to sate a world weary soul.
				</p>
				<p>
					As a programmer you begin with more starting money, 
					but lack practical skills needed once you reach your destination. (Easy)
				</p>
			</li>
			<li>
				<em>Miner</em>
				<p>
					You have dreamed of being an astronaut all your life. 
					The completion of the elevator allows you to achieve you goal and gain immesurable wealth.
				</p>
				<p>
					As a miner you begin with average starting money and are adept 
				with all mining equipment. (Medium)
				</p>
			</li>
			<li>
				<em>Elevator Constructor</em>
				<p>
					The completion of the space elevator left you jobless and penniless. 
					You and your friends scrape together enough money to make a go at settling in 
					the asteroid belt.
				</p>
				<p>
					As an elevator costructor you begin with the lowest 
					starting money, but are more adept at repairs and salvaging. (Hard)<br/><br/>
				</p>
			</li>
			</ul>
			</span>
		},
		handleInput: function(gameState, input) {
			var numInput = parseInt(input);

			gameState.currentSlide = 2;
			
			return gameState;
		},
		options: [
			{ code: "A",
				text: "Back"},
		] 	},
	"3": {
		message: function () {
			return <span>
				<p>
					The journey may be difficult and having extra people will be necessary 
					in certain situations. Keep in mind that the more people you bring, 
					the more food and fuel you will have to carry.
				</p>
				<p>
				How many people are in your party (this number includes you)?:
				</p>
			</span>
		},
		handleInput:function(gameState, input) {
			if (input <= Constants.maxPartySize){
				gameState.partySize = input;
			} else {
				gameState.partySize = 8;
			}

			gameState.currentSlide = 4;

			return gameState;
		}
	},
	4: {
		message: function () {
			return <p>
				What is your name for this voyage?
			</p>
		},
		handleInput: function(gameState, input){
			gameState.player.name = input;
			gameState.currentSlide +=1;

			return gameState;
		}
	},
	5: {
		message: function () { 
			return <p>
				What name do you give your ship?
			</p>
		},
		handleInput: function(gameState, input) {
			gameState.ship.name = input;	
			gameState.currentSlide += 1;

			return gameState;
		}
	},
	6: { 
		message: function (gameState) {
			return <span>
			<p>Your selections are:</p>
			<ul>
				<li>Player name: { gameState.player.name }</li>  
				<li>Ship name: { gameState.ship.name }</li>
				<li>Crew members: { gameState.partySize }</li>
				<li>StarBucks: { gameState.money }</li>
			</ul>
			</span>
		},
		handleInput: function(gameState, input) {
			gameState.currentSlide += 1;	

			return gameState;
		},
		options: [
			{code: "A", text: "Continue"}
		]
	},
	7: {
		message: function (gameState) {			
			var recommendations = Helpers.recommendResources(gameState);
			var food = recommendations.food;
			var oxygen = recommendations.oxygen;
			var fuel = recommendations.fuel;

			return <span>
			<p>
				You and your crew enter the local shipwright&apos;s office. A wizend old man 
				greets you.
			</p>
			<p>
				"Ho there, my name is Barnabas. We&apos;ll get you all set up for the journey 
				ahead."
			</p>
			<p>
				The walls are covered with pictures of delicate, well crafted ships, probably all 
				outside of your budget.
			</p>
			<p>
				"For the distance you&apos;re travelling and your crew I recommend carrying":
			</p>
			<ul>
			<li>
				Food: { food } pounds
			</li>
			<li>
				Oxygen: { oxygen } liters
			</li>
			<li>
				Fuel: { fuel } gallons
			</li>
			</ul>
			</span>
		},
		handleInput: function(gameState, input) {
			gameState.currentSlide += 1;

			return gameState;
		},
		options: [
			{code: "A", text: "Continue"}
		]
	},
	8: {
		message: function (gameState) { 

			return <span>
			<h4>Prices</h4>
			<ul>
				<li><strong>Food:</strong> { gameState.currentSupplyPrices.food } / pound</li>
				<li><strong>Oxygen:</strong> { gameState.currentSupplyPrices.oxygen } / liter</li>
				<li><strong>Water:</strong> { gameState.currentSupplyPrices.fuel } / gallon</li>
			  <li><strong>Fuel:</strong> { gameState.currentSupplyPrices.water } / gallon</li>
			</ul>
			<p>
				What would you like to purchase?
			</p>

			</span>
		},
		handleInput: function (gameState, input) {
			var letter = input.toLowerCase();
			if (['a', 'b', 'c', 'd'].includes(letter)) {
				gameState.currentSlide += letter;
			} else if  (letter == 'e') {
				gameState.currentSlide += 1;
			}

			return gameState;
		},
		options: [
			{code: "A", text: "Food" },
			{code: "B", text: "Oxygen" },
			{code: "C", text: "Fuel" },
			{code: "D", text: "Water" },
			{code: "E", text: "I'm happy with what I've purchased." }, 
		]
	},  
	"8a": {
		message: function () {
		 return <p>How many pounds of food would you like to purchase?</p>
		},
		handleInput: function (gameState, input) {
			var updatedGameState = Helpers.purchaseSupplies("food", input, gameState)
			updatedGameState.currentSlide = 8;

			return updatedGameState;
		}
	}, 
	"8b": {
		message: function () {
			return <p>How many liters of oxygen would you like to purchase?</p>
		},
		handleInput: function (gameState, input) {
			var updatedGameState = Helpers.purchaseSupplies("oxygen", input, gameState);
			updatedGameState.currentSlide = 8;

			return updatedGameState;
		}
	}, 
	"8c": {
		message: function () {
			return <p>How many gallons of fuel would you like to purchase?</p>
		},
		handleInput: function (gameState, input) {
			var updatedGameState = Helpers.purchaseSupplies("fuel", input, gameState);
			updatedGameState.currentSlide = 8;

			return updatedGameState;
		}
	},
	"8d": {
		message: function () {
			return <p>How many gallons of water would you like to purchase?</p>
		},
		handleInput: function (gameState, input) {
			var updatedGameState = Helpers.purchaseSupplies("water", input, gameState);
			updatedGameState.currentSlide = 8;

			return updatedGameState;
		}
	},
	9: {
		message: function (gameState, input) {
			return <span>
			 <p>
			 	Now that <em>{ gameState.ship.name }</em> is stocked and equipped all that&apos;s 
			 	left is the long climb to the top of the elevator.
			 </p>
			 <p>
			 	For several days the Earth is pushed slowly away and you are pulled toward 
			 	space. Above and below are ships just like yours, on the other side of the 
			 	elevator empty carriages are slowly moving back to Earth.</p>
			 <p>
			 	Finally you reach the top, your ship is released.
			 </p>			 
			</span>
		},
		handleInput: function (gameState, input) {
			gameState.currentSlide += 1;

			return gameState;
		},
		options: [
			{ code: "A", text: "Continue" }
		]
	},
	10: {
		message: function (gameState, input) {
			return <span>
				<p>
			 		It will take 200 days to reach your chosen asteroid. 
			 	</p>
			 	<p>
			  	And you&apos;re off!
			  </p>
			</span>
		},
		handleInput: function (gameState, input) {
			gameState.currentSlide = 1;
			gameState.status = Constants.gameStatus.UNDERWAY;
			var updatedGameState = Helpers.advanceNDays(gameState, 33);

			return updatedGameState;
		},
		options: [
			{ code: "A", text: "Continue" }
		]
	}
}