var poo = function(txt) {
  /*console.log(txt)*/
}
var awe = function(txt) {
  /*alert(txt)*/
}
/* Check for Path mobile vs awesome*/
var windowWidth = window.screen.width < window.outerWidth ?
        window.screen.width : window.outerWidth;
var Environment = {
  //mobile or desktop compatible event name, to be used with '.on' function
  TOUCH_DOWN_EVENT_NAME: 'mousedown touchstart',
  TOUCH_UP_EVENT_NAME: 'mouseup touchend',
  TOUCH_MOVE_EVENT_NAME: 'mousemove touchmove',
  TOUCH_DOUBLE_TAB_EVENT_NAME: 'dblclick dbltap',
  isFire: function() {
    return (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
  },
  isAndroid: function() {
    return navigator.userAgent.match(/Android/i);
  },
  isBlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  isIOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  isOpera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  isWindows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  isSafari: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        // Chrome
        return false;
      } else {
        // Safari
        return true;
      }
    }

  },
  isChrome: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        // Chrome
        return true;
      } else {
        // Safari
        return false;
      }
    }
  },
  checkWin: function() {

  },
  windowWhat: function() {
    /*var ua = navigator.userAgent.toLowerCase();
     var isWinXP = ua.indexOf('windows nt 5.1') > 0;   */
    var OSName = null;
    if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
      OSName = "Windows 8";
    if (navigator.appVersion.indexOf("Windows NT 6.1") != -1)
      OSName = "Windows 7";
    if (navigator.appVersion.indexOf("Windows NT 6.0") != -1)
      OSName = "Windows Vista";
    if (navigator.appVersion.indexOf("Windows NT 5.1") != -1)
      OSName = "Windows XP";
    if (navigator.appVersion.indexOf("Windows NT 5.0") != -1)
      OSName = "Windows 2000";
    if (navigator.appVersion.indexOf("Mac") != -1)
      OSName = "Mac/iOS";
    if (navigator.appVersion.indexOf("X11") != -1)
      OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1)
      OSName = "Linux";
    if (OSName) {
      /*if(OSName == "Windows XP" || OSName == "Windows Vista"){
       return OSName;
       } else {
       return false;
       }*/
      return OSName;
    } else {
      return false;
    }

  },
  chromeCheck: function() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
      return true;
    }
  },
  isIe: function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 12);
    }
    // other browser
    return false;
  },
  ieGrown: function() {
    var ieVz = 0;
    if (!!navigator.userAgent.match(/Trident\/7.0/)) {

      ieVz = 11;
    }
    if (!!navigator.userAgent.match(/Trident\/6.0/)) {
      ieVz = 10;
    }

    if (!ieVz) {
      return false;

    } else {
      /*alert(ieVz)*/
      return ieVz;
    }


  },
  isMobile: function() {
    return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
  }
};

/*var json05Files = [0, 0, 0];*/
var json05Files = [0, 0];
var json00Files = [0, 0, 0];
var json01Files = [0, 0, 0];
var json02Files = [0, 0, 0, 0, 0];
var json03Files = [0, 0, 0, 0];
var json04Files = [0, 0, 0, 0, 0];

var ieMe = {
  insta: function() {
    if (Environment.isIe() && Environment.isIe() <= 9) {
      var apiID = FindValidAPIID(json00Files);

      mack.vars.logoIndex = 0;
      PrepareInstagramTagline(apiID);
      mack.setGif('insta_v06.gif', $(this));
      $('.nmb').css('opacity', '0.5').addClass('avoid-clicks')
      /*$('#stats').stop()*/
      /*$('#logo').stop( true, true )*/

      mack.apiText();
    }
  },
  nyt: function() {
    if (Environment.isIe() && Environment.isIe() <= 9) {
      var apiID = FindValidAPIID(json02Files);
      mack.vars.logoIndex = 2;
      PrepareNYTimesTagline(apiID)
      mack.setGif('nyt_v06.gif', $(this))
      $('.nmb').css('opacity', '0.5').addClass('avoid-clicks')
      mack.apiText();
    }
  },
  twt: function() {
    if (Environment.isIe() && Environment.isIe() <= 9) {
      var apiID = FindValidAPIID(json01Files);
      mack.vars.logoIndex = 1;
      PrepareTwitterTagline(apiID)
      mack.setGif('twt_v06.gif', $(this))
      $('.nmb').css('opacity', '0.5').addClass('avoid-clicks')
      mack.apiText();
    }
  },
  amz: function() {
    if (Environment.isIe() && Environment.isIe() <= 9) {
      var apiID = FindValidAPIID(json03Files);
      mack.vars.logoIndex = 3;
      PrepareAmazonTagline(apiID);
      mack.setGif('amz_v06.gif', $(this))
      $('.nmb').css('opacity', '0.5').addClass('avoid-clicks')
      mack.apiText();
    }

  },
  lastf: function() {
    if (Environment.isIe() && Environment.isIe() <= 9) {
      var apiID = FindValidAPIID(json04Files);
      mack.vars.logoIndex = 4;
      PrepareLastFMTagline(apiID)
      $('.nmb').css('opacity', '0.5').addClass('avoid-clicks')
      mack.apiText();
      mack.setGif('last_v06.gif', $(this))
    }

  },
  getty: function() {
    if (Environment.isIe() && Environment.isIe() <= 9) {
      //alert('in ie')
      var apiID = FindValidAPIID(json05Files);

      mack.vars.logoIndex = 5;
      PrepareGettyTagline(apiID)
      $('.nmb').css('opacity', '0.5').addClass('avoid-clicks')
      mack.apiText();
      mack.setGif('getty_v06.gif', $(this))
    }

  }
};





if (Environment.isIe() && Environment.isIe() <= 9) {
} else {
  $(function() {
    function clamp(x, a, b) {
      if (x < a)
        return a;
      else if (x > b)
        return b;
      else
        return x;
    }

    var timeout = null;
    if (Environment && Environment.isIe()) {

    } else {
      $('#ll-slider').on('input', function(e) {
        var ratio = parseInt(this.value) / 1000;
        $('#ll-ratio').text(~~(100 * ratio) + '%');
        HappyTree.canvas.set_performance(ratio);
      });
    }

    // fade in everything from transparent
    //$('#ll-canvas-container').animate({ opacity: 1 }, 3000);
  });
}

