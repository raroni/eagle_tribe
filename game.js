function Game(canvas) {
  this.renderer = new Renderer(canvas);
  this.meshes = new MeshRegistry();
  this.sprites = new SpriteRegistry();
  this.textures = new TextureRegistry();

  new Mouse(canvas);
  this.clickManager = new ClickManager();
}

Game.prototype = {
  run: function() {
    this.scene = this.createStartScene();
    this.next();
  },
  tick: function(timestamp) {
    if(this.pendingSceneName) {
      this.scene.onExit();
      this.scene = this.createScene(this.pendingSceneName);
      delete this.pendingSceneName;
    }
    var timeDelta = this.lastTimestamp ? timestamp-this.lastTimestamp : 0;
    this.clickManager.update();
    this.scene.update(timeDelta);
    this.renderer.draw();
    this.lastTimestamp = timestamp;
    this.next();
  },
  changeScene: function(sceneName) {
    this.pendingSceneName = sceneName;
  },
  next: function() {
    requestAnimationFrame(this.tick.bind(this));
  },
  initialize: function(callback) {
    this.renderer.initialize(callback);
    this.onInitialize();
  }
};
