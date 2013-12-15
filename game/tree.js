function Tree(game, position) {
  Entity3.call(this);

  this.transformation.setPosition(position);
  this.transformation.rotateY(Math.random()*Math.PI*2);
  this.transformation.translateX((Math.random()-0.5)*0.55);
  this.transformation.translateZ((Math.random()-0.5)*0.55);

  var meshName = 'smallTree' + (Math.floor(Math.random()*10)+1);
  var trunkRendering = new MeshRendering(this, game.meshes.get(meshName), { static: true });

  game.renderer.addMeshRendering(trunkRendering);
}
