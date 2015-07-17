$(document).ready(function() {
	$("a.videoCallBtn").fancybox(
            {
                    'padding'			: 0,
                    'autoScale'			: false,
                    'transitionIn'		: 'none',
                    'transitionOut'		: 'none'
            }
    );
	
    /* Start Mega Nav document.ready JavaScript */
    
    $('button#burger').click(function() {
		if ($('#nav-wrapper').width() == 0) {
			//$('#nav-wrapper').css('width', '340px');
			$('#nav-wrapper').addClass('nav-wrapper-mobile-width-open');
			$('#mobile-wrapper').css('max-width', '340px');
			$('#nav-opacity').css('display', 'block');
			if($('#mega-nav-container').hasClass('light')){
				$('button#burger').addClass('light-active');
			}
		} else {
			//$('#nav-wrapper').css('width', '0');
			$('#nav-wrapper').removeClass('nav-wrapper-mobile-width-open');
			$('#mobile-wrapper').css('max-width', '0');
			$('#nav-opacity').css('display', 'none');
			if($('#mega-nav-container').hasClass('light')){
				$('button#burger').removeClass('light-active');
			}
		}
	});
	
	$('#nav-opacity').click(function() {
		//$('#nav-wrapper').css('width', '0');
		$('#nav-wrapper').removeClass('nav-wrapper-mobile-width-open');
		$('#mobile-wrapper').css('max-width', '0');
		$('#nav-opacity').css('display', 'none');
		if($('#mega-nav-container').hasClass('light')){
			$('button#burger').removeClass('light-active');
		}
	});

	//submit search
	/*
	$(".magnify-icon").click(function() {
		if($(window).width()<781){
		 	$("form#seagate-search").submit();
		 } 
	});
	*/
	
	//opening of the vertical tabs
	$(function() {
		$('.vtab > li > a').click(function(e) {
			e.preventDefault();
		});
		//mobile
		$('.vtab>li').click(function(e) {
			if($(window).width()<781){
				e.preventDefault();
				$('.mega-nav>li').addClass('open');
				$('div#vtab-back').removeClass('hidden');
				setTimeout(function() {
					$('div#category-name').removeClass('hidden');
				}, 400);
				var newcontent = $(this).children().attr('href');
				$(newcontent).addClass('open');
				var height;
				if (( $(document).height() ) > ($('.mega-nav-tab').height() + 200 )) {
					height = $(document).height();
				} else {
					height = $('.mega-nav-tab').height() + 200;
				}
				$('#mobile-wrapper').css('height', height + 'px');

				//dynamically update the back button with Level 1 (category) name
				var lev1 = $(this).parents('li.mega-lev1-left').children('a').text();
				$('div#vtab-back>a').text(lev1);
				$('div#vtab-back>a').prepend('<div class="arrow-left"></div> ');

				//dynamically update the sub-category name
				var category = $(this).children('a').text();
				$('div#category-name>div>span').text(category);
				
				//dynamically adjust top margin for category
				var catLevel = $(this).parents('li.mega-lev1-left').index();
				var fixTopMargin = $(this).children('a').attr('href');
				var topMargin = (72-((catLevel-1)*46));
				$(fixTopMargin).css('margin-top',topMargin+'px');
			}
		});
		$('div#vtab-back').click(function(e) {
			e.preventDefault();
			$('.mega-nav>li').removeClass('open');
			$('.vtab>li').removeClass('open');
			setTimeout(function() {
				$('.mega-nav-contentblock').removeClass('open');
			}, 500);
			$('div#vtab-back').addClass('hidden');
			$('div#category-name').addClass('hidden');

		});

		//desktop
		$('.vtab>li').on('mouseover', function(e) {
			e.preventDefault();

			if ($(this).hasClass('open')) {
				// do nothing because the link is already open
			} else {
				if($(this).hasClass('avail-item')){
					var ulId = $(this).parent().attr("id");
					var oldcontent = $('#' + ulId + '>li.open>a').attr('href');
					var newcontent = $(this).children('a').attr('href');
					$(newcontent).removeClass('hidden');
					$(oldcontent).addClass('hidden');

					$('#' + ulId + '>li').removeClass('open');
					$(this).addClass('open');
				}
			}
		});
		$('#vtab1 a').on('mouseclick', function(e) {
			e.preventDefault();

			if ($(this).hasClass('open')) {
				// do nothing because the link is already open
			} else {
				var oldcontent = $('#vtab3 a.open').attr('href');
				var newcontent = $(this).attr('href');

				$(newcontent).removeClass('hidden');
				$(oldcontent).addClass('hidden');

				$('#vtab3 a').removeClass('open');
				$(this).addClass('open');
			}
		});

	});

	//expand and collapse mobile nav
	$('ul.vtab').click(function() {
		return false;
	});
	$('.mega-nav > li.mega-lev1-left').not('.nav-store-link').click(function () {
		if (!$(this).is('ul.vtab')) {

			if ($(this).closest('li.mega-lev1-left').hasClass('active')) {
				$(this).closest('li.mega-lev1-left').removeClass('active');
			} else {
				$('.mega-nav li.mega-lev1-left').removeClass('active');
				$(this).closest('li.mega-lev1-left').addClass('active');
			}
		}
	});
    
    /* End Mega Nav document.ready JavsaScript */
});

