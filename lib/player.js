var Utils = require('./utils'),
Disc = require('./disc'),
MovingObject = require('./movingObject');

var Player = function(args){
  this.RADIUS = 10;
  this.COLOR = '#ff6666';
  this.fallCount = 0;
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

Player.prototype.step = function (direction) {
  this.vel[0] += direction[0];
  this.vel[1] += direction[1];
};

Player.prototype.shoot = function (event) {
  var x, y;
  x = event.clientX;
  y = event.clientY;
  var disc = new Disc({
    player: this,
    game: this.game,
    pos: this.pos.slice(),
    target: [x,y]
  });

  this.game.shootDisc(disc);
};

Player.prototype.fall = function () {
  this.draw = function (ctx) {
    if (this.radius - this.fallCount < 0){
      return;
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius - this.fallCount,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    this.fallCount += 1;
  };
};


module.exports = Player;
