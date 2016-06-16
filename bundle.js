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
	var GameView = __webpack_require__(10);

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
	Player = __webpack_require__(6),
	ComputerPlayer = __webpack_require__(9);

	var Game = function (level) {
	  this.DIM_X = 600;
	  this.DIM_Y = 600;
	  this.level = level;
	  this.arena = new Arena(this.level);
	  this.state = 'running';
	  this.looser = null;
	  this.players = {};
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
	    var image = new Image();
	    image.src = './assets/stars.jpg';
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    ctx.drawImage(image, 0, 0, this.DIM_X, this.DIM_Y);
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
	      this.looser = key;
	    }

	    if (this.players[key].fallCount > 20){
	      this.state = 'over';
	    }
	  }.bind(this));
	};

	Game.prototype.checkCollisions = function () {
	  var collisionProne = [
	    this.players['opponent'],
	    this.players['player']
	  ].concat(this.discs).concat(this.arena.WALLS);

	  this.discs.forEach(function (disc) {
	    collisionProne.forEach(function (object) {
	      if (disc.isCollidedWith(object) &&
	          disc !== object && disc.PLAYER !== object) {
	        disc.collideWith(object);
	      }
	    });
	  });
	};

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var StationaryObject = __webpack_require__(3),
	LevelSettings = __webpack_require__(5);

	var Arena = function (level) {
	  this.LEVEL = level;
	  this.PLATFORMCOLOR = '#404040';
	  this.LEVELSETTINGS = LevelSettings(level);
	  this.PLATFORMS = this.platforms();
	  this.WALLS = this.walls();
	};

	Arena.prototype.allObjects = function () {
	  return ([this.PLATFORMS.opponent, this.PLATFORMS.player].concat(this.WALLS));
	};

	Arena.prototype.onPlatform = function (pos, player) {
	  var plats = this.PLATFORMS[player];

	  return ((pos[0] < plats.x + plats.width) &&
	         (pos[0] > plats.x) &&
	         (pos[1] < plats.y + plats.height) &&
	         (pos[1] > plats.y));
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
	    ctx.beingPath();
	    ctx.rect(
	      walls[key]['x'],
	      walls[key]['y'],
	      walls[key]['width'],
	      walls[key]['height']
	    );
	    ctx.stroke();
	  });

	};

	Arena.prototype.move = function () {
	  return;
	};

	Arena.prototype.platforms = function (level) {
	  return ({
	    opponent: new StationaryObject({
	      type: 'platform',
	      x: this.LEVELSETTINGS.opponent.x,
	      y: this.LEVELSETTINGS.opponent.y,
	      width: this.LEVELSETTINGS.opponent.width,
	      height: this.LEVELSETTINGS.opponent.height,
	      color: this.PLATFORMCOLOR
	    }),
	    player: new StationaryObject({
	      type: 'platform',
	      x: this.LEVELSETTINGS.player.x,
	      y: this.LEVELSETTINGS.player.y,
	      width: this.LEVELSETTINGS.player.width,
	      height: this.LEVELSETTINGS.player.height,
	      color: this.PLATFORMCOLOR
	    })
	  });
	};

	Arena.prototype.walls = function (level) {
	  var color = '#590089';
	  return ([
	    new StationaryObject ({
	      type: 'north',
	      x: this.LEVELSETTINGS.north.x,
	      y: this.LEVELSETTINGS.north.y,
	      width: this.LEVELSETTINGS.north.width,
	      height: this.LEVELSETTINGS.north.height,
	      color: color
	    }),
	    new StationaryObject ({
	      type: 'south',
	      x: this.LEVELSETTINGS.south.x,
	      y: this.LEVELSETTINGS.south.y,
	      width: this.LEVELSETTINGS.south.width,
	      height: this.LEVELSETTINGS.south.height,
	      color: color
	    }),
	    new StationaryObject ({
	      type: 'west',
	      x: this.LEVELSETTINGS.west.x,
	      y: this.LEVELSETTINGS.west.y,
	      width: this.LEVELSETTINGS.west.width,
	      height: this.LEVELSETTINGS.west.height,
	      color: color
	    }),
	    new StationaryObject({
	      type: 'east',
	      x: this.LEVELSETTINGS.east.x,
	      y: this.LEVELSETTINGS.east.y,
	      width: this.LEVELSETTINGS.east.width,
	      height: this.LEVELSETTINGS.east.height,
	      color: color
	    })
	  ]);
	};

	module.exports = Arena;


