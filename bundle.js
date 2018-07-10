/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/rebound.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/arena.js":
/*!**********************!*\
  !*** ./lib/arena.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var StationaryObject = __webpack_require__(/*! ./stationaryObject */ \"./lib/stationaryObject.js\"),\nLevelSettings = __webpack_require__(/*! ./levelSettings */ \"./lib/levelSettings.js\");\n\nvar Arena = function (level) {\n  this.LEVEL = level;\n  this.PLATFORMCOLOR = '#404040';\n  this.LEVELSETTINGS = LevelSettings(level);\n  this.PLATFORMS = this.platforms();\n  this.WALLS = this.walls();\n};\n\nArena.prototype.allObjects = function () {\n  return ([this.PLATFORMS.opponent, this.PLATFORMS.player].concat(this.WALLS));\n};\n\nArena.prototype.onPlatform = function (pos, player) {\n  var plats = this.PLATFORMS[player];\n\n  return ((pos[0] < plats.x + plats.width) &&\n         (pos[0] > plats.x) &&\n         (pos[1] < plats.y + plats.height) &&\n         (pos[1] > plats.y));\n};\n\nArena.prototype.draw = function (ctx) {\n  var x, y, w, h;\n  var platforms = this.PLATFORMS;\n  var walls = this.WALLS;\n\n  Object.keys(platforms).forEach(function (key) {\n    ctx.fillStyle = platforms[key].color;\n    ctx.fillRect(\n      platforms[key]['x'],\n      platforms[key]['y'],\n      platforms[key]['width'],\n      platforms[key]['height']\n    );\n  });\n\n  Object.keys(walls).forEach(function (key) {\n    ctx.fillStyle = walls[key].color;\n    ctx.beingPath();\n    ctx.rect(\n      walls[key]['x'],\n      walls[key]['y'],\n      walls[key]['width'],\n      walls[key]['height']\n    );\n    ctx.stroke();\n  });\n\n};\n\nArena.prototype.move = function () {\n  return;\n};\n\nArena.prototype.platforms = function (level) {\n  return ({\n    opponent: new StationaryObject({\n      type: 'platform',\n      x: this.LEVELSETTINGS.opponent.x,\n      y: this.LEVELSETTINGS.opponent.y,\n      width: this.LEVELSETTINGS.opponent.width,\n      height: this.LEVELSETTINGS.opponent.height,\n      color: this.PLATFORMCOLOR\n    }),\n    player: new StationaryObject({\n      type: 'platform',\n      x: this.LEVELSETTINGS.player.x,\n      y: this.LEVELSETTINGS.player.y,\n      width: this.LEVELSETTINGS.player.width,\n      height: this.LEVELSETTINGS.player.height,\n      color: this.PLATFORMCOLOR\n    })\n  });\n};\n\nArena.prototype.walls = function (level) {\n  var color = '#590089';\n  return ([\n    new StationaryObject ({\n      type: 'north',\n      x: this.LEVELSETTINGS.north.x,\n      y: this.LEVELSETTINGS.north.y,\n      width: this.LEVELSETTINGS.north.width,\n      height: this.LEVELSETTINGS.north.height,\n      color: color\n    }),\n    new StationaryObject ({\n      type: 'south',\n      x: this.LEVELSETTINGS.south.x,\n      y: this.LEVELSETTINGS.south.y,\n      width: this.LEVELSETTINGS.south.width,\n      height: this.LEVELSETTINGS.south.height,\n      color: color\n    }),\n    new StationaryObject ({\n      type: 'west',\n      x: this.LEVELSETTINGS.west.x,\n      y: this.LEVELSETTINGS.west.y,\n      width: this.LEVELSETTINGS.west.width,\n      height: this.LEVELSETTINGS.west.height,\n      color: color\n    }),\n    new StationaryObject({\n      type: 'east',\n      x: this.LEVELSETTINGS.east.x,\n      y: this.LEVELSETTINGS.east.y,\n      width: this.LEVELSETTINGS.east.width,\n      height: this.LEVELSETTINGS.east.height,\n      color: color\n    })\n  ]);\n};\n\nmodule.exports = Arena;\n\n\n//# sourceURL=webpack:///./lib/arena.js?");

