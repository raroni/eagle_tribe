function Matrix4() {
  if(arguments.length === 0) {
    for(var i=0; 16>i; i++) {
      this[i] = 0;
    }
  } else {
    for(var i=0; 16>i; i++) {
      this[i] = arguments[i];
    }
  }
}

Matrix4.multiplyVector = function(matrix, vector) {
  var result = new Vector4();

  for(var row=0; 4>row; row++) {
    for(var step=0; 4>step; step++) {
      result[row] += matrix[step*4+row] * vector[step];
    }
  }
  return result;
};

Matrix4.identity = function() {
  var matrix = new Matrix4();
  matrix[0] = 1;
  matrix[5] = 1;
  matrix[10] = 1;
  matrix[15] = 1;
  return matrix;
};