/* Start Mega Nav onLoad JavaScript */

//update mobile nav elements with different widths
$(window).ready(function() {
	var width = $(this).width();
	var height = $(this).height() + 200;
	if (width < 781) {
		//$('#mobile-wrapper').css('height', '1430px');
		$('#mobile-wrapper').addClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 275px, #333333 275px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
	} else {
		//$('#mobile-wrapper').css('height', 'auto');
		$('#mobile-wrapper').removeClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'none');

	}
	if (width < 387) {
		var newval = Math.round(275 - ((387 - width)));
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 ' + newval + 'px, #333333 ' + newval + 'px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
	} else {
	}
	var scrollTop=$(window).scrollTop();
	height=height-246+scrollTop;
	$('#vtab-store').css('top', height + 'px');

});
$(window).resize(function() {
	var width = $(this).innerWidth();
	var height = $(this).height() + 200;
	if (width < 780) {
		//$('#mobile-wrapper').css('height', '1430px');
		$('#mobile-wrapper').addClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 275px, #333333 275px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
		//$('#nav-wrapper').css('width','0');
		$('#nav-wrapper').addClass('nav-wrapper-mobile-width');
	} else {
		//$('#mobile-wrapper').css('height', 'auto');
		$('#mobile-wrapper').removeClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'none');
		//$('#nav-wrapper').css('width','100%');
		$('#nav-wrapper').removeClass('nav-wrapper-mobile-width , nav-wrapper-mobile-width-open');
		$('#burger').removeClass('light-active');
		$('#nav-opacity').css('display','none');
	}
	if (width < 387) {
		var newval = Math.round(275 - ((387 - width)));
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 ' + newval + 'px, #333333 ' + newval + 'px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
	} else {
	}
	var scrollTop=$(window).scrollTop();
	height=height-246+scrollTop;
	$('#vtab-store').css('top', height + 'px');
});
$(window).on('scroll',function() {
	var height = $(this).height();
	var scrollTop=$(window).scrollTop();
	height=height-46+scrollTop;
	$('#vtab-store').css('top', height + 'px');
});
//sticky nav position
var isLight;
$(window).ready(function() {
	if($('#mega-nav-container').hasClass('light')){
		isLight=true;
	}
});
$(window).on('scroll',function() {
	if($(window).width()>780){
		var scrollTop=$(window).scrollTop();
		$('#mega-nav-container').css('top', scrollTop + 'px');
		if($('#mega-nav-container').hasClass('sticky-nav') && (scrollTop==0)){
			$('#mega-nav-container').removeClass('sticky-nav');
			if(!isLight){
				$('#mega-nav-container').removeClass('light');
			}
		}
		else if($('#mega-nav-container').hasClass('sticky-nav')){
			//do nothing
		}
		else if (scrollTop != 0) {
			$('#mega-nav-container').addClass('sticky-nav');
			if(!isLight){
				$('#mega-nav-container').addClass('light');
			}
		}
	}
});


/* End Mega Nav onLoad JavaScript */

