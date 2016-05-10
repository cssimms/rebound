var Arena = function (level) {
  this.LEVEL = level;
  this.COLOR = '#404040';
  this.PLATFORMS = Arena.platformDimensions(level);
};

Arena.platformDimensions = function (level) {
  return ({
    opponent: {
      x: 100,
      y: 100,
      width: 300,
      height: 100
    },
    player: {
      x: 100,
      y: 400,
      width: 300,
      height: 100
    },
  });
};

Arena.prototype.draw = function (ctx) {
  var x, y, w, h;
  var platforms = this.PLATFORMS;
  ctx.fillStyle = this.COLOR;
  ctx.strokeStyle = '#ffffff';

  Object.keys(platforms).forEach(function (key) {
    ctx.fillRect(
      platforms[key]['x'],
      platforms[key]['y'],
      platforms[key]['width'],
      platforms[key]['height']
    );
  });

  ctx.strokeRect(10,10,580,580);
};

Arena.prototype.move = function () {
  return;
};

module.exports = Arena;
