var SpaceTrailDispatcher = require('../dispatcher/spaceTrailDispatcher.js');
var Constants = require('../constants/constants.js');
var assign = require('object-assign');
var React = require('react');
var EventEmitter = require('events').EventEmitter;
var introSlides = require('../slideLibraries/introSlides.jsx');
var encounterSlides = require('../slideLibraries/encounterSlides.jsx');
var endGameSlides = require('../slideLibraries/endGameSlides.jsx');

var restartGame = function () {
	gameState = getNewGameState();
}

var getNewGameState = function () {
	return	{
		asteroidLandingProbability: 0.90, 
		currentSlideDeck: function () {
			switch(gameState.status) {
				case Constants.gameStatus.INTRO:
					return introSlides;
				case Constants.gameStatus.UNDERWAY:
					return encounterSlides;
				case Constants.gameStatus.ARRIVED:
					return endGameSlides;
			}
		},
		currentSlide: 0,
		currentSlideObject: function () {
			var currentSlideDeck = this.currentSlideDeck();
			var currentSlideObj = currentSlideDeck[this.currentSlide];

			if (typeof currentSlideObj.message === 'function') {
				currentSlideObj.message = currentSlideObj.message(gameState);
			}
			
			return currentSlideObj;
		},
		// supplies get expensive out in the middle of nowhere! (or they could). prices in Starbucks
		currentSupplyPrices: {
			food: 20,
			fuel: 10,
			oxygen: 20,
			water: 15
		},
		didQuickStart: false,
		daysToArrival: 200,
		lengthOfTrip: 200,
		food: 0, //unit = who really knows
		water: 0,
		fuel: 0,
		money: 0, //a.k.a. starbucks
		oxygen: 0,
		player: {
			name: "",
			background: ""
		},
		partySize: 0, // this includes the player
		ship: {
			name: ""
		},	
		hasArrived: function () {
			return ((gameState.status == Constants.gameStatus.UNDERWAY) && gameState.daysToArrival <= 0);
		},
		isDead: function () {
			return ((gameState.status == Constants.gameStatus.UNDERWAY) && gameState.oxygen <= 0);
		}, 
		status: Constants.gameStatus.INTRO
	}
}

var gameState = getNewGameState();


var GameStateStore = assign({}, EventEmitter.prototype, { 
	addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  emitChange: function () {
    this.emit('change');
  },

	currentSlide: function () {
		return gameState.currentSlideObject();
	},	

	gameState: function () {
		return gameState;
	},

	dispatcherIndex: SpaceTrailDispatcher.register(function(payload) {
		var action = payload.action;

		switch(action.type) {
			case Constants.ActionTypes.USER_INPUT: 

				var slide = gameState.currentSlideObject();
				var updatedGameState = slide.handleInput(gameState, action.input);
				gameState = updatedGameState;

				if (gameState.isDead()) {
					gameState.currentSlide = "dead";
				} else if (gameState.hasArrived()) {
					gameState.status = Constants.gameStatus.ARRIVED;
					gameState.daysToArrival = 0;
					gameState.currentSlide = 1;
				} 

				GameStateStore.emitChange();
			break;

			case Constants.ActionTypes.RESTART_GAME:
				restartGame();
				GameStateStore.emitChange();
			break;
		}
	})

});

module.exports = GameStateStore;
