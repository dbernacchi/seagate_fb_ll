/**
 * Created by JetBrains PhpStorm. User: Mamliga Date: 01.08.11 Time: 15:49 To
 * change this template use File | Settings | File Templates.
 */
var pageSize = document.getElementById("pageSize").value;
var category = document.getElementById("proCategory").value;
var locale = document.getElementById("lang").value;
var pageSize = pageSize;
var featureItems = "*";
var prodItems = "";
var locale = locale;
function nextPageAll(begin, end, total, flagPage, pageUsed) {
	if (pageUsed > total) {
		return;
	}
	var nextBegin = begin + 1;
	var nextEnd = end + 1;
	var flag = true;
	var pageUsed = (pageUsed - 1) * pageSize;
	document.getElementById("startParamAll").value = pageUsed;
	if (flagPage) {
		document.getElementById("beginParamAll").value = nextBegin;
		document.getElementById("endParamAll").value = nextEnd;
		document.getElementById("totalParamAll").value = total;
	}
	if (flag) {
		getPamas();
		var val = "&beginParamAll=" + nextBegin + "&endParamAll=" + nextEnd
				+ "&totalParamAll=" + total + "&startParamAll=" + pageUsed;
		val = val + "&pageSize=" + pageSize + "&q=" + featureItems
				+ "&metaString=(asscategory:" + category + ")"
				+ (prodItems.length == 0 ? "" : ".") + prodItems;
		makeAsynCall(val);
	}
}
function prePageAll(begin, end, total, flagPage, pageUsed) {
	var nextBegin = begin - 1;
	var nextEnd = end - 1;
	var flag = true;
	if (pageUsed == 1) {
		flag = false;
	}
	var pageUsed = (pageUsed - 2) * pageSize;
	document.getElementById("startParamAll").value = pageUsed;
	if (flagPage) {
		document.getElementById("beginParamAll").value = nextBegin;
		document.getElementById("endParamAll").value = nextEnd;
		document.getElementById("totalParamAll").value = total;
	}
	if (flag) {
		getPamas();
		var val = "&beginParamAll=" + nextBegin + "&endParamAll=" + nextEnd
				+ "&totalParamAll=" + total + "&startParamAll=" + pageUsed;
		val = val + "&pageSize=" + pageSize + "&q=" + featureItems
				+ "&metaString=(asscategory:" + category + ")"
				+ (prodItems.length == 0 ? "" : ".") + prodItems;
		makeAsynCall(val);
	}
}
function showAll() {
	getPamas();
	var val = "&beginParamAll=1&startParamAll=0";
	val = val + "&pageSize=1000&q=" + featureItems
			+ "&metaString=(asscategory:" + category + ")"
			+ (prodItems.length == 0 ? "" : ".") + prodItems;
	makeAsynCall(val);
}
function newFilter() {
	getPamas();
	var val = "&beginParamAll=1&startParamAll=0";
	val = val + "&pageSize=" + pageSize + "&q=" + featureItems
			+ "&metaString=(asscategory:" + category + ")"
			+ (prodItems.length == 0 ? "" : ".") + prodItems;
	makeAsynCall(val);
}
function getPamas() {
	featureItems = "";
	var selectedNum = 0;
	var item = document.getElementsByName("featureItem");
	featureItems = jQuery.trim(featureItems);

	for ( var i = 0; item != null && i < item.length; i++) {
		if (item[i].checked) {
			featureItems = featureItems + (featureItems.length == 0 ? "" : "|")
					+ item[i].value;
			selectedNum++;
		}
	}
	if (featureItems.length == 0 || selectedNum == 0) {
		featureItems = "*";
	}
	prodItems = "";
	var item = document.getElementsByName("productItem");
	for ( var i = 0; item != null && i < item.length; i++) {
		if (item[i].checked) {
			prodItems = prodItems + (prodItems.length == 0 ? "" : "|")
					+ "CompatProdChildShortName:" + item[i].value;
		}
	}
	if (prodItems.length > 0) {
		prodItems = "(" + prodItems + ")";
	}
	prodItems = jQuery.trim(prodItems);
}

