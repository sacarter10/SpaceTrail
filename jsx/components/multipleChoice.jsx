var React = require('react');

module.exports = React.createClass({

	render: function () {
		var handleClick = this.props.handleClick;
		var options = this.props.options;

		return <span>
			{options.map(function(resp){
         return <li key={ resp.code }>
         	<button onClick={ handleClick.bind(null, resp.code) }>{ resp.text }</button>
         </li>;
      })}
		</span>
	}

})