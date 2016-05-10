var Utils = require('./utils');
var MovingObject = require('./movingObject');
var Game = require('./game');

var GameView = function(game, ctx){
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  var that = this;
  setInterval(function(){
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

module.exports = GameView;
