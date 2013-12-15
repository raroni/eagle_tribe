function LevelGenerator() {
  
}

LevelGenerator.prototype.getLevel = function() {
  if(!this.level) this.generate();
  return this.level;
};

LevelGenerator.prototype.generate = function() {
  this.level = new Level();

  var size = 20;
  for(var x=-size; size>=x; x++) {
    for(var y=-size; size>=y; y++) {
      this.level.addTree({ x: x, y: y });
    }
  }
};