function getProdItemsFromHead() {
	if (document.getElementById("DRProductId") != null) {
		var inputProds = document.getElementById("DRProductId").value;
		if (inputProds == null || inputProds == "null" || inputProds == "") {
			return "";
		}
		var inputProdsArr = inputProds.split(".");
		prodItems = "";
		for ( var i = 0; inputProdsArr != null && i < inputProdsArr.length; i++) {
			prodItems = prodItems
					+ (prodItems.length == 0 ? "" : "|")
					+ "CompatProdChildShortName:"
					+ inputProdsArr[i].replace(new RegExp("%20", "gm"), "+")
							.replace(/[\s]+/gi, "+");
		}
		if (prodItems.length > 0) {
			prodItems = "(" + prodItems + ")";
		}
		return jQuery.trim(prodItems);
	} else {
		return "";
	}
}

function getModelNumberFromHead() {
	
	if ($(document).getUrlParam("sku") != null) {
		var inputProds = $(document).getUrlParam("sku");
		if (inputProds == null || inputProds == "null" || inputProds == "") {
			return "";
		}
		var inputProdsArr = inputProds.split(".");
		prodItems = "";
		for ( var i = 0; inputProdsArr != null && i < inputProdsArr.length; i++) {
			prodItems = prodItems
					+ (prodItems.length == 0 ? "" : "|")
					+ "ProdSkuChildModelNumber:"
					+ inputProdsArr[i].replace(new RegExp("%20", "gm"), "+")
							.replace(/[\s]+/gi, "+");
		}
		if (prodItems.length > 0) {
			prodItems = "(" + prodItems + ")";
		}
		return jQuery.trim(prodItems);
	} else {
		return "";
	}
}

function clickAllAccessory() {
	if (document.getElementById("all_a").checked) {
		var item = document.getElementsByName("featureItem");

		for ( var i = 0; item != null && i < item.length; i++) {
			item[i].checked = false;
		}
	}
	newFilter();
}

function resetAccessory() {
	// document.getElementById("all_a").checked = true;

	var item = document.getElementsByName("productItem");

	for ( var i = 0; item != null && i < item.length; i++) {
		item[i].checked = false;
	}

	item = document.getElementsByName("featureItem");

	for ( var i = 0; item != null && i < item.length; i++) {
		item[i].checked = false;
	}

	newFilter();
}

function trim(str) {
	if (!str || typeof str != 'string')
		return null;

	return str.replace(/^[\s]+/, '').replace(/[\s]+$/, '').replace(/[\s]{2,}/,
			' ');
}

function convertLocale(locale){
	var newLocale = locale;
	if(locale!=null){
		var newLocales = locale.split("-");
		if(newLocales!=null && newLocales.length==2){
			newLocale = newLocales[0]+"_"+newLocales[1].toUpperCase();
		}
	}	
	return newLocale;
}

