var StationaryObject = require('./stationaryObject');

var MovingObject = function(args){
  this.game = args["game"];
  this.pos = args["pos"];
  this.vel = args["vel"];
  this.radius = args["radius"];
  this.color = args["color"];
};

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
    ctx.beginPath(); // Indent is off.
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};


module.exports = MovingObject;
