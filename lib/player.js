var Utils = require('./utils'),
Disc = require('./disc'),
MovingObject = require('./movingObject');

var Player = function(args){
  this.RADIUS = 20;
  this.COLOR = '#6666ff';
  this.fallCount = 0;
  this.moveCount = 0;
  this.discs = [];
  this.fallen = false;
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

Utils.inherits(Player, MovingObject);

Player.prototype.getImage = function () {
  var image = new Image();
  image.src = './assets/player_sprites.png';
  return image;
};

Player.prototype.step = function (direction) {
  if (this.vel[0] > 10 || this.vel[1] > 10){
    return;
  }
  this.vel[0] = (this.vel[0] + direction[0] * 2) * .7;
  this.vel[1] = (this.vel[1] + direction[1] * 2) * .7;
};

Player.prototype.standStill = function () {
  // this.vel[0] = this.vel[0] / 10;
  // this.vel[1] = this.vel[1] / 10;
};

Player.prototype.shoot = function (event) {
  if (this.discs.length > 2){
    return;
  }
  var x, y;

  // offset x coord to account for window spacing

  x = event.clientX + -300;
  y = event.clientY;
  var disc = new Disc({
    player: this,
    team: 'human',
    game: this.game,
    pos: this.pos.slice(),
    target: [x,y],
    color: 'rgba(29,222,240, 1)'
  });
  this.discs.push(disc);
  this.game.shootDisc(disc);
};

Player.prototype.getBounced = function (discVel) {
  this.vel[0] += discVel[0];
  this.vel[1] += discVel[1];
};

Player.prototype.hitByDisc = function (discVel) {
  this.getBounced(discVel);
};

Player.prototype.fall = function () {
  this.fallen = true;
  this.draw = function (ctx) {
    if (50 - this.fallCount < 0){
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

Player.prototype.removeDisc = function (disc) {
  var index = this.discs.indexOf(disc);
  this.discs.splice(index, 1);
};

MovingObject.prototype.draw = function(ctx){
  ctx.drawImage(this.image, 56, 2, 19, 24, this.pos[0] - 20, this.pos[1] - 40, 40, 60);


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


module.exports = Player;
