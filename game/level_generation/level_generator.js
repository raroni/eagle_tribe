function LevelGenerator() {
  this.clearings = {};
}

LevelGenerator.prototype.getLevel = function() {
  if(!this.level) this.generate();
  return this.level;
};

LevelGenerator.prototype.generate = function() {
  this.level = new Level();
  this.createStartClearing();
  this.growForest();
};

LevelGenerator.prototype.growForest = function() {
  var size = 30, position;
  for(var x=-size; size>=x; x++) {
    for(var y=-size; size>=y; y++) {
      if(!this.clearings[x + '-' + y]) this.level.addTree({ position: new Point2D(x, y) });
    }
  }
};

LevelGenerator.prototype.createStartClearing = function() {
  var size = 4, position;
  for(var x=-size; size>=x; x++) {
    for(var y=-size; size>=y; y++) {
      position = new Point2D(x, y);
      if(position.getLength() < 3.5) {
        this.clearings[x + '-' + y] = true;
      }
    }
  }
};