/************************************************** GlobalNav **************************************************/
var GlobalNav = (function ($) {
	
	var defaults = {
        "gnContainer": ".gn-container:eq(0)",
        "stickyHeader": ".sticky-header",
        "globalNav": ".global-nav-oz",
        "gnMenu": ".gn-menu",
        "menuList": "ul.gn-menu-list > li",
        "gnDropdown": ".gn-dropdown",
        "gnMenuItemLevel1": ".gn-menu-item-1lvl",
        "gnMenuItemLevel2": ".gn-menu-item-2lvl",
        "gnMenuItemLevel3": ".gn-menu-box-3lvl",
        "pulledMenuClass": "gn-menu-pulled",
        "pulledDropClass": "gn-drop-pulled",
        "openedMenuClass": "gn-menu-opened",
        "gnSideToggle": ".gn-side-toggle",
        "gnIconContainer": ".gn-icon-container",
        "gnSideWrapper": ".gn-side-wrapper",
        "gnSideContainer": ".gn-side-container",
        "sideOpenedClass": "gn-side-opened",
        "gnSubMenuOpenedClass": "gn-sub-menu-opened",
        "gnSubMenuSelectedClass": "gn-sub-menu-selected",
		"gnUser": "gn-user",
		"pulledClass": "gn-user-pulled",
		"gnUserOpenedClass": "gn-user-opened",
        "dropOverlary": ".gn-drop-overlay",
        "sideOverlary": ".gn-side-overlay",
        "gnStore": ".gn-store",
        "gnPostStickyClass": "gn-post-sticky",
        "gnPreStickyClass": "gn-pre-sticky",
        "stickyHeaderActiveClass": "sticky-header-active"
    };
	
    var GlobalNav = function (options) {
    	options = $.extend(defaults, options);
        this.options = options;
        this.$gnContainer = $(options.gnContainer);
        this.$stickyHeader = this.$gnContainer.find(options.stickyHeader);
        this.$globalNav = this.$gnContainer.find(options.globalNav);
        this.$gnMenu = this.$globalNav.find(options.gnMenu);
        this.$gnMenuList = this.$gnMenu.find(options.menuList);
        this.$gnMenuItemLevel1 = this.$gnMenuList.find(options.gnMenuItemLevel1);
        this.$gnDropdown = this.$gnMenuList.find(options.gnDropdown);
        this.$gnSubMenuItemLevel2 = this.$gnDropdown.find(options.gnMenuItemLevel2);
        this.$gnSubMenuItemLevel3 = this.$gnDropdown.find(options.gnMenuItemLevel3);
        this.$gnStore = this.$globalNav.find(options.gnStore);
        
        this.$gnSideToggle = this.$globalNav.find(options.gnSideToggle);
        this.$gnIconContainer = this.$gnSideToggle.find(options.gnIconContainer);
        this.$gnSideWrapper = this.$globalNav.find(options.gnSideWrapper);
        this.$gnSideContainer = this.$gnSideWrapper.find(options.gnSideContainer);
        
        this.$dropOverlary = this.$globalNav.find(options.dropOverlary);
        this.$sideOverlary = this.$globalNav.find(options.sideOverlary);
        
        this.globalNavHeight = this.$globalNav.innerHeight();
    };
    
    GlobalNav.prototype.init = function () {
        var that = this;
        
        this.$gnMenuItemLevel1.children("a").on("mouseenter touchstart", function (e) {
            that.stickyHeader();
            that.toggleMenu($(this).parent().parent(), e.type);
            if (e.type == "touchstart") {
                that.togglePullMenu($(this).parent().parent());
                that.globalUser.hideMenu(that.globalUser.$gnUser);
                return false;
            } else {
                that.pullMenu($(this).parent().parent());
            }
        });
		
		this.$gnMenuItemLevel1.children("a").on("click", function (e) {
            e.preventDefault();
        });
        
        this.$gnMenuItemLevel1.children("span").on("click", function (e) {
            that.toggleMenu($(this).parent().parent(), e.type);
            that.togglePullMenu($(this).parent().parent());
        });

        this.$gnMenu.on("mouseleave", "li." + this.options.pulledMenuClass, function (e) {
            that.hideMenu($(this));
            that.toggleMenu($(this), e.type);
        });
        
        this.$gnMenuList.parent().on("mouseleave", function (e) {
            that.setStickyHeader();
        });
        
        $("body").on("touchstart", function (e) {
            var $target = $(e.target);
            if ($target.parents("." + that.options.pulledMenuClass).length <= 0
               && !$target.hasClass(that.options.pulledMenuClass)) {
                that.hidePulledMenu();
                that.setStickyHeader();
            }
        });
        
        this.$gnSubMenuItemLevel2.children("span").on("click", function (e) {
            if ($(this).parent().siblings(that.options.gnMenuItemLevel3).length > 0) {
                that.$gnStore.hide();
                that.openLevel3($(this));
                that.$gnStore.delay(300).fadeIn(100);
            }
        });
        
        this.$gnSubMenuItemLevel3.find("> a").on("click", function (e) {
            e.preventDefault();
            that.$gnStore.hide();
            that.closeLevel3();
            that.$gnStore.delay(300).fadeIn(100);
        });
        
        this.$gnIconContainer.on("click", function (e) {
            var $globalNav = $(this).parents(that.options.globalNav);
            if ($globalNav.hasClass(that.options.sideOpenedClass)) {
                $globalNav.removeClass(that.options.sideOpenedClass);
                that.hideOverlay("side");
            } else {
                $globalNav.addClass(that.options.sideOpenedClass);
                that.$gnSideWrapper.css("height", that.getOverlayHeight(that.$gnSideContainer));
                that.showOverlay(that.$gnSideContainer, "side");
            }
			if ($globalNav.hasClass(that.options.gnUserOpenedClass)) {
                $globalNav.removeClass(that.options.gnUserOpenedClass);
                (that.globalUser.$gnUser).removeClass(that.options.pulledClass);
            }
        });
        
        this.$sideOverlary.on("touchstart click", function (e) {
            if (that.$globalNav.hasClass(that.options.sideOpenedClass)) {
                that.$globalNav.removeClass(that.options.sideOpenedClass);
                that.hideOverlay("side");
            }
            if (e.type == "touchstart") {
                return false;
            }
        });
    };
    
    GlobalNav.prototype.setStickyHeader = function (arg) {
        this.$gnContainer.removeClass(this.options.gnPostStickyClass).removeClass(this.options.gnPreStickyClass);
        if (typeof(arg) != "undefined") {
            this.$gnContainer.addClass(arg);
        }
    };
    
    GlobalNav.prototype.stickyHeader = function () {
        if (!this.$gnContainer.hasClass(this.options.gnPostStickyClass) && !this.$gnContainer.hasClass(this.options.gnPreStickyClass)) {
            if (this.$stickyHeader.hasClass(this.options.stickyHeaderActiveClass)) {
                this.setStickyHeader(this.options.gnPostStickyClass);
            } else {
                this.setStickyHeader(this.options.gnPreStickyClass);
            }
        }
    };
    
    GlobalNav.prototype.togglePullMenu = function ($this) {
        if ($this.hasClass(this.options.pulledMenuClass)) {
            this.hideMenu($this);
        } else {
            this.pullMenu($this);
        }
    };
    
    GlobalNav.prototype.pullMenu = function ($this) {
        $this.siblings("li." + this.options.pulledMenuClass).removeClass(this.options.pulledMenuClass);
		if ($this.find(this.options.gnDropdown).length) {
			$this.addClass(this.options.pulledMenuClass);
			this.$globalNav.addClass(this.options.pulledDropClass);
			this.showOverlay(this.$gnDropdown, "drop");
			this.setSameHeight($this);
		}
        this.closeLevel3();
    };
    
    GlobalNav.prototype.hideMenu = function ($this) {
        $this.removeClass(this.options.pulledMenuClass);
        this.$globalNav.removeClass(this.options.pulledDropClass);
        this.hideOverlay("drop");
    };
    
    GlobalNav.prototype.hidePulledMenu = function () {
        var $pulledMenu = this.$gnMenu.find(this.options.menuList + "." + this.options.pulledMenuClass);
        if ($pulledMenu.length > 0) {
            this.hideMenu($pulledMenu);
        }
    };
    
    GlobalNav.prototype.toggleMenu = function ($this, eventType) {
        $this.siblings().removeClass(this.options.openedMenuClass);
        if (eventType == "mouseenter") {
            $this.addClass(this.options.openedMenuClass);
        } if (eventType == "mouseleave") {
        } else {
            $this.siblings().find(this.options.gnDropdown).css("height", "");
            $this.toggleClass(this.options.openedMenuClass);
            var $gnDropdown = $this.find(this.options.gnDropdown);
            if ($this.hasClass(this.options.openedMenuClass)) {
                $gnDropdown.css("height", $gnDropdown.find(".container").innerHeight());
            } else {
                $gnDropdown.css("height", "");
            }
        }
    };
    
    GlobalNav.prototype.openLevel3 = function ($this) {
        this.$gnMenu.addClass(this.options.gnSubMenuOpenedClass);
        var $gnMenuItemLevel3 = $this.parent().siblings(this.options.gnMenuItemLevel3);
        $gnMenuItemLevel3.addClass(this.options.gnSubMenuSelectedClass);
        var gnMenuItemLevel3Height = $gnMenuItemLevel3.innerHeight();
        this.$gnMenu.css("height", gnMenuItemLevel3Height);
    };
    
    GlobalNav.prototype.closeLevel3 = function () {
        this.$gnMenu.removeClass(this.options.gnSubMenuOpenedClass);
        this.$gnSubMenuItemLevel3.removeClass(this.options.gnSubMenuSelectedClass);
        this.$gnMenu.css("height", "");
    };
    
    GlobalNav.prototype.getOverlayHeight = function ($obj, type) {
        var overlayHeight = $(document).innerHeight();
        var objHeight = $obj.innerHeight();
        if ($obj.hasClass(this.options.gnDropdown.substring(1, this.options.gnDropdown.length))) {
		  objHeight = objHeight + this.globalNavHeight;
        }
        if (objHeight > overlayHeight) {
            overlayHeight = objHeight;
        }
		if ($obj.hasClass(this.options.gnDropdown.substring(1, this.options.gnDropdown.length)) || type == "user") {
			if (!this.$gnContainer.parents(".home-page").length) {
				overlayHeight -= this.globalNavHeight;
			}		
		}
        return overlayHeight;
    };
    
    GlobalNav.prototype.showOverlay = function ($obj, type) {
        if (type == "drop") {
            this.$dropOverlary.css("height", this.getOverlayHeight($obj, type));
        } else {
            this.$sideOverlary.css("height", this.getOverlayHeight($obj, type));
        }
    };
    
    GlobalNav.prototype.hideOverlay = function (type) {
        if (type == "drop") {
            this.$dropOverlary.css("height", 0);
        } else if (type == "side") {
            this.$sideOverlary.css("height", 0);
        }
    };
    
    GlobalNav.prototype.setSameHeight = function ($this) {
        var $gnDropdown = $this.find(this.options.gnDropdown);
        var $span9 = $gnDropdown.find(this.options.gnDropdown + "-menu > .span9");
        var $span3 = $gnDropdown.find(this.options.gnDropdown + "-menu > .span3");
        var height9 = $span9.innerHeight();
        var height3 = $span3.innerHeight();
        if (height9 != 0 && height3 != 0) {
            if (height9 > height3) {
                $span3.css("height", height9);
            } else {
                $span9.css("height", height3);
            }
        }
    };
    
    GlobalNav.prototype.setGlobalUser = function (globalUser) {
        this.globalUser = globalUser;
    };
    
    GlobalNav.prototype.setDebugLogger = function (debugLogger)  {
        this.debugLogger = debugLogger;
    };

    return GlobalNav;
}(jQuery));