/***/ }),

/***/ "./lib/computerPlayer.js":
/*!*******************************!*\
  !*** ./lib/computerPlayer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\"),\nDisc = __webpack_require__(/*! ./disc */ \"./lib/disc.js\"),\nMovingObject = __webpack_require__(/*! ./movingObject */ \"./lib/movingObject.js\");\n\nvar ComputerPlayer = function (args) {\n  this.RADIUS = 20;\n  this.COLOR = '#ff6666';\n\n  this.fallCount = 0;\n  this.moveCount = 0;\n  this.fallen = false;\n  this.target = {\n    pos: [],\n    radius: 10\n  };\n  this.arena = args['arena'];\n  this.safeZone = this.generateSafeZone(args['arena']);\n  this.hit = false;\n  this.discVel = null;\n  this.discs = [];\n  this.human = args['human'];\n  this.image = this.getImage();\n  MovingObject.call(this, {\n      game: args['game'],\n      pos: args['pos'],\n      vel: [0,0],\n      radius: this.RADIUS,\n      color: this.COLOR\n    }\n  );\n};\n\nUtils.inherits(ComputerPlayer, MovingObject);\n\nComputerPlayer.prototype.getImage = function () {\n  var image = new Image();\n  image.src = './assets/crom_sprites.png';\n  return image;\n};\n\nComputerPlayer.prototype.think = function () {\n  this.moveCount++;\n  if (this.hit) {\n    this.getBounced();\n    this.hit = false;\n    this.moveRandom();\n  } else if ((this.moveCount / 50) > 1 || this.vel === [0,0]) {\n    this.moveRandom();\n    this.moveCount = 0;\n    this.shoot();\n  } else if (this.nearTarget() || this.outsideSafeZone()) {\n    this.vel = [this.vel[0] * .7, this.vel[1] * .7];\n  }\n};\n\nComputerPlayer.prototype.shoot = function (event) {\n  if (this.discs.length > 2) {\n    return;\n  }\n  var x = this.human.pos[0];\n  var y = this.human.pos[1];\n\n  var compDisc = new Disc({\n    player: this,\n    team: 'computer',\n    game: this.game,\n    pos: this.pos.slice(),\n    target: [x,y],\n    color: 'rgba(252, 127, 38, 1)'\n  });\n  this.discs.push(compDisc);\n  this.game.shootDisc(compDisc);\n};\n\n\nComputerPlayer.prototype.generateSafeZone = function (arena) {\n  var platform = arena.PLATFORMS['opponent'];\n  return ({\n    x: platform.x + 10,\n    y: platform.y + 10,\n    width: platform.width - 20,\n    height: platform.height - 20\n  });\n};\n\nComputerPlayer.prototype.outsideSafeZone = function () {\n  return !((this.pos[0] < this.safeZone.x + this.safeZone.width) &&\n           (this.pos[0] > this.safeZone.x) &&\n           (this.pos[1] < this.safeZone.y + this.safeZone.height) &&\n           (this.pos[1] > this.safeZone.y));\n};\n\nComputerPlayer.prototype.moveNearOpposite = function () {\n  this.vel = [\n    this.vel[0] + Math.random() * -1,\n    this.vel[1] + Math.random() * -1];\n};\n\nComputerPlayer.prototype.moveRandom = function () {\n  var target = [];\n  target[0] = Math.random() * (this.safeZone.width) + this.safeZone.x;\n  target[1] = Math.random() * (this.safeZone.height) + this.safeZone.y;\n\n  this.target.pos = [target[0], target[1]];\n\n  var vector = Utils.normalizedVector(this.pos, target);\n  this.vel = [this.vel[0] + vector[0], this.vel[1] + vector[1]];\n};\n\nComputerPlayer.prototype.nearTarget = function () {\n  var xDiff = (this.pos[0] - this.target.pos[0]);\n  var yDiff = (this.pos[1] - this.target.pos[1]);\n  var radii = this.RADIUS + this.target.radius;\n  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n  if (distance < radii) { //just return, no need for if\n    return true;\n  }\n  return false;\n};\n\nComputerPlayer.prototype.getBounced = function () {\n  this.vel[0] += this.discVel[0] * 2;\n  this.vel[1] += this.discVel[1] * 2;\n};\n\nComputerPlayer.prototype.fall = function () {\n  this.fallen = true;\n  this.draw = function (ctx) {\n    if (this.radius - this.fallCount < 0){\n      return;\n    }\n\n    var image = new Image();\n    image.src = './assets/crom_sprites.png';\n    var fallSize = 50 - this.fallCount * 2;\n    ctx.drawImage(image, 56, 2, 19, 24,\n      this.pos[0] - 20, this.pos[1] - 40, fallSize, fallSize);\n\n    this.fallCount += 1;\n  };\n};\n\nComputerPlayer.prototype.hitByDisc = function (discVel) {\n  this.discVel = discVel;\n  this.hit = true;\n};\n\nComputerPlayer.prototype.removeDisc = function (disc) {\n  var index = this.discs.indexOf(disc);\n  this.discs.splice(index, 1);\n};\n\nComputerPlayer.prototype.draw = function(ctx){\n  ctx.drawImage(this.image, 38, 2, 18, 24,\n    this.pos[0] - 20, this.pos[1] - 40, 40, 60);\n\n  };\n\nmodule.exports = ComputerPlayer;\n\n\n//# sourceURL=webpack:///./lib/computerPlayer.js?");

