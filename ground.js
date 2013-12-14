function Ground(game) {
  Entity3.call(this);
  var size = new Vector2(1, 1);
  var planeMesh = new PlaneMesh(Point3.origin(), size, Direction3.up(), Direction3.negate(Direction3.forward()), Color.red());
  var rendering = new MeshRendering(this, planeMesh, { static: true });
  game.renderer.add(rendering);
}

Ground.prototype = Object.create(Entity3.prototype);
