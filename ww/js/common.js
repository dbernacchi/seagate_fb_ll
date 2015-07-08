// This function allows you to have content display everywhere except prod live by adding the class "edit-only" to the DOM element you wish to hide onload.
var ecommLocaleMap = {"ecommLocalesList":[{"ecommLocale":"pl-pl","seaLocale":"pl-pl","drLocale":"pl_PL","currency":"PLN"},{"ecommLocale":"en-us","seaLocale":"en-us","drLocale":"en_US","currency":"USD"},{"ecommLocale":"en-ca","seaLocale":"en-ca","drLocale":"en_CA","currency":"CAD"},{"ecommLocale":"es-es","seaLocale":"es-es","drLocale":"es_ES","currency":"EUR"},{"ecommLocale":"en-ie","seaLocale":"en-gb","drLocale":"en_IE","currency":"EUR"},{"ecommLocale":"en-se","seaLocale":"en-gb","drLocale":"en_IE","currency":"SEK"},{"ecommLocale":"en-au","seaLocale":"en-au","drLocale":"en_AU","currency":"AUD"},{"ecommLocale":"en-dk","seaLocale":"en-gb","drLocale":"en_IE","currency":"DKK"},{"ecommLocale":"de-de","seaLocale":"de-de","drLocale":"de_DE","currency":"EUR"},{"ecommLocale":"en-ro","seaLocale":"en-gb","drLocale":"en_IE","currency":"RON"},{"ecommLocale":"en-lt","seaLocale":"en-gb","drLocale":"en_IE","currency":"LTL"},{"ecommLocale":"fr-fr","seaLocale":"fr-fr","drLocale":"fr_FR","currency":"EUR"},{"ecommLocale":"en-hu","seaLocale":"en-gb","drLocale":"en_IE","currency":"HUF"},{"ecommLocale":"en-cz","seaLocale":"en-gb","drLocale":"en_IE","currency":"CZK"},{"ecommLocale":"it-it","seaLocale":"it-it","drLocale":"it_IT","currency":"EUR"},{"ecommLocale":"en-gb","seaLocale":"en-gb","drLocale":"en_GB","currency":"GBP"}]};
var gsaEcommLocaleMap = {"gsaEcommLocalesList":[]};

function removeNotProdReady(){
    var host = window.location.host;
    var parts = host.split('.');
    var subdomain = parts[0];

    if (subdomain.indexOf('prod') == -1 && subdomain.indexOf('edit') == -1 && subdomain.indexOf('review') == -1 && subdomain.indexOf('tst') == -1 && subdomain.indexOf('dev') == -1 && subdomain.indexOf('stg') == -1){
        $('.edit-only').remove();
    }
}

//setting dumb vars for some external sites
if (typeof(rcLocaleJS) == 'undefined')	var rcLocaleJS = '';
if (typeof(spp_ProfileURL) == 'undefined')	var spp_ProfileURL = '';
if (typeof(gsaSite) == 'undefined')	var gsaSite = '';
if (typeof(gsaURL) == 'undefined')	var gsaURL = '';
if (typeof(serverHost) == 'undefined')	var serverHost = '';

// Default store id
var gblComStoreId;
if (gblComStoreId == null) {
	gblComStoreId = 'sgateus';
}

var gblComLocale;
if (gblComLocale == null) {
	gblComLocale = 'en_US';
}

//setting the default User
var loggedinUserName = getCookie("USERDETAIL");
var isSeagateDirectUser = getCookie('isSDUSER');
var IsSppUser = 'false';
var sdUrl = "/portal/site/direct";
var sppUrl = "/partners";
var sppLocale = "";

// Base for building a URL to add things to the cart
var DR_addToCart_URL = 'https://shop.seagate.com/store/'+gblComStoreId+'/'+gblComLocale+'/AddItemToRequisition';

// Query the cart to determine how many items are in it
var DR_cartInfo_URL = 'https://shop.seagate.com/store/'+gblComStoreId+'/DisplayPage/id.DRCartSummaryJSONPage/output.json/jsonp.CartInfo.updateCartDisplay';

// Populate display of how many items are in the cart
var CartInfo = {
	init: function() {
		if (gblComStoreId != null && gblComStoreId != "null") {
			jQuery.getScript(DR_cartInfo_URL);
		}
	},
	updateCartDisplay: function(arg) {
		if(arg.lineItems==0){
			$('#headerCart').removeClass("btn-info");
            $('#headerCart').addClass("btn-primary");
		}else{
			$('#headerCart').removeClass("btn-primary");
            $('#headerCart').addClass("btn-info");
		}
		$('#cartLineItems').html(arg.lineItems);
	}
};