/***/ }),

/***/ "./lib/config/gameConfig.js":
/*!**********************************!*\
  !*** ./lib/config/gameConfig.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const gameConfig = {\n  board: {\n    width: 600,\n    height: 600\n  }\n};\n\nmodule.exports = gameConfig;\n\n\n//# sourceURL=webpack:///./lib/config/gameConfig.js?");

/***/ }),

/***/ "./lib/disc.js":
/*!*********************!*\
  !*** ./lib/disc.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Util = __webpack_require__(/*! ./utils */ \"./lib/utils.js\"),\nMovingObject = __webpack_require__(/*! ./movingObject */ \"./lib/movingObject.js\"),\nPlayer = __webpack_require__(/*! ./player.js */ \"./lib/player.js\"),\nStationaryObject = __webpack_require__(/*! ./stationaryObject */ \"./lib/stationaryObject.js\");\n\nvar Disc = function (args) {\n  this.RADIUS = 13;\n  this.VELOCITY = this.calcVel(args['pos'], args['target']);\n  this.pastPos = [];\n  this.PLAYER = args['player'];\n  this.team = args['team'];\n  this.image = this.getImage();\n\n  MovingObject.call(this, {\n    game: args['game'],\n    pos: args['pos'],\n    vel: this.VELOCITY,\n    radius: this.RADIUS,\n    color: args['color']\n  });\n  this.startRecallTimer();\n};\n\nUtil.inherits(Disc, MovingObject);\n\nDisc.prototype.calcVel = function (start, target) {\n  var vel = Util.normalizedVector(start, target);\n  return [vel[0] * 5, vel[1] * 5];\n};\n\nDisc.prototype.getImage = function () {\n  var image = new Image();\n\n  if (this.team === \"human\") {\n    image.src = './assets/blue_disc.png';\n  } else {\n    image.src = './assets/orange_disc.png';\n  }\n  return image;\n};\n\nDisc.prototype.startRecallTimer = function () {\n  setTimeout(function () {\n    this.recall();\n  }.bind(this), 5000);\n};\n\nDisc.prototype.recall = function () {\n  this.PLAYER.removeDisc(this);\n  this.game.removeDisc(this);\n};\n\nDisc.prototype.collideWith = function (otherObject) {\n    if (otherObject instanceof MovingObject) {\n      if (!(otherObject instanceof Disc)) {\n        otherObject.hitByDisc(this.vel);\n      }\n      this.vel = [this.vel[0] * -1, this.vel[1] * -1];\n\n    } else if (otherObject instanceof StationaryObject) {\n      this.vel = otherObject.bounceVec(this.vel);\n    }\n};\n\nDisc.prototype.isCollidedWith = function (otherObject) {\n  if (otherObject instanceof MovingObject) {\n    return this.isCollidedWithMovingObject(otherObject);\n  } else if (otherObject.type !== 'platform'){\n    return this.isCollidedWithWall(otherObject);\n  } else {\n    return false;\n  }\n};\n\nDisc.prototype.isCollidedWithWall = function (otherObject) {\n  return ((this.pos[0] < otherObject.x + otherObject.width) &&\n         (this.pos[0] > otherObject.x) &&\n         (this.pos[1] < otherObject.y + otherObject.height) &&\n         (this.pos[1] > otherObject.y));\n};\n\nDisc.prototype.isCollidedWithMovingObject = function (otherObject) {\n  var xDiff = (this.pos[0] - otherObject.pos[0]);\n  var yDiff = (this.pos[1] - otherObject.pos[1]);\n  var radii = this.radius + otherObject.radius;\n  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n  return (distance < radii);\n};\n\nDisc.prototype.draw = function (ctx) {\n  ctx.lineWidth = 5;\n\n  if (this.pastPos.length > 1) {\n    this.drawTrace(ctx);\n    if (this.pastPos.length > 10) {\n      this.pastPos.pop();\n    }\n  }\n  this.pastPos.unshift(this.pos.slice());\n  // offset image placement to center on radius of collision\n  ctx.drawImage(this.image, this.pos[0] - 15, this.pos[1] - 15, 30, 30);\n};\n\nDisc.prototype.drawTrace = function (ctx) {\n  var opac = '0.3';\n  var radius = this.radius;\n  ctx.compositeOperation = 'lighter';\n\n  for (var i = 0; i < this.pastPos.length - 1; i++){\n    ctx.fillStyle = this.color.slice(0, -2) + opac + \")\";\n\n    ctx.beginPath();\n    ctx.arc(\n      this.pastPos[i][0],\n      this.pastPos[i][1],\n      radius,\n      0,\n      2 * Math.PI,\n      false\n    );\n    ctx.fill();\n\n    opac = opac - 0.02;\n    radius -= 0.5;\n  }\n};\n\nmodule.exports = Disc;\n\n\n//# sourceURL=webpack:///./lib/disc.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Arena = __webpack_require__(/*! ./arena */ \"./lib/arena.js\"),\nPlayer = __webpack_require__(/*! ./player */ \"./lib/player.js\"),\nComputerPlayer = __webpack_require__(/*! ./computerPlayer */ \"./lib/computerPlayer.js\");\nconst gameConfig = __webpack_require__(/*! ./config/gameConfig */ \"./lib/config/gameConfig.js\");\n\nvar Game = function (level) {\n  this.DIM_X = gameConfig.board.width;\n  this.DIM_Y = gameConfig.board.height;\n  this.level = level;\n  this.arena = new Arena(this.level);\n  this.state = 'running';\n  this.looser = null;\n  this.players = {};\n  this.players['player'] = new Player({game:this, pos: [300,530]});\n  this.players['opponent'] = new ComputerPlayer(\n    {\n      game:this,\n      pos: [300,70],\n      arena: this.arena,\n      human: this.players['player']\n    });\n\n  this.discs = [];\n};\n\nGame.prototype.step = function () {\n  this.moveObjects();\n  this.checkInteractions();\n  this.players['opponent'].think();\n};\n\nGame.prototype.shootDisc = function (disc) {\n  this.discs.push(disc);\n};\n\nGame.prototype.removeDisc = function (disc) {\n  var index = this.discs.indexOf(disc);\n  this.discs.splice(index, 1);\n\n};\n\nGame.prototype.draw = function (ctx) {\n    var image = new Image();\n    image.src = './assets/stars.jpg';\n    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n    ctx.drawImage(image, 0, 0, this.DIM_X, this.DIM_Y);\n    this.allObjects().forEach(function(object){\n      object.draw(ctx);\n    });\n};\n\nGame.prototype.allObjects = function () {\n  return this.arena.allObjects().concat([\n    this.players['opponent'],\n    this.players['player']\n  ]).concat(this.discs);\n};\n\nGame.prototype.moveObjects = function () {\n  var moveProne = this.discs.concat([\n    this.players['opponent'],\n    this.players['player']\n  ]);\n  moveProne.forEach(function (object) {\n    object.move();\n  });\n};\n\nGame.prototype.checkInteractions = function () {\n  this.checkCollisions();\n  this.checkFalls();\n};\n\nGame.prototype.checkFalls = function () {\n  Object.keys(this.players).forEach(function (key) {\n    if (this.arena.onPlatform(this.players[key].pos, key)){\n      return;\n    } else {\n      this.players[key].fall();\n      this.looser = key;\n    }\n\n    if (this.players[key].fallCount > 20){\n      this.state = 'over';\n    }\n  }.bind(this));\n};\n\nGame.prototype.checkCollisions = function () {\n  var collisionProne = [\n    this.players['opponent'],\n    this.players['player']\n  ].concat(this.discs).concat(this.arena.WALLS);\n\n  this.discs.forEach(function (disc) {\n    collisionProne.forEach(function (object) {\n      if (disc.isCollidedWith(object) &&\n          disc !== object && disc.PLAYER !== object) {\n        disc.collideWith(object);\n      }\n    });\n  });\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/gameView.js":
