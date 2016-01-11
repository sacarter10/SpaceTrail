var keyMirror = require('keymirror');

module.exports = {
	// GAME PLAY CONSTANTS
	startingMoneyByClass: {
		1: 100000,
		2: 90000,
		3: 80000,
		4: 70000
	},
	maxPartySize: 5,

	gameStatus: keyMirror({
		INTRO: null,
		UNDERWAY: null,
		ARRIVED: null
	}),

	// REACT ACTION TYPES
  ActionTypes: keyMirror({
    USER_INPUT: null,
    RESTART_GAME: null
  })
} 


