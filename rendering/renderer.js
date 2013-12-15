function Renderer(canvas, cameras, mouse) {
  this.context = canvas.getContext("webgl");
  this.perspectiveCamera = cameras.get('perspective');
  this.camera2D = cameras.get('camera2D');
  this.canvas = canvas;
  this.shaderProgram3D = new ShaderProgram(this.context);
  this.spriteShaderProgram = new ShaderProgram(this.context);
  this.mouseShaderProgram = new ShaderProgram(this.context);
  this.meshRenderers = [];
  this.mouse = mouse;
  this.mouseRenderer = new MouseRenderer(this.context, this.mouseShaderProgram, this.mouse);
  this.sprites = new SpriteCollectionRenderer(this.context, this.spriteShaderProgram);
  this.shaderProgramsReady = 0;
}

Renderer.prototype = {
  initialize: function(callback) {
    this.initializedCallback = callback;

    this.context.clearColor(0.34, 0.48, 0.8, 1.0);
    this.context.enable(this.context.CULL_FACE)
    this.context.enable(this.context.DEPTH_TEST);

    this.setResolution(1024, 768);

    this.shaderProgram3D.load('shader3d', this.onShaderLoaded.bind(this));
    this.spriteShaderProgram.load('sprite_shader', this.onShaderLoaded.bind(this));
    this.mouseShaderProgram.load('mouse_shader', this.onShaderLoaded.bind(this));
  },
  setDirectionalLight: function(directionalLight, slot) {
    this.shaderProgram3D.setVector3Uniform('directionalLight' + slot + 'InverseDirection', Vector3.negate(directionalLight.direction));
    this.shaderProgram3D.setVector3Uniform('directionalLight' + slot + 'Intensity', directionalLight.intensity);
  },
  setAmbientLightIntensity: function(ambientLightIntensity) {
    this.shaderProgram3D.setVector3Uniform('ambientLightIntensity', ambientLightIntensity);
  },
  onShaderLoaded: function() {
    this.shaderProgramsReady++;
    if(this.shaderProgramsReady == 3) this.finalizeInitialization();
  },
  setResolution: function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context.viewport(0, 0, width, height);
  },
  finalizeInitialization: function() {
    this.shaderProgram3D.setMatrix4Uniform('clipTransformation', this.perspectiveCamera.getClipTransformation());
    this.spriteShaderProgram.setMatrix3Uniform('clipTransformation', this.camera2D.getClipTransformation());
    this.mouseShaderProgram.setMatrix3Uniform('clipTransformation', this.camera2D.getClipTransformation());

    this.mouseRenderer.initialize();

    this.initializedCallback();
    delete this.initializedCallback;
  },
  draw: function() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);

    if(this.currentStaticRenderer) {
      this.currentStaticRenderer.bake();
      delete this.currentStaticRenderer;
    }

    this.shaderProgram3D.use();
    this.shaderProgram3D.setMatrix4Uniform('viewTransformation', this.perspectiveCamera.getViewTransformation());
    this.shaderProgram3D.setMatrix4Uniform('worldTransformation', Matrix4.identity());
    for(var i=0; this.meshRenderers.length>i; i++) {
      this.meshRenderers[i].draw();
    }

    this.sprites.draw();

    if(this.mouse.visible) this.mouseRenderer.draw();
  },
  clear: function() {
    this.sprites.clear();
    delete this.currentStaticRenderer;
    for(var i=0; this.meshRenderers.length>i; i++) {
      this.meshRenderers[i].release();
    }
    this.meshRenderers.length = 0;
  },
  addSpriteRendering: function(spriteRendering) {
    var spriteRenderer = new SpriteRenderer(this.context, this.spriteShaderProgram, spriteRendering);
    this.sprites.add(spriteRenderer);
  },
  addMeshRendering: function(meshRendering) {
    if(meshRendering.static) {
      if(!this.currentStaticRenderer || !this.currentStaticRenderer.hasRoomFor(meshRendering)) {
        if(this.currentStaticRenderer) this.currentStaticRenderer.bake();
        this.currentStaticRenderer = new StaticMeshRenderer(this.context, this.shaderProgram3D);
        this.meshRenderers.push(this.currentStaticRenderer);
      }
      this.currentStaticRenderer.add(meshRendering);
    } else {
      console.log('should create dynamic renderer');
    }
  }
};
