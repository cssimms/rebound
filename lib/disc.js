var Util = require('./utils'),
MovingObject = require('./movingObject'),
StationaryObject = require('./stationaryObject');

var Disc = function (args) {
  this.RADIUS = 5;
  this.VELOCITY = this.calcVel(args['pos'], args['target']);
  this.PLAYER = args['player'];
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
  return [vel[0] * 3, vel[1] * 3];
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
module.exports = Disc;
