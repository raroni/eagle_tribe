function Mesh() {
  this.indices = [];
  this.vertices = [];
  this.highestIndex = 0;
}

Mesh.prototype.addFace = function(index1, index2, index3) {
  this.indices.push(index1);
  this.indices.push(index2);
  this.indices.push(index3);
  this.highestIndex = Math.max(this.highestIndex, index1, index2, index3);
};

Mesh.prototype.addVertex = function(vertex) {
  this.vertices.push(vertex);
};

Mesh.prototype.getVerticesWithoutNormalCalculation = function() {
  return this.vertices;
};

Mesh.prototype.calculateNormals = function() {
  var vertices = this.getVerticesWithoutNormalCalculation();
  var indices = this.getIndices();
  var vertex1, vertex2, vertex3, difference1, difference2, normal;
  for(var i=0; indices.length>i; i+=3) {
    vertex1 = vertices[indices[i]];
    vertex2 = vertices[indices[i+1]];
    vertex3 = vertices[indices[i+2]];
    difference1 = Vector3.subtract(vertex1.position, vertex2.position);
    difference2 = Vector3.subtract(vertex3.position, vertex2.position);
    normal = Vector3.cross(difference1, difference2);
    normal.normalize();
    vertex1.normal = vertex2.normal = vertex3.normal = normal;
  }
};

Mesh.prototype.getVertices = function() {
  this.calculateNormals();
  return this.getVerticesWithoutNormalCalculation();
};

Mesh.prototype.getIndices = function() {
  return this.indices;
};
