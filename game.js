function Game(canvas) {
  this.renderer = new Renderer(canvas);
}

Game.prototype = {
  run: function() {
    console.log('run!');
  },
  initialize: function(callback) {
    this.renderer.initialize(callback);
  }
};