/*!*************************!*\
  !*** ./lib/gameView.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\"),\nMovingObject = __webpack_require__(/*! ./movingObject */ \"./lib/movingObject.js\"),\nGame = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n\nvar GameView = function(game, ctx){\n  this.game = game;\n  this.ctx = ctx;\n};\n\nGameView.prototype.start = function () {\n  $('.message').text('Throw discs to push Crom off his platform!');\n  this.interval = setInterval(this.loop.bind(this), 15);\n  this.bindKeyHandlers();\n};\n\nGameView.prototype.stop = function () {\n  clearInterval(this.interval);\n};\n\nGameView.prototype.loop = function () {\n  var game = this.game;\n\n  switch (game.level) {\n    case 1:\n      $('.message').text('Level 1');\n      break;\n    case 2:\n      $('.message').text('Level 2');\n      break;\n    case 3:\n      $('.message').text('Final Level');\n      break;\n  }\n\n  if (game.state === 'over') {\n    this.stop();\n\n    if (game.looser === 'player') {\n      $('.message').text('You Lose');\n    } else if (game.level > 2) {\n      $('.message').text('You Win!');\n    } else {\n      this.game = new Game(game.level + 1);\n      this.start();\n    }\n  } else {\n    game.step();\n    game.draw(this.ctx);\n  }\n};\n\nGameView.prototype.bindKeyHandlers = function () {\n  var human = this.game.players.player;\n  window.addEventListener('keydown', function (event) {\n    switch (event.keyCode) {\n      case 65:\n        human.step([-1, 0]);\n        break;\n      case 68:\n        human.step([1, 0]);\n        break;\n      case 83:\n        human.step([0, 1]);\n        break;\n      case 87:\n        human.step([0, -1]);\n        break;\n    }\n  });\n\n  window.addEventListener('keyup', human.standStill.bind(human));\n\n  window.addEventListener('click', human.shoot.bind(human));\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./lib/gameView.js?");