function makeAsynCall(val) {
	var queryString = "";
	var lang = document.getElementById("lang").value;
	var tlen = document.getElementById("tlen").value;
	var accessories_ecommLocale = "";
	if(getCookie('ecommSessionCookie')!=null && getCookie('ecommSessionCookie')!=undefined && getCookie('ecommSessionCookie')!=""){		
		accessories_ecommLocale=getCookie('ecommSessionCookie');
	}else if(getCookie('ecommLocaleCookie')!=null && getCookie('ecommLocaleCookie')!=undefined && getCookie('ecommLocaleCookie')!=""){
		accessories_ecommLocale=getCookie('ecommLocaleCookie');
	}else{
		accessories_ecommLocale=rcLocaleJS;
	}
	var queryString = "site=accessories_finder&output=xml_no_dtd&lang=" + lang
			+ "&ecommlang="+accessories_ecommLocale+"&tlen=" + tlen + "&getfields=*&" + val;
	queryString += "&ms=" + new Date().getTime();

    var index = val.indexOf("CompatProdChildShortName:");
    var compatibleProduct = "";
    
    if(index && (index != -1)){
        compatibleProduct = val.substring( index + "CompatProdChildShortName:".length, val.indexOf(")", index));
        compatibleProduct = compatibleProduct.split("CompatProdChildShortName:").join(",");
        compatibleProduct = compatibleProduct.split("|").join("");
        compatibleProduct = "," + compatibleProduct + ",";
    }

    /* Use jquery to call ajax */
	$.ajax({
		type : "POST",
		url : "/ww/jsp/accessories/AccessoriesTabAjaxContent.jsp",
		cache : false,
		data : queryString,
		success : function(msg) {
			$("#accessoriesTabAjax").css('visibility', 'hidden');
			$("#tab_1").css('visibility', 'hidden');
			$("#accessoriesTabAjax").html(msg);
			$("#tab_1").html(msg);
			lang = lang.toLowerCase();

			$('.infoSpecs input[type="checkbox"]').ezMark();

            var checks = $('.infoSpecs input[type="checkbox"]');

            $.each( checks, function(){
				if(featureItems == this.value){
                    $(this).parent("div").addClass("ez-checked");
                    this.checked = true;
                }
                if(compatibleProduct.indexOf("," + this.value + ",") != -1){
                    $(this).parent("div").addClass("ez-checked");
                    this.checked = true;
                }
            });

            $(".title").click(function(event) {
				$(this).next(".slide").slideToggle(200);

				if ($(this).parent().hasClass('active') != true) {
					$(this).parent().addClass('active');
				} else {
					$(this).parent().removeClass('active');
				}
			});
			
			$("a.btnCompare").fancybox({
				'padding' : 0,
				'autoScale' : false,
				'transitionIn' : 'none',
				'transitionOut' : 'none'
			});
			
			
			
			$("#accessoriesTabAjax").css('visibility', 'visible');
			$("#tab_1").css('visibility', 'visible');
			var gsaFeedFlag = false;
			if(gsaEcommLocaleMap!=null || gsaEcommLocaleMap!=undefined ){
				for (var i = 0; i < gsaEcommLocaleMap.gsaEcommLocalesList.length; i++) {							
					if (gsaEcommLocaleMap.gsaEcommLocalesList[i].ecommLocale == accessories_ecommLocale){								
						gsaFeedFlag = true;
						break;
					}
				}
			}
			if(gsaFeedFlag){
				var drids="";
				$("div.prodInfo").each(function(i){
					var $this=$(this);

					var drid = $this.data("drid");
					if(drid!=null && drid!=""){
						drids += drid+"|";
					}
					
				});
				
				if(drids.lastIndexOf("|")!=-1){
					drids = drids.substring(0, drids.length-1);
				}
				var PriceText=$("#PriceText").val();
				var DR_preorder = $("#DR_preorder").val();
				var DR_instock = $("#DR_instock").val();
				var DR_outofstock = $("#DR_outofstock").val();
				var DR_backorder = $("#DR_backorder").val();
				var SG_preorder = $("#SG_preorder").val();
				var SG_instock = $("#SG_instock").val();
				var SG_outofstock = $("#SG_outofstock").val();
				var SG_backorder = $("#SG_backorder").val();
				var AddToCartText = $("#addToCartText").val(); 
				var btnAddToCartClass = "btnOrangeMiddle btn-bs btn-bs-sec btn-bs-sm";
				var btnAddToCartClassDisabled = "btnGreyMd btn-bs btn-bs-ter btn-bs-sm";
				$.ajax({
					type : "POST",
					url : "/ww/jsp/accessories/refreshPrice.jsp",
					cache : false,
					data : {'drids':drids,'ecommlocale':accessories_ecommLocale},
					dataType:"json",
					success : function(msg) {
						$.each(msg,function(k,v){
						    $.each(v,function(m,n){
						    	var discounted = n.discounted;
								  var unitprice = n.unitprice;
								  var discountPrice = n.discountPrice;
								  var productid=n.productid;	
								  var stockstatus=n.stockstatus;
								  var preorderable = n.preorderable;
								  if(stockstatus!=null || stockstatus!=undefined){
								  	  stockstatus = stockstatus.toLowerCase();
								  }
							      var $div = $("div.prodInfo[data-drid='"+productid+"']");
							      var backorder =$div.data("backorder");
							      var $oldPrice = $div.find("fieldset.cartForm.cartForm-us > p.oldPrice");
							      var $strongPrice = $div.find("fieldset.cartForm.cartForm-us > strong.price");
							      var $statusText = $div.find("fieldset.cartForm.cartForm-us > p.stockStatusText");
							      var $ahref = $div.find("fieldset.cartForm.cartForm-us > a");
							      var btnAddToCartAction = ""; 		
						    	  if(discounted && (unitprice!=null ||unitprice!=undefined) ){
						    		  $oldPrice.html(PriceText+": "+unitprice);
						    	  }else{
						    		  $oldPrice.empty();
						    	  }
						    	  $strongPrice.html(PriceText+": "+discountPrice);
						    	  if(stockstatus == "product_inventory_in_stock" && preorderable){
						    		  $statusText.html(SG_preorder);
						    		  btnAddToCartAction = "javascript:addToCart('"+productid+"');"; 								  
									  $ahref.addClass(btnAddToCartClass).attr("href",btnAddToCartAction).html("<span>"+AddToCartText+"</span>");					    		  
						    	  }else if(stockstatus == "product_inventory_in_stock"){
						    		  $statusText.html(DR_instock);
						    		  btnAddToCartAction = "javascript:addToCart('"+productid+"');"; 								  
									  $ahref.addClass(btnAddToCartClass).attr("href",btnAddToCartAction).html("<span>"+AddToCartText+"</span>");
						    	  }else if(backorder && (stockstatus == "product_inventory_out_of_stock" || stockstatus == "product_inventory_backordered")){
						    		  $statusText.html(SG_backorder);
						    		  btnAddToCartAction = "javascript:addToCart('"+productid+"');"; 								  
									  $ahref.addClass(btnAddToCartClass).attr("href",btnAddToCartAction).html("<span>"+AddToCartText+"</span>");
						    	  }else if(stockstatus == "product_inventory_out_of_stock" || stockstatus == "product_inventory_backordered"){
						    		  $statusText.html(SG_outofstock);
						    		  btnAddToCartAction = "javascript:void(0);"; 								  
									  $ahref.addClass(btnAddToCartClassDisabled).attr("href",btnAddToCartAction).html("<span>"+AddToCartText+"</span>");
						    	  }
						      
						    });
						});
						
						
					}
				});
			}else{
				createResellerLinks();
			}
			
		}
	});

}

