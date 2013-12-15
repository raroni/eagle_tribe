function Clickable(entity, rectangle, callback) {
  this.entity = entity;
  this.rectangle = rectangle;
}

Clickable.prototype.getInverseWorldTransformation = function() {
  return this.entity.transformation.getInverseWorldMatrix();
};
