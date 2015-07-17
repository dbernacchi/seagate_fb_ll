//Fall back to a scripted solution if no placeholder support
var placeholderSupported = ( 'placeholder' in document.createElement('input') );
if (placeholderSupported === false) {
	$.getScript("/ww/universal/js/rAF.min.js"); //required if hideOnFocus is set to false to be able to efficiently poll for input text changes, hide the placeholder on focus or on type.
	$.getScript("/ww/universal/js/placeholder_polyfill.jquery.js");
}

function setStayInformedCountry(){

	if($('#StayInformedCountry option:selected').val() != UserCountryCode){
    	$('#StayInformedCountry option:selected').removeAttr('selected');
    	$('#StayInformedCountry option[value = '+ UserCountryCode +']').prop('selected',true);
    	$('#EloquaCountry').val($('#StayInformedCountry option:selected').attr('label'));
	} else{
		$('#EloquaCountry').val($('#StayInformedCountry option:selected').attr('label'));
	}
}

$('#StayInformedCountry').on('change', function () {
    var option_label = $('#StayInformedCountry :selected').attr('data-label');
    $('#EloquaCountry').val(option_label);
}).trigger('change');



/* This function simulates a form submit for usability testing purposes. Will need to refactored for production use */
var stayInformedTimeoutID;
$('#stay-informed').submit(function() {
	// Clear any previous error messages
	$('#stay-informed-first-name-error').removeClass('show');
	$('#stay-informed-last-name-error').removeClass('show');
	$('#stay-informed-email-error').removeClass('show');
	
	if(!($.trim($('#stay-informed-first-name').val()).length > 0)) {
		$('#stay-informed-first-name-error').addClass('show');
		return false;
	}
	if(!($.trim($('#stay-informed-last-name').val()).length > 0)) {
		$('#stay-informed-last-name-error').addClass('show');
		return false;
	}
	if(!($.trim($('#stay-informed-email').val()).length > 0)) {
		$('#stay-informed-email-error').addClass('show');
		return false;
	}
	var reMail = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
	if($('#stay-informed-email').val().match(reMail) == null) {
		$('#stay-informed-email-error').addClass('show');
		return false;
	}
	  
	$('#stay-informed').hide();
	$('.stay-informed-content').append('<div class="pdp-buy-loading"><p>&nbsp;</p></div>');
	
    var frm = $('#stay-informed');
	$.ajax({
		type: frm.attr('method'),
		url: frm.attr('action'),
		data: frm.serialize(),
		complete: function (data, status) {
			$('.stay-informed-content .pdp-buy-loading').addClass('done').html('<p>' + stayInformedSucessMsg + '</p>');
		}
	});		
	
	stayInformedTimeoutID = window.setTimeout(function() {
		$(".stay-informed-open").click();
	}
	, 4000);
	return false;
});



