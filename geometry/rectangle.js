function Rectangle(size, position) {
  if(!size) throw "Size must be set in rectangle.";
  this.size = size;
  this.position = position || new Point2D();
}

Rectangle.prototype.getCorners = function() {
  var halfWidth = this.size[0]*0.5;
  var halfHeight = this.size[1]*0.5;

  var points = [
    new Point2D(-halfWidth, halfHeight),
    new Point2D(halfWidth, halfHeight),
    new Point2D(-halfWidth, -halfHeight),
    new Point2D(halfWidth, -halfHeight)
  ];

  for(var i=0; 4>i; i++) {
    points[i].add(this.position);
  }

  return points;
};

Rectangle.prototype.getAspectRatio = function() {
  return this.size[0]/this.size[1];
};
