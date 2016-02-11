var Dispatcher = require('flux').Dispatcher;
var Constants = require('../constants/constants.js');
var objectAssign = require('object-assign');

var SpaceTrailDispatcher = objectAssign(new Dispatcher(), {

  handleViewAction: function (action) {
    var payload = {
      action: action
    };

    this.dispatch(payload);
  }

});

module.exports = SpaceTrailDispatcher;