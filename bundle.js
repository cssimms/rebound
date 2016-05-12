/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(7);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Arena = __webpack_require__(2),
	Player = __webpack_require__(3),
	ComputerPlayer = __webpack_require__(6);

	var Game = function (level) {
	  this.DIM_X = 600;
	  this.DIM_Y = 600;
	  this.level = level;
	  this.arena = new Arena(this.level);
	  this.players = {};
	  this.state = 'running';
	  this.looser = null;
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
	    ctx.clearRect(0, 0, 600, 600);
	    ctx.fillStyle = "#000000";
	    ctx.fillRect(0,0,600,600);
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
	      this.state = 'over';
	      this.looser = key;
	    }
	  }.bind(this));
	};

	Game.prototype.checkCollisions = function () {
	  var collisionProne = [
	    this.players['opponent'],
	    this.players['player']
	  ].concat(this.discs).concat(this.arena.WALLS);
	  this.discs.forEach(function (disc) {
	    for (var i = 0; i < collisionProne.length; i++){
	      var object = collisionProne[i];
	      if (disc.isCollidedWith(object) &&
	          disc !== object && disc.PLAYER !== object) {
	        disc.collideWith(object);
	      }
	    }
	  });
	};

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var StationaryObject = __webpack_require__(9);

	var Arena = function (level) {
	  this.LEVEL = level;
	  this.COLOR = '#404040';
	  this.levelVariables = {};
	  this.setLevel(this.LEVEL);
	  this.PLATFORMS = this.platforms();
	  this.WALLS = this.walls();
	};

	Arena.prototype.allObjects = function () {
	  return ([this.PLATFORMS.opponent, this.PLATFORMS.player].concat(this.WALLS));
	};

	Arena.prototype.onPlatform = function (pos, player) {
	  var platType;
	    if (
	      (pos[0] < this.PLATFORMS[player].x + this.PLATFORMS[player].width) &&
	      (pos[0] > this.PLATFORMS[player].x) &&
	      (pos[1] < this.PLATFORMS[player].y + this.PLATFORMS[player].height) &&
	      (pos[1] > this.PLATFORMS[player].y)
	    ){
	      return true;
	    } else {
	      return false;
	    }
	};

	Arena.prototype.draw = function (ctx) {
	  var x, y, w, h;
	  var platforms = this.PLATFORMS;
	  var walls = this.WALLS;

	  Object.keys(platforms).forEach(function (key) {
	    ctx.fillStyle = platforms[key].color;
	    ctx.fillRect(
	      platforms[key]['x'],
	      platforms[key]['y'],
	      platforms[key]['width'],
	      platforms[key]['height']
	    );
	  });

	  Object.keys(walls).forEach(function (key) {
	    ctx.fillStyle = walls[key].color;
	    ctx.fillRect(
	      walls[key]['x'],
	      walls[key]['y'],
	      walls[key]['width'],
	      walls[key]['height']
	    );
	  });

	};

	Arena.prototype.move = function () {
	  return;
	};



	Arena.prototype.platforms = function (level) {
	  return ({
	    opponent: new StationaryObject({
	      type: 'platform',
	      x: this.levelVariables.opponent.x,
	      y: this.levelVariables.opponent.y,
	      width: this.levelVariables.opponent.width,
	      height: this.levelVariables.opponent.height,
	      color: '#404040'
	    }),
	    player: new StationaryObject({
	      type: 'platform',
	      x: this.levelVariables.player.x,
	      y: this.levelVariables.player.y,
	      width: this.levelVariables.player.width,
	      height: this.levelVariables.player.height,
	      color: '#404040'
	    })
	  });
	};

	Arena.prototype.walls = function (level) {
	  var color = '#ffffff';
	  return ([
	    new StationaryObject ({
	      type: 'north',
	      x: this.levelVariables.north.x,
	      y: this.levelVariables.north.y,
	      width: this.levelVariables.north.width,
	      height: this.levelVariables.north.height,
	      color: color
	    }),
	    new StationaryObject ({
	      type: 'south',
	      x: this.levelVariables.south.x,
	      y: this.levelVariables.south.y,
	      width: this.levelVariables.south.width,
	      height: this.levelVariables.south.height,
	      color: color
	    }),
	    new StationaryObject ({
	      type: 'west',
	      x: this.levelVariables.west.x,
	      y: this.levelVariables.west.y,
	      width: this.levelVariables.west.width,
	      height: this.levelVariables.west.height,
	      color: color
	    }),
	    new StationaryObject({
	      type: 'east',
	      x: this.levelVariables.east.x,
	      y: this.levelVariables.east.y,
	      width: this.levelVariables.east.width,
	      height: this.levelVariables.east.height,
	      color: color
	    })
	  ]);
	};

	Arena.prototype.setLevel = function (level) {
	  switch (level){
	    case 1:
	      this.levelVariables = {
	        opponent: {
	          x: 250,
	          y: 20,
	          width: 100,
	          height: 100,
	        },
	        player: {
	          x: 170,
	          y: 380,
	          width: 260,
	          height: 200,
	        },
	        north: {
	          x: 150,
	          y: 0,
	          width: 300,
	          height: 10,
	        },
	        south: {
	          x: 150,
	          y: 590,
	          width: 300,
	          height: 10,
	        },
	        west: {
	          x: 150,
	          y: 0,
	          width: 10,
	          height: 600,
	        },
	        east: {
	          x: 440,
	          y: 0,
	          width: 10,
	          height: 600,
	        }
	      };
	      break;
	  case 2:
	    this.levelVariables = {
	      opponent: {
	        x: 170,
	        y: 20,
	        width: 260,
	        height: 100,
	      },
	      player: {
	        x: 20,
	        y: 380,
	        width: 560,
	        height: 200,
	      },
	      north: {
	        x: 0,
	        y: 0,
	        width: 600,
	        height: 10,
	      },
	      south: {
	        x: 0,
	        y: 590,
	        width: 600,
	        height: 10,
	      },
	      west: {
	        x: 0,
	        y: 0,
	        width: 10,
	        height: 600,
	      },
	      east: {
	        x: 590,
	        y: 0,
	        width: 10,
	        height: 600,
	      }
	    };
	    break;
	  }
	};

	module.exports = Arena;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(4),
	Disc = __webpack_require__(8),
	MovingObject = __webpack_require__(5);

	var Player = function(args){
	  this.RADIUS = 10;
	  this.COLOR = '#ff6666';
	  this.fallCount = 0;
	  this.moveCount = 0;
	  this.discs = [];
	  this.fallen = false;
	  MovingObject.call(this, {
	      game: args['game'],
	      pos: args['pos'],
	      vel: [0,0],
	      radius: this.RADIUS,
	      color: this.COLOR
	    }
	  );
	};

	Utils.inherits(Player, MovingObject);

	Player.prototype.step = function (direction) {
	  if (this.vel[0] > 10 || this.vel[1] > 10){
	    return;
	  }
	  this.vel[0] = (this.vel[0] + direction[0] * 2) * .7;
	  this.vel[1] = (this.vel[1] + direction[1] * 2) * .7;
	};

	Player.prototype.shoot = function (event) {
	  if (this.discs.length > 4){
	    return;
	  }
	  var x, y;
	  x = event.clientX;
	  y = event.clientY;
	  var disc = new Disc({
	    player: this,
	    game: this.game,
	    pos: this.pos.slice(),
	    target: [x,y],
	    color: '#7f3333'
	  });
	  this.discs.push(disc);
	  this.game.shootDisc(disc);
	};

	Player.prototype.getBounced = function (discVel) {
	  this.vel[0] += discVel[0];
	  this.vel[1] += discVel[1];
	};

	Player.prototype.hitByDisc = function (discVel) {
	  this.getBounced(discVel);
	};

	Player.prototype.fall = function () {
	  this.fallen = true;
	  this.draw = function (ctx) {
	    if (this.radius - this.fallCount < 0){
	      return;
	    }
	    ctx.fillStyle = this.color;
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius - this.fallCount,
	      0,
	      2 * Math.PI,
	      false
	    );

	    ctx.fill();
	    this.fallCount += 1;
	  };
	};

	Player.prototype.removeDisc = function (disc) {
	  var index = this.discs.indexOf(disc);
	  this.discs.splice(index, 1);
	};

	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Util = function(){};

	Util.inherits = function (Child, Parent) {
	  var Surrogate = function () {};
	  Surrogate.prototype = Parent.prototype;
	  Child.prototype = new Surrogate;
	  Child.constructor = Child;
	};

	Util.normalizedVector = function (start, target) {
	  var magnitude = this.magnitude(start, target);
	  var vector = ([
	      (target[0] - start[0]), (target[1] - start[1])
	    ]);
	  return [(vector[0] / magnitude), (vector[1] / magnitude)];
	};

	Util.magnitude = function (start, end) {
	  var xDiff = (start[0] - end[0]);
	  var yDiff = (start[1] - end[1]);

	  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var StationaryObject = __webpack_require__(9);

	var MovingObject = function(args){
	  this.game = args["game"];
	  this.pos = args["pos"];
	  this.vel = args["vel"];
	  this.radius = args["radius"];
	  this.color = args["color"];
	};

	MovingObject.prototype.draw = function(ctx){
	  ctx.fillStyle = this.color;
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius,
	      0,
	      2 * Math.PI,
	      false
	    );

	    ctx.fill();
	  };

	MovingObject.prototype.move = function(){
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  // this.pos = this.game.wrap(this.pos);
	};


	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4),
	Disc = __webpack_require__(8),
	MovingObject = __webpack_require__(5);

	var ComputerPlayer = function (args) {
	  this.RADIUS = 10;
	  this.COLOR = '#6666ff';
	  this.fallCount = 0;
	  this.moveCount = 0;
	  this.fallen = false;
	  this.target = {
	    pos: [],
	    radius: 10
	  };
	  this.arena = args['arena'];
	  this.safeZone = this.generateSafeZone(args['arena']);
	  this.hit = false;
	  this.discVel = null;
	  this.discs = [];
	  this.human = args['human'];
	  MovingObject.call(this, {
	      game: args['game'],
	      pos: args['pos'],
	      vel: [0,0],
	      radius: this.RADIUS,
	      color: this.COLOR
	    }
	  );
	};

	Util.inherits(ComputerPlayer, MovingObject);

	ComputerPlayer.prototype.think = function () {
	  this.moveCount++;
	  if (this.hit){
	    this.getBounced();
	    this.hit = false;
	    this.moveRandom();
	  } else if ((this.moveCount / 50) > 1 || this.vel === [0,0]) {
	    this.moveRandom();
	    this.moveCount = 0;
	    this.shoot();
	  } else if (this.nearTarget() || this.outsideSafeZone()){
	    this.vel = [this.vel[0] * .7, this.vel[1] * .7];
	  }
	};

	ComputerPlayer.prototype.shoot = function (event) {
	  if (this.discs.length > 4){
	    return;
	  }
	  var x = this.human.pos[0];
	  var y = this.human.pos[1];
	  var compDisc = new Disc({
	    player: this,
	    game: this.game,
	    pos: this.pos.slice(),
	    target: [x,y],
	    color: '#0000a1'
	  });
	  this.discs.push(compDisc);
	  this.game.shootDisc(compDisc);
	};


	ComputerPlayer.prototype.generateSafeZone = function (arena) {
	  var platform = arena.PLATFORMS['opponent'];
	  return ({
	    x: platform.x + 10,
	    y: platform.y + 10,
	    width: platform.width - 20,
	    height: platform.height - 20
	  });
	};

	ComputerPlayer.prototype.outsideSafeZone = function () {
	  if (
	    (this.pos[0] < this.safeZone.x + this.safeZone.width) &&
	    (this.pos[0] > this.safeZone.x) &&
	    (this.pos[1] < this.safeZone.y + this.safeZone.height) &&
	    (this.pos[1] > this.safeZone.y)
	  ) {
	    return false;
	  } else {
	    return true;
	  }
	};

	ComputerPlayer.prototype.moveNearOpposite = function () {
	  this.vel = [
	    this.vel[0] + Math.random() * -1,
	    this.vel[1] + Math.random() * -1];
	};

	ComputerPlayer.prototype.moveRandom = function () {
	  var target = [];
	  target[0] = Math.random() * (this.safeZone.width) + this.safeZone.x;
	  target[1] = Math.random() * (this.safeZone.height) + this.safeZone.y;

	  this.target.pos = [target[0], target[1]];

	  var vector = Util.normalizedVector(this.pos, target);
	  this.vel = [this.vel[0] + vector[0], this.vel[1] + vector[1]];
	};

	ComputerPlayer.prototype.nearTarget = function () {
	  var xDiff = (this.pos[0] - this.target.pos[0]);
	  var yDiff = (this.pos[1] - this.target.pos[1]);
	  var radii = this.RADIUS + this.target.radius;
	  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	  if (distance < radii) {
	    return true;
	  }
	  return false;
	};

	ComputerPlayer.prototype.getBounced = function () {
	  this.vel[0] += this.discVel[0] * 2;
	  this.vel[1] += this.discVel[1] * 2;
	};

	ComputerPlayer.prototype.fall = function () {
	  this.fallen = true;
	  this.draw = function (ctx) {
	    if (this.radius - this.fallCount < 0){
	      return;
	    }
	    ctx.fillStyle = this.color;
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius - this.fallCount,
	      0,
	      2 * Math.PI,
	      false
	    );

	    ctx.fill();
	    this.fallCount += 1;
	  };
	};

	ComputerPlayer.prototype.hitByDisc = function (discVel) {
	  this.discVel = discVel;
	  this.hit = true;
	};

	ComputerPlayer.prototype.removeDisc = function (disc) {
	  var index = this.discs.indexOf(disc);
	  this.discs.splice(index, 1);
	};

	module.exports = ComputerPlayer;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* global key */

	var Utils = __webpack_require__(4),
	MovingObject = __webpack_require__(5),
	Game = __webpack_require__(1);

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4),
	MovingObject = __webpack_require__(5),
	StationaryObject = __webpack_require__(9);

	var Disc = function (args) {
	  this.RADIUS = 5;
	  this.VELOCITY = this.calcVel(args['pos'], args['target']);
	  this.PLAYER = args['player'];
	  MovingObject.call(this, {
	    game: args['game'],
	    pos: args['pos'],
	    vel: this.VELOCITY,
	    radius: this.RADIUS,
	    color: args['color']
	  });
	  this.startRecallTimer();
	};

	Util.inherits(Disc, MovingObject);

	Disc.prototype.calcVel = function (start, target) {
	  var vel = Util.normalizedVector(start, target);
	  return [vel[0] * 3, vel[1] * 3];
	};

	Disc.prototype.startRecallTimer = function () {
	  setTimeout(function () {
	    this.recall();
	  }.bind(this), 5000);
	};

	Disc.prototype.recall = function () {
	  this.PLAYER.removeDisc(this);
	  this.game.removeDisc(this);
	};

	Disc.prototype.collideWith = function (otherObject) {
	  // check for instanceof Player or ComputerPlayer??

	    if (otherObject instanceof MovingObject) {
	      if (!(otherObject instanceof Disc)) {
	        otherObject.hitByDisc(this.vel);
	      }
	      this.vel = [this.vel[0] * -1, this.vel[1] * -1];

	    } else if (otherObject instanceof StationaryObject) {
	      this.vel = otherObject.bounceVec(this.vel);
	    }
	};

	Disc.prototype.isCollidedWith = function (otherObject) {
	  if (otherObject instanceof MovingObject) {
	    var xDiff = (this.pos[0] - otherObject.pos[0]);
	    var yDiff = (this.pos[1] - otherObject.pos[1]);
	    var radii = this.radius + otherObject.radius;
	    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	    if (distance < radii) {
	      return true;
	    }
	    return false;
	  } else if (otherObject.type !== 'platform'){
	    if (
	      (this.pos[0] < otherObject.x + otherObject.width) &&
	      (this.pos[0] > otherObject.x) &&
	      (this.pos[1] < otherObject.y + otherObject.height) &&
	      (this.pos[1] > otherObject.y)
	    ) {
	        return true;
	      } else {
	        return false;
	      }
	  } else {
	    return false;
	  }
	};
	module.exports = Disc;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);

	var StationaryObject = function (args) {
	  this.type = args["type"];
	  this.x = args["x"];
	  this.y = args["y"];
	  this.width = args["width"];
	  this.height = args["height"];
	  this.color = args["color"];
	};

	StationaryObject.prototype.bounceVec = function (vel) {
	  if (this.type === 'platform'){
	    return;
	  } else if (this.type === 'north' || this.type === 'south') {
	    return ([vel[0], vel[1] * -1]);
	  } else if (this.type === 'west' || this.type === 'east') {
	    return ([vel[0] * -1, vel[1]]);
	  }
	};

	StationaryObject.prototype.collideWith = function () {

	};

	StationaryObject.prototype.isCollidedWith = function () {
	  return false;
	};

	StationaryObject.prototype.move = function () {

	};

	StationaryObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.fillRect(
	    this.x,
	    this.y,
	    this.width,
	    this.height
	  );
	};

	module.exports = StationaryObject;


/***/ }
/******/ ]);