function setSmall() {
  return 640;
}
var mack = {
  vars: {
    small: setSmall(),
    cam: 0,
    canDelay: 10,
    gapTime: 6000,
    startGap: 9500
  },
  init: function() {

    if (!mack.vars.isKosher) {
      $('.zoom-icon').css({
        display: 'none'
      })
    }

    var box = $(".gifMe");

    var windowWidth = window.screen.width < window.outerWidth ?
            window.screen.width : window.outerWidth;


    if (mack.vars.isKosher && !Environment.isMobile()) {
      /*Enable Sound */

      mack.audioMagic();

      Klang.init(rootPath + 'sounds/config.json?1', function() 
      {
        // Klang ready
        if (!device.mobile() && !device.tablet()) 
        {
          switch (logoIndex) {
            case 0:
              Klang.triggerEvent('instagram_start');
              break;
            case 1:
              Klang.triggerEvent('twitter_start');
              break;
            case 2:
              Klang.triggerEvent('times_start');
              break;
            case 3:
              Klang.triggerEvent('amazon_start');
              break;
            case 4:
              Klang.triggerEvent('last_start');
              break;
            case 5:

              Klang.triggerEvent('getty_start');
              break;
            default:
          }
        }

        // Now move on to mainloop
      }, function(percent) 
      {
        //poo('Klang progress:', percent)
      })
      /**/
      TweenLite.set($('.bigMenu #menu'), {
        display: 'none',
        opacity: 0
      })
      TweenLite.to($('.bigMenu, #leftControls, #bottomText'), 2, {
        opacity: 1,
        display: 'block',
        onComplete: mack.setControls
      });

      //  if (rcLocaleJS != "featureOn") {
      var loadAll = true;
      if (loadAll == true) {
        TweenLite.to($('.bigMenu #menu, .bigMenuB #menu'), 1, {
          opacity: 1,
          display: 'block'
        })

        //Bellow bit was added

        $('.nmb#menu').css({
          display: 'block'
        })

        //Added the portion above 

      } else {
        TweenLite.to($('.bigMenu #menu'), 1, {
          opacity: 1,
          display: 'block',
        })
      }
      $('.whatIs').html('webgl')

      switch (mack.vars.logoIndex) {
        case 0:
          var apiID = FindValidAPIID(json00Files);
          PrepareInstagramTagline(apiID);
          break;
        case 1:
          var apiID = FindValidAPIID(json01Files);
          PrepareTwitterTagline(apiID);
          break;
        case 2:
          var apiID = FindValidAPIID(json02Files);
          PrepareNYTimesTagline(apiID);
          break;
        case 3:
          var apiID = FindValidAPIID(json03Files);
          PrepareAmazonTagline(apiID);
          break;
        case 4:
          var apiID = FindValidAPIID(json04Files);
          PrepareLastFMTagline(apiID);
          break;
        case 5:

          //alert('go getty')
          if (Environment.isIe() && Environment.isIe() <= 9) {

            //      alert('go ie')

          }
          var apiID = FindValidAPIID(json05Files);
          PrepareGettyTagline(apiID);
          /*   alert('setting getty')*/
          mack.setGif('getty_v06.gif');


          break;
        case 6:

          //alert('go getty')
          if (Environment.isIe() && Environment.isIe() <= 9) {

            //      alert('go ie')

          }

          //PrepareFacebookTagline(1);

          mack.setGif('getty_v06.gif');


          break;

      }
      CreateRenderer();
      DoIt()

      MainLoop();


      TweenLite.to($('#fullscreen'), 0.2, {
        display: 'block',
        opacity: 1
      })


      $('#ll-canvas-container').css({
        display: 'none'
      })
      TweenLite.to($('#glContainer'), 0.1, {
        opacity: 1,
        display: 'block'
      })



      TweenLite.to($('.mainStage'), 0.21, {
        position: 'relative',
        top: '-140px'
      })

      var top = '350px';

      if (rcLocaleJSDirectory == 'facebook') {
        
        top = (window.innerHeight * .85) - 80;
        
        top += 'px';

      }

      TweenLite.to($('#text #bottomText'), 0.2, {
        top: top
      })

      mack.superSizeMeGL();
      $(window).on('resize', mack.superSizeMeGL)
      mack.peepShow();

      //ENDOF if (mack.vars.isKosher && !Environment.isMobile()) {
    } else {

        TweenLite.to($('#text #bottomText'), 0.2, {
          top: '410px'
        })

        if (Environment.isFire() || Environment.isIe() == 10 || Environment.isIe() == 11) {

          $('#ll-canvas-container').css({
            'background-color': '#f7f7f7',
            'background-image': '-moz-radial-gradient(50% 35%, ellipse cover, #f7f7f7, #b6b6b6 99%)',
            'backgroundImage': '-webkit-radial-gradient(50% 35%, ellipse cover, #f7f7f7, #6b6b6b 99%)',
            'backgroundImage': '-o-radial-gradient(50% 35%, ellipse cover, #f7f7f7, #6b6b6b 99%)',
                    'backgroundImage': '-ms-radial-gradient(50% 35%, ellipse cover, #f7f7f7, #6b6b6b 99%)',
                    'backgroundImage': 'radial-gradient(50% 35%, ellipse cover, #f7f7f7, #6b6b6b 99%)'
          });
        }
        if (Environment.isIe() >= 10) {
          // alert('fii')

          $('#ll-canvas-container').css({
            'background': '#F9F9F9',
            /* Old browsers */
            'background': '-moz-radial-gradient(center, ellipse cover,  #F9F9F9 0%, #DBDBDB 100%)',
                    /* FF3.6+ */
                    'background': '-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#F9F9F9), color-stop(100%,#DBDBDB))',
                    /* Chrome,Safari4+ */
                    'background': '-webkit-radial-gradient(center, ellipse cover,  #F9F9F9 0%,#DBDBDB 100%)',
                    /* Chrome10+,Safari5.1+ */
                    'background': '-o-radial-gradient(center, ellipse cover,  #F9F9F9 0%,#DBDBDB 100%)',
                    /* Opera 12+ */
                    'background': '-ms-radial-gradient(center, ellipse cover,  #F9F9F9 24%,  #F9F9F9 24%,#DBDBDB 100%)',
                    /* IE10+ */
                    'background': 'radial-gradient(ellipse at center,  #F9F9F9 24%,#F9F9F9 24%,#DBDBDB 100%)',
                    /* W3C */
                    'filter': "progid:DXImageTransform.Microsoft.gradient( startColorstr='#F9F9F9', endColorstr='#DBDBDB',GradientType=1 )"
                    /* IE6-9 fallback on horizontal gradient */
          })
        }
        if (Environment.isIe() && Environment.isIe() <= 9) {
          //alert('going old ie')

          /*alert('catching ie'+Environment.isIe())*/
          /*mack.hotZone();*/

          $('#leftControls').hide();
          $('#leftControls').css({
            opacity: 0
          });

          $('section#bottomText').css({
            top: '340px!important'
          })


          $('#menu').css({
            top: '35px',
            opacity: '1!important'
          })
          /* alert('setting')*/
          $('#ll-canvas-container').css({
            display: 'none'
          })
          $('#leftControls li').css({
            border: 'none'
          })

          $('.hotZone').css({
            height: '500px'
          })
          $('.gifMe').css({
            height: '340px'
          })
          $('.bigMenu, .gifMe, #bottomText').css({
            opacity: 1,
            display: 'block'
          });

          //  if (rcLocaleJS != "featureOn") {
          var loadAll = true;
          if (loadAll == true) {
            $('.bigMenu #menu, .bigMenuB #menu').css({
              opacity: 1,
              display: 'block'
            });
          }

          $('#bottomText #logo').html('<img src="' + rootPath + 'images/Seagate_TextLockup.png">').css({
            'background': 'none',
            'background-image': 'none',
            'width': '200px',
            'margin': 'auto',
            'top': '40px'
          })

          $('#leftControls, #ll-canvas-container, #rightControls').css({
            display: 'none!important'
          });

          switch (mack.vars.logoIndex) {
            case 0:
              ieMe.insta()
              /* $('.insta').trigger( "click" );*/
              break;
            case 1:
              ieMe.twt()
              /*$('.twt').trigger( "click" );*/
              break;
            case 2:
              ieMe.nyt()
              /* $('.nyt').trigger( "click" );*/
              break;
            case 3:
              ieMe.amz()
              /*$('.amz').trigger( "click" );*/
              break;
            case 4:
              ieMe.lastf()
              /*$('.lastF').trigger( "click" );*/
              break;
            case 5:

              ieMe.getty()
              /*$('.lastF').trigger( "click" );*/
              break;
          }

          $('#text #bottomText').css({
            opacity: 1,
            display: 'block'
          });
          mack.bringGif();
          $('.gifMe').css({
            top: '-205px'
          })
          /*$('#stats').css({'display':'block'});*/


          // alert('settz')


        } else {

          if (Environment.isMobile()) {

            TweenLite.to($('#audio'), 0.1, {
              'display': 'none'
            })

          } else {


            /*Enable Sound */
            if (Environment && Environment.ieGrown()) {

            } else {
              Klang.init(rootPath + 'sounds/config.json', function() {
                // Klang ready
                if (!device.mobile() && !device.tablet()) {
                  switch (logoIndex) {
                    case 0:
                      $('.bInsta')[0].play()
                      /*Klang.triggerEvent( 'instagram_start' );*/
                      break;
                    case 1:
                      $('.bTwit')[0].play()
                      // Klang.triggerEvent( 'twitter_start' );
                      break;
                    case 2:
                      $('.bNyt')[0].play()
                      // Klang.triggerEvent( 'times_start' );
                      break;
                    case 3:
                      $('.bAmazon')[0].play()
                      //  Klang.triggerEvent( 'amazon_start' );
                      break;
                    case 4:
                      $('.bLast')[0].play()
                      // Klang.triggerEvent( 'last_start' );
                      break;
                    default:
                      $('.bLast')[0].play()
                      break;
                  }
                }

                // Now move on to mainloop
              }, function(percent) {
                //poo('Klang progress:', percent)
              })
            }
            /**/
          }

          TweenLite.to($('.bigMenu, #leftControls, #bottomText'), 2, {
            opacity: 1,
            display: 'block',
            onComplete: mack.setControls
          });
          TweenLite.set($('.bigMenu #menu'), {
            display: 'none',
            opacity: 0
          })
          //  if (rcLocaleJS != "featureOn") {
          var loadAll = true;
          if (loadAll == true) {
            TweenLite.to($('.bigMenu #menu, .bigMenuB #menu'), 1, {
              opacity: 1,
              display: 'block'
            })
          } else {
            TweenLite.to($('.bigMenu #menu'), 1, {
              opacity: 1,
              display: 'block',
            })
          }

          mack.vars.canvas = 1;
          mack.superSizeMe();
          $(window).on('resize', mack.superSizeMe)
          // set up canvas and start animation
          HappyTree.canvas.init();

          mack.peepShow();



          switch (mack.vars.logoIndex) {
            case 0:
              var apiID = FindValidAPIID(json00Files);
              PrepareInstagramTagline(apiID);
              HappyTree.canvas.set_api('instagram');
              break;
            case 1:
              var apiID = FindValidAPIID(json01Files);
              PrepareTwitterTagline(apiID);
              HappyTree.canvas.set_api('twitter');
              break;
            case 2:
              var apiID = FindValidAPIID(json02Files);
              PrepareNYTimesTagline(apiID);
              HappyTree.canvas.set_api('nyt');
              break;
            case 3:
              var apiID = FindValidAPIID(json03Files);
              PrepareAmazonTagline(apiID);
              HappyTree.canvas.set_api('amazon');
              break;
            case 4:
              var apiID = FindValidAPIID(json04Files);
              PrepareLastFMTagline(apiID);
              HappyTree.canvas.set_api('lastfm');
              break;
            case 5:
              var apiID = FindValidAPIID(json05Files);
              PrepareGettyTagline(apiID);
              HappyTree.canvas.set_api('getty');
              break;
          }
          HappyTree.canvas.set_camera(0); // note: camera isn't working yet
          HappyTree.canvas.start();

          $('#ll-canvas').trigger('mouseover')


          HappyTree.canvas.set_performance(1);



          /*mack.canApi(5)*/
          var timeout = null;



          // $(function(){
          /*$('.lastF').trigger( "click" );*/

          $(document).on('keydown', function(e) {
            switch (e.which - 48) {
              case 1:
                HappyTree.canvas.set_api('instagram');
                break;
              case 2:
                HappyTree.canvas.set_api('twitter');
                break;
              case 3:
                HappyTree.canvas.set_api('nyt');
                break;
              case 4:
                HappyTree.canvas.set_api('amazon');
                break;
              case 5:
                HappyTree.canvas.set_api('lastfm');
                break;
              case 6:
                HappyTree.canvas.set_api('getty');
                break;
            }
          });
          if (Environment.isIe() && Environment.isIe() <= 9) {

          } else {


            $('#ll-canvas').on('mousemove', function(e) {

              var box = $('#ll-canvas');
              var boxCenter = [box.offset().left + box.width() / 2, box.offset().top + box.height() / 2];

              var x = (e.pageX - boxCenter[0]) / 1000

              var y = (e.pageY - boxCenter[1]) / 1000

              HappyTree.canvas.set_rotation(-60 * y, 60 * x);

            });


            $('#ll-canvas').mouseleave(function(e) {

              if (timeout !== null) {
                clearTimeout(timeout);
              }

              switch (mack.vars.cam) {
                case 0:

                  HappyTree.canvas.set_rotation(0, 0)
                  break;
                case 1:

                  if (device.tablet()) {
                    HappyTree.canvas.set_rotation(0, 60)

                  } else {
                    HappyTree.canvas.set_rotation(0, -60)
                  }

                  break;
                case 2:

                  if (device.tablet()) {
                    HappyTree.canvas.set_rotation(60, 0)
                  } else {
                    HappyTree.canvas.set_rotation(60, -60)
                  }
                  break;
              }

            })
          }

        }

        if (Environment.isMobile()) {
          $('.nmb').removeClass('avoid-clicks')
        }
        if (Environment.isMobile() || windowWidth < 800) {

          if (windowWidth <= mack.vars.small) {

            mack.smallAnim()
          }

          $(".mNav").change(function() {
            var sKey = parseInt($(".mNav option:selected").attr('value'))
            if (mack.vars.tomsDone) {

              switch (sKey) {
                case 0:
                  $('.insta').trigger("click");
                  var apiID = FindValidAPIID(json00Files);
                  PrepareInstagramTagline(apiID)
                  mack.canApi(sKey + 1)


                  break;
                case 1:
                  var apiID = FindValidAPIID(json01Files);
                  $('.twt').trigger("click");
                  PrepareTwitterTagline(apiID)
                  mack.canApi(sKey + 1)

                  break;
                case 2:
                  var apiID = FindValidAPIID(json02Files);
                  $('.nyt').trigger("click");
                  PrepareNYTimesTagline(apiID)
                  mack.canApi(sKey + 1)

                  break;
                case 3:
                  var apiID = FindValidAPIID(json03Files);
                  $('.amz').trigger("click");
                  PrepareAmazonTagline(apiID)
                  mack.canApi(sKey + 1)

                  break;
                case 4:
                  var apiID = FindValidAPIID(json04Files);
                  $('.lastF').trigger("click");
                  PrepareLastFMTagline(apiID)
                  mack.canApi(sKey + 1)

                  break;
                case 5:
                  var apiID = FindValidAPIID(json05Files);
                  $('.getty').trigger("click");
                  PrepareGettyTagline(apiID)
                  mack.canApi(sKey + 1)

                  break;
                default:
                  break;

              }
            }

          })

          if (Environment.isIe() && Environment.isIe() <= 9) {
          } else {
            mack.bringCanvas();
            mack.winOrient();
          }
        } else {
          if (Environment.isIe() && Environment.isIe() <= 9) {
          } else {
            // alert('should be going canvas')
            mack.winOrient();
            mack.bringCanvas();
          }

        }
  
    }//ENDOF if (mack.vars.isKosher && !Environment.isMobile()) {} else


  }, audioMagic: function() {
    $('#audio').on('click', function(ev) {
      ev.stopPropagation();
      if ($(this).attr('muted')) {


        $('#audio').css({
          'background': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTUuMjMzIDMuMDY4bC0uNjYuODAyYzEuMjM0IDEuMzQ4IDIuMDE3IDMuMTQyIDIuMDE3IDUuMTE0IDAgMS45NjctLjc3OCAzLjc2LTIuMDEyIDUuMTA1bC42NjEuODIyYzEuNDA2LTEuNTg2IDIuMjYxLTMuNjM1IDIuMjYxLTUuOTI4IDAtMi4yODctLjg2My00LjMzMS0yLjI2Ny01LjkxNXptLTEuNzU0IDEuNjRsLS41ODguODQ4Yy44NzMuODc4IDEuNDI5IDIuMDkgMS40MjkgMy40MjggMCAxLjM2NC0uNTc4IDIuNTk5LTEuNDgzIDMuNDgxbC42MTEuODEyYzEuMDk2LTEuMTE3IDEuNzU1LTIuNjA1IDEuNzU1LTQuMjkzIDAtMS42NTctLjY2NC0zLjE2My0xLjcyNC00LjI3NnptLTEuNzMzIDEuNzE3bC0uNDcyLjk2Yy40NS4zODYuNzM2Ljk1OC43MzYgMS41OTcgMCAuNzAzLS4xNjIgMS4zNC0uNjkyIDEuNzIzbC40NTUuODA5Yy42OTQtLjYxOSAxLjEzMy0xLjUyNCAxLjEzMy0yLjUzIDAtMS4wMi0uNDQ5LTEuOTM1LTEuMTYtMi41NTl6IiBmaWxsPSIjYmJiIi8+PC9zdmc+')"
        }).removeAttr('muted')

        $('.fullscreen #audio').css({
          'background': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTUuMjMzIDMuMDY4bC0uNjYuODAyYzEuMjM0IDEuMzQ4IDIuMDE3IDMuMTQyIDIuMDE3IDUuMTE0IDAgMS45NjctLjc3OCAzLjc2LTIuMDEyIDUuMTA1bC42NjEuODIyYzEuNDA2LTEuNTg2IDIuMjYxLTMuNjM1IDIuMjYxLTUuOTI4IDAtMi4yODctLjg2My00LjMzMS0yLjI2Ny01LjkxNXptLTEuNzU0IDEuNjRsLS41ODguODQ4Yy44NzMuODc4IDEuNDI5IDIuMDkgMS40MjkgMy40MjggMCAxLjM2NC0uNTc4IDIuNTk5LTEuNDgzIDMuNDgxbC42MTEuODEyYzEuMDk2LTEuMTE3IDEuNzU1LTIuNjA1IDEuNzU1LTQuMjkzIDAtMS42NTctLjY2NC0zLjE2My0xLjcyNC00LjI3NnptLTEuNzMzIDEuNzE3bC0uNDcyLjk2Yy40NS4zODYuNzM2Ljk1OC43MzYgMS41OTcgMCAuNzAzLS4xNjIgMS4zNC0uNjkyIDEuNzIzbC40NTUuODA5Yy42OTQtLjYxOSAxLjEzMy0xLjUyNCAxLjEzMy0yLjUzIDAtMS4wMi0uNDQ5LTEuOTM1LTEuMTYtMi41NTl6IiBmaWxsPSIjYmJiIi8+PC9zdmc+')"
        }).removeAttr('muted')

      } else {

        $('#audio').css({
          'background': "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTMuNjk2IDlsMS4wNjUtMS4wNjZjLjA3LS4wNjkuMDctLjE4MSAwLS4yNWwtLjM3NS0uMzc2Yy0uMDY4LS4wNjctLjE4My0uMDY3LS4yNSAwbC0xLjA2NiAxLjA2NC0xLjA2NC0xLjA2NWMtLjA3LS4wNjctLjE4Mi0uMDY3LS4yNTEgMGwtLjM3NC4zNzZjLS4wNy4wNy0uMDcuMTgxIDAgLjI1bDEuMDY0IDEuMDY3LTEuMDY0IDEuMDYzYy0uMDcuMDY5LS4wNy4xODIgMCAuMjUxbC4zNzQuMzc2Yy4wNjkuMDcuMTgxLjA3LjI1MSAwbDEuMDY0LTEuMDY0IDEuMDY2IDEuMDY0Yy4wNjcuMDcuMTgyLjA3LjI1IDBsLjM3NS0uMzc2Yy4wNy0uMDY5LjA3LS4xODIgMC0uMjUxbC0xLjA2NS0xLjA2M3oiIGZpbGw9IiNiYmIiLz48L3N2Zz4=)"
        }).attr('muted', true)

        $('.fullscreen #audio').css({
          'background': "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTMuNjk2IDlsMS4wNjUtMS4wNjZjLjA3LS4wNjkuMDctLjE4MSAwLS4yNWwtLjM3NS0uMzc2Yy0uMDY4LS4wNjctLjE4My0uMDY3LS4yNSAwbC0xLjA2NiAxLjA2NC0xLjA2NC0xLjA2NWMtLjA3LS4wNjctLjE4Mi0uMDY3LS4yNTEgMGwtLjM3NC4zNzZjLS4wNy4wNy0uMDcuMTgxIDAgLjI1bDEuMDY0IDEuMDY3LTEuMDY0IDEuMDYzYy0uMDcuMDY5LS4wNy4xODIgMCAuMjUxbC4zNzQuMzc2Yy4wNjkuMDcuMTgxLjA3LjI1MSAwbDEuMDY0LTEuMDY0IDEuMDY2IDEuMDY0Yy4wNjcuMDcuMTgyLjA3LjI1IDBsLjM3NS0uMzc2Yy4wNy0uMDY5LjA3LS4xODIgMC0uMjUxbC0xLjA2NS0xLjA2M3oiIGZpbGw9IiNiYmIiLz48L3N2Zz4=)"
        }).attr('muted', true)


      }

    })

    $('.fullscreen #audio').on('click', function(ev) {
      ev.stopPropagation();
      if (mack.vars.quickCatch) {


      } else {
        mack.vars.quickCatch = true;

        if ($('#audio').attr('muted')) {

          $('.fullscreen #audio').css({
            'background': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTUuMjMzIDMuMDY4bC0uNjYuODAyYzEuMjM0IDEuMzQ4IDIuMDE3IDMuMTQyIDIuMDE3IDUuMTE0IDAgMS45NjctLjc3OCAzLjc2LTIuMDEyIDUuMTA1bC42NjEuODIyYzEuNDA2LTEuNTg2IDIuMjYxLTMuNjM1IDIuMjYxLTUuOTI4IDAtMi4yODctLjg2My00LjMzMS0yLjI2Ny01LjkxNXptLTEuNzU0IDEuNjRsLS41ODguODQ4Yy44NzMuODc4IDEuNDI5IDIuMDkgMS40MjkgMy40MjggMCAxLjM2NC0uNTc4IDIuNTk5LTEuNDgzIDMuNDgxbC42MTEuODEyYzEuMDk2LTEuMTE3IDEuNzU1LTIuNjA1IDEuNzU1LTQuMjkzIDAtMS42NTctLjY2NC0zLjE2My0xLjcyNC00LjI3NnptLTEuNzMzIDEuNzE3bC0uNDcyLjk2Yy40NS4zODYuNzM2Ljk1OC43MzYgMS41OTcgMCAuNzAzLS4xNjIgMS4zNC0uNjkyIDEuNzIzbC40NTUuODA5Yy42OTQtLjYxOSAxLjEzMy0xLjUyNCAxLjEzMy0yLjUzIDAtMS4wMi0uNDQ5LTEuOTM1LTEuMTYtMi41NTl6IiBmaWxsPSIjYmJiIi8+PC9zdmc+')"
          }).removeAttr('muted')
          Klang.triggerEvent('sound_on')

        } else {

          $('.fullscreen #audio').css({
            'background': "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBkPSJNMCA3LjEwM3YzLjg0M2MwIC40OS45MjYgMS4wNTQgMS40NSAxLjA1NGgyLjU1di02aC0yLjU1Yy0uNTI0IDAtMS40NS42MTMtMS40NSAxLjEwM3ptOC44NTMtMy45ODVsLTMuODUzIDIuNzQ0djYuMjk0bDMuODUzIDIuNzc1Yy41MjQgMCAxLjE0Ny0uMzk2IDEuMTQ3LS44ODd2LTEwLjAzOWMwLS40OS0uNjIzLS44ODctMS4xNDctLjg4N3pNMTMuNjk2IDlsMS4wNjUtMS4wNjZjLjA3LS4wNjkuMDctLjE4MSAwLS4yNWwtLjM3NS0uMzc2Yy0uMDY4LS4wNjctLjE4My0uMDY3LS4yNSAwbC0xLjA2NiAxLjA2NC0xLjA2NC0xLjA2NWMtLjA3LS4wNjctLjE4Mi0uMDY3LS4yNTEgMGwtLjM3NC4zNzZjLS4wNy4wNy0uMDcuMTgxIDAgLjI1bDEuMDY0IDEuMDY3LTEuMDY0IDEuMDYzYy0uMDcuMDY5LS4wNy4xODIgMCAuMjUxbC4zNzQuMzc2Yy4wNjkuMDcuMTgxLjA3LjI1MSAwbDEuMDY0LTEuMDY0IDEuMDY2IDEuMDY0Yy4wNjcuMDcuMTgyLjA3LjI1IDBsLjM3NS0uMzc2Yy4wNy0uMDY5LjA3LS4xODIgMC0uMjUxbC0xLjA2NS0xLjA2M3oiIGZpbGw9IiNiYmIiLz48L3N2Zz4=)"
          }).attr('muted', true)
          Klang.triggerEvent('sound_off')
        }

        setTimeout(function() {
          mack.vars.quickCatch = false;

        }, 500)
      }

    })
  },
  superSizeMeGL: function() {
    
    if (rcLocaleJSDirectory != 'facebook') {
      var windowWidth = window.screen.width < window.outerWidth ?
              window.screen.width : window.outerWidth;

      var screenOrientation = ($(window).width() > $(window).height()) ? 90 : 0;
      if (screenOrientation >= 90) {
        mack.vars.landscape = 0
        if (windowWidth <= mack.vars.small) {
          mack.vars.big = 0;
        } else {
          mack.vars.big = 1;
        }
      } else {
        mack.vars.landscape = 1;
      }

      TweenLite.to($('#glContainer canvas'), 0.1, {
        width: '100%'
      })

      if (windowWidth >= 1188) {
        if (Environment.isMobile()) {
          $('#leftControls').css({
            left: '0px'
          })
        } else {
          $('#leftControls').css({
            left: '25px'
          })
        }
      } else {
        if (Environment.isMobile()) {
          $('#leftControls').css({
            left: '-10px'
          })
        } else {
          $('#leftControls').css({
            left: '16px'
          })
        }
      }
      if (windowWidth >= 1021) {
        TweenLite.to($('.mainStage'), 0.1, {
          top: '-164px'
        })
        var top = '350px';
        TweenLite.to($('#text #bottomText'), 0.2, {
          top: top
        })

        $('.fullscreen #text #bottomText #logo').css({
          'background-size': '358px'
        })
        TweenLite.to($('.fullscreen #bottomText'), 0.1, {
          top: '400px'
        })

      }

      if (windowWidth >= 1201) {
        TweenLite.to($('.fullscreen #bottomText'), 0.1, {
          top: '30em'
        })

      }

      if (windowWidth >= 1401) {
        TweenLite.to($('.fullscreen #bottomText'), 0.1, {
          'margin-top': '400px'
        })

      }

      if (windowWidth >= 1921) {
        TweenLite.to($('.fullscreen #bottomText'), 0.1, {
          'margin-top': '800px'
        })

      }

      if (windowWidth >= 780 && windowWidth <= 1020) {

        /*TweenLite.to($('#glContainer canvas'), 0.1,{height:'359px'})*/
        TweenLite.set($('.hotZone'), 0.1, {
          height: $('#glContainer canvas').height()
        })
        TweenLite.to($('.mainStage'), 0.1, {
          top: '-170px'
        })
        var top = '350px';
        TweenLite.to($('#text #bottomText'), 0.2, {
          top: top
        })
      }


      if (windowWidth >= 610 && windowWidth < 780) {

        TweenLite.to($('#glContainer'), 0.1, {
          'margin-left': 0
        })
        TweenLite.set($('.hotZone'), 0.1, {
          height: $('#glContainer canvas').height()
        })
        /*TweenLite.to($('#glContainer canvas'), 0.1,{height:'335px'})*/
        TweenLite.to($('.mainStage'), 0.1, {
          top: '-99px'
        })
        var top = '350px';
        TweenLite.to($('#text #bottomText'), 0.2, {
          top: top
        })
      }


      if (windowWidth >= 330 && windowWidth < 610) {
        TweenLite.to($('#glContainer'), 0.1, {
          'margin-left': 0
        })
        TweenLite.set($('.hotZone'), 0.1, {
          height: $('#glContainer canvas').height()
        })
        /*TweenLite.to($('#glContainer canvas'), 0.1,{height:'195px'})*/
        TweenLite.to($('.mainStage'), 0.1, {
          top: '-99px'
        })
        var top = '350px';
        TweenLite.to($('#text #bottomText'), 0.2, {
          top: top
        })

      }

      if (windowWidth <= mack.vars.small) {

      }
    }//ENDOF != facebook


  },
  superSizeMe: function() {

    var windowWidth = window.screen.width < window.outerWidth ?
            window.screen.width : window.outerWidth;


    //alert('going super')

    var screenOrientation = ($(window).width() > $(window).height()) ? 90 : 0;

    if (screenOrientation >= 90) {
      /*  alert('landscape')*/
      // $('.whatIs').append('landscape')
      mack.vars.landscape = 0
      if (windowWidth <= mack.vars.small) {
        mack.vars.big = 0;

      } else {
        mack.vars.big = 1;

        /*alert('big '+mack.vars.small)*/
      }

      /*poo('setBig')*/
    } else {
      //$('.whatIs').append('portrait')
      /* alert('portrait')*/

      mack.vars.landscape = 1;
    }
    /*$(window).bind("resize", function(){
     screenOrientation = ($(window).width() > $(window).height())? 90 : 0;
     });*/

    if (device.mobile()) {
      TweenLite.to($('.mobileNav'), 1, {
        opacity: 1,
        display: 'block'
      })
      TweenLite.to($('.nmb'), 0.4, {
        opacity: 0,
        display: 'none'
      })
    }

    if (device.tablet()) {
      TweenLite.to($('.mobileNav'), 1, {
        opacity: 0,
        display: 'none'
      })
      TweenLite.to($('.nmb'), 0.14, {
        opacity: 1,
        display: 'block'
      })
      if (device.ipad()) {
        // TweenLite.to($('#text #bottomText #stats'), 0.2, {textAlign:'center'})   
      }
    }

    if (windowWidth >= 610 && !device.mobile()) {
      TweenLite.to($('.mobileNav'), 0.1, {
        opacity: 0,
        display: 'none'
      })
      TweenLite.to($('.nmb'), 1, {
        opacity: 1,
        display: 'block'
      })
    }


    /* if(!device.tablet() && !device.mobile()){
     TweenLite.to($('.mobileNav'), 1, {opacity:0, display:'none'})
     TweenLite.to($('.nmb'), 0.14, {opacity:1, display:'block'})
     
     }
     */
    /*$('#ll-canvas-shadow').css({width:'100%',marginLeft:'-200px'})*/
    $('#ll-canvas-container').css({
      width: 'inherit'
    })

    //TweenMax.from($('.mobileNav'), 1.75, {y:"-3px", repeat:-1, yoyo:true, ease:Sine.easeInOut});
    $('#ll-canvas-container').css({
      left: '0px'
    })

    if (windowWidth >= 1188) {
      TweenLite.to($('#ll-canvas'), 0.3, {
        height: '320px',
        width: '320px',
        scale: 0.9,
        marginTop: '-155px',
        marginLeft: "-160px"
      })
      if (Environment.isMobile()) {
        $('#leftControls').css({
          left: '0px'
        })
      } else {
        poo('biig')
        $('#leftControls').css({
          left: '25px'
        })
      }
    } else {
      if (Environment.isMobile()) {
        $('#leftControls').css({
          left: '-10px'
        })
      } else {
        $('#leftControls').css({
          left: '16px'
        })
      }
    }

    if (windowWidth >= 1021) {

      TweenLite.set($('.hotZone'), {
        height: '500px'
      })
      $('#ll-canvas-container').css({
        top: '-164px'
      })
      TweenLite.to($('#ll-canvas-container'), 0.11, {
        height: '500px'
      })
      TweenLite.to($('#ll-canvas-shadow'), 0.2, {
        width: '40%',
        marginLeft: '-20%'
      })

      TweenLite.to($('#ll-canvas'), 0.3, {
        height: '320px',
        width: '320px',
        scale: 0.9,
        marginTop: '-164px',
        marginLeft: "-150px"
      })
      TweenLite.to($('#text #bottomText'), 0.1, {
        top: '470px',
        left: '-30px',
        width: '100%'
      })

      //$('#ll-canvas').css({height:'300px', width:'300px', marginTop:'-150px',marginLeft:'-150px'})
      poo('1021 biig')
    }

    if (windowWidth >= 761 && windowWidth <= 1020) {

      poo('761 to 1020 biig')
      /*alert('is this 761?')*/

      TweenLite.set($('.hotZone'), {
        height: '359px'
      })
      $('#ll-canvas-container').css({
        top: '-150px'
      })
      TweenLite.to($('#ll-canvas-container'), 0.1, {
        height: '359px'
      })
      TweenLite.to($('#ll-canvas-shadow'), 0.2, {
        marginLeft: '-22%'
      })



      TweenLite.to($('#ll-canvas'), 0.13, {
        height: '260px',
        width: '260px',
        marginTop: '-148px'
      })
      TweenLite.to($('#text #bottomText'), 0.2, {
        width: '100%',
        top: '330px'
      })
      TweenLite.to($('#text #bottomText #stats'), 0.2, {
        top: '90px'
      })

      var stats = $('#text #bottomText #stats');
      if (Environment.isMobile()) {

        $('#text #bottomText #logo').css({
          top: '-25px'
        })

      } else {

        $('#text #bottomText #logo').css({
          top: '25px',
          'background-size': '258px'
        })
      }
      if (device.tablet()) {
        poo('verified tablet')
        /*TweenLite.to($('#text #bottomText'), 0.2, { left:'-50px'})*/
        if (mack.vars.landscape) {
          TweenLite.to($('#text #bottomText'), 0.1, {
            top: '310px'
          })
        } else {
          poo('verified portrait tablet')
          TweenLite.set(stats, {
            top: "9px"
          })

          TweenLite.to($('#text #bottomText'), 0.1, {
            top: '340px'
          })
        }

        TweenLite.to($('#ll-canvas'), 0.13, {
          marginLeft: '-120px'
        })
        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          marginLeft: '-20%'
        })
      }


    }

    if (windowWidth < 760) {

      $('#ll-canvas-container').css({
        width: '100%'
      })

    }

    if (windowWidth >= 610 && windowWidth < 760) {

      if (device.ipad()) {
        $('#ll-canvas-container').css({
          top: '-145px'
        })
      } else {
        $('#ll-canvas-container').css({
          top: '-91px'
        })

      }
      TweenLite.set($('.hotZone'), {
        height: '341px'
      })
      TweenLite.to($('#text #bottomText'), 0.1, {
        top: '370px',
        width: '100%'
      })

      if (mack.vars.landscape) {

        TweenLite.to($('#ll-canvas-container'), 0.1, {
          height: '341px'
        })
        TweenLite.to($('#text #bottomText'), 0.1, {
          top: '300px'
        })

        if (Environment.isAndroid()) {
          var llcan = $('#ll-canvas, #ll-canvas-shadow');
          /*alert('is this 610? port')*/
          $('#ll-canvas-container').css({
            width: '100%'
          })
          TweenLite.set($('.mIcon'), {
            'z-index': 999999,
            width: '20px',
            scale: 1,
            top: "+=30"
          })
          TweenLite.to($('#ll-canvas'), 1, {
            scale: '0.6'
          })
          TweenLite.set($('#text #bottomText #stats'), {
            'font-size': "0.39em"
          })
        }
      } else {

        var stats = $('#text #bottomText #stats');

        TweenLite.set($('#text #bottomText #stats'), {
          top: "9px"
        })
        TweenLite.set($('.hotZone'), {
          height: '370px'
        })
        TweenLite.to($('#text #bottomText'), 0.1, {
          top: '370px'
        })
        TweenLite.to($('#ll-canvas-container'), 0.1, {
          height: '363px'
        })

        if (Environment.isAndroid()) {
          // alert('is this 610? we lands')
        }
      }
      TweenLite.to($('#ll-canvas-shadow'), 0.2, {
        marginLeft: '-20%'
      })

      TweenLite.to($('#ll-canvas'), 0.13, {
        scale: 0.89,
        marginTop: '-158px'
      })

      TweenLite.to($('#text #bottomText #logo'), 0.1, {
        top: '-30px'
      })
      TweenLite.to($('#text #preloader'), 0.1, {
        width: '56%',
        left: '-25px'
      })
      TweenLite.to($('#text #bottomText #stats'), 0.2, {
        top: '40px',
        width: "100%",
        textAlign: 'center'
      })

    }


    if (windowWidth <= mack.vars.small) {

      if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {

        TweenLite.set($('#text #bottomText #logo'), {
          top: '60px'
        })
      }


      if (mack.vars.tomsDone) {
        $('.mNav').attr('disabled', false)
        TweenLite.to($('.mIcon'), 1, {
          opacity: 1
        })
      }


      TweenLite.set($('#logo'), {
        'background-size': '108px'
      });

      TweenLite.set($('#bottomText #logo'), {
        'background-size': '158px'
      })


      TweenLite.to($('.nmb'), 0.4, {
        opacity: 0,
        display: 'none'
      })

      TweenLite.to($('.mobileNav'), 3, {
        opacity: 1,
        display: 'block'
      })

      if (mack.vars.landscape) {

        mack.vars.windowWidth = windowWidth;

        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          marginLeft: '-30%'
        })

        if (Environment.isMobile() && (Environment.isMobile()[0] == "iPhone" || Environment.isMobile()[0] == "iPod")) {
          TweenLite.set($('#ll-canvas-container'), {
            top: '-67px'
          })



          TweenLite.set($('#bottomText #logo'), {
            top: '80px'
          })

        }

        if ($(window).width() >= 610) {
          TweenLite.to($('#ll-canvas-container'), 0.1, {
            top: '-67px'
          })

          if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {
            TweenLite.to($('#ll-canvas-container'), 0.1, {
              left: '20px'
            })
          }
        }

        TweenLite.to($('#text #bottomText #stats'), 0.2, {
          textAlign: 'left'
        })

        TweenLite.to($('#text #bottomText'), 0.2, {
          top: '150px',
          width: "100%"
        })
        
        TweenLite.to($('.fullscreen #bottomText'), 0.2, {
          top: 380 + 'px'
        })
        TweenLite.set($('#text #bottomText #logo'), {
          'background-size': '158px'
        })
        TweenLite.to($('#text #bottomText #logo'), 0.2, {
          'background-size': '158px'
        })

        TweenLite.set($('.hotZone'), {
          height: '233px'
        })
        TweenLite.to($('#ll-canvas-container'), 0.1, {
          height: '233px'
        })

        TweenLite.set($('#ll-canvas-shadow'), {
          bottom: '10px'
        })
        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          height: '20px',
          width: '60%',
          marginLeft: '-30%'
        })

        if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {
          TweenLite.to($('#text #bottomText #stats'), 0.2, {
            textAlign: 'center'
          })



          TweenLite.set($('#bottomText #logo'), {
            top: '67px'
          })
        }


      } else {

        TweenLite.set($('.hotZone'), {
          height: '205px'
        })

        TweenLite.to($('#text #bottomText #stats'), 0.2, {
          textAlign: 'center',
          top: '-30px'
        })
        TweenLite.to($('#text #bottomText'), 0.2, {
          left: 0,
          top: '235px',
          width: "100%"
        })

        if (Environment.isMobile() && (Environment.isMobile()[0] == "iPhone" || Environment.isMobile()[0] == "iPod")) {
          TweenLite.to($('#text #bottomText'), 0.2, {
            top: '150px'
          })


          TweenLite.set($('#bottomText #logo'), {
            top: '30px'
          })

        }

        TweenLite.to($('#ll-canvas-container'), 0.1, {
          top: '-67px',
          height: '205px'
        })

        if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {
          if (mack.vars.landscape) {
            TweenLite.to($('#ll-canvas-container'), 0.1, {
              top: '-102px'
            })
          } else {

            TweenLite.set($('#bottomText #logo'), {
              top: '5px'
            })
            TweenLite.to($('#ll-canvas-container'), 0.05, {
              top: '-67px'
            })

          }




        }

        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          marginLeft: '-30%'
        })
        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          height: '20px',
          width: '60%'
        })

      }

      TweenLite.to($('#ll-canvas'), 0.1, {
        /* height: '160px',
         width: '160px',*/
        marginTop: '-95px',
        marginLeft: '-80px'
      })
    }





    if (windowWidth >= 330 && windowWidth < 610) {
      poo('330 to 610   biig')


      $('#ll-canvas-container').css({
        top: '-67px'
      })
      /*TweenLite.to($('#ll-canvas-container'),0.1, {height:'205px'})*/
      TweenLite.set($('#logo'), {
        'background-size': '108px'
      });


      TweenLite.to($('#ll-canvas'), 0.1, {
        height: '160px',
        width: '160px',
        marginTop: '-98px',
        marginLeft: '-78px'
      })
      if (mack.vars.landscape) {
        TweenLite.set($('.hotZone'), {
          height: '233px'
        })
        TweenLite.to($('#ll-canvas-container'), 0.1, {
          height: '233px'
        })
        TweenLite.to($('#text #bottomText'), 0.2, {
          top: '175px',
          width: "100%"
        })
        TweenLite.to($('#text #bottomText #stats'), 0.2, {
          textAlign: 'left'
        })
        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          height: '40px',
          width: '60%',
          marginLeft: '-30%'
        })

      } else {
        /*alert('dom check two three')*/
        TweenLite.set($('.hotZone'), {
          height: '205px'
        })
        TweenLite.to($('#ll-canvas-shadow'), 0.2, {
          height: '40px',
          width: '60%',
          marginLeft: '-30%'
        })
        TweenLite.to($('#ll-canvas-container'), 0.1, {
          height: '205px'
        })
        /*TweenLite.to($('#text #bottomText #stats'),0.2, {textAlign:'center'})*/
        TweenLite.to($('#text #bottomText #stats'), 0.2, {
          textAlign: 'center'
        })
        TweenLite.to($('#text #bottomText'), 0.2, {
          left: 0,
          top: '135px',
          width: "100%"
        })
      }

    }




  },
  hotZone: function() {

    if (Environment.isChrome() && !device.mobile()) {
   
      var osh = (function() {
        var ua = navigator.userAgent.toLowerCase();
        return {
          isWin2K: /windows nt 5.0/.test(ua),
          isXPa: /windows nt 5.1/.test(ua),
          isXP: /windows nt 5.2/.test(ua),
          isVista: /windows nt 6.0/.test(ua),
          isWin7: /windows nt 6.1/.test(ua),
          isWin8: /windows nt 6.2/.test(ua),
          isWin81: /windows nt 6.3/.test(ua)
        };
      }());

      if (osh.isXP || osh.isXPa || osh.isVista) {
        //  alert('somethings wrong with your window '+navigator.userAgent)
        mack.vars.isKosher = false;
      } else {
        // alert('failed'+navigator.userAgent)
        if (Detector.webgl) {
          mack.vars.isKosher = true;
        } else {
          mack.vars.isKosher = false;
        }
      }

    }

    if (Environment.isFire() && !Environment.isMobile()) {
      if (Detector.webgl) {
        mack.vars.isKosher = true;
      } else {
        mack.vars.isKosher = false;
      }
    }


    var windowWidth = window.screen.width < window.outerWidth ?
            window.screen.width : window.outerWidth;


    if (windowWidth <= mack.vars.small) {
      mack.vars.big = 0;
    } else {
      mack.vars.big = 1;
      /*poo(mack.vars.small)*/
    }

    var screenOrientation = ($(window).width() > $(window).height()) ? 90 : 0;

    if (screenOrientation >= 90) {
      mack.vars.landscape = 0

    } else {
      mack.vars.landscape = 1;
    }

    if (rcLocaleJSDirectory == 'facebook') {
      
      hHeight = window.innerHeight;

      var center = (hHeight / 2) - 70;

      $("#preloader").css('position','fixed');

      $("#preloader").css('top', center + 'px');

      $(".dot").css('opacity', 0);
      
      $("#preloader").fadeTo(3000, 1, function() {
        
        //setInterval(ellipsis, 3000);
        ellipsis();
        
      });

      function ellipsis(){
        
          
        $(".dot1").fadeTo('slow', 1, function() {

          $(".dot2").fadeTo('slow', 1, function() {

            $(".dot3").fadeTo('slow', 1, function() {

              $(".ellipsis").fadeTo('slow', 0, function() {
                
                $(".dot").css('opacity', 0);
                $(".ellipsis").css('opacity', 1);
                
                ellipsis();
                
              });
              
            });

          });
        });

      }

      

        
    } else {
      
      if (windowWidth >= 1188) {
        if (Environment.isMobile()) {
          $('#leftControls').css({
            left: '0px'
          })
        } else {
          $('#leftControls').css({
            left: '25px'
          })
        }
      } else {
        if (Environment.isMobile()) {
          $('#leftControls').css({
            left: '-10px'
          })
        } else {
          $('#leftControls').css({
            left: '16px'
          })
        }
      }

      if (windowWidth >= 1021) {

        var hHeight = '500'

        if (Environment.isIe() && Environment.isIe() <= 9) {
          $('.hotZone').css({
            height: '500px'
          })
          $('#ll-canvas-container').css({
            height: '500px'
          })
        } else {


          TweenLite.set($('#text #preloader'), {
            width: '80%',
            top: (hHeight / 2) + 70 + 'px'
          })
          TweenLite.set($('.hotZone'), {
            height: hHeight + 'px'
          })
        }

      }

      if (windowWidth >= 780 && windowWidth <= 1020) {
        if (mack.vars.isKosher && !device.mobile()) {
          var hHeight = '500'
        } else {
          var hHeight = '341'
          $('#text #preloader p').css({
            'font-size': '2.0em'
          })
        }



        if (Environment.isIe() && Environment.isIe() <= 9) {
          $('.hotZone').css({
            height: '500px'
          })
          $('#ll-canvas-container').css({
            height: '500px'
          })
        } else {
          TweenLite.set($('.hotZone'), {
            height: hHeight
          })

          var textHeight = (hHeight / 2) + 90 + 'px';

          TweenLite.to($('#text #preloader'), 0.1, {
            width: '80%',
            top: textHeight
          })

        }

      }



      if (windowWidth >= 610 && windowWidth < 780) {

        if (mack.vars.isKosher && !device.mobile()) {
          var hHeight = '500'
        } else {
          var hHeight = '356'
          $('#text #preloader p').css({
            'font-size': '1.9em'
          })

        }

        if (mack.vars.landscape) {
          poo('pre lands no')

          TweenLite.set($('.hotZone'), {
            height: hHeight + 'px'
          })
          TweenLite.to($('#text #preloader'), 0.1, {
            width: '80%',
            top: (hHeight / 2) + 50 + 'px'
          })
        } else {
          poo('pre lands yes')
          TweenLite.set($('.hotZone'), {
            height: hHeight + 'px'
          })
          TweenLite.to($('#text #preloader'), 0.1, {
            width: '80%',
            top: hHeight / 2 + 70 + 'px'
          })
        }
        /*awe('setting pre')*/
        if (Environment.isMobile() && Environment.isAndroid()) {
          TweenLite.set($('#text #preloader'), {
            textAlign: 'left',
            'font-size': '1em'
          })
        }


        TweenLite.to($('#text #preloader p'), 0.1, {
          /*lineHeight: '35px'*/
          lineHeight: '1.2'
        })
      }


      if (windowWidth <= mack.vars.small) {

        if (mack.vars.isKosher && !device.mobile()) {
          var hHeight = '233'
        } else {
          var hHeight = '195'
        }

        // TweenLite.to($('#text #bottomText'),0.2, {top:'130px',width:"100%", textAlign:'left'})  

        /*    TweenLite.to($('#text #preloader'),0.1,{width:'70%'})*/



        /*if(mack.vars.landscape){
         TweenLite.to($('#text #preloader'),0.1,{width:'80%',top:(hHeight/2)+'px'}) 
         } else {
         TweenLite.to($('#text #preloader'),0.1,{width:'70%',top:(hHeight/2)-30+'px'}) 
         }*/
        /*TweenLite.set($('.hotZone'),{height:hHeight+'px'})*/



        /*if(device.mobile){*/
        $('#text #preloader p').css({
          'font-size': '1em'
        })
        /*  $('#text #stats #p').css({'font-size':'0.78em'})*/
        TweenLite.to($('#text #stats'), 0.1, {
          /* top: '4px'*/
        })
        /*}*/

        if (mack.vars.isKosher && !device.mobile()) {

          var hHeight = '233'
        } else {
          if (mack.vars.landscape) {
            var hHeight = '233'
          } else {
            var hHeight = '205'

          }

        }


        /*TweenLite.set($('#ll-canvas-shadow'), { height:'20px',width:'60%',marginLeft:'-30%'})*/
        /*TweenLite.set($('#ll-canvas-shadow'),{bottom:'10px'})*/
        // TweenLite.set($('#logo'),{top:'12px'})

        TweenLite.set($('.hotZone'), {
          height: hHeight + 'px'
        })

        if (mack.vars.landscape) {
          TweenLite.to($('#text #preloader p'), 0.1, {
            'line-height': '18px'
          })
          TweenLite.set($('#text #preloader p'), {
            'text-align': 'left'
          })
          poo('hotzone near pre')

          TweenLite.to($('#text #preloader'), 0.1, {
            width: '70%',
            top: (hHeight / 2) + 50 + 'px'
          })
          if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {
            TweenLite.set($('#text #preloader p'), {
              'text-align': 'center'
            })

            TweenLite.to($('#ll-canvas-container'), 0.1, {
              top: '-102px'
            })
          }

        } else {
          TweenLite.to($('#text #preloader p'), 0.1, {
            'line-height': '18px'
          })
          poo('else zone pre')
          TweenLite.set($('#text #preloader p'), {
            'text-align': 'center'
          })
          TweenLite.to($('#text #preloader'), 0.1, {
            width: '70%',
            top: (hHeight / 2) + 50 + 'px'
          })

          if (Environment.isMobile()) {

            /*$('.andBot').html('aaaah').css({'position':'absolute', 'z-index':99999, 'width':'400px', 'background' : 'yellow'})*/
          }

          if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {

            TweenLite.to($('#text #preloader'), 0.1, {
              width: '80%',
              top: hHeight / 2 + 102 + 'px'
            })

            TweenLite.to($('#ll-canvas-container'), 0.05, {
              top: '-67px',
              height: '205px',
              width: '100%',
              left: '0px'
            })


          }
        }

      }



      if (windowWidth >= 330 && windowWidth < 610) {

        if (mack.vars.isKosher && !device.mobile()) {
          var hHeight = '500'
        } else {
          var hHeight = '195'
        }


        if (mack.vars.landscape) {

          TweenLite.to($('#text #preloader'), 0.1, {
            width: '80%',
            top: (hHeight / 2) + 50 + 'px'
          })
        } else {
          poo('go no land')
          TweenLite.to($('#text #preloader'), 0.1, {
            width: '80%',
            top: (hHeight / 2) + 50 + 'px'
          })
        }
        TweenLite.set($('.hotZone'), {
          height: hHeight + 'px'
        })
        TweenLite.to($('#text #preloader p'), 0.1, {
          lineHeight: '18px'
        })

      }
    }//ENDOF facebook {} else

  },
  click: {
    lastF: function() {
      /*poo('last')*/
      /* $('li').removeClass('active');*/
      if (mack.vars.isKosher) {
        if (kCanClick) {
          $('li').removeClass('active');
          $(this).parent('li').addClass('active')
        }
      } else {
        $('li').removeClass('active');
        $(this).parent('li').addClass('active')
        if (Environment.isMobile()) {

        } else {
          mack.pauseAll()
          $('.bLast ')[0].play()
        }
      }

      var apiID = FindValidAPIID(json04Files);
      mack.vars.logoIndex = 4;
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.setGif('last_v06.gif', $(this));
      } else {
        if (!mack.vars.big) {
          mack.smallAnim();
        }
      }
      // if(mack.vars.tomsDone){

      //setTimeout(function(){
      mack.vars.green = 0;
      if (!Environment.isMobile() && mack.vars.isKosher) {
      } else {
        PrepareLastFMTagline(apiID);
      }
      if (Environment.isMobile()) {

      } else {
        if (mack.vars.isKosher) {
          // Klang.triggerEvent( 'last_start' );
        }

      }

      /*mack.setGif('last_v06.gif', $(this));*/
      mack.canApi(5)
      //   },mack.vars.canDelay)
      //  }
    },
    nyt: function() {
      /*poo('nyt')*/
      if (mack.vars.isKosher) {
        if (kCanClick) {
          $('li').removeClass('active');
          $(this).parent('li').addClass('active')
        }
      } else {
        $('li').removeClass('active');
        $(this).parent('li').addClass('active')
        if (Environment.isMobile()) {

        } else {
          mack.pauseAll()
          $('.bNyt')[0].play()
        }
      }
      var apiID = FindValidAPIID(json02Files);
      mack.vars.logoIndex = 2;
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.setGif('nyt_v06.gif', $(this));
      } else {
        if (!mack.vars.big) {
          mack.smallAnim();
        }
      }
      // if(mack.vars.tomsDone){

      //  setTimeout(function(){
      mack.vars.green = 0;
      if (mack.vars.isKosher) {
      } else {
        PrepareNYTimesTagline(apiID)
      }

      if (Environment.isMobile()) {

      } else {
        //  Klang.triggerEvent( 'times_start' );
      }


      /*mack.setGif('nyt_v06.gif', $(this));*/
      mack.canApi(3)
      //   },mack.vars.canDelay)
      //}
    },
    amz: function() {
      /*poo('amz')*/
      if (mack.vars.isKosher) {
        if (kCanClick) {
          $('li').removeClass('active');
          $(this).parent('li').addClass('active')
        }
      } else {
        $('li').removeClass('active');
        $(this).parent('li').addClass('active')
        if (Environment.isMobile()) {

        } else {
          mack.pauseAll()
          $('.bAmazon')[0].play()
        }
      }
      $(this).parent('li').addClass('active')
      var apiID = FindValidAPIID(json03Files);
      mack.vars.logoIndex = 3;
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.setGif('amz_v06.gif', $(this))
      } else {

        if (!mack.vars.big) {
          mack.smallAnim();
        }
      }


      // if(mack.vars.tomsDone){
      //  setTimeout(function(){
      mack.vars.green = 0;

      if (Environment.isMobile()) {

      } else {
        //  Klang.triggerEvent( 'amazon_start' );
      }

      if (mack.vars.isKosher) {
      } else {
        PrepareAmazonTagline(apiID)
      }
      mack.canApi(4)
      //      },mack.vars.canDelay)

      // }
    },
    insta: function() {
      /*poo('insta')*/

      if (mack.vars.isKosher) {
        if (kCanClick) {
          $('li').removeClass('active');
          $(this).parent('li').addClass('active')
        }
      } else {
        $('li').removeClass('active');
        $(this).parent('li').addClass('active')
        if (Environment.isMobile()) {

        } else {
          mack.pauseAll()
          $('.bInsta')[0].play()
        }
      }

      $(this).parent('li').addClass('active')
      var apiID = FindValidAPIID(json00Files);
      mack.vars.logoIndex = 0;
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.setGif('insta_v06.gif', $(this))
      } else {

        if (!mack.vars.big) {
          mack.smallAnim();
        }
      }
      // if(mack.vars.tomsDone){
      //  setTimeout(function(){
      mack.vars.green = 0;
      if (mack.vars.isKosher) {
      } else {
        PrepareInstagramTagline(apiID);
      }

      if (Environment.isMobile()) {

      } else {
        //  Klang.triggerEvent( 'instagram_start' );
      }
      /*mack.setGif('insta_v06.gif', $(this));*/
      // mack.apiText();
      mack.canApi(1)

      // }
      //   },mack.vars.canDelay)


      //alert(mack.vars.tagline.tagline)
    },
    twt: function() {
      if (mack.vars.isKosher) {
        if (kCanClick) {
          $('li').removeClass('active');
          $(this).parent('li').addClass('active')
        }
      } else {
        $('li').removeClass('active');
        $(this).parent('li').addClass('active')
        if (Environment.isMobile()) {

        } else {
          mack.pauseAll()
          $('.bTwit')[0].play()
        }

      }
      //  alert('click')
      mack.vars.logoIndex = 1;
      var apiID = FindValidAPIID(json01Files);
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.setGif('twt_v06.gif', $(this));
      } else {
        if (!mack.vars.big) {
          /*poo('Im big')*/
          mack.smallAnim();
        }
        //   setTimeout(function(){
        mack.vars.green = 0;
        if (Environment.isMobile()) {

        } else {
          // Klang.triggerEvent( 'twitter_start' );
        }

        if (mack.vars.isKosher) {
        } else {
          PrepareTwitterTagline(apiID)
        }
        mack.canApi(2)
        //     },mack.vars.canDelay)
      }
      //if(mack.vars.tomsDone){
      /* mack.setGif('twt_v06.gif', $(this));*/

      //  }

    },
    getty: function() {
      if (mack.vars.isKosher) {
        if (kCanClick) {
          $('li').removeClass('active');
          $(this).parent('li').addClass('active')
          $('#zoom-controls').css({
            display: 'block!important'
          })
        }
      } else {
        $('li').removeClass('active');
        $(this).parent('li').addClass('active')
        if (Environment.isMobile()) {

        } else {
          mack.pauseAll()
          // $('.bGetty')[0].play()
        }

      }


      //  alert('click')
      mack.vars.logoIndex = 5;
      var apiID = FindValidAPIID(json05Files);
      if (Environment.isIe() && Environment.isIe() <= 9) {
        mack.setGif('getty_v06.gif', $(this));
      } else {
        if (!mack.vars.big) {
          /*poo('Im big')*/
          mack.smallAnim();
        }
        //   setTimeout(function(){
        mack.vars.green = 0;
        if (Environment.isMobile()) {

        } else {
          // Klang.triggerEvent( 'twitter_start' );
        }

        if (mack.vars.isKosher) {
        } else {
          PrepareGettyTagline(apiID)
        }
        mack.canApi(6)
        //     },mack.vars.canDelay)
      }
      //if(mack.vars.tomsDone){
      /* mack.setGif('twt_v06.gif', $(this));*/

      //  }

    }
  },
  tap: {
    lastF: function() {

    }
  },
  winOrient: function() {
    if (window.DeviceOrientationEvent) {

      //document.getElementById("doEvent").innerHTML = "DeviceOrientation";
      // Listen for the deviceorientation event and handle the raw data
      window.addEventListener('deviceorientation', function(eventData) {
        // gamma is the left-to-right tilt in degrees, where right is positive
        mack.vars.tiltLR = eventData.gamma;

        // beta is the front-to-back tilt in degrees, where front is positive
        mack.vars.tiltFB = eventData.beta;

        // alpha is the compass direction the device is facing in degrees
        mack.vars.dir = eventData.alpha

        // Mack remember to write the limits
        if (mack.vars.tiltFB >= 90) {
          mack.vars.tiltFB = 90;
        } else if (mack.vars.tiltFB <= -90) {
          mack.vars.tiltFB = -90;
        }

        // call our orientation event handler
        mack.deviceOrientationHandler(mack.vars.tiltLR, mack.vars.tiltFB, mack.vars.dir);
      }, false);
    } else {

      // document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
    }
  },
  deviceOrientationHandler: function(tiltLR, tiltFB, dir) {

    var box = $(".gifMe");

    if (mack.vars.landscape) {
      HappyTree.canvas.set_rotation(mack.vars.tiltFB - 40, mack.vars.tiltLR)
    } else {
      HappyTree.canvas.set_rotation(mack.vars.tiltLR, mack.vars.tiltFB - 10)
    }

  },
  setCamera: function(cam) {
    /*alert('works')*/
    //HappyTree.canvas.set_camera(cam);
    mack.vars.cam = cam;
    switch (cam) {
      case 0:

        HappyTree.canvas.set_rotation(0.1, 0.1)
        break;
      case 1:
        /*alert('second')*/
        //TweenLite.to($('#ll-canvas'),1,{'-webkit-transform': 'rotateX('+60+'deg)'}) 
        HappyTree.canvas.set_rotation(0, -50)
        break;
      case 2:
        HappyTree.canvas.set_rotation(60, -00)
        break;
    }

  },
  setControls: function() {
    if (Environment.isMobile()) {
      // mack.bringGif();
      /*alert('Zebra Pill')*/
      $.each($('#leftControls span.circle'), function(ind, val) {
        $(val).on('click touchstart', function() {
          /*alert('clicked3')*/
          /*mack.setCam(ind);*/
          mack.vars.cam = ind;
          HappyTree.canvas.set_camera(ind);

          switch (ind) {
            case 0:

              HappyTree.canvas.set_rotation(0.1, 0.1)
              break;
            case 1:
              /*   alert('second')*/
              if (device.tablet()) {
                HappyTree.canvas.set_rotation(0, 60)
              } else {
                HappyTree.canvas.set_rotation(0, -60)
              }

              break;
            case 2:
              HappyTree.canvas.set_rotation(60, -0)
              break;
          }

          /*Klang.triggerEvent('menu_click');*/
          //  HappyTree.canvas.set_camera(ind);
          // $(this).data('idz', ind)
        })
        //if(device.tablet()){
        // $(val).attr('onclick','mack.setCamera('+ind+')')
        //}

      })
    } else {
      // mack.bringCanvas();  
      if (Environment.isIe() && Environment.isIe() <= 9) {


      } else {
        $.each($('#leftControls span.circle'), function(ind, val) {
          $(val).on('click touchstart', function() {
            mack.vars.cam = ind;

            HappyTree.canvas.set_camera(ind);

            Klang.triggerEvent('menu_click');
            //HappyTree.canvas.set_camera(ind);
            switch (ind) {
              case 0:
                HappyTree.canvas.set_rotation(0, 0)
                break;
              case 1:
                /*alert('second')*/
                /*HappyTree.canvas.set_rotation(0,60)*/
                if (device.tablet()) {
                  HappyTree.canvas.set_rotation(0, 60)
                } else {
                  HappyTree.canvas.set_rotation(0, -60)
                }
                break;
              case 2:
                HappyTree.canvas.set_rotation(60, -20)
                break;
            }

            $(this).data('idz', ind)
            //mack.setCam(ind);
          })

        })
      }
    }

  },
  setCam: function(set) {

    switch (set) {
      case 0:

        TweenLite.to($('.gifMe'), 2, {
          rotationY: -35,
          transformPerspective: 250
        })
        break;
      case 1:
        TweenLite.to($('.gifMe'), 2, {
          rotationY: 0,
          transformPerspective: 250
        })
        break;
      case 2:
        TweenLite.to($('.gifMe'), 2, {
          rotationY: 35,
          transformPerspective: 250
        })
        break;
    }


    /* switch function(){
     
     }*/
  },
  smallAnim: function() {
    /* if(mack.vars.landscape){*/

    poo('trigger smallz')
    var pre = $('#text #preloader');
    var bText = $('#bottomText');
    var llcan = $('#ll-canvas, #ll-canvas-shadow');
    var stats = $('#stats');
    var logo = $('#logo');

    $('.mNav').attr('disabled', true)
    TweenLite.to($('.mIcon'), 1, {
      opacity: 0.251
    })

    var bsTops = $('#bottomText').css('top')

    if (device.mobile()) {


      if ($('#text #bottomText #stats p').html().length >= 56 && !mack.vars.landscape) {
        /* alert('sett :'+$('#text #bottomText #stats p').html().length)*/
        TweenLite.to($('#text #bottomText #stats'), 0.2, {
          width: '60%',
          'text-align': 'left'
        })
        var h2Text = '';
        /* $('#text #bottomText #stats p').each(function() {
         var h2Array = $(this).text().split(' '),
         h2Last = h2Array.pop();
         h2Text = h2Array.join(' ') + ' ' + h2Last;
         $(this).html(h2Text);
         });  */

        $('#text #bottomText #stats p').each(function() {
          h2Text = $(this).text().replace(/ (\w+)$/, ' $1');
          $(this).html(h2Text);
        });
        /*poo('tri')*/


      } else {
        /*alert('nottt :'+$('#text #bottomText #stats p').html().length)*/
        if (mack.vars.landscape) {
          if ($('#text #bottomText #stats p').html().length >= 70) {
            TweenLite.to($('#text #bottomText #stats'), 0.2, {
              width: '77%',
              'text-align': 'left'
            })
          }
          var h2Text = '';
          $('#text #bottomText #stats p').each(function(index) {
            h2Text = $(this).text().replace(/ (\w+)$/, '&nbsp;$1');
            $(this).html(h2Text);
          });

        } else {
          TweenLite.to($('#text #bottomText #stats'), 0.2, {
            textAlign: 'center'
          })
        }

      }
    }

    mack.vars.smallDone = new $.Deferred();

    $.when(mack.vars.smallDone).done(function(doneSmall) {
      poo('finito small')
      if ($('.mNav').css('opacity') == 0) {
        TweenLite.to($('.mIcon'), 1, {
          opacity: 1
        })
        $('.mNav').attr('disabled', false)
        mack.vars.ran = 1;
      }
    })

    function tomzDone() {
      mack.vars.smallDone.resolve();
      mack.vars.tomsDone = true;
      TweenLite.to($('.mIcon'), 1, {
        opacity: 1
      })

      $('.mNav').attr('disabled', false)
      mack.vars.ran = 1;
    }

    function resetText() {
      if (device.mobile()) {
        TweenLite.to(bText, 0.2, {
          top: 150 + 'px'
        })
      }
      TweenLite.to($('.fullscreen #bottomText'), 0.2, {
        
        top: 380 + 'px'
      })
    }

    function dropText() {
      bText.css({
        left: 0
      })
      if (device.mobile()) {
        TweenLite.to(bText, 0.12, {
          top: 130 + 'px'
        })
      }
 
      TweenLite.to($('.fullscreen #bottomText'), 0.2, {
        top: 380 + 'px'
      })
      if (mack.vars.landscape) {
        logo.css({
          top: '-4px',
          'font-size': '19px'
        })
      } else {



        poo('drop it like its hot')
        logo.css({
          top: '-24px',
          'font-size': '19px'
        })
      }

      // poo('bText')
    }


    /*TweenLite.set(bText,{top:'20%'});*/
    TweenLite.set(stats, {
      width: '80%'
    });
    TweenLite.set($('#logo'), {
      'background-size': '108px'
    });

    if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {

      TweenLite.set($('#logo'), {
        'background-size': '158px'
      });

      if (mack.vars.landscape) {
        poo('should be in notland')
        TweenLite.to($('#bottomText #stats'), 0.1, {
          top: '15px'
        })

      } else {
        poo('shoould be land')
        TweenLite.to($('#ll-canvas-container'), 0.05, {
          top: '-67px'
        })

      }

    } else if (Environment.isMobile() && (Environment.isMobile()[0] == "iPhone" || Environment.isMobile()[0] == "iPod")) {
      poo('we are stopping small')

    } else {
      // alert('else android')

      /* Android 4.4 and some other slip through thte cracks here's the fix */
      if (Environment.isMobile() && Environment.isAndroid()) {

        function killLogo() {
          TweenMax.killTweensOf(logo);
          $(logo).stop().fadeOut('slow');

          TweenMax.set(logo, {
            clearProps: "all"
          });
          mack.vars.logoUp = false;
          /*poo('trying to merk logo')*/

        }

        function goLogo() {
          /*$(logo).css('display','block')*/
          mack.vars.logoUp = true;
          /*poo('going logo')*/
          //   if (mack.vars.freshStart) {
          $(logo).fadeIn('slow', function() {

            TweenMax.to(logo, 2, {
              opacity: 1,
              display: 'block'
            })
            restore()

          }).delay(5000).fadeOut('slow', function() {
            killLogo();

          })
          //    } else {
          restore()
          /*poo('nologo bro')*/
          //  }


        }

        function restore() {
          /*poo('logo may pass')*/
          $('#menu li').removeClass('avoid-clicks')
          $('.mNav').attr('disabled', false)
          mack.vars.freshStart = true;

          mack.vars.tomsDone = true;
          TweenLite.to($('.mIcon'), 1, {
            opacity: 1
          })

          $('.mNav').attr('disabled', false)
          mack.vars.ran = 1;
        }


        TweenMax.set($('#ll-canvas'), {
          height: '240px',
          width: '240px',
          marginLeft: '-120px'
        });

        TweenLite.to($('#text #stats'), 0.1, {
          top: '30px'
        })


        if (mack.vars.landscape) {
          poo('going ports')
          TweenLite.set($('#bottomText #logo'), {
            top: '180px',
            'background-size': '150px',
            marginLeft: '10px'
          })
          TweenLite.set($('#bottomText'), {
            top: '170px'

          })
          TweenLite.set($('#bottomText #stats'), {
            width: '60%',
            'text-align': 'left',
            top: '-30px'

          })



          if (windowWidth >= 330 && windowWidth < 610) {
            TweenLite.set($('#bottomText #logo'), {
              top: '40px'
            })

            TweenLite.to($('#text #stats'), 0.1, {
              top: '-10px'
            })
          }
        } else {
          poo('going lands')
          TweenLite.set($('#bottomText'), {
            top: '170px'

          })
          TweenLite.set($('#bottomText #logo'), {
            top: '180px',
            'background-size': '150px',
          })

          if (windowWidth >= 330 && windowWidth <= 645) {

            TweenLite.set($('#bottomText'), {
              top: '230px'

            })
            TweenLite.set($('#bottomText #logo'), {
              top: '-30px'
            })
            TweenLite.to($('#text #stats'), 0.1, {
              top: '-90px'
            })
          }

          if (windowWidth >= 330 && windowWidth < 610) {
            TweenLite.set($('#bottomText #logo'), {
              top: '50px'
            })

            TweenLite.to($('#text #stats'), 0.1, {
              top: '0px'
            })
          }
        }


        if (windowWidth >= 330 && windowWidth < 645) {
          TweenMax.set($('#ll-canvas'), {
            height: '160px',
            width: '160px',
            top: '100px',
            marginLeft: '-78px'
          });

        }

        TweenMax.to($('#ll-canvas-container'), 4, {
          visibility: 'visible',
          opacity: 1
        });

        var tl = new TimelineMax();

        tl.to(llcan, 4, {
          opacity: 1,
          display: 'block'
        })
        tl.to(llcan, 2, {
          opacity: 0,
          display: 'none'
        })
        //tl.set(stats, {top:"-89px"})
        tl.to(stats, 4, {
          opacity: 1,
          display: 'block'

                  //onComplete: restore
        })
        tl.to(stats, 2, {
          opacity: 0,
          display: 'none'
        })
        tl.to(llcan, 4, {
          opacity: 1,
          display: 'block',
          onComplete: goLogo
        })

      } else {


        poo('should not be but is')
        if (!mack.vars.ran) {


          //  alert('first ron')

          mack.vars.tomsDone = false;
          var smallz = new TimelineMax();
          /* TweenLite.set(llcan, {opacity:0})
           TweenLite.set(stats, {opacity:0})*/
          poo('playing small first run')
          smallz.to(llcan, 2, {
            opacity: 1,
            delay: 1
          }).to(llcan, 2, {
            opacity: 0,
            delay: 1,
            onComplete: dropText
          })
                  /*.to(stats,1,{opacity:1})*/
                  .to(stats, 4, {
                    opacity: 1,
                    display: 'block'
                  })
                  .to(stats, 1, {
                    opacity: 0,
                    /*delay: 4,*/
                    onComplete: resetText
                  })
                  .to(llcan, 2, {
                    opacity: 1
                  })
                  .to(logo, 2, {
                    opacity: 1,
                    display: 'block',
                    onComplete: tomzDone
                  })
                  .to(logo, 1, {
                    opacity: 0,
                    display: 'none'
                  })
          /*.to(logo,1, {opacity:0,delay:2, onComplete:tomzDone});*/
          // .to(stats,1, {opacity:0})

          // poo('ranz')

        } else {
          mack.vars.tomsDone = false;
          var small = new TimelineMax();
          poo('playing small second run')
          //  alert('seconf ron')
          small.to(llcan, 2, {
            opacity: 1
          }).to(llcan, 2, {
            opacity: 0,
            delay: 1,
            onComplete: dropText
          })
                  /* .to(pre, 1, {opacity:1, display:'block'})
                   .to(pre,1,{opacity:0, delay:2})*/
                  .to(stats, 4, {
                    opacity: 1,
                    display: 'block'
                  })
                  .to(stats, 1, {
                    opacity: 0,
                    // delay: 4,
                    onComplete: resetText
                  })
                  .to(llcan, 2, {
                    opacity: 1
                  })
                  .to(logo, 1, {
                    opacity: 1,
                    display: 'block'
                  })
                  .to(logo, 2, {
                    opacity: 1,
                    delay: 2,
                    onComplete: tomzDone
                  })
                  .to(logo, 1, {
                    opacity: 0,
                    display: 'none'
                  })



        }

      }

    }

    /*}else{
     mack.peepShow()
     }*/


  },
  setGif: function(path, that) {

    /* if(mack.vars.logoIndex == 5){
     var that = $('#menu li')[0]
     }*/

    if (mack.vars.isKosher) {

    } else {

      $('li').removeClass('active');
      $('.gifMe').css({
        'opacity': 0,
        'background': 'url(' + rootPath + 'img/v06/' + path + ') no-repeat'
      });
      //$('#text #bottomText #stats').css('background','red')
      /*$('#stats').css('opacity','1!important')*/
      // $('.gifMe').fadeOut('fast').css({background:'url(img/v06/'+path+') no-repeat'}).fadeIn('slow');
      $(that).parent('li').addClass('active')


      $('#stats').css('display', 'block')


      mack.vars.mobile = 1;

      if (Environment.isIe() && Environment.isIe() == 9) {
        /*  $('.gifMe').css({
         height:'100%'
         
         })*/
        /*    $('#text #bottomText #stats').css({
         'display': 'block',
         'opacity': 1
         })*/
        /*  $('#text #bottomText #logo').css({
         'display': 'block',
         'opacity': 1,
         'background-image': 'none',
         'width': '200px',
         'margin': 'auto',
         'top': '40px'
         }) */
        /* $("#stats").stop();
         $("#logo").stop();
         $("#logo img").stop();*/

      }
      /*
       $("#logo img").fadeOut(0)
       
       
       $("#stats").delay(2000).fadeIn("slow", function() {
       // $('#stats').css({'display':'block'});
       }).delay(4000).fadeOut("slow", function() {
       
       
       $("#logo").fadeIn("slow", function() {
       $("#logo img").fadeIn('fast')
       }).delay(4000).fadeOut("slow", function() {
       $('.nmb').css('opacity', '1').removeClass('avoid-clicks')
       
       })
       })*/


      var llcan = $("#logo");
      var stats = $("#stats");


      var tl = new TimelineLite();
      tl.set(llcan, {
        opacity: 0
      })
      tl.set(stats, {
        opacity: 0
      })

      TweenLite.to($('.gifMe'), 3, {
        visibility: 'visible',
        delay: 1,
        /*'background-size':'100%',*/
        opacity: 1
      });
      TweenMax.killTweensOf(stats)
      TweenMax.killTweensOf(llcan)

      tl.to(stats, 7, {
        opacity: 1,
        display: 'block'

                //onComplete: restore
      })
      tl.to(stats, 4, {
        opacity: 0,
        display: 'none'
      })
      tl.to(llcan, 4, {
        opacity: 1,
        display: 'block'
      })
      tl.to(llcan, 2, {
        opacity: 0,
        display: 'none'
      })


    }

    /* alert('bin')*/
    // alert(mack.vars.logoIndex)

  },
  bringCanvas: function() {


    $('#ll-canvas').mouseenter(function() {
      mack.vars.live = true;
    }).mouseleave(function() {
      mack.vars.live = false;
      //TweenLite.to($('#ll-canvas'), 2.8, {rotationY:0+'deg',transformPerspective:700})
    })
    var llcan = $('#ll-canvas, #ll-canvas-shadow');
    HappyTree.canvas.set_rotation(-60 * 0.21, 60 * 0.021);
    // alert('going rogue')

    $('.whatIs').html('Canvas')
    TweenLite.set($('#ll-canvas-container'), {
      opacity: 0
    });
    if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {
      var llcan = $('#ll-canvas, #ll-canvas-shadow');
      poo('going rogeu')

      /*$('#ll-canvas-container').append('<div class="andBot"></div>')*/
      if (mack.vars.landscape) {
        TweenLite.to($('#ll-canvas-container'), 0.1, {
          top: '-67px'
        })
        TweenLite.set(llcan, {
          opacity: 0
        })
      } else {
        TweenLite.to($('#ll-canvas-container'), 0.05, {
          top: '-67px'
        })
        TweenLite.set(llcan, {
          opacity: 0
        })

      }

      TweenMax.to($('#ll-canvas-container'), 1, {
        visibility: 'visible',
        opacity: 1
      });
    } else {
      if (Environment.isMobile() && Environment.isAndroid()) {

      } else {
        TweenMax.to($('#ll-canvas-container'), 4, {
          visibility: 'visible',
          opacity: 1
        });
      }


    }




  },
  bringGif: function() {
    $('.whatIs').html('Gif')
    $('.gifMe').css({
      display: 'block',
      opacity: 1
    })

    /*mack.apiText();*/
    $('.gifMe').css({
      visibility: 'visible',
      opacity: 1,
      display: 'block'
    });
    // alert('still')
    mack.vars.tomsDone = true;
    $('#menu ul li').css({
      width: '150px'
    })
    /*TweenLite.to($('#stats'),1,{display:'block',opacity:1})*/
    /*mack.peepShow()*/
    mack.apiText();
    /* $('#stats').fadeIn('slow')*/
    // alert('going to gif')

    //
    /* Klang.triggerEvent('sound_off');
     $('.gifMe').css({visibility:'visible'}).fadeOut().show().fadeIn('slow');
     $('#menu ul li').css({width:'150px'})*/
  },
  apiText: function(cases) {

    var str = "";
    //  poo('api text')
    poo('apitText called case is ')
    poo(mack.vars.tagline)

    switch (cases) {
      case 0:


        str = mack.vars.tagline.tagline;

        if (str) {
          str = str.replace("{value}", mack.vars.values[0]);
          str = str.replace("{number}", mack.vars.tagline.number);
          textFieldChildrenP.text(str);
          mack.vars.tagline.tagline = str;

        }

        TweenMax.to($('.gifMe'), 4, {
          onUpdate: mack.ticker(cases)
        })
        mack.vars.base = mack.vars.tagline.number;
        mack.vars.animBase = mack.vars.tagline.number;

        break;
      case 1:


        break;
      case 2:
        break;
      default:

        mack.vars.ab = 1;


        if (Environment.isIe() && Environment.isIe() <= 9) {

          var api = mack.vars.tagline;

          var str = "";

          str = api.tagline;
          if (str) {

            if (mack.vars.currentApiId == 5) {
              var statName = "getty" + mack.vars.setCurTag + "Json";
              str = str.replace("{value}", mack.vars.staticData[statName].value);
            } else {
              str = str.replace("{value}", api.values[0]);
            }

            str = str.replace("{number}", api.number);
          }

          /*poo(str)*/
          mack.vars.tagline.tagline = str;
          textFieldChildrenP.text(str);



        } else {
          str = mack.vars.tagline.tagline;


          if (str) {
            if (mack.vars.currentApiId == 5) {
              var statName = "getty" + mack.vars.setCurTag + "Json";

              if (typeof mack.vars.staticData[statName] !== 'undefined') {
                str = str.replace("{value}", mack.vars.staticData[statName].value);
              }
            } else {
              if (typeof str !== 'undefined') {


                str = str.replace("{value}", mack.vars.values[0]);
              }
            }

            // }
            if (mack.vars.tagline.hasNumberAnimation) {
              str = str.replace("{number}", mack.vars.tagline.number);
            }

          }


          var score = mack.vars.tagline.number;
          var targetScore = mack.vars.tagline.number * 1.8;


          // textFieldChildrenP.text( str );
          //  TweenMax.to($('.gifMe'), 2, {onUpdate:mack.ticker(cases)})

          function showScore() {

            /*poo(score++);*/
            //poo(int(score));
            if (Environment.isIe() && Environment.isIe <= 9) {

            } else {
              str = mack.vars.tagline.tagline;

              if (str) {

                // if(mack.vars.tagline.hasValueAnimation){
                if (mack.vars.currentApiId == 5) {

                  if (typeof mack.vars.staticData[statName] !== 'undefined') {
                    var statName = "getty" + mack.vars.setCurTag + "Json";
                    str = str.replace("{value}", mack.vars.staticData[statName].value);
                  }
                } else {
                  if (typeof mack.vars.values !== 'undefined') {
                    str = str.replace("{value}", mack.vars.values[0]);
                  }
                }
                if (mack.vars.tagline.hasNumberAnimation) {
                  str = str.replace("{number}", score);
                }
                textFieldChildrenP.text(str);
                score++;
              }

            }


          }

          function allClear() {
            //mack.vars.green = 1;
          }

          if (mack.vars.isKosher) {
            if (mack.vars.ran) {
              var showWait = 7000;
              if (mack.vars.currentApiId == 5) {
                var showWait = 7500;

              }


            } else {
              var showWait = 100;
            }
          } else {
            var showWait = 100;
          }

          if (Environment.isIe() && Environment.isIe <= 9) {

          } else {
            mack.vars.base = mack.vars.tagline.number;
            mack.vars.animBase = mack.vars.tagline.number;
            mack.vars.textAnimLength = 30;

            if (mack.vars.currentApiId == 5) {
              mack.vars.textAnimLength = 35;

            }


            setTimeout(function() {


              var curCount = TweenLite.to(this, mack.vars.textAnimLength, {
                score: targetScore,
                onUpdate: showScore,
                ease: Linear.easeNone,
                onComplete: allClear
              });
            }, showWait)

          }

          // mack.vars.tagline.tagline = str;
          mack.vars.ab = mack.vars.animBase
        }

        break;
    }

    if (mack.vars.ran || mack.vars.big) {
      /*mack.canApi(mack.vars.logoIndex+1)*/
      if (mack.vars.isKosher) {
        mack.peepShow()
      }

    }
    if (!mack.vars.green) {
      /*poo('geen log '+mack.vars.logoIndex)*/
      $('#logo').fadeOut();
    }

    //  }




  },
  ticker: function(cases) {
    /*alert('bing')*/

    var str = mack.vars.tagline.tagline;

    mack.vars.ab++;
    // poo(mack.vars.ab)

    str = str.replace("{number}", mack.vars.ab);
    textFieldChildrenP.text(str);
  },
  pauseAll: function() {
    $('audio').each(function(ind, val) {
      $(val)[0].pause();
      $(val)[0].currentTime = 0;
    })
  },
  playCanAudio: function() {
    if (mack.vars.isKosher) {

    } else {
      switch (mack.vars.logoIndex) {
        case 0:
          $('.bInsta')[0].play()
          break;
        case 1:
          $('.bTwit')[0].play()
          break;
        case 2:
          $('.bNyt')[0].play()
          break;
        case 3:
          $('.bAmazon')[0].play()
          break;
        case 4:
          $('.bLast ')[0].play()
          break;
        case 5:
          $('.bGetty ')[0].play()
          break;
      }
    }
  },
  peepShow: function() {
    var peep = new TimelineLite();
    var stats = $('#stats');
    var logo = $('#logo');
    var llcan = $('#ll-canvas, #ll-canvas-shadow');
    var tl = new TimelineLite({
      paused: true
    });

    /*  alert('peep')*/
    // poo('peeepin')
    /*$('.nmb').addClass('avoid-clicks')*/
    $('#leftControls').removeClass('avoid-clicks')
    var windowWidth = window.screen.width < window.outerWidth ?
            window.screen.width : window.outerWidth;
    if (windowWidth <= mack.vars.small) {
      mack.vars.big = 0;
    } else {
      mack.vars.big = 1;
      /*poo(mack.vars.small)*/
    }

    mack.vars.tomsDone = false;
    $('.mNav').attr('disabled', true)
    TweenLite.to($('.mIcon'), 1, {
      opacity: 0.251
    })

    /* if(mack.vars.logoUp){
     killLogo();
     }*/

    function allClear() {
      mack.vars.green = 1;
      gateCheck = 1;
      // poo(gateCheck)
      /*    peep.to($('#logo'), 4, {opacity:1, display:'block',onComplete:showLogo})
       .to($('#logo'), 4,{opacity:0, display:'none', onComplete:tomsDone, delay:3})*/
    }

    function gate() {
      return gateCheck();
    }

    function tomsDone() {
      // poo('only now done')
      mack.vars.green = true;
      gateCheck = 1;
      $('.nmb').removeClass('avoid-clicks')
      mack.vars.tomsDone = true;
      mack.vars.freshStart = true;
      TweenLite.to($('.mIcon'), 1, {
        opacity: 1
      })
      $('.mNav').attr('disabled', false)
      mack.vars.ran = 1;
    }

    function ran() {
      mack.vars.ran = 1;
    }

    function restore() {
      /*poo('logo may pass')*/
      $('#menu li').removeClass('avoid-clicks')
      $('.mNav').attr('disabled', false)
      mack.vars.freshStart = true;

      mack.vars.tomsDone = true;
      TweenLite.to($('.mIcon'), 1, {
        opacity: 1
      })

      $('.mNav').attr('disabled', false)
      mack.vars.ran = 1;
    }

    function showLogo() {
      //  poo('showing: '+gateCheck)
    }

    poo('peep')


    // peep.play();


    mack.vars.smallDone = new $.Deferred();

    $.when(mack.vars.smallDone).done(function(doneSmall) {
      poo('finito peep')


      restore();
    })



    if (mack.vars.big || $(window).width() > mack.vars.small) {
      /*poo('biggz')*/
      TweenLite.set(stats, {
        opacity: 0
      })
      if (!mack.vars.green) {
        /* peep.pause(0);*/
        /* peep.clear();
         peep.restart();*/
        gateCheck = 0;
        //  poo('green')


      } else {
        gateCheck = 1;
      }
      /*logo.css({display:'none'})*/
      /*TweenLite.to(llcan,1,{opacity:0})*/
      function killLogo() {
        TweenMax.killTweensOf(logo);
        $(logo).stop().fadeOut('slow');

        TweenMax.set(logo, {
          clearProps: "all"
        });
        mack.vars.logoUp = false;
        /*poo('trying to merk logo')*/

      }

      function goLogo() {
        /*$(logo).css('display','block')*/
        mack.vars.logoUp = true;
        /*poo('going logo')*/
        //   if (mack.vars.freshStart) {
        $(logo).fadeIn('slow', function() {

          TweenMax.to(logo, 2, {
            opacity: 1,
            display: 'block'
          })
          restore()

        }).delay(5000).fadeOut('slow', function() {
          killLogo();

        })
        //    } else {
        restore()
        /*poo('nologo bro')*/
        //  }


      }


      /* This Defines the amount of time to wait before showing the API  */
      if (mack.vars.isKosher) {
        if (mack.vars.ran) {
          /* This Value depicts time between api */
          /*var showWait = 6000;*/
          var showWait = mack.vars.gapTime;
        } else {
          if (Environment.isMobile()) {
            var showWait = 100;
          } else {
            /* This Value depicts time api text waits after load.  */
            /*var showWait = 9500;  */
            var showWait = mack.vars.startGap;
          }

        }
      } else {
        var showWait = 100;
      }


      clearTimeout(thelma);
      clearTimeout(bubba);
      if (mack.vars.isKosher) {
        poo('going to go kosher')
        $('#menu li').addClass('avoid-clicks')
        mack.vars.freshStart = false;
        $(llcan).stop();
        $(logo).stop();
        TweenMax.killTweensOf(logo);
        /*clearTimeout(bubba);*/

        var showWait = 100;
        switch (mack.vars.currentApiId) {
          case 0:
            showWait = 600;
            break;
          case 1:
            showWait = 2600;
            break;
          case 2:
            showWait = 400;
            break;
          case 3:
            showWait = 1000;
            break;
          case 4:
            showWait = 800;
            break;
          default:
            showWait = 400;
            break;
        }
        /*awe('bubba')*/
        var bubba = setTimeout(function() {



          poo('we in bubba')
          /*TweenMax.set(logo, {clearProps:"all"});
           TweenMax.set(stats, {clearProps:"all"});*/

          $(llcan).fadeIn('slow', function() {
            var tBig = new TimelineMax();

            /*poo('fadedB')*/
            TweenMax.killTweensOf(logo);
            TweenMax.killTweensOf(stats);
            tBig.set(stats, {
              opacity: 0
            })
            tBig.set(logo, {
              opacity: 0
            })

            if (mack.vars.logoUp) {
              killLogo();
            }

            tBig.set(logo, {
              clearProps: "all"
            });

            tBig.set($('#bottomText #logo'), {
              /*'background-size': '285px',*/
              'background-size': '255px',
              left: '14px',
              top: '-20px'
            })
            /* poo('fadedB')
             TweenMax.set(logo, {clearProps:"all"});*/
            /*  TweenMax.set(stats, {
             clearProps: "all"
             });*/
            var waitApi = 4;
            poo('about to show stats')

            switch (mack.vars.currentApiId) {
              case 0:
                waitApi = 6;
                break;
              case 1:
                waitApi = 6;
                break;
              case 2:
                waitApi = 6;
                break;
              case 3:
                waitApi = 10;
                break;
              case 4:
                waitApi = 8;
                break;
              case 5:
                waitApi = 8;
                break;
              default:
                waitApi = 4;
                break;
            }
            poo(waitApi + " is the wait")

            tBig.to(stats, 6, {
              opacity: 1,
              display: 'block',
              onComplete: restore
            }, "+=" + waitApi)
            tBig.to(stats, 4, {
              opacity: 0,
              display: 'block',
              delay: 6,
              onComplete: goLogo
            })

          })

        }, showWait)

      } else {
        /*awe('thelma')*/

        poo('going to do the else')
        $(llcan).stop();
        $(logo).stop();
        /*poo('going for anim')*/

        var thelma = setTimeout(function() {
          if (mack.vars.logoUp) {
            killLogo();
          }

          TweenMax.killTweensOf(stats);
          var tl = new TimelineMax();
          /*TweenMax.set(logo,{opacity:0,display:'none'})*/
          /*TweenMax.set(logo, {clearProps:"all"});
           TweenMax.set(stats, {clearProps:"all"});*/



          //  $(llcan).fadeIn('slow', function() {
          /*  tl.set(logo, {
           clearProps: "all"
           });*/
          /*poo('faded init')*/

          /*  tl.set(stats, {
           clearProps: "all"
           });*/

          if (Environment.isMobile() && Environment.isMobile()[0] == "iPad") {
            var tl = new TimelineMax();


            poo('peep ipad')

            tl.set(llcan, {
              width: '160px',
              height: '160px'
            })
            if (mack.vars.landscape) {

              TweenLite.set($('#bottomText #logo'), {
                top: '67px'
              })
            } else {
              TweenLite.set($('#ll-canvas'), {
                marginLeft: "-55px"
              })
              TweenLite.set($('#bottomText #logo'), {
                top: '5px'
              })

            }
            tl.to(llcan, 4, {
              opacity: 1,
              display: 'block'
            })
            tl.to(llcan, 1, {
              opacity: 0,
              display: 'none'
            })
            /*tl.set(stats, {top:"-89px"})*/
            tl.to(stats, 4, {
              opacity: 1,
              display: 'block'
                      /*onComplete: restore*/
            })
            tl.to(stats, 2, {
              opacity: 0,
              display: 'none'
            })
            tl.to(llcan, 4, {
              opacity: 1,
              display: 'block',
              onComplete: goLogo
            })


          } else if (Environment.isMobile() && (Environment.isMobile()[0] == "iPhone" || Environment.isMobile()[0] == "iPod")) {
            poo('peep iphone main')



            if (mack.vars.landscape) {
              poo('going ports')
              TweenLite.set($('#bottomText #logo'), {
                top: '-30px'
              })
            } else {
              poo('going lands')
              TweenLite.set($('#bottomText #logo'), {
                top: '30px'
              })
            }

            tl.to(llcan, 4, {
              opacity: 1,
              display: 'block'
            })
            tl.to(llcan, 2, {
              opacity: 0,
              display: 'none'
            })
            //tl.set(stats, {top:"-89px"})
            tl.to(stats, 4, {
              opacity: 1,
              display: 'block'

                      //onComplete: restore
            })
            tl.to(stats, 2, {
              opacity: 0,
              display: 'none'
            })
            tl.to(llcan, 4, {
              opacity: 1,
              display: 'block',
              onComplete: goLogo
            })

            //}
            /*  tl.to(stats, 2, {
             opacity: 1,
             display: 'block',
             onComplete: restore
             })*/

          } else {
            poo('crates')
            awe('crates')

            if (Environment.isMobile() && Environment.isAndroid()) {
              TweenMax.set($('#ll-canvas'), {
                height: '240px',
                width: '240px',
                marginLeft: '-120px'
              });

              if (windowWidth >= 330 && windowWidth < 610) {
                TweenMax.set($('#ll-canvas'), {
                  height: '160px',
                  width: '160px'
                });

              }


              if (mack.vars.landscape) {
                poo('going ports')
                TweenLite.set($('#bottomText #logo'), {
                  top: '180px',
                  'background-size': '150px',
                  marginLeft: '10px'
                })
                TweenLite.set($('#bottomText'), {
                  top: '170px'

                })
                TweenLite.set($('#bottomText #stats'), {
                  width: '60%',
                  'text-align': 'left'

                })
              } else {
                poo('going lands')
                TweenLite.set($('#bottomText'), {
                  top: '170px'

                })
                TweenLite.set($('#bottomText #logo'), {
                  top: '180px',
                  'background-size': '150px',
                })
              }



              TweenMax.to($('#ll-canvas-container'), 4, {
                visibility: 'visible',
                opacity: 1
              });

              tl.to(llcan, 4, {
                opacity: 1,
                display: 'block'
              })
              tl.to(llcan, 2, {
                opacity: 0,
                display: 'none'
              })
              //tl.set(stats, {top:"-89px"})
              tl.to(stats, 4, {
                opacity: 1,
                display: 'block'

                        //onComplete: restore
              })
              tl.to(stats, 2, {
                opacity: 0,
                display: 'none'
              })
              tl.to(llcan, 4, {
                opacity: 1,
                display: 'block',
                onComplete: goLogo
              })

            } else {



              tl.set(logo, {
                clearProps: "all"
              });

              tl.to(stats, 2, {
                opacity: 1,
                display: 'block'
                        /*onComplete: restore*/
              })
              tl.to(stats, 2, {
                opacity: 0,
                delay: 4,
                display: 'none',
                onComplete: goLogo
              }, 2)
            }
          }

          /*tl.to(stats, 4, {
           opacity: 0,
           display: 'block',
           delay: 8,
           onComplete: goLogo
           })*/

          //  })
        }, 500);
      }




    } else {
      poo('Im small peep')
      mack.smallAnim();


      if (Environment.isMobile() && (Environment.isMobile()[0] == "iPhone" || Environment.isMobile()[0] == "iPod")) {
        poo('peep iphone ugz')
        var tlIp = new TimelineMax();
        tlIp.set(logo, {
          clearProps: "all"
        });

        tlIp.set(llcan, {
          width: '160px',
          height: '160px'
        })

        if (mack.vars.landscape) {
          poo('going ports')
          tlIp.set($('#bottomText'), {
            top: '150px'
          })
          tlIp.set($('#bottomText #stats'), {
            top: '10px'
          })
          tlIp.set($('#bottomText #logo'), {
            top: '67px',
            marginLeft: '11px'
          })

        } else {
          poo('going lands')
          tlIp.set($('#bottomText #logo'), {
            top: '40px'
          })
        }


        tlIp.to(llcan, 2, {
          opacity: 1,
          display: 'block'
        })
        tlIp.to(llcan, 1, {
          opacity: 0,
          display: 'none'
        })
        /*tlIp.set(stats, {top:"-89px"})*/
        tlIp.to(stats, 4, {
          opacity: 1,
          display: 'block'
                  /*onComplete: restore*/
        })
        tlIp.to(stats, 2, {
          opacity: 0,
          display: 'none'
        })
        tlIp.to(llcan, 4, {
          opacity: 1,
          display: 'block',
          onComplete: goLogo
        })


        //}
        /*  tl.to(stats, 2, {
         opacity: 1,
         display: 'block',
         onComplete: restore
         })*/

      }


    }



  },
  canApi: function(myCase) {
    /*poo('cancan')*/

    if (Environment.isIe() && Environment.isIe() <= 9) {
    } else {
      TweenLite.to(logo, 1, {
        opacity: 0
      })
      if (device.mobile()) {
        mack.apiText();
      }
      /*mack.apiText();*/
      mack.peepShow();
      setTimeout(function() {


        switch (myCase) {
          case 1:
            HappyTree.canvas.set_api('instagram');
            break;
          case 2:
            HappyTree.canvas.set_api('twitter');
            break;
          case 3:
            HappyTree.canvas.set_api('nyt');
            break;
          case 4:
            HappyTree.canvas.set_api('amazon');
            break;
          case 5:
            HappyTree.canvas.set_api('lastfm');
            break;
          case 6:
            HappyTree.canvas.set_api('getty');
            break;
        }

        TweenMax.to($('#ll-canvas'), 1, {
          opacity: 1
        })
      }, 1000)
    }
  },
  setCan: function(amount) {
    HappyTree.canvas.set_performance(amount);
    /*var ratio = parseInt(this.value)/1000;*/
    /*$('.ll-ratio').html((100 * amount) + '%');*/
  },
  hideText: function() {

  },
  randIntz: function(max, min) {

    var sme = Math.floor(Math.random() * max) + min;
    //  poo('rand:'+sme)
    return sme;
  },
  loadData: function() {

    //
    // Load all data
    //
    poo(rcLocaleJSDirectory)

    $.when(
            //
            LoadJsonData(staticData, "instagram1Json", rootPath + "images/" + rcLocaleJSDirectory + "/instagram-1.json"), LoadJsonData(staticData, "instagram2Json", rootPath + "images/" + rcLocaleJSDirectory + "/instagram-2.json"), LoadJsonData(staticData, "instagram3Json", rootPath + "images/" + rcLocaleJSDirectory + "/instagram-3.json")
            //
            , LoadJsonData(staticData, "twitter1Json", rootPath + "images/" + rcLocaleJSDirectory + "/twitter-1.json"), LoadJsonData(staticData, "twitter2Json", rootPath + "images/" + rcLocaleJSDirectory + "/twitter-2.json"), LoadJsonData(staticData, "twitter3Json", rootPath + "images/" + rcLocaleJSDirectory + "/twitter-3.json")
            //
            , LoadJsonData(staticData, "nytimes1Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-1.json"), LoadJsonData(staticData, "nytimes2Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-2.json"), LoadJsonData(staticData, "nytimes3Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-3.json"), LoadJsonData(staticData, "nytimes4Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-4.json"), LoadJsonData(staticData, "nytimes5Json", rootPath + "images/" + rcLocaleJSDirectory + "/nytimes-5.json")
            //
            , LoadJsonData(staticData, "amazon1Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-1.json"), LoadJsonData(staticData, "amazon2Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-2.json"), LoadJsonData(staticData, "amazon3Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-3.json"), LoadJsonData(staticData, "amazon4Json", rootPath + "images/" + rcLocaleJSDirectory + "/amazon-4.json")
            //
            , LoadJsonData(staticData, "lastfm1Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-1.json"), LoadJsonData(staticData, "lastfm2Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-2.json"), LoadJsonData(staticData, "lastfm3Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-3.json"), LoadJsonData(staticData, "lastfm4Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-4.json"), LoadJsonData(staticData, "lastfm5Json", rootPath + "images/" + rcLocaleJSDirectory + "/lastfm-5.json")
            ).done(function() {

      preloader.delay(100).fadeTo(2500, 0).delay(250, function() {

        mack.init();
      });
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

      for (var ii = 0; ii < json00Files.length; ii++) {
        LOG("*** INSTAGRAM json file status: " + json00Files[ii]);
      }
      for (var ii = 0; ii < json01Files.length; ii++) {
        LOG("*** TWITTER json file status: " + json01Files[ii]);
      }
      for (var ii = 0; ii < json02Files.length; ii++) {
        LOG("*** NYTIMES json file status: " + json02Files[ii]);
      }
      for (var ii = 0; ii < json03Files.length; ii++) {
        LOG("*** AMAZON json file status: " + json03Files[ii]);
      }
      for (var ii = 0; ii < json04Files.length; ii++) {
        LOG("*** LASTFM json file status: " + json04Files[ii]);
      }

      var api0ID = FindValidAPIID(json00Files);
      var instagramJpegFilename = rootPath + "images/instagram-" + api0ID + ".jpg";
      LOG("+++ Instagram selected index: " + api0ID);

      var api1ID = FindValidAPIID(json01Files);
      var twitterPngFilename = rootPath + "images/twitter-" + api1ID + ".png";
      LOG("+++ Twitter selected index: " + api1ID);

      var api2ID = FindValidAPIID(json02Files);
      var nytimesJpegFilename = rootPath + "images/nytimes-" + api2ID + ".jpg";
      LOG("+++ NYT selected index: " + api2ID);

      var api3ID = FindValidAPIID(json03Files);
      var amazonJpegFilename = rootPath + "images/amazon-" + api3ID + ".jpg";
      LOG("+++ Amazon selected index: " + api3ID);

      var api4ID = FindValidAPIID(json04Files);
      var lastfmJpegFilename = rootPath + "images/lastfm-" + api4ID + ".jpg";
      LOG("+++ LastFM selected index: " + api4ID);

      $.when(
              LoadRawData(staticData, "pathData", rootPath + "images/logo.path"), LoadTexture(staticData, "ll-bg", rootPath + "images/ll-bg.png"), LoadTexture(staticData, "ll-shadow-nopersp", rootPath + "images/ll-shadow-nopersp.png"), LoadShaderData(staticData, "PathDeformVertexShader", rootPath + "shaders/PathDeform.vertex"), LoadShaderData(staticData, "PathDeformFragmentShader", rootPath + "shaders/PathDeform.fragment"), LoadShaderData(staticData, "PathSimVertexShader", rootPath + "shaders/PathSim.vertex"), LoadShaderData(staticData, "PathSimFragmentShader", rootPath + "shaders/PathSim.fragment")
              //
              , LoadTexture(staticData, "instagram" + api0ID, instagramJpegFilename), LoadTexture(staticData, "twitter" + api1ID + "Json", twitterPngFilename), LoadTexture(staticData, "nytimes" + api2ID + "Json", nytimesJpegFilename), LoadTexture(staticData, "amazon" + api3ID, amazonJpegFilename), LoadTexture(staticData, "lastfm" + api4ID, lastfmJpegFilename)
              ).done(function() {
        PrepareData(api0ID, api1ID, api2ID, api3ID, api4ID);
      });
    });
  }
}

