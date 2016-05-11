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
