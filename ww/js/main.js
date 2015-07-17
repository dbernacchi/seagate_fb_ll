var mousedowned = false;
var _globalPause = false;
var allFades = [];
var _mainGlobalPush = function(){
	$(allFades).each(function(){
		//this.autoSwitch();
	});
};
$(document).ready(function() {

    var sc_width = $('#supportCorner').outerWidth();
    var sc_left = 0;
    if ($('#supportCorner').offset() != null)
        sc_left = $('#supportCorner').offset().left;
    var ic_width = $('#infoCorner').outerWidth();
    var sb_width = $('#sliderButton').outerWidth();


	$('#supportCorner').click(function(event) {
        event.preventDefault();
    });

    $('#infoCorner').click(function(event) {
        event.preventDefault();
    });

    $('#supportCorner').mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '+118'}, 500, function() { });
        mousedowned = false;
    });

    $('#infoCorner').mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '-10'}, 500, function() { });
        mousedowned = false;
    });

    $('#sliderBox').mousedown(function(event) {
        event.preventDefault();
        oldpos = event.pageX;
        mousedowned = true;
        $(document).trigger(mouseup);
    });

    $(document).mouseup(function(event) {
        event.preventDefault();
        if (mousedowned)
        {
            if ($('#sliderButton').offset().left > 1100)
            {
                $('#sliderButton').animate({ left: 118}, 500, function() {  });
            }
            else
            {
                $('#sliderButton').animate({ left: -10}, 500, function() {  });
            }
        }
        mousedowned = false;
    });

	$('#sliderBox').mousemove(function(event) {
		if (mousedowned)
		{
			var current_left = $('#sliderButton').css('left').replace('px', '');
			var current_x_offset = $('#sliderButton').offset().left;
			var movement = event.pageX - oldpos;
            
            if (current_x_offset + movement <= (sc_left+sc_width-sb_width) && (current_x_offset + movement) >= 1044)
            {
			    $('#sliderButton').offset({left: current_x_offset + movement})
			    oldpos = event.pageX;
            }
            else if (current_x_offset + movement > (sc_left+sc_width-sb_width))
            {
                $('#sliderButton').css('left', 118);
            }
            else if ((current_x_offset + movement) < 1044)
            {
                $('#sliderButton').css('left', -10);
            }
		}
	});	