var DR_cartInfo_URL_x_New = "https://shop.seagate.com/store/" + gblComStoreId + "/DisplayPage/id.DRCartSummaryJSONPage/output.json/jsonp.CartInfoX_New.updateCartDisplay";
var CartInfoX_New = {
	init : function () {
		if (gblComStoreId != null && gblComStoreId != "null") {
			jQuery.getScript(DR_cartInfo_URL_x_New);
		}
	},
	updateCartDisplay : function (arg) {
		$("#cartLineItems_new").each(function() {$(this).after("<i>" + arg.lineItems + "</i>");});
	}
};

function setLoginState(){
    loggedinUserName = getCookie("USERDETAIL");
    IsSppUser = getCookie("ISSPPUSER");
    sppLocale = getCookie("SPPLOCALE");
    isSeagateDirectUser = getCookie('isSDUSER');
    if(document.getElementById('login-div') != null && document.getElementById('logout-div') != null){
        if(typeof(loggedinUserName) != "undefined" && !isStringNullOrEmpty(loggedinUserName)){
            document.getElementById('login-div').style.display='none';
            document.getElementById('logout-div').style.display='block';
            document.getElementById('userName').innerHTML=loggedinUserName;
        }else {
            document.getElementById('login-div').style.display='block';
            document.getElementById('logout-div').style.display='none';
            document.getElementById('userName').innerHTML='';
        }
    }
    
    //if(document.URL.indexOf("/partners/")!== -1 && document.getElementById('btn-spp-settings') != null){
    //    $('#gearbtn').attr('href',  spp_ProfileURL);    
    //}
    if(IsSppUser=='true') {
    	$('#gearbtn').attr('href',  spp_ProfileURL); 
    	$('#change-name-email').attr('href',  spp_ProfileURL); 
    	if(document.URL.indexOf("/partners/my-spp-dashboard")!= -1){
    		hideLocaleSelector();
			currentCountry = getCountryForLocale(sppLocale);
		}else if(document.URL.indexOf("/spp_EventDetails_vf")!= -1 ||document.URL.indexOf("/apex/SPP_PersonProfile_VF")!= -1 ||document.URL.indexOf("/apex/SPP_CompanyProfile_VF")!= -1){
    		hideLocaleSelector();
		}
    	$('ul.breadcrumbs').find('li').each(function(index, value) {if (index == 0) {$(this).html("<a href='javascript:showSecurePage(sppUrl)'>"+labels.spp_home+"</a>");}});
    	$('ul.nav-breadcrumb').find('li').each(function(index, value) {if (index == 0) {$(this).html("<a href='javascript:showSecurePage(sppUrl)'>"+labels.spp_home+"</a><span class='divider'>/</span>");}});
    }
}

function setLoginState_New() {
	loggedinUserName = getCookie("USERDETAIL");
	IsSppUser = getCookie("ISSPPUSER");
	sppLocale = getCookie("SPPLOCALE");
	isSeagateDirectUser = getCookie('isSDUSER');
	if (document.getElementById('not-logged-in') != null && document.getElementById('logged-in') != null) {
		if (typeof(loggedinUserName) != "undefined" && !isStringNullOrEmpty(loggedinUserName)) {
		   $('#login-wrapper').addClass('logged-box');
		   $('#logged-in-hello').html(loggedinUserName);
		   $('#login-text').css("display", "none");
		   $('#logged-in-hello').css("display", "inline-block");
		   $('.arrow-down-icon').css("display", "inline-block");
		} else {
			$('#login-wrapper').removeClass('logged-box');
			$('#login-text').css("display", "inline-block");
			$('#logged-in-hello').css("display", "none");
			$('.arrow-down-icon').css("display", "inline-block");
	   }
	}
}

function setLoginState_New_Mega_Nav() {
	loggedinUserName = getCookie("USERDETAIL");
	IsSppUser = getCookie("ISSPPUSER");
	sppLocale = getCookie("SPPLOCALE");
	isSeagateDirectUser = getCookie('isSDUSER');
	if (document.getElementById('not-logged-in-new') != null && document.getElementById('logged-in-new') != null) {
		if (typeof(loggedinUserName) != "undefined" && !isStringNullOrEmpty(loggedinUserName)) {
			$('#logged-in-hello-new').text(loggedinUserName);
			$('#logged-in-new').css("display", "");
			$('#not-logged-in-new').css("display", "none");
		} else {
			$('#logged-in-new').css("display", "none");
			$('#not-logged-in-new').css("display", "");
		}
	}
}

