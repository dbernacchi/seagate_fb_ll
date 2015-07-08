var LL = {};

LL.APIScene = function ()
{
    this.name = "";

    this.decl = null;

    this.numFrontParticles = 60 * 2.0;  //kNumFrontParticles;

    this.exitAnimationActive = false;
    this.isActive = true;
    this.triggerTime = 0.0;

    this.playRestSample = true;

    this.logoDepthScale = 1.0 / 20.0;

    this.innerTime = 0.0;

    this.width = -1;
    this.height = -1;

    this.cubePoolMesh = null;
    this.cubePoolGeometry = null;
    this.cubePoolPathMaterialsAttributes = null;
    this.cubePoolPathMaterial = null;
    this.cubePoolPathUniforms = null;

    // Refs to geometry array buffers for cube pool
    this.positions = null;
    this.colors = null;
    this.texcoords = null;
    this.normals = null;
    this.particleOffsetDirections = null;
    this.particleColorAndIndices = null;
    this.particleScales = null;

    // Raw Data
    this.pathOffsetData = null;
    this.pathOffsetBeginData = null;
    this.pathAttrib1TexData = null;

    // Textures
    this.pathDataTexInit = false;
    this.pathOffsetTex = null;
    this.pathOffsetBeginTex = null;
    this.pathAttrib1Tex = null;

    // Pingpong fbo
    this.pathTextureRT1 = null;
    this.pathTextureRT2 = null;
    this.pathSimShader = null;
    this.pathSimShaderBegin = null;
    this.pathSimShaderLoopEnd = null;
    this.pathSim = null;


    // Used for audio panning
    this.lastX = 0;
    this.klangVolume = 0;
    this.klangEase = 10;

};

LL.APIScene.prototype =
{
    constructor: LL.APIScene

    , Init: function( decl_, width_, height_, renderer_, scene_, camera_, pathDataTexture, effectController_, hasLinearFilteringAvailable )
    {
        this.decl = decl_;
        pathDataTexInit = false;

        this.width = width_;
        this.height = height_;

        switch( this.decl.index )
        {
            case 0:
            case 6:
                this.numFrontParticles = 60 * 8.0;
                break;
            case 1:
                this.numFrontParticles = 60 * 4.0;
                break;
            case 2:
                this.numFrontParticles = 60 * 4.0;
                break;
            case 3:
                this.numFrontParticles = 60 * 8.0;
                break;
            case 4:
                this.numFrontParticles = 60 * 2; // + 2*8;
                break;
            default:
                LOG( "*** Something is wrong. this.decl.index is invalid" );
                break;
        }

        //
        // Create textures needed for path
        //
        this.pathOffsetData = new Float32Array( width_ * height_ * 4 );
        this.pathOffsetBeginData = new Float32Array( width_ * height_ * 4 );
        this.pathAttrib1TexData = new Float32Array( width_ * height_ * 4 );
        this.pathOffsetBeginTex = new THREE.Texture();
        this.pathOffsetTex = new THREE.Texture();
        this.pathAttrib1Tex = new THREE.Texture();


        var numCubes = width_ * height_;
        this.cubePoolGeometry = new THREE.BufferGeometry();

        // Extra attributes per particle
        // 1: ParticleColorAndIndex (4comps), 2: ParticleOffsetDirectionVector (3comps), 3: ParticleScale (3comps)

        this.cubePoolGeometry.numVertices = numCubes * 36;
        this.cubePoolGeometry.addAttribute( "position", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 3 ) );
        this.cubePoolGeometry.addAttribute( "color", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 3 ) );
        this.cubePoolGeometry.addAttribute( "uv", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 2 ) );
        this.cubePoolGeometry.addAttribute( "normal", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 3 ) );
        this.cubePoolGeometry.addAttribute( "ParticleColorAndIndex", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 4 ) );
        this.cubePoolGeometry.addAttribute( "ParticleOffsetDirectionVector", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 3 ) );
        this.cubePoolGeometry.addAttribute( "ParticleScale", new THREE.Float32Attribute( this.cubePoolGeometry.numVertices, 3 ) );
        this.cubePoolGeometry.dynamic = true;

        this.positions = this.cubePoolGeometry.getAttribute( "position" ).array;
        this.colors = this.cubePoolGeometry.getAttribute( "color" ).array;
        this.texcoords = this.cubePoolGeometry.getAttribute( "uv" ).array;
        this.normals = this.cubePoolGeometry.getAttribute( "normal" ).array;
        this.particleColorAndIndices = this.cubePoolGeometry.getAttribute( "ParticleColorAndIndex" ).array;
        this.particleOffsetDirections = this.cubePoolGeometry.getAttribute( "ParticleOffsetDirectionVector" ).array;
        this.particleScales = this.cubePoolGeometry.getAttribute( "ParticleScale" ).array;


//        // twitter geometry is different
//        if( this.decl.index == 1 )
//        {
//            this.GenerateRibbonGeometry( numCubes );
//        }
//        else
//        {
//            this.GenerateGeometry( numCubes );
//        }


        //
        // Shader uniforms
        //

        this.cubePoolPathUniforms =
        {
            PathSampler: { type: "t", value: pathDataTexture }
            , PathOffsetSampler: { type: "t", value: this.pathOffsetTex }
            , CubeAttrib1Map: { type: "t", value: this.pathAttrib1Tex }
            , TexSection: { type: "v2", value: new THREE.Vector2() }
            , Dim: { type: "v2", value: new THREE.Vector2( width_, height_ ) }
            , WidthInv: { type: "f", value: 1.0/kPathDimX }
            , HeightInv: { type: "f", value: 1.0/kPathDimY }
            , PathScale: { type: "f", value: 1.0/(kPathDimX) }
            , MeshScale: { type: "f", value: 1.0 }
            , LogoDepthScale: { type: "f", value: 0.02 }
            , ViewPosition: { type: "v3", value: camera_.position }
            , LightPosition: { type: "v4", value: new THREE.Vector4( -300, -30, 600, 1.0 ) }
            , LightColor: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
            , Time: { type: "f", value: 0.0 }
            , DiffuseMap: { type: "t", value: this.decl.texture }
            , DoRotation: { type: "f", value: this.decl.doRotation }
//            , OffsetGlobalScale: { type: "f", value: 0.0 }
            , AlphaIntensity: { type: "f", value: 1.0 }
            , Wave1ScaleAndOffset: { type: "v2", value: new THREE.Vector2( 6.0, 0.0 ) }
            , WAVE1_PARTICLES: { type: "f", value: this.numFrontParticles }
        };


        //
        // Material
        //

        var pathDeformVertexShaderSource = "";
        var pathDeformFragmentShaderSource = "";
        var pathSimVertexShaderSource = "";
        var pathSimFragmentShaderSource = "";

        // // If StdDerivatives, use them for normal computation
        // if( renderer_.supportsStandardDerivatives() )
        // {
        //     pathDeformVertexShaderSource += "#define DO_STD_DERIVATIVES\n";
        //     pathDeformFragmentShaderSource += "#define DO_STD_DERIVATIVES\n";
        // }

        // Check for API specific defines
        switch( this.decl.index )
        {
            case 6:
                pathDeformVertexShaderSource += "#define FACEBOOK_API\n";
                pathDeformFragmentShaderSource += "#define FACEBOOK_API\n";
                pathDeformVertexShaderSource += "#define INSTAGRAM_API\n";
                pathDeformFragmentShaderSource += "#define INSTAGRAM_API\n";
                pathSimFragmentShaderSource += "#define INSTAGRAM_API\n";
                break;
            case 0:
                pathDeformVertexShaderSource += "#define INSTAGRAM_API\n";
                pathDeformFragmentShaderSource += "#define INSTAGRAM_API\n";
                pathSimFragmentShaderSource += "#define INSTAGRAM_API\n";
                break;
            case 1:
                pathDeformVertexShaderSource += "#define TWITTER_API\n";
                pathDeformFragmentShaderSource += "#define TWITTER_API\n";
                pathSimFragmentShaderSource += "#define TWITTER_API\n";
                break;
            case 2:
                pathDeformVertexShaderSource += "#define NYTIMES_API\n";
                pathDeformFragmentShaderSource += "#define NYTIMES_API\n";
                pathSimFragmentShaderSource += "#define NYTIMES_API\n";
                break;
            case 3:
                pathDeformVertexShaderSource += "#define AMAZON_API\n";
                pathDeformFragmentShaderSource += "#define AMAZON_API\n";
                pathSimFragmentShaderSource += "#define AMAZON_API\n";
                break;
            case 4:
                pathDeformVertexShaderSource += "#define LASTFM_API\n";
                pathDeformFragmentShaderSource += "#define LASTFM_API\n";
                pathSimFragmentShaderSource += "#define LASTFM_API\n";
                break;
            default:
                break;
        }

        // Handle filtering manually or using the hardware ?
        if( !hasLinearFilteringAvailable )
        {
            pathDeformVertexShaderSource += "#define DO_LINEAR_FILTERING\n";    // no linear filtering, so do it in the shader
        }

        // Vertex shader
        pathDeformVertexShaderSource += staticData[ "PathDeformVertexShader" ];

        // Fragment shader
        pathDeformFragmentShaderSource += staticData[ "PathDeformFragmentShader" ];

        this.cubePoolPathMaterialsAttributes =
        {
            ParticleColorAndIndex:
            {
                type: 'f'
                , value: null
            }
            , ParticleOffsetDirectionVector:
            {
                type: 'f'
                , value: null
            }
            , ParticleScale:
            {
                type: 'f'
                , value: null
            }
        };

        this.cubePoolPathMaterial = new THREE.ShaderMaterial(
            {
                uniforms: this.cubePoolPathUniforms
                , attributes: this.cubePoolPathMaterialsAttributes
                , vertexShader: pathDeformVertexShaderSource
                , fragmentShader: pathDeformFragmentShaderSource
                , vertexColors: THREE.VertexColors
            } );
