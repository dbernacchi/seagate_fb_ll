var preloader = $('#preloader');
var menu = $('#menu');
var menuB = $('#menu');
var menuItem = menu.find('ul').children('li');
var menuItemB = menuB.find('ul').children('li');
var statsText = $('#stats');
var statsTwitter = $('#statsTwitter');
var textFieldChildrenP = statsText.children("p");
var logo = $('#logo');
var fullscreenButton = $("#fullscreen")
var isFullscreen = false;
var containerHeight = 500;

var hasSelectedFacebook = false;
var facebookActivated = false;

// If facebook use full window dimension
if(rcLocaleJSDirectory == 'facebook')
{
  containerHeight = window.innerHeight;
}

var cameraControls = $('#leftControls span.circle');
var cameraControlsB = $('.bigMenuB #leftControls span.circle');
var textFieldTwitterHandle = $('#twitterHandle');
var textFieldTwitterText = $('#twitterText');
var zoomButton = $('.zoom-controls .zoom-icon');
var manifest = '';

var doMenuAnimation = true;
var doRenderBG = true;

var staticData = [];
mack.vars.staticData = [];

var lastX = 0;

if (!LOG) 
{
  function LOG()  
  {
    // Empty
  }
}

function CameraPosClearStates()
{
  for (var i = 0; i < cameraControls.length; i++)
  {
    cameraControls.eq(i).removeClass('cameraActive' + i);
    cameraControlsB.eq(i).removeClass('cameraActive' + i);
  }
}

function CameraPosSetItem(index)
{
  cameraControls.eq(index).addClass('cameraActive' + index);
  cameraControlsB.eq(index).addClass('cameraActive' + index);
}

function MenuClearStates()
{
  for (var i = 0; i < menuItem.length; i++)
  {
    menuItem.eq(i).removeClass('active');
    menuItemB.eq(i).removeClass('active');
  }
}

function MenuSetItem(index)
{
  menuItem.eq(index).addClass('active');
  menuItemB.eq(index).addClass('active');
}

var fovCameraOffsetY = 22;

var effectController =
{
  pathSlowness: 4.0
  , fieldOfView: 45 //72
  , nextFieldOfView: 45
  , fovMinValue: 2.0
  , fovMaxValue: 45.0

  , fovCameraOffsetX: -5
  , fovCameraOffsetY: fovCameraOffsetY
};


// Variables
var currentTime = 0.0;

var apiIdleTime = 0.0;

var cubeArrayDimX = 8;
var cubeArrayDimY = 512;
var numCubes = cubeArrayDimX * cubeArrayDimY;

var container;
var canvas;
var stats;

var glQueries = [];
var glQueryNames = [];
var glInfo = [];
var hasLinearFilteringAvailable = false;

var gl = null;
var renderer = null;
var scene = null;
var camera = null;

var bgScene;
var bgMesh, bgMaterial;
var bgCamera;
var backgroundFirstTimeFadeIn = true;

var fgScene;
var fgMesh, fgMaterial;
var fgCamera;

var apiList = [];
//var renderApi;

var cubePoolMesh;
var cubePoolGeometry;
var cubePoolPathMaterialsAttributes;
var cubePoolPathMaterial;
var cubePoolPathUniforms;

// Refs to geometry array buffers for cube pool
var positions;
var colors;
var texcoords;
var normals;
var particleOffsetDirections;
var particleColorAndIndices;
var particleScales;

var floorMaterial;
var floorMesh;
var floorGeometry;

// Raw Data
var floatPathData;
var pathOffsetBeginData;
var pathOffsetData;
var floatPathGettyData;
var pathGettyOffsetBeginData;
var pathGettyOffsetData;

// Textures
var pathDataTexInit = false;
var pathDataTex;
var pathOffsetBeginTex;
var pathOffsetTex;
var pathAttrib1TexData;
var pathAttrib1Tex;
var pathGettyDataTex;

//    // Pingpong fbo
//  var pathTextureRT1;
//  var pathTextureRT2;
//  var pathSimShader;
//  var pathSim;

//    var composer, effectFXAA;
//    var renderTarget;

var bgTex;
var floorTex;

var firstTimeFadein = true;


var CopyDecl = function()
{
  this.tagline = "";
  this.number = 0;
  this.numberPrecision = 1;
  this.values = [];
  this.animatedNumber = 0; // used if number is animated
  this.hasNumberAnimation = false;
  this.hasValueAnimation = false;
  this.currentTime = 0.0;
  this.totalTaglines = 0;
  this.longestValueSize = 0.0;
  this.currentApiId = 0;
};

CopyDecl.prototype =
{
  constructor: CopyDecl
  , Reset: function()
  {
    this.tagline = "";
    this.number = 0;
    this.numberPrecision = 1;
    this.values = [];
    this.animatedNumber = 0; // used if number is animated
    this.hasNumberAnimation = false;
    this.hasValueAnimation = false;
    this.currentTime = 0.0;
    this.longestValueSize = 0.0;
    this.currentApiId = 0;
  }
  , Restart: function()
  {
    this.animatedNumber = 0.0;
    this.currentTime = 0.0;
  }
};


var copyTextArray = [ new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl() ];


var logoInstagram = {
  index: 0
  , doRotation: 1.0
  , MeshMinScaleX: 1 //0.01
  , MeshMaxScaleX: 1 //1.5
  , MeshMinScaleY: 1 //0.01
  , MeshMaxScaleY: 1 //2.0
  , MeshMinScaleZ: 1.0
  , MeshMaxScaleZ: 2.0
  , MeshMinUniScale: 0.01 //1.0
  , MeshMaxUniScale: 1.5 //1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 0
//        , offsetGlobalScale: 2
  , particleSpeed: 0.5
  , particleGlobalSize: 0.75
  , wave1StartTime: 0.0
  , wave1EmitTime: 4.0 //3.2
  , wave2StartTime: 0.0 //2.4
  , wave2EmitTime: 3.5 //4.0

    , tileWidth: 128 //kTextureSectionSize.x
    , tileHeight: 128 //kTextureSectionSize.y
    , numTilesX: 8
    , numTilesY: 8
    , texWidth: 1024 //kTextureSize.x
    , texHeight: 1024 //kTextureSize.y
};

var logoTwitter = {
  index: 1
  , doRotation: 0.0
  , MeshMinScaleX: 0.1
  , MeshMaxScaleX: 0.8 //0.4
  , MeshMinScaleY: 1.0
  , MeshMaxScaleY: 1.0
  , MeshMinScaleZ: 1
  , MeshMaxScaleZ: 1
  , MeshMinUniScale: 1.0
  , MeshMaxUniScale: 1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 1 //2
//        , offsetGlobalScale: 1.2
  , particleSpeed: 0.5
  , particleGlobalSize: 1.0
  , wave1StartTime: 0.0
  , wave1EmitTime: 4.0 //1.5
  , wave2StartTime: 0.4 //3.0 //3.9
  , wave2EmitTime: 4.5

    , tileWidth: 1024 //kTextureSectionSize.x
    , tileHeight: 16 //kTextureSectionSize.y
    , numTilesX: 1
    , numTilesY: 64
    , texWidth: 1024 //kTextureSize.x
    , texHeight: 1024 //kTextureSize.y
};

var logoNYT = {
  index: 2
  , doRotation: 1.0
  , MeshMinScaleX: 0.1
  , MeshMaxScaleX: 4.0
  , MeshMinScaleY: 0.1
  , MeshMaxScaleY: 1.0
  , MeshMinScaleZ: 1//0.1
  , MeshMaxScaleZ: 1//0.4 //1.0
  , MeshMinUniScale: 1.0
  , MeshMaxUniScale: 1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 1
//        , offsetGlobalScale: 2 //1
  , particleSpeed: 0.5 //1.0
  , particleGlobalSize: 1.0
  , wave1StartTime: 0.0
  , wave1EmitTime: 5.0 //3.2 //5.2
  , wave2StartTime: 1.0 //2.5 //3.5
  , wave2EmitTime: 3.5 //5.0 //7.0

    , tileWidth: 128 //kTextureSectionSize.x
    , tileHeight: 64 //kTextureSectionSize.y
    , numTilesX: 8
    , numTilesY: 16
    , texWidth: 1024 //kTextureSize.x
    , texHeight: 1024 //kTextureSize.y
};

var logoAmazon = {
  index: 3
  , doRotation: 1.0
  , MeshMinScaleX: 0.1 //1.0
  , MeshMaxScaleX: 1.5 //3.0
  , MeshMinScaleY: 0.01 //1.0
  , MeshMaxScaleY: 3.0 //2.0
  , MeshMinScaleZ: 0.2
  , MeshMaxScaleZ: 1.0
  , MeshMinUniScale: 1.0
  , MeshMaxUniScale: 1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 0
//        , offsetGlobalScale: 1.5
  , particleSpeed: 0.5
  , particleGlobalSize: 0.751 //0.4
  , wave1StartTime: 0.0
  , wave1EmitTime: 3.5
  , wave2StartTime: 0.5 //2.4
  , wave2EmitTime: 3.5

    , tileWidth: 128 //kTextureSectionSize.x
    , tileHeight: 128 //kTextureSectionSize.y
    , numTilesX: 8
    , numTilesY: 8
    , texWidth: 1024 //kTextureSize.x
    , texHeight: 1024 //kTextureSize.y
};

var logoLastFM = {
  index: 4
  , doRotation: 1.0
  , MeshMinScaleX: 0.01
  , MeshMaxScaleX: 3.0
  , MeshMinScaleY: 1.0
  , MeshMaxScaleY: 1.0
  , MeshMinScaleZ: 0.1
  , MeshMaxScaleZ: 2.0
  , MeshMinUniScale: 1.0
  , MeshMaxUniScale: 1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 2
//        , offsetGlobalScale: 2
  , particleSpeed: 0.0
  , particleGlobalSize: 0.75
  , wave1StartTime: 0.0
  , wave1EmitTime: 5.0 //4.2
  , wave2StartTime: 0.0 //3.5 //4.5
  , wave2EmitTime: 4.5 //7.0

    , tileWidth: 128 //kTextureSectionSize.x
    , tileHeight: 128 //kTextureSectionSize.y
    , numTilesX: 8
    , numTilesY: 8
    , texWidth: 1024 //kTextureSize.x
    , texHeight: 1024 //kTextureSize.y
};

var logoGetty = {
  index: 0  // HACK: Use 0 as instagram. Since this uses a different class it's ok
  , doRotation: 0.0
  , MeshMinScaleX: 0.03
  , MeshMaxScaleX: 1.5 //2.0
  , MeshMinScaleY: 0.03
  , MeshMaxScaleY: 2.0
  , MeshMinScaleZ: 0.1
  , MeshMaxScaleZ: 0.2
  , MeshMinUniScale: 0.01 //1.0
  , MeshMaxUniScale: 1.5 //1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 0

  , particleSpeed: 0.7
  , particleGlobalSize: 0.81
  , wave1StartTime: 2
  , wave1EmitTime: 6
  , wave2StartTime: 1.5
  , wave2EmitTime: 3.5

  , pathSlowness: 6.5 //4.5
  , frontParticlesCount: 20
  , landscapeChance: 75

    , tileWidthPortrait: 144
    , tileHeightPortrait: 256
    , numTilesXPortrait: 16
    , numTilesYPortrait: 4
    , tileWidthLandscape: 256
    , tileHeightLandscape: 144
    , numTilesXLandscape: 9
    , numTilesYLandscape: 7
    , texWidth: 4096
    , texHeight: 2048
};


var logoFacebook = {
    index: 6
  , doRotation: 1.0
  , MeshMinScaleX: 1 //0.01
  , MeshMaxScaleX: 1 //1.5
  , MeshMinScaleY: 1 //0.01
  , MeshMaxScaleY: 1 //2.0
  , MeshMinScaleZ: 0.1 //1.0
  , MeshMaxScaleZ: 0.2 //2.0
  , MeshMinUniScale: 0.01 //1.0
  , MeshMaxUniScale: 1.5 //1.0
  , PathWidthMinOffset: 0.0
  , PathWidthMaxOffset: 0.0
  , texture: null
  , particleDivisor: 0
//        , offsetGlobalScale: 2
  , particleSpeed: 0.1
  , particleGlobalSize: 0.75
  , wave1StartTime: 0.0
  , wave1EmitTime: 4.0 //3.2
  , wave2StartTime: 0.0 //2.4
  , wave2EmitTime: 3.5 //4.0

  //, pathSlowness: 4.5
  //, frontParticlesCount: 20
  , landscapeChance: 75

    // Same as Getty
    , tileWidthPortrait: 144
    , tileHeightPortrait: 256
    , numTilesXPortrait: 16
    , numTilesYPortrait: 4
    , tileWidthLandscape: 256
    , tileHeightLandscape: 144
    , numTilesXLandscape: 9
    , numTilesYLandscape: 7
    , texWidth: 4096
    , texHeight: 2048
};


var APIInstagramIndex = 0;
var APITwitterIndex = 1;
var APINYTIndex = 2;
var APIAmazonIndex = 3;
var APILastfmIndex = 4;
var APIGettyIndex = 5;
var APIFacebookIndex = 6;

