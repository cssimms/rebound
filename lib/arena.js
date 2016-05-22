var StationaryObject = require('./stationaryObject'),
LevelSettings = require('./levelSettings');

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