function hideLocaleSelector() {
//this section is for new (2014) header footer.
	var selector = $('#currentCountry');
	selector.removeAttr('data-toggle').removeAttr('href');
	selector.hover(function () {
   	 	$(this).css('text-decoration', 'none');
    	$(this).css('cursor', 'default');
   });
   //end section for new (2014) header footer.
	//from here on can be removed once old (black) headerfooter is retired from all third parties
	//begin hiding locale selector. Consider recoding with condition in header
	$(".langDrop").hide();
	$('#localeSelector').find('em.bullet').css('background', 'none');
	$('#localeSelector').find('em.ico').css('cursor','default');
	$('#currentCountryId, .choiceOpen').css('cursor','default');
	$('#currentLanguageId').css('cursor','default');
	$('.choiceLang').find('.choiceOpen').css('background','none');
	$('#localeSelector').find('.choiceOpen').find('.ico').css('background','url("../images/global/bg/bg_home_sprite.png") no-repeat scroll 0 -1276px transparent');	
	$('#localeSelector').find('.choiceOpen strong').css('background','url("../images/global/bg/bg_home_sprite.png") no-repeat scroll 72px -1314px transparent');	
	//end hide locale selector.
	
	//hide universal template locale selector
	var navHeaderDropOpener = $('.nav-header-drop-opener');
	if (navHeaderDropOpener.length > 0) {
		navHeaderDropOpener.find('.nav-header-drop').hide();
		navHeaderDropOpener.find('.caret').css('visibility','hidden');
		navHeaderDropOpener.find('.lang-choice-open').css('cursor','default');
		navHeaderDropOpener.hover(function() {
			$(this).css('background','none');
			$(this).find('.icon-global').css('background-position','0 0');
		});
	}
}

function isStringNullOrEmpty(str) {
	if(str != null && str != 'null' && str != ''){
		return false;
	}
	return true;
}

/*
 name - name of the desired cookie
 return string containing value of specified cookie or null
 if cookie does not exist
*/
function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
                begin = dc.indexOf(prefix);
                if (begin != 0) return null;
        } else begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) end = dc.length;
        return unescape(dc.substring(begin + prefix.length, end));
}
	
