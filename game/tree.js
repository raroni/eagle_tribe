function Tree(game) {
  Entity3.call(this);

  var transformation = Matrix4.scaling(new Vector3(0.1, 1, 0.1));
  var trunkMesh = new BoxMesh(transformation, Color.brown());
  var trunkRendering = new MeshRendering(this, trunkMesh, { static: true });

  this.transformation.setPositionZ(3);
  game.renderer.add(trunkRendering);
}
