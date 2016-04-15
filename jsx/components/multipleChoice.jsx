var React = require('react');

module.exports = React.createClass({

	render: function () {
		var handleClick = this.props.handleClick;
		var options = this.props.options;

		return <ul className="response-options">
			{options.map(function(resp){
         return <li className="response-option" key={ resp.code }>
         	<button onClick={ handleClick.bind(null, resp.code) }>{ resp.text }
         	</button>
         </li>;
      })}
		</ul>
	}

})