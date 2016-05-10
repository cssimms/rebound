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

Player.prototype.step = function (direction) {
  this.vel[0] += direction[0];
  this.vel[1] += direction[1];
};

Utils.inherits(Player, MovingObject);

module.exports = Player;
