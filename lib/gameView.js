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
  this.interval = setInterval(function(){
    that.game.step();
    that.game.draw(that.ctx);

  }, 15);
};

GameView.prototype.bindKeyHandlers = function () {
  var human = this.game.players.player;
  key('w', human.step.bind(human, [0, -1]));
  key('s', human.step.bind(human, [0, 1]));
  key('a', human.step.bind(human, [-1, 0]));
  key('d', human.step.bind(human, [1, 0]));
  window.addEventListener('click', human.shoot.bind(human));
};

module.exports = GameView;