function createResellerLinks() {
	var RGID = getRGID(rcLocaleJS, 'embed');
	$('.ciModelNumber').each(function(index) { 
		var sku = $(this).text();
		$.getScript("http://seagate.links.channelintelligence.com/scripts/cii_CBL_DataService.asp?sSKU=" + sku + "&nRGID=" + RGID, function() { 
			var ciButtonScript = "cii_ShowCBLButton('" + sku + "', oCIIPrimaryLink, oCIIAlternateLink, " + index + ", '" + RGID + "', CI_LinkID);";
			var ciButtonScriptOutput = eval(ciButtonScript);
			// If button is returned, build our own HTML for it
			if (ciButtonScriptOutput.length > 0) {
				var ciButtonHTML = "";
				for (var i = 0; i < 3; i++) {
					if (i === 2) {
						ciButtonScriptOutput[i] = ciButtonScriptOutput[i].replace('>',' class="btnOrangeMiddle">');
					}
					ciButtonHTML += ciButtonScriptOutput[i];
				}
				ciButtonHTML += "<span>" + labels.buy_now + "</span></a>";
				$('.ciModelNumber:contains('+sku+')').parents('.cartForm').find('.ciButton').html(ciButtonHTML);		
			}
		});
	});
}

function getRGID(locale, type) {
/*
 * This function returns the RGID (Channel Intelligence code) for the
 * locale that is passed. Assumes locale is in "en-us" format. It
 * requires the ciLocaleMap global variable (which stores the codes) to
 * exist. If no locale is passed it returns null.
 */
if(!locale) {
	return null;
} else {
	for (var i = 0; i < ciLocaleMap.locales.length; i++) {
		if(typeof (ciLocaleMap.locales[i]) != 'undefined'  && ciLocaleMap.locales[i].name.indexOf(locale) != -1){
		     if(type.indexOf('xml')!= -1){
				return ciLocaleMap.locales[i].xml;	
			}else if (type.indexOf('embed')!= -1){	
			     	return ciLocaleMap.locales[i].embed;	
			     }else{
			     	return null;
			     }	
			}
		}
	}
}

