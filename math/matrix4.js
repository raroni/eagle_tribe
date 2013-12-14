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

Matrix4.perspective = function(fieldOfView, aspectRatio, near, far) {
  var matrix = new Matrix4();

  var halfFovTangent = Math.tan(fieldOfView/2);

  matrix[0] = 1/halfFovTangent;
  matrix[5] = aspectRatio/halfFovTangent;
  matrix[10] = (far + near) / (far - near);
  matrix[11] = 1;
  matrix[14] = -(2*far*near)/(far-near);

  console.log(matrix);

  return matrix;
}

Matrix4.identity = function() {
  var matrix = new Matrix4();
  matrix[0] = 1;
  matrix[5] = 1;
  matrix[10] = 1;
  matrix[15] = 1;
  return matrix;
};

Matrix4.translation = function(translation) {
  var matrix = Matrix4.identity();

  matrix[12] = translation[0];
  matrix[13] = translation[1];
  matrix[14] = translation[2];

  return matrix;
};