/***/ }),

/***/ "./lib/levelSettings.js":
/*!******************************!*\
  !*** ./lib/levelSettings.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var levelSettings = function (level) {\n  switch (level){\n\n    case 1:\n      return {\n        opponent: {\n          x: 250,\n          y: 20,\n          width: 100,\n          height: 100,\n        },\n        player: {\n          x: 170,\n          y: 380,\n          width: 260,\n          height: 200,\n        },\n        north: {\n          x: 150,\n          y: 0,\n          width: 300,\n          height: 10,\n        },\n        south: {\n          x: 150,\n          y: 590,\n          width: 300,\n          height: 10,\n        },\n        west: {\n          x: 150,\n          y: 0,\n          width: 10,\n          height: 600,\n        },\n        east: {\n          x: 440,\n          y: 0,\n          width: 10,\n          height: 600,\n        }\n      };\n\n  case 2:\n    return {\n      opponent: {\n        x: 170,\n        y: 20,\n        width: 260,\n        height: 100,\n      },\n      player: {\n        x: 20,\n        y: 380,\n        width: 560,\n        height: 200,\n      },\n      north: {\n        x: 0,\n        y: 0,\n        width: 600,\n        height: 10,\n      },\n      south: {\n        x: 0,\n        y: 590,\n        width: 600,\n        height: 10,\n      },\n      west: {\n        x: 0,\n        y: 0,\n        width: 10,\n        height: 600,\n      },\n      east: {\n        x: 590,\n        y: 0,\n        width: 10,\n        height: 600,\n      }\n    };\n\n  case 3:\n    return {\n      opponent: {\n        x: 200,\n        y: 20,\n        width: 200,\n        height: 200,\n      },\n      player: {\n        x: 250,\n        y: 480,\n        width: 100,\n        height: 100,\n      },\n      north: {\n        x: 150,\n        y: 0,\n        width: 300,\n        height: 10,\n      },\n      south: {\n        x: 150,\n        y: 590,\n        width: 300,\n        height: 10,\n      },\n      west: {\n        x: 150,\n        y: 0,\n        width: 10,\n        height: 600,\n      },\n      east: {\n        x: 440,\n        y: 0,\n        width: 10,\n        height: 600,\n      }\n    };\n  }\n};\nmodule.exports = levelSettings;\n\n\n//# sourceURL=webpack:///./lib/levelSettings.js?");

/***/ }),