//        if( browserName != "IE 11" ) // IE11 doesn't support gl_FrontFacing
//        {
            this.cubePoolPathMaterial.side = THREE.DoubleSide;
//        }
//        else
//        {
//            LOG( "+++ IE11 does not support gl_FrontFacing" );
//        }



    this.cubePoolMesh = new THREE.Mesh( this.cubePoolGeometry, this.cubePoolPathMaterial );
//        if( browserName != "IE 11" ) // IE11 doesn't support gl_FrontFacing
//        {
            this.cubePoolMesh.doubleSided = true;
//        }
//        else
//        {
//            LOG( "+++ IE11 does not support gl_FrontFacing (2)" );
//        }
        this.cubePoolMesh.frustumCulled = false;

        this.cubePoolMesh.position.set( 0, 0, this.logoDepthScale );


        //
        // Path simulation runs on gpu
        //

        var pathSimFragmentBeginShaderSource = pathSimFragmentShaderSource;
        var pathSimFragmentLoopEndShaderSource = pathSimFragmentShaderSource;

        pathSimFragmentBeginShaderSource += "#define BEGIN_ANIM_ENABLED";
        pathSimFragmentBeginShaderSource += staticData[ "PathSimFragmentShader" ];
        pathSimFragmentLoopEndShaderSource += staticData[ "PathSimFragmentShader" ];

        pathSimVertexShaderSource += staticData[ "PathSimVertexShader" ];
        pathSimFragmentShaderSource += staticData[ "PathSimFragmentShader" ];

        this.pathSimShaderBegin = new THREE.ShaderMaterial(
        {
            uniforms:
            {
                TargetMap: { type: "t", value: this.pathOffsetTex }
                , Map: { type: "t", value: this.pathOffsetBeginTex }
                , CubeAttrib1Map: { type: "t", value: this.pathAttrib1Tex }
                , ParticleSpeed: { type: "f", value: this.decl.particleSpeed }
                , PathSpeed: { type: "f", value: effectController_.pathSlowness }
                , OneOverPathSpeed: { type: "f", value: 1.0/effectController_.pathSlowness }
                , TimeStep: { type: "f", value: 1.0/60.0 }
                , Time: { type: "f", value: 0.0 }
                , LoopEndTime: { type: "f", value: 60000.0 }
            },

            vertexShader: pathSimVertexShaderSource
            , fragmentShader: pathSimFragmentBeginShaderSource
        });

        this.pathSimShaderLoopEnd = new THREE.ShaderMaterial(
        {
            uniforms:
            {
                TargetMap: { type: "t", value: this.pathOffsetTex }
                , Map: { type: "t", value: this.pathOffsetBeginTex }
                , CubeAttrib1Map: { type: "t", value: this.pathAttrib1Tex }
                , ParticleSpeed: { type: "f", value: this.decl.particleSpeed }
                , PathSpeed: { type: "f", value: effectController_.pathSlowness }
                , OneOverPathSpeed: { type: "f", value: 1.0/effectController_.pathSlowness }
                , TimeStep: { type: "f", value: 1.0/60.0 }
                , Time: { type: "f", value: 0.0 }
                , LoopEndTime: { type: "f", value: 60000.0 }
            },

            vertexShader: pathSimVertexShaderSource
            , fragmentShader: pathSimFragmentLoopEndShaderSource
        });

        this.pathSimShader = this.pathSimShaderBegin;