/*
  name - name of the cookie
  [path] - path of the cookie (must be same as path used to create cookie)
  [domain] - domain of the cookie (must be same as domain used to
        create cookie)
  path and domain default if assigned null or omitted if no explicit
        argument proceeds
*/
function deleteCookie(name, path, domain) {
        if (getCookie(name)) {
                document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
}
	
function Logout(redirectUrl) {
        // Delete an SSO cookie and redirect to Login page
		window.top.name="something_unique";
        deleteCookie("SMSESSION", "/", ".seagate.com");
        deleteCookie("USERDETAIL", "/", ".seagate.com");
        deleteCookie("LOCALSMSESSION", "/", ".seagate.com");
        deleteCookie("ISSPPUSER", "/", ".seagate.com");
        deleteCookie("userSelectedLocaleCookie","/",".seagate.com");
	    deleteCookie("SPPLOCALE","/",".seagate.com");
	    deleteCookie("isSDUSER","/",".seagate.com");
	    $.cookie('spp-news-alert-box-status', null, {path: '/'});
        document.location.href=redirectUrl;
        return false;
}
	//for fetching twitter feed
// QC 2258
function replaceHttp(str, strt) {
	if (str.indexOf("http://") != -1 || str.indexOf("https://") != -1) {
		var firstIndex = str.indexOf("http://");
		if (firstIndex == -1) {
			firstIndex = str.indexOf("https://");
		}
		var newStr = str.substring(0, firstIndex);
		var rest = str.substring(firstIndex, str.length);
		var restt = strt.substring(firstIndex, strt.length);
		var blankIndex = rest.indexOf(" ");
		var blankIndext = restt.indexOf(" ");
		var url = "";
		var urlt = "";
		var restWO = "";
		var restWOt = "";
		if (blankIndext == -1) {
			urlt = restt;
		} else {
			urlt = strt.substring(firstIndex, firstIndex+blankIndext);
			restWOt = restt.substring(blankIndex, restt.length);
		}
		if (blankIndex == -1) {
			url = rest;
		} else {
			url = str.substring(firstIndex, firstIndex+blankIndex);
			restWO = rest.substring(blankIndex, rest.length);
		}
		newStr = newStr + "<a href='" + urlt + "'>" + url + "</a>";
		if (restWO.indexOf("http://") != -1 || restWO.indexOf("https://") != -1) {
			restWO = replaceHttp(restWO, restWOt);
		}
		newStr = newStr + restWO;
		return newStr;
	} else {
		return str;
	}
}

function getTwitterFeed(userId,id,listSelector)
{
	//call for latest tweet
	$.ajax({
        type: "GET",
        url:("https:" == document.location.protocol ? "https://" : "http://") + "search.twitter.com/search.json?callback=?&rpp=1&q=from:"+userId,
        dataType: "json",
        error: function() {
        	$("#"+id).remove();	
        	$('#newsBarHoldLI').fadeGallery({
				listSelector: listSelector,
				navCreate:		true,
				swichTime:		7000,
				delay:			800,
				fadeIEfix:		false,
				mouseOverPause:	true
			});
        },
        success: function(dataString) {
			if (dataString != null && dataString != "" && dataString.results.length > 0 && dataString.results[0].text != "undefined" && dataString.results[0].text != "") {
				var latestTweet = dataString.results[0].text;
				// QC 2258
				var atseagate = "@" + userId + ": ";
				var atseagateD = "<strong>@" + userId + ": </strong>";
				latestTweet = atseagate + latestTweet;
				var len = latestTweet.length;
				
				var latestTweetD = "";
				var points = "";
				if (len <= 120) {
					latestTweetD = replaceHttp(latestTweet, latestTweet);
				} else {
					var latestTweet120 = latestTweet.substring(0, 120);
					latestTweetD = replaceHttp(latestTweet120, latestTweet);
					points = "...";
				}
				latestTweetD = atseagateD + latestTweetD.substring(atseagate.length, latestTweetD.length);
				$("#"+id).html(latestTweetD + points);
			} else {
				$("#"+id).remove();
			}
			$('#newsBarHoldLI').fadeGallery({
				listSelector: listSelector,
				navCreate:		true,
				swichTime:		7000,
				delay:			800,
				fadeIEfix:		false,
				mouseOverPause:	true
			});
			/*var len = userId.length+3;
			if(latestTweet.indexOf("http://")>=0)
			{
				var indexHttp=latestTweet.indexOf("http://");
				var preString = latestTweet.substring(0,indexHttp);
				var suffixString = latestTweet.substring(indexHttp);
				var indexEndUrl = suffixString.indexOf(" ");
				var url = suffixString;
				if(indexEndUrl>0)
				{
					url = suffixString.substring(0,indexEndUrl);
					suffixString = suffixString.substring(indexEndUrl);
				}
				else
				{
					url = latestTweet.substring(indexHttp);
					suffixString="";
				}
				latestTweet = preString+"<a href='"+url+"'>"+url+"</a>"+suffixString;
				var urlHref=url;
				len=len+preString.length+url.length+suffixString.length;
				
				if(len>120)
				{
					var charToTrim = 116 - (userId.length+3);
					var charTorem=len-charToTrim;
					if(suffixString.length>=charTorem)
					{
						suffixString=suffixString.substring(0,suffixString.length-charTorem);
					}
					else
					{
						charTorem=charTorem-suffixString.length;
						suffixString="";
						if(url.length>=charTorem)
						{
							url=url.substring(0,url.length-charTorem);
						}
						else
						{
							charTorem=charTorem-url.length;
							url="";
							if(preString.length>=charTorem)
							{
								preString=preString.substring(0,preString.length-charTorem);
							}
						}
					}

					latestTweet = preString+"<a href='"+urlHref+"'>"+url+"</a>"+suffixString+"...";
				}
			}
			else
			{
				len=len+latestTweet.length;
				if(len>120)
				{
					var charToTrim = 116 - (userId.length+3)
					latestTweet=latestTweet.substring(0,charToTrim)+"...";
				}
			}
			
			$("#"+id).html("<strong>@"+userId+": </strong>"+latestTweet);*/
        }
    }); //close $.ajax(
}
var pagenotfound = true;

function setConsumerTargetUrl(){
        var acct=document.getElementById("consumer-accountSelect");
        var trg=document.getElementById("consumer-target");
        trg.value=acct.value;
}

function showSecurePage(secureUrl) {
	if(secureUrl.indexOf("http://")==-1) {
		secureUrl = httpsURL + secureUrl;
	}
	if(!isStringNullOrEmpty(loggedinUserName)){
		if(IsSppUser=='true') {
			 window.location.href = secureUrl.replace('http://', 'https://');
		} else if (isSeagateDirectUser=='true') {
			 window.location.href = secureUrl.replace('http://', 'https://');
	    } else {
			 window.location.href = secureUrl.replace('https://', 'http://');
		}
	} else {
		window.location.href = secureUrl.replace('https://', 'http://');
	}
} // showSecurePage(secureUrl)


//header search functionality
function submitSearchFormPromo() {
	var searchMsg = document.getElementById('searchMSG').value;
	var formId = "suggestion_form2";	
	
    var qv = document.getElementById(formId).q.value;
   
   if (!qv || !($.trim(qv)) || qv==searchMsg || qv=='') 
   {   
	   /*
	   document.getElementById("suggestion_form2").className='error';
	   $("#searchPromoAlert").focus();
		$("#searchPromoAlert").blur(function() {
			document.getElementById("suggestion_form2").className='';
		});
	   */
	   
       return false;
   }else{
	   
	   var n=rcLocaleJS.split("-");
	   var localeURL = "/"+n[1]+"/"+n[0];

	   if (rcLocaleJS == "en-us") {
	     //  	 qv = qv+"&locale="+rcLocaleJS
		   localeURL = "";
	   }
	   	   window.location.href = "//"+ serverHost + localeURL +"/search/?keyword="+qv;
	   return false;
	   /*
	   document.getElementById("suggestion_form2").action = "//"+ serverHost +"/ww/searchResult";
	   document.getElementById("suggestion_form2").querySearch.value = qv;
	   document.getElementById("suggestion_form2").method = "GET";
	   document.getElementById("suggestion_form2").submit();
	   return true;
	   */
   }
}

function submitSearchFormPromoX_New(device) {
	var searchMsg = document.getElementById("searchMSG").value;
	var qv = document.getElementById("suggestion_form2_" + device).q.value;
	var searchHost = serverHost;
	searchHost=serverHost.replace(/^.*\/\//, "");
	if (typeof(rcLocaleJS) == 'undefined' || rcLocaleJS == ""){
		 var rcLocaleJS = "en-us";
	}
	if (!qv || !($.trim(qv)) || qv == searchMsg || qv == "") {
		return false;
	} else {
		var n = rcLocaleJS.split("-");
		var localeURL = "/" + n[1] + "/" + n[0];
		if (rcLocaleJS == "en-us") {
			localeURL = "";
		}
		window.location.href = "//" + searchHost + localeURL + "/search/?keyword=" + qv;
		return false;
	}
}

function submitSearchForm404()
{
       var qv = document.getElementById("suggestion_form404").q.value;
       var n=rcLocaleJS.split("-");
	   var localeURL = "/"+n[1]+"/"+n[0];
	   if (rcLocaleJS == "en-us") {
	     //  	 qv = qv+"&locale="+rcLocaleJS
		   localeURL = "";
	   }
	    window.location.href = "//"+ serverHost + localeURL +"/search/?keyword="+qv;
}

$("#searchPromo").keydown(function(e) {
    e = e || window.event;
    if (document.getElementById("suggestion_form2") != undefined) {
    	document.getElementById("suggestion_form2").className="";
    }

//    if (e.keyCode == 13) {
//		$("#search").val(trim($("#search").val()));
 //       submitSearchForm();
  //  }
});
function suggSearchApply(suggSearch){
document.getElementById('suggestion_form2').querySearch.value=suggSearch;
document.getElementById("suggestion_form2").q.value=suggSearch;
submitSearchFormPromo();
}
/*$("#searchPromo").keydown(function(e) {
    e = e || window.event;
	document.getElementById("suggestion_form2").className="";
    if (e.keyCode == 13) {
		$("#searchPromo").val(trim($("#searchPromo").val()));
        return submitSearchFormPromo();
    }
});*/
$(document).ready(function() {
	//begin clear cart on locale change
  	var clearCart = getCookie("clearCart");
	if(clearCart != null){
		document.getElementById('ClearCartIframe').src = "http://shop.seagate.com/store/sgateus/" + clearCart + "/ResetShoppingCart";
		removeCookie("clearCart");	
	}
	//end clear cart on locale change.
	
	setViewCartLink();
	
	//begin function to offset url anchors by height of nav
/*	if(window.location.hash.length != 0){
		var top_offset = 115;
    	if($('#nav-wrapper').hasClass('nav-wrapper-mobile-width')){
     		top_offset = 0;
    	}
		$('html, body').animate({scrollTop: $('#'+ window.location.hash.substring(1)).offset().top - top_offset}, 5);
	}
*/	//end function to offset url anchors by height of nav
	
    $('.globe-icon').on("click touchstart", function (e) {
		if ($('.cart-qty').length != 0 && $('.cart-qty').text() != "0") {
			$('.nav-footer-cart-warning').show();
		}else if ($('.cart-qty').length == 0 && getEcommLocale() != ""){
			$('.nav-footer-cart-warning').show();
		}
	});
  //set listener for locale selector checkbox.
    $('.nav-footer-checkbox').on("click touchstart", function (e) {
		e.preventDefault();
		if ($('.nav-footer-checked').css('display')== "inline-block" || $('.nav-footer-checked').css('display')=="block"){
			$('.nav-footer-checked').css('display', 'none');
			$('.nav-footer-unchecked').css('display', 'inline-block');
			$('#nav-footer-remember').prop('checked', false);
		} else {
			$('.nav-footer-unchecked').css('display', 'none');
			$('.nav-footer-checked').css('display', 'inline-block');
			$('#nav-footer-remember').prop('checked', true);
		}

   });

	//removes elements that were tagged to be removed when in prod live.
	removeNotProdReady();

	//header search autosuggest
	var autoSugglistener = window.addEventListener;
	var autoSuggEventType = "load";

	if(!autoSugglistener){
		autoSugglistener = window.attachEvent;
		autoSuggEventType = "onload";
	}

	autoSugglistener( autoSuggEventType, function(){
	   var searchHost = serverHost;
	   searchHost=serverHost.replace(/^.*\/\//, "");
	   $("#searchPromo").autocomplete({
		   source: "//"+ searchHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" +gsaURL+"&rcLocaleJS="+rcLocaleJS,
	       select: function( event, item ) {
	           $("#searchPromo").val(item.item.value);
	           if (this.form.id == "domore_form") {
	        	   submitdoMoreSearchForm();
	           } else {
		           submitSearchFormPromo();
	           }
	       }
	   });
	}, false );
	
	autoSugglistener(autoSuggEventType, function(){
	       var searchHost = serverHost;
	       searchHost=serverHost.replace(/^.*\/\//, "");
		   $("#searchPromoX-desk").autocomplete({
			   source: "//"+ searchHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" +gsaURL+"&rcLocaleJS="+rcLocaleJS,
			   select: function( event, item ) {
				   $("#searchPromoX-desk").val(item.item.value);
				   submitSearchFormPromoX_New('desk');
			   }
		   });
		}, false );
		
	autoSugglistener(autoSuggEventType, function(){
	       var searchHost = serverHost;
	       searchHost=serverHost.replace(/^.*\/\//, "");
		   $("#searchPromoX-mobile").autocomplete({
			   source: "//"+ searchHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" +gsaURL+"&rcLocaleJS="+rcLocaleJS,
			   select: function( event, item ) {
				   $("#searchPromoX-mobile").val(item.item.value);
				   submitSearchFormPromoX_New('mobile');
			   }
		   });
		}, false );
	
	autoSugglistener(autoSuggEventType, function(){
		   $("#spp-support-search-textbox").autocomplete({
			   source: "//"+ serverHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" +gsaURL+"&rcLocaleJS="+rcLocaleJS,
			   select: function( event, item ) {
				   $("#spp-support-search-textbox").val(item.item.value);
				   $("#spp-search-support").submit();
			   }
		   });
		}, false );
	// end header search autosuggest
	
	var smeSessionCookie = getCookie('SMSESSION');
	//var localSmeSessionCookie = getCookie('LOCALSMSESSION');
	var userDetail = getCookie('USERDETAIL');

	setLoginState();
	
	setLoginState_New();
	
	setLoginState_New_Mega_Nav();
	
	displayCartIcon();
		if(typeof(loginVar == "undefined")) {// initializing loginVar to avoid failure on third party sites.
			var loginVar = "xxx";
	}
	if((!isStringNullOrEmpty(smeSessionCookie) && (isStringNullOrEmpty(userDetail))) || userDetail!=loginVar.userName)
	{
		//alert('found Loged in cookie'); 
		//alert(httpsURL+"/ww/jsp/common/configUtil.jsp?callback=?");
		$.ajax({
				type: "GET",
				url: httpsURL+"/ww/jsp/common/configUtil.jsp",
				dataType: "jsonp",
				success: function(data) {
					setSessionCookie('USERDETAIL',data.userName);
					setSessionCookie('ISSPPUSER',data.isSppUser);
					setSessionCookie('SPPLOCALE',data.SppLocale)
					//IsSppUser = data.isSppUser;
					setLoginState();
					
					setLoginState_New();
					
					setLoginState_New_Mega_Nav();
					
					displayCartIcon();
				},
				crossDomain: true,
				jsonpCallback: "results"
								
			}); //close $.ajax
		    /**
		    $.getJSON(httpsURL+"/ww/jsp/common/configUtil.jsp?callback=?", 
		    		function(data) {
						alert(data);
						setSessionCookie('USERDETAIL',data.userName);
						setLoginState();	
		    		    //alert("Symbol: " + data.symbol + ", Price: " + data.price);
		    		});
		    **/		
	}
   
    $('#login-div li').mouseover(function(){
        $('#header .searchForm').css('visibility','hidden');
    })
    .mouseout(function(){
        $('#header .searchForm').css('visibility','visible');
    });;;
	
	// for keyup event of consumer login
    if($("#partnerLoginFrm")[0]){
    	$("#formPassword").keyup(function(e) {
    		if(e.which==13){		
        		e.preventDefault();
        		loginSubmit();
    		}
    							
    	});
    }
	
	//check when doc is ready if any params were passed to load a tab other than the default one.
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
					subNavTabContentF.siblings().removeClass('active').css({
						'position' : 'absolute',
						'top' : '-99999px',
						'left' : '-99999px'
					});
					subNavTabContentF.addClass('active').css({
						'position' : 'static',
						'top' : '0px',
						'left' : '0px'
					});
				}
				if ($(subNavTabLink).length > 0) {
					$(subNavTabLink).click();
				}
			}
		}
	}
	
	// updates already open modal window and replaces it with video content (used for media kits)
    $("a.videoCallBtn_Popup").click(function() {
    	if ($("#videoPopup").length > 0) {
    		$("#videoPopup .title").html($(this).attr("videotitle"));
    		var videoContentHtml = '<object width="648" height="422">'
    			+ '<param name="movie" value="' + $(this).attr("videourl") + '"></param>'
    			+ '<embed src="' + $(this).attr("videourl") + '" type="application/x-shockwave-flash" width="648" height="422" wmode="transparent" allowfullscreen="true"></embed>'
    			+ '<param name="allowFullScreen" value="true"></object>';
    		$(".video").html(videoContentHtml);
    	}
    });
    
    // update the globalNav to include the Seagate Home is the user is SD user. 
    if (isSeagateDirectUser=="true") {
    	$('ul.breadcrumbs').find('li').each(function(index, value) {
    	  if (index == 0) { 
    	    //$(this).after("<li><a href='javascript:showSecurePage(sdUrl)'>Seagate Direct</a></li>"); 
    		  $(this).html("<a href='javascript:showSecurePage(sdUrl)'>"+labels.seagate_direct_home+"</a>"); 
    	  } 
    	});
    	$('ul.nav-breadcrumb').find('li').each(function(index, value) {
      	  if (index == 0) { 
      	    //$(this).after("<li><a href='javascript:showSecurePage(sdUrl)'>Seagate Direct</a></li>"); 
      		  $(this).html("<a href='javascript:showSecurePage(sdUrl)'>"+labels.seagate_direct_home+"</a><span class='divider'>/</span>"); 
      	  } 
      	});
    }
    
 // update the globalNav to include the SPP Home is the user is SPP user. 
    if (IsSppUser=="true") {
    	$('ul.breadcrumbs').find('li').each(function(index, value) {if (index == 0) {$(this).html("<a href='javascript:showSecurePage(sppUrl)'>"+labels.spp_home+"</a>");}});
    	$('ul.nav-breadcrumb').find('li').each(function(index, value) {if (index == 0) {$(this).html("<a href='javascript:showSecurePage(sppUrl)'>"+labels.spp_home+"</a><span class='divider'>/</span>");}});
    }
    
    if ($(".support-downloads.support-pdp").length > 0) {
        // generate support downloads documents and links
        generateSupportDownloadsDocumentsLinks();
    }
     //set the country in the footer locale selector
     //setGlobeLocaleCountry()
});

$(window).load(function () {
	// update cart count. don't update cart if it isn't on the page
	if($('#cartSection').length != 0) {
		CartInfo.init();	
	}
	
	if ($("#cartLineItems_new").length != 0) {
		CartInfoX_New.init();
	}
});

function generateCollapse(ulId, key)
{
	var $Ul = $("#" + ulId);
	var $Lis = null;
	if ($Ul != null)
	{
		$Lis = $Ul.children();
	}
	if ($Lis == null || $Lis.length == 0)
	{
		$Ul.prev().remove();
		$Ul.remove();
	}
	else if ($Lis.length > 5)
	{
		var collapseStr = '<li><i class="ss-navigateright"></i>'
			+ '<div class="support-pdp-list-item">'
			+ '<a href="#" class="collapse-toggle" data-toggle="collapse" data-target="#collapse-' + ulId + '">' + key + '</a>'
			+ '</div>'
            + '<div class="collapse-content collapse" id="collapse-' + ulId + '" style="height:0px">'
            + '<div class="collapse-inner">'
            + '<ul class="support-pdp-list unstyled">';
		$Lis.each(function(i, val){
			if (i > 4)
			{
				collapseStr = collapseStr + '<li>' + val.innerHTML + '</li>';
				$(val).remove();
			}
		});
		collapseStr = collapseStr + '</ul></div></div></li>';
		
		$Ul.html($Ul.html() + collapseStr);
	}
}

function generateSupportDownloadsDocumentsLinks() {
	var SeeAllDownloadsText = $("#SeeAllDownloads").val();
	generateCollapse("supportDownloads", SeeAllDownloadsText);
	var $supportDownloadsReal = $("#supportDownloadsReal");
	if ($supportDownloadsReal != null)
	{
		$("#supportDownloadsMark").replaceWith($("#supportDownloadsReal").html());
		$("#supportDownloadsMark").attr("display","block");
		$("#supportDownloadsReal").remove();
	}
	
	var SeeAllDocumentsText = $("#SeeAllDocuments").val();
	generateCollapse("supportDocuments", SeeAllDocumentsText);
	
	var $supportKeyLinks = $("#supportKeyLinks");
	if ($supportKeyLinks != null && $supportKeyLinks.children().length > 5 && '${foundPDP}' == 'true')
	{
		var $pdpLi = $supportKeyLinks.children().last();
		$supportKeyLinks.children().eq(3).after($pdpLi);
	}
	
	var SeeAllKeyLinksText = $("#SeeAllKeyLinks").val();
	generateCollapse("supportKeyLinks", SeeAllKeyLinksText);
}

function getEcommLocale(){
	var ecommLocale = "";
	ecommLocale = getCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP);
	if(ecommLocale == null){
		ecommLocale=getCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT);
	}
	if(ecommLocale == null && SUPPORTED_ECOMM_LOCALE.indexOf(rcLocaleJS)!=-1 ){// if locale is an ecomm locale, but ecommLocaleCookie wasn't set.
   	 	ecommLocale = rcLocaleJS;
	} else if(ecommLocale == null) {
		ecommLocale = "";
	}
	if(SUPPORTED_ECOMM_LOCALE.indexOf(ecommLocale)==-1 ){
		ecommLocale = "";
	}
	
	return ecommLocale;
}

