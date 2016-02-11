var React = require('react');
var Helpers = require('./helpers.js');

module.exports = {
	1: {
		message: function (gameState) {
			var distressedShip = Helpers.getRandomShipName();
			var gallonsToCatchUp = Helpers.getRandomInt(1, 15);
			var captainName = Helpers.getRandomPlayerName();

			return <span>
				<p>
					Your transmitter crackles, a signal is coming through
				</p>
				<p>
					"This is Captain { captainName } of the <em>{ distressedShip }</em>. 
					 Please assist. We have suffered a critical malfunction, life support failing, 
					 we are almost out of air. Please assist."
				</p>
				<p>
					The message loops. From the transmission you determine that the <em>{ distressedShip }</em>&nbsp; 
					is moving faster than you and will use { gallonsToCatchUp } gallons of fuel to catch up to and dock with.
				</p>
				<p>
					Do you (r)eply, (d)ock, or (c)ontinue on your way?
				</p>
			</span>
		},

		handleInput: function (gameState, input) {
			var firstLetter = input[0].toLowerCase();

			if (firstLetter == "r") {
				gameState.currentSlide += firstLetter;
			} else if (firstLetter == "d") {
				gameState.currentSlide += firstLetter;
			} else if (firstLetter == "c") {   
				gameState.currentSlide += firstLetter;
			}

			return gameState;
		}
	},
	"1r": {
		message: function (gameState) {
			return <span>
				<p>
					There is no reply from the ship. The message continues to loop.
				</p>
				<p>
					Do you (d)ock, or (c)ontinue?
				</p> 
			</span>
		},
		handleInput: function (gameState, input) {
			var firstLetter = input[0].toLowerCase();

			if (firstLetter == "c") {
				gameState.currentSlide = "1c";
			} else if (firstLetter == "d") {
				gameState.currentSlide = "1d";
			}

			return gameState;
		} 
	},
	"1c": {
		message: function () {
			return <p>Eventually the signal crackles away to nothing.</p>
		}, 
		handleInput: function (gameState) {
			gameState.currentSlide = 2;
			var updatedGameState = Helpers.advanceNDays(gameState, 40);

			return gameState;
		}
	}, 
	"1d": {
		message: function (gameState) {
			return <span>
				<p>
					Upon approach you see that the ship is similar to your own. You bring your ship about and are able to dock.
				</p>
				<p>
					How many crew members do you send through?
				</p>
				<p>
					(Enter 1 to { gameState.partySize }.)
				</p>
			</span>
		},
		handleInput: function (gameState, input) {
			if (parseInt(input) > 0) {
				gameState.currentSlide = "1e";	
			} 

			return gameState;
		}		
	},
	"1e": {
		message: function (gameState) {
			var foodFound = Helpers.getRandomInt(1, 15);
			this.tempVars.foodFound = foodFound;

			var fuelFound = Helpers.getRandomInt(1, 10);
			this.tempVars.fuelFound = fuelFound;

			return <span>
				<p>Your away team finds the dessicated bodies of the crew. After searching for a while they find:</p>
				<ul>
					<li>{ foodFound } pounds of food</li>
					<li>{ fuelFound } gallons of fuel</li>			
				</ul>
				<p>You take them and move on.</p>
			</span>
		},
		handleInput: function (gameState, input) {
			gameState.currentSlide = 2;
			gameState.food += this.tempVars.foodFound;
			gameState.fuel += this.tempVars.fuelFound;
			var updatedGameState = Helpers.advanceNDays(gameState, 40);

			return updatedGameState;
		},
		tempVars: {}
	},
	"2": {
		message: function (gameState) {
			return <span>
				<p>
					You hear a knocking from inside one of the bulkheads. It lasts for a few seconds then is silent.
				</p>
				<p>
					Do you (k)eep listening, (d)ismantle the bulkhead, or (i)gnore it?
				</p>
			</span>
		},
		handleInput: function (gameState, input) {
			var firstLetter = input[0].toLowerCase();

			if (firstLetter == 'k' || firstLetter == 'i') {
				gameState.currentSlide = "2again";
			} else if (firstLetter == 'd') {
				if (gameState.player.background == 3) { // if background == elevator constructor
					gameState.currentSlide = "2skilled";
				} else {
					gameState.currentSlide = "2unskilled";
				}				
			} 

			return gameState;
		}
	},
	"2again": {
		message: function (gameState) {
			return <span>
				<p>
					A few hours pass. You hear the knocking again. It lasts for a few seconds then is silent.
				</p>
				<p>
					Do you (k)eep listening, (d)ismantle the bulkhead, or (i)gnore it?
				</p>
			</span>
		}, 
		handleInput: function (gameState, input) {
			this.tempVars.timesSeen++;
			var firstLetter = input[0].toLowerCase();

			if (this.tempVars.timesSeen > 3) {
				gameState.currentSlide = "2end";
			} else if (firstLetter == 'k' || firstLetter == 'i') {
				gameState.currentSlide = "2again";
			} else if (firstLetter == 'd') {
				if (gameState.player.background == 3) { // if background == elevator constructor
					gameState.currentSlide = "2skilled";
				} else {
					gameState.currentSlide = "2unskilled";
				}				
			} 

			return gameState;
		}, 
		tempVars: {
			timesSeen: 0
		}
	},
	"2skilled": {
		message: function (gameState) {
			return <span>
				<p>
					You take apart the bulkhead. You discover that a water line is not secured properly. 
				</p>
				<p>
					You secure it and easily put everything back.
				</p>
			</span>
		}, 
		handleInput: function (gameState, input) {
			gameState.currentSlide = "2end";

			return gameState;
		}
	}, 
	"2unskilled": { 
		message: function () {
			return <span>
				<p>
					You take apart the bulkhead. You&apos;re not sure where exactly the knocking 
					came from or really what you&apos;re looking for. After putting the panels 
					back on one of your wrenches is missing.
				</p>
				<p>
					Do you (l)ook for it or (i)gnore it?
				</p>
			</span>	
		}, 
		handleInput: function (gameState, input) {
			var firstLetter = input[0].toLowerCase();

			if (firstLetter == 'l') {
				gameState.currentSlide = "2findwrench";
			} else {
				gameState.currentSlide = "2burst";
			}

			return gameState;
		}
	},
	"2findwrench": {
		message: function () {
			return <span>
				<p>
					You take apart more bulkheads. With no mechanical experience it 
					is difficult to keep track of all the parts removed, and where 
					they are supposed to go. 
				</p>
				<p>
					Eventually you find the wrench, but 
					have some difficulty in putting it all back together. 
					Three sections of bulkhead now remain exposed.
				</p>
			</span>	
		}, 
		handleInput: function (gameState, input) {
			gameState.currentSlide = "2end";

			return gameState;
		}
	},
	"2burst": {
		message: function () {
			return <span> 
				<p>
					Two hours later, an alarm goes off! There is a sudden drop in water pressure. 
				</p>
				<p>
					15 gallons of water are lost before you are able to shut the valves off and repair the line.
				</p>
			</span>	
		}, 
		handleInput: function (gameState, input) {
			gameState.currentSlide = "2end";
			gameState.water -= 15;

			return gameState;
		}
	},
	"2end": {
		message: function (gameState) {
			return <p>
				You do not hear the knocking again.
			</p>
		}, 
		handleInput: function (gameState, input) {
			gameState.currentSlide = 3;
			var updatedGameState = Helpers.advanceNDays(gameState, 80);			

			return updatedGameState;
		}
	}, 
	3: {
		message: function (gameState) {
			var mysteryShip = Helpers.getRandomShipName();
			var mysteryName = Helpers.getRandomPlayerName();

			return <span>
				<p>
					Ahoy, this is { mysteryName } of the <em>{ mysteryShip }</em>.	
				</p>
				<p>
					Do you (h)ail them back, or (i)gnore them?
				</p>
			</span>
		}, 
		handleInput: function (gameState, input) {
			var firstLetter = input[0].toLowerCase();

			if (firstLetter == "h") {
				gameState.currentSlide = "3a";
			} else {
				gameState.currentSlide = "3b";
			}

			return gameState;
		}
	},
	"3a": {
		message: function (gameState) {
			return <span>
				<p>
					You tell them you are { gameState.player.name } of the <em>{ gameState.ship.name }</em>.
				</p>
				<p>
					They do not respond further.
				</p>
			</span>
		}, 
		handleInput: function (gameState, input) {
			var updatedGameState = Helpers.advanceNDays(gameState, 80);			

			return updatedGameState;
		}
	},
	"3b": {
		message: function (gameState) {
			return <span>
				<p>
					They send no further messages.
				</p>
			</span>
		}, 
		handleInput: function (gameState, input) {
			var updatedGameState = Helpers.advanceNDays(gameState, 80);			

			return updatedGameState;
		}	
	}

	}