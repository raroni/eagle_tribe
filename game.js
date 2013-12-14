function Game(canvas) {
  this.renderer = new Renderer(canvas);
  this.meshes = {};
}

Game.prototype = {
  run: function() {
    this.scene = new WorldScene(this);
    this.next();
  },
  tick: function(timestamp) {
    var timeDelta = this.lastTimestamp ? timestamp-this.lastTimestamp : 0;
    this.scene.update(timeDelta);
    this.renderer.draw();
    this.lastTimestamp = timestamp;
    this.next();
  },
  next: function() {
    requestAnimationFrame(this.tick.bind(this));
  },
  initialize: function(callback) {
    this.renderer.initialize(callback);
    this.onInitialize();
  }
};
