var MeshData = {
  load: function(store) {
    this.createSmallTrees(store);
  },
  createSmallTrees: function(store) {
    var trunkHeight, bonusHeight, crownColor;
    var red = new Color(0.7, 0.32, 0.06);
    var lightGreen = new Color(0.1, 0.8, 0);
    var darkGreen = new Color(0.29, 0.57, 0.11);
    var colors = [
      lightGreen,
      lightGreen,
      lightGreen,
      lightGreen,
      lightGreen,
      lightGreen,
      darkGreen,
      darkGreen,
      darkGreen,
      darkGreen,
      darkGreen,
      darkGreen,
      red
    ];

    for(var i=1; 10>=i; i++) {
      bonusHeight = Math.random()*1.7;
      trunkHeight = 1 + bonusHeight;
      var trunkTransformation = Matrix4.translation(new Vector3(0, trunkHeight*0.5, 0));
      trunkTransformation.multiply(Matrix4.scaling(new Vector3(0.25, trunkHeight, 0.25)));

      var trunkMesh = new BoxMesh(trunkTransformation, Color.brown());

      var crownTransformation = Matrix4.translation(new Vector3(0, trunkHeight, 0));
      crownTransformation.multiply(Matrix4.scaling(new Vector3(0.8, 0.6, 0.8)));

      crownTransformation.multiply(Matrix4.xRotation(0.2));
      crownColor = colors[Math.floor(Math.random()*colors.length)];
      var crownMesh = new BoxMesh(crownTransformation, crownColor);

      var treeMesh = new GroupMesh(trunkMesh, crownMesh);
      store.add('smallTree' + i, treeMesh);
    }
  }
};