/*        this.pathSimShader = new THREE.ShaderMaterial(
        {
            uniforms:
            {
                TargetMap: { type: "t", value: this.pathOffsetTex }
                , Map: { type: "t", value: this.pathOffsetBeginTex }
                , CubeAttrib1Map: { type: "t", value: this.pathAttrib1Tex }
                , ParticleSpeed: { type: "f", value: this.decl.particleSpeed }
                , PathSpeed: { type: "f", value: effectController_.pathSlowness }
                , OneOverPathSpeed: { type: "f", value: 1.0/effectController_.pathSlowness }
                , TimeStep: { type: "f", value: 1.0/60.0 }
                , Time: { type: "f", value: 0.0 }
                , LoopEndTime: { type: "f", value: 60000.0 }
            },

            vertexShader: pathSimVertexShaderSource
            , fragmentShader: pathSimFragmentShaderSource
        });
*/
        this.pathTextureRT1 = new THREE.WebGLRenderTarget( width_, height_,
        {
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type:THREE.FloatType
            , stencilBuffer: false
            , depthBuffer: false
        });
        this.pathTextureRT2 = this.pathTextureRT1.clone();

        this.pathSim = new THREE.FBOUtils( width_, height_, renderer_, this.pathSimShader );
        this.pathSim.renderToTexture( this.pathTextureRT1, this.pathTextureRT2 );
        this.pathSim.in = this.pathTextureRT1;
        this.pathSim.out = this.pathTextureRT2;
    }

    , AddToScene: function( scene_ )
    {
        scene_.add( this.cubePoolMesh );
    }

    , RemoveFromScene: function( scene_ )
    {
        scene_.remove( this.cubePoolMesh );
    }

    // We change APIs using this function. It restarts the animation
    , Enable: function( decl_ )
    {
        this.isActive = true;

        this.decl = decl_;

        this.playRestSample = true;

        // Twitter uses transparency
        if( this.decl.index == 1 )
        {
            this.cubePoolPathMaterial.depthTest = false;
            this.cubePoolPathMaterial.transparent = true;
        }
        else
        {
            this.cubePoolPathMaterial.depthTest = true;
            this.cubePoolPathMaterial.transparent = false;
        }

        this.cubePoolMesh.rotation.y = 0.0;

        var vvv = Math.pow( 2.0, this.decl.particleDivisor );

        this.GeneratePathOffsetTextures( this.width, this.height, 4, vvv );
        this.pathDataTexInit = true;

        var numCubes = this.width * (this.height / vvv);
        this.cubePoolGeometry.numVertices = numCubes * 36;
        this.cubePoolGeometry.attributes.position.numItems = this.cubePoolGeometry.numVertices * 3;
        if( this.decl.index == 1 )
        {
            this.UpdateRibbonGeometry( numCubes );
        }
        else
        {
            this.UpdateGeometry( numCubes );
        }


        // Facebook has different uv mapping
        if( this.decl.index == 6 )
        {
            var ts = new THREE.Vector2( 0, 0 );
            ts.x = this.decl.tileWidthPortrait / this.decl.texWidth;
            ts.y = this.decl.tileHeightPortrait / this.decl.texHeight;
            this.cubePoolPathUniforms.TexSection.value = ts;
        }
        else
        {
            var ts = new THREE.Vector2( 0, 0 );
            ts.x = this.decl.tileWidth / this.decl.texWidth;
            ts.y = this.decl.tileHeight / this.decl.texHeight;
            this.cubePoolPathUniforms.TexSection.value = ts;
        }
        /*if( this.decl.index == 1 )
        {
            var ts = new THREE.Vector2(0, 0);
            ts.x = kTwitterTextureSectionSize.x / kTextureSize.x;
            ts.y = kTwitterTextureSectionSize.y / kTextureSize.y;
            this.cubePoolPathUniforms.TexSection.value = ts;
            this.cubePoolPathUniforms.AlphaIntensity.value = 1; //3.5;
            this.cubePoolPathUniforms.Wave1ScaleAndOffset.value.set( 6.0, 0.0 );
        }
        else if( this.decl.index == 2 )
        {
            var ts = new THREE.Vector2(0, 0);
            ts.x = kNYTTextureSectionSize.x / kTextureSize.x;
            ts.y = kNYTTextureSectionSize.y / kTextureSize.y;
            this.cubePoolPathUniforms.TexSection.value = ts;
            this.cubePoolPathUniforms.AlphaIntensity.value = 1.0;
            this.cubePoolPathUniforms.Wave1ScaleAndOffset.value.set( 6.0, 0.0 );
        }
        else
        {
            var ts = new THREE.Vector2(0, 0);
            ts.x = kTextureSectionSize.x / kTextureSize.x;
            ts.y = kTextureSectionSize.y / kTextureSize.y;
            this.cubePoolPathUniforms.TexSection.value = ts;
            this.cubePoolPathUniforms.AlphaIntensity.value = 1.0;
        }*/

        this.cubePoolPathUniforms.Wave1ScaleAndOffset.value.set( 6.0, 0.0 );
        this.cubePoolPathUniforms.AlphaIntensity.value = 1.0;
        this.cubePoolPathUniforms.Dim.value.set( this.width, this.height );
        this.cubePoolPathUniforms.Time.value = 0.0;
        this.cubePoolPathUniforms.DiffuseMap.value = this.decl.texture;
        this.cubePoolPathUniforms.DoRotation.value = this.decl.doRotation;
//        this.cubePoolPathUniforms.OffsetGlobalScale.value = 1.0;
        this.cubePoolPathUniforms.WAVE1_PARTICLES.value = this.numFrontParticles;


        //
        // Path simulation shader
        //

        /*pathTextureRT1 = new THREE.WebGLRenderTarget( cubeArrayDimX, cubeArrayDimY,
         {
         wrapS: THREE.ClampToEdgeWrapping,
         wrapT: THREE.ClampToEdgeWrapping,
         minFilter: THREE.NearestFilter,
         magFilter: THREE.NearestFilter,
         format: THREE.RGBAFormat,
         type:THREE.FloatType
         , stencilBuffer: false
         , depthBuffer: false
         });
         pathTextureRT2 = pathTextureRT1.clone();*/

        // Set for begin shader
        this.pathSimShader = this.pathSimShaderBegin;
        this.pathSim.SetSimulationShader( this.pathSimShader );

        this.pathSimShader.uniforms.TargetMap.value = this.pathOffsetTex;
        this.pathSimShader.uniforms.Map.value = this.pathOffsetBeginTex;
        this.pathSimShader.uniforms.CubeAttrib1Map.value = this.pathAttrib1Tex;
        this.pathSimShader.uniforms.ParticleSpeed.value = this.decl.particleSpeed;// * effectController.particleGlobalSpeed;
    //    pathSimShader.uniforms.PathSpeed.value = effectController.pathSlowness;
        this.pathSimShader.uniforms.TimeStep.value = 0.0;
        this.pathSimShader.uniforms.Time.value = 0.0;
        //pathSimShader.uniforms.Dim.value.set( cubeArrayDimX, vvv );
        //pathSimShader.uniforms.ParticleDivisor.value = currParamSelection.particleDivisor; //Math.pow(2, effectController.particleDivisor);
        this.pathSimShader.uniforms.LoopEndTime.value = 6000.0;

        //pathSim = new THREE.FBOUtils( cubeArrayDimX, cubeArrayDimY, renderer, pathSimShader );
//        this.pathSimShader = this.pathSimShaderBegin;
//        this.pathSim.SetSimulationShader( this.pathSimShader );
        this.pathSim.renderToTexture( this.pathTextureRT1, this.pathTextureRT2 );
        this.pathSim.in = this.pathTextureRT1;
        this.pathSim.out = this.pathTextureRT2;
    }

    , SetTriggerTime: function( time_ )
    {
        this.triggerTime = time_;
    }

    , SetForExitAnimation: function( time_ )
    {
        // Twitter uses transparency, so we need depth test activated in exit animation so it doesn't overlap in api
        if( this.decl.index == 1 )
        {
            this.cubePoolPathMaterial.depthTest = true;
            this.cubePoolPathMaterial.transparent = true;
        }

        var exitStartDelay = 0.0;
        this.exitAnimationActive = true;
        var currTime = Clamp( time_ - this.triggerTime, 0.0, time_ ) + exitStartDelay;

        // Set for exit shader
        this.pathSimShader = this.pathSimShaderLoopEnd;
        this.pathSim.SetSimulationShader( this.pathSimShader );

        this.pathSimShader.uniforms.LoopEndTime.value = currTime;
        Klang.triggerEvent('animation_out');
//        LOG( "API For exit: " + this.decl.index + " at: " + currTime );
    }

