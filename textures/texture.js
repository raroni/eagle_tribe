function Texture(context, image) {
  this.context = context;
  this.handle = context.createTexture();
  context.bindTexture(context.TEXTURE_2D, this.handle);
  context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
  context.bindTexture(context.TEXTURE_2D, null);
}
