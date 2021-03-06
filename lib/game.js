var Arena = require('./arena'),
Player = require('./player'),
ComputerPlayer = require('./computerPlayer');
const gameConfig = require('./config/gameConfig');

var Game = function (level) {
  this.DIM_X = gameConfig.board.width;
  this.DIM_Y = gameConfig.board.height;
  this.level = level;
  this.arena = new Arena(this.level);
  this.state = 'running';
  this.looser = null;
  this.players = {};
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
    var image = new Image();
    image.src = './assets/stars.jpg';
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(image, 0, 0, this.DIM_X, this.DIM_Y);
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
      this.looser = key;
    }

    if (this.players[key].fallCount > 20){
      this.state = 'over';
    }
  }.bind(this));
};

Game.prototype.checkCollisions = function () {
  var collisionProne = [
    this.players['opponent'],
    this.players['player']
  ].concat(this.discs).concat(this.arena.WALLS);

  this.discs.forEach(function (disc) {
    collisionProne.forEach(function (object) {
      if (disc.isCollidedWith(object) &&
          disc !== object && disc.PLAYER !== object) {
        disc.collideWith(object);
      }
    });
  });
};

module.exports = Game;