//VideoJS.setupAllWhenReady();
	$('#ALGContainer').ALGGallery({
		'elements' : '#MyThumbnails',
		'text'     : '#MyText'
	});

	/*$(function(){
		$('a.withTooltip').aToolTip({
			fixed: true,
			tipContent: '<span>Works With:</span> <strong>Windows&reg; 7, Windows Vista&reg;, Windows&reg; XP</strong> (32–bit &amp; 64–bit) <span>operating system</span>'
		});
		$('.tooltipFrame a').aToolTip({
			fixed: true,
			tipContent: '<span>Works With:</span> <strong>Windows&reg; 7, Windows Vista&reg;, Windows&reg; XP</strong> (32–bit &amp; 64–bit) <span>operating system</span>'
		});
	}); */

	$("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);
//init fade
	jQuery('.carousel').fadeGallery({
		listSelector: '.fadeGallery> li',
		navHolder:		'div.switcher',
		navCreate:		true,
		swichTime:		3000,
		delay:			800,
		fadeIEfix:		false
	});
	jQuery('.video_carousel').fadeGallery({
		listSelector: '.fadeGallery> li',
		navHolder:		'div.switcher',
		navCreate:		true,
		// swichTime:		3000,
		// delay:			800,
		fadeIEfix:		false
	});
	
//init tabs
	initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	initTabs('#main', '.tabset li', '.tabBox .tabEl');

});
/*fadeGallery*/
jQuery.fn.fadeGallery = function(_options){
	var _options = jQuery.extend({
		listSelector: '> li',
		navHolder:		false,
		navCreate:		false,
		thumbsSelector: 'li',
		prev:			'a.prev',
		next:			'a.next',
		swichTime:		false,
		autoHeight:		true, 
		delay:			900,
		fadeIEfix:		false,
		onChange:		null
	},_options);

	this.each(function(){
		allFades[allFades.length] = this;
	})

	return this.each(function(){
		var _swichTime = _options.swichTime;
		var _d = (_options.fadeIEfix) ? ($.browser.msie ? 0 : _options.delay) : (_options.delay);
		var _this = $(this);
		var _list = $(_options.listSelector, _this);
		var _linksHold = $(_options.navHolder, _this);
        var _heights = new Array();


		if(_options.navCreate){
			var _htmlNav ='<ul>';
			for(var i=0; i<_list.length; i++) {
				_htmlNav += '<li><a href="#">'+(i+1)+'</a></li>';
			}
			_htmlNav +='</ul>';
			_linksHold.html(_htmlNav);
		}
		if(_options.navHolder) var _links = jQuery(_options.thumbsSelector, _linksHold);
		else var _links = jQuery(_options.thumbsSelector, _this);
		var _btnPrev = $(_options.prev , _this);
		var _btnNext = $(_options.next , _this);
		var _a = _list.index(_list.filter('.active:eq(0)'));
		if(_a == -1) _a = 0;
		var _t;
		this.paused = false;
		this.over = false;

        _list.each(function(index) {
            _heights.push($(this).height());
        });

		_list.removeClass('active').css({
				display: 'none',
				opacity: 0,
				position: 'absolute',
				left:0,
				top:0
			}).eq(_a).addClass('active').css({display: 'block', opacity: 1}).css('opacity', 'auto');
		if(_options.autoHeight) 
		//_list.parent().animate({height: _list.eq(_a).height()},_d);
        _list.parent().animate({height: _heights[_a]},_d);
		_links.eq(_a).addClass('active');	

		this.autoSwitch = function(){
			if(_t) clearInterval(_t);
			if (_swichTime && !_globalPause){
				_t = setInterval(function(){
					if(_a < _list.length - 1) changeEl(_a + 1);
					else changeEl(0);
				}, _swichTime);
			}
		}
		this.autoSwitch();

		if (_btnPrev){
			_btnPrev.click(function(){
				var _prevItem = 0;
				if (_a > 0) _prevItem = _a-1;
				else _prevItem = _list.length-1;
				changeEl(_prevItem);
				return false;
			})
		}
		if (_btnNext){
			_btnNext.click(function(){
				var _nextItem = 0;
				if (_a < _list.length - 1) _nextItem = _a+1;
				else _nextItem = 0;
				changeEl(_nextItem);
				return false;
			})
		}
		_this.mouseenter(function(){
			_globalPause= true;
			_this.over = true;
			if(_t) clearInterval(_t);
		}).mouseleave(function(){
			_globalPause= false;
			_this.over = false;
			_mainGlobalPush();
		});

		if(_links){
			_links.click(function(){
				var _ind = _links.removeClass('active').index($(this).addClass('active'));
				changeEl(_ind);
				return false;
			})
		}
		
		function changeEl(_ind){
			if(_t) clearInterval(_t);
			if(!_globalPause || _this.over){
			if(_list.is(':animated')) _list.stop(true, true);
				if(_ind != _a){
					_links.removeClass('active').eq(_ind).addClass('active');
					_list.eq(_a).removeClass('active').animate({opacity: 0}, {queue:false, duration:_d, complete: function(){$(this).css({display:'none'})}});
					_list.eq(_ind).addClass('active').css({opacity: 0, display:'block'});
					if(_options.autoHeight) {
                        //_list.parent().animate({height: _list.eq(_ind).height()},_d);
                        _list.parent().animate({height: _heights[_ind]},_d);
                    }
					_list.eq(_ind).animate({opacity: 1}, {queue:false, duration:_d,complete:function(){
						$(this).css('opacity', 'auto');
						_a = _ind;
						_this.get(0).autoSwitch();
						if (jQuery.isFunction(_options.onChange)) {
							_options.onChange.apply(_this);
						};
					}});
				}
			};
		}
	});
};

