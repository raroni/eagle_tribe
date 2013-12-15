function Texture(context, image) {
  this.handle = context.createTexture();

  context.bindTexture(context.TEXTURE_2D, this.handle);
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
  context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);

  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
  
  context.bindTexture(context.TEXTURE_2D, null);
}
