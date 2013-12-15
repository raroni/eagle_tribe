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

Matrix4.prototype.multiply = function(matrix) {
  this.set(Matrix4.multiply(this, matrix));
};

Matrix4.prototype.set = function(matrix) {
  for(var i=0; 16>i; i++) {
    this[i] = matrix[i];
  }
};

Matrix4.multiplyVector = function(matrix, vector) {
  var result = new Vector4();

  for(var row=0; 4>row; row++) {
    for(var step=0; 4>step; step++) {
      result[row] += matrix[step*4+row] * vector[step];
    }
  }
  return result;
};

Matrix4.multiply = function(matrix1, matrix2) {
  var result = new Matrix4();

  var resultIndex;
  for(var row=0; 4>row; row++) {
      for(var column=0; 4>column; column++) {
          resultIndex = column*4+row;
          for(var step=0; 4>step; step++) {
              result[resultIndex] += matrix1[row+step*4] * matrix2[column*4+step];
          }
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

Matrix4.yRotation = function(yRotation) {
    var matrix = Matrix4.identity();
    
    var cosAngle = Math.cos(yRotation);
    var sinAngle = Math.sin(yRotation);
    
    matrix[0] = cosAngle;
    matrix[2] = -sinAngle;
    matrix[8] = sinAngle;
    matrix[10] = cosAngle;
    
    return matrix;
};

Matrix4.xRotation = function(yRotation) {
    var matrix = Matrix4.identity();
    
    var cosAngle = Math.cos(yRotation);
    var sinAngle = Math.sin(yRotation);
    
    matrix[5] = cosAngle;
    matrix[6] = sinAngle;
    matrix[9] = -sinAngle;
    matrix[10] = cosAngle;
    
    return matrix;
}

Matrix4.translation = function(translation) {
  var matrix = Matrix4.identity();

  matrix[12] = translation[0];
  matrix[13] = translation[1];
  matrix[14] = translation[2];

  return matrix;
};

Matrix4.scaling = function(scaling) {
  var matrix = Matrix4.identity();

  matrix[0] = scaling[0];
  matrix[5] = scaling[1];
  matrix[10] = scaling[2];

  return matrix;
};
