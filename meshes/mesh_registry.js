function MeshRegistry() {
  this.map = {};
}

MeshRegistry.prototype.add = function(name, mesh) {
  if(this.map[name]) throw "Mesh name already taken.";
  this.map[name] = mesh;
};

MeshRegistry.prototype.get = function(name) {
  var mesh = this.map[name];
  if(!mesh) throw "Mesh not found.";
  return mesh;
};
