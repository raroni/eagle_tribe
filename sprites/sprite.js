function Sprite(texture, rectangle) {
  this.texture = texture;
  this.rectangle = rectangle;
}

Sprite.prototype.getTextureCoordinates = function() {
  return this.rectangle.getCorners();
};
