var React = require('react');

module.exports = React.createClass({
	render: function () {
		return <div id="dashboard"> 
						<ul>						
							<li>Days to arrival: { this.props.gameState.daysToArrival }</li>
							<li>Food: { this.props.gameState.food }</li>
							<li>Water: { this.props.gameState.water }</li>
							<li>Oxygen: { this.props.gameState.oxygen }</li>
							<li>Fuel: { this.props.gameState.fuel }</li>
							<li>Crew Members:  { this.props.gameState.partySize }</li>
							<li>Money:  { this.props.gameState.money }</li>
						</ul>
					</div>
	}
});
