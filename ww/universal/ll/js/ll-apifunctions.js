
var KeyFrame = function()
{
    this.position = new THREE.Vector3();
    this.orientation = new THREE.Quaternion();
    this.transform = new THREE.Matrix4();
    this.time = 0.0;
};

var CameraCustom = function()
{
    this.position = new THREE.Vector3();
    this.orientation = new THREE.Quaternion();
}

var Track = function()
{
    this.name = null;
    this.lengthInMillis = 0.0;
    this.lengthInFrames = 0.0;
    this.keyframes = [];
};
Track.prototype.Animate = function( time, obj )
{
    var timeClamped = 0.0;

    // No loop mode
    if( time > this.lengthInMillis )
        timeClamped = this.lengthInMillis;
    else
        timeClamped = time;

//        if( time > camAnimation.length )
//            timeClamped = time % camAnimation.length;
//        else
//            timeClamped = time;

    
    var numOfKeys = this.keyframes.length;
    var key  = 0;
    var key1 = 0;
    var key2 = 0;

    while( key < numOfKeys && this.keyframes[ key ].time < timeClamped )
    {
        key++;
    }
    if( key < 0 ) key = 0;
    if( key >= numOfKeys ) key = numOfKeys-1;
    key1 = key - 1;
    key2 = key;
    while( key1 < 0 )
    {
        key1 ++;
        key2 ++;
    }
    //LOG( key + ", " + key1 + ", " + key2 );

    var keyframe1 = this.keyframes[ key1 ];
    var keyframe2 = this.keyframes[ key2 ];

    var beforeTiming = keyframe1.time;
    var afterTiming = keyframe2.time;
    var beforePos = keyframe1.position.clone();
    var afterPos = keyframe2.position.clone();
    var beforeQ = keyframe1.orientation.clone();
    var afterQ = keyframe2.orientation.clone();

    // find interpolation t value
    var timeLength = ( afterTiming - beforeTiming );
    var t = (timeClamped - beforeTiming) / timeLength;

    var tt = t;
    /*float tt = t*t;
     float ttt = tt*t;
     float dt = ttt*0 + tt*1 + t*1;*/
    //float dt = Quint.easeInOut( t, 0, 1, 1 );
    if( tt > 1.0 )
        tt = 1.0;

    obj.position = beforePos.lerp( afterPos, tt );
    obj.orientation = beforeQ.slerp( afterQ, tt );

    //LOG( "Orientation:  " + " time: " + t + " - " + obj.orientation.x + ", " + obj.orientation.y + ", " + obj.orientation.z + ", " + obj.orientation.w );
    //LOG( "Trans:  " + " time: " + t + " - " + obj.position.x + ", " + obj.position.y + ", " + obj.position.z );
}


function ParseJSONAnimation( filename, track )
{
    track.name = filename[ "name" ];
    track.lengthInFrames = filename[ "frame_count" ];
    track.lengthInMillis = 0.0;

    // FBX cameras for some reason point on the X direction, so we need to rotate
    // NOTE: Comment this code is used with objects
    var rotQuat = new THREE.Quaternion();
    //rotQuat.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), ToRadians( 90 ) );

    for( var i=0; i<track.lengthInFrames; i++ )
    {
        var pos = filename[ "view_animation"][i].T;
        var quat = filename[ "view_animation"][i].Q;
        //var mat = filename[ "view_animation"][i].M;
        var time = filename[ "view_animation"][i].timestamp;
        //LOG( time );

        var kf = new KeyFrame();
        kf.time = time;
        kf.position = new THREE.Vector3( pos[0], pos[1], pos[2] );
        kf.orientation = new THREE.Quaternion( quat[0], quat[1], quat[2], quat[3] );
        kf.orientation.multiply( rotQuat );
        //kf.transform = new THREE.Matrix4( mat[0], )
        track.keyframes.push( kf );

        track.lengthInMillis = time;
    }

    //LOG( "length in frames: " + track.lengthInFrames );
    //LOG( "length in millis: " + track.lengthInMillis );
};

var gettyTestPart = new CameraCustom();
var gettyPartTrack = new Track();




var _planeVertices = [];
var _planeNormals = [];
var _planeTexcoords = [];
var _planeIndices = [];

