var SpaceTrailDispatcher = require('../dispatcher/spaceTrailDispatcher');
var Constants = require('../constants/constants');

module.exports = {

  handleInput: function(input) {
    SpaceTrailDispatcher.handleViewAction({
      type: Constants.ActionTypes.USER_INPUT,
      input: input
    });
  },

  restartGame: function() {
    SpaceTrailDispatcher.handleViewAction({
      type: Constants.ActionTypes.RESTART_GAME
    });
  }

};