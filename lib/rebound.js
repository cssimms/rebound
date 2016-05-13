var Game = require('./game');
var GameView = require('./gameView.js');

var element = document.getElementById("game-canvas");
var ctx = element.getContext("2d");
var newGame = null;
var newGameView = null;

var initiateNew = function () {
  $('button').text('Reset');
  if (newGameView){
    newGameView.stop();
  }
  newGame = new Game(1);
  newGameView = new GameView(newGame, ctx);
  newGameView.start();
};

$('button').on('click', initiateNew);