$(document).ready(function () {


   setStayInformedCountry(); // setting the default country in the form based on the user ip geolocation
  
    $('#EloquaCountry').val($('#StayInformedCountry :selected').attr('data-label')); // set eloqua country to the geolocation selected above.

	
	//Detect safari on windows to fix video float issue in pdp support
	var userAgent = navigator.userAgent.toLowerCase();
	
	var safari = userAgent.indexOf("webkit")!=-1 && userAgent.indexOf("chrome")==-1;
	var windows = userAgent.indexOf("win")!=-1;
	 
	if (safari && windows) {
		$("body").addClass("safari-windows");
	}
	
	// Click on the fake tab to trigger the hidden tab button
	$('.pdp-main-tab-dropdown-menu > li > a:first-of-type[href^=#]').on("click touchstart", function (e) {
		e.preventDefault();
		var tabURL = $(this).attr('href');
		$(this).parents('.pdp-tab').attr('id',tabURL.replace("#",""));
		//Display selected dropdown item
		$('.tab-to-drop-display').html($(this).html());
		$(this).siblings('a[data-toggle="tab"]').on('shown', function (e) {
			window.location.hash = tabURL;
			$(this).parents('li.dropdown').removeClass('open');
		});
		$(this).siblings('a[data-toggle="tab"]').tab('show');
		
	    if ($("#support-tab").attr("class") == "active"){
	    	$(".btn-group").show();
	    }
	    else
    	{
	    	$(".btn-group").hide();
    	}
    });
	
	// Initial load of tab if hash is present
	var hashLoad = false;
	if (window.location.hash) {
	    $('.nav-tabs a[href='+location.hash+']').click();
	    hashLoad = true;
	} 
	
	// Monitor hash changes
	window.onhashchange = function() {       
	    if (location.hash.length > 0) {  
	        $('.nav-tabs a[href='+location.hash+']').click();
	    } else {
			// if no hash show first tab (note first tab is actually 2nd anchor element)
			// added fake tab anchor tags, so the first tab now become 3rd one
			$('.nav-tabs a:eq(2)').tab('show');
			//Display selected dropdown item
			$('.tab-to-drop-display').html($('.nav-tabs a:eq(1)').html());
			// remove id otherwise it will remain the previous tab
			$('.pdp-tab').removeAttr("id");
	    }
	}		
	
	$('.pdp-main-tab-dropdown-menu a[data-toggle="tab"]').on('shown', function (e) {
		
	    //Equal height columns in Select your model section
		if (current_width > 767) {
			equalHeightFilters();
		}
	})
	
	if ($(".m-carousel").length > 0) {
		//Photo gallery carousel
		$('.m-carousel').carousel();
		
		//Equal height carousel items so more space to swipe the video content
		equalHeightGroup($('.product-summary .m-item'));
	}
	
	//Bootstrap tooltip
	$('.tooltip-trigger').tooltip();

    function stopPropagation(e) {
        if (e.stopPropagation) 
            e.stopPropagation();
        else 
            e.cancelBubble = true;
    }
    
	//Stay informed
	$(".stay-informed-open").on('click touchstart', function (e) {
		stopPropagation(e);
		e.preventDefault();
    	$(".stay-informed-content").toggle();
		$(this).children(".ss-icon").toggle();
		$(this).toggleClass('active');
    });
	$(".stay-informed-close").on('click touchstart', function (e) {
		e.preventDefault();
		$(".stay-informed-open").click();
	});
	
	$(".stay-informed-content").on('click touchstart', function (e) {
		stopPropagation(e);
    });
	
	$(document).on('click touchstart', function (e) {
			stopPropagation(e);
        	if($('.stay-informed-content').is(':visible')){
        		$(".stay-informed-content").hide();
        		$(".stay-informed-open").children(".ss-icon").toggle();
        		$(".stay-informed-open").toggleClass('active');
        	}
    });
    

	//RWD header
	/**
	** Adding specific class see if it has dropdown menu or not.
	**/
	$(".nav-global li > a").each(function() {
        if ($(this).next().length > 0) {
				$(this).addClass("nav-global-with-drop");
		} else {
			$(this).addClass("nav-global-without-drop");
		};
    });
	
	/**
	** Convert hover to click when viewport width is larger than certain size
	**/
	var current_width = $(window).width();
	if (current_width > 767) {
		$(".nav-global li").hover(function() {
			//alert("768 hover");
			$(this).addClass('hover');
		}, function() {
			$(this).removeClass('hover');
		});
		
		//Equal height columns in Select your model section
		equalHeightFilters();
	}
	if (current_width <= 767) {
		$(".nav-global li a.nav-global-with-drop").on("click touchstart", function(e) {
			//alert("767 click");	
			e.preventDefault();
			$(this).parent("li").toggleClass('hover');
		});
	}
	
	equalHeightGroup($('.pdp-related-products-col'));
	
	/**
	** Re-convert hover to click when window is resized, and only if it's from lte 767px to gt 767px
	**/
	$(window).resize(function(){
		equalHeightFilters();
		equalHeightGroup($('.product-summary .m-item'));
		equalHeightGroup($('.pdp-related-products-col'));
		var resize_width = $(window).width();
		var change = false;
		if (current_width > 767 && resize_width <= 767) {
			change = true;
		}
		if (current_width <= 767 && resize_width > 767) {
			change = true;
		}
		if (resize_width != current_width && change) {
			current_width = resize_width;
			if (resize_width > 767) {
				$(".nav-global li a.nav-global-with-drop").off();
				$(".nav-global li").hover(function() {
					//alert("768 hover - resize");					
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});
			}
			if (resize_width <= 767) {
				//alert("767 resize");
				$(".nav-global li").off();
				$(".nav-global li a.nav-global-with-drop").on("click touchstart", function(e) {
					e.preventDefault();
					$(this).parent("li").toggleClass('hover');
				});
			}
		}
	});
	
	/**
	** Only one dropdown from search and navigation can be shown at one time.
	** Also add specific class names so that styles can be changed when each toggle is actived.
	**/	
	var nav_header_wrapper = $('.nav-header-wrapper');
	var nav_collapse_nav = $('.nav-global-wrapper');
	var nav_collapse_search = $('.nav-header-form-search');
	var btn_collapse_nav = $('a[data-target*="nav-global-wrapper"]');
	var btn_collapse_search = $('a[data-target*="nav-header-form-search"]');
	nav_collapse_nav.on('show hide', function () {
		nav_header_wrapper.toggleClass('nav-global-toggle');
		if (nav_collapse_search.hasClass("in")) {
			nav_collapse_search.collapse('hide');
			if (btn_collapse_search.hasClass("collapsed") == false) {
				btn_collapse_search.addClass("collapsed");
			}
		}
	});
	nav_collapse_search.on('show hide', function () {
		nav_header_wrapper.toggleClass('nav-search-toggle');
		if (nav_collapse_nav.hasClass("in")) {
			nav_collapse_nav.collapse('hide');
			if (btn_collapse_nav.hasClass("collapsed") == false) {
				btn_collapse_nav.addClass("collapsed");
			}
		}
	});
	
	// A value of checked for overviewContentRowHide suppresses the row from view. 
	// Such rows are displayed only upon application of the overviewContentRowAnchorTag as a URL parameter to the page. 
	$(".hideContentRow").hide();
	var achor = "";
	if (location.hash.length > 0)
	{
		achor = location.hash;
		achor = achor.substr(1);
		$("." + achor).show();
	}   
});

