var MeshData = {
  load: function(store) {
    store.add('tree', this.createTree());
  },
  createTree: function() {
    var trunkTransformation = Matrix4.translation(new Vector3(0, 0.5, 0));
    trunkTransformation.multiply(Matrix4.scaling(new Vector3(0.3, 1, 0.3)));

    var trunkMesh = new BoxMesh(trunkTransformation, Color.brown());

    var crownTransformation = Matrix4.scaling(new Vector3(1, 0.6, 1));
    crownTransformation.multiply(Matrix4.translation(new Vector3(0, 2, 0)));
    var crownMesh = new BoxMesh(crownTransformation, Color.green());

    var treeMesh = new GroupMesh(trunkMesh, crownMesh);
    return treeMesh;
  }
};
