var DR_cartInfo_URL_x="https://shop.seagate.com/store/"+gblComStoreId+"/DisplayPage/id.DRCartSummaryJSONPage/output.json/jsonp.CartInfoX.updateCartDisplay";
var CartInfoX = {
    init: function() {
        if (gblComStoreId != null && gblComStoreId != "null") {
            jQuery.getScript(DR_cartInfo_URL_x);
        }
    },
    updateCartDisplay: function(arg) {
        if(arg.lineItems==0){
            $('#iconShopimg').removeClass("btn-info");
            $('#iconShopimg').addClass("btn-primary");
        }else{
            $('#iconShopimg').removeClass("btn-primary");
            $('#iconShopimg').addClass("btn-info");
        }
        $('#cartLineItems').html(arg.lineItems);
    }
};
if($('#cartSection').length != 0) {
	CartInfoX.init();        
}

function submitSearchFormPromoX() {
	var searchMsg=document.getElementById("searchMSG").value;
	var qv=document.getElementById("suggestion_form2").q.value;
	if(!qv||!($.trim(qv))||qv==searchMsg||qv==""){
		//if($("#searchPromo").is(":focus")){
			//document.getElementById("suggestion_form2").className="error";
			$("#suggestion_form2").addClass("error");
			$("#searchPromoX").blur(function () {
				$("#suggestion_form2").removeClass("error");
			});
			$("#searchPromoX").keydown(function () {
				$("#suggestion_form2").removeClass("error");
			});
			$("input.nav-header-search-submit").blur(function () {
				$("#suggestion_form2").removeClass("error");
			});
		//}
		return false;
	}else{
		/*document.getElementById("suggestion_form2").action="//"+serverHost+"/ww/searchResult";
		document.getElementById("suggestion_form2").querySearch.value=qv;
		document.getElementById("suggestion_form2").method="GET";
		document.getElementById("suggestion_form2").submit();*/
		var n=rcLocaleJS.split("-");
        var localeURL = "/"+n[1]+"/"+n[0];
        if (rcLocaleJS == "en-us") {
           localeURL = "";
         }
         window.location.href = "//"+ serverHost + localeURL +"/search/?keyword="+qv;
         return false;
		 //return true;
	}
}

$(document).ready(function() {
	// enable dynamic image only banner and other carousels
	carouselSwipe();
	
	//header search autosuggest
	var autoSugglistener = window.addEventListener;
	var autoSuggEventType = "load";

	if(!autoSugglistener){
		autoSugglistener = window.attachEvent;
		autoSuggEventType = "onload";
	}

	autoSugglistener( autoSuggEventType, function(){
	   $("#searchPromoX").autocomplete({
		   source: "//"+ serverHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" +gsaURL+"&rcLocaleJS="+rcLocaleJS,
	       select: function( event, item ) {
	           $("#searchPromoX").val(item.item.value);
	           submitSearchFormPromoX();
	       }
	   });
	}, false );
	// end header search autosuggest
	
	// load youtube iframe libarry
	if ($('#youtubeIdStr-productSummary')[0] != undefined || $("#youtubeIdStr-videoCarousel")[0] != undefined) {
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
	}
	
	try{
		showAlertMessage();
	}catch(ex){
	}
});

// [Begin] used in product-summary.jsp, video-carousel.jsp
var playerArray = new Array();

function onYouTubeIframeAPIReady() {
    var youtubeIdStr = "";
	if ($("#youtubeIdStr-productSummary")[0] != undefined) {
		youtubeIdStr = $("#youtubeIdStr-productSummary").attr("youtubeIdStr");
	}
	
	if ($("#youtubeIdStr-videoCarousel")[0] != undefined) {
		youtubeIdStr = $("#youtubeIdStr-videoCarousel").attr("youtubeIdStr");
	}
	
	if (youtubeIdStr != "") 
	{
		var youtubeIdArray = youtubeIdStr.split(";");
		var arrayLength = youtubeIdArray.length - 1;
		
		for (var i = 0; i < arrayLength; i++)
		{
			var item = youtubeIdArray[i];
			var itemArray = item.split(",");
			var id = itemArray[0];
			var youtubeID = itemArray[1];

			var player = new YT.Player(id, {
				height: '360',
				width:  '640',
				videoId: youtubeID,
				playerVars: {"html5": "1"},
				events: {
					'onStateChange': onPlayerStateChange
				}
			});
			
			playerArray.push(player);
		}
	}
}

function onPlayerStateChange(event) {
	if ($('.m-carousel-controls')[0] != undefined) {
	    $('.m-carousel-controls>.m-active').click();
	}
	
	if ($('.video-carousel-list')[0] != undefined) {
		 var currentPlayerID = $('.video-carousel-list>.current').find("iframe").attr("id");
		 var currentPlayerIndex = currentPlayerID.substr(7);
		 for (var i = 0; i < playerArray.length; i++)
		 {
		     if (i != currentPlayerIndex)
		         playerArray[i].pauseVideo();
		 }
	}
}
// [End] used in product-summary.jsp, video-carousel.jsp