if (Environment.isIe() && Environment.isIe() <= 9) {
} else {



  if (device.mobile() || device.tablet()) {

    var p =
            {
              "getty": "2",
              "instagram": "3",
              "twitter": "3",
              "nytimes": "5",
              "amazon": "4",
              "lastfm": "5"
            };
    $.ajaxSetup({
      async: false
    });

    for (var key in p) {

      if (p.hasOwnProperty(key)) {

        var max = parseInt(p[key]);

        for (i = 1; i <= max; i++) {

          var url = rootPath + "images/" + rcLocaleJSDirectory + "/" + key + "-" + i + ".json";

          $.getJSON(url, function(data) {

            var status = data.status;

            if (status == 'on') {

              $('.mNavClone .' + key).appendTo($('.mNav'));

            }

          });
        }


      }
    }

    $('.mNav .lastfm').show();

    $.ajaxSetup({
      async: true
    });

    $('.insta').bind("touchstart", function() {
      mack.click.insta()
    })

    $('.twt').bind("touchstart", function() {

      mack.click.twt()
    })

    $('.amz').bind("touchstart", function() {

      mack.click.amz()
    })

    $('.nyt').bind("touchstart", function() {
      /*poo('nyt')*/
      mack.click.nyt()
    })

    $('.lastF').bind("touchstart", function() {
      /*poo('lass')*/
      mack.click.lastF()
    })

    $('.getty').bind("touchstart", function() {
      /*poo('lass')*/
      mack.click.getty()
    })

  } else {
    $('.insta').bind("click", function() {
      mack.click.insta()

    })

    $('.twt').bind("click", function() {
      mack.click.twt()

    })

    $('.amz').bind("click", function() {

      mack.click.amz()
    })
    $('.nyt').bind("click", function() {
      mack.click.nyt()

    })
    $('.lastF').bind("click", function() {
      /*poo('lassa')*/
      mack.click.lastF()

    })
    $('.getty').bind("click", function() {
      /*poo('lassa')*/
      mack.click.getty()

    })

  }


  $('.canSet').on('click', function(e) {
    //e.preventDefault()
    e.stopPropagation();
    var valz = $('.canVal').attr('value');

    if (valz >= 1.000001) {
      mack.setCan(1)
    } else {
      mack.setCan(valz * 0.001)
    }

  })

}


