var Utils = require('./utils'),
MovingObject = require('./movingObject');

var Player = function(args){
  this.RADIUS = 10;
  this.COLOR = '#ff6666';
  MovingObject.call(this, {
      game: args['game'],
      pos: args['pos'],
      vel: [0,0],
      radius: this.RADIUS,
      color: this.COLOR
    }
  );
};

Utils.inherits(Player, MovingObject);

module.exports = Player;
