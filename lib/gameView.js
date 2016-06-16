var Utils = require('./utils'),
MovingObject = require('./movingObject'),
Game = require('./game');

var GameView = function(game, ctx){
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  $('.message').text('Throw discs to push Crom off his platform!');
  this.interval = setInterval(this.loop.bind(this), 15);
  this.bindKeyHandlers();
};

GameView.prototype.stop = function () {
  clearInterval(this.interval);
};

GameView.prototype.loop = function () {
  var that = this; //Not necessary.
  var game = this.game; //If you do this, why do you use that.game in the rest of the function?

  if (that.game.level === 1){ //use a switch
    $('.message').text('Level 1');
  } else if (that.game.level === 2){
    $('.message').text('Level 2');
  } else if (that.game.level === 3){
    $('.message').text('Final Level');
  }

  if (game.state === 'over'){ //Why do you switch between "game" and "that.game".  Be consistent.
    that.stop();
    if (game.looser === 'player') {
      $('.message').text('You Lose');
    } else if (this.game.level > 2){
      $('.message').text('You Win!');
    } else {
      var newGame = new Game(game.level + 1); //No need for the extra variable, just say game = new Game(game.level + 1)
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
  window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case 65:
        human.step([-1, 0]);
        break;
      case 68:
        human.step([1, 0]);
        break;
      case 83:
        human.step([0, 1]);
        break;
      case 87:
        human.step([0, -1]);
        break;
    }
  });

  window.addEventListener('keyup', human.standStill.bind(human));

  window.addEventListener('click', human.shoot.bind(human));
};

module.exports = GameView;
