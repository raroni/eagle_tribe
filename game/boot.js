(function() {
  var hasMouseLock = false, initialized = false, game, canvas, mouseLockRequestElement;

  function updateGameStatus() {
    if(game.running) {
      if(!hasMouseLock) {
        mouseLockRequestElement.style.display = '';
        game.pause();
      }
    } else {
      if(initialized && hasMouseLock) {
        mouseLockRequestElement.style.display = 'none';
        game.run();
      }
    }
  }

  function changeCallback() {
    hasMouseLock = (document.pointerLockElement || document.webkitPointerLockElement || document.mozPointerLockElement) === canvas;
    updateGameStatus();
  }

  function boot() {
    canvas = document.querySelector('canvas');
    game = new EagleTribe(canvas);
    game.initialize(function() {
      initialized = true;
      updateGameStatus();
    });

    mouseLockRequestElement = document.querySelector('body > .mouse_lock_request');
    mouseLockRequestElement.addEventListener('click', function() {
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.webkitRequestPointerLock || canvas.mozRequestPointerLock;
      canvas.requestPointerLock();
    });

    document.addEventListener('webkitpointerlockchange', changeCallback, false);
    document.addEventListener('pointerlockchange', changeCallback, false);
    document.addEventListener('mozpointerlockchange', changeCallback, false);
  }

  window.addEventListener('load', boot);
})();
