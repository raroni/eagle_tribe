function SpriteRendering(entity, sprite, rectangle) {
  if(!sprite) throw "Sprite required.";

  this.entity = entity;
  this.sprite = sprite;
  this.rectangle = rectangle;
}
