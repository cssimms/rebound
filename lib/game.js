var Arena = require('./arena'),
Player = require('./player'),
ComputerPlayer = require('./computerPlayer');

var Game = function () {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.players = [
    new ComputerPlayer({game:this, pos: [100,100]}),
    new Player({game:this, pos: [500,500]})
  ];
  this.arena = new Arena(1);

};

Game.prototype.step = function () {

};

Game.prototype.bounce = function () {
  
};

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 800, 800);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,800,800);
    this.allObjects().forEach(function(object){
      object.draw(ctx);
    });
};

Game.prototype.allObjects = function () {
  return this.players.concat(this.arena);
};

module.exports = Game;
