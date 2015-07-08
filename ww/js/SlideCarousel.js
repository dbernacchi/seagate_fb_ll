/**
 * Created by JetBrains PhpStorm.
 * User: balaban
 * Date: 19.04.11
 * Time: 8:13
 * To change this template use File | Settings | File Templates.
 */
jQuery.fn.SlideCarousel = function(method)
{
    var options =
    {
        'btnPrev'           : '.btnPrev',
        'btnNext'           : '.btnNext',
        'listHolder'        : '.mainGalleryList',
        'step'              : 1,
        'size'              : 84.5,
        'sliderBar'         : '.statusBar',
        'slider'            : '.statusBarBullet',
        'speed'             : 500
    };

    var container = $(this);
    if(rcLocaleJS=="ar-em"){
    	var html = "";
		var m = $(".mainGalleryList").find("li").length - 1;
		if($(".mainGalleryList").find("li").length<=4){
			$(".mainGalleryList").find("ul").css("float","right");
			$(".mainGalleryList").find("ul").css("width","auto");
		}
		for (var i = m; i >= 0; i--) {
			html += "<li>" + $(".mainGalleryList").find("li").eq(i).html() + "</li>";
		}
		$(".mainGalleryList").find("ul").html(html);
    }
    var _btnPrev = null;
    var _btnNext = null;
    var _sliderBar = null;
    var _slider = null;
    var _listHolder = null;

    var pos = 0;
    var max_pos = 0;
    var _animating = false;
    var sliderPositions = new Array();

    var _sliderInAction = false;
    var _prevMousePos = null;

    var methods = {
        init : function(custom_options)
        {
            $.extend(options, custom_options);

            _btnPrev = $(this).find(options.btnPrev);
            _btnNext = $(this).find(options.btnNext);

            _sliderBar = $(this).find(options.sliderBar);
            _slider = _sliderBar.find(options.slider);

            _listHolder = $(this).find(options.listHolder);
            
            if (_listHolder.children('ul').children('li').length <= 4)
        	{
            	return;
        	}
            initialize();
            assignPrevNextButtonClick();
            assignSliderEvents();
            checkButtons();

            $(this).data('options', options);                        

            return this;
        }

    };

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.SlideCarousel' );
    }

    function initialize()
    {
        max_pos = parseInt(_listHolder.children('ul').children('li').length / options.step) - 4;
        for (i = 0; i <= max_pos; i++)
        {
            if (i == 0) {
				sliderPositions.push(0);
			}
            else if(i == max_pos)
            {
                sliderPositions.push(_sliderBar.width() - _slider.width() + 3);
            }
            else
            {
                var step_length = parseInt(463 / max_pos); 
                sliderPositions.push(i * step_length);
            }
        }
        if(rcLocaleJS=="ar-em"){
        	noAnimate(max_pos);
    	}
    }

    function assignPrevNextButtonClick()
    {
        _btnNext.click(function(event) {
           event.preventDefault();
           event.stopPropagation();

           if (pos < max_pos)
           {
               animate(pos+1);
           }
        });
        _btnPrev.click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           if (pos > 0)
           {
               animate(pos-1);
           }
        });
    }

    function animate(curr_pos)
    {
        if (!_animating)
        {
            _animating = true;
               $(this).data('_animating', _animating);
               pos = curr_pos;
               $(this).data('pos', pos);
	   				_slider.animate({
	   					"left" : sliderPositions[Math.abs(pos)]
	   				}, options.speed, "swing");
	   				_listHolder.find("ul").animate({
	   					"margin-left" :  - (pos * (options.size + 5) * (options.step + 1))
	   				}, options.speed, "swing", function () {
	   					_animating = false;
	   					$(this).data("_animating", _animating);
	   					checkButtons();
	   				});
        }
    }
	
	function noAnimate(curr_pos) {
		pos = curr_pos;
		_slider.css(
		   {
			   'left': (sliderPositions[Math.abs(pos)])
		   }
		);
		_listHolder.find('ul').css(
		   {
			   'margin-left': -(pos * (options.size + 5) * (options.step + 1)+10)
		   },
		   function() {
			   checkButtons();
		   }
		)
    }

    function checkButtons()
    {
        if (pos == 0)
           _btnPrev.addClass('prev-disable');
        else
           _btnPrev.removeClass('prev-disable');
        if (pos == max_pos)
           _btnNext.addClass('next-disable');
        else
           _btnNext.removeClass('next-disable');
    }

    function assignSliderEvents()
    {
        _slider.mousedown(function(event) {
            event.preventDefault();
            event.stopPropagation();
            _sliderInAction = true;
        });

        $(window).mouseup(function(event) {
           if (_sliderInAction)
           {
               event.preventDefault();
               event.stopPropagation();
               _prevMousePos = null;
               _sliderInAction = false;

               var min_diff = 9999;
               var nearest_pos = 0;
               for (i = 0; i <= max_pos; i++)
               {
                   if (Math.abs(_slider.offset().left - _sliderBar.offset().left - sliderPositions[i]) < min_diff)
                   {
                       min_diff = Math.abs(_slider.offset().left - _sliderBar.offset().left - sliderPositions[i]);
                       nearest_pos = i;
                   }
               }
               animate(nearest_pos);
           }
        });

        $(window).mousemove(function(event) {
           if (_sliderInAction)
           {
               if (_prevMousePos !== null)
               {
                   var movement = parseInt(event.pageX - _slider.offset().left - _prevMousePos);
                   if (_slider.offset().left - _sliderBar.offset().left + movement < 0) movement = _slider.offset().left - _sliderBar.offset().left;
                   if ((_slider.offset().left - _sliderBar.offset().left + movement + 2) > sliderPositions[sliderPositions.length-1])
                   {
                       movement = sliderPositions[sliderPositions.length-1] - (_slider.offset().left - _sliderBar.offset().left) + 1;
                   }
                   _slider.offset( { left: _slider.offset().left + movement } );
                   _prevMousePos = event.pageX - _slider.offset().left;
               }
               else
               {
                   _prevMousePos = event.pageX - _slider.offset().left;
               }
           }
        });

        _sliderBar.click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            var temp_pos = event.pageX - _sliderBar.offset().left;
            var min_diff = 9999;
            var nearest_pos = 0;
            for (i = 0; i <= max_pos; i++)
            {
               if (Math.abs(temp_pos - sliderPositions[i]) < min_diff)
               {
                   min_diff = Math.abs(temp_pos - sliderPositions[i]);
                   nearest_pos = i;
               }
            }
            animate(nearest_pos);
        });
    }
}