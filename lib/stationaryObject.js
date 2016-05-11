var Util = require('./utils');

var StationaryObject = function (args) {
  this.type = args["type"];
  this.x = args["x"];
  this.y = args["y"];
  this.width = args["width"];
  this.height = args["height"];
  this.color = args["color"];
};

StationaryObject.prototype.bounceVec = function (vel) {
  if (this.type === 'platform'){
    return;
  } else if (this.type === 'north' || this.type === 'south') {
    return ([vel[0], vel[1] * -1]);
  } else if (this.type === 'west' || this.type === 'east') {
    return ([vel[0] * -1, vel[1]]);
  }
};

StationaryObject.prototype.collideWith = function () {

};

StationaryObject.prototype.isCollidedWith = function () {
  return false;
};

StationaryObject.prototype.move = function () {

};

StationaryObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  );
};

module.exports = StationaryObject;
