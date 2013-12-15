function Vector2() {
  if(arguments.length === 0) {
    this[0] = 0;
    this[1] = 0;
  } else {
    this[0] = arguments[0];
    this[1] = arguments[1];
  }
}

Vector2.prototype.set = function(vector) {
  this[0] = vector[0];
  this[1] = vector[1];
};

Vector2.prototype.add = function(vector) {
  this.set(Vector2.add(this, vector));
};

Vector2.prototype.getLength = function() {
  return Math.sqrt(Math.pow(this[0], 2) + Math.pow(this[1], 2));
};

Vector2.prototype.isZero = function() {
  return this[0] === 0 && this[1] === 0;
};

Vector2.prototype.reset = function() {
  this[0] = 0;
  this[1] = 0;
};

Vector2.add = function(vector1, vector2) {
  var result = new Vector2(
    vector1[0] + vector2[0],
    vector1[1] + vector2[1]
  );
  return result;
};

Vector2.multiply = function(vector, scalar) {
  var result = new Vector2(
    vector[0] * scalar,
    vector[1] * scalar
  );
  return result;
};

Vector2.negate = function(vector) {
  var result = new Vector2(
    vector[0]*-1,
    vector[1]*-1
  );
  return result;
};
