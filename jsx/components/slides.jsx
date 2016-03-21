var React = require('react');
var ActionCreator = require('../actions/gameStateActionCreators');
var MultipleChoiceInput = require('./multipleChoice.jsx');
var TextInput = require('./textInput.jsx')

module.exports = React.createClass({
	handleResponse: function (resp) {
		ActionCreator.handleInput(resp);
	},

	handleRestart: function (e) {
		e.preventDefault();
		ActionCreator.restartGame();
	},

	render: function () {
		var message = this.props.currentSlide.message;
		var day = this.props.gameState.lengthOfTrip - this.props.gameState.daysToArrival;
		var dayDisplay = day > 0 ? ("Day " + day) : null;

		var userInput;

		if (this.props.currentSlide.options) {
			userInput = <MultipleChoiceInput handleClick={ this.handleResponse } options={ this.props.currentSlide.options }/>;	
		} else {
			userInput = <TextInput handleResponse={ this.handleResponse } />
		}

		return <div className="game-text">
			<div id="game-input">
				<p>{ dayDisplay }</p>
				{ message }

				{ userInput }
			</div>
			<button id="restartGame" onClick={ this.handleRestart }>Restart Game</button>
		</div>
	}
});

