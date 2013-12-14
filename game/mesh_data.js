var MeshData = {
  load: function(store) {
    store.trunk = this.createTrunk();
  },
  createTrunk: function() {
    var transformation = Matrix4.scaling(new Vector3(0.1, 1, 0.1));
    var trunkMesh = new BoxMesh(transformation, Color.brown());
    return trunkMesh;
  }
};
