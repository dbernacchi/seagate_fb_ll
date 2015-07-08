/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:31
 */
$(document).ready(function() {

 

    $("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);


	// init custom checkbox
	$('.pictHold input').ezMark();
	$('input.check').ezMark();
	$('.contactForm input[type="radio"]').ezMark();
	$('.returnsForm input[type="radio"]').ezMark();
	
	//init custom type file
	$("input.inputCustomFile").filestyle({ 
          image: "images/global/btn/btn_browse.png",
          imageheight : 27,
          imagewidth : 70,
          width : 140
      });
	   //init custom scroll
	   $(function() {
		$('.box .contentScrol').jScrollPane({showArrows: true});
	   }); 
	
	 initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	initTabs('.tabBox2', '.tabList2 li', '.tabContent2 .tab2');
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	var max_height = 0;
	$(".tabList").find('a').each(function() {
		if ($(this).height() > max_height) max_height = $(this).height();
	});
	$(".tabList").find('a').each(function() {
		$(this).height(max_height);
	});
	$('.spacer').height(max_height);
});
function initScript() {
	addClass({
		tagName:'a',
		tagClass:'btnCloseProduct',
		classAdd:'empty',
		addToParent:true
	})
//init funcybox
	$("a.popUpLoader ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);
}

function addClass (_options) {
	var _tagName = _options.tagName;
	var _tagClass = _options.tagClass;
	var _classAdd = _options.classAdd;
	var _addToParent = false || _options.addToParent;
	var _el = document.getElementsByTagName(_tagName);
	if (_el) {
		for (var i=0; i < _el.length; i++) {
			if (_el[i].className.indexOf(_tagClass) != -1) {
				_el[i].onclick = function() {
					if (_addToParent) {
						if (this.parentNode.className.indexOf(_classAdd) == -1) {
							this.parentNode.className += ' '+_classAdd;
						} else {
							this.parentNode.className = this.parentNode.className.replace(_classAdd,'');
						}
					} else {
						if (this.className.indexOf(_classAdd) == -1) {
							this.className += ' '+_classAdd;
						} else {
							this.className = this.className.replace(_classAdd,'');
						}
					}
					return false;
				}
			}
		}
	}
}
if (window.addEventListener)
	window.addEventListener("load", initScript, false);
else if (window.attachEvent)
	window.attachEvent("onload", initScript);/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:31
 */
$(document).ready(function() {

 

    $("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);


	// init custom checkbox
	$('.pictHold input').ezMark();
	$('input.check').ezMark();
	$('.contactForm input[type="radio"]').ezMark();
	$('.returnsForm input[type="radio"]').ezMark();
	
	//init custom type file
	$("input.inputCustomFile").filestyle({ 
          image: "images/global/btn/btn_browse.png",
          imageheight : 27,
          imagewidth : 70,
          width : 140
      });
	   //init custom scroll
	   $(function() {
		$('.box .contentScrol').jScrollPane({showArrows: true});
	   }); 
	
	 initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	initTabs('.tabBox2', '.tabList2 li', '.tabContent2 .tab2');
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	var max_height = 0;
	$(".tabList").find('a').each(function() {
		if ($(this).height() > max_height) max_height = $(this).height();
	});
	$(".tabList").find('a').each(function() {
		$(this).height(max_height);
	});
	$('.spacer').height(max_height);
});
function initScript() {
	addClass({
		tagName:'a',
		tagClass:'btnCloseProduct',
		classAdd:'empty',
		addToParent:true
	})
//init funcybox
	$("a.popUpLoader ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);
}

function addClass (_options) {
	var _tagName = _options.tagName;
	var _tagClass = _options.tagClass;
	var _classAdd = _options.classAdd;
	var _addToParent = false || _options.addToParent;
	var _el = document.getElementsByTagName(_tagName);
	if (_el) {
		for (var i=0; i < _el.length; i++) {
			if (_el[i].className.indexOf(_tagClass) != -1) {
				_el[i].onclick = function() {
					if (_addToParent) {
						if (this.parentNode.className.indexOf(_classAdd) == -1) {
							this.parentNode.className += ' '+_classAdd;
						} else {
							this.parentNode.className = this.parentNode.className.replace(_classAdd,'');
						}
					} else {
						if (this.className.indexOf(_classAdd) == -1) {
							this.className += ' '+_classAdd;
						} else {
							this.className = this.className.replace(_classAdd,'');
						}
					}
					return false;
				}
			}
		}
	}
}
if (window.addEventListener)
	window.addEventListener("load", initScript, false);
else if (window.attachEvent)
	window.attachEvent("onload", initScript);/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:31
 */
$(document).ready(function() {

 

    $("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);


	// init custom checkbox
	$('.pictHold input').ezMark();
	$('input.check').ezMark();
	$('.contactForm input[type="radio"]').ezMark();
	$('.returnsForm input[type="radio"]').ezMark();
	
	//init custom type file
	$("input.inputCustomFile").filestyle({ 
          image: "images/global/btn/btn_browse.png",
          imageheight : 27,
          imagewidth : 70,
          width : 140
      });
	   //init custom scroll
	   $(function() {
		$('.box .contentScrol').jScrollPane({showArrows: true});
	   }); 
	
	 initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	initTabs('.tabBox2', '.tabList2 li', '.tabContent2 .tab2');
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	var max_height = 0;
	$(".tabList").find('a').each(function() {
		if ($(this).height() > max_height) max_height = $(this).height();
	});
	$(".tabList").find('a').each(function() {
		$(this).height(max_height);
	});
	$('.spacer').height(max_height);
});
function initScript() {
	addClass({
		tagName:'a',
		tagClass:'btnCloseProduct',
		classAdd:'empty',
		addToParent:true
	})
//init funcybox
	$("a.popUpLoader ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);
}

function addClass (_options) {
	var _tagName = _options.tagName;
	var _tagClass = _options.tagClass;
	var _classAdd = _options.classAdd;
	var _addToParent = false || _options.addToParent;
	var _el = document.getElementsByTagName(_tagName);
	if (_el) {
		for (var i=0; i < _el.length; i++) {
			if (_el[i].className.indexOf(_tagClass) != -1) {
				_el[i].onclick = function() {
					if (_addToParent) {
						if (this.parentNode.className.indexOf(_classAdd) == -1) {
							this.parentNode.className += ' '+_classAdd;
						} else {
							this.parentNode.className = this.parentNode.className.replace(_classAdd,'');
						}
					} else {
						if (this.className.indexOf(_classAdd) == -1) {
							this.className += ' '+_classAdd;
						} else {
							this.className = this.className.replace(_classAdd,'');
						}
					}
					return false;
				}
			}
		}
	}
}
if (window.addEventListener)
	window.addEventListener("load", initScript, false);
else if (window.attachEvent)
	window.attachEvent("onload", initScript);