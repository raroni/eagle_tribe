function Mesh() {
  this.indices = [];
  this.vertices = [];
}

Mesh.prototype.addFace = function(index1, index2, index3) {
  this.indices.push(index1);
  this.indices.push(index2);
  this.indices.push(index3);
};

Mesh.prototype.addVertex = function(vertex) {
  this.vertices.push(vertex);
};
