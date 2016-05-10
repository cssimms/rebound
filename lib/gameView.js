/* global key */

var Utils = require('./utils'),
MovingObject = require('./movingObject'),
Game = require('./game');

var GameView = function(game, ctx){
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  var that = this;
  this.bindKeyHandlers();
  setInterval(function(){
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  var human = this.game.players.human;
  debugger
  key('w', human.step.bind(human, [0, -1]));
  key('s', human.move([0, 1]));
  key('a', human.move([1, 0]));
  key('d', human.move([-1, 0]));
};

module.exports = GameView;
