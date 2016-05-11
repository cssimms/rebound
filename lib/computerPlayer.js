var Utils = require('./utils'),
MovingObject = require('./movingObject');

var ComputerPlayer = function (args) {
  this.RADIUS = 10;
  this.COLOR = '#6666ff';
  MovingObject.call(this, {
      game: args['game'],
      pos: args['pos'],
      vel: [0,0],
      radius: this.RADIUS,
      color: this.COLOR
    }
  );
};

Utils.inherits(ComputerPlayer, MovingObject);

ComputerPlayer.prototype.fall = function () {

};


module.exports = ComputerPlayer;
