(function() {
  function boot() {
    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.initialize(function() {
      game.run();
    });
  }
  window.addEventListener('load', boot);
})();
