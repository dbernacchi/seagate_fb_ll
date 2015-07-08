var preloader = $('#preloader');
var menu = $('#menu');
var menuItem = menu.find('ul').children('li');
var menuB = $('.bigMenuB #menu');
var menuItemB = menuB.find('ul').children('li');
var muteButton = $("#audio")
var audioMuted = false;
var cameraControls = $('#leftControls span.circle');
var cameraControlsB = $('.bigMenuB #leftControls span.circle');



$(document).ready(function()
{
  
  //this ensures the script is loaded before we proceed
  llScriptReady.resolve();
  
  if(rcLocaleJSDirectory != 'facebook'){
 
    llBootstrap();
    
  }
  
});


function llBootstrap(){
  
  // check for safari

  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      // Chrome
    } else {
      // Safari
      $('#text #bottomText #statsTwitter p #twitterText').css('bottom', '-1px');
    }
  }

  // camera click handlers
  if (device.mobile() || device.tablet()) {
    cameraControls.on('touchstart', function() {
      var index = $(this).parent('li').index() - 2;
      console.log('+++ Camera Position: ' + index);
      /*alert('clicked')*/

      for (var i = 0; i < cameraControls.length; i++) {
        cameraControls.eq(i).removeClass('cameraActive' + i);
      }

      $(this).addClass('cameraActive' + index);
      if (mack.vars.isKosher) {
        SetCameraPosition(index);
      }

    });

    cameraControlsB.on('touchstart', function() {
      var index = $(this).parent('li').index() - 2;
      console.log('+++ Camera Position: ' + index);
      /*alert('clicked')*/

      for (var i = 0; i < cameraControlsB.length; i++) {
        cameraControlsB.eq(i).removeClass('cameraActive' + i);
      }

      $(this).addClass('cameraActive' + index);
      if (mack.vars.isKosher) {
        SetCameraPosition(index);
      }

    });

  } else {
    cameraControls.on('click', function() {
      var index = $(this).parent('li').index() - 2;
      console.log('+++ Camera Position: ' + index);
      /*alert('clicked')*/

      for (var i = 0; i < cameraControls.length; i++) {
        cameraControls.eq(i).removeClass('cameraActive' + i);
      }

      $(this).addClass('cameraActive' + index);
      if (mack.vars.isKosher) {
        SetCameraPosition(index);
      }

    });

    cameraControlsB.on('click', function() {
      var index = $(this).parent('li').index() - 2;
      console.log('+++ Camera Position: ' + index);
      /*alert('clicked')*/

      for (var i = 0; i < cameraControlsB.length; i++) {
        cameraControlsB.eq(i).removeClass('cameraActive' + i);
      }

      $(this).addClass('cameraActive' + index);
      if (mack.vars.isKosher) {
        SetCameraPosition(index);
      }

    });


  }


  cameraControls.on('mouseenter', function() {
    Klang.triggerEvent('menu_over');
  });
  cameraControlsB.on('mouseenter', function() {
    Klang.triggerEvent('menu_over');
  });

  /*cameraControls.on('click', function () {
   Klang.triggerEvent('menu_click');
   });*/


  window.setTimeout(function() {
    $('#bottomText').css('display', 'block');
  }, 5000);

  // Mute audio
  muteButton.bind('click', function()
  {
    //        LOG( "mute audio" );
    if (audioMuted)
    {
      mack.playCanAudio();
      Klang.triggerEvent('sound_on');
      audioMuted = false;
      $(this).css('background', "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTUuMjMzIDMuMDY4bC0uNjYuODAyYzEuMjM0IDEuMzQ4IDIuMDE3IDMuMTQyIDIuMDE3IDUuMTE0IDAgMS45NjctLjc3OCAzLjc2LTIuMDEyIDUuMTA1bC42NjEuODIyYzEuNDA2LTEuNTg2IDIuMjYxLTMuNjM1IDIuMjYxLTUuOTI4IDAtMi4yODctLjg2My00LjMzMS0yLjI2Ny01LjkxNXptLTEuNzU0IDEuNjRsLS41ODguODQ4Yy44NzMuODc4IDEuNDI5IDIuMDkgMS40MjkgMy40MjggMCAxLjM2NC0uNTc4IDIuNTk5LTEuNDgzIDMuNDgxbC42MTEuODEyYzEuMDk2LTEuMTE3IDEuNzU1LTIuNjA1IDEuNzU1LTQuMjkzIDAtMS42NTctLjY2NC0zLjE2My0xLjcyNC00LjI3NnptLTEuNzMzIDEuNzE3bC0uNDcyLjk2Yy40NS4zODYuNzM2Ljk1OC43MzYgMS41OTcgMCAuNzAzLS4xNjIgMS4zNC0uNjkyIDEuNzIzbC40NTUuODA5Yy42OTQtLjYxOSAxLjEzMy0xLjUyNCAxLjEzMy0yLjUzIDAtMS4wMi0uNDQ5LTEuOTM1LTEuMTYtMi41NTl6IiBmaWxsPSIjYmJiIi8+PC9zdmc+')")
    }
    else
    {
      mack.pauseAll();
      Klang.triggerEvent('sound_off');
      audioMuted = true;
      $(this).css('background', "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTMuNjk2IDlsMS4wNjUtMS4wNjZjLjA3LS4wNjkuMDctLjE4MSAwLS4yNWwtLjM3NS0uMzc2Yy0uMDY4LS4wNjctLjE4My0uMDY3LS4yNSAwbC0xLjA2NiAxLjA2NC0xLjA2NC0xLjA2NWMtLjA3LS4wNjctLjE4Mi0uMDY3LS4yNTEgMGwtLjM3NC4zNzZjLS4wNy4wNy0uMDcuMTgxIDAgLjI1bDEuMDY0IDEuMDY3LTEuMDY0IDEuMDYzYy0uMDcuMDY5LS4wNy4xODIgMCAuMjUxbC4zNzQuMzc2Yy4wNjkuMDcuMTgxLjA3LjI1MSAwbDEuMDY0LTEuMDY0IDEuMDY2IDEuMDY0Yy4wNjcuMDcuMTgyLjA3LjI1IDBsLjM3NS0uMzc2Yy4wNy0uMDY5LjA3LS4xODIgMC0uMjUxbC0xLjA2NS0xLjA2M3oiIGZpbGw9IiNiYmIiLz48L3N2Zz4=')")
    }
  });
  muteButton.on('mouseenter', function()
  {
    Klang.triggerEvent('menu_over');
  });
  muteButton.on('click', function()
  {
    Klang.triggerEvent('menu_click');
  });


  if (!Environment.isIe()) {


    //
    // Handle menu calls
    //

    // Getty
    if(menuItem.length){
      menuItem[0].addEventListener('click', function(e)
      {
        e.preventDefault();
        ;
        GettyCallFunc_WebGL();
      });

      // Instagram
      menuItem[1].addEventListener('click', function(e)
      {
        e.preventDefault();
        InstagramCallFunc_WebGL();
      });
      // Twitter
      menuItem[2].addEventListener('click', function(e)
      {
        e.preventDefault();
        TwitterCallFunc_WebGL();
      });
      // New york times
      menuItem[3].addEventListener('click', function(e)
      {
        e.preventDefault();
        NYTCallFunc_WebGL();
      });
      // Amazon
      menuItem[4].addEventListener('click', function(e)
      {
        e.preventDefault();
        AmazonCallFunc_WebGL();
      });
      // Last.fm
      menuItem[5].addEventListener('click', function(e)
      {
        e.preventDefault();
        LastFMCallFunc_WebGL();
      });


      // Getty
      menuItemB[0].addEventListener('click', function(e)
      {
        e.preventDefault();

        GettyCallFunc_WebGL();
      });

      // Instagram
      menuItemB[1].addEventListener('click', function(e)
      {
        e.preventDefault();
        InstagramCallFunc_WebGL();
      });
      // Twitter
      menuItemB[2].addEventListener('click', function(e)
      {
        e.preventDefault();
        TwitterCallFunc_WebGL();
      });
      // New york times
      menuItemB[3].addEventListener('click', function(e)
      {
        e.preventDefault();
        NYTCallFunc_WebGL();
      });
      // Amazon
      menuItemB[4].addEventListener('click', function(e)
      {
        e.preventDefault();
        AmazonCallFunc_WebGL();
      });
      // Last.fm
      menuItemB[5].addEventListener('click', function(e)
      {
        e.preventDefault();
        LastFMCallFunc_WebGL();
      });
    }
  }

  //
  // Preloader message fade in
  //
  preloader.fadeTo(3000, 1);
  //    statsText.css("opacity", 0.0 );
  //    logo.css("opacity", 0.0 );


  //
  // Create WebGL renderer and load data
  //
  /*CreateRenderer();*/


  if (LoadData) {

    LoadData();

  } else {

    mack.LoadData();
  }
  

}