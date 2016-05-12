/* global key */

var Utils = require('./utils'),
MovingObject = require('./movingObject'),
Game = require('./game');

var GameView = function(game, ctx){
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.interval = setInterval(this.loop.bind(this), 15);
};

GameView.prototype.stop = function () {
  clearInterval(this.interval);
};

GameView.prototype.loop = function () {
  var that = this;
  var game = this.game;
  if (game.state === 'over'){
    that.stop();
    if (game.looser === 'player') {
      $('h1').text('You Lose');
    } else if (that.game.level > 1){
      $('h1').text('You Win!');      
    } else {
      var newGame = new Game(game.level + 1);
      that.game = newGame;
      that.start();
    }
  } else {
    game.step();
    game.draw(that.ctx);
  }
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
