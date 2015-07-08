/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:39
 */
$(document).ready(function() {
    //init tabs
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');

    $("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'type'           : 'ajax'
		}
	);
	$("a.openProductEntry").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			onComplete	:	function() {
				initTabs('.tabBox', '.tabList li', '.tabContent .tab');
			}
		}
	);
	//init accordion
		$('ul.accordion').accordion({
			active: ".selected",
			autoHeight: false,
			header: ".opener",
			collapsible: true,
			event: "click"
		});
                
    var max_height = 0;
    $(".tabList").find('a').each(function() {
        if ($(this).height() > max_height) max_height = $(this).height();
    });    
    $(".tabList").find('a').each(function() {
        $(this).height(max_height);        
    });
    $('.spacer').height(max_height);
});


function submitSearch(){
           var encodedKeyword = null;
        if ( document.getElementById("support-search-textbox").value.length > 1 &&
                (document.getElementById("support-search-textbox").value != "Enter a question, keywords, a product name, or a model number")) {
					var n=rcLocaleJS.split("-");
					var localeURL = "/"+n[1]+"/"+n[0];

					if (rcLocaleJS == "en-us") {
		   				localeURL = "";
		   			}
		   			window.location.href = "//"+ serverHost + localeURL +"/search/?tab=nav-tabs-sp?keyword="+document.getElementById("support-search-textbox").value;
	   	   			return false;
       }else{
            return false;
       }
 }
    
    

$(document).ready(function() {
	var autoSugglistener = window.addEventListener;
	var autoSuggEventType = "load";
	if(!autoSugglistener){
		autoSugglistener = window.attachEvent;
		autoSuggEventType = "onload";
	}
	autoSugglistener( autoSuggEventType, function(){
		$("#support-search-textbox").autocomplete({
			source: "//"+ serverHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" +gsaURL,
			select: function( event, item ) {
				$("support-search-textbox").val(item.item.value);
			}
		});
	}, false );

	try{
		showAlertMessage();
	}catch(ex){}
});
    

    