function BuildPlane( scaleX, scaleY )
{
    var s = 0.5;

    for( var i=0; i<=6; i++ )
    {
        var t = i / (6.0);

        // Vertices
        _planeVertices.push( t*scaleX );
        _planeVertices.push( 1 * s * scaleY );
        _planeVertices.push( 0.0 );
        _planeVertices.push( t*scaleX );
        _planeVertices.push( -1 * s * scaleY );
        _planeVertices.push( 0.0 );

        // Texcoords
        _planeTexcoords.push( (1.0-t) );
        _planeTexcoords.push( 1 );
        _planeTexcoords.push( (1.0-t) );
        _planeTexcoords.push( 0 );

        // Normals
        _planeNormals.push( 0 );
        _planeNormals.push( 0 );
        _planeNormals.push( -1 );
        _planeNormals.push( 0 );
        _planeNormals.push( 0 );
        _planeNormals.push( -1 );
    }

    _planeIndices.push( 0 );
    _planeIndices.push( 1 );
    _planeIndices.push( 2 );
    _planeIndices.push( 2 );
    _planeIndices.push( 1 );
    _planeIndices.push( 3 );
    _planeIndices.push( 2 );
    _planeIndices.push( 3 );
    _planeIndices.push( 4 );
    _planeIndices.push( 4 );
    _planeIndices.push( 3 );
    _planeIndices.push( 5 );
    _planeIndices.push( 4 );
    _planeIndices.push( 5 );
    _planeIndices.push( 6 );
    _planeIndices.push( 6 );
    _planeIndices.push( 5 );
    _planeIndices.push( 7 );
    _planeIndices.push( 6 );
    _planeIndices.push( 7 );
    _planeIndices.push( 8 );
    _planeIndices.push( 8 );
    _planeIndices.push( 7 );
    _planeIndices.push( 9 );
    _planeIndices.push( 8 );
    _planeIndices.push( 9 );
    _planeIndices.push( 10 );
    _planeIndices.push( 10 );
    _planeIndices.push( 9 );
    _planeIndices.push( 11 );
    _planeIndices.push( 10 );
    _planeIndices.push( 11 );
    _planeIndices.push( 12 );
    _planeIndices.push( 12 );
    _planeIndices.push( 11 );
    _planeIndices.push( 13 );

//        LOG( _planeVertices.length/3 );
//        LOG( _planeTexcoords.length/2 );
//        LOG( _planeNormals.length/3 );
//        LOG( _planeIndices.length );
//        for( var i=0; i<_planeVertices.length; i+=3 )
//            LOG( _planeVertices[i+0] + ", " + _planeVertices[i+1] + ", " + _planeVertices[i+2] );
}


var pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method)
{
    var p = 0, m, t;
    while (p < pfx.length && !obj[m])
    {
        m = method;
        if (pfx[p] == "")
        {
            m = m.substr(0,1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t != "undefined")
        {
            pfx = [pfx[p]];
            return (t == "function" ? obj[m]() : obj[m]);
        }
        p++;
    }
}

// get browser's name+version
navigator.sayswho = (function()
{
    var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    //M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    M = M[2] ? [M[1]] : [navigator.appName, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    var Mres = M.join(' ');
    Mres = Mres.toLowerCase();
    return Mres;
})();

function CreateFloatTextureFromData( gl, texture, width, height, bpp, data, filtering, init, browserName )
{
    if( !init )
    {
        texture.__webglTexture = gl.createTexture();
        texture.needsUpdate = false;
        texture.__webglInit = true;
    }

    gl.bindTexture( gl.TEXTURE_2D, texture.__webglTexture );

    var format = (bpp==3) ? gl.RGB : gl.RGBA;

    if( !init )
    {
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering );

        gl.texImage2D( gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.FLOAT, data );
    }
    else
    {
        // Firefox does not like texSubImage2D
        if( browserName == "firefox" )
        {
            LOG( "+++ CreateFPTextureFromData for firefox" );
            gl.texImage2D( gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.FLOAT, data );
        }
        else
        {
            LOG( "+++ CreateFPTextureFromData for other browsers other than firefox" );
            gl.texSubImage2D( gl.TEXTURE_2D, 0, 0, 0, width, height, format, gl.FLOAT, data );
        }
    }

    gl.bindTexture( gl.TEXTURE_2D, null );
}

function SetTexturePointFiltering( tex_ )
{
    //tex_.generateMipmaps = true;
    tex_.wrapS = THREE.ClampToEdgeWrapping;
    tex_.wrapT = THREE.ClampToEdgeWrapping;
    tex_.minFilter = THREE.NearestFilter;
    tex_.magFilter = THREE.NearestFilter;
}

function SetTextureFiltering( tex_ )
{
    tex_.generateMipmaps = true;
    tex_.wrapS = THREE.ClampToEdgeWrapping;
    tex_.wrapT = THREE.ClampToEdgeWrapping;
    tex_.minFilter = THREE.LinearMipMapLinearFilter;
    tex_.magFilter = THREE.LinearFilter;
}
