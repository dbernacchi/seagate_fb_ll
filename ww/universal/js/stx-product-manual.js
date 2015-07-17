function btnToggle(btnClass, contentClass, toggleClass) {
	if ($(btnClass).length > 0) {
		$(btnClass).on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass(toggleClass);
			$(contentClass).toggleClass(toggleClass);
		});
	}
}
function textEllipsis(textContent) {
	$(textContent).each(function () {
		var t = $(this);
		var p = t.closest('a');
		var ph = p.innerHeight();
		while ($(t).outerHeight() > ph) {
			$(t).text(function (index, text) {
				return text.replace(/\W*\s(\S)*$/, '...');
			});
		}
	});
}

$(function () {



	var manualNameBox = $('.wmh-manual-name-print');
	var manualName = manualNameBox.find('span');
	if ($('.pm-page-cover').length > 0) {
		manualNameBox.textfill({ 
			maxFontPixels: 65,
			widthOnly: true
		});
	}
	var manualNameSize = manualName.css('font-size');
	manualNameBox.css('font-size', manualNameSize);
	
	var userAgent = navigator.userAgent;
	
	var navMenu = (function () {
		var navMenu = function (menuClass, contentClass) {
			this.menuClass = menuClass;
			this.contentClass = contentClass;
			this.$navMenu = $(menuClass);
			this.locationHash = location.hash;
			this.$allATags = this.$navMenu.find("a[href^=#]");
			this.menuTop = this.$navMenu.offset().top;
			this.noScrollEvent = false;
			this.$originalActive = this.$navMenu.find("li.active");
			this.loadWithOriginalHash = false;
		};
		
		navMenu.prototype.init = function () {
			var t = this;
			if (this.locationHash != undefined && typeof(this.locationHash) != "undefined" && this.locationHash != "") {
				this.loadWithOriginalHash = true;
				t.active(this.locationHash);
				if (userAgent.indexOf("MSIE") != -1 || userAgent.indexOf("Firefox") != -1) {
					t.scrollTop = $(window).scrollTop();
					t.fixedMenu();
				}
			}
			
			this.$allATags.click(function () {
				//alert("click");
				t.noScrollEvent = true;
				var href = $(this).attr("href");
				t.active(href);
			});
			
			$(window).on("hashchange", function () {
				//alert("hashchange");
				t.noScrollEvent = true;
				var hash = location.hash;
				t.active(hash);
			});
			
			$(window).scroll(function () {
				//alert("scroll");
				t.scrollTop = $(this).scrollTop();
				t.doScroll();
			});
		};
		
		navMenu.prototype.active = function (hash) {
			this.$navMenu.find("li.active").removeClass("active");
			var $a = this.$allATags.filter("[href=" + hash + "]");
			var $li = $a.parent("li");
			var $pli = $li.parent("ul").parent("li.subbed");
			if ($pli.length > 0 && $pli.parent("ul").parent(this.menuClass).length <= 0) {
				$pli.siblings().removeClass("opened");
				$pli.addClass("opened");
			}
			$li.addClass("active");
			$li.siblings().removeClass("opened");
			if ($li.hasClass("subbed")) {
				$li.addClass("opened");
			}
		};
		
		navMenu.prototype.fixedMenu = function () {
			var t = this;
			if (t.scrollTop >= t.menuTop) {
				t.$navMenu.addClass("fixed");
			} else {
				t.$navMenu.removeClass("fixed");
			}
			if (t.scrollTop <= t.menuTop) {
				t.$navMenu.find("li.active").removeClass("active");
				t.$originalActive.addClass("active");
			}
		}
		
		navMenu.prototype.doScroll = function () {
			var t = this;
			t.fixedMenu();
			if (!t.noScrollEvent && !t.loadWithOriginalHash) {
				t.getCurrentAnchor();
				if (typeof(t.currentAnchor.n) != "undefined") {
					t.active("#" + t.currentAnchor.n);
				}
			}
			t.noScrollEvent = false;
			t.loadWithOriginalHash = false;
		};
		
		navMenu.prototype.getAnchorList = function () {
			var t = this;
			t.anchorList = {};
			var $contents = $(t.contentClass + " *[id]");
			$contents.each(function () {
				var anchorId = $(this).attr("id");
				var top = $(this).offset().top;
				var d = t.scrollTop - top;
				t.anchorList[anchorId] = Math.abs(d);
			});
		};
		
		navMenu.prototype.getCurrentAnchor = function () {
			this.getAnchorList();
			this.previousAnchor = "";
			this.currentAnchor = {};
			for (var anchor in this.anchorList) {
				if (this.anchorList.hasOwnProperty(anchor)) {
					var d = this.anchorList[anchor];
					if (d <= 100 && 
							(typeof(this.currentAnchor.d) == "undefined" || d < this.currentAnchor.d) && 
							(typeof(this.currentAnchor.n) == "undefined" || this.currentAnchor.n != anchor) &&
							this.previousAnchor != this.currentAnchor.n) {
						this.currentAnchor.n = anchor;
						this.currentAnchor.d = d;
					}
				}
			}
		};
		
		return navMenu;
	}());
	
	if ($(window).innerWidth() > 767) {
		var nm = new navMenu(".pm-nav", ".pm-content");
		nm.init();
	}
	
    btnToggle('.btn-nav-toggle','.row-pm-content','collapsed');
    btnToggle('.icn-pm-3-bar','.row-pm-content > .span3','m-collapsed');
    btnToggle('.icn-pm-magnify','.wmh-search','m-collapsed');

    $('.wth-locale .dropdown-toggle').click(function(e) {
		e.preventDefault();
		$(this).parents('.wth-locale').toggleClass('m-collapsed');
		if ($('.vui-preview-toolbar-icon-profile').length > 0 && $('#vui-cps-ui-preview-toolbar-editing-close-btnInnerEl').length > 0) {
			$(this).parents('.dropdown').toggleClass('open');
		}
	});
	
	// textEllipsis('.pm-nav ul li > a > span');
	// $(window).resize(function() {
		// textEllipsis('.pm-nav ul li > a > span');
	// });
	
});