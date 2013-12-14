function Transformation3D() {
  this.position = new Point3D();
  this.yRotation = 0;
  this.xRotation = 0;
  this.markMatricesDirty();
}

Transformation3D.prototype.setPositionZ = function(z) {
  this.position[2] = z;
  this.markMatricesDirty();
};

Transformation3D.prototype.rotateY = function(yRotation) {
  this.yRotation += yRotation;
  this.markMatricesDirty();
};

Transformation3D.prototype.rotateX = function(xRotation) {
  this.xRotation += xRotation;
  this.markMatricesDirty();
};

Transformation3D.prototype.setPosition = function(position) {
  this.position = position;
  this.markMatricesDirty();
};

Transformation3D.prototype.translateY = function(yTranslation) {
  this.position[1] += yTranslation;
  this.markMatricesDirty();
};

Transformation3D.prototype.translate = function(translation) {
  this.position.add(translation);
  this.markMatricesDirty();
};

Transformation3D.prototype.markMatricesDirty = function() {
  this.worldMatrixDirty = true;
  this.inverseWorldMatrixDirty = true;
};

Transformation3D.prototype.setPositionY = function(y) {
  this.position[1] = y;
  this.markMatricesDirty();
};

Transformation3D.prototype.set = function(transformation) {
  this.position.set(transformation.position);
  this.yRotation = transformation.yRotation;
  this.xRotation = transformation.xRotation;
};

Transformation3D.prototype.getWorldMatrix = function() {
  if(this.worldMatrixDirty) this.recalculateWorldMatrix();
  return this.worldMatrix;
};

Transformation3D.prototype.recalculateWorldMatrix = function() {
  this.worldMatrix = Matrix4.translation(this.position);
  if(this.yRotation != 0) this.worldMatrix.multiply(Matrix4.yRotation(this.yRotation));
  if(this.xRotation != 0) this.worldMatrix.multiply(Matrix4.xRotation(this.xRotation));
  this.worldMatrixDirty = false;
};

Transformation3D.prototype.getInverseWorldMatrix = function() {
  if(this.inverseWorldMatrixDirty) this.recalculateInverseWorldMatrix();
  return this.inverseWorldMatrix;
};

Transformation3D.prototype.recalculateInverseWorldMatrix = function() {
  this.inverseWorldMatrix = Matrix4.identity();
  if(this.yRotation != 0) this.inverseWorldMatrix.multiply(Matrix4.yRotation(-this.yRotation));
  if(this.xRotation != 0) this.inverseWorldMatrix.multiply(Matrix4.xRotation(-this.xRotation));
  this.inverseWorldMatrix.multiply(Matrix4.translation(Vector3.negate(this.position)));
  this.inverseWorldMatrixDirty = false;
};

