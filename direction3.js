function Direction3() {
  if(arguments.length == 1) {
    Vector3.call(this, arguments[0][0], arguments[0][1], arguments[0][2]);
  } else {
    Vector3.call(this, arguments[0], arguments[1], arguments[2]);
  }
}

Direction3.prototype = Object.create(Vector3.prototype);

Direction3.up = function() {
  return new Direction3(0, 1, 0);
};

Direction3.forward = function() {
  return new Direction3(0, 0, 1);
};

Direction3.negate = function(direction) {
  var vector = Vector3.negate(direction);
  return new Direction3(vector);
};

Direction3.cross = function(direction1, direction2) {
  var vector = Vector3.cross(direction1, direction2);
  return new Direction3(vector);
};