function normalizeStockStatus(stockStatus, backorderable1) {
	if (!stockStatus)
		return '';
	if (stockStatus.toLowerCase() == 'pre stock') {
		return 'preorder';
	}
	if (stockStatus.toLowerCase() == 'in stock') {
		return 'instock';
	}
	if (stockStatus.toLowerCase() == 'out of stock' && backorderable1) {
		return 'backorder';
	}
	if (stockStatus.toLowerCase() == 'out of stock') {
		return 'outofstock';
	}
}
function getBuyTextFromStockStatus(stockStatus) {
	switch (stockStatus) {
	case 'preorder':
		return $('#preorder').val();
	case 'instock':
		return $('#instock').val();
	case 'backorder':
		return $('#backorder').val();
	case 'outofstock':
		return $('#outofstock').val();
	}
	return '';
}
// handle json string and display on page
function putProductInfo(ProductInfo) {
	var ProductID = ProductInfo.productID;
	if (ProductID == 0 || ProductID == null || ProductID == undefined) {
		var $pc = $('#pdiv' + ProductID);
		var quantityDiv = '#quantity' + ProductID;
	} else {
		var $pc = $('#pdiv' + ProductID);
		var quantityDiv = '#quantity' + ProductID;
	}
	var Price = $('#price').val();
	var modeltext = $pc.find('fieldset.cartForm').find('#modelnumbertext')
			.html();
	if (typeof (ProductInfo.error) == "undefined") {
		var estatus = document.getElementById('eflag'
				+ $pc.find('fieldset.cartForm').find('#modelnumbertext > span')
						.html()).value;
		var stockStatus = normalizeStockStatus(ProductInfo.stockStatus, estatus);
		var buttonText = getBuyTextFromStockStatus(stockStatus);
		if ($pc.length > 0) {
			var price = ProductInfo.price;
			var tmp = $pc.find('fieldset.cartForm').html();
			if (price.discounted) {
				$pc.find('fieldset.cartForm').html(
						'<p class="oldPrice">' + Price + ':' + price.unitPrice
								+ '</p><strong class="price">' + Price + ':'
								+ price.unitPriceWithDiscount + '</strong>'
								+ tmp);
			} else {
				$pc.find('fieldset.cartForm').html(
						'<strong class="price">' + Price + ':'
								+ price.unitPriceWithDiscount + '</strong>'
								+ tmp);
			}
			$pc.find('#stockStat').html(ProductInfo.stockStatus);
			if (buttonText) {
				$pc.find('a.btnAddCart').attr('href',
						'javascript: addToCart(' + ProductID + ');').html(
						buttonText);
				if (stockStatus == 'outofstock') {
					$pc.find('a.btnAddCart').attr('href',
							'javascript: viod(0);').html(buttonText);
					$pc.find('a.btnAddCart').addClass('btnGreySm');
					$pc.find('a.btnAddCart').removeClass('btnOrangeMiddle');
					$pc.find('a.btnAddCart').removeClass('btnAddCart');
				} else {
					$pc.find('a.btnAddCart').attr('href',
							'javascript: addToCart(' + ProductID + ');').html(
							buttonText);
				}
			} else {
				$pc.find('fieldset.cartForm').html(modeltext);
			}
		}
	} else {
		var stockStatus = $('#outofstock').val();
		var buttonText = getBuyTextFromStockStatus('outofstock');
		var tmp = $pc.find('fieldset.cartForm').html();
		$pc.find('fieldset.cartForm').html(
				'<strong class="price">' + Price + ':$0.00</strong>' + tmp);
		$pc.find('#stockStat').html(stockStatus);
		$pc.find('a.btnAddCart').attr('href', 'javascript: viod(0);').html(
				buttonText);
		$pc.find('a.btnAddCart').addClass('btnGreySm');
		$pc.find('a.btnAddCart').removeClass('btnOrangeMiddle');
		$pc.find('a.btnAddCart').removeClass('btnAddCart');
		$pc.find(quantityDiv).attr('disabled', 'disabled');
		$pc.find(quantityDiv).val('0');
	}
	$("a.btnCompare").fancybox({
		'padding' : 0,
		'autoScale' : false,
		'transitionIn' : 'none',
		'transitionOut' : 'none'
	});
	$("#accessoriesTabAjax").css('visibility', 'visible');
}

