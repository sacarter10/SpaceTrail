$(document).ready(function(){

function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateCoordinates = function() {
  var circleRadius = 100;
  //generate a random position in polar coordinates
  Math.abs(randomInt(-circleRadius,circleRadius)+randomInt(-circleRadius,circleRadius))
  var randomRadius = Math.abs(randomInt(-circleRadius + 20,circleRadius) + randomInt(-circleRadius,-circleRadius))
  var randomTheta = (randomInt(0,360));
  //convert to cartesian coordinates
  var xfly = 120 + Math.round(randomRadius*Math.sin(randomTheta));
  var yfly = 200 + Math.round(randomRadius*Math.cos(randomTheta));
  return {x: xfly, y: yfly}
}


for (var i = 0; i < 1250; i++) {
  var leaf = $('<div class="leaf"></div>');
  var coordinates = generateCoordinates();
  
  leaf.css('top', coordinates.y + 'px');
  leaf.css('left', coordinates.x + 'px');
  leaf.css('background-color', 'rgb(0,' + randomInt(25, 235) + ',0)')
  leaf.css('transform', 'rotate(' + randomInt(0, 90) + 'deg)')
  $('#leaves').append(leaf);
}
})