function getEcommCurrency(){
	for (i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == getEcommLocale()){
			return ecommLocaleMap.ecommLocalesList[i].currency;
		}
	}
}

function getDrLocale(){
	for (i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == getEcommLocale()){
			return ecommLocaleMap.ecommLocalesList[i].drLocale;
		}
	}
}

function setViewCartLink(){
	if(typeof(ecommLocaleMap != "undefined")) {
		var drLocale = getDrLocale();
		$(".view-cart").attr("href", "https://shop.seagate.com/servlet/ControllerServlet?Action=DisplayPage&Env=BASE&id=ThreePgCheckoutShoppingCartPage&Locale=" + drLocale + "&SiteID=sgateus");
	} else {
		$(".view-cart").attr("href", "https://shop.seagate.com/servlet/ControllerServlet?Action=DisplayPage&Env=BASE&id=ThreePgCheckoutShoppingCartPage&Locale=en_US&SiteID=sgateus");
	}
}

function displayCartIcon() {
	var ecommLocale = getEcommLocale();
	if (ecommLocale != "") {
		$(".gn-cart.gn-icon").css("display", "");
	}
}

// CWSWWW-2270 The current page should never actually be a link.
$(document).ready(function() {
	$(".nav-list .noclick>a").css("cursor", "default").css("text-decoration", "none");
	$(".nav-list .noclick>a").click(function(e){
		e.preventDefault();
	});
});