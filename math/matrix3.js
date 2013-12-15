function Matrix3() {
  if(arguments.length === 0) {
    for(var i=0; 9>i; i++) {
      this[i] = 0;
    }
  } else {
    for(var i=0; 9>i; i++) {
      this[i] = arguments[i];
    }
  }
}

Matrix3.translation = function(translation) {
  var matrix = Matrix3.identity();
  matrix[6] = translation[0];
  matrix[7] = translation[1];
  return matrix;
};

Matrix3.identity = function() {
  var matrix = new Matrix3();
  matrix[0] = 1;
  matrix[4] = 1;
  matrix[8] = 1;
  return matrix;
};

Matrix3.scaling = function(scaling) {
  var matrix = new Matrix3();
  matrix[0] = scaling[0];
  matrix[4] = scaling[1];
  return matrix;
};
