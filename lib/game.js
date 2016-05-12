var Arena = require('./arena'),
Player = require('./player'),
ComputerPlayer = require('./computerPlayer');

var Game = function (level) {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.level = level;
  this.arena = new Arena(this.level);
  this.players = {};
  this.state = 'over';
  this.players['player'] = new Player({game:this, pos: [300,530]});
  this.players['opponent'] = new ComputerPlayer(
    {
      game:this,
      pos: [300,70],
      arena: this.arena,
      human: this.players['player']
    });

  this.discs = [];
};

Game.prototype.step = function () {
  this.state = 'running';
  this.moveObjects();
  this.checkInteractions();
  this.players['opponent'].think();
};

Game.prototype.shootDisc = function (disc) {
  this.discs.push(disc);
};

Game.prototype.removeDisc = function (disc) {
  var index = this.discs.indexOf(disc);
  this.discs.splice(index, 1);

};

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 600, 600);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,600,600);
    this.allObjects().forEach(function(object){
      object.draw(ctx);
    });
};

Game.prototype.allObjects = function () {
  return this.arena.allObjects().concat([
    this.players['opponent'],
    this.players['player']
  ]).concat(this.discs);
};

Game.prototype.moveObjects = function () {
  var moveProne = this.discs.concat([
    this.players['opponent'],
    this.players['player']
  ]);
  moveProne.forEach(function (object) {
    object.move();
  });
};

Game.prototype.checkInteractions = function () {
  this.checkCollisions();
  this.checkFalls();
};

Game.prototype.checkFalls = function () {
  Object.keys(this.players).forEach(function (key) {
    if (this.arena.onPlatform(this.players[key].pos, key)){
      return;
    } else {
      this.players[key].fall();
    }
  }.bind(this));
};

Game.prototype.checkCollisions = function () {
  var collisionProne = [
    this.players['opponent'],
    this.players['player']
  ].concat(this.discs).concat(this.arena.WALLS);
  this.discs.forEach(function (disc) {
    for (var i = 0; i < collisionProne.length; i++){
      var object = collisionProne[i];
      if (disc.isCollidedWith(object) &&
          disc !== object && disc.PLAYER !== object) {
        disc.collideWith(object);
      }
    }
  });
};

module.exports = Game;