, ComputeCubeAttributes: function( cubeIndex, texcoordY, partOffsetDir, partScale, partColorAndIndex, doRotate )
{
    //
    // COLORS
    //
    var color = colWhite;
    var ci = 0;
    switch( this.decl.index )
    {
        case 0:
        case 6:
            color = colWhite;
            break;

        case 1:
            ci = THREE.Math.randInt( 0, colsTwitter.length-1 );
            if( cubeIndex < this.numFrontParticles )
                color = colWhite;
            else
                color = colsTwitter[ ci ];
            break;

        case 2:
            color = colWhite;
            break;

        case 3:
            color = colWhite;
            break;

        case 4:
            color = colWhite;
            break;

        default:
            break;
    }


    //
    // SCALE
    //
    var rndUniformScale = THREE.Math.randFloat( this.decl.MeshMinUniScale, this.decl.MeshMaxUniScale );

    var rndScaleX = THREE.Math.randFloat( this.decl.MeshMinScaleX, this.decl.MeshMaxScaleX );
    var rndScaleY = THREE.Math.randFloat( this.decl.MeshMinScaleY, this.decl.MeshMaxScaleY );
    var rndScaleZ = THREE.Math.randFloat( this.decl.MeshMinScaleZ, this.decl.MeshMaxScaleZ );

//    // NYT trick to have 2 types of shapes
//    if( this.decl.index == 2 && THREE.Math.randInt(0, 100) > 90 )
//    {
//        rndScaleX = THREE.Math.randFloat( 0.1, 3 );
//        rndScaleY = THREE.Math.randFloat( 0.1, 2 );
//        rndScaleZ = THREE.Math.randFloat( 0.1, 4 );
//    }


    // Facebook
    // Portrait Aspect Ratio
    //var aspectRatio = 1;
    var aspectRatio = 16.0 / 9.0;
    if( this.decl.index == 6 )
    {
        if( texcoordY >= 0.5 )
        {
            // Landscape
            var scaler = THREE.Math.randFloat( this.decl.MeshMinScaleX, this.decl.MeshMaxScaleX );
            //rndScaleX = scaler * aspectRatio;
            //rndScaleY = scaler;
            rndScaleX = scaler;
            rndScaleY = scaler;
        }
        else
        {
            // Portrait
            // X=Y has the landscape ratio included so we need to divide not by 2 but by 4 to get proper portrait ratio
            var scaler = THREE.Math.randFloat( this.decl.MeshMinScaleX, this.decl.MeshMaxScaleX );
            //rndScaleX = scaler;
            //rndScaleY = scaler * aspectRatio;
            rndScaleX = scaler / aspectRatio;
            rndScaleY = scaler * aspectRatio * 1;
        }
    }


    // Scale particles globally
    rndUniformScale *= this.decl.particleGlobalSize; // * effectController.particleGlobalSize;

    //
    // Special case for BIG FRONT Particles
    //
    if( cubeIndex < this.numFrontParticles )
    {
        rndUniformScale = 1.0;
        rndScaleX = 1;
        rndScaleY = 1;
//          rndScaleZ = THREE.Math.randFloat( 0.2, 0.5 );

        switch( this.decl.index )
        {
            // Facebook
            case 6:
                if( texcoordY >= 0.5 )
                {
                    // Landscape
                    var scaler = THREE.Math.randFloat( 0.1, 2.0 );
                    //rndScaleX = scaler * aspectRatio;
                    //rndScaleY = scaler;
                    rndScaleX = scaler;
                    rndScaleY = scaler;
                }
                else
                {
                    // Portrait
                    // X=Y has the landscape ratio included so we need to divide not by 2 but by 4 to get proper portrait ratio
                    var scaler = THREE.Math.randFloat( 0.1, 2.0 );
                    //rndScaleX = scaler;
                    //rndScaleY = scaler * aspectRatio;
                    rndScaleX = scaler / aspectRatio;
                    rndScaleY = scaler * aspectRatio * 1;
                }

                rndScaleZ = 0.001; //THREE.Math.randFloat( 0.001, 0.01 ); //THREE.Math.randFloat( 0.5, 1.0 );
                break;

            case 0:
                // if( first 3 particles )
                //if( cubeIndex < 3 )
//                {
                    rndScaleX = 3.0 - THREE.Math.randFloat( 0.1, 3.0 );
                    rndScaleY = rndScaleX * 1.1;//THREE.Math.randFloat( 0.1, 4.0 );
//                    rndScaleX = 2.0 * 1.5;
//                    rndScaleY = 3.0 * 1.5;
//                }
//                else
//                {
//                    rndScaleX = 0.75 * 2;
//                    rndScaleY = 1.0 * 2;
//                }
                rndScaleZ = THREE.Math.randFloat( 0.01, 0.1 ); //THREE.Math.randFloat( 0.5, 1.0 );
                break;

            case 1:
                rndScaleX = THREE.Math.randFloat( 1, 2 );
                rndScaleY = 1;//THREE.Math.randFloat( 1, 1 );
                //rndScaleX = THREE.Math.randFloat( 1.0, 3.5 );
                //rndScaleY = rndScaleX;
                //rndScaleZ = THREE.Math.randFloat( 0.1, 0.2 );
                break;

            case 2:
                rndScaleX = THREE.Math.randFloat( 1, 2 );
                rndScaleY = rndScaleX * 0.5; //rndScaleX*2.0;
                rndScaleZ = 0.01; //THREE.Math.randFloat( 0.2, 0.5 );
                break;

            case 3:
                if( cubeIndex < this.numFrontParticles/5 )
                {
                    rndScaleX = THREE.Math.randFloat( 0.01, 2.5 );
                }
                else if( cubeIndex >= this.numFrontParticles/5 && cubeIndex < this.numFrontParticles/2 )
                {
                    rndScaleX = THREE.Math.randFloat( 0.01, 1.5 );
                }
                else
                {
                    if( THREE.Math.randFloat(0, 100) > 60 )
                        rndScaleX = THREE.Math.randFloat( 0.01, 0.7 );
                    else
                        rndScaleX = THREE.Math.randFloat( 0.01, 2.5 );
                }
                rndScaleY = rndScaleX * 1.5;
                rndScaleZ = THREE.Math.randFloat( 0.2, 0.5 ); //THREE.Math.randFloat( 0.1, 0.25 );
                break;

            case 4:
                // if( first 3 particles )
                if( cubeIndex < 3 )
                {
                    rndScaleX = 3.0;
                    rndScaleY = 3.0;
                }
                else
                {
                    rndScaleX = THREE.Math.randFloat( 1.0, 3.5 );
                    rndScaleY = rndScaleX; //THREE.Math.randFloat( 1, 2 );
                }
                rndScaleZ = THREE.Math.randFloat( 0.02, 0.05 );
                break;

            default:
                LOG( "--- Something is wrong with ComputeCubeAttributes scaling" );
                //rndScaleZ = THREE.Math.randFloat( 0.12, 0.25 );
                break;
        }
    }


    //
    // PATH OFFSET DIRECTION VECTOR
    //
    var offsetDir = new THREE.Vector3();
    switch( this.decl.index )
    {
        case 6:
            offsetDir.x = THREE.Math.randFloat( -1, 1 );
            offsetDir.y = THREE.Math.randFloat( -1, 1 );
            offsetDir.z = THREE.Math.randFloat( -4, 4 );
            break;
        case 0:
            offsetDir.x = THREE.Math.randFloat( -5, 5 );
            offsetDir.y = THREE.Math.randFloat( -3, 3 );
            offsetDir.z = THREE.Math.randFloat( -5, 5 );
            if( cubeIndex < this.numFrontParticles )
                offsetDir.z = THREE.Math.randFloat( -5, 15 );
            break;

        case 1:
            offsetDir.x = 0;//THREE.Math.randFloat( -2, 2 );
            offsetDir.y = THREE.Math.randFloat( -15, 15 );
            if( cubeIndex < this.numFrontParticles )
                offsetDir.z = THREE.Math.randFloat( -80, 100 );
            else
                offsetDir.z = THREE.Math.randFloat( -100, 100 );
            break;

        case 2:
            offsetDir.x = THREE.Math.randFloat( -1, 1 );
            offsetDir.y = THREE.Math.randFloat( -1, 1 );
            offsetDir.z = THREE.Math.randFloat( -4, 4 );
            break;

        case 3:
            if( cubeIndex < this.numFrontParticles )
            {
                offsetDir.x = 0;//THREE.Math.randFloat( -1, 1 );
                offsetDir.y = THREE.Math.randFloat( -5, 5 );
                offsetDir.z = THREE.Math.randFloat( -10, 30 );
            }
            else
            {
                var angle = ((cubeIndex%this.width) / this.width) * 0.5;
                //var angle = (i / (w)) * 0.5;
                var x = Math.cos( angle * 2.0 * Math.PI );
                var y = Math.sin( angle * 2.0 * Math.PI );
                offsetDir.x = 0; //THREE.Math.randFloat( -1, 1 );
                offsetDir.y = x; //THREE.Math.randFloat( -1, 1 );
                offsetDir.z = y; //THREE.Math.randFloat( -0.4, 0.4 );
            }
            break;

        case 4:
            offsetDir.x = THREE.Math.randFloat( -0.1, 0.1 );
            offsetDir.y = THREE.Math.randFloat( -1, 1 );
            offsetDir.z = THREE.Math.randFloat( -10, 10 );
            break;

        default:
            break;
    }

    partOffsetDir.set( offsetDir.x, offsetDir.y, offsetDir.z );
    partScale.set( rndScaleX * rndUniformScale, rndScaleY * rndUniformScale, rndScaleZ * rndUniformScale );
    partColorAndIndex.set( color.x, color.y, color.z, doRotate );
//    partColorAndIndex.set( color.x, color.y, color.z, cubeIndex );
}