var logoIndexArr = [ -1, -1, -1, -1, -1, -1, -1 ];

function getLogoIndex(idx) 
{  
  if( logoIndexArr[idx] == prevLogoIndex )
  {  
    idx++;
    
    /*
    if( idx == APIFacebookIndex )
    {
      idx = 0;
    }
    */
   
   if(idx >= logoIndexArr.length){
     idx = 0;
   }
   
  } 
  
  return logoIndexArr[idx];
}

//var logoIndex = mack.randIntz(5, 0);
var logoIndex = 0;
mack.vars.logoIndex = logoIndex;

var prevLogoIndex = -1;
var Params = [ logoInstagram, logoTwitter, logoNYT, logoAmazon, logoLastFM, logoGetty, logoFacebook ];
//var currParamSelection = Params[ logoIndex ];

var currCameraFovPer = 0.0;
var kCameraDistance = 180; //200.0 * 1.15;
var kCameraTimeToAnimate = 2.0;
var previousCamPosition;
var currentCamPosition;
var targetCamPosition;
var currentCamLookAt;
var cameraTime = 0.0;

if (Environment.isIe() && Environment.isIe() <= 9) {

} else {
  var CameraPositionArray = [
    new THREE.Vector3(0, 10, kCameraDistance)
            , new THREE.Vector3(Math.sin(Math.PI * 0.25) * kCameraDistance, 10, Math.cos(Math.PI * 0.25) * kCameraDistance)
            , new THREE.Vector3(0, Math.sin(-Math.PI * 0.33) * kCameraDistance, Math.cos(-Math.PI * 0.33) * kCameraDistance)
  ];


}


//
// Precision timer
//
var timeNow;
var startTime;
if (this.performance && performance.now)
{
  timeNow = function()
  {
    return performance.now() * 0.001;
  };
}
else
{
  timeNow = function()
  {
    return Date.now() * 0.001;
  };
}

//
// Handle camera positioning
//
function SetCameraPosition(index)
{

  mack.vars.cam = index;

  if (mack.vars.isKosher) {
    previousCamPosition = currentCamPosition;
    cameraTime = 0.0;

    targetCamPosition.x = CameraPositionArray[ index ].x;
    targetCamPosition.y = CameraPositionArray[ index ].y;
    targetCamPosition.z = CameraPositionArray[ index ].z;

  } else {
    switch (index) {
      case 0:
        /* HappyTree.canvas.set_rotation(0,45)
         HappyTree.canvas.set_rotation(0,0)
         */   break;
      case 1:
        /*     HappyTree.canvas.set_rotation(0,0)
         HappyTree.canvas.set_rotation(0,45+-30)
         */    break;
      case 2:
        //   HappyTree.canvas.set_rotation(45+30,-45)
        break;
    }
  }

}

//
// Handle fullscreen mode
//
function IsFullScreen()
{
  isFullscreen = true;
  renderer.setSize(window.outerWidth, window.outerHeight);
  document.querySelector('body').classList.add('fullscreen');
  mack.vars.gapTime = 8000;
  TweenLite.set($('#text #bottomText'), {top: '390px'})
  $('.bigMenuB').css({display: 'block'})
  var newSize = (window.screen.availHeight * 225 / 500) * 0.95;
  newSize = newSize + 'px!important'
  $('#stats p').css('font-size', window.screen.availHeight * 13 / 500 + 'px');
  $('.fullscreen #bottomText #logo').css('background-size', newSize);
  /*$('.fullscreen #logo').css({ 'background-size':'358px'})  */
  /*poo(newSize)*/
}

function IsNotFullScreen()
{
  isFullscreen = false;
  renderer.setSize(window.innerWidth, containerHeight);
  document.querySelector('body').classList.remove('fullscreen');
  $('.bigMenuB').css({display: 'none'})
  
  
  var top = '380px';

  if (rcLocaleJSDirectory == 'facebook') 
  {

    hHeight = window.innerHeight;

    var canvas_height = $('#glContainer').height() * .75;

    //get canvas top
    var canvas_top = $('#glContainer').offset().top;

    //get tagline height
    var tagline_height = $('#text #bottomText').height() + 69;

    $('#text #bottomText').css('position', 'fixed');
    //if canvas top + canvas height > window height, 
    if(canvas_top + canvas_height >= hHeight - tagline_height){
      //put tag line on the bottom of the window

      top = hHeight - tagline_height;

    } else {
      //else
        //put it below canvas
      top = canvas_top + canvas_height;  

    }  

    top += 'px';
  }
  
  
  TweenLite.to($('#text #bottomText'), 0.2, {top: top})

  $('#stats p').css('font-size', '13px');
  $('#logo').css('background-size', '258px');
  $('.fullscreen #logo').css({'background-size': '358px'})
  mack.vars.gapTime = 6000;
}

if (Environment.isIe() && Environment.isIe() <= 9) {
} else {
  document.addEventListener("fullscreenchange", function()
  {
    (document.fullscreen) ? IsFullScreen() : IsNotFullScreen();
  }, false);

  document.addEventListener("mozfullscreenchange", function()
  {
    (document.mozFullScreen) ? IsFullScreen() : IsNotFullScreen();
  }, false);

  document.addEventListener("webkitfullscreenchange", function()
  {
    (document.webkitIsFullScreen) ? IsFullScreen() : IsNotFullScreen();
  }, false);
}

/***
 function AnimateCamera( time, camAnimation, loop )
 {
 var timeClamped = 0.0;
 
 
 // No loop mode
 if( time > camAnimation.length )
 timeClamped = camAnimation.length;
 else
 timeClamped = time;
 
 //        if( time > camAnimation.length )
 //            timeClamped = time % camAnimation.length;
 //        else
 //            timeClamped = time;
 
 var numOfKeys = camAnimation.timings.length;
 var key = 0;
 var key1 = 0;
 var key2= 0;
 while( key < numOfKeys && camAnimation.timings[ key ] < timeClamped )
 {
 key++;
 }
 if( key < 0 ) key = 0;
 if( key >= numOfKeys ) key = numOfKeys-1;
 key1 = key - 1;
 key2 = key;
 if( key1 < 0 )
 {
 key1 ++;
 key2 ++;
 }
 
 var beforeTiming = camAnimation.timings[ key1 ];
 var afterTiming = camAnimation.timings[ key2 ];
 var beforePos = camAnimation.positions[ key1 ];
 var afterPos = camAnimation.positions[ key2 ];
 var beforeTarget = camAnimation.targets[ key1 ];
 var afterTarget = camAnimation.targets[ key2 ];
 
 // find interpolation t value
 var timeLength = ( afterTiming - beforeTiming );
 var t = (timeClamped - beforeTiming) / timeLength;
 
 var tt = t;
 //        float tt = t*t;
 //         float ttt = tt*t;
 //         float dt = ttt*0 + tt*1 + t*1;
 //float dt = Quint.easeInOut( t, 0, 1, 1 );
 if( tt > 1.0 )
 tt = 1.0;
 
 currentCamPosition = LerpVector3( beforePos, afterPos, tt );
 currentCamTarget = LerpVector3( beforeTarget, afterTarget, tt );
 //        poo( timeClamped + " -- " + tt + ", " + beforeTiming + ", " + afterTiming + ", " + timeLength );
 //        poo( "currentCamPosition: " + currentCamPosition.x + ", " + currentCamPosition.y + ", " + currentCamPosition.z );
 //        poo( "currentCamTarget: " + currentCamTarget.x + ", " + currentCamTarget.y + ", " + currentCamTarget.z );
 }
 ***/

function SetFullscreen(container)
{
  if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen"))
  {
    RunPrefixMethod(document, "CancelFullScreen");
  
  }
  else
  {
   
    RunPrefixMethod(container, "RequestFullScreen");
    $('.bigMenuB').css({display: 'block'})
  }

}



