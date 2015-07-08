var gCurrentIndex = 0; // global variable to keep the current index;
var ACCORDION_PANEL_COUNT = 6; //global variable for panel count.
$(document).ready(function() {
	//init accordion
	var current_tab = 0;
		//console.log(window.location.hash);
	    if (window.location.hash !== undefined && window.location.hash != null && window.location.hash != '')
		{
			current_tab = parseInt(window.location.hash.toString().replace('#', ''));
			gCurrentIndex = current_tab;
		}
        /*var current_tab = getCookie("current_tab");
        if (current_tab == null) current_tab = 0;*/
        var neededelement = $('.opener').eq(current_tab);
	$('ul.accordion').accordion({
		active: neededelement,
		autoHeight: false,
		header: ".opener",
		collapsible: true,
		event: "click",
		change: function(event, ui) {                        
			gCurrentIndex = $(this).find(".opener").index(ui.newHeader[0]);
			window.location.hash = gCurrentIndex;
            //setCookie("current_tab", gCurrentIndex);
		}
	});                
		
	//Bind event for previous and next buttons
	$('.btn-warrantyandreturn-nextstep').click(function () {
		var index = 0;
		if ($(this).hasClass('btn-warrantyandreturn-nextstep')) {
			gCurrentIndex = $('ul.accordion').accordion("option").active;
			index = gCurrentIndex + 1;
			if (index > ACCORDION_PANEL_COUNT ) {
				index = ACCORDION_PANEL_COUNT;
			}
		}
		else {
			index = gCurrentIndex - 1;
			if (index < 0) {
				index = 0;
			}
		}
		//Call accordion method to set the active panel
		$('ul.accordion').accordion("option", "active", index);
		window.location.hash = index;
        //setCookie("current_tab", index);
	});
	//init ezmar
	$('.returnsForm input[type="radio"]').ezMark();
        
        /*var current_tab = getCookie("current_tab");
        if (current_tab != null)
        {            
            $('ul.accordion').accordion("activate", current_tab);
            alert(current_tab);
        }*/
});

function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}