/***/ "./lib/movingObject.js":
/*!*****************************!*\
  !*** ./lib/movingObject.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var StationaryObject = __webpack_require__(/*! ./stationaryObject */ \"./lib/stationaryObject.js\");\n\nvar MovingObject = function(args){\n  this.game = args[\"game\"];\n  this.pos = args[\"pos\"];\n  this.vel = args[\"vel\"];\n  this.radius = args[\"radius\"];\n  this.color = args[\"color\"];\n};\n\nMovingObject.prototype.draw = function(ctx){\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0],\n    this.pos[1],\n    this.radius,\n    0,\n    2 * Math.PI,\n    false\n  );\n\n  ctx.fill();\n};\n\nMovingObject.prototype.move = function(){\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n};\n\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./lib/movingObject.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\"),\nDisc = __webpack_require__(/*! ./disc */ \"./lib/disc.js\"),\nMovingObject = __webpack_require__(/*! ./movingObject */ \"./lib/movingObject.js\");\n\nvar Player = function(args){\n  this.RADIUS = 20;\n  this.COLOR = '#6666ff';\n  this.fallCount = 0;\n  this.moveCount = 0;\n  this.discs = [];\n  this.fallen = false;\n  this.image = this.getImage();\n  MovingObject.call(this, {\n      game: args['game'],\n      pos: args['pos'],\n      vel: [0,0],\n      radius: this.RADIUS,\n      color: this.COLOR\n    }\n  );\n};\n\nUtils.inherits(Player, MovingObject);\n\nPlayer.prototype.getImage = function () {\n  var image = new Image();\n  image.src = './assets/player_sprites.png';\n  return image;\n};\n\nPlayer.prototype.step = function (direction) {\n  if (this.vel[0] > 10 || this.vel[1] > 10){\n    return;\n  }\n  this.vel[0] = (this.vel[0] + direction[0] * 2) * .7;\n  this.vel[1] = (this.vel[1] + direction[1] * 2) * .7;\n};\n\nPlayer.prototype.standStill = function () {\n  // this.vel[0] = this.vel[0] / 10;\n  // this.vel[1] = this.vel[1] / 10;\n};\n\nPlayer.prototype.shoot = function (event) {\n  if (this.discs.length > 2){\n    return;\n  }\n  var x, y;\n\n  // offset x coord to account for window spacing\n\n  x = event.clientX + -300;\n  y = event.clientY;\n  var disc = new Disc({\n    player: this,\n    team: 'human',\n    game: this.game,\n    pos: this.pos.slice(),\n    target: [x,y],\n    color: 'rgba(29,222,240, 1)'\n  });\n  this.discs.push(disc);\n  this.game.shootDisc(disc);\n};\n\nPlayer.prototype.getBounced = function (discVel) {\n  this.vel[0] += discVel[0];\n  this.vel[1] += discVel[1];\n};\n\nPlayer.prototype.hitByDisc = function (discVel) {\n  this.getBounced(discVel);\n};\n\nPlayer.prototype.fall = function () {\n  this.fallen = true;\n  this.draw = function (ctx) {\n    if (50 - this.fallCount < 0){\n      return;\n    }\n    // ctx.fillStyle = this.color;\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0],\n    //   this.pos[1],\n    //   this.radius - this.fallCount,\n    //   0,\n    //   2 * Math.PI,\n    //   false\n    // );\n    //\n    // ctx.fill();\n    var image = new Image();\n    image.src = './assets/player_sprites.png';\n    var fallSize = 50 - this.fallCount * 2;\n    ctx.drawImage(image, 56, 2, 19, 24,\n      this.pos[0] - 20, this.pos[1] - 40, fallSize, fallSize);\n\n    this.fallCount += 1;\n  };\n};\n\nPlayer.prototype.removeDisc = function (disc) {\n  var index = this.discs.indexOf(disc);\n  this.discs.splice(index, 1);\n};\n\nMovingObject.prototype.draw = function(ctx){\n  ctx.drawImage(this.image, 56, 2, 19, 24, this.pos[0] - 20, this.pos[1] - 40, 40, 60);\n\n\n  // ctx.fillStyle = this.color;\n  //   ctx.beginPath();\n  //   ctx.arc(\n  //     this.pos[0],\n  //     this.pos[1],\n  //     this.radius,\n  //     0,\n  //     2 * Math.PI,\n  //     false\n  //   );\n  //\n  //   ctx.fill();\n  };\n\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ }),

