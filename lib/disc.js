var Util = require('./utils'),
MovingObject = require('./movingObject'),
Player = require('./player.js'),
StationaryObject = require('./stationaryObject');

var Disc = function (args) {
  this.RADIUS = 13;
  this.VELOCITY = this.calcVel(args['pos'], args['target']);
  this.pastPos = [];
  this.PLAYER = args['player'];
  this.team = args['team'];
  this.image = this.getImage();

  MovingObject.call(this, {
    game: args['game'],
    pos: args['pos'],
    vel: this.VELOCITY,
    radius: this.RADIUS,
    color: args['color']
  });
  this.startRecallTimer();
};

Util.inherits(Disc, MovingObject);

Disc.prototype.calcVel = function (start, target) {
  var vel = Util.normalizedVector(start, target);
  return [vel[0] * 5, vel[1] * 5];
};

Disc.prototype.getImage = function () {
  var image = new Image();
  if (this.team === "human") {
    image.src = './assets/blue_disc.png';
  } else {
    image.src = './assets/orange_disc.png';
  }
  return image;
};

Disc.prototype.startRecallTimer = function () {
  setTimeout(function () {
    this.recall();
  }.bind(this), 5000);
};

Disc.prototype.recall = function () {
  this.PLAYER.removeDisc(this);
  this.game.removeDisc(this);
};

Disc.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof MovingObject) {
      if (!(otherObject instanceof Disc)) {
        otherObject.hitByDisc(this.vel);
      }
      this.vel = [this.vel[0] * -1, this.vel[1] * -1];

    } else if (otherObject instanceof StationaryObject) {
      this.vel = otherObject.bounceVec(this.vel);
    }
};

Disc.prototype.isCollidedWith = function (otherObject) {
  if (otherObject instanceof MovingObject) {
    return this.isCollidedWithMovingObject(otherObject);
  } else if (otherObject.type !== 'platform'){
    return this.isCollidedWithWall(otherObject);
  } else {
    return false;
  }
};

Disc.prototype.isCollidedWithWall = function (otherObject) {
  if (
    (this.pos[0] < otherObject.x + otherObject.width) &&
    (this.pos[0] > otherObject.x) &&
    (this.pos[1] < otherObject.y + otherObject.height) &&
    (this.pos[1] > otherObject.y)
  ) {
    return true;
  } else {
    return false;
  }
};

Disc.prototype.isCollidedWithMovingObject = function (otherObject) {
  var xDiff = (this.pos[0] - otherObject.pos[0]);
  var yDiff = (this.pos[1] - otherObject.pos[1]);
  var radii = this.radius + otherObject.radius;
  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (distance < radii) {
    return true;
  }
  return false;
};

Disc.prototype.draw = function (ctx) {
  ctx.lineWidth = 5;

  if (this.pastPos.length > 1) {
    this.drawTrace(ctx);
    if (this.pastPos.length > 10) {
      this.pastPos.pop();
    }
  }
  this.pastPos.unshift(this.pos.slice());
  // offset image placement to center on radius of collision
  ctx.drawImage(this.image, this.pos[0] - 15, this.pos[1] - 15, 30, 30);
};

Disc.prototype.drawTrace = function (ctx) {
  var opac = '0.3';
  var radius = this.radius;
  ctx.compositeOperation = 'lighter';

  for (var i = 0; i < this.pastPos.length - 1; i++){
    ctx.fillStyle = this.color.slice(0, -2) + opac + ")";

    ctx.beginPath();
    ctx.arc(
      this.pastPos[i][0],
      this.pastPos[i][1],
      radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    opac = opac - 0.02;
    radius -= 0.5;
  }
};

module.exports = Disc;
