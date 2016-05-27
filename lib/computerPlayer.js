var Utils = require('./utils'),
Disc = require('./disc'),
MovingObject = require('./movingObject');

var ComputerPlayer = function (args) {
  this.RADIUS = 20;
  this.COLOR = '#ff6666';

  this.fallCount = 0;
  this.moveCount = 0;
  this.fallen = false;
  this.target = {
    pos: [],
    radius: 10
  };
  this.arena = args['arena'];
  this.safeZone = this.generateSafeZone(args['arena']);
  this.hit = false;
  this.discVel = null;
  this.discs = [];
  this.human = args['human'];
  this.image = this.getImage();
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

ComputerPlayer.prototype.getImage = function () {
  var image = new Image();

  // var velSlope = Math.abs(this.vel[1] / this.vel[0]);
  // if (velSlope < 1) {
  //   if (this.vel[0] < 0) {
  //     // point left
  //   } else {
  //     // point right
  //   }
  // } else {
  //   if (this.vel[1] < 0){
  //     // point up
  //   } else {
  //     // point down
  //   }
  // }

  image.src = './assets/crom_sprites.png';
  return image;
};

ComputerPlayer.prototype.think = function () {
  this.moveCount++;
  if (this.hit){
    this.getBounced();
    this.hit = false;
    this.moveRandom();
  } else if ((this.moveCount / 50) > 1 || this.vel === [0,0]) {
    this.moveRandom();
    this.moveCount = 0;
    this.shoot();
  } else if (this.nearTarget() || this.outsideSafeZone()){
    this.vel = [this.vel[0] * .7, this.vel[1] * .7];
  }
};

ComputerPlayer.prototype.shoot = function (event) {
  if (this.discs.length > 2){
    return;
  }
  var x = this.human.pos[0];
  var y = this.human.pos[1];

  var compDisc = new Disc({
    player: this,
    team: 'computer',
    game: this.game,
    pos: this.pos.slice(),
    target: [x,y],
    color: 'rgba(252, 127, 38, 1)'
  });
  this.discs.push(compDisc);
  this.game.shootDisc(compDisc);
};


ComputerPlayer.prototype.generateSafeZone = function (arena) {
  var platform = arena.PLATFORMS['opponent'];
  return ({
    x: platform.x + 10,
    y: platform.y + 10,
    width: platform.width - 20,
    height: platform.height - 20
  });
};

ComputerPlayer.prototype.outsideSafeZone = function () {
  if (
    (this.pos[0] < this.safeZone.x + this.safeZone.width) &&
    (this.pos[0] > this.safeZone.x) &&
    (this.pos[1] < this.safeZone.y + this.safeZone.height) &&
    (this.pos[1] > this.safeZone.y)
  ) {
    return false;
  } else {
    return true;
  }
};

ComputerPlayer.prototype.moveNearOpposite = function () {
  this.vel = [
    this.vel[0] + Math.random() * -1,
    this.vel[1] + Math.random() * -1];
};

ComputerPlayer.prototype.moveRandom = function () {
  var target = [];
  target[0] = Math.random() * (this.safeZone.width) + this.safeZone.x;
  target[1] = Math.random() * (this.safeZone.height) + this.safeZone.y;

  this.target.pos = [target[0], target[1]];

  var vector = Utils.normalizedVector(this.pos, target);
  this.vel = [this.vel[0] + vector[0], this.vel[1] + vector[1]];
};

ComputerPlayer.prototype.nearTarget = function () {
  var xDiff = (this.pos[0] - this.target.pos[0]);
  var yDiff = (this.pos[1] - this.target.pos[1]);
  var radii = this.RADIUS + this.target.radius;
  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (distance < radii) {
    return true;
  }
  return false;
};

ComputerPlayer.prototype.getBounced = function () {
  this.vel[0] += this.discVel[0] * 2;
  this.vel[1] += this.discVel[1] * 2;
};

ComputerPlayer.prototype.fall = function () {
  this.fallen = true;
  this.draw = function (ctx) {
    if (this.radius - this.fallCount < 0){
      return;
    }
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius - this.fallCount,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    //
    // ctx.fill();
    var image = new Image();
    image.src = './assets/player_sprites.png';
    var fallSize = 50 - this.fallCount * 2;
    ctx.drawImage(image, 56, 2, 19, 24,
      this.pos[0] - 20, this.pos[1] - 40, fallSize, fallSize);

    this.fallCount += 1;
  };
};

ComputerPlayer.prototype.hitByDisc = function (discVel) {
  this.discVel = discVel;
  this.hit = true;
};

ComputerPlayer.prototype.removeDisc = function (disc) {
  var index = this.discs.indexOf(disc);
  this.discs.splice(index, 1);
};

ComputerPlayer.prototype.draw = function(ctx){
  ctx.drawImage(this.image, 38, 2, 18, 24, this.pos[0] - 20, this.pos[1] - 40, 40, 60);

  // ctx.fillStyle = this.color;
  //   ctx.beginPath();
  //   ctx.arc(
  //     this.pos[0],
  //     this.pos[1],
  //     this.radius,
  //     0,
  //     2 * Math.PI,
  //     false
  //   );
  //
  //   ctx.fill();
  };

module.exports = ComputerPlayer;