// Function to set vertex data
, UpdateVertex: function( k, va, vn, uv, col, partOffsetDir, partScale, partColorAndIndex )
{
    var j2 = k * 2;
    var j3 = k * 3;
    var j4 = k * 4;

    // Positions
    this.positions[j3 + 0] = va.x;
    this.positions[j3 + 1] = va.y;
    this.positions[j3 + 2] = va.z;

    // Normals
    this.normals[j3 + 0] = vn.x;
    this.normals[j3 + 1] = vn.y;
    this.normals[j3 + 2] = vn.z;

    // UVs
    this.texcoords[j2 + 0] = uv.x;
    this.texcoords[j2 + 1] = uv.y;

    // Colors
    this.colors[j3 + 0] = col.x;
    this.colors[j3 + 1] = col.y;
    this.colors[j3 + 2] = col.z;

    // Custom attributes
    this.particleColorAndIndices[ j4 + 0 ] = partColorAndIndex.x;
    this.particleColorAndIndices[ j4 + 1 ] = partColorAndIndex.y;
    this.particleColorAndIndices[ j4 + 2 ] = partColorAndIndex.z;
    this.particleColorAndIndices[ j4 + 3 ] = partColorAndIndex.w;

    this.particleOffsetDirections[ j3 + 0 ] = partOffsetDir.x;
    this.particleOffsetDirections[ j3 + 1 ] = partOffsetDir.y;
    this.particleOffsetDirections[ j3 + 2 ] = partOffsetDir.z;

    this.particleScales[ j3 + 0 ] = partScale.x;
    this.particleScales[ j3 + 1 ] = partScale.y;
    this.particleScales[ j3 + 2 ] = partScale.z;
}


, UpdateGeometry: function( cubeCount )
{
    var uvoff = new THREE.Vector2();
    var vertex = new THREE.Vector3();
    var normal = new THREE.Vector3();
    var texcoord = new THREE.Vector2();
    var color = new THREE.Vector3();
    var partOffsetDir = new THREE.Vector3();
    var partScale = new THREE.Vector3();
    var partColorAndIndex = new THREE.Vector4();

    for( var ci=0; ci<cubeCount; ci++ )
    {
        var isWave1 = false;
        if( ci < this.numFrontParticles )
            isWave1 = true;

        var doRotate = 0.0; // Per particle rotation flag

        // Facebook
        if( this.decl.index == 6 )
        {
            var whichOne = THREE.Math.randInt( 0, 100 );
            // Landscape
            if( whichOne < this.decl.landscapeChance )
            {
                var uIdx = THREE.Math.randInt( 0, this.decl.numTilesXLandscape-1 );
                var vIdx = THREE.Math.randInt( 0, this.decl.numTilesYLandscape-1 );

                uIdx *= this.decl.tileWidthLandscape;
                vIdx *= this.decl.tileHeightLandscape;

                uIdx /= this.decl.texWidth;
                vIdx /= this.decl.texHeight * 0.5;  // divide by 2 as Landscape tiles are only 50% of the texture's height

                uvoff.x = uIdx;
                uvoff.y = (0.5 + vIdx * 0.5);  // starts at half height
//                console.log( ts.x + ", " + ts.y + ", " + ts.z + ", " + ts.w );
            }
            // Portrait
            else
            {
                var uIdx = THREE.Math.randInt( 0, this.decl.numTilesXPortrait-1 );
                var vIdx = THREE.Math.randInt( 0, this.decl.numTilesYPortrait-1 );

                uIdx *= this.decl.tileWidthPortrait;
                vIdx *= this.decl.tileHeightPortrait;

                uIdx /= this.decl.texWidth;
                vIdx /= this.decl.texHeight * 0.5;  // divide by 2 as Portrait tiles are only 50% of the texture's height

                uvoff.x = uIdx;
                uvoff.y = (vIdx * 0.5);  // starts at top
//                console.log( ts.x + ", " + ts.y + ", " + ts.z + ", " + ts.w );
            }
        }
        // The rest
        else
        {
            var uIdx = THREE.Math.randInt( 0, this.decl.numTilesX-1 )
            var vIdx = THREE.Math.randInt( 0, this.decl.numTilesY-1 );
                
            uIdx *= this.decl.tileWidth;
            vIdx *= this.decl.tileHeight;
                
            uIdx /= this.decl.texWidth;
            vIdx /= this.decl.texHeight;
                
            uvoff.x = uIdx;
            uvoff.y = vIdx;
        }

        // if NYT
        /*if( this.decl.index == 2 )
        {
            uvoff.x = (THREE.Math.randInt( 0, kNumNYTTextures.x-1 ) * kNYTTextureSectionSize.x) / kTextureSize.x;
            uvoff.y = (THREE.Math.randInt( 0, kNumNYTTextures.y-1 ) * kNYTTextureSectionSize.y) / kTextureSize.y;
        }
        else
        {
            uvoff.x = (THREE.Math.randInt( 0, kNumTextures.x-1 ) * kTextureSectionSize.x) / kTextureSize.x;
            uvoff.y = (THREE.Math.randInt( 0, kNumTextures.y-1 ) * kTextureSectionSize.y) / kTextureSize.y;
        }*/

        //
        // Handle particle rotations
        //
        if( this.decl.index == 2 && uvoff.y < (1.0/4.0) ) // v is flipped
            doRotate = 1.0;

        if( this.decl.index == 0 && isWave1 )
            doRotate = 1.0;

        // Facebook
        if( this.decl.index == 6 && isWave1 )
            doRotate = 1.0;

        if( this.decl.index == 3 && isWave1 )
            doRotate = 1.0;

        if( this.decl.index == 4 && isWave1 )
            doRotate = 1.0;

        //
        var posAlongPath = ci;

        var randXOffset = 0.0;
        var randYOffset = 0.0;
        var randZOffset = 0.0;

        // Instagram/LastFM/Facebook Z offset (to give depth when in the logo)
        if( this.decl.index == 0
            || this.decl.index == 6 // Facebook
            || this.decl.index == 4
            )
        {
            randZOffset = THREE.Math.randFloat( 0, 5 );
        }

        // Amazon
        if( this.decl.index === 3 && ci < this.numFrontParticles )
        {
            randYOffset = THREE.Math.randFloat( -1, 1 );
            randZOffset = THREE.Math.randFloat( -15, 5 );
        }

        // NYTimes
        if( this.decl.index === 2 )
        {
            //randYOffset = THREE.Math.randFloat( 0, 5 );
            randZOffset = THREE.Math.randFloat( -3, 3 );

            // Make sure image particles are closer to path center
            // HACK to make particle rotation look good enough
            if( uvoff.y < (1.0/4.0) )
                randZOffset = THREE.Math.randFloat( -1, 1 );
        }

        // Compute values for custom attributes. Returns into parameters
        this.ComputeCubeAttributes( ci, uvoff.y, partOffsetDir, partScale, partColorAndIndex, doRotate );

        color.set( uvoff.x, uvoff.y, posAlongPath );

        for( var kk=0; kk<36; kk++ )
        {
            var idx = _indices[ kk ];

            var vertexIndex = kk + ci * 36;

            var posX = _vertices[ idx * 3 + 0 ];
            var posY = _vertices[ idx * 3 + 1 ];
            var posZ = _vertices[ idx * 3 + 2 ];

            if( ci > this.numFrontParticles )
            {
                posX += randXOffset;
                posY += randYOffset;
                posZ += randZOffset;
            }

            posX += 0.5;
            if( posX > 0.0 )
                posX += 0.5;

            vertex.set( posX, posY, posZ );
            normal.set( _normals[ idx*3+0 ], _normals[ idx*3+1 ], _normals[ idx*3+2 ] );
            texcoord.set( _texcoords[ idx*2+0 ], _texcoords[ idx*2+1 ] );
            this.UpdateVertex( vertexIndex, vertex, normal, texcoord, color, partOffsetDir, partScale, partColorAndIndex );
        }
    }

    //cubePoolGeometry.verticesNeedUpdate = true;
    //cubePoolGeometry.colorsNeedUpdate = true;
    this.cubePoolGeometry.attributes.position.needsUpdate = true;
    this.cubePoolGeometry.attributes.normal.needsUpdate = true;
    this.cubePoolGeometry.attributes.uv.needsUpdate = true;
    this.cubePoolGeometry.attributes.color.needsUpdate = true;
    this.cubePoolGeometry.attributes.ParticleColorAndIndex.needsUpdate = true;
    this.cubePoolGeometry.attributes.ParticleOffsetDirectionVector.needsUpdate = true;
    this.cubePoolGeometry.attributes.ParticleScale.needsUpdate = true;

    //this.cubePoolGeometry.computeBoundingSphere();
}