function CreateRenderer()
{
  container = document.getElementById("glContainer");
  fullscreenButton.on("click", function()
  {
    SetFullscreen(container);
  });

  // Create WEBGL renderer
  //
  renderer = new THREE.WebGLRenderer({antialias: true, precision: "mediump", stencil: false, alpha: true});
  
  if(rcLocaleJSDirectory != 'facebook')
  {
    renderer.setClearColor(0xffffff, 1);
  } else 
  {
    renderer.setClearColor(0xffffff, 0);
  }
  renderer.setSize( 1, 1 ); //window.innerWidth, window.innerHeight );
  renderer.autoClear = true;
  renderer.sortObjects = true;
  renderer.autoClearStencil = false;

  canvas = renderer.domElement;
  container.appendChild(canvas);

  gl = renderer.getContext();

  //
  // Check for needed extensions
  //

  var ext1 = gl.getExtension("OES_texture_float");
  if( !ext1 )
  {
    alert("Requires OES_texture_float extension");
    return;
  }
  var ext2 = gl.getExtension("OES_texture_float_linear");
  if( ext2 )
  {
    hasLinearFilteringAvailable = true;
  }
  else
  {
    hasLinearFilteringAvailable = false;
  }

  var extensions = gl.getSupportedExtensions();
  for (var k = 0; k < extensions.length; k++)
    poo(extensions[k]);

  glQueries.push(gl.VERSION);
  glQueries.push(gl.RENDERER);
  glQueries.push(gl.VENDOR);
  glQueries.push(gl.SHADING_LANGUAGE_VERSION);
  glQueries.push(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  glQueries.push(gl.MAX_TEXTURE_IMAGE_UNITS);
  glQueries.push(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  glQueries.push(gl.MAX_TEXTURE_SIZE);
  glQueryNames.push("VERSION");
  glQueryNames.push("RENDERER");
  glQueryNames.push("VENDOR");
  glQueryNames.push("SHADING_LANGUAGE_VERSION");
  glQueryNames.push("MAX_VERTEX_TEXTURE_IMAGE_UNITS");
  glQueryNames.push("MAX_TEXTURE_IMAGE_UNITS");
  glQueryNames.push("MAX_COMBINED_TEXTURE_IMAGE_UNITS");
  glQueryNames.push("MAX_TEXTURE_SIZE");

  for (var k = 0; k < glQueries.length; k++)
  {
    glInfo.push(gl.getParameter(glQueries[k]));
  }
}

var dataCount = 0;

function LoadShaderData(staticData, name, url)
{
  var defer = $.Deferred();

  $.get(url, function(data)
  {
    staticData[ name ] = data;

    defer.resolve();
  });
  return defer;
}

function LoadJsonData(staticData, name, url)
{
  //mack.vars.staticData = [];
  var defer = $.Deferred();
  
  check = url.substring(url.lastIndexOf('/')+1);
  
  if(name == 'PartAnim1' || manifest.indexOf(check) > -1){
  //if(true){
    
    $.getJSON(url + "?" + new Date().getTime(), function(json)
    {
     
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.vars.staticData[ "" + name + "" ] = json;
      } else {
        eval(' mack.vars.staticData.' + name + ' = json');
      }

      
      // mack.vars.staticData[ name ]=json;
      staticData[ name ] = json;
      
      mack.vars.staticData[name] = json;

      defer.resolve();
    });
  } else if(name == 'facebook1Json'){
    
    var status = "off";
    //console.log(manifest);
    
    if(manifest.indexOf('facebook') > -1 && (Environment.isChrome() || Environment.isFire()) && !device.mobile()){
      
      status = "on";
      $('.facebook').show();
      
    } else {
      $('.facebook').remove();
    }
    
    staticData[ "facebook1Json" ] = {};
    staticData[ "facebook1Json" ].tagline = "";
    staticData[ "facebook1Json" ].status = status;
    
    defer.resolve();
    
  } else {
    
    var json = JSON.parse('{"status":"off"}');
    
    if (Environment.isIe() && Environment.isIe() <= 9) {
      mack.vars.staticData[ "" + name + "" ] = json;
    } else {
      eval(' mack.vars.staticData.' + name + ' = json');
    }
    // mack.vars.staticData[ name ]=json;
    staticData[ name ] = json;
    mack.vars.staticData[name] = json;
    
    defer.resolve();
   
   
  }

  return defer;
}

function LoadRawData(staticData, name, url)
{
  if (Environment.isIe() && Environment.isIe() <= 9) {
  } else {
    var defer = $.Deferred();
    LOG("+++ Loading: " + name);
    RequestBinaryData(url
            , function(arrayBuffer)
            {
              staticData[name] = new Float32Array(arrayBuffer);
              LOG("+++ Loaded: " + name);
              defer.resolve();
            });
    return defer;
  }
}

function LoadTexture(staticData, name, url)
{


  if(typeof staticData["instagram1Json"] !== 'undefined'){
    staticData["instagram1Json"].status === "on"
  }

  if (Environment.isIe() && Environment.isIe() <= 9) {
  } else {
    
    THREE.ImageUtils.crossOrigin = "";
    var defer = $.Deferred();
    
    var loader = new THREE.TextureLoader();

    if (url) 
    {
      if(url != 'facebook_img')
      {
        loader.load(url, function(tex)
        {
          staticData[name] = tex;
          defer.resolve();
        });
      } else {
        
        //var tex = new THREE.Texture(document.getElementById(url));
        var tex = new THREE.Texture( document.getElementById('facebook_img') );
        
        tex.needsUpdate = true;
        staticData[name] = tex;
        defer.resolve();
        
      }
      
    } else {
      defer.resolve();
    }
    return defer;
  }

}

/*var json05Files = [ 0, 0, 0 ];*/
var json06Files = [0];
var json05Files = [0, 0];
var json00Files = [0, 0, 0];
var json01Files = [0, 0, 0];
var json02Files = [0, 0, 0, 0, 0];
var json03Files = [0, 0, 0, 0];
var json04Files = [0, 0, 0, 0, 0];

function randIntz(max, min) {

  var sme = Math.floor(Math.random() * max) + min;
  return sme;
}

function FindValidAPIID(api_)
{
  
  if (Environment.isIe() && Environment.isIe() <= 9) {

    var id = mack.randIntz(api_.length - 1, 0);

  } else {
    var id = THREE.Math.randInt(0, api_.length - 1);

  }

  if(api_[id] == 0){
    //console.log(id + ' is blank so...');
    for(i = 0; i < api_.length; i++){
      //console.log('index: ' + i + ' of api_ is: ' + api_[i]);
      if(api_[i] == 1){
        //console.log('found it at index: ' + i + ' where api_ is ' + api_[i]);
        id = i;
        //console.log('so im setting id to ' + id);
        break;
      }
        
    }
  }

  return id + 1;
  
}

function LoadData(api)
{
  if(rcLocaleJSDirectory == 'facebook')
  {
      logoIndexArr = [ APIFacebookIndex ];
      
      $.when(
              LoadJsonData(staticData, "PartAnim1", rootPath + "images/partSample01.json")
              ).done(function()
      {

        staticData[ "facebook1Json" ] = {};
        staticData[ "facebook1Json" ].tagline = "";
        staticData[ "facebook1Json" ].status = "on";

        
        if (mack.vars.isKosher) 
        {
          ParseJSONAnimation(staticData["PartAnim1"], gettyPartTrack);
        }
        
        mack.vars.logoIndex = APIFacebookIndex;
        
        LoadWebGLDataFacebook();
      });
  } 
  else 
  {
    var loadAll = true;
    if (loadAll == true) 
    {
      // Load all data
      //

     
      
      $.getJSON(rootPath + "images/" + rcLocaleJSDirectory + "/manifest.json" + "?" + new Date().getTime(), function(json)
      {
        manifest = json;

        $.when(
                LoadJsonData(staticData, "PartAnim1", rootPath + "images/partSample01.json")
                //
                , LoadJsonData(staticData, "getty1Json", rootPath + "images/" + rcLocaleJSDirectory + "/getty-1.json")
                , LoadJsonData(staticData, "getty2Json", rootPath + "images/" + rcLocaleJSDirectory + "/getty-2.json")
                /*, LoadJsonData( staticData, "getty3Json", rootPath+"images/"+rcLocaleJSDirectory+"/getty-3.json" )*/
                //
                //
                , LoadJsonData(staticData, "instagram1Json", rootPath + "images/" + rcLocaleJSDirectory + "/instagram-1.json")
                , LoadJsonData(staticData, "instagram2Json", rootPath + "images/" + rcLocaleJSDirectory + "/instagram-2.json")
                , LoadJsonData(staticData, "instagram3Json", rootPath + "images/" + rcLocaleJSDirectory + "/instagram-3.json")
                //
                , LoadJsonData(staticData, "twitter1Json", rootPath + "images/" + rcLocaleJSDirectory + "/twitter-1.json")
                , LoadJsonData(staticData, "twitter2Json", rootPath + "images/" + rcLocaleJSDirectory + "/twitter-2.json")
                , LoadJsonData(staticData, "twitter3Json", rootPath + "images/" + rcLocaleJSDirectory + "/twitter-3.json")
                //
                , LoadJsonData(staticData, "nytimes1Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-1.json")
                , LoadJsonData(staticData, "nytimes2Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-2.json")
                , LoadJsonData(staticData, "nytimes3Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-3.json")
                , LoadJsonData(staticData, "nytimes4Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-4.json")
                , LoadJsonData(staticData, "nytimes5Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-5.json")
                //
                , LoadJsonData(staticData, "amazon1Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-1.json")
                , LoadJsonData(staticData, "amazon2Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-2.json")
                , LoadJsonData(staticData, "amazon3Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-3.json")
                , LoadJsonData(staticData, "amazon4Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-4.json")
                //
                , LoadJsonData(staticData, "lastfm1Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-1.json")
                , LoadJsonData(staticData, "lastfm2Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-2.json")
                , LoadJsonData(staticData, "lastfm3Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-3.json")
                , LoadJsonData(staticData, "lastfm4Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-4.json")
                , LoadJsonData(staticData, "lastfm5Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-5.json")
                
                , LoadJsonData(staticData, "facebook1Json", '')

                ).done(function() {


          if (mack.vars.isKosher) {
            ParseJSONAnimation(staticData["PartAnim1"], gettyPartTrack);

          }

    
          if (staticData["getty1Json"].status === "on")
            json05Files[0] = 1;
          if (staticData["getty2Json"].status === "on")
            json05Files[1] = 1;
          /* if( staticData["getty3Json"].status === "on" )
           json05Files[2] = 1;*/

          if (staticData["instagram1Json"].status === "on")
            json00Files[0] = 1;
          if (staticData["instagram2Json"].status === "on")
            json00Files[1] = 1;
          if (staticData["instagram3Json"].status === "on")
            json00Files[2] = 1;

          if (staticData["twitter1Json"].status === "on")
            json01Files[0] = 1;
          if (staticData["twitter2Json"].status === "on")
            json01Files[1] = 1;
          if (staticData["twitter3Json"].status === "on")
            json01Files[2] = 1;

          if (staticData["nytimes1Json"].status === "on")
            json02Files[0] = 1;
          if (staticData["nytimes2Json"].status === "on")
            json02Files[1] = 1;
          if (staticData["nytimes3Json"].status === "on")
            json02Files[2] = 1;
          if (staticData["nytimes4Json"].status === "on")
            json02Files[3] = 1;
          if (staticData["nytimes5Json"].status === "on")
            json02Files[4] = 1;

          if (staticData["amazon1Json"].status === "on")
            json03Files[0] = 1;
          if (staticData["amazon2Json"].status === "on")
            json03Files[1] = 1;
          if (staticData["amazon3Json"].status === "on")
            json03Files[2] = 1;
          if (staticData["amazon4Json"].status === "on")
            json03Files[3] = 1;

          if (staticData["lastfm1Json"].status === "on")
            json04Files[0] = 1;
          if (staticData["lastfm2Json"].status === "on")
            json04Files[1] = 1;
          if (staticData["lastfm3Json"].status === "on")
            json04Files[2] = 1;
          if (staticData["lastfm4Json"].status === "on")
            json04Files[3] = 1;
          if (staticData["lastfm5Json"].status === "on")
            json04Files[4] = 1;

          if (staticData["facebook1Json"].status === "on")
            json06Files[0] = 1;
          
          function showMenuItems(arr, cls, idx) {
            
            var show = false;
            for (var ii = 0; ii < arr.length; ii++)
            {
              if (arr[ii]) {
                show = true;
              }
            }

            if (show) {

              $('.' + cls + '.menuItemSwipe').parent().show();

              for (var iii = logoIndexArr.length - 1; iii >= 0; iii--)
              {
                if (logoIndexArr[iii] === -1) {
                  logoIndexArr[iii] = idx;
                  break;
                }
              }
            } else {

              $('.' + cls + '.menuItemSwipe').parent().remove();
              //chop 24px off the top of #leftControls
              var top = parseInt($("#leftControls").css('top'));
              top -= 24;
              $("#leftControls").css('top', top);

            }

            return show;

          }

          var lastF = showMenuItems(json04Files, 'lastF', 4);
          var amz = showMenuItems(json03Files, 'amz', 3);
          var nyt = showMenuItems(json02Files, 'nyt', 2);
          var twt = showMenuItems(json01Files, 'twt', 1);
          var insta = showMenuItems(json00Files, 'insta', 0);
          var getty = showMenuItems(json05Files, 'getty', 5);
          var fb = showMenuItems(json06Files, 'fb', 6);
          
          var top = parseInt($("#leftControls").css('top'));

          top += 16;

          $("body").append('<style>.fullscreen #leftControls{top: ' + top + 'px;}</style>');


          var lastGoodIndex = logoIndexArr.length - 1;

          for (var iii = logoIndexArr.length - 1; iii >= 0; iii--)
          {
            if (logoIndexArr[iii] === -1) {
              logoIndexArr[iii] = logoIndexArr[lastGoodIndex];
              lastGoodIndex--;
            }
          }

          var api5ID = FindValidAPIID(json05Files);
          var gettyJpegFilename = rootPath + "images/" + rcLocaleJSDirectory + "/getty-" + api5ID + ".jpg";

          var api0ID = FindValidAPIID(json00Files);
          var instagramJpegFilename = rootPath + "images/" + rcLocaleJSDirectory + "/instagram-" + api0ID + ".jpg";

          var api1ID = FindValidAPIID(json01Files);
          var twitterPngFilename = rootPath + "images/" + rcLocaleJSDirectory + "/twitter-" + api1ID + ".png";

          var api2ID = FindValidAPIID(json02Files);
          var nytimesJpegFilename = rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-" + api2ID + ".png";

          var api3ID = FindValidAPIID(json03Files);
          var amazonJpegFilename = rootPath + "images/" + rcLocaleJSDirectory + "/amazon-" + api3ID + ".jpg";

          var api4ID = FindValidAPIID(json04Files);
          var lastfmJpegFilename = rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-" + api4ID + ".jpg";

          var api6ID = FindValidAPIID(json06Files);
          var facebookJpegFilename = "";
          
          if (!getty) {
            gettyJpegFilename = false;
          }
          if (!insta) {
            instagramJpegFilename = false;
          }
          if (!twt) {
            twitterPngFilename = false;
          }
          if (!nyt) {
            nytimesJpegFilename = false;
          }
          if (!amz) {
            amazonJpegFilename = false;
          }
          if (!lastF) {
            lastfmJpegFilename = false;
          }
          if (!fb) {
            facebookJpegFilename = false;
          }

          LoadWebGLData(
                  api5ID
                  , api0ID
                  , api1ID
                  , api2ID
                  , api3ID
                  , api4ID
                  , gettyJpegFilename
                  , instagramJpegFilename
                  , twitterPngFilename
                  , nytimesJpegFilename
                  , amazonJpegFilename
                  , lastfmJpegFilename

                          );

        });//when

      });//getJSON

    } else {


      $.when(
              LoadJsonData(staticData, "PartAnim1", rootPath + "images/partSample01.json")
              //
              , LoadJsonData(staticData, "getty1Json", rootPath + "images/" + rcLocaleJSDirectory + "/getty-1.json")
              , LoadJsonData(staticData, "getty2Json", rootPath + "images/" + rcLocaleJSDirectory + "/getty-2.json")
              /*, LoadJsonData( staticData, "getty3Json", rootPath+"images/"+rcLocaleJSDirectory+"/getty-3.json" )*/
              ).done(function()
      {



        if (mack.vars.isKosher) {
          ParseJSONAnimation(staticData["PartAnim1"], gettyPartTrack);

        }



        if (staticData["getty1Json"].status === "on")
          json05Files[0] = 1;
        if (staticData["getty2Json"].status === "on")
          json05Files[1] = 1;
        /* if( staticData["getty3Json"].status === "on" )
         json05Files[2] = 1;*/



        var api5ID = FindValidAPIID(json05Files);
        var gettyJpegFilename = rootPath + "images/" + rcLocaleJSDirectory + "/getty-" + api5ID + ".jpg";
        LOG("+++ Getty selected index: " + api5ID);

        LoadWebGLDataGetty(api5ID, gettyJpegFilename)

      });



    }
    
  }

}

function LoadWebGLDataFacebook() {

  $.when(
          LoadRawData(staticData, "pathData", rootPath + "images/logo.path")
          , LoadRawData(staticData, "pathDataGetty", rootPath + "images/logoGetty.path")
          , LoadTexture(staticData, "ll-bg", rootPath + "images/ll-bg.png")
          , LoadTexture(staticData, "ll-shadow-nopersp", rootPath + "images/ll-shadow-nopersp.png")
          , LoadShaderData(staticData, "PathDeformVertexShader", rootPath + "shaders/PathDeform.vertex")
          , LoadShaderData(staticData, "PathDeformFragmentShader", rootPath + "shaders/PathDeform.fragment")
          , LoadShaderData(staticData, "PathSimVertexShader", rootPath + "shaders/PathSim.vertex")
          , LoadShaderData(staticData, "PathSimFragmentShader", rootPath + "shaders/PathSim.fragment")
          //
          , LoadShaderData(staticData, "GettyVertexShader", rootPath + "shaders/GettyAPI.vertex")
          , LoadShaderData(staticData, "GettyFragmentShader", rootPath + "shaders/GettyAPI.fragment")
          , LoadShaderData(staticData, "PathDeformVertexShader_Getty", rootPath + "shaders/PathDeform_Getty.vertex")
          , LoadShaderData(staticData, "PathDeformFragmentShader_Getty", rootPath + "shaders/PathDeform_Getty.fragment")
          , LoadShaderData(staticData, "PathSimVertexShader_Getty", rootPath + "shaders/PathSim_Getty.vertex")
          , LoadShaderData(staticData, "PathSimFragmentShader_Getty", rootPath + "shaders/PathSim_Getty.fragment")

          //
          ).done(function()
  {

    preloader.delay(100).fadeTo(2500, 0).delay(250, function()
    {

      mack.init();

    });

    if (!mack.vars.logoIndex) {

      $('.zoom-controls').css({display: 'block'})

    } else {

      $('.zoom-controls').css({display: 'block'})
    }
    
    PrepareDataFacebook();
    
  })

}



function LoadWebGLDataGetty(id6, api6name) {

  $.when(
          LoadRawData(staticData, "pathData", rootPath + "images/logo.path")
          , LoadRawData(staticData, "pathDataGetty", rootPath + "images/logoGetty.path")
          , LoadTexture(staticData, "ll-bg", rootPath + "images/ll-bg.png")
          , LoadTexture(staticData, "ll-shadow-nopersp", rootPath + "images/ll-shadow-nopersp.png")
          , LoadShaderData(staticData, "PathDeformVertexShader", rootPath + "shaders/PathDeform.vertex")
          , LoadShaderData(staticData, "PathDeformFragmentShader", rootPath + "shaders/PathDeform.fragment")
          , LoadShaderData(staticData, "PathSimVertexShader", rootPath + "shaders/PathSim.vertex")
          , LoadShaderData(staticData, "PathSimFragmentShader", rootPath + "shaders/PathSim.fragment")
          //
          , LoadShaderData(staticData, "GettyVertexShader", rootPath + "shaders/GettyAPI.vertex")
          , LoadShaderData(staticData, "GettyFragmentShader", rootPath + "shaders/GettyAPI.fragment")
          , LoadShaderData(staticData, "PathDeformVertexShader_Getty", rootPath + "shaders/PathDeform_Getty.vertex")
          , LoadShaderData(staticData, "PathDeformFragmentShader_Getty", rootPath + "shaders/PathDeform_Getty.fragment")
          , LoadShaderData(staticData, "PathSimVertexShader_Getty", rootPath + "shaders/PathSim_Getty.vertex")
          , LoadShaderData(staticData, "PathSimFragmentShader_Getty", rootPath + "shaders/PathSim_Getty.fragment")
          , LoadTexture(staticData, "getty", api6name)
          //
          ).done(function()
  {

    preloader.delay(100).fadeTo(2500, 0).delay(250, function()
    {

      mack.init();

    });

    if (!mack.vars.logoIndex) {
      $('.zoom-controls').css({display: 'block'})

    } else {
      $('.zoom-controls').css({display: 'block'})
    }
    
    PrepareDataGetty(id6);
    
  })

}

function LoadWebGLData(id6, id1, id2, id3, id4, id5, api6name, api1name, api2name, api3name, api4name, api5name)
{

  $.when(
          LoadRawData(staticData, "pathData", rootPath + "images/logo.path")
          , LoadRawData(staticData, "pathDataGetty", rootPath + "images/logoGetty.path")
          , LoadTexture(staticData, "ll-bg", rootPath + "images/ll-bg.png")
          , LoadTexture(staticData, "ll-shadow-nopersp", rootPath + "images/ll-shadow-nopersp.png")
          , LoadShaderData(staticData, "PathDeformVertexShader", rootPath + "shaders/PathDeform.vertex")
          , LoadShaderData(staticData, "PathDeformFragmentShader", rootPath + "shaders/PathDeform.fragment")
          , LoadShaderData(staticData, "PathSimVertexShader", rootPath + "shaders/PathSim.vertex")
          , LoadShaderData(staticData, "PathSimFragmentShader", rootPath + "shaders/PathSim.fragment")
          //
          , LoadShaderData(staticData, "GettyVertexShader", rootPath + "shaders/GettyAPI.vertex")
          , LoadShaderData(staticData, "GettyFragmentShader", rootPath + "shaders/GettyAPI.fragment")
          , LoadShaderData(staticData, "PathDeformVertexShader_Getty", rootPath + "shaders/PathDeform_Getty.vertex")
          , LoadShaderData(staticData, "PathDeformFragmentShader_Getty", rootPath + "shaders/PathDeform_Getty.fragment")
          , LoadShaderData(staticData, "PathSimVertexShader_Getty", rootPath + "shaders/PathSim_Getty.vertex")
          , LoadShaderData(staticData, "PathSimFragmentShader_Getty", rootPath + "shaders/PathSim_Getty.fragment")
          //

          /*, LoadTexture( staticData, "getty"+api5ID, gettyJpegFilename )
           , LoadTexture( staticData, "instagram"+api0ID, instagramJpegFilename )
           , LoadTexture( staticData, "twitter"+api1ID, twitterPngFilename )
           , LoadTexture( staticData, "nytimes"+api2ID, nytimesJpegFilename )
           , LoadTexture( staticData, "amazon"+api3ID, amazonJpegFilename )
           , LoadTexture( staticData, "lastfm"+api4ID, lastfmJpegFilename )*/
          , LoadTexture(staticData, "getty", api6name)
          /* , LoadTexture( staticData, "instagram", api1name )
           , LoadTexture( staticData, "twitter", api2name )
           , LoadTexture( staticData, "nytimes"+id2, api3name )
           , LoadTexture( staticData, "amazon"+id3, api4name )
           , LoadTexture( staticData, "lastfm"+id4, api5name )*/
          , LoadTexture(staticData, "instagram" + id1 + "Json", api1name)
          , LoadTexture(staticData, "twitter" + id2 + "Json", api2name)
          , LoadTexture(staticData, "nytimes" + id3 + "Json", api3name)
          , LoadTexture(staticData, "amazon" + id4 + "Json", api4name)
          , LoadTexture(staticData, "lastfm" + id5 + "Json", api5name)
          ).done(function()
  {

    /*alert('done webgl')*/

    preloader.delay(100).fadeTo(2500, 0).delay(250, function()
    {

      mack.init();

    });

    if (!mack.vars.logoIndex) {

      $('.zoom-controls').css({display: 'block'})

    } else {

      $('.zoom-controls').css({display: 'block'})
    }

    //PrepareData( api5ID, api0ID, api1ID, api2ID, api3ID, api4ID );
    PrepareData(id6, id1, id2, id3, id4, id5);
  });

}

function PrepareDataFacebook() 
{  
  
  floatPathData = staticData[ "pathData" ];
  floatPathGettyData = staticData[ "pathDataGetty" ];
  bgTex = staticData[ "ll-bg" ];
  floorTex = staticData[ "ll-shadow-nopersp" ];
  
  Params[APIFacebookIndex].texture = staticData[ "facebook" ];
  
  for (var i = 0; i < 6; i++)
    SetTextureFiltering(Params[i]);

  preloader.delay(100).fadeTo(2500, 0).delay(250, function()
  {
    preloader.children("p").text("");
    if (Environment.isIe()) {
    } else {
      DoIt();
    }
  
  });
  
  


}

function PrepareDataGetty(api5ID) {
  
  floatPathData = staticData[ "pathData" ];
  floatPathGettyData = staticData[ "pathDataGetty" ];
  bgTex = staticData[ "ll-bg" ];
  floorTex = staticData[ "ll-shadow-nopersp" ];
  /*poo(api0ID+'is id val')*/
  Params[APIGettyIndex].texture = staticData[ "getty" ];
  
  for (var i = 0; i < 6; i++)
    SetTextureFiltering(Params[i]);

  PrepareGettyTagline(api5ID);
  
  preloader.delay(100).fadeTo(2500, 0).delay(250, function()
  {
    preloader.children("p").text("");
    if (Environment.isIe()) {

    } else {

      DoIt();
    }


  });


}
function PrepareData(api5ID, api0ID, api1ID, api2ID, api3ID, api4ID)
{
  LOG("+++ Get texture's handles");
  floatPathData = staticData[ "pathData" ];
  floatPathGettyData = staticData[ "pathDataGetty" ];
  bgTex = staticData[ "ll-bg" ];
  floorTex = staticData[ "ll-shadow-nopersp" ];
  /*poo(api0ID+'is id val')*/
  Params[APIGettyIndex].texture = staticData[ "getty" ];
  Params[0].texture = staticData[ "instagram" + api0ID + 'Json' ];
  Params[1].texture = staticData[ "twitter" + api1ID + 'Json' ];
  Params[2].texture = staticData[ "nytimes" + api2ID + 'Json' ];
  Params[3].texture = staticData[ "amazon" + api3ID + 'Json' ];
  Params[4].texture = staticData[ "lastfm" + api4ID + 'Json' ];
  for (var i = 0; i < 6; i++)
    SetTextureFiltering(Params[i]);

  PrepareGettyTagline(api5ID);

  PrepareInstagramTagline(api0ID);
  PrepareTwitterTagline(api1ID);
  PrepareNYTimesTagline(api2ID);
  PrepareAmazonTagline(api3ID);
  PrepareLastFMTagline(api4ID);

  // mack.vars.goGl.resolve()
  // fadeout preloader message and move on
  preloader.delay(100).fadeTo(2500, 0).delay(250, function()
  {
    preloader.children("p").text("");
    if (Environment.isIe()) {

    } else {

      DoIt();
    }


  });
}

function SetTextureFiltering(tex_)
{
  if (Environment.isIe() && Environment.isIe() <= 9) {
  } else {
    tex_.generateMipmaps = true;
    tex_.wrapS = THREE.ClampToEdgeWrapping;
    tex_.wrapT = THREE.ClampToEdgeWrapping;
    tex_.minFilter = THREE.LinearMipMapLinearFilter;
    tex_.magFilter = THREE.LinearFilter;
  }
}

function PrepareFacebookTagline()
{
  /*
  apiID = 6;
  var copyText = "";
  var copyTextName;
  
  mack.vars.currentApiId = 0;

  //   apiID = 3;
  // GETTY taglines
  copyText = copyTextArray[0];
  mack.vars.values = copyText.values;
  mack.vars.setCurTag = apiID;

  copyText.Reset();

  //        copyText = new CopyDecl();
  copyTextName = "facebook" + apiID + "Json";
  copyText.totalTaglines = 2;
  copyText.currentApiId = apiID;
  switch (apiID)
  {
    case 1:
    case 2:
      copyText.hasNumberAnimation = true;
      break;
  }
  
  if(typeof staticData[ copyTextName ] !== 'undefined')
  {
    if (staticData[ copyTextName ].number)
    {
      copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
      copyText.number = parseInt(staticData[ copyTextName ].number);
    }
    if (staticData[ copyTextName ].values)
    {
      for (var ti = 0; ti < staticData[ copyTextName ].values.length; ti++)
      {
        copyText.values.push(staticData[ copyTextName ].values[ti]);
      }
    }
    copyText.tagline = staticData[ copyTextName ].tagline;

    mack.vars.tagline = copyText;
    
    //mack.vars.tagline.tagline = "Right now, you're sharing 208 memories with 300 friends around the world.";
    mack.vars.tagline.tagline = $('#facebook_tagline').html();
  } else {
    console.log(copyTextName + ' undefined in staticdata');
    console.log(staticData);
  }
  */
  mack.vars.tagline = {};
  mack.vars.tagline.tagline = $('#facebook_tagline').html();
  mack.apiText();
  //        copyTextArray.push( copyText );
}


function PrepareGettyTagline(apiID)
{
  
  var copyText;
  var copyTextName;
  /*poo(apiID + " current API")*/
  mack.vars.currentApiId = APIGettyIndex;
  
  //   apiID = 3;
  // GETTY taglines
  copyText = copyTextArray[APIGettyIndex];

  mack.vars.values = copyText.values;
  mack.vars.setCurTag = apiID;

  copyText.Reset();

  //        copyText = new CopyDecl();
  copyTextName = "getty" + apiID + "Json";
  copyText.totalTaglines = 2;
  copyText.currentApiId = apiID;
  switch (apiID)
  {
    case 1:
    case 2:
      copyText.hasNumberAnimation = true;
      break;
  }
  
  if(typeof staticData[ copyTextName ] !== 'undefined'){
    if (staticData[ copyTextName ].number)
    {
      copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
      copyText.number = parseInt(staticData[ copyTextName ].number);
    }
    if (staticData[ copyTextName ].values)
    {
      
      for (var ti = 0; ti < staticData[ copyTextName ].values.length; ti++)
      {
        copyText.values.push(staticData[ copyTextName ].values[ti]);
      }
    }
    if (staticData[ copyTextName ].value)
    {
 
      copyText.value = staticData[ copyTextName ].value;
      
    }    
    copyText.tagline = staticData[ copyTextName ].tagline;

    mack.vars.tagline = copyText;
  } 
  
  mack.apiText();
  //        copyTextArray.push( copyText );
}

function PrepareInstagramTagline(apiID)
{

  var copyText;
  var copyTextName;
  if (!apiID || apiID == 0) {
    apiID = 3;
  }

  /*poo(apiID + " current API")*/
  mack.vars.currentApiId = 0;
  // var apiID = 3;

  // poo('prepare ')
  // INSTAGRAM taglines
  copyText = copyTextArray[0];
  mack.vars.values = copyText.values;

  copyText.Reset();

//        copyText = new CopyDecl();
  copyTextName = "instagram" + apiID + "Json";
  copyText.totalTaglines = 3;
  copyText.currentApiId = apiID;

  /*if(Environment.isIe() && Environment.isIe() <=9){ } else{*/
  switch (apiID)
  {
    case 1:
    case 2:
    case 3:
      copyText.hasNumberAnimation = true;
      break;
  }

  if (mack.vars.staticData && mack.vars.staticData[ copyTextName ].number)
  {
    copyText.numberPrecision = mack.vars.staticData[ copyTextName ].number.toString().length;
    copyText.number = parseInt(mack.vars.staticData[ copyTextName ].number);
  }
  if (mack.vars.staticData && mack.vars.staticData[ copyTextName ].values)
  {
    for (var ti = 0; ti < mack.vars.staticData[ copyTextName ].values.length; ti++)
    {
      copyText.values.push(mack.vars.staticData[ copyTextName ].values[ti]);

    }
  }

  copyText.tagline = mack.vars.staticData[ copyTextName ].tagline;

  
  mack.vars.tagline = copyText;
  mack.vars.values = mack.vars.staticData['instagram' + apiID + 'Json'].values;


  //  if(kCanClick){
  mack.apiText(10);
  // }
//        copyTextArray.push( copyText );
//mack.vars.tagline.values
}

function PrepareTwitterTagline(apiID)
{
  var copyText;
  var copyTextName;

  /*poo(apiID + " current API")*/
  mack.vars.currentApiId = 1;
  // var apiID = 2;
  // TWITTER taglines
  copyText = copyTextArray[1];

  copyText.Reset();
  /*poo('prepare ')*/
//        copyText = new CopyDecl();
  copyTextName = "twitter" + apiID + "Json";
  copyText.totalTaglines = 3;
  copyText.currentApiId = apiID;

//PG 4/20/15
  copyText.hasNumberAnimation = true;
  copyText.hasValueAnimation = true;

  /*
   switch (apiID)
   {
   case 1:
   copyText.hasNumberAnimation = true;
   copyText.hasValueAnimation = true;
   break;
   case 2:
   
   copyText.hasNumberAnimation = true;
   break;
   }
   */
//PG 4/20/15

  if (staticData[ copyTextName ].number)
  {
    copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
    copyText.number = parseInt(staticData[ copyTextName ].number);
  }
  if (staticData[ copyTextName ].values)
  {
    for (var ti = 0; ti < staticData[ copyTextName ].values.length; ti++)
    {
      copyText.values.push(staticData[ copyTextName ].values[ti]);
      if (copyText.longestValueSize < staticData[ copyTextName ].values[ti].length)
        copyText.longestValueSize = staticData[ copyTextName ].values[ti].length;
    }
  }

  copyText.tagline = mack.vars.staticData[ copyTextName ].tagline;
//        copyTextArray.push( copyText );
  /*mack.vars.tagline = copyText.tagline;*/
  /*poo(copyText.tagline)*/
  LOG(copyText)
  var twitArray = copyTextArray[1];

  mack.vars.tagline = copyText;
  mack.vars.values = mack.vars.staticData['twitter' + apiID + 'Json'].values;

  //  if(kCanClick){
  mack.apiText();
  //}

}

function PrepareNYTimesTagline(apiID)
{
  var copyText;
  var copyTextName;

  /*poo(apiID + " current API")*/
  mack.vars.currentApiId = 2;
  // var apiID = 2;

  poo('prepare ')
  // NYTIMES taglines
  copyText = copyTextArray[2];
  mack.vars.values = copyText.values;

  copyText.Reset();

//        copyText = new CopyDecl();
  var copyTextName = "nytimes" + apiID + "Json";
  copyText.totalTaglines = 5;
  copyText.currentApiId = apiID;
  switch (apiID)
  {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      copyText.hasNumberAnimation = true;
      break;
  }
  if (staticData[ copyTextName ].number)
  {
    copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
    copyText.number = parseInt(staticData[ copyTextName ].number);
  }
  if (staticData[ copyTextName ].values)
  {
    for (var ti = 0; ti < staticData[ copyTextName ].values.length; ti++)
    {
      copyText.values.push(staticData[ copyTextName ].values[ti]);
    }
  }
  
  copyText.tagline = mack.vars.staticData[ copyTextName ].tagline;

  
//        copyTextArray.push( copyText );
  /*mack.vars.tagline = copyText.tagline;*/
  mack.vars.tagline = copyText;

  //  if(kCanClick){
  mack.apiText();
  //}
}


function PrepareAmazonTagline(apiID)
{
  var copyText;
  var copyTextName;

  /*poo(apiID + " current API")*/
  mack.vars.currentApiId = 3;
  poo('the api id iz ' + apiID)
  //  var apiID = 4;


  poo('prepare ')
  // AMAZON taglines
  copyText = copyTextArray[3];
  mack.vars.values = copyText.values;

  copyText.Reset();

//        copyText = new CopyDecl();
  var copyTextName = "amazon" + apiID + "Json";
  copyText.totalTaglines = 4;
  copyText.currentApiId = apiID;
  switch (apiID)
  {
    case 1:
    case 2:
    case 3:
    case 4:
      copyText.hasNumberAnimation = true;
      break;
  }
  if (staticData[ copyTextName ].number)
  {
    copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
    copyText.number = parseInt(staticData[ copyTextName ].number);
  }
  if (staticData[ copyTextName ].values)
  {
    for (var ti = 0; ti < staticData[ copyTextName ].values.length; ti++)
    {
      copyText.values.push(staticData[ copyTextName ].values[ti]);
    }
  }
  copyText.tagline = mack.vars.staticData[ copyTextName ].tagline;
  /*poo('the api id iz now '+ apiID)*/
  poo(copyText.tagline)
//        copyTextArray.push( copyText );
  /*mack.vars.tagline = copyText.tagline;*/
  

  
  mack.vars.tagline = copyText;


  // if(kCanClick){
  mack.apiText();
  //}
}


function PrepareLastFMTagline(apiID)
{

  var copyText;
  var copyTextName;

  /*poo(apiID + " current API")*/
  mack.vars.currentApiId = APILastfmIndex;
  // var apiID = 5;
  mack.vars.copyText = copyTextArray;

  // LASTFM taglines
  copyText = copyTextArray[4];
  mack.vars.values = copyText.values;

  copyText.Reset();

//        copyText = new CopyDecl();
  var copyTextName = "lastfm" + apiID + "Json";
  copyText.totalTaglines = 4;
  copyText.currentApiId = apiID;
  switch (apiID)
  {
    case 2:
    case 3:
    case 5:
      copyText.hasNumberAnimation = true;
      break;
  }
  if (staticData[ copyTextName ].number)
  {
    copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
    copyText.number = parseInt(staticData[ copyTextName ].number);
  }

  if (staticData[ copyTextName ].values)
  {
    for (var ti = 0; ti < staticData[ copyTextName ].values.length; ti++)
    {
      copyText.values.push(staticData[ copyTextName ].values[ti]);
    }
  }
  
  copyText.tagline = mack.vars.staticData[ copyTextName ].tagline;
  
  mack.vars.tagline = copyText;
  mack.vars.tagline.values = mack.vars.staticData['lastfm' + apiID + 'Json'].values;

  str = mack.vars.tagline.tagline;
  
  if (str && mack.vars.tagline.values.length == 2) {
    str = str.replace("{value_1}", mack.vars.tagline.values[0]);
    str = str.replace("{value_2}", mack.vars.tagline.values[1]);
    mack.vars.tagline.tagline = str;
    
  }
  mack.apiText();

}


function CreateGUI()
{
  gui = new dat.GUI({load: staticData["GUI"]});
  gui.width = 300;
  gui.remember(effectController);
//        gui.useLocalStorage = true;
  gui.add(effectController, "wave1StartTime", 0.0, 10.0, 1.0).listen();
  gui.add(effectController, "wave1EmitTime", 0.0, 10.0, 1.0).listen();
  gui.add(effectController, "wave1KillTime", 0.0, 10.0, 1.0).listen();
  gui.add(effectController, "wave2StartTime", 0.0, 10.0, 1.0).listen();
  gui.add(effectController, "wave2EmitTime", 0.0, 10.0, 1.0).listen();
  //gui.add( effectController, "wave2EmitPositionT", 0.0, 100.0, 1.0 ).listen().onChange( matChanger );
  //gui.add( effectController, "particleSpeed", 0.0, 10.0, 1.0 ).listen().onChange( matChanger );
  //gui.add( effectController, "particleGlobalSpeed", 0.0, 1.0, 1.0 ).listen().onChange( matChanger );
  //gui.add( effectController, "particleGlobalSize", 0.0, 1.0, 1.0 ).listen().onChange( matChanger );
  gui.add(effectController, "pathSlowness", 1.0, 50.0, 1.0).listen();
  //gui.add( effectController, "pathThickness", 5.0, 20.0, 1.0 ).listen().onChange( matChanger );
  //gui.add( effectController, "pathThicknessScale", 1.0, 20.0, 1.0 ).listen().onChange( matChanger );
  //gui.add( effectController, "particleDivisor", 0, 4, 1 ).step( 1 ).listen().onChange( matChanger );
  gui.add(effectController, "fieldOfView", 20, 120, 1.0).step(1).listen();
  //gui.add( effectController, "offsetGlobalScale", -100.0, 100.0, 1.0 ).listen().onChange( matChanger );
  //gui.add( effectController, "animScale", 0.0, 1.0, 1.0 ).listen().onChange( matChanger );
  gui.add(effectController, "time", 0.0, 9999999999.0, 1.0).step(0.01).listen();
  //gui.close();
}


function Init()
{
  //
  // Stats
  //
  if (kShowStats)
  {
    stats = new Stats();
    stats.setMode(1);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);
  }


//        //
//        // GUI
//        //
//        CreateGUI();


  // Twitter plane geometry
  BuildPlane(8.0, 0.5);


  //
  // Create textures needed for path
  //
  pathOffsetData = new Float32Array(cubeArrayDimX * cubeArrayDimY * 4);
  pathOffsetBeginData = new Float32Array(cubeArrayDimX * cubeArrayDimY * 4);
  pathAttrib1TexData = new Float32Array(cubeArrayDimX * cubeArrayDimY * 4);
  pathOffsetBeginTex = new THREE.Texture();
  pathOffsetTex = new THREE.Texture();
  pathDataTex = new THREE.Texture();
  pathAttrib1Tex = new THREE.Texture();

  pathGettyOffsetData = new Float32Array(cubeArrayDimX * cubeArrayDimY * 4);
  pathGettyOffsetBeginData = new Float32Array(cubeArrayDimX * cubeArrayDimY * 4);
  pathGettyDataTex = new THREE.Texture();

  if (hasLinearFilteringAvailable)
  {
    CreateFloatTextureFromData(renderer.getContext(), pathGettyDataTex, kPathDimX, kPathDimY, 3, floatPathGettyData, gl.LINEAR, pathDataTexInit, browserName);
    CreateFloatTextureFromData(renderer.getContext(), pathDataTex, kPathDimX, kPathDimY, 3, floatPathData, gl.LINEAR, pathDataTexInit, browserName);
    //CreateFPTextureFromData( renderer.getContext(), pathDataTex, kPathDimX, kPathDimY, 3, floatPathData, gl.LINEAR );
  }
  else
  {
    CreateFloatTextureFromData(renderer.getContext(), pathGettyDataTex, kPathDimX, kPathDimY, 3, floatPathGettyData, gl.NEAREST, pathDataTexInit, browserName);
    CreateFloatTextureFromData(renderer.getContext(), pathDataTex, kPathDimX, kPathDimY, 3, floatPathData, gl.NEAREST, pathDataTexInit, browserName);
    //CreateFPTextureFromData( renderer.getContext(), pathDataTex, kPathDimX, kPathDimY, 3, floatPathData, gl.NEAREST );
  }
//        GeneratePathOffsetTextures( cubeArrayDimX, cubeArrayDimY, 4, 1.0 );
  pathDataTexInit = true;


    //
    // Background image
    //

    bgMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: bgTex, transparent: true, vertexColors: THREE.VertexColors});
    bgMaterial.depthTest = false;
    bgMaterial.depthWrite = false;
    bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), bgMaterial);
    bgScene = new THREE.Scene();
    bgCamera = new THREE.Camera();
    bgScene.add(bgCamera);
    bgScene.add(bgMesh);


  if(rcLocaleJSDirectory != 'facebook')
  {
    //
    // Foreground
    //

    fgMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, vertexColors: THREE.VertexColors});
    fgMaterial.depthTest = false;
    fgMaterial.depthWrite = false;
    fgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), fgMaterial);
    fgScene = new THREE.Scene();
    fgCamera = new THREE.Camera();
    fgScene.add(fgCamera);
    fgScene.add(fgMesh);
  }


  //
  //
  //

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(effectController.fieldOfView, window.innerWidth / window.innerHeight, 1.0, 300.0);
//        camera = new THREE.PerspectiveCamera( effectController.fieldOfView / (window.innerWidth/window.innerHeight), window.innerWidth / window.innerHeight, 1.0, 1000.0 );

  previousCamPosition = new THREE.Vector3(0, 0, kCameraDistance);
  currentCamPosition = new THREE.Vector3(0, 0, kCameraDistance);
  targetCamPosition = new THREE.Vector3(0, 0, kCameraDistance);
  currentCamLookAt = new THREE.Vector3(0, 0, 0);
  camera.position.x = currentCamPosition.x;
  camera.position.y = currentCamPosition.y;
  camera.position.z = currentCamPosition.z;
