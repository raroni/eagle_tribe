function Game(canvas) {
  this.screen = new Screen(canvas);
  this.mouse = new Mouse(canvas, this.screen);
  this.cameras = new CameraRegistry(this.screen);
  this.renderer = new Renderer(canvas, this.cameras, this.mouse);
  this.meshes = new MeshRegistry();
  this.sprites = new SpriteRegistry();
  this.textures = new TextureRegistry();
  this.running = false;

  this.clickManager = new ClickManager(this.mouse, this.screen);
}

Game.prototype = {
  run: function() {
    if(!this.scene) this.scene = this.createStartScene();
    this.running = true;
    this.mouse.resume();
    this.next();
  },
  pause: function() {
    cancelAnimationFrame(this.animationFrameRequest);
    this.running = false;
    this.mouse.pause();
  },
  tick: function(timestamp) {
    if(this.pendingSceneName) {
      this.scene.exit();
      this.scene = this.createScene(this.pendingSceneName);
      delete this.pendingSceneName;
    }
    var timeDelta = this.lastTimestamp ? timestamp-this.lastTimestamp : 0;
    if(timeDelta < 120) {
      this.clickManager.update();
      this.scene.update(timeDelta);
      this.renderer.draw();
    }
    this.lastTimestamp = timestamp;
    this.next();
  },
  changeScene: function(sceneName) {
    this.pendingSceneName = sceneName;
  },
  next: function() {
    this.animationFrameRequest = requestAnimationFrame(this.tick.bind(this));
  },
  initialize: function(callback) {
    this.renderer.initialize(callback);
    this.onInitialize();
  }
};