, UpdateRibbonGeometry: function( cubeCount )
{
    var uvoff = new THREE.Vector2();
    var vertex = new THREE.Vector3();
    var normal = new THREE.Vector3();
    var texcoord = new THREE.Vector2();
    var color = new THREE.Vector3();
    var partOffsetDir = new THREE.Vector3();
    var partScale = new THREE.Vector3();
    var partColorAndIndex = new THREE.Vector4();

    for( var ci=0; ci<cubeCount; ci++ )
    {
        var posAlongPath = ci;

        var randZOffset = 0;

        // Twitter fixed Z offset (to give depth when in the logo)
        var randZOffset = THREE.Math.randFloat( 0, 3.0 );

        if( ci > this.numFrontParticles )
        {
            uvoff.x = 0.0;
            uvoff.y = (0.0 * kTwitterTextureSectionSize.y) / kTextureSize.y;
        }
        else
        {
            uvoff.x = 0;
            uvoff.y = (THREE.Math.randInt( 2, kNumTwitterTextures.y-2 ) * kTwitterTextureSectionSize.y) / kTextureSize.y;
        }

        // Compute values for custom attributes. Returns into parameters
        this.ComputeCubeAttributes( ci, uvoff.y, partOffsetDir, partScale, partColorAndIndex, 0.0 );

        color.set( uvoff.x, uvoff.y, posAlongPath );

        for( var kk=0; kk<36; kk++ )
        {
            var idx = _planeIndices[ kk ];

            var vertexIndex = kk + ci * 36;

            var posX = _planeVertices[idx*3+0];
            var posY = _planeVertices[idx*3+1];
            var posZ = _planeVertices[idx*3+2];

            posZ += randZOffset;

            vertex.set( posX, posY, posZ );
            normal.set( _planeNormals[ idx*3+0 ], _planeNormals[ idx*3+1 ], _planeNormals[ idx*3+2 ] );
            texcoord.set( _planeTexcoords[ idx*2+0 ], _planeTexcoords[ idx*2+1 ] );
            this.UpdateVertex( vertexIndex, vertex, normal, texcoord, color, partOffsetDir, partScale, partColorAndIndex );
        }
    }

    //this.cubePoolGeometry.verticesNeedUpdate = true;
    //this.cubePoolGeometry.colorsNeedUpdate = true;
    //this.cubePoolGeometry.uvsNeedUpdate = true;
    this.cubePoolGeometry.attributes.position.needsUpdate = true;
    this.cubePoolGeometry.attributes.normal.needsUpdate = true;
    this.cubePoolGeometry.attributes.uv.needsUpdate = true;
    this.cubePoolGeometry.attributes.color.needsUpdate = true;
    this.cubePoolGeometry.attributes.ParticleColorAndIndex.needsUpdate = true;
    this.cubePoolGeometry.attributes.ParticleOffsetDirectionVector.needsUpdate = true;
    this.cubePoolGeometry.attributes.ParticleScale.needsUpdate = true;

    this.cubePoolGeometry.computeBoundingSphere();
}

