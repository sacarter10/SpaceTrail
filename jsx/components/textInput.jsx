var React = require('react');

module.exports = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();

		var input = document.getElementById('user-input');

		this.props.handleResponse(input.value);

		input.value = ''; // clear away old input	
	},

	render: function () {
		return <span>
			<form onSubmit={ this.handleSubmit }>
				<input id="user-input" type="text" placeholder="Enter your input" autoFocus="true"/>
				<button className="double-border-button" type="submit">Submit</button>
			</form>
		</span>
	}

})