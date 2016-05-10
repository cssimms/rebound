var Arena = function (level) {
  this.LEVEL = level;
  this.COLOR = '#404040';
};

Arena.prototype.draw = function (ctx) {
  ctx.fillStyle = this.COLOR;
  ctx.fillRect(100, 100, 300, 100);

  ctx.fillRect(25,525,100,100);
  ctx.clearRect(45,545,60,60);
  ctx.strokeRect(50,550,50,50);
};

module.exports = Arena;
