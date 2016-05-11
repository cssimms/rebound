var StationaryObject = require('./stationaryObject');

var Arena = function (level) {
  this.LEVEL = level;
  this.COLOR = '#404040';
  this.PLATFORMS = Arena.platforms(level);
  this.WALLS = Arena.walls(level);
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

Arena.platforms = function (level) {
  return ({
    opponent: new StationaryObject({
      type: 'platform',
      x: 100,
      y: 100,
      width: 300,
      height: 100,
      color: '#404040'
    }),
    player: new StationaryObject({
      type: 'platform',
      x: 100,
      y: 400,
      width: 300,
      height: 100,
      color: '#404040'
    })
  });
};

Arena.walls = function (level) {
  var color = '#ffffff';
  return ([
    new StationaryObject ({
      type: 'north',
      x: 5,
      y: 5,
      width: 580,
      height: 10,
      color: color
    }),
    new StationaryObject ({
      type: 'south',
      x: 5,
      y: 590,
      width: 580,
      height: 10,
      color: color
    }),
    new StationaryObject ({
      type: 'west',
      x: 5,
      y: 10,
      width: 10,
      height: 580,
      color: color
    }),
    new StationaryObject({
      type: 'east',
      x: 585,
      y: 10,
      width: 10,
      height: 580,
      color: color
    })
  ]);
};

module.exports = Arena;