, GeneratePathOffsetTextures: function( w, h, bpp, divisor )
{
    var numRows = this.width;
    var logoWidth = 7.0 / numRows;
    var wid = numRows * logoWidth;

    // V02
    var logoBeginT = 1346.0 / 4096.0;
    var logoEndT = 2808.0 / 4096.0;
    // V01
    //var logoBeginT = 1407.0 / 4096.0;
    //var logoEndT = 2722.0 / 4096.0;

    var hh = h/divisor;

//        LOG( "real height: " + h );
//        LOG( "divisor    : " + divisor );
//        LOG( "value      : " + hh );

    for( var j=0; j<h; j++ )
    {
        for( var i=0; i<w; i++ )
        {
            var idx00 = (i + j * w);
            var idxNorm = idx00 / (w*hh);

            var isWave1 = idx00 < (this.numFrontParticles - w);

            var t = (j*w) / ((w*hh)-w*1);
//                var t = idx00 / ((w*h));

            var rnd = Lerp( logoBeginT, logoEndT, t );

            var offf = THREE.Math.randFloat( this.decl.PathWidthMinOffset, this.decl.PathWidthMaxOffset );
            var tt = (i % numRows) / (numRows-1);
            var xx = Lerp( -wid*0.5-offf, wid*0.5+offf, tt );

            // Make distance to path center fixed
            if( this.decl.index == 3 )
            {
                xx = wid * 0.5;
            }

            var triggerTime;
            var frontPartsSpeedReduce = 1.0;

            // Particle speed
            var particleSpeed = 0.2 + THREE.Math.randFloat( 0.0, 1.0 ) * frontPartsSpeedReduce;

            var partBeginT = 0.0;
            var partOffsetDistance = 1.0;

            if( isWave1 )
            {
                //frontPartsSpeedReduce = 0.5;

                if( this.decl.index == 2 )
                    rnd = THREE.Math.randFloat( logoBeginT*0.5, logoEndT );
                else
                    rnd = THREE.Math.randFloat( logoBeginT, logoEndT );

                xx = THREE.Math.randFloat( -wid*0.5-offf, wid*0.5+offf );
                var pt = idx00 / (this.numFrontParticles-1);
                pt *= pt;
                triggerTime = Lerp( this.decl.wave1StartTime, this.decl.wave1EmitTime, pt );
//                triggerTime = THREE.Math.randFloat( this.decl.wave1StartTime, this.decl.wave1StartTime+this.decl.wave1EmitTime );
            }
            else
            {
                // Random end position along the logo path
                triggerTime = THREE.Math.randFloat( this.decl.wave2StartTime, this.decl.wave2EmitTime-this.decl.wave2StartTime );
            }


            // Format:
            // Attrib1: X: particle BeginT along the path, Y: unused, Z: unused, W: particle speed


            //
            // INSTAGRAM
            //
            if( isWave1 )
            {
                partOffsetDistance = 31.0;
            }
            else
            {
                partOffsetDistance = 21.0;

                particleSpeed += THREE.Math.randFloat( 0.0, 4.0 ) * frontPartsSpeedReduce;

                if( this.decl.index == 0
                    || this.decl.index == 6 )
                {
                    partBeginT = 0.0;

                    // MOST particles begin inside the logo shape
                    if( idx00 > (w*hh)/32 )
                    {
                        partBeginT = THREE.Math.randFloat( logoBeginT*0.2, logoBeginT );
                        //partBeginT = THREE.Math.randFloat( logoBeginT*0.25, logoBeginT );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );

                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
                        //triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime );
                    }
                    else
                    {
                        partBeginT = THREE.Math.randFloat( 0, logoBeginT*0.2 );
                    }
                }
            }

            //
            // TWITTER
            //
            if( this.decl.index == 1 )
            {
                partBeginT = 0;

                if( isWave1 )
                {

                    partOffsetDistance = 1.5;
                    frontPartsSpeedReduce = 0.5;

                    rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
                    //xx = THREE.Math.randFloat( -wid*0.5-offf, wid*0.5+offf );
                    var pt = idx00 / (this.numFrontParticles-1);
                    triggerTime = THREE.Math.randFloat( this.decl.wave1StartTime, this.decl.wave1EmitTime );
                }
//                else
//                {
//                    // Random end position along the logo path
//                    triggerTime = THREE.Math.randFloat( this.decl.wave2StartTime, this.decl.wave2EmitTime );
//                }

                if( !isWave1 ) //idx00 > this.numFrontParticles )
                {
                    partOffsetDistance = THREE.Math.randFloat( 1, 2 );

                    if( idx00 > (w*h)/2 ) // for most particles begin inside the logo shape
                    {
                        partBeginT = THREE.Math.randFloat( 0, logoBeginT*0.5 );
                        //partBeginT = THREE.Math.randFloat( 0, logoEndT*0.5 );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
                    }
                    else
                    {
                        partBeginT = 0; //THREE.Math.randFloat( 0.0, logoBeginT * 0.5 );
                        triggerTime = THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
                    }
                }
            }

            //
            // NYTIMES
            //
            if( this.decl.index == 2 )
            {
                partBeginT = 0; //isWave1 ? 0.0 : THREE.Math.randFloat( 0.0, 0.0 );

                if( isWave1 )
                {
                    partOffsetDistance = 30.0;
                    frontPartsSpeedReduce = 0.035;
                }
                else
                {
                    partOffsetDistance = 30.0;

                    if( idx00 > (w*hh)/32 ) // for most particles begin inside the logo shape
                    {
//                        partBeginT = THREE.Math.randFloat( logoBeginT*0.2, logoBeginT );
                        partBeginT = THREE.Math.randFloat( 0.0, logoBeginT*0.5 );
                        //partBeginT = THREE.Math.randFloat( logoBeginT*0.5, logoBeginT );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );

                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
//                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime );
                    }
                    else
                    {
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
//                    if( logoIndex == 0 )
//                    {
//                        partBeginT = isWave1 ? 0.0 : THREE.Math.randFloat( 0.0, logoBeginT );
//                    }
                    }
                }
            }

            //
            // AMAZON
            //
            if( this.decl.index == 3 )
            {
                if( isWave1 )
                {
                    partBeginT = 0;
                    frontPartsSpeedReduce = 0.5;
                    partOffsetDistance = 21.0;

                    var pt = idx00 / (this.numFrontParticles-1);
                    triggerTime = Lerp( this.decl.wave1StartTime, this.decl.wave1EmitTime, pt );

//                    rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
////                    rnd = THREE.Math.randFloat( logoBeginT*0.75, logoBeginT );
//
//                    xx = THREE.Math.randFloat( -wid*0.5-offf, wid*0.5+offf );
////                    var pt = idx00 / (this.numFrontParticles-1);
//                    triggerTime = Lerp( effectController.wave1StartTime, effectController.wave1StartTime+effectController.wave1EmitTime, pt );
////                    triggerTime = THREE.Math.randFloat( this.decl.wave1StartTime, this.decl.wave1EmitTime );
//                    partBeginT = 0.0;
                }
//                else
//                {
//                    // Random end position along the logo path
//                    triggerTime = THREE.Math.randFloat( this.decl.wave1StartTime, this.decl.wave1EmitTime );
//                    triggerTime = THREE.Math.randFloat( this.decl.wave2StartTime, this.decl.wave2EmitTime );
//                }

                if( !isWave1 )
                {
                    partBeginT = 0;
                    partOffsetDistance = THREE.Math.randFloat( 11, 50 );
                    if( idx00 > (w*h)/32 ) // for most particles begin inside the logo shape
                    {
                        partBeginT = THREE.Math.randFloat( logoBeginT*0.25, logoEndT*0.25 );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
                    }
                    else
                    {
                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
                    }
                }
            }

            // LASTFM
            if( this.decl.index == 4 )
            {
                partBeginT = 0; //isWave1 ? 0.0 : THREE.Math.randFloat( 0.0, 0.0 );

                if( isWave1 )
                {
                    partOffsetDistance = 21.0;
                    frontPartsSpeedReduce = 0.5;
                    //rnd *= 1.25;
                    //triggerTime = THREE.Math.randFloat( this.decl.wave1StartTime, this.decl.wave1EmitTime );
                }
                else
                {
                    partOffsetDistance = 21; //THREE.Math.randFloat( 20, 40 );
                    partBeginT = 0; //isWave1 ? 0.0 : THREE.Math.randFloat( 0.0, 0.0 );
                    var oneMinusT = 1.0 - t;
                    partBeginT = Lerp( 0.0, logoBeginT*0.5, oneMinusT );
                    //partBeginT = Lerp( logoBeginT*0.2, logoEndT*0.25, oneMinusT );
                    rnd = Lerp( logoBeginT, logoEndT, oneMinusT );
                    triggerTime = Lerp( this.decl.wave2StartTime, this.decl.wave2EmitTime-this.decl.wave2StartTime, t );
                    //triggerTime = Lerp( this.decl.wave2StartTime, this.decl.wave2EmitTime, t );
                    //triggerTime = THREE.Math.randFloat( currParamSelection.wave2StartTime, currParamSelection.wave2EmitTime );
                }
            }


            // FACEBOOK
            if( this.decl.index == 6 )
            {
                partBeginT = 0; //isWave1 ? 0.0 : THREE.Math.randFloat( 0.0, 0.0 );

                if( isWave1 )
                {
                    partOffsetDistance = 30.0;
                    frontPartsSpeedReduce = 0.035;
                }
                else
                {
                    partOffsetDistance = 30.0;

                    if( idx00 > (w*hh)/32 ) // for most particles begin inside the logo shape
                    {
                        partBeginT = THREE.Math.randFloat( 0.0, logoBeginT*0.15 );
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );

                        triggerTime = this.decl.wave2StartTime + THREE.Math.randFloat( 0.0, this.decl.wave2EmitTime-this.decl.wave2StartTime );
                    }
                    else
                    {
                        rnd = THREE.Math.randFloat( logoBeginT, logoEndT );
                    }
                }
            }


            // Small delay for all APIs
            triggerTime += 0.25;

            this.pathOffsetData[ (i*bpp+0)+j*w*bpp ] = xx;
            this.pathOffsetData[ (i*bpp+1)+j*w*bpp ] = rnd;
            this.pathOffsetData[ (i*bpp+2)+j*w*bpp ] = 0; //triggerTime;
            this.pathOffsetData[ (i*bpp+3)+j*w*bpp ] = 0; // this is written to in shader. current particle T will be stored here

            this.pathOffsetBeginData[ (i*bpp+0)+j*w*bpp ] = xx;
            this.pathOffsetBeginData[ (i*bpp+1)+j*w*bpp ] = rnd;
            this.pathOffsetBeginData[ (i*bpp+2)+j*w*bpp ] = 0; //triggerTime;
            this.pathOffsetBeginData[ (i*bpp+3)+j*w*bpp ] = 0;  // this is written to in shader. current particle T will be stored here

            this.pathAttrib1TexData[ (i*bpp+0)+j*w*bpp ] = partBeginT;
            this.pathAttrib1TexData[ (i*bpp+1)+j*w*bpp ] = particleSpeed;
            this.pathAttrib1TexData[ (i*bpp+2)+j*w*bpp ] = partOffsetDistance;
            this.pathAttrib1TexData[ (i*bpp+3)+j*w*bpp ] = triggerTime;
        }
    }

    CreateFloatTextureFromData( gl, this.pathOffsetBeginTex, w, h, bpp, this.pathOffsetBeginData, gl.NEAREST, pathDataTexInit, browserName );
    CreateFloatTextureFromData( gl, this.pathOffsetTex, w, h, bpp, this.pathOffsetData, gl.NEAREST, pathDataTexInit, browserName );
    CreateFloatTextureFromData( gl, this.pathAttrib1Tex, w, h, bpp, this.pathAttrib1TexData, gl.NEAREST, pathDataTexInit, browserName );
