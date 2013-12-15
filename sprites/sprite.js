function Sprite(texture, rectangle) {
  this.texture = texture;
  this.rectangle = rectangle;
}

Sprite.prototype.getTextureCoordinates = function() {
  var points = this.rectangle.getCorners();
  /*
  for(var i=0; 4>i; i++) {
    
  }
  
  points = [
    new Point2D(0, 1),
    new Point2D(1, 1),
    new Point2D(0, 0),
    new Point2D(1, 0),
  ];
  */
  
  return points;
};

Sprite.prototype.getTextureHandle = function() {
  return this.texture.handle;
};

Sprite.prototype.getAspectRatio = function() {
  return this.rectangle.getAspectRatio();
};
