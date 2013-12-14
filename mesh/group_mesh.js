function GroupMesh() {
  Mesh.call(this);

  this.subMeshes = [];
  for(var i=0; arguments.length>i; i++) {
    this.subMeshes.push(arguments[i]);
  }
}

GroupMesh.prototype = Object.create(Mesh.prototype);

GroupMesh.prototype.getVerticesWithoutNormalCalculation = function() {
  var vertices = [];
  for(var i=0; this.subMeshes.length>i; i++) {
    vertices = vertices.concat(this.subMeshes[i].getVerticesWithoutNormalCalculation());
  }
  return vertices;
};

GroupMesh.prototype.getIndices = function() {
  var indices = [], subIndices, nextOffset = 0, index;
  for(var i=0; this.subMeshes.length>i; i++) {
    subIndices = this.subMeshes[i].getIndices();
    offset = nextOffset;
    for(var n=0; subIndices.length>n; n++) {
      index = subIndices[n]+offset;
      indices.push(index);
      nextOffset = Math.max(nextOffset, index+1);
    }
  }
  return indices;
};
