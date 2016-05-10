var Arena = require('./arena'),
Player = require('./player'),
ComputerPlayer = require('./computerPlayer');

var Game = function () {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.players = {
    comp: new ComputerPlayer({game:this, pos: [150,150]}),
    human: new Player({game:this, pos: [300,450]})
  };
  this.arena = new Arena(1);

};

Game.prototype.step = function () {
  this.moveObjects();
};

Game.prototype.bounce = function () {

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
  return [this.arena, this.players['comp'], this.players['human']];
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};

module.exports = Game;
