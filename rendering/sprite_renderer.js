function SpriteRenderer(context, program, spriteRendering) {
  this.context = context;
  this.program = program;
  this.vertexBufferHandle = context.createBuffer();
  this.spriteRendering = spriteRendering;
  this.transformation = spriteRendering.entity.transformation;

  var rectangleCorners = spriteRendering.rectangle.getCorners();
  var textureCoordinates = spriteRendering.sprite.getTextureCoordinates();
  var vertexData = new Float32Array(16);
  var offset;
  for(var i=0; 4>i; i++) {
    offset = i*4;
    vertexData[offset] = rectangleCorners[i][0],
    vertexData[offset+1] = rectangleCorners[i][1],
    vertexData[offset+2] = textureCoordinates[i][0],
    vertexData[offset+3] = textureCoordinates[i][1]
  }
  console.log(rectangleCorners);

  this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBufferHandle);
  this.context.bufferData(this.context.ARRAY_BUFFER, vertexData, this.context.STATIC_DRAW);

  var indexData = new Uint8Array([
    0, 2, 1, 3
  ]);
  this.indexBufferHandle = context.createBuffer();
  this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.indexBufferHandle);
  this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, indexData, this.context.STATIC_DRAW);

  this.positionAttributeHandle = program.getAttributeHandle('position');
  this.textureCoordinateAttributeHandle = program.getAttributeHandle('textureCoordinate');
}

SpriteRenderer.prototype.draw = function() {
  this.context.activeTexture(this.context.TEXTURE0);
  this.context.bindTexture(this.context.TEXTURE_2D, this.spriteRendering.sprite.getTextureHandle());

  this.program.setIntegerUniform("sampler", 0);

  this.program.setMatrix3Uniform("worldTransformation", this.transformation.getWorldMatrix());

  this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBufferHandle);

  var stride = 4*4;
  this.context.vertexAttribPointer(this.positionAttributeHandle, 2, this.context.FLOAT, false, stride, 0);
  this.context.vertexAttribPointer(this.textureCoordinateAttributeHandle, 2, this.context.FLOAT, false, stride, 2*4);

  this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.indexBufferHandle);

  this.context.drawElements(this.context.TRIANGLE_STRIP, 4, this.context.UNSIGNED_BYTE, 0);

  this.context.bindTexture(this.context.TEXTURE_2D, null);
};