/***/ },
/* 3 */
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
/***/ function(module, exports) {

	var levelSettings = function (level) {
	  switch (level){
	    case 1:
	      return {
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
	  case 2:
	    return {
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
	  case 3:
	    return {
	      opponent: {
	        x: 200,
	        y: 20,
	        width: 200,
	        height: 200,
	      },
	      player: {
	        x: 250,
	        y: 480,
	        width: 100,
	        height: 100,
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
	  }
	};
	module.exports = levelSettings;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(4),
	Disc = __webpack_require__(7),
	MovingObject = __webpack_require__(8);

	var Player = function(args){
	  this.RADIUS = 20;
	  this.COLOR = '#6666ff';
	  this.fallCount = 0;
	  this.moveCount = 0;
	  this.discs = [];
	  this.fallen = false;
	  this.image = this.getImage();
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

	Player.prototype.getImage = function () {
	  var image = new Image();
	  image.src = './assets/player_sprites.png';
	  return image;
	};

	Player.prototype.step = function (direction) {
	  if (this.vel[0] > 10 || this.vel[1] > 10){
	    return;
	  }
	  this.vel[0] = (this.vel[0] + direction[0] * 2) * .7;
	  this.vel[1] = (this.vel[1] + direction[1] * 2) * .7;
	};

	Player.prototype.standStill = function () {
	  // this.vel[0] = this.vel[0] / 10;
	  // this.vel[1] = this.vel[1] / 10;
	};

	Player.prototype.shoot = function (event) {
	  if (this.discs.length > 2){
	    return;
	  }
	  var x, y;

	  // offset x coord to account for window spacing

	  x = event.clientX + -300;
	  y = event.clientY;
	  var disc = new Disc({
	    player: this,
	    team: 'human',
	    game: this.game,
	    pos: this.pos.slice(),
	    target: [x,y],
	    color: 'rgba(29,222,240, 1)'
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
	    if (50 - this.fallCount < 0){
	      return;
	    }
	    // ctx.fillStyle = this.color;
	    // ctx.beginPath();
	    // ctx.arc(
	    //   this.pos[0],
	    //   this.pos[1],
	    //   this.radius - this.fallCount,
	    //   0,
	    //   2 * Math.PI,
	    //   false
	    // );
	    //
	    // ctx.fill();
	    var image = new Image();
	    image.src = './assets/player_sprites.png';
	    var fallSize = 50 - this.fallCount * 2;
	    ctx.drawImage(image, 56, 2, 19, 24,
	      this.pos[0] - 20, this.pos[1] - 40, fallSize, fallSize);

	    this.fallCount += 1;
	  };
	};

	Player.prototype.removeDisc = function (disc) {
	  var index = this.discs.indexOf(disc);
	  this.discs.splice(index, 1);
	};

	MovingObject.prototype.draw = function(ctx){
	  ctx.drawImage(this.image, 56, 2, 19, 24, this.pos[0] - 20, this.pos[1] - 40, 40, 60);


	  // ctx.fillStyle = this.color;
	  //   ctx.beginPath();
	  //   ctx.arc(
	  //     this.pos[0],
	  //     this.pos[1],
	  //     this.radius,
	  //     0,
	  //     2 * Math.PI,
	  //     false
	  //   );
	  //
	  //   ctx.fill();
	  };


	module.exports = Player;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4),
	MovingObject = __webpack_require__(8),
	Player = __webpack_require__(6),
	StationaryObject = __webpack_require__(3);

	var Disc = function (args) {
	  this.RADIUS = 13;
	  this.VELOCITY = this.calcVel(args['pos'], args['target']);
	  this.pastPos = [];
	  this.PLAYER = args['player'];
	  this.team = args['team'];
	  this.image = this.getImage();

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
	  return [vel[0] * 5, vel[1] * 5];
	};

	Disc.prototype.getImage = function () {
	  var image = new Image();

	  if (this.team === "human") {
	    image.src = './assets/blue_disc.png';
	  } else {
	    image.src = './assets/orange_disc.png';
	  }
	  return image;
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
	    return this.isCollidedWithMovingObject(otherObject);
	  } else if (otherObject.type !== 'platform'){
	    return this.isCollidedWithWall(otherObject);
	  } else {
	    return false;
	  }
	};

	Disc.prototype.isCollidedWithWall = function (otherObject) {
	  return ((this.pos[0] < otherObject.x + otherObject.width) &&
	         (this.pos[0] > otherObject.x) &&
	         (this.pos[1] < otherObject.y + otherObject.height) &&
	         (this.pos[1] > otherObject.y));
	};

	Disc.prototype.isCollidedWithMovingObject = function (otherObject) {
	  var xDiff = (this.pos[0] - otherObject.pos[0]);
	  var yDiff = (this.pos[1] - otherObject.pos[1]);
	  var radii = this.radius + otherObject.radius;
	  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	  return (distance < radii);
	};

	Disc.prototype.draw = function (ctx) {
	  ctx.lineWidth = 5;

	  if (this.pastPos.length > 1) {
	    this.drawTrace(ctx);
	    if (this.pastPos.length > 10) {
	      this.pastPos.pop();
	    }
	  }
	  this.pastPos.unshift(this.pos.slice());
	  // offset image placement to center on radius of collision
	  ctx.drawImage(this.image, this.pos[0] - 15, this.pos[1] - 15, 30, 30);
	};

	Disc.prototype.drawTrace = function (ctx) {
	  var opac = '0.3';
	  var radius = this.radius;
	  ctx.compositeOperation = 'lighter';

	  for (var i = 0; i < this.pastPos.length - 1; i++){
	    ctx.fillStyle = this.color.slice(0, -2) + opac + ")";

	    ctx.beginPath();
	    ctx.arc(
	      this.pastPos[i][0],
	      this.pastPos[i][1],
	      radius,
	      0,
	      2 * Math.PI,
	      false
	    );
	    ctx.fill();

	    opac = opac - 0.02;
	    radius -= 0.5;
	  }
	};

	module.exports = Disc;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var StationaryObject = __webpack_require__(3);

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
	};


	module.exports = MovingObject;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(4),
	Disc = __webpack_require__(7),
	MovingObject = __webpack_require__(8);

	var ComputerPlayer = function (args) {
	  this.RADIUS = 20;
	  this.COLOR = '#ff6666';

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
	  this.image = this.getImage();
	  MovingObject.call(this, {
	      game: args['game'],
	      pos: args['pos'],
	      vel: [0,0],
	      radius: this.RADIUS,
	      color: this.COLOR
	    }
	  );
	};

	Utils.inherits(ComputerPlayer, MovingObject);

	ComputerPlayer.prototype.getImage = function () {
	  var image = new Image();
	  image.src = './assets/crom_sprites.png';
	  return image;
	};

	ComputerPlayer.prototype.think = function () {
	  this.moveCount++;
	  if (this.hit) {
	    this.getBounced();
	    this.hit = false;
	    this.moveRandom();
	  } else if ((this.moveCount / 50) > 1 || this.vel === [0,0]) {
	    this.moveRandom();
	    this.moveCount = 0;
	    this.shoot();
	  } else if (this.nearTarget() || this.outsideSafeZone()) {
	    this.vel = [this.vel[0] * .7, this.vel[1] * .7];
	  }
	};

	ComputerPlayer.prototype.shoot = function (event) {
	  if (this.discs.length > 2) {
	    return;
	  }
	  var x = this.human.pos[0];
	  var y = this.human.pos[1];

	  var compDisc = new Disc({
	    player: this,
	    team: 'computer',
	    game: this.game,
	    pos: this.pos.slice(),
	    target: [x,y],
	    color: 'rgba(252, 127, 38, 1)'
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
	  return !((this.pos[0] < this.safeZone.x + this.safeZone.width) &&
	           (this.pos[0] > this.safeZone.x) &&
	           (this.pos[1] < this.safeZone.y + this.safeZone.height) &&
	           (this.pos[1] > this.safeZone.y));
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

	  var vector = Utils.normalizedVector(this.pos, target);
	  this.vel = [this.vel[0] + vector[0], this.vel[1] + vector[1]];
	};

	ComputerPlayer.prototype.nearTarget = function () {
	  var xDiff = (this.pos[0] - this.target.pos[0]);
	  var yDiff = (this.pos[1] - this.target.pos[1]);
	  var radii = this.RADIUS + this.target.radius;
	  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	  if (distance < radii) { //just return, no need for if
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

	    var image = new Image();
	    image.src = './assets/crom_sprites.png';
	    var fallSize = 50 - this.fallCount * 2;
	    ctx.drawImage(image, 56, 2, 19, 24,
	      this.pos[0] - 20, this.pos[1] - 40, fallSize, fallSize);

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

	ComputerPlayer.prototype.draw = function(ctx){
	  ctx.drawImage(this.image, 38, 2, 18, 24,
	    this.pos[0] - 20, this.pos[1] - 40, 40, 60);

	  };

	module.exports = ComputerPlayer;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(4),
	MovingObject = __webpack_require__(8),
	Game = __webpack_require__(1);

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
	  var game = this.game;

	  switch (game.level) {
	    case 1:
	      $('.message').text('Level 1');
	      break;
	    case 2:
	      $('.message').text('Level 2');
	      break;
	    case 3:
	      $('.message').text('Final Level');
	      break;
	  }

	  if (game.state === 'over') {
	    this.stop();

	    if (game.looser === 'player') {
	      $('.message').text('You Lose');
	    } else if (game.level > 2) {
	      $('.message').text('You Win!');
	    } else {
	      this.game = new Game(game.level + 1);
	      this.start();
	    }
	  } else {
	    game.step();
	    game.draw(this.ctx);
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


/***/ }
/******/ ]);