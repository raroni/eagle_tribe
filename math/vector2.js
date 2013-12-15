function Vector2() {
  if(arguments.length === 0) {
    this[0] = 0;
    this[1] = 0;
  } else {
    this[0] = arguments[0];
    this[1] = arguments[1];
  }
}

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
