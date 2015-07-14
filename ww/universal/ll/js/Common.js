// Globals

var staticData = [];
var browserName = "";


// Colors
if(mack.vars.isKosher ){
var colsTwitter =
[
    new THREE.Vector3( 0/255.0, 161/255.0, 221/255.0 )
    , new THREE.Vector3( 0, 0, 0 )
    , new THREE.Vector3( 0, 0, 0 )
/*    , new THREE.Vector3( 0/255.0, 161/255.0, 221/255.0 )
    , new THREE.Vector3( 1, 1, 1 )
    , new THREE.Vector3( 0/255.0, 161/255.0, 221/255.0 )
    , new THREE.Vector3( 0/255.0, 161/255.0, 221/255.0 )*/
];
var colWhite = new THREE.Vector3( 1, 1, 1 );


// Constants

var kAutoSwitchTime = 20.0;

var kCanClick = true;
var kClickDelayTime = 9; //7.5;

var kShowStats = false;
var kRotationSpeed = 0.05;
var kMaxAngle = 30.0;

var kPathDimX = 1024.0;
var kPathDimY = 2.0;

var kTextureSize = { x: 1024.0, y: 1024.0 };
var kNumTextures = { x: 8, y: 8 };
var kTextureSectionSize = new THREE.Vector2( kTextureSize.x / kNumTextures.x, kTextureSize.y / kNumTextures.y );
var kNumTwitterTextures = { x: 1, y: 64 };
var kTwitterTextureSectionSize = new THREE.Vector2( kTextureSize.x / kNumTwitterTextures.x, kTextureSize.y / kNumTwitterTextures.y );
var kNumNYTTextures = { x: 8, y: 16 };
var kNYTTextureSectionSize = new THREE.Vector2( kTextureSize.x / kNumNYTTextures.x, kTextureSize.y / kNumNYTTextures.y );

}

var GettyImageSize = { x: 4096, y: 2048 };
var GettyTileSize = { x: 144, y: 256 }; // Size for portrait, reverse it for Landscape

var LandscapeTileCount = { x: 9, y: 7 };
var PortraitTileCount = { x: 16, y: 4 };

var APIInstagramIndex = 0;
var APITwitterIndex = 1;
var APINYTIndex = 2;
var APIAmazonIndex = 3;
var APILastfmIndex = 4;
var APIGettyIndex = 5;
var APIFacebookIndex = 6;


var cubeScale = 1.0;
var c = { x:0.0, y:0.0, z:0.0 };
var sx = 0.5 * cubeScale;
var sy = 0.5 * cubeScale;
var sz = 0.5 * cubeScale;

var _vertices =
[
        c.x+sx,c.y+sy,c.z+sz,	            c.x+sx,c.y+-1.0*sy,c.z+sz,	c.x+sx,c.y+-1.0*sy,c.z+-1.0*sz,	c.x+sx,c.y+sy,c.z+-1.0*sz,		// +X
        c.x+sx,c.y+sy,c.z+sz,	            c.x+sx,c.y+sy,c.z+-1.0*sz,	c.x+-1.0*sx,c.y+sy,c.z+-1.0*sz,	c.x+-1.0*sx,c.y+sy,c.z+sz,		// +Y
        c.x+sx,c.y+sy,c.z+sz,	            c.x+-1.0*sx,c.y+sy,c.z+sz,	c.x+-1.0*sx,c.y+-1.0*sy,c.z+sz,	c.x+sx,c.y+-1.0*sy,c.z+sz,		// +Z
        c.x+-1.0*sx,c.y+sy,c.z+sz,	        c.x+-1.0*sx,c.y+sy,c.z+-1.0*sz,	c.x+-1.0*sx,c.y+-1.0*sy,c.z+-1.0*sz,	c.x+-1.0*sx,c.y+-1.0*sy,c.z+sz,	// -X
        c.x+-1.0*sx,c.y+-1.0*sy,c.z+-1.0*sz, c.x+sx,c.y+-1.0*sy,c.z+-1.0*sz, c.x+sx,c.y+-1.0*sy,c.z+sz,	c.x+-1.0*sx,c.y+-1.0*sy,c.z+sz,	// -Y
        c.x+sx,c.y+-1.0*sy,c.z+-1.0*sz,	    c.x+-1.0*sx,c.y+-1.0*sy,c.z+-1.0*sz,	c.x+-1.0*sx,c.y+sy,c.z+-1.0*sz,	c.x+sx,c.y+sy,c.z+-1.0*sz	// -Z
];

var _normals =
[
    1,0,0,	1,0,0,	1,0,0,	1,0,0,
    0,1,0,	0,1,0,	0,1,0,	0,1,0,
    0,0,1,	0,0,1,	0,0,1,	0,0,1,
    -1,0,0,	-1,0,0,	-1,0,0,	-1,0,0,
    0,-1,0,	0,-1,0,  0,-1,0,0,-1,0,
    0,0,-1,	0,0,-1,	0,0,-1,	0,0,-1
];

var _texcoords =
[
    0,1,	1,1,	1,0,	0,0,
    1,1,	1,0,	0,0,	0,1,
    0,1,	1,1,	1,0,	0,0,
    1,1,	1,0,	0,0,	0,1,
    1,0,	0,0,	0,1,	1,1,
    1,0,	0,0,	0,1,	1,1
];

var _indices =
[
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9,10, 8, 10,11,
    12,13,14,12,14,15,
    16,17,18,16,18,19,
    20,21,22,20,22,23
];

function LOG( msg )
{
   // console.log( msg );
}

function ToRadians( x )
{
    return (x * (Math.PI / 180.0));
}

function Lerp( a, b, t )
{
    //return b*t + (a - t*a);
    return (a + t*(b - a) );
}

function Saturate( x )
{
    if( x < 0.0 ) return 0.0;
    if( x > 1.0 ) return 1.0;
    return x;
}

function Clamp( x, a, b )
{
    if( x < a ) return a;
    if( x > b ) return b;
    return x;
}

function LerpVector3( a, b, t )
{
    var v = new THREE.Vector3();
    v.x = Lerp(a.x, b.x, t );
    v.y = Lerp(a.y, b.y, t );
    v.z = Lerp(a.z, b.z, t );
    return v;
}

function Smoothstep( edge0, edge1, x )
{
    // Scale, bias and saturate x to 0..1 range
    x = Saturate( (x - edge0) / (edge1 - edge0) );
    // Evaluate polynomial
    return x*x*(3 - 2*x);
}

function EaseInOutQuint( t, b, c, d)
{
    t /= d/2.0;
    if( t < 1.0 )
        return (c/2.0)*t*t*t*t*t + b;
    t -= 2.0;
    return c/2.0*(t*t*t*t*t + 2.0) + b;
}

function EaseInCubic(t, b, c, d)
{
    var t2 = t / d;
    return c*t2*t2*t2 + b;
};

function EaseOutCubic( t, b, c, d )
{
    var t2 = t / d;
    t2--;
    return c*(t2*t2*t2 + 1.0) + b;
}

function EaseInQuart(t, b, c, d)
{
    t /= d;
    return c*t*t*t*t + b;
};

function EaseOutQuart(t, b, c, d)
{
    var t2 = t / d;
    t2--;
    return -c * (t2*t2*t2*t2 - 1) + b;
};