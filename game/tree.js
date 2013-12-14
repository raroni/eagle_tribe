function Tree(game) {
  Entity3.call(this);

  var trunkRendering = new MeshRendering(this, game.meshes.tree, { static: true });

  this.transformation.setPositionZ(3);
  game.renderer.add(trunkRendering);
}
