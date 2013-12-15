function Renderer(canvas, cameras, mouse) {
  this.context = canvas.getContext("experimental-webgl");
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

    this.setResolution(800, 600);

    new Request('./shaders/shader3d.vertex', function(request) {
      this.handleShaderSource(this.shaderProgram3D, 'vertex', request.response)
    }.bind(this)).send();

    new Request('./shaders/shader3d.fragment', function(request) {
      this.handleShaderSource(this.shaderProgram3D, 'fragment', request.response)
    }.bind(this)).send();

    new Request('./shaders/sprite_shader.vertex', function(request) {
      this.handleShaderSource(this.spriteShaderProgram, 'vertex', request.response)
    }.bind(this)).send();

    new Request('./shaders/sprite_shader.fragment', function(request) {
      this.handleShaderSource(this.spriteShaderProgram, 'fragment', request.response)
    }.bind(this)).send();

    new Request('./shaders/mouse_shader.vertex', function(request) {
      this.handleShaderSource(this.mouseShaderProgram, 'vertex', request.response)
    }.bind(this)).send();

    new Request('./shaders/mouse_shader.fragment', function(request) {
      this.handleShaderSource(this.mouseShaderProgram, 'fragment', request.response)
    }.bind(this)).send();
  },
  setDirectionalLight: function(directionalLight, slot) {
    this.shaderProgram3D.setVector3Uniform('directionalLight' + slot + 'InverseDirection', Vector3.negate(directionalLight.direction));
    this.shaderProgram3D.setVector3Uniform('directionalLight' + slot + 'Intensity', directionalLight.intensity);
  },
  setAmbientLightIntensity: function(ambientLightIntensity) {
    this.shaderProgram3D.setVector3Uniform('ambientLightIntensity', ambientLightIntensity);
  },
  handleShaderSource: function(program, type, source) {
    program[type + 'Source'] = source;
    if(program.vertexSource && program.fragmentSource) {
      program.compile();
      program.link();
      this.shaderProgramsReady++;
      if(this.shaderProgramsReady == 3) this.finalizeInitialization();
    }
  },
  setResolution: function() {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context.viewport(0, 0, 800, 600);
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
      if(!this.currentStaticRenderer) {
        this.currentStaticRenderer = new StaticMeshRenderer(this.context, this.shaderProgram3D);
        this.meshRenderers.push(this.currentStaticRenderer);
      }
      this.currentStaticRenderer.add(meshRendering);
    } else {
      console.log('should create dynamic renderer');
    }
  }
};