//    this.CreateFPTextureFromData( gl, this.pathOffsetBeginTex, w, h, bpp, this.pathOffsetBeginData, gl.NEAREST );
//    this.CreateFPTextureFromData( gl, this.pathOffsetTex, w, h, bpp, this.pathOffsetData, gl.NEAREST );
//    this.CreateFPTextureFromData( gl, this.pathAttrib1Tex, w, h, bpp, this.pathAttrib1TexData, gl.NEAREST );
}

, Update: function( frameTime, time_, camera_, scene_, effectController_, mouseX_, cameraFovPer_ )
{
    this.innerTime = Clamp( time_ - this.triggerTime, 0.0, time_ );

/*    //LOG( this.decl.index + " :: " + this.innerTime + "  --  " + (this.pathSimShader.uniforms.LoopEndTime.value + exitTime) );
    if( this.isActive && this.innerTime > this.pathSimShader.uniforms.LoopEndTime.value + kClickDelayTime )
    {
        kCanClick = true;
        this.Enable( this.decl );
        this.isActive = false;
        this.exitAnimationActive = false;
        this.RemoveFromScene( scene_ );
        Klang.triggerEvent('reset_animation');
        this.lastX = 0;
        this.klangVolume = 0;
    }
*/

    if( !this.isActive )
        return;

    this.exitAnimationActive = false;

    if( this.innerTime > 10.0 //effectController_.pathSlowness+this.decl.wave2StartTime+this.decl.wave2EmitTime
        && !this.exitAnimationActive )
    {
        // Klang stuff. Handles volume and panning values when interacting with logo.
        var speed=Math.min(Math.abs((mouseX_-this.lastX)/100), 1);
        this.klangVolume -= (this.klangVolume-speed)/this.klangEase;
        Klang.triggerEvent('tilt_logo', (mouseX_ / window.innerWidth *2)-1, this.klangVolume);
        this.lastX = mouseX_;

        var absCenterX = (mouseX_ - window.innerWidth*0.5);
        var centerX = Clamp( 4 * (absCenterX / (window.innerWidth*0.5)), -1, 1 );
        //var centerX = -(mouseX - window.innerWidth*0.5) / (window.innerWidth*0.5);
        // Translation
        //var newTarget = centerX * 0.05;
        //cubePoolMesh.position.x += (newTarget - cubePoolMesh.position.x) * kRotationSpeed;
        // Rotation
        var newTarget = ToRadians( centerX * kMaxAngle );

        var areaIncrByFov = 0.25 + 0.25*(1.0-cameraFovPer_);
        if( Math.abs(absCenterX) < window.innerWidth*areaIncrByFov ) //&& cameraFovPer_ > 0.75 )
        {    
            this.cubePoolMesh.rotation.y += (newTarget - this.cubePoolMesh.rotation.y) * kRotationSpeed;
        }
        else
        {    
            this.cubePoolMesh.rotation.y *= 0.985;
        }

        if( this.playRestSample )
        {
            this.playRestSample = false;
            switch( this.decl.index )
            {
                case 0:
			        Klang.triggerEvent( 'instagram_rest' );
                    break;
                case 1:
			        Klang.triggerEvent( 'twitter_rest' );
                    break;
                case 2:
			        Klang.triggerEvent( 'nyt_rest' );
                    break;
                case 3:
			        Klang.triggerEvent( 'amazon_rest' );
                    break;
                case 4:
			        Klang.triggerEvent( 'lastfm_rest' );
                    break;
                case 6:
			        Klang.triggerEvent( 'getty_rest' );
                    break;
            }
        }

    }

    // Reset rotation if exit animation is triggered
    if( this.exitAnimationActive )
    {
        this.cubePoolMesh.rotation.y *= 0.9;
    }


    // Hover logo a little bit.
    if( rcLocaleJSDirectory != 'facebook' ) 
    {
        this.cubePoolMesh.position.y = Math.sin( ToRadians(this.innerTime*50) ) * 3.0;
    }


    //
    // Simulation shader
    //
    var speedMul = Saturate( cameraFovPer_ * 0.6 + 0.4 );
    this.pathSimShader.uniforms.TimeStep.value = frameTime * 0.01 * speedMul;
    this.pathSimShader.uniforms.Time.value = this.innerTime;
    this.pathSimShader.uniforms.ParticleSpeed.value = this.decl.particleSpeed * speedMul;
    //this.pathSimShader.uniforms.PathSpeed.value = effectController_.pathSlowness;
    //this.pathSimShader.uniforms.Wave2EmitPosT.value = (effectController.wave2EmitPositionT / 100.0);
    // Simulation
    var tmp = this.pathSim.in;
    this.pathSim.in = this.pathSim.out;
    this.pathSim.out = tmp;
    this.pathSimShader.uniforms.Map.value = this.pathSim.in;
    this.pathSim.simulate( this.pathSim.out );

    //
    // Render shader
    //
    this.cubePoolPathUniforms.PathOffsetSampler.value = this.pathSim.out;
    this.cubePoolPathUniforms.Time.value = this.innerTime;

    switch( this.decl.index )
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            this.logoDepthScale = 1 / 20.0;
            break;
        case 6:
            this.logoDepthScale = 1 / 8.0;
            break;
    }

    this.cubePoolPathUniforms.LogoDepthScale.value = this.logoDepthScale;
}

};
