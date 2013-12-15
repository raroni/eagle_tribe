function Renderer(canvas) {
  this.camera = new Camera(this);
  this.canvas = canvas;
  this.context = canvas.getContext("experimental-webgl");
  this.shaderProgram3D = new ShaderProgram(this.context);
  this.shaderProgram2D = new ShaderProgram(this.context);
  this.meshRenderers = [];
  this.sprites = new SpriteCollectionRenderer(this.context, this.shaderProgram2D);
  this.shaderProgramsReady = 0;
}

Renderer.prototype = {
  initialize: function(callback) {
    this.initializedCallback = callback;

    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.enable(this.context.CULL_FACE)
    this.context.enable(this.context.DEPTH_TEST);

    this.setResolution(800, 600);

    new Request('./shaders/shader3d.vertex', function(request) {
      this.handleShaderSource(this.shaderProgram3D, 'vertex', request.response)
    }.bind(this)).send();

    new Request('./shaders/shader3d.fragment', function(request) {
      this.handleShaderSource(this.shaderProgram3D, 'fragment', request.response)
    }.bind(this)).send();

    new Request('./shaders/shader2d.vertex', function(request) {
      this.handleShaderSource(this.shaderProgram2D, 'vertex', request.response)
    }.bind(this)).send();

    new Request('./shaders/shader2d.fragment', function(request) {
      this.handleShaderSource(this.shaderProgram2D, 'fragment', request.response)
    }.bind(this)).send();
  },
  setDirectionalLight: function(directionalLight, slot) {
    this.shaderProgram.setVector3Uniform('directionalLight' + slot + 'InverseDirection', Vector3.negate(directionalLight.direction));
    this.shaderProgram.setVector3Uniform('directionalLight' + slot + 'Intensity', directionalLight.intensity);
  },
  setAmbientLightIntensity: function(ambientLightIntensity) {
    this.shaderProgram.setVector3Uniform('ambientLightIntensity', ambientLightIntensity);
  },
  getAspectRatio: function() {
    return this.canvas.width/this.canvas.height;
  },
  handleShaderSource: function(program, type, source) {
    program[type + 'Source'] = source;
    if(program.vertexSource && program.fragmentSource) {
      program.compile();
      program.link();
      this.shaderProgramsReady++;
      if(this.shaderProgramsReady == 2) this.finalizeInitialization();
    }
  },
  setResolution: function() {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context.viewport(0, 0, 800, 600);
  },
  finalizeInitialization: function() {
    this.shaderProgram3D.setMatrix4Uniform('clipTransformation', this.camera.getClipTransformation());
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
    this.shaderProgram3D.setMatrix4Uniform('viewTransformation', this.camera.getViewTransformation());
    this.shaderProgram3D.setMatrix4Uniform('worldTransformation', Matrix4.identity());
    for(var i=0; this.meshRenderers.length>i; i++) {
      this.meshRenderers[i].draw();
    }

    this.sprites.draw();
  },
  addSpriteRendering: function(spriteRendering) {
    var spriteRenderer = new SpriteRenderer(this.context, this.shaderProgram2D, spriteRendering);
    this.sprites.add(spriteRenderer);
  },
  addMeshRendering: function(meshRendering) {
    if(meshRendering.static) {
      if(!this.currentStaticRenderer) {
        this.currentStaticRenderer = new StaticMeshRenderer(this.context, this.shaderProgram);
        this.meshRenderers.push(this.currentStaticRenderer);
      }
      this.currentStaticRenderer.add(meshRendering);
    } else {
      console.log('should create dynamic renderer');
    }
  }
};
