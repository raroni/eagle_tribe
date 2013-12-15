function Tree(game, position) {
  Entity3.call(this);

  this.transformation.setPosition(position);

  var trunkRendering = new MeshRendering(this, game.meshes.get('tree'), { static: true });

  game.renderer.addMeshRendering(trunkRendering);
}