//        camera.position.set( xOffset, 0, 200 );
  camera.lookAt(currentCamLookAt);
  //camera.setLens( 35.0 );


  // Fake floor shadow
  //
  floorGeometry = new THREE.BoxGeometry(150, 0.001, 30);
  floorMaterial = new THREE.MeshBasicMaterial({map: floorTex, transparent: true, opacity: 0.2});
  floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.position.y = -70.0;
  //floorMesh.receiveShadow = true;
  scene.add( floorMesh );



    // APIs
    //

    var apiInstagram = new LL.APIScene();
    apiInstagram.Init(Params[APIInstagramIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push( apiInstagram );
    //
    var apiTwitter = new LL.APIScene();
    apiTwitter.Init(Params[APITwitterIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push( apiTwitter );
    //
    var apiNYT = new LL.APIScene();
    apiNYT.Init(Params[APINYTIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push( apiNYT );
    //
    var apiAmazon = new LL.APIScene();
    apiAmazon.Init(Params[APIAmazonIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push( apiAmazon );
    //
    var apiLastfm = new LL.APIScene();
    apiLastfm.Init(Params[APILastfmIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push( apiLastfm );
    // Getty
    var api = new LL.APISceneGetty();
    api.Init(Params[APIGettyIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathGettyDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push(api);
    //
    var apiFacebook = new LL.APIScene();
    apiFacebook.Init(Params[APIFacebookIndex], cubeArrayDimX, cubeArrayDimY, renderer, scene, camera, pathDataTex, effectController, hasLinearFilteringAvailable);
    apiList.push( apiFacebook );


/*    if(rcLocaleJSDirectory == 'facebook')
    {
        Params[0].particleSpeed = 0.1;
    }*/


  window.addEventListener('resize', OnWindowResize, false);
  window.addEventListener('mousemove', OnMouseMove, false);
  window.addEventListener('mouseout', OnMouseOut, false);

  renderer.setSize(window.innerWidth, containerHeight);
  //renderer.setSize( window.innerWidth, window.innerHeight );

  // Enable menu api
  MenuClearStates();
  //MenuSetItem( logoIndex );
  if( logoIndex != APIFacebookIndex )
    MenuSetItem(logoIndex + 1); // Add one because we placed Getty on top
  else
    MenuSetItem(0);

  CameraPosClearStates();
  CameraPosSetItem(0);

  //always start with getty or facebook
  if(rcLocaleJSDirectory != 'facebook'){
    ActivateAPI( 5 );
  } else {
    ActivateAPI( 6 );
  }

  currentTime = 0.0;
  startTime = timeNow();
}


function ActivateAPI(index)
{
  mack.vars.ranApi = true;

  if (!mack.vars.logoIndex) {
  
    $('.zoom-controls').css({display: 'blockP'})
    $('.zoom-icon').css({display: 'block'})
  } else {
    
    $('.zoom-controls').css({display: 'none'})
  }


  var loadAll = true;
  if( loadAll == true )
  {
    //  if(rcLocaleJS == "functionOff"){
    MenuClearStates();
    
    switch (index)
    {
      case 0:
        InstagramCallFunc_WebGL();
        break;
      case 1:
        TwitterCallFunc_WebGL();
        break;
      case 2:
        NYTCallFunc_WebGL();
        break;
      case 3:
        AmazonCallFunc_WebGL();
        break;
      case 4:
        LastFMCallFunc_WebGL();
        break;
      case 5:
          //console.log( "ActivateAPI: run getty" );
        GettyCallFunc_WebGL();
        break;
      case 6:
          //console.log( "ActivateAPI: run facebook" );
        if(facebookActivated ){
        //{
          FacebookCallFunc_WebGL();
        } else {          
          GettyCallFunc_WebGL();
        }
        
        break;
      default:
          //console.log( "ActivateAPI: index is not valid" );
        //InstagramCallFunc_WebGL();
        break;
    }

  }

}

var mouseX = window.innerWidth * 0.5;
var mouseY = window.innerHeight * 0.5;

function OnMouseMove(event)
{
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function OnMouseOut()
{
  mouseX = window.innerWidth * 0.5;
  mouseY = window.innerHeight * 0.5;
}

function OnWindowResize()
{
  // If facebook use full window dimension
  if(rcLocaleJSDirectory == 'facebook')
  {
    containerHeight = window.innerHeight;
  }

  if (isFullscreen)
    renderer.setSize(window.innerWidth, window.innerHeight);
  else
    renderer.setSize(window.innerWidth, containerHeight);
}

function DoIt()
{
  
  // Menu animation
  (function()
  {
    var item = $('#menu ul li');
    var controls = $('#leftControls');
    var index = 0;
    var time = 400;
    var properties = {
      //              'opacity': 1,
      'border-left-width': '2px',
      'padding-left': '10px',
      'width': '140px',
      'opacity': 1
    };

    var controlsProperties = {
      'opacity': 1,
      'left': '20px'
    };

    item.on('mouseenter', function() {
      Klang.triggerEvent('menu_over');
    });
    item.on('click', function() {
      Klang.triggerEvent('menu_click');
    });


    /*(function sweepItem() {
     if(index === 0) {
     item.delay(8000).eq(index++).animate(properties, time, sweepItem);
     } else {
     item.eq(index++).animate(properties, time, sweepItem);
     controls.delay(2000).animate(controlsProperties , time, sweepItem);
     }
     })();*/
  })();

  browserName = navigator.sayswho; // string is lowercase
  LOG("+++ Browser's Name: " + browserName);

  // Animate menu. Delay for a while to make sure the logo animation is done
  // menu.delay( 8000 ).fadeIn( 3000 );

  //console.log("+++ Initializing...");
  Init();

  LOG("+++ Initialization complete.. Enter Mainloop.");
  // HACK! Run one first time to propagate everything within particle fbo
  Update(0.0, 0.016);
  Render();
  
  for (var ai = 0; ai < apiList.length; ai++)
  {
    apiList[ai].Enable( Params[ai] );
  }

  // Initialize Klang if it hasnt been already.
  if( ! Klang.klangInited )
  {
    Klang.init( rootPath + 'sounds/config.json', function()
    {
      // // Klang ready
      // switch (getLogoIndex(logoIndex))
      // {
      //   case 5:
      //     Klang.triggerEvent('getty_start');
      //     break;
      //   case 0:
      //     Klang.triggerEvent('instagram_start');
      //     break;
      //   case 1:
      //     Klang.triggerEvent('twitter_start');
      //     break;
      //   case 2:
      //     Klang.triggerEvent('times_start');
      //     break;
      //   case 3:
      //     Klang.triggerEvent('amazon_start');
      //     break;
      //   case 4:
      //     Klang.triggerEvent('last_start');
      //     break;
      //   default:
      // }

      // Now move on to mainloop
      MainLoop();

    }, function(percent)
    {
      //poo('Klang progress:', percent)

    } );
  }
  // If Klang has been initialised...
  else
  {
      // // Klang ready
      // switch (getLogoIndex(logoIndex))
      // {
      //   case 5:
      //     Klang.triggerEvent('getty_start');
      //     break;
      //   case 0:
      //     Klang.triggerEvent('instagram_start');
      //     break;
      //   case 1:
      //     Klang.triggerEvent('twitter_start');
      //     break;
      //   case 2:
      //     Klang.triggerEvent('times_start');
      //     break;
      //   case 3:
      //     Klang.triggerEvent('amazon_start');
      //     break;
      //   case 4:
      //     Klang.triggerEvent('last_start');
      //     break;
      //   default:
      // }

      // Now move on to mainloop
      MainLoop();    
  }
}


function Update(time, frameTime)
{
//        effectController.time = time;

  if(rcLocaleJSDirectory != 'facebook')
  {
    // fade in effect
    if (firstTimeFadein)
    {

      fgMaterial.opacity = 1.0 - THREE.Math.clamp(time * 0.5, 0.0, 1.0);
      firstTimeFadein = (fgMaterial.opacity > 0.0);
    }
  }

  // Fade in background slowly
  if (time <= 4.0 && backgroundFirstTimeFadeIn)
  {
    bgMaterial.opacity = THREE.Math.clamp(time * 0.25, 0.0, 1.0);
    backgroundFirstTimeFadeIn = (bgMaterial.opacity < 1.0);
  }
  


  if( prevLogoIndex >= 0 )
  {
    apiList[ prevLogoIndex ].Update(frameTime, time, camera, scene, effectController, mouseX, currCameraFovPer);
  }
  apiList[ logoIndex ].Update(frameTime, time, camera, scene, effectController, mouseX, currCameraFovPer);

  //renderApi.Update( time, camera, effectController );


//        if( time > effectController.pathSlowness+currParamSelection.wave2StartTime+currParamSelection.wave2EmitTime )
//        {
//            var centerX = Clamp( 3 * ((mouseX - window.innerWidth*0.5) / (window.innerWidth*0.5)), -1, 1 );
//            //var centerX = -(mouseX - window.innerWidth*0.5) / (window.innerWidth*0.5);
//            // Translation
//            //var newTarget = centerX * 0.05;
//            //cubePoolMesh.position.x += (newTarget - cubePoolMesh.position.x) * kRotationSpeed;
//            // Rotation
//            var newTarget = ToRadians( centerX * kMaxAngle );
//            //cubePoolMesh.rotation.y += (newTarget - cubePoolMesh.rotation.y) * kRotationSpeed;
//            floorMesh.rotation.y += (newTarget*0.5 - floorMesh.rotation.y) * kRotationSpeed;
//        }
  floorMaterial.opacity = THREE.Math.clamp(time * time * 0.0015, 0.0, 0.125 * 0.85);


  // Hover logo a little bit.
  //cubePoolMesh.position.y = Math.sin( ToRadians(time*50) ) * 4.0;
  // Scale floor shadow smoothly with hovering
  //floorMesh.scale.x = 1.0 + (cubePoolMesh.position.y * 0.01);


//        if( CameraAnimation.length > 0.0 )
//        {
//            AnimateCamera( time*effectController.animScale, CameraAnimation, false );
//            camera.position = currentCamPosition;
//            camera.lookAt( currentCamTarget );
//        }
//        else
//        {
//            camera.position.set( 0, 0, 200 );
//        }

  //
  // Animate camera
  //
  var cameraTime2 = EaseInCubic(cameraTime, 0.0, kCameraTimeToAnimate, kCameraTimeToAnimate);
  cameraTime2 = Clamp(cameraTime2, 0.0, 1.0);
  currentCamPosition = previousCamPosition.lerp(targetCamPosition, cameraTime2);

  cameraTime += frameTime;
//        cameraTime /= kCameraTimeToAnimate;


  // Update FOV if Getty
  effectController.fieldOfView += (effectController.nextFieldOfView - effectController.fieldOfView) * frameTime;
  //var lFovTime = EaseInCubic( fovTime, 0.0, kFOVTimeToAnimate, kFOVTimeToAnimate );
  //effectController.fieldOfView = Lerp( effectController.fieldOfView, effectController.nextFieldOfView, lFovTime );

  var fovPer = (effectController.fieldOfView - effectController.fovMinValue) / (effectController.fovMaxValue - effectController.fovMinValue);
  if (fovPer < 0.001)
    fovPer = 0.0;
  if (fovPer > 0.999)
    fovPer = 1.0;
  currCameraFovPer = fovPer;
  var oneMinusFovPer = 1.0 - fovPer;

  var lLookAt = currentCamLookAt.clone();
  lLookAt.x += (oneMinusFovPer * effectController.fovCameraOffsetX);

  lLookAt.y += (oneMinusFovPer * effectController.fovCameraOffsetY);
  camera.position.x = currentCamPosition.x + (oneMinusFovPer * effectController.fovCameraOffsetX);



  camera.position.y = currentCamPosition.y + (oneMinusFovPer * effectController.fovCameraOffsetY);
  camera.position.z = currentCamPosition.z;
  camera.lookAt(lLookAt);

  /* camera.lookAt( currentCamLookAt );
   camera.position.x = currentCamPosition.x;
   camera.position.y = currentCamPosition.y;
   camera.position.z = currentCamPosition.z;*/

  //
  // Aspect Ratio: Container height is fixed, so we use the container's value
  //
  if (!isFullscreen)
  {
    camera.projectionMatrix.makePerspective(effectController.fieldOfView, window.innerWidth / containerHeight, 1, 400.0 );
  }
  else
  {
    camera.projectionMatrix.makePerspective(effectController.fieldOfView, window.innerWidth / window.innerHeight, 1, 400.0 );
  }


  //
  // Bottom copy text fade animation
  //
  //BottomTextAnimation( apiList[logoIndex].innerTime );
  /*mack.peepShow()*/
}

function Render()
{
    renderer.autoClear = false;
    //renderer.autoDepthClear = true;

    if( rcLocaleJSDirectory == 'facebook' && isFullscreen )
    {
        renderer.render( bgScene, bgCamera, null, true );
    }   

    renderer.render( scene, camera );

    if( rcLocaleJSDirectory != 'facebook' )
    {
        renderer.render( fgScene, fgCamera );
    }   
}


var frameTime = 0.0;
var prevTime = 0.0;
var clockTime = 0.0;
var lastClockTime = 0.0;
var prevTime = 0.0;
function MainLoop()
{
    requestAnimationFrame(MainLoop);

    // Use timestep
    clockTime = timeNow() - startTime;
    var timeDiff = clockTime - lastClockTime;
    var delta = Math.min( 1 / 60.0, timeDiff );
    lastClockTime = clockTime;
    prevTime = currentTime;
    currentTime += delta;
    if( !hasSelectedFacebook )  // If facebook has been selected and is loading, do not count idle time
        apiIdleTime += delta;
    frameTime = delta;

    mack.vars.logoIndex = 0;

    Update( currentTime, frameTime );
    Render();

    // Auto switch apis
    if( apiIdleTime > kAutoSwitchTime 
        && rcLocaleJSDirectory != 'facebook' 
        )
    {
        apiIdleTime = 0.0;
        
        /*var idx = getLogoIndex( THREE.Math.randInt( 0, APIGettyIndex ) ); // Ignore facebook
        while( idx == APIFacebookIndex )
        {
            idx = getLogoIndex( THREE.Math.randInt( 0, APIGettyIndex ) ); // Ignore facebook
            //console.log( "autoswitch: " , idx );
        }*/
        
        var idx = getLogoIndex(Math.floor(randIntz(logoIndexArr.length - 1, 0)) );
        ActivateAPI( idx );
    }

  // // DEBUG: Update app statistics
  // if (kShowStats)
  // {
  //   stats.update();
  // }
}


function AnimateCopyTextByNumber(api, str, frameTime_, timeToAnimate)
{
//        var subValue = 0.0;
//        if( api.number < 10 )
//            subValue = 10;
//        else if( api.number < 100 )
//            subValue = 100;
//        else if( api.number < 1000 )
//            subValue = 1000;
//        else if( api.number < 10000 )
//            subValue = 10000;
//        else if( api.number < 100000 )
//            subValue = 100000;
//        else if( api.number < 1000000 )
//            subValue = 1000000;
//        else if( api.number < 10000000 )
//            subValue = 10000000;
//        else if( api.number < 100000000 )
//            subValue = 100000000;
//        else if( api.number < 1000000000 )
//            subValue = 1000000000;
//        else if( api.number < 10000000000 )
//            subValue = 10000000000;
//        else if( api.number < 100000000000 )
//            subValue = 100000000000;
//        else if( api.number < 1000000000000 )
//            subValue = 1000000000000;

//        var firstNumber = subValue - api.number;
//        var lastNumber = api.number;
//        // Swap last with first if lower
//        if( lastNumber < firstNumber )
//        {
//            var temp = lastNumber;
//            lastNumber = firstNumber;
//            firstNumber = temp;
//        }
//        var diffNumber = lastNumber - firstNumber;
//        LOG( "***  " + diffNumber + " -- " + firstNumber + " -- " + lastNumber );
//        if( diffNumber < subValue*0.25 )
//        {
//            LOG( "diff is low: " + diffNumber + " -- " + firstNumber );
//            firstNumber -= subValue*0.25;
//            LOG( "diff is low, new firstNumber: " + firstNumber );
//        }

  var firstNumber = api.number;
  var lastNumber = firstNumber;

  var displayTime = 2 + 8 + 2; // fade in, on-screen and fade out total time
  switch (logoIndex)
  {
    case APIGettyIndex: // GETTY
      if (api.currentApiId == 1)
        lastNumber = firstNumber + (7 * (displayTime / 2.0));
//                else if( api.currentApiId == 2 )
//                    firstNumber = lastNumber - 80;
      else if (api.currentApiId == 3)
        lastNumber = firstNumber + (6 * (displayTime / 2.5));
      break;
    case APIInstagramIndex:
      if (api.currentApiId == 1)
        lastNumber = firstNumber + (7 * (displayTime / 2.0));
//                else if( api.currentApiId == 2 )
//                    firstNumber = lastNumber - 80;
      else if (api.currentApiId == 3)
        lastNumber = firstNumber + (6 * (displayTime / 2.5));
      break;
    case APITwitterIndex:
      if (api.currentApiId == 2)
        lastNumber = firstNumber + (6 * (displayTime / 2.0));
      break;
      //
    case APINYTIndex:
      if (api.currentApiId == 1)
        lastNumber = firstNumber + (20 * (displayTime / 0.5));
      else if (api.currentApiId == 2)
        lastNumber = firstNumber + (4 * (displayTime / 2.0));
      else if (api.currentApiId == 3)
        lastNumber = firstNumber + (4 * (displayTime / 2.0));
      else if (api.currentApiId == 4)
        lastNumber = firstNumber + (2 * (displayTime / 4.0));
      else if (api.currentApiId == 5)
        lastNumber = firstNumber + (2 * (displayTime / 4.0));
      break;
      //
    case APIAmazonIndex:
      if (api.currentApiId == 1)
        lastNumber = firstNumber + (80 * (displayTime / 1.0));
      else if (api.currentApiId == 2)
        lastNumber = firstNumber + (40 * (displayTime / 1.0));
      else if (api.currentApiId == 3)
        lastNumber = firstNumber + (40 * (displayTime / 1.0));
      else if (api.currentApiId == 4)
        lastNumber = firstNumber + (40 * (displayTime / 1.0));
      break;
      //
    case APILastfmIndex:
      if (api.currentApiId == 2)
        lastNumber = firstNumber + (20 * (displayTime / 2.0));
      else if (api.currentApiId == 3)
        lastNumber = firstNumber + (50 * (displayTime / 3.0));
      else if (api.currentApiId == 5)
        lastNumber = firstNumber + (10 * (displayTime / 1.0));
      break;
    case APIFacebookIndex:
      break;
  }

  //api.animatedNumber = EaseOutCubic( api.currentTime, api.number, firstNumber, timeToAnimate );
  api.animatedNumber = Lerp(firstNumber, lastNumber, api.currentTime / timeToAnimate);
  api.animatedNumber = parseInt(Math.round(Clamp(api.animatedNumber, firstNumber, lastNumber)));
  //api.animatedNumber = EaseOutCubic( api.currentTime, 0.0, api.number, timeToAnimate );
//        api.animatedNumber = parseInt( Math.round( Clamp( api.animatedNumber, 0.0, api.number ) ) );
//        LOG( api.number + " -- " + firstNumber + " -- " + api.animatedNumber );

  var numStr = "";
//        if( api.animatedNumber < 10 )
//            for( var ii=0; ii<api.numberPrecision-1; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 100 )
//            for( var ii=0; ii<api.numberPrecision-2; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 1000 )
//            for( var ii=0; ii<api.numberPrecision-3; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 10000 )
//            for( var ii=0; ii<api.numberPrecision-4; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 100000 )
//            for( var ii=0; ii<api.numberPrecision-5; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 1000000 )
//            for( var ii=0; ii<api.numberPrecision-6; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 10000000 )
//            for( var ii=0; ii<api.numberPrecision-7; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 100000000 )
//            for( var ii=0; ii<api.numberPrecision-8; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 1000000000 )
//            for( var ii=0; ii<api.numberPrecision-9; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 10000000000 )
//            for( var ii=0; ii<api.numberPrecision-10; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 100000000000 )
//            for( var ii=0; ii<api.numberPrecision-11; ii++ )
//                numStr += "0";
//        else if( api.animatedNumber < 1000000000000 )
//            for( var ii=0; ii<api.numberPrecision-12; ii++ )
//                numStr += "0";
  numStr += api.animatedNumber;
  str = str.replace("{number}", numStr); //api.animatedNumber );
  

    

  return str;
}

function AnimateCopyTextByValue(api, str, frameTime_, timeToAnimate)
{

  var currentValueIndex = EaseOutCubic(api.currentTime, 0.0, api.values.length, timeToAnimate);
  currentValueIndex = parseInt(Math.round(Clamp(currentValueIndex, 0, api.values.length - 1)));
  str = str.replace("{value}", api.values[ currentValueIndex ]);
  return str;
}

function AnimateCopyTextByValue_Twitter1(api, frameTime_, timeToAnimate)
{
  var currentValueIndex = (api.currentTime * 17) % api.values.length;
  currentValueIndex = parseInt(Math.round(Clamp(currentValueIndex, 0, api.values.length - 1)));

  var taglineSubStr = api.tagline.substr(9, api.tagline.length);
  textFieldTwitterHandle.text("@" + api.values[ currentValueIndex ]);
  textFieldTwitterText.text(taglineSubStr);

  str = "";
  return str;
}

function AnimateCopyText(apiIndex_, frameTime_, timeToAnimate_)
{
  var api = copyTextArray[ apiIndex_ ];

  var str = "";

  // If only number animation
  if (api.hasNumberAnimation && !api.hasValueAnimation)
  {
    str = api.tagline;
    str = str.replace("{value}", api.values[0]);
    str = AnimateCopyTextByNumber(api, str, frameTime_, timeToAnimate_);
  }
  // If only value animation
  if (!api.hasNumberAnimation && api.hasValueAnimation)
  {
    // on twitter we keep cycling through the handles
    if (apiIndex_ == 1 && api.currentApiId == 1)
    {
      str = api.tagline;
      //str = str.replace( "{number}", api.number );
      str = AnimateCopyTextByValue_Twitter1(api, str, frameTime_, timeToAnimate_);
    }
    else
    {
      str = api.tagline;
      str = str.replace("{number}", api.number);
      str = AnimateCopyTextByValue(api, str, frameTime_, timeToAnimate_);
    }
  }
  // If both value and number animations
  if (api.hasNumberAnimation && api.hasValueAnimation)
  {
    str = api.tagline;
    str = AnimateCopyTextByNumber(api, str, frameTime_, timeToAnimate_);
    str = AnimateCopyTextByValue(api, str, frameTime_, timeToAnimate_);
    LOG("both value+number: " + str);
  }
  // If none value and number animations
  if (!api.hasNumberAnimation && !api.hasValueAnimation)
  {
    str = api.tagline.replace("{number}", api.number);
    str = str.replace("{value}", api.values[0]);
  }

  api.currentTime += frameTime_;

  return str;
}

function BottomTextAnimation(time)
{
  //
  // Bottom copy text fade animation
  //
  var fadet0 = effectController.pathSlowness + apiList[logoIndex].decl.wave2EmitTime;
  var fadet1 = fadet0 + 2.0;
  var fadet2 = fadet1 + 8.0;
  var fadet3 = fadet2 + 2.0;
  var fadet4 = fadet3 + 2.0;
  var fadet5 = fadet4 + 8.0;
  var fadet6 = fadet5 + 2.0;
  var fadetm1 = Math.min(2.0, fadet0);

  var fadein1 = Smoothstep(fadet0, fadet1, time);
  var fadeout1 = 1.0 - Smoothstep(fadet2, fadet3, time);
  var fadein2 = Smoothstep(fadet3, fadet4, time);
  var fadeout2 = 1.0 - Smoothstep(fadet5, fadet6, time);

  if (time >= 0.0 && time < fadetm1)
  {
    var timeScaled = time * 0.4;
    var lll = Clamp(statsText.css("opacity") - timeScaled, 0.0, 1.0);
    var lll2 = Clamp(logo.css("opacity") - timeScaled, 0.0, 1.0);
    statsText.css({"display": "block", "opacity": lll});
    statsTwitter.css({"display": "block", "opacity": lll});
    if (mack.vars.big) {
      logo.css({"display": "block", "opacity": lll2});
    }
  }
  else if (time >= fadetm1 && time < fadet2)
  {
    // Animate bottom text
    if (time >= fadet0)
    {
      // Animate bottom text
      if (logoIndex == APITwitterIndex)
      {
        if (copyTextArray[logoIndex].currentApiId == 1)
        {
          AnimateCopyText(logoIndex, frameTime, (fadet2 - fadet0) * 4);
          textFieldChildrenP.text("");
          statsTwitter.css("opacity", fadein1);
          statsText.css("opacity", 0.0);
        }
        else
        {
          statsTwitter.css("opacity", 0.0);
          var tagline = AnimateCopyText(logoIndex, frameTime, (fadet2 - fadet0) * 4);
          textFieldChildrenP.text(tagline);
        }
      }
      else
      {
        var tagline = AnimateCopyText(logoIndex, frameTime, (fadet2 - fadet0) * 4);
        textFieldChildrenP.text(tagline);
      }
    }

    /* if( logoIndex !== 1 )
     statsText.css("opacity", fadein1 );
     if( logoIndex === 1 && copyTextArray[logoIndex].currentApiId != 1 )
     statsText.css("opacity", fadein1 );*/
  }
  else if (time >= fadet2 && time < fadet3)
  {
    // Animate bottom text
    if (logoIndex == APITwitterIndex)
    {
      if (copyTextArray[logoIndex].currentApiId == 1)
      {
        AnimateCopyText(logoIndex, frameTime, (fadet2 - fadet0) * 4);
        statsTwitter.css("opacity", fadeout1);
        statsText.css("opacity", 0.0);
      }
      else
      {
        var tagline = AnimateCopyText(logoIndex, frameTime, (fadet2 - fadet0) * 4);
        textFieldChildrenP.text(tagline);
        statsText.css("opacity", fadeout1);
      }
    }
    else
    {
      var tagline = AnimateCopyText(logoIndex, frameTime, (fadet2 - fadet0) * 4);
      textFieldChildrenP.text(tagline);
      statsText.css("opacity", fadeout1);
    }
  }
  else if (time >= fadet3 && time < fadet4)
  {
    statsText.css("opacity", fadeout1);
    if (mack.vars.big) {
      logo.css("opacity", fadein2);
    }
  }
  else if (time >= fadet5 && time < fadet6)
  {
    statsText.css("opacity", fadeout1);
    if (mack.vars.big) {
      logo.css("opacity", fadeout2);
    }
  }
}


function ResetTaglines()
{
  for (var i = 0; i < copyTextArray.length; i++)
    copyTextArray[i].Restart();
}

function RestartLogoIntroAnimation()
{
  apiIdleTime = 0.0;

  effectController.nextFieldOfView = effectController.fovMaxValue;

  CameraPosClearStates();
  CameraPosSetItem(0);
  SetCameraPosition(0);
  ResetTaglines();

//        LOG( "previous: " + prevLogoIndex + "  --  current: " + logoIndex );
  if (mack.vars.isKosher) 
  {
    apiList[ prevLogoIndex ].SetForExitAnimation(currentTime);
    apiList[ logoIndex ].SetTriggerTime(currentTime);
    apiList[ logoIndex ].Enable(Params[ logoIndex ]);
    apiList[ logoIndex ].AddToScene(scene);
    floorMesh.rotation.y = 0.0;
    ResetStats();
  }

  mouseX = window.innerWidth * 0.5;
  mouseY = window.innerHeight * 0.5;
//        cubePoolMesh.rotation.y = 0.0;
  //  floorMesh.rotation.y = 0.0;


  statsText.css("opacity", 0.0);
  statsTwitter.css("opacity", 0.0);
  if (mack.vars.big) 
  {
    logo.css("opacity", 0.0);
  }

  //startTime = timeNow();
  //currentTime = 0.0;
}


//
// Calls from API buttons
//

function FacebookCallFunc_WebGL()
{

  kCanClick = false;
  
  $.when(
      LoadTexture(staticData, "facebookTex", 'facebook_img')
          ).done(function()
  {
    if (Params[APIFacebookIndex].texture)
    {
        Params[APIFacebookIndex].texture.dispose();
    }
    Params[APIFacebookIndex].texture = staticData[ "facebookTex" ];
    SetTexturePointFiltering( Params[APIFacebookIndex] );

    PrepareFacebookTagline();

    prevLogoIndex = logoIndex;
    logoIndex = APIFacebookIndex;
//    currParamSelection = logoFacebook;    
//            currParamSelection = Params[ logoIndex ];

    RestartLogoIntroAnimation();
   
    Klang.triggerEvent('getty_start');
    MenuClearStates();
    MenuSetItem(logoIndex + 1);
    $('li.facebook.avoid-clicks').addClass('active');
    $('.zoom-controls').css({display: 'block'})
  });
}

function GettyCallFunc_WebGL()
{
  kCanClick = false;
  var apiID = FindValidAPIID(json05Files);
  var imageFilename = rootPath + "images/" + rcLocaleJSDirectory + "/getty-" + apiID + ".jpg";

  LOG("+++ Getty selected index: " + apiID);
  $.when(LoadTexture(staticData, "getty", imageFilename)
          ).done(function()
  {
    if (Params[APIGettyIndex].texture)
    {
      Params[APIGettyIndex].texture.dispose();
    }
    Params[APIGettyIndex].texture = staticData[ "getty" ];
    SetTextureFiltering( Params[APIGettyIndex] );

    PrepareGettyTagline(apiID);

    prevLogoIndex = logoIndex;
    logoIndex = APIGettyIndex;
//    currParamSelection = logoGetty;
    //            currParamSelection = Params[ logoIndex ];
    RestartLogoIntroAnimation();
    console.log('start');
    console.log(Klang.triggerEvent('getty_start'));
    MenuClearStates();
    MenuSetItem(0); // Special case: This is Getty at zero
    $('.zoom-controls').css({display: 'block'})
  });
}


function InstagramCallFunc_WebGL()
{
   
  kCanClick = false;
  var apiID = FindValidAPIID(json00Files);
  var imageFilename = rootPath + "images/" + rcLocaleJSDirectory + "/instagram-" + apiID + ".jpg";
  LOG("+++ Instagram selected index: " + apiID);
  $.when(LoadTexture(staticData, "instagram" + apiID + "Json", imageFilename)
          ).done(function()
  {
    if (Params[APIInstagramIndex].texture)
      Params[APIInstagramIndex].texture.dispose();
    Params[APIInstagramIndex].texture = staticData[ "instagram" + apiID + "Json" ];
    SetTextureFiltering( Params[APIInstagramIndex] );

    PrepareInstagramTagline(apiID);
    
    if (mack.vars.ranApi && prevLogoIndex !== logoIndex) 
    {
      mack.apiText();
      /* mack.peepShow();*/
      poo('trying to show tran')

      mack.vars.ranApi = false;
    }

    prevLogoIndex = logoIndex;
    logoIndex = APIInstagramIndex;
//    currParamSelection = Params[ logoIndex ];
    RestartLogoIntroAnimation();
    if (!Environment.isMobile() && mack.vars.isKosher) 
    {
        console.log( "Klang.triggerEvent('instagram_start');" );
      Klang.triggerEvent('instagram_start');
    }

    MenuClearStates();
    MenuSetItem(logoIndex + 1);
    
    $('.zoom-controls').css({display: 'none'})
  });
}

function TwitterCallFunc_WebGL()
{
  kCanClick = false;
  var apiID = FindValidAPIID(json01Files);
  var imageFilename = rootPath + "images/" + rcLocaleJSDirectory + "/twitter-" + apiID + ".png";
  LOG("+++ Twitter selected index: " + apiID);
  $.when(LoadTexture(staticData, "twitter" + apiID + "Json", imageFilename)
          ).done(function()
  {
    if (Params[APITwitterIndex].texture)
      Params[APITwitterIndex].texture.dispose();
    // poo('preppzz ')
    poo(staticData[ "twitter" + apiID + "Json" ])
    Params[APITwitterIndex].texture = staticData[ "twitter" + apiID + "Json" ];
    SetTextureFiltering(Params[APITwitterIndex]);
    /*poo('checking param')*/
    /*poo(Params[1])*/
    SetTextureFiltering(Params[APITwitterIndex]);

    PrepareTwitterTagline(apiID);

    if (mack.vars.ranApi && prevLogoIndex !== logoIndex) {
      mack.apiText();
      /* mack.peepShow();*/
      /*poo('trying to show tran')*/

      mack.vars.ranApi = false;
    }

    prevLogoIndex = logoIndex;
    logoIndex = APITwitterIndex;
//    currParamSelection = Params[ logoIndex ];
    RestartLogoIntroAnimation();
    if (!Environment.isMobile() && mack.vars.isKosher) 
    {
        console.log( "Klang.triggerEvent('twitter_start');" );
      Klang.triggerEvent('twitter_start');
    }
    MenuClearStates();
    MenuSetItem(logoIndex + 1);
    $('.zoom-controls').css({display: 'none'})
  });
}

function NYTCallFunc_WebGL()
{
  kCanClick = false;
  var apiID = FindValidAPIID(json02Files);
  var imageFilename = rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-" + apiID + ".png";
  LOG("+++ NYTimes selected index: " + apiID);
  $.when(LoadTexture(staticData, "nytimes" + apiID + "Json", imageFilename)
          ).done(function()
  {
    if (Params[APINYTIndex].texture)
      Params[APINYTIndex].texture.dispose();
    Params[APINYTIndex].texture = staticData[ "nytimes" + apiID + "Json" ];
    SetTextureFiltering(Params[APINYTIndex]);

    PrepareNYTimesTagline(apiID);

    if (mack.vars.ranApi && prevLogoIndex !== logoIndex) {
      mack.apiText();
      /*mack.peepShow();*/
      /*poo('trying to show tran')*/

      mack.vars.ranApi = false;
    }

    prevLogoIndex = logoIndex;
    logoIndex = APINYTIndex;
//    currParamSelection = Params[ logoIndex ];
    RestartLogoIntroAnimation();
    if (!Environment.isMobile() && mack.vars.isKosher) 
    {
        console.log( "Klang.triggerEvent('times_start');" );
      Klang.triggerEvent('times_start');
    }
    MenuClearStates();
    MenuSetItem(logoIndex + 1);
    $('.zoom-controls').css({display: 'none'})
  });
}

function AmazonCallFunc_WebGL()
{
  kCanClick = false;
  var apiID = FindValidAPIID(json03Files);
  var imageFilename = rootPath + "images/" + rcLocaleJSDirectory + "/amazon-" + apiID + ".jpg";

  LOG("+++ Amazon selected index: " + apiID);
  $.when(LoadTexture(staticData, "amazon" + apiID + "Json", imageFilename)
          ).done(function()
  {
    if (Params[APIAmazonIndex].texture)
      Params[APIAmazonIndex].texture.dispose();
    Params[APIAmazonIndex].texture = staticData[ "amazon" + apiID + "Json" ];
    SetTextureFiltering(Params[APIAmazonIndex]);

    PrepareAmazonTagline(apiID);
    if (mack.vars.ranApi && prevLogoIndex !== logoIndex) {
      mack.apiText();
      /*mack.peepShow();*/
      /*poo('trying to show tran')*/

      mack.vars.ranApi = false;
    }


    prevLogoIndex = logoIndex;
    logoIndex = APIAmazonIndex;
//    currParamSelection = Params[ logoIndex ];
    RestartLogoIntroAnimation();
    if (!Environment.isMobile() && mack.vars.isKosher) 
    {
        console.log( "Klang.triggerEvent('amazon_start');" );
        Klang.triggerEvent('amazon_start');
    }
    MenuClearStates();
    MenuSetItem(logoIndex + 1);
    $('.zoom-controls').css({display: 'none'})
  });
}

function LastFMCallFunc_WebGL()
{
  kCanClick = false;
  var apiID = FindValidAPIID(json04Files);
  var imageFilename = rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-" + apiID + ".jpg";
  LOG("+++ LastFM selected index: " + apiID);
  $.when(LoadTexture(staticData, "lastfm" + apiID + "Json", imageFilename)
          ).done(function()
  {
    if (Params[APILastfmIndex].texture)
      Params[APILastfmIndex].texture.dispose();
    Params[APILastfmIndex].texture = staticData[ "lastfm" + apiID + "Json" ];
    SetTextureFiltering(Params[APILastfmIndex]);

    PrepareLastFMTagline(apiID);

    if (mack.vars.ranApi && prevLogoIndex !== logoIndex) {
      mack.apiText();
      /*mack.peepShow();*/
      /*poo('trying to show tran')*/

      mack.vars.ranApi = false;
    }

    prevLogoIndex = logoIndex;
    logoIndex = APILastfmIndex;
//    currParamSelection = Params[ logoIndex ];
    RestartLogoIntroAnimation();
    if (!Environment.isMobile() && mack.vars.isKosher) 
    {
        console.log( "Klang.triggerEvent('last_start');" );
      Klang.triggerEvent('last_start');
    }
    MenuClearStates();
    MenuSetItem(logoIndex + 1);
    $('.zoom-controls').css({display: 'none'})
  });
}

zoomButton.on('click', function()
{
  //if( logoIndex == APIFacebookIndex )
  //{
    if (effectController.nextFieldOfView != effectController.fovMinValue)
      effectController.nextFieldOfView = effectController.fovMinValue;
    else
      effectController.nextFieldOfView = effectController.fovMaxValue;
  //}
  //else
  //{
  //  effectController.nextFieldOfView = effectController.fovMaxValue;
  //}
});