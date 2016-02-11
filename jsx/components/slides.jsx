var React = require('react');
var ActionCreator = require('../actions/gameStateActionCreators');

module.exports = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();

		var input = document.getElementById('user-input');
		ActionCreator.handleInput(input.value);

		input.value = ''; // clear away old input		
	},

	handleRestart: function (e) {
		e.preventDefault();
		ActionCreator.restartGame();
	},

	render: function () {
		var message = this.props.currentSlide.message;
		var placeholderText = this.props.currentSlide.inputPlaceholder || "Type your response.";
		var day = this.props.gameState.lengthOfTrip - this.props.gameState.daysToArrival;

		var dayDisplay = day > 0 ? ("Day " + day) : null;

		return <div className="game-text">
			<form id="game-input" onSubmit={ this.handleSubmit }>
				<p>{ dayDisplay }</p>
				{ message }
				<input id="user-input" autoFocus="true" type="text" placeholder={ placeholderText } />
			</form>
			<button id="saveGame" onClick={ this.handleRestart }>Restart Game</button>
		</div>
	}
});