if (Environment.isIe() && Environment.isIe() <= 9) {


  /*$('.insta').attr('onclick', 'ieMe.insta()');
   //do something
   
   }*/



} else {

  if (Environment.isChrome()) {
    var osh = (function() {
      var ua = navigator.userAgent.toLowerCase();
      return {
        isWin2K: /windows nt 5.0/.test(ua),
        isXPa: /windows nt 5.1/.test(ua),
        isXP: /windows nt 5.2/.test(ua),
        isVista: /windows nt 6.0/.test(ua),
        isWin7: /windows nt 6.1/.test(ua),
        isWin8: /windows nt 6.2/.test(ua),
        isWin81: /windows nt 6.3/.test(ua)
      };
    }());

    if (osh.isXP || osh.isXPa || osh.isVista) {
      mack.vars.isKosher = false;
    } else {
      if (Detector.webgl) {
        mack.vars.isKosher = true;
      } else {
        mack.vars.isKosher = false;
      }
    }
  }

  if (Environment.isFire()) {

    if (Detector.webgl) {
      mack.vars.isKosher = true;
    } else {
      mack.vars.isKosher = false;
    }

  }


  $(function() {
    //Klang.triggerEvent('sound_off');
    mack.vars.tomsDone = true;
    mack.vars.isKosher = false;
    var osh = (function() {
      var ua = navigator.userAgent.toLowerCase();
      return {
        isWin2K: /windows nt 5.0/.test(ua),
        isXPa: /windows nt 5.1/.test(ua),
        isXP: /windows nt 5.2/.test(ua),
        isVista: /windows nt 6.0/.test(ua),
        isWin7: /windows nt 6.1/.test(ua),
        isWin8: /windows nt 6.2/.test(ua),
        isWin81: /windows nt 6.3/.test(ua)
      };
    }());

    if (Environment.isChrome() && !device.mobile()) {
      /*alert('should be kosher')*/
      /* if(Environment.windowWhat()){
       alert('somethings wrong with your window')
       } else {*/


      if (osh.isXP || osh.isXPa || osh.isVista) {
        mack.vars.isKosher = false;
      } else {
        if (Detector.webgl) {
          mack.vars.isKosher = true;
        } else {
          mack.vars.isKosher = false;
        }
      }
      /*mack.vars.isKosher = true;*/
      // }

    }

    if (Environment.isFire()) {
      /*if(Environment.windowWhat()){
       
       } else {*/

      if (osh.isXP || osh.isXPa || osh.isVista) {
        mack.vars.isKosher = false;
      } else {
        if (Detector.webgl) {
          mack.vars.isKosher = true;
        } else {
          mack.vars.isKosher = false;
        }
      }
      // }
    }

    if (mack.vars.isKosher) {

    } else {



    }

  })
}


