function SpriteRendering(sprite, transformation, rectangle) {
  if(!sprite) throw "Sprite required.";

  this.transformation = transformation;
  this.sprite = sprite;
  this.rectangle = rectangle;
}
