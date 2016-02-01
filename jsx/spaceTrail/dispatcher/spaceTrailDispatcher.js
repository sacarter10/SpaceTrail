var Dispatcher = require('flux').Dispatcher;
var Constants = require('../constants/constants.js');
var assign = require('object-assign');

var assign = require('object-assign');

var SpaceTrailDispatcher = assign(new Dispatcher(), {

  handleViewAction (action) {
    var payload = {
      action: action
    };

    this.dispatch(payload);
  }

});

module.exports = SpaceTrailDispatcher;