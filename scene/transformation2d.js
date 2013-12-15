function Transformation2D() {
  this.position = new Vector2();
  this.worldMatrixDirty = true;
}

Transformation2D.prototype.getWorldMatrix = function() {
  if(this.worldMatrixDirty) this.recalculateWorldMatrix();
  return this.worldMatrix;
};

Transformation2D.prototype.recalculateWorldMatrix = function() {
  this.worldMatrix = Matrix3.translation(this.position);
  this.worldMatrixDirty = false;
};