var accessories_dr_locale ="";
var accessories_currentPid ="";
var accessories_ecomm_currency="";
var accessories_ecommLocale = "";
accessories_ecommLocale = getCookie('ecommLocaleCookie');
if(ecommLocaleMap!=null || ecommLocaleMap!=undefined){
	for (var i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == accessories_ecommLocale){
			accessories_dr_locale = ecommLocaleMap.ecommLocalesList[i].drLocale;
			accessories_ecomm_currency = ecommLocaleMap.ecommLocalesList[i].currency;
			break;
		}
	}
}

function addToCart(drid) {
	var addToCartUrl = 'http://shop.seagate.com/store/sgateus/' + accessories_dr_locale + '/buy/productID.' + drid + '/quantity.1/Currency.' + accessories_ecomm_currency;
	document.location = addToCartUrl;
}
var ProductInfoSelector_Accessories = {
	setupPricingInfo : function() {
		var DR_productInfo_URL_Accessories = "https://shop.seagate.com/store/sgateus/"
				+ locale
				+ "/DisplayDRProductInfoJSPage/content.price+buyLink+name+thumbnail+image+stockStatus+longDescription/output.json/jsonp.ProductInfoSelector_Accessories.savePricingInfo/esiCaching.off"
				+ document.getElementById("DRProductId").value;
		jQuery.getScript(DR_productInfo_URL_Accessories);
	},
	savePricingInfo : function(product_arg) {
		var modelLen = $('#modelNumber').val().split('|');
		if (product_arg.length > 1) {
			for ( var i = 0; i < modelLen.length - 1; i++) {
				if (product_arg[i] == undefined) {
					var ProductInfo = JSON
							.parse('{"productID":0,"error":{"exception":"CAT_000004","#text":"The details for this product are currently unavailable. Please accept our apologies for this inconvenience."}}');
				} else {
					var ProductInfo = product_arg[i];
				}
				putProductInfo(ProductInfo);
			}
		} else {
			putProductInfo(product_arg);
		}
	}
};

function getInMeta() {
	var queryInmeta = '';
	for ( var i = 0; i < initMetaAttr.length; i++) {
		var attr = initMetaAttr[i];
		var attrValues = document.getElementsByName(attr);
		for ( var j = 0; j < attrValues.length; j++) {
			if (attrValues[j].checked) {
				queryInmeta += attrValues[j].value + "%20OR%20";
			}
		}
	}
	if (queryInmeta.length > 0) {
		queryInmeta = queryInmeta.substring(0, (queryInmeta.length - 8));
	}
	return queryInmeta;
}
var initMetaAttr = new Array();
function initMetaAttribute(attr) {
	initMetaAttr.push(attr);
}
function initiateDynamicNavigation() {
	var attribute = document.getElementById("attribute").value;
	var attributeVal = document.getElementById("attributeVal").value;
	var array = attributeVal.split('|');
	for ( var i = 0; i < array.length; i++) {
		var passedAttrVal = replaceAll(array[i], " ", "%20");
		var attrValues = document.getElementsByName(attribute);
		for ( var j = 0; j < attrValues.length; j++) {
			if (attrValues[j].value == ('inmeta:' + attribute + '%20' + passedAttrVal)) {
				attrValues[j].checked = true;
			}
		}
	}
}
function replaceAll(Source, stringToFind, stringToReplace) {
	var temp = Source;
	var index = temp.indexOf(stringToFind);
	while (index != -1) {
		temp = temp.replace(stringToFind, stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
}
$(document).ready(
		function() {

			$('.infoSpecs input[type="checkbox"]').ezMark();
			$(".title").click(function(event) {
				$(this).next(".slide").slideToggle(200);

				if ($(this).parent().hasClass('active') != true) {
					$(this).parent().addClass('active');
				} else {
					$(this).parent().removeClass('active');
				}
			});

			var prodItems = getProdItemsFromHead();
			var modelNumberItems = getModelNumberFromHead();
			makeAsynCall("&startParamAll=0&pageSize=" + pageSize
					+ "&q=*&metaString=(asscategory:" + category + ")"
					+ (prodItems.length == 0 ? "" : ".") + prodItems
					+ (modelNumberItems.length == 0 ? "" : ".")
					+ modelNumberItems);

		});
function nextpage(nextpagenum) {
	document.getElementById("curpagenum").value = nextpagenum;
	document.frmAccessories.submit();
}