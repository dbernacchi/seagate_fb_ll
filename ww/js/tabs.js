/*--- tabs ---*/
function initTabs(tabsContainer, tabsList, tabItem){
	var foundHash = '';
	if (window.location.hash !== undefined)
	{
		foundHash = window.location.hash.toString();
	}
    var max_height = 0;
	/* For Anchor */
	$(".tabList").find('a').each(function() {
		if ($(this).height() > max_height) max_height = $(this).height();
	});
	$(".tabList").find('a').each(function() {
		$(this).height(max_height);
	});
	/* For Span */
	$(".tabList").find('span').each(function() {
		if ($(this).height() > max_height) max_height = $(this).height();
	});
	$(".tabList").find('span').each(function() {
		$(this).height(max_height);
	});
	$('.spacer').height(max_height);
        
	$(tabsContainer).each(function(tabIndex){
     if($(".tabList").attr('id') != 'productFinderGrid'){           
                var _hold = $(this);
                var _btn = _hold.find(tabsList);
		var _box = _hold.find(tabItem);

                var _a = _btn.index(_btn.filter('.active:eq(0)'));
		if(_a == -1) _a = 0;
		_btn.removeClass('active').eq(_a).addClass('active');
		_box.removeClass('active').css({
			position: 'absolute',
			top:'-99999px',
			left:'-99999px'
		});
		_box.eq(_a).addClass('active').css({
			position: 'static',
			top:'0',
			left:'0'
		});
		
		_btn.click(function(event){
			//enable usage of absolute links in the tab links
			if (typeof($(this).find('a').attr('href')) == "undefined" || $(this).find('a').attr('href').indexOf('http') == -1){
				event.preventDefault();
				changeTab(_btn.index(this));
				return false;
			}
		});
		_btn.each(function(btnIndex) {
			if ("#"+$(this).find('a').attr('rel') == foundHash && foundHash != '')
			{
				changeTab(btnIndex);
			}
		});
	}
		function changeTab(_ind){
		    	if(_ind != _a){
				_btn.eq(_a).removeClass('active');
				_btn.eq(_ind).addClass('active');
				if (_btn.eq(_ind).find('a').attr('rel') != '' && _btn.eq(_ind).find('a').attr('rel') != undefined) window.location.hash = '#' + _btn.eq(_ind).find('a').attr('rel');
				_box.eq(_a).removeClass('active').css({
					position: 'absolute',
					top:'-99999px',
					left:'-99999px'
				});
				_box.eq(_ind).addClass('active').css({
					position: 'static',
					top:'0',
					left:'0'
				});
				_a = _ind;
				var url_address= location.href;
				if(url_address.indexOf("/about/investors/")!=-1){
					var hash= location.hash.replace( /^#/, '') ||'blank';
					var hashUrl= _btn.eq(_ind).attr('id').replace('-li3','');
					if(hashUrl.indexOf("-li4")!=-1){
						if(hash.indexOf("|")!=-1){
							if(hash.split("|")[0]!=hashUrl.replace('-li4','')){
								window.location.hash =hashUrl.replace('-li4','');
							}else{
								window.location.hash =hashUrl.replace('-li4','')+"|"+hash.split("|")[1];
							}
						}else{
							window.location.hash =hashUrl.replace('-li4','');
						}
					}else{
						if(hash != ''&& hash.split("|").length < 2){
							window.location.hash =hash +"|"+ hashUrl.replace('-li4','');
						}
						if(hash != ''&& hash.split("|").length >= 2){
								window.location.hash =hash.split("|")[0]+"|"+hashUrl;
						}
						if(hash==''){
							window.location.hash =hashUrl.replace('-li4','');
						}
					}
				}
			}
		}
	});
}


//init tabs
	initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	
	
// check when doc is ready if any params were passed to load a tab other than the default one.	
	$(document).ready(function() {
		var navTab =  $(document).getUrlParam("navtab");
		var subNavTab = $(document).getUrlParam("subnavtab");
		if(navTab){
			var navTabLink = "#" + navTab + "-li4";  // build id of the link
			var navTabContent = "#" + navTab + "-cd4"; // build id of the content div
			var navTabContentF = $(navTabContent).parents('div.tab4');
			var navTabContentF1 = $(navTabContent).parents('div.tab');
			if($(navTabLink).html()){ // clear all "active" class elements and add back to desired tab/content
				$(navTabLink).siblings().removeClass('active');
				$(navTabLink).addClass('active');
				if (navTabContentF.length > 0) {
					navTabContentF.siblings().removeClass('active');
					navTabContentF.addClass('active');
				}
				if ($(navTabLink).length > 0) {
					$(navTabLink).click();
				}
			}
			if(subNavTab){	//repeat for subnav
				var subNavTabLink = "#" + subNavTab + "-li3";
				var subNavTabContent = "#" + subNavTab + "-cd3";
				var subNavTabContentF = $(subNavTabContent).parents('div.tab3');
				if($(subNavTabLink).html()){		
					$(subNavTabLink).siblings().removeClass('active');
					$(subNavTabLink).addClass('active');
					if (subNavTabContentF.length > 0) {
						subNavTabContentF.siblings().removeClass('active');
						subNavTabContentF.addClass('active');
					}
					if ($(subNavTabLink).length > 0) {
						$(subNavTabLink).click();
					}
				}
			}
		}       
	});
				
	

$(document).ready(function() {
	$('.mainNav .drop ul li').mouseenter(function() {
		$(this).children('.itemDetails').css('display','block');
	});

	$('.mainNav .drop ul li').mouseleave(function() {
		$(this).children('.itemDetails').css('display','none');
	});
});