/* This set viewport for android Browser */
$(function() {
  if (/Android/i.test(navigator.userAgent)) {
    var ww = ($(window).width() < window.screen.width) ? $(window).width() : window.screen.width; //get proper width
    var mw = 480; // min width of site
    var ratio = ww / mw; //calculate ratio
    if (ww < mw) { //smaller than minimum size
      $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
    } else { //regular size
      $('#Viewport').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
    }
  }
});
/*Above is for android browser viewports*/



$(function() {
  $('#mega-nav-container #menu li').on('click', function(ev) {

    if (mack.vars.isKosher) {
      if (kCanClick) {
        if ($(this).find('span').hasClass('getty')) {
          poo('going light')
          $('#zoom-controls').css({
            display: 'block!important'
          })
        } else {
          poo('going dark')
          $('#zoom-controls').css({
            display: 'none!important'
          })
        }
      }
    } else {
      if ($(this).find('span').hasClass('getty')) {
        /*alert('getty click')*/
      }

    }

  })
  $('#rightControls').on('click', function(ev) {
    if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {

      setTimeout(function() {
        mack.audioMagic();
      }, 1000)

    } else {

      /*console.log('go big or home')*/
      switch (mack.vars.logoIndex) {
        case 0:
          $('.zoom-icon').css({
            display: 'block'
          })
          break;
        default:
          $('.zoom-icon').css({
            display: 'none'
          })
          break;
      }

      setTimeout(function() {
        mack.audioMagic();
      }, 1000)



    }
  })
  $('.bigMenuB #mega-nav-container #menu li').on('click', function(ev) {

    /*console.log('big meny click')
     console.log($(this).find('span'))*/
    if (mack.vars.isKosher) {

      if (kCanClick) {
        if ($(this).find('span').hasClass('getty')) {

          $('.zoom-icon').css({
            display: 'block'
          })
        } else {
          $('.zoom-icon').css({
            display: 'none'
          })
        }
      }
    } else {
      if ($(this).find('span').hasClass('getty')) {
        /*alert('getty click')*/
      }

    }

  })
})