/************************************************** GlobalSearch **************************************************/
var GlobalSearch = (function ($) {
	
	var defaults = {
        "gnContainer": ".gn-container:eq(0)",
        "gnSearchInput": "input.gn-search-input",
        "gnSearchClear": ".gn-search-clear"
    };
	
    var GlobalSearch = function (options) {
    	options = $.extend(defaults, options);
        this.options = options;
        this.$gnContainer = $(options.gnContainer);
        this.$gnSearchInput = this.$gnContainer.find(options.gnSearchInput);
        this.$gnSearchClear = this.$gnSearchInput.siblings(options.gnSearchClear);
        this.defaultInputValue = this.$gnSearchInput.val();
    };
    
    GlobalSearch.prototype.init= function () {
        var that = this;
        
        this.$gnSearchInput.on("keyup", function () {
            var $gnSearchClear = $(this).siblings(that.options.gnSearchClear);
            var keyword = $(this).val();
            if (keyword != "") {
                $gnSearchClear.removeClass("hide");
            } else {
                $gnSearchClear.addClass("hide");
            }
        });
        
        this.$gnSearchClear.click(function (e) {
            e.preventDefault();
            $(this).siblings(that.options.gnSearchInput).val(that.defaultInputValue);
            $(this).addClass("hide");
        });
    };
    
    return GlobalSearch;
}(jQuery));

/************************************************** GlobalUser **************************************************/
var GlobalUser = (function ($) {
	
	var defaults = {
        "gnContainer": ".gn-container:eq(0)",
        "globalNav": ".global-nav-oz",
        "gnUser": ".gn-user",
        "gnIconContainer": ".gn-icon-container",
        "gnUserDrop": ".gn-user-drop",
        "closeUser": ".user-delete",
        "pulledClass": "gn-user-pulled",
        "gnUserOpenedClass": "gn-user-opened"
    };
	
    var GlobalUser = function (options) {
    	options = $.extend(defaults, options);
        this.options = options;
        this.$gnContainer = $(options.gnContainer);
        this.$globalNav = this.$gnContainer.find(options.globalNav);
        this.$gnUser = this.$gnContainer.find(options.gnUser);
        this.$gnIconContainer = this.$gnUser.find(options.gnIconContainer);
        this.$gnUserDrop = this.$gnUser.find(options.gnUserDrop);
        this.$closeUser = this.$gnUserDrop.find(options.closeUser);
    };
    
    GlobalUser.prototype.init= function () {
        var that = this;
        
        // this.$gnIconContainer.children("i").on("touchstart mouseenter", function (e) {
            // if (e.type == "touchstart") {
                // if ($(this).parent().parent().hasClass(that.options.pulledClass)) {
                    // that.hideMenu($(this).parent().parent());
                // } else {
                    // that.showMenu($(this).parent().parent(), "landscape");
                // }
                // that.globalNav.hidePulledMenu();
                // return false;
            // } else {
                // that.showMenu($(this).parent().parent(), "landscape");
            // }
        // });
        
        this.$gnIconContainer.children("span").on("click", function () {
            if ($(this).parents(that.options.globalNav).hasClass(that.options.gnUserOpenedClass)) {
                that.hideMenu($(this).parent().parent());
            } else {
                that.showMenu($(this).parent().parent(), "portrait");
            }
        });

        // this.$gnUser.on("mouseleave", function (e) {
            // if ($(this).hasClass("landscape")) {
                // that.hideMenu($(this));
            // }
        // });
        
        this.$closeUser.on("click", function (e) {
            that.hideMenu(that.$gnUser);
        });
        
        $("body").on("touchstart", function (e) {
            var $target = $(e.target);
            if ($target.hasClass(that.options.closeUser.substring(1, that.options.closeUser.length)) 
                || (!$target.hasClass(that.options.gnUserDrop.substring(1, that.options.gnUserDrop.length)) 
                && $target.parents(that.options.gnUserDrop).length <= 0)) {
                var $pulledMenu = that.$stickyHeader.find(that.options.gnUser + "." + that.options.pulledClass);
                if ($pulledMenu.length > 0) {
                    that.hideMenu($pulledMenu);
                }
            }
        });
    };
    
    GlobalUser.prototype.showMenu = function ($this, screenMode) {
        //$this.addClass(this.options.pulledClass);
        this.$globalNav.addClass(this.options.gnUserOpenedClass);
        if (screenMode == "portrait") {
            var height = $(window).innerHeight();
            height -= this.$globalNav.innerHeight();
            this.$gnUserDrop.css("min-height", height);
            $this.removeClass("portrait").removeClass("landscape").addClass("portrait");
        } else {
            $this.removeClass("portrait").removeClass("landscape").addClass("landscape");
        }
        this.globalNav.showOverlay(this.globalNav.$gnSideContainer, "user");
    };
    
    GlobalUser.prototype.hideMenu = function ($this) {
        this.globalNav.hideOverlay(this.globalNav.$gnSideContainer, "side");
        $this.removeClass(this.options.pulledClass);
        $(this.options.globalNav).removeClass(this.options.gnUserOpenedClass);
    };
    
    GlobalUser.prototype.setGlobalNav = function (globalNav) {
        this.globalNav = globalNav;
    };
    
    return GlobalUser;
}(jQuery));

