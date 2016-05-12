var StationaryObject = require('./stationaryObject');

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