function equalHeightFilters() {
	$(".pdp-buy-filter-molecule").each(function() {
		$(this).children("li:odd").each(function(i) {
			$(this).removeAttr('style');
			$(this).prev().removeAttr('style');				
			var odd = $(this);
			var even = $(this).prev();
			var odd_h = parseInt(odd.css("height"));
			var even_h = parseInt(even.css("height"));
			if (odd_h > even_h) {
				even.css("height", odd_h + "px");
				//odd.css("height", odd_h + "px");
			} else {
				//even.css("height", even_h + "px");
				odd.css("height", even_h + "px");
			}
		});
	});
}

var groupMap = new Array();
function equalHeightGroup(group) {
	var radomId = uuid();
	var _this = this;
	groupMap[radomId] = new Array(group, group.length, 0);
	this.getMaxHeight = function(obj, uuid)
	{
		var info = groupMap[uuid];
		var group = info[0];
		var count = info[1];
		var tallest = info[2];
		if($(obj).height() > tallest) {
			tallest = $(obj).height();
		};
		count--;
		if (count == 0)
		{
			group.height(tallest);
		}
		else
		{
			info[1] = count;
			info[2] = tallest;
			groupMap.push(uuid, info);
		}
	};
	

	group.each(function() {
		$(this).removeAttr('style');
		var sImage = new SImage(this, radomId, _this.getMaxHeight);	
	});
}

function SImage(liElement, uuid, callback) {
    var img = new Image();
	var imgElement = $(liElement).find("img");
	if (typeof(imgElement) == "undefined")
	{
		callback(liElement, uuid);
		return;
	}
	var src = imgElement.attr("src");
	if (typeof(src) == "undefined")
	{
		callback(liElement, uuid);
		return;
	}

    var appname = navigator.appName.toLowerCase();
    if (appname.indexOf("netscape") == -1) {
       //ie
        img.onreadystatechange = function () {
            if (img.readyState == "complete") {
                callback(liElement, uuid);
            }
        };
    } else {
       //firefox
        img.onload = function () {
            if (img.complete == true) {
                callback(liElement, uuid);
            }
        }
    }

    this.img = img;
	this.img.src = src;	
}

function uuid(len, radix) {
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var chars = CHARS, uuid = [], i;
	radix = radix || chars.length;

	if (len) {
	  // Compact form
	  for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
	  // rfc4122, version 4 form
	  var r;

	  // rfc4122 requires these characters
	  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	  uuid[14] = '4';

	  // Fill in random data.  At i==19 set the high bits of clock sequence as
	  // per rfc4122, sec. 4.1.5
	  for (i = 0; i < 36; i++) {
		if (!uuid[i]) {
		  r = 0 | Math.random()*16;
		  uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	  }
	}

	return uuid.join('');
};