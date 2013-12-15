var MeshData = {
  load: function(store) {
    this.createSmallGreenTrees(store);
  },
  createSmallGreenTrees: function(store) {
    var trunkHeight, bonusHeight;

    for(var i=1; 10>=i; i++) {
      bonusHeight = Math.random()*1.7;
      trunkHeight = 1 + bonusHeight;
      var trunkTransformation = Matrix4.translation(new Vector3(0, trunkHeight*0.5, 0));
      trunkTransformation.multiply(Matrix4.scaling(new Vector3(0.25, trunkHeight, 0.25)));

      var trunkMesh = new BoxMesh(trunkTransformation, Color.brown());

      var crownTransformation = Matrix4.translation(new Vector3(0, trunkHeight, 0));
      crownTransformation.multiply(Matrix4.scaling(new Vector3(0.8, 0.6, 0.8)));

      crownTransformation.multiply(Matrix4.xRotation(0.2));
      var crownMesh = new BoxMesh(crownTransformation, Color.green());

      var treeMesh = new GroupMesh(trunkMesh, crownMesh);
      store.add('smallGreenTree' + i, treeMesh);
    }
  }
};