/************************************************** DebugLogger **************************************************/
var DebugLogger = (function ($) {
    var DebugLogger = function () {
        this.debugTextarea = $(".debug-textarea");
        if (this.debugTextarea.length <= 0) {
            this.debugTextarea = $("<textarea/>").addClass("debug-textarea").css({
                "position":"absolute", 
                "left": 0,
                "bottom": 0,
                "width": "50%",
                "height": "100px",
                "z-index": 9999
            });
        }
    };
    
    DebugLogger.prototype.init = function () {
        this.debugTextarea.appendTo($("body"));
    };
    
    DebugLogger.prototype.log = function (log) {
        this.debugTextarea.val(log + "\n" + this.debugTextarea.val());
    };
    
    return DebugLogger;
}(jQuery));

/************************************************** document ready **************************************************/
$(function() {
	if ($(".gn-container").length > 0) {
		var globalNav = new GlobalNav({});
		globalNav.init();
		
		var globalSearch = new GlobalSearch({});
		globalSearch.init();
		
		var globalUser = new GlobalUser({});
		globalUser.init();
		
		globalNav.setGlobalUser(globalUser);
		globalUser.setGlobalNav(globalNav);
	}
    
    /*var debugLogger = new DebugLogger();
    debugLogger.init();
    globalNav.setDebugLogger(debugLogger);*/
});