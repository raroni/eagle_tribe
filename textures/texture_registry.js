function TextureRegistry() {
  this.map = {};
}

TextureRegistry.prototype.add = function(name, texture) {
  this.map[name] = texture;
};
