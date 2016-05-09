var Util = function(){};

Util.inherits = function (Child, Parent) {
  var Surrogate = function () {};
  Surrogate.prototype = Parent.prototype;
  Child.prototype = new Surrogate;
  Child.constructor = Child;
};

module.exports = Util;
