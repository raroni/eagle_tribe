function SpriteRegistry() {
  this.map = {};
}

SpriteRegistry.prototype.get = function(name) {
  var sprite = this.map[name];
  if(!sprite) throw "Sprite '" + name + "' not found.";
  return sprite;
};

SpriteRegistry.prototype.add = function(name, sprite) {
  if(this.map[name]) throw "Sprite name already used.";
  this.map[name] = sprite;
};
