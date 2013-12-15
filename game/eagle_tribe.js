function EagleTribe(canvas) {
  Game.call(this, canvas);
}

EagleTribe.prototype = Object.create(Game.prototype);

EagleTribe.prototype.onInitialize = function() {
  MeshData.load(this.meshes);
};

EagleTribe.prototype.createStartScene = function() {
  var scene = new LoadingScene(this);
  return scene;
};

EagleTribe.prototype.createScene = function(sceneName) {
  switch(sceneName) {
    case "menu":
    return new MenuScene(this);
    break;
    case "world":
    return new WorldScene(this);
    break;
    default:
    throw "Unknown scene name '" + sceneName + "'.";
    break;
  }
};
