function Clickable(entity, rectangle, callback) {
  this.entity = entity;
  this.rectangle = rectangle;
  this.callback = callback;
}

Clickable.prototype.contains = function(viewPosition) {
  var transformation = this.entity.transformation.getInverseWorldMatrix();
  var localPosition = Point2D.transform(viewPosition, transformation);
  return this.rectangle.contains(localPosition);
};

Clickable.prototype.handleClick = function(click) {
  this.callback();
};