/***/ "./lib/rebound.js":
/*!************************!*\
  !*** ./lib/rebound.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Game = __webpack_require__(/*! ./game */ \"./lib/game.js\");\nvar GameView = __webpack_require__(/*! ./gameView.js */ \"./lib/gameView.js\");\n\nvar element = document.getElementById(\"game-canvas\");\nvar ctx = element.getContext(\"2d\");\nvar newGame = null;\nvar newGameView = null;\n\nvar initiateNew = function () {\n  $('button').text('Reset');\n  if (newGameView){\n    newGameView.stop();\n  }\n  newGame = new Game(1);\n  newGameView = new GameView(newGame, ctx);\n  newGameView.start();\n};\n\n$('button').on('click', initiateNew);\n\n\n//# sourceURL=webpack:///./lib/rebound.js?");

/***/ }),

/***/ "./lib/stationaryObject.js":
/*!*********************************!*\
  !*** ./lib/stationaryObject.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Util = __webpack_require__(/*! ./utils */ \"./lib/utils.js\");\n\nvar StationaryObject = function (args) {\n  this.type = args[\"type\"];\n  this.x = args[\"x\"];\n  this.y = args[\"y\"];\n  this.width = args[\"width\"];\n  this.height = args[\"height\"];\n  this.color = args[\"color\"];\n};\n\nStationaryObject.prototype.bounceVec = function (vel) {\n  if (this.type === 'platform'){\n    return;\n  } else if (this.type === 'north' || this.type === 'south') {\n    return ([vel[0], vel[1] * -1]);\n  } else if (this.type === 'west' || this.type === 'east') {\n    return ([vel[0] * -1, vel[1]]);\n  }\n};\n\nStationaryObject.prototype.collideWith = function () {\n\n};\n\nStationaryObject.prototype.isCollidedWith = function () {\n  return false;\n};\n\nStationaryObject.prototype.move = function () {\n\n};\n\nStationaryObject.prototype.draw = function (ctx) {\n  ctx.fillStyle = this.color;\n  ctx.fillRect(\n    this.x,\n    this.y,\n    this.width,\n    this.height\n  );\n};\n\nmodule.exports = StationaryObject;\n\n\n//# sourceURL=webpack:///./lib/stationaryObject.js?");

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Util = function(){};\n\nUtil.inherits = function (Child, Parent) {\n  var Surrogate = function () {};\n  Surrogate.prototype = Parent.prototype;\n  Child.prototype = new Surrogate;\n  Child.constructor = Child;\n};\n\nUtil.normalizedVector = function (start, target) {\n  var magnitude = this.magnitude(start, target);\n  var vector = ([\n      (target[0] - start[0]), (target[1] - start[1])\n    ]);\n  return [(vector[0] / magnitude), (vector[1] / magnitude)];\n};\n\nUtil.magnitude = function (start, end) {\n  var xDiff = (start[0] - end[0]);\n  var yDiff = (start[1] - end[1]);\n\n  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n};\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./lib/utils.js?");

/***/ })

/******/ });