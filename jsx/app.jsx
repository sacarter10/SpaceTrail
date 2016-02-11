var GameStateStore = require('./stores/gameStateStore.jsx');
var Slide = require('./components/slides.jsx');
var Dashboard = require('./components/dashboard.jsx');
var ProgressBar = require('./components/progressBar.jsx');
var React = require('react');
var ReactDOM = require('react-dom');

var isNode = (typeof window === 'undefined'); 

var App = React.createClass({

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    GameStateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    GameStateStore.removeChangeListener(this._onChange);
  },

  render: function () {
  	return <div>
  		<ProgressBar gameState={ GameStateStore.gameState() } />
  		<Slide currentSlide={ GameStateStore.currentSlide() } gameState={ GameStateStore.gameState() } />  		
  		<Dashboard gameState={ GameStateStore.gameState() } />  		
  	</div>
 	} 
 });

if (isNode) {
  module.exports = App;
} else {
  ReactDOM.render(<App />, document.getElementById("space-trail")); 
}