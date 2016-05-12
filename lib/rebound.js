var Game = require('./game');
var GameView = require('./gameView.js');

var element = document.getElementById("game-canvas");
var ctx = element.getContext("2d");

var newGame = new Game();
var newGameView = new GameView(newGame, ctx);

$('button').on('click', function () {
  newGameView.start();

});
