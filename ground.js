function Ground(game) {
  Entity3.call(this);
  var size = new Vector2(1, 1);
  var planeMesh = new PlaneMesh(Point3D.origin(), size, Direction3D.up(), Direction3D.negate(Direction3D.forward()), Color.red());
  this.transformation.setPositionZ(1);
  var rendering = new MeshRendering(this, planeMesh, { static: true });
  game.renderer.add(rendering);
}

Ground.prototype = Object.create(Entity3.prototype);
