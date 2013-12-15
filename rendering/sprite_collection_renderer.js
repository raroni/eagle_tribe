function SpriteCollectionRenderer(context, program) {
  this.program = program;
  this.context = context;
  this.spriteRenderers = [];
}

SpriteCollectionRenderer.prototype.add = function(spriteRenderer) {
  this.spriteRenderers.push(spriteRenderer);
};

SpriteCollectionRenderer.prototype.draw = function() {
  this.program.use();
  this.context.disable(this.context.DEPTH_TEST);

  for(var i=0; this.spriteRenderers.length>i; i++) {
    this.spriteRenderers[i].draw(this.program);
  }

  this.context.enable(this.context.DEPTH_TEST);
};

SpriteCollectionRenderer.prototype.clear = function() {
  for(var i=0; this.spriteRenderers.length>i; i++) {
    this.spriteRenderers[i].release();
  }
  this.spriteRenderers.length = 0;
};
