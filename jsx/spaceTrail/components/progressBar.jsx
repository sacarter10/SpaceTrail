var React = require('react');

module.exports = React.createClass({
	render: function () {
		var percentRemaining = ((this.props.gameState.daysToArrival / this.props.gameState.lengthOfTrip) * 100) + "%";
		var shipStyle = {
			top: percentRemaining
		}

		return <div className="journey-progress">
				<div className="asteroid-icon icon"></div>
				<div className="progress-inner">
					<div className="ship-icon icon" style={ shipStyle }>
					</div>
				</div>
				<div className="earth-icon icon"></div>
			</div>		
	}
});
