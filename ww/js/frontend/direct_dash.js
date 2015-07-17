/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 11:05
 */

$(document).ready(function() {
	//init media popup
	$(".galleryLearn .holder li > a").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			centerOnScroll		: true,
			'onComplete'		:function(){
				$('.galleryProduct').galleryScroll({
					btPrev: 'a.btnPrev',
					btNext: 'a.btnNext',
					holderList: 'div.holder',
					scrollElParent: 'ul',
					scrollEl: 'li',
					slideNum: 'div.switcher',
					duration : 1000,
					circleSlide: true,
					disableClass: 'disable',
					funcOnclick: null,
					autoSlide:false
				});
				$("a.videoCallBtn ").fancybox(
					{
						'padding'			: 0,
						'autoScale'			: false,
						'transitionIn'		: 'none',
						'transitionOut'		: 'none',
						centerOnScroll		: true
					}
				);
			}
		}
	);
	$("a.shipmentDetailsBtn").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);		
	$(".newsFeed li a.modalBox").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			centerOnScroll		: true
		}
	);		
	$(".alertMessage .btnClose").click(function(){
		$(this).parent().css("display", "none");
	});
	
	//init custom scroll
	$(function() {
		$('.box .contentScrol').jScrollPane({showArrows: true});
	});
	$("a.shipmentDetailsBtn").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			centerOnScroll		: true
		}
	);
	$("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);
	$('.gallery').galleryScroll({
		btPrev: 'a.btnPrev',
		btNext: 'a.btnNext',
		holderList: 'div.holder',
		scrollElParent: 'ul',
		scrollEl: 'li',
		slideNum: 'span.switcher',
		duration : 1000,
		circleSlide: true,
		disableClass: 'disable',
		funcOnclick: null
	});

	$('.galleryLearn').galleryScroll({
		btPrev: 'a.btnPrev',
		btNext: 'a.btnNext',
		holderList: 'div.holder',
		scrollElParent: 'ul',
		scrollEl: 'li',
		slideNum: 'div.switcher',
		duration : 1000,
		circleSlide: true,
		disableClass: 'disable',
		funcOnclick: null,
		autoSlide:false
	});

	//init tabs
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	//init fade gallery
	$('.newsFeed').fadeGallery({
		listSelector: '#newsFeedScroll > li',
		navCreate:		true,
		swichTime:		3000,
		delay:			800,
		fadeIEfix:		false,
		mouseOverPause:	true
	});

	if(document.newsFeedForm != undefined && document.newsFeedForm.twitterID != undefined){
		getTwitterFeed(document.newsFeedForm.twitterID.value,"twitterFeed", "#newsFeed > li");
	} else {
		$("#twitterFeed").remove();
		$('#newsBarHoldLI').fadeGallery({
			listSelector: '#newsFeed > li',
			navCreate:		true,
			swichTime:		3000,
			delay:			800,
			fadeIEfix:		false,
			mouseOverPause:	true
		});
	}
        
	//remove application items
	var removedIdValue= $("#removedID").attr("value");
	var removedIdValueArray=removedIdValue.split(",");
	for(var i=0;i<removedIdValueArray.length;i++){
		$(removedIdValueArray[i]).remove();
	}        
	//init accordion	
	$('ul.accordion').accordion({ 
            autoHeight: false ,
            collapsible : true
        });
        $('ul.accordion li span.ui-icon').css('display', 'none');  
});



/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/*window.onload = function() {
	$('#newsBarHoldLI').fadeGallery({
		listSelector: '#newsFeed > li',
		navCreate:		true,
		swichTime:		3000,
		delay:			800,
		fadeIEfix:		false,
		mouseOverPause:	true
	});

};*/