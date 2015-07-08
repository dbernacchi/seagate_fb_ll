//var preloader = $('#preloader');
//var menu = $('#menu');
var statsText = $('#stats');
var statsTwitter = $('#statsTwitter');
var textFieldChildrenP = statsText.children("p");
var logo = $('#logo');
var textFieldTwitterHandle = $('#twitterHandle');
var textFieldTwitterText = $('#twitterText');


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

    var json05Files = [ 0, 0 ];
    var json00Files = [ 0, 0, 0 ];
    var json01Files = [ 0, 0, 0 ];
    var json02Files = [ 0, 0, 0, 0, 0 ];
    var json03Files = [ 0, 0, 0, 0 ];
    var json04Files = [ 0, 0, 0, 0, 0 ];


    var copyTextArray = [ new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl(), new CopyDecl() ];

    function ResetStats()
    {
        statsText.css("opacity", 0.0 );
        statsTwitter.css( "opacity", 0.0 );
        logo.css("opacity", 0.0 );
    }

    function FindValidAPIID( api_ )
    {
        var id = THREE.Math.randInt( 0, api_.length-1 );
        while( api_[id] <= 0 )
        {
            id = THREE.Math.randInt( 0, api_.length-1 );
        }
        return id + 1;
    }

    function PrepareGettyTagline( apiID )
    {
        var copyText;
        var copyTextName;

        // GETTY taglines
        copyText = copyTextArray[6];
        mack.vars.values = copyText.values;
        copyText.Reset();

    //        copyText = new CopyDecl();
        copyTextName = "getty" + apiID + "Json";
        //console.log(copyTextName)
        copyText.totalTaglines = 2;

        copyText.currentApiId = apiID;
        switch( apiID )
        {
            case 1:
            case 2:
                copyText.hasNumberAnimation = true;
                break;
        }
        if( staticData[ copyTextName ].number )
        {
            copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
            copyText.number = parseInt( staticData[ copyTextName ].number );
        }
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                copyText.values.push( staticData[ copyTextName ].values[ti] );
            }
        }
        copyText.tagline = staticData[ copyTextName ].tagline;
        mack.vars.tagline = copyText;
        
    //        copyTextArray.push( copyText );
    }

  /*  function PrepareInstagramTagline( apiID )
    {
        var copyText;
        var copyTextName;

        // INSTAGRAM taglines
        copyText = copyTextArray[0];
        copyText.Reset();

//        copyText = new CopyDecl();
        copyTextName = "instagram" + apiID + "Json";
        console.log(copyTextName)
        copyText.totalTaglines = 3;
        copyText.currentApiId = apiID;
        switch( apiID )
        {
            case 1:
            case 3:
                copyText.hasNumberAnimation = true;
                break;
        }
        if( staticData[ copyTextName ].number )
        {
            copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
            copyText.number = parseInt( staticData[ copyTextName ].number );
        }
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                copyText.values.push( staticData[ copyTextName ].values[ti] );
            }
        }
        copyText.tagline = staticData[ copyTextName ].tagline;
        mack.vars.tagline = copyText;
        mack.vars.values = copyText.values;
//        copyTextArray.push( copyText );
    }*/

   /* function PrepareTwitterTagline( apiID )
    {
        var copyText;
        var copyTextName;

        // TWITTER taglines
        copyText = copyTextArray[1];
        copyText.Reset();

//        copyText = new CopyDecl();
        copyTextName = "twitter" + apiID + "Json";
        console.log(copyTextName)
        copyText.totalTaglines = 3;
        copyText.currentApiId = apiID;
        switch( apiID )
        {
            case 1:
                copyText.hasValueAnimation = true;
                break;
            case 2:
                copyText.hasNumberAnimation = true;
                break;
        }
        if( staticData[ copyTextName ].number )
        {
            copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
            copyText.number = parseInt( staticData[ copyTextName ].number );
        }
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                copyText.values.push( staticData[ copyTextName ].values[ti] );
                if( copyText.longestValueSize < staticData[ copyTextName ].values[ti].length )
                    copyText.longestValueSize = staticData[ copyTextName ].values[ti].length;
            }
        }
        copyText.tagline = staticData[ copyTextName ].tagline;
        mack.vars.tagline = copyText;
        mack.vars.values = copyText.values;
//        copyTextArray.push( copyText );
    }*/

   /* function PrepareNYTimesTagline( apiID )
    {
        var copyText;
        var copyTextName;


        // NYTIMES taglines
        copyText = copyTextArray[2];
        copyText.Reset();

//        copyText = new CopyDecl();
        var copyTextName = "nytimes" + apiID + "Json";
        console.log(copyTextName)
        copyText.totalTaglines = 5;
        copyText.currentApiId = apiID;
        switch( apiID )
        {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                copyText.hasNumberAnimation = true;
                break;
        }
        if( staticData[ copyTextName ].number )
        {
            copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
            copyText.number = parseInt( staticData[ copyTextName ].number );
        }
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                copyText.values.push( staticData[ copyTextName ].values[ti] );
            }
        }
        copyText.tagline = staticData[ copyTextName ].tagline;
        mack.vars.tagline = copyText;
        mack.vars.values = copyText.values;
//        copyTextArray.push( copyText );
    }
*/

  /*  function PrepareAmazonTagline( apiID )
    {
        var copyText;
        var copyTextName;
        var apiID = 4;
        // AMAZON taglines
        copyText = copyTextArray[3];
        copyText.Reset();

//        copyText = new CopyDecl();
        var copyTextName = "amazon" + apiID + "Json";
        console.log(copyTextName)
        copyText.totalTaglines = 4;
        copyText.currentApiId = apiID;
        switch( apiID )
        {
            case 1:
            case 2:
            case 3:
            case 4:
                copyText.hasNumberAnimation = true;
                break;
        }
        if( staticData[ copyTextName ].number )
        {
            copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
            copyText.number = parseInt( staticData[ copyTextName ].number );
        }
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                copyText.values.push( staticData[ copyTextName ].values[ti] );
            }
        }
        copyText.tagline = staticData[ copyTextName ].tagline;
        mack.vars.tagline = copyText;
mack.vars.values = copyText.values;
//        copyTextArray.push( copyText );
    }
*/

   /* function PrepareLastFMTagline( apiID )
    {
        var copyText;
        var copyTextName;

        // LASTFM taglines
        copyText = copyTextArray[4];
        copyText.Reset();

//        copyText = new CopyDecl();
        var copyTextName = "lastfm" + apiID + "Json";
        console.log(copyTextName)
        copyText.totalTaglines = 4;
        copyText.currentApiId = apiID;
        switch( apiID )
        {
            case 2:
            case 3:
            case 5:
                copyText.hasNumberAnimation = true;
                break;
        }
        if( staticData[ copyTextName ].number )
        {
            copyText.numberPrecision = staticData[ copyTextName ].number.toString().length;
            copyText.number = parseInt( staticData[ copyTextName ].number );
        }
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                copyText.values.push( staticData[ copyTextName ].values[ti] );
            }
        }
        copyText.tagline = staticData[ copyTextName ].tagline;
        mack.vars.tagline = copyText;
        mack.vars.values = copyText.values;

        // This is specific for one of lastfm lines. Replace several values in one sentence
        if( staticData[ copyTextName ].values )
        {
            for( var ti=0; ti<staticData[ copyTextName ].values.length; ti++ )
            {
                var torepl = "{value_" + (ti+1) + "}";
                copyText.tagline = copyText.tagline.replace( torepl, copyText.values[ti] );
            }
        }

        mack.vars.tagline = copyText;
        mack.vars.values = copyText.values;
//        copyTextArray.push( copyText );
    }*/


    function AnimateCopyTextByNumber( api, str, frameTime_, timeToAnimate )
    {
        var firstNumber = api.number;
        var lastNumber = firstNumber;

        var displayTime = 2+8+2; // fade in, on-screen and fade out total time
        switch( logoIndex )
        {
             case 5: // GETTY
                if( api.currentApiId == 1 )
                    lastNumber = firstNumber + (7 * (displayTime/2.0));
//                else if( api.currentApiId == 2 )
//                    firstNumber = lastNumber - 80;
                else if( api.currentApiId == 3 )
                    lastNumber = firstNumber + (6 * (displayTime/2.5));
                break;

            case 0:
                if( api.currentApiId == 1 )
                    lastNumber = firstNumber + (7 * (displayTime/2.0));
//                else if( api.currentApiId == 2 )
//                    firstNumber = lastNumber - 80;
                else if( api.currentApiId == 3 )
                    lastNumber = firstNumber + (6 * (displayTime/2.5));
                break;
            case 1:
                if( api.currentApiId == 2 )
                    lastNumber = firstNumber + (6 * (displayTime/2.0));
                break;
            //
            case 2:
                if( api.currentApiId == 1 )
                    lastNumber = firstNumber + (20 * (displayTime/0.5));
                else if( api.currentApiId == 2 )
                    lastNumber = firstNumber + (4 * (displayTime/2.0));
                else if( api.currentApiId == 3 )
                    lastNumber = firstNumber + (4 * (displayTime/2.0));
                else if( api.currentApiId == 4 )
                    lastNumber = firstNumber + (2 * (displayTime/4.0));
                else if( api.currentApiId == 5 )
                    lastNumber = firstNumber + (2 * (displayTime/4.0));
                break;
            //
            case 3:
                if( api.currentApiId == 1 )
                    lastNumber = firstNumber + (80 * (displayTime/1.0));
                else if( api.currentApiId == 2 )
                    lastNumber = firstNumber + (40 * (displayTime/1.0));
                else if( api.currentApiId == 3 )
                    lastNumber = firstNumber + (40 * (displayTime/1.0));
                else if( api.currentApiId == 4 )
                    lastNumber = firstNumber + (40 * (displayTime/1.0));
                break;
            //
            case 4:
                if( api.currentApiId == 2 )
                    lastNumber = firstNumber + (20 * (displayTime/2.0));
                else if( api.currentApiId == 3 )
                    lastNumber = firstNumber + (50 * (displayTime/3.0));
                else if( api.currentApiId == 5 )
                    lastNumber = firstNumber + (10 * (displayTime/1.0));
                break;
        }

        api.animatedNumber = Lerp( firstNumber, lastNumber, api.currentTime/timeToAnimate );
        api.animatedNumber = parseInt( Math.round( Clamp( api.animatedNumber, firstNumber, lastNumber ) ) );

        var numStr = "";
        numStr += api.animatedNumber;

        str = str.replace( "{number}", numStr ); //api.animatedNumber );
        return str;
    }

    function AnimateCopyTextByValue( api, str, frameTime_, timeToAnimate )
    {

        var currentValueIndex = EaseOutCubic( api.currentTime, 0.0, api.values.length, timeToAnimate );
        currentValueIndex = parseInt( Math.round( Clamp( currentValueIndex, 0, api.values.length-1 ) ) );
        str = str.replace( "{value}", api.values[ currentValueIndex ] );
        return str;
    }

    function AnimateCopyTextByValue_Twitter1( api, frameTime_, timeToAnimate )
    {
        var currentValueIndex = (api.currentTime*17) % api.values.length;
        currentValueIndex = parseInt( Math.round( Clamp( currentValueIndex, 0, api.values.length-1 ) ) );

        var taglineSubStr = api.tagline.substr( 9, api.tagline.length );
        textFieldTwitterHandle.text( "@" + api.values[ currentValueIndex ] );
        textFieldTwitterText.text( taglineSubStr );

        str = "";
        return str;
    }

    function AnimateCopyText( apiIndex_, frameTime_, timeToAnimate_ )
    {
        
        var api = copyTextArray[ apiIndex_ ];

        var str = "";

        // If only number animation
        if( api.hasNumberAnimation && !api.hasValueAnimation )
        {
            str = api.tagline;
            str = str.replace( "{value}", api.values[0] );
            str = AnimateCopyTextByNumber( api, str, frameTime_, timeToAnimate_ );
        }
        // If only value animation
        if( !api.hasNumberAnimation && api.hasValueAnimation )
        {
            // on twitter we keep cycling through the handles
            if( apiIndex_ == 1 && api.currentApiId == 1 )
            {
                str = api.tagline;
                //str = str.replace( "{number}", api.number );
                str = AnimateCopyTextByValue_Twitter1( api, str, frameTime_, timeToAnimate_ );
            }
            else
            {
                str = api.tagline;
                str = str.replace( "{number}", api.number );
                str = AnimateCopyTextByValue( api, str, frameTime_, timeToAnimate_ );
            }
        }
        // If both value and number animations
        if( api.hasNumberAnimation && api.hasValueAnimation )
        {
            str = api.tagline;
            str = AnimateCopyTextByNumber( api, str, frameTime_, timeToAnimate_ );
            str = AnimateCopyTextByValue( api, str, frameTime_, timeToAnimate_ );
            LOG( "both value+number: " + str );
        }
        // If none value and number animations
        if( !api.hasNumberAnimation && !api.hasValueAnimation )
        {
            str = api.tagline.replace( "{number}", api.number );
            str = str.replace( "{value}", api.values[0] );
        }

        api.currentTime += frameTime_;

        return str;
    }

    function BottomTextAnimation( time )
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
        var fadetm1 = Math.min( 2.0, fadet0 );

        var fadein1 = Smoothstep( fadet0, fadet1, time );
        var fadeout1 = 1.0 - Smoothstep( fadet2, fadet3, time );
        var fadein2 = Smoothstep( fadet3, fadet4, time );
        var fadeout2 = 1.0 - Smoothstep( fadet5, fadet6, time );

        if( time >= 0.0 && time < fadetm1 )
        {
            var timeScaled = time*0.4;
            var lll = Clamp( statsText.css("opacity")-timeScaled, 0.0, 1.0 );
            var lll2 = Clamp( logo.css("opacity")-timeScaled, 0.0, 1.0 );
            statsText.css({ "display": "block", "opacity": lll });
            statsTwitter.css({ "display": "block", "opacity": lll });
            logo.css({"display": "block", "opacity": lll2 });
        }
        else if( time >= fadetm1 && time < fadet2 )
        {
            // Animate bottom text
            if( time >= fadet0 )
            {
                // Animate bottom text
                if( logoIndex == 1 )
                {
                    if( copyTextArray[logoIndex].currentApiId == 1 )
                    {
                        AnimateCopyText( logoIndex, frameTime, (fadet2-fadet0)*4 );
                        textFieldChildrenP.text( "" );
                        statsTwitter.css( "opacity", fadein1 );
                        statsText.css("opacity", 0.0 );
                    }
                    else
                    {
                        statsTwitter.css( "opacity", 0.0 );
                        var tagline = AnimateCopyText( logoIndex, frameTime, (fadet2-fadet0)*4 );
                        textFieldChildrenP.text( tagline );
                    }
                }
                else
                {
                    var tagline = AnimateCopyText( logoIndex, frameTime, (fadet2-fadet0)*4 );
                    textFieldChildrenP.text( tagline );
                }
            }

            if( logoIndex !== 1 )
                statsText.css("opacity", fadein1 );
            if( logoIndex === 1 && copyTextArray[logoIndex].currentApiId != 1 )
                statsText.css("opacity", fadein1 );
        }
        else if( time >= fadet2 && time < fadet3 )
        {
            // Animate bottom text
            if( logoIndex == 1 )
            {
                if( copyTextArray[logoIndex].currentApiId == 1 )
                {
                    AnimateCopyText( logoIndex, frameTime, (fadet2-fadet0)*4 );
                    statsTwitter.css( "opacity", fadeout1 );
                    statsText.css("opacity", 0.0 );
                }
                else
                {
                    var tagline = AnimateCopyText( logoIndex, frameTime, (fadet2-fadet0)*4 );
                    textFieldChildrenP.text( tagline );
                    statsText.css("opacity", fadeout1 );
                }
            }
            else
            {
                var tagline = AnimateCopyText( logoIndex, frameTime, (fadet2-fadet0)*4 );
                textFieldChildrenP.text( tagline );
                statsText.css("opacity", fadeout1 );
            }
        }
        else if( time >= fadet3 && time < fadet4 )
        {
            statsText.css("opacity", fadeout1 );
            logo.css("opacity", fadein2 );
        }
        else if( time >= fadet5 && time < fadet6 )
        {
            statsText.css("opacity", fadeout1 );
            logo.css("opacity", fadeout2 );
        }
    }


    function ResetTaglines()
    {
        for( var i=0; i<copyTextArray.length; i++ )
            copyTextArray[i].Restart();
    }
