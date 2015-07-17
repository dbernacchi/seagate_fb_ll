/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:31
 */
 var init_load=0;
 var cp_first_click=0;
 var init_loading=0;
 var load_flag=false;
 var compare_now_click=false;
$(document).ready(function() {

    //initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');

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
	

	$(".title").click(function(event) {
		$(this).next(".slide").slideToggle(200);

		if($(this).parent().hasClass('active') != true){
			$(this).parent().addClass('active');}
		else{
			$(this).parent().removeClass('active');
		}
	});
	
});

function initScript() {
	addClass({
		tagName:'a',
		tagClass:'btnCloseProduct',
		classAdd:'empty',
		addToParent:true
	})
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
							removeProduct(this.parentNode.id);
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
//below are product finder js
		
		$("#searchURL").attr("value",basicSearch+"&start=0");
		function validateCheckBox(){
			
			var basicSearchURL=gsaServer+gsaPrefixUrl;
			var searchURL="";
			var hasCagegoryOrInterface=false;
			var subcategoryHidden = buildGsaLinks("SUBCATEGORY_KEY");
			var capacityHidden = buildGsaLinks("CAPACITY_KEY");
			var interfaceHidden = buildGsaLinks("INTERFACE_KEY");
			var spinHidden = buildGsaLinks("SPIN_KEY");
			var formfactorHidden = buildGsaLinks("FORMFACTOR_KEY");

			subcategoryHidden = getRequestFieldsParam(subcategoryHidden,"SUBCATEGORY_KEY");
			
			interfaceHidden = getRequestFieldsParam(interfaceHidden,"INTERFACE_KEY");
			capacityHidden = getInMetaParam(capacityHidden,"CAPACITY_KEY");
			spinHidden = getInMetaParam(spinHidden,"SPIN_KEY");
			formfactorHidden = getInMetaParam(formfactorHidden,"FORMFACTOR_KEY");
			
			if(subcategoryHidden!=""){
				searchURL = searchURL + subcategoryHidden +".";
				hasCagegoryOrInterface=true;
			}
			if(interfaceHidden!=""){
				searchURL = searchURL + interfaceHidden +".";
				hasCagegoryOrInterface=true;
			}
			searchURL =  searchURL.substring(0,searchURL.lastIndexOf(".")) + "&q=*+";

			if(capacityHidden!=""){
				searchURL = searchURL + capacityHidden +"+";
			}
			if(spinHidden!=""){
				searchURL = searchURL + spinHidden +"+";
			}
			if(formfactorHidden!=""){
				searchURL = searchURL + formfactorHidden +"+";
			}
			searchURL =  searchURL.substring(0,searchURL.lastIndexOf("+"));
			if(hasCagegoryOrInterface==true){
			    basicSearchURL = basicSearchURL +"."+searchURL;
			}else{
			    basicSearchURL = basicSearchURL+ searchURL;
			}
			
			
			$("#searchURL").attr("value",basicSearchURL+"&start=0");
			
			
			
		}
		function getInMetaParam(value,name){
			var requestFields="";
			if(jQuery.trim(value)=="" || name == ""){
				return requestFields;
			}
			var hiddenObjArray =  value.split("||");
			var hiddenObjArrayLength=hiddenObjArray.length;
			var paramName = "";
			if(name=="CAPACITY_KEY"){
				paramName ="capacity";
				
			}else if(name=="SPIN_KEY"){
				paramName ="spinspeed";
				
			}else if(name=="FORMFACTOR_KEY"){
				paramName ="formfactor";
				
			}
			
			for(var i=0;i<hiddenObjArrayLength;i++){
				var hiddenObjValue=hiddenObjArray[i];
				if(paramName =="formfactor"|| paramName=="spinspeed"){
    			    hiddenObjValue= encoding(hiddenObjValue);
    			    requestFields = requestFields+ "inmeta:"+paramName+"="+hiddenObjValue+"+";
    			}else{
    			    requestFields = requestFields+ "inmeta:"+paramName+":"+hiddenObjValue+"+";
    			}
				
			}
			requestFields = jQuery.trim(requestFields);
			requestFields =  requestFields.substring(0,requestFields.lastIndexOf("+"));
			
			return requestFields;
		}
		function getRequestFieldsParam(value,name){
			var requestFields="";
			if(jQuery.trim(value)=="" || name==""){
				return requestFields;
			}
			
			var hiddenObjArray =  value.split("||");
			var hiddenObjArrayLength=hiddenObjArray.length;
			var paramName = "";
		    if(name=="SUBCATEGORY_KEY"){
				paramName ="subcategory";
			}else if(name=="INTERFACE_KEY"){
				paramName ="interfaceTech";
			}
			for(var i=0;i<hiddenObjArrayLength;i++){
				var hiddenObjValue=hiddenObjArray[i];
				requestFields = requestFields+ paramName+":"+encoding(hiddenObjValue)+ "|";
				
				
			}
			
			requestFields = jQuery.trim(requestFields);
			requestFields =  requestFields.substring(0,requestFields.lastIndexOf("|"));
			requestFields = "("+requestFields+")";
			return requestFields;
		}


		function buildGsaLinks(name){
			var hiddenObj=$("#"+name);
			var hiddenObjVal="";
			if(jQuery.trim(hiddenObj.attr("value"))!=""){
				hiddenObjVal=hiddenObj.attr("value");
			}
			return hiddenObjVal;
		}

		function lookForCheckedCheckBox(name){
			var count=0;
			$("input[name='"+name+"']").each(function(){
			    if($(this).attr("checked")=="checked"){
			        count++;
			    }
			});
			return count;
		}
		
		/*
		 * bindOnChangeEvent is used as the onChange event for checkbox. First param name is the name attriubte
		 * for the checkbox, also is the id attribute of a hidden element on the page. Second param obj is the
		 * current checkbox which trigger the onChange event.
		 * CAPACITY_KEY
		 * SUBCATEGORY_KEY
		 * INTERFACE_KEY
		 * SPIN_KEY
		 * FORMFACTOR_KEY
		 * */
		function bindOnChangeEvent(name,obj){
			
			var count=lookForCheckedCheckBox(name);			
			var parentObj =  $(obj).parent("div");
			var value = $(obj).attr("value");
			var checked = $(obj).attr("checked");
			var key_value=$("#"+name).attr("value");
			
			//if it is to select the checkbox
			if(checked=="checked"){
			    if(name=="CAPACITY_KEY" || name=="SPIN_KEY" || name=="FORMFACTOR_KEY"){
					if(count>1){
						alert("Multi-select for "+name+" is not supported");
						$(obj).parent("div").removeClass("ez-checked");
						$(obj).attr("checked",false);
						return;
					}
				}
				//if this checkbox has not been selected before, set the value of current object to corresponding hidden element
				if(key_value.indexOf(value)==-1){
				    //if there is no value in corresponding hidden element , add current value of checkbox to hidden element value
				    //if there alreay has value in corresponding hidden element, append current value of checkbox to hidden element
				    if(jQuery.trim(key_value)==""){
						key_value = value + "||";
						//remove the last "||"
						key_value =  key_value.substring(0,key_value.lastIndexOf("||"));
						// set the value to hidden element
						$("#"+name).attr("value",key_value);
					}else{
					    // append current value of check to hidden element
						key_value = key_value+ "||" + value + "||";
						// remove the last "||"
						key_value =  key_value.substring(0,key_value.lastIndexOf("||"));
						// set the value to hidden element
						$("#"+name).attr("value",key_value);
					}
				}
				setSessionStorage("session_"+name,$.trim(key_value));
				
			}else{
			    
			    if(key_value.indexOf(value)!=-1){
			        var key_value_array=key_value.split("||");
			        key_value="";
			        for(var i=0;i<key_value_array.length;i++){
			            if(key_value_array[i]!=value){
			                key_value= key_value+key_value_array[i]+"||";
			            }
			        }
			        key_value =  key_value.substring(0,key_value.lastIndexOf("||"));
			        
			        $("#"+name).attr("value",key_value);
			    }
				removeSessionStorageByName("session_"+name);
			    
			    
			}
															
			validateCheckBox();
			getData();
			
			 
		}

        function replaceSpaceToEmpty(source){
            var target=source;
            return target.replace(/\s+/g,"");
        }
        
        
		function resetFilter(name){
			$("input[name='"+name+"']").each(function(){
				var parentObj =  $(this).parent("div");
				if(parentObj.hasClass("ez-checked")){
					$(this).parent("div").removeClass("ez-checked");
					$(this).attr("checked",false);
				}
			});
			$("#"+name).attr("value","");
			
		}
		function resetFilters(){
			resetFilter("SUBCATEGORY_KEY");
			resetFilter("CAPACITY_KEY");
			resetFilter("INTERFACE_KEY");
			resetFilter("SPIN_KEY");
			resetFilter("FORMFACTOR_KEY");
			$("#searchURL").attr("value",basicSearch+"&start=0");
			removeSessionStorage();
		}
		function bindClickResetFilterButton(){
			$("#resetfilter").click(function(event){
				event.preventDefault();
				resetFilters();
				getData();
			});
		}
		
		function replaceWith(source){
			return source.replace(/\//g,"").replace(/\:/g,"").replace(/\?/g,"").replace(/\-/g,"").replace(/\=/g,"").replace(/\./g,"");
		}
        function encoding(source){
        	var target=source;
        	target=encodeURI(target);
        	target=encodeURI(target);
        	target=target.replace(/\!/g,"%2521");
        	target=target.replace(/\#/g,"%2523");
        	target=target.replace(/\\$/g,"%2524");
        	target=target.replace(/\&/g,"%2526");
        	target=target.replace(/\'/g,"%2527");
        	target=target.replace(/\(/g,"%2528");
        	target=target.replace(/\)/g,"%2529");
        	target=target.replace(/\*/g,"%252B");
        	target=target.replace(/\+/g,"%252B");
        	target=target.replace(/\,/g,"%252C");
        	target=target.replace(/\-/g,"%252D");
        	target=target.replace(/\./g,"%252E");
        	target=target.replace(/\//g,"%252F");
        	target=target.replace(/\:/g,"%253A");
        	target=target.replace(/\;/g,"%253B");
        	target=target.replace(/\=/g,"%253D");
        	target=target.replace(/\?/g,"%253F");
        	target=target.replace(/\@/g,"%2540");
        	target=target.replace(/\_/g,"%255F");
        	target=target.replace(/\~/g,"%257E");
        	return target;
        	
        }
		function getData(){
			
			var searchUrl=$("#searchURL").attr("value");
			var product_finder_searching_text="";
			if($("#product_finder_searching_text")[0]){
			    product_finder_searching_text=$("#product_finder_searching_text").attr("value");
			}else{
			    product_finder_searching_text="Searching......Please wait......";
			}

			$("#tab_1").html(product_finder_searching_text);
            var hashSKU=document.location.hash;
			var skuArray;
			if(hashSKU.indexOf("#")!=-1){
				hashSKU=hashSKU.substring(1,hashSKU.length);
				//sessionStorage.session_selectedSKU=hashSKU;
			}
			if(sessionStorage.session_selectedSKU!=undefined){
				hashSKU=sessionStorage.session_selectedSKU;
			}
			var vcmIDs = "";
			if(sessionStorage.session_selectedVCMID!=undefined){
				vcmIDs=sessionStorage.session_selectedVCMID;
			}
			var skuVCMIDs = "";
			if(sessionStorage.session_selectedSKUVCMID!=undefined){
				skuVCMIDs=sessionStorage.session_selectedSKUVCMID;
			}
			var session_CAPACITY_KEY=sessionStorage.session_CAPACITY_KEY;
			if(session_CAPACITY_KEY==undefined){
				session_CAPACITY_KEY="";
			}
			var session_SUBCATEGORY_KEY=sessionStorage.session_SUBCATEGORY_KEY;
			if(session_SUBCATEGORY_KEY==undefined){
				session_SUBCATEGORY_KEY="";
			}
			var session_INTERFACE_KEY=sessionStorage.session_INTERFACE_KEY;
			if(session_INTERFACE_KEY==undefined){
				session_INTERFACE_KEY="";
			}
			var session_SPIN_KEY=sessionStorage.session_SPIN_KEY;
			if(session_SPIN_KEY==undefined){
				session_SPIN_KEY="";
			}
			var session_FORMFACTOR_KEY=sessionStorage.session_FORMFACTOR_KEY;
			if(session_FORMFACTOR_KEY==undefined){
				session_FORMFACTOR_KEY="";
			}
			
			$.ajax({
				type: "POST",
				url: "/ww/jsp/productfinder/productfindersearchajax.jsp?"+searchUrl,
				cache: false,
				data: { hashSku: hashSKU, sessionCAPACITY_KEY:session_CAPACITY_KEY, sessionSUBCATEGORY_KEY:session_SUBCATEGORY_KEY,sessionINTERFACE_KEY:session_INTERFACE_KEY,sessionSPIN_KEY:session_SPIN_KEY,sessionFORMFACTOR_KEY:session_FORMFACTOR_KEY,vcmIDs:vcmIDs,skuVCMIDs:skuVCMIDs},
				success: function(msg){	
				
					var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
					msg = msg.replace(expr, '><');
					$("#tab_1").html(msg);
					
					$('.pictHold input').ezMark();
					$('input.check').ezMark();
					
					$(".page-nav").find("a").click(function(event){
						event.preventDefault();
					});
					$(".title").click(function(event) {
						$(this).next(".slide").slideToggle(200);

						if($(this).parent().hasClass('active') != true){
							$(this).parent().addClass('active');}
						else{
							$(this).parent().removeClass('active');
						}
					});
					
					reCheckBox("SUBCATEGORY_KEY");
					reCheckBox("CAPACITY_KEY");
					reCheckBox("INTERFACE_KEY");
					reCheckBox("SPIN_KEY");
					reCheckBox("FORMFACTOR_KEY");
					bindClickResetFilterButton();
					disableEnableCompareNowButton();
					$("a.btnCompare").fancybox({
							   'padding' : 0,
							   'autoScale' : false,
							   'transitionIn' : 'none',
							   'transitionOut' : 'none'
					});
					loadSessionStorage();
					
					sessionStorage.prod_link_detail="0";
					sessionStorage.prod_nav="";
					sessionStorage.prod_grid="";
					sessionStorage.prod_comparion="";
					createResellerLinks();
					doubleCheckCheckBox();
					
				},
				error: function(request,status){
					$("#tab_1").html("ERROR..."+request+status);
				}
				
			});
		}

		function doubleCheckCheckBox(){
			var selectedSKU = $("#selectedSKU").text();
			selectedSKU=$.trim(selectedSKU);
			var selectedVCMID = $("#selectedVCMID").text();
			selectedVCMID=$.trim(selectedVCMID);
			var selectedSKUVCMID = $("#selectedSKUVCMID").text();
			selectedSKUVCMID=$.trim(selectedSKUVCMID);
			var selectedURLs = $("#selectedURLs").text();
			selectedURLs=$.trim(selectedURLs);
			var selectedSKUArray = selectedSKU.split(",");
			var selectedVCMIDArray = selectedVCMID.split(",");
			var selectedSKUVCMIDArray = selectedSKUVCMID.split(",");
			var selectedURLsArray = selectedURLs.split(",");
			var $divcompareCheckbox = $("div.compareCheckbox.clearfix > div.ez-checkbox > input[type=checkbox][checked]");
			
			$.each($divcompareCheckbox,function(index){
				$this = $(this);
				var id=$this.attr("id");
				var isFoundSku = false;
				var parent_div=$this.parent("div");
				for(var i=0;i<selectedSKUArray.length;i++){
					var sku=selectedSKUArray[i];
					var vcmid=selectedVCMIDArray[i];
					var skuvcmid=selectedSKUVCMIDArray[i];
					var url=selectedURLsArray[i];
					sku=$.trim(sku);
					vcmid=$.trim(vcmid);
					skuvcmid=$.trim(skuvcmid);
					url=$.trim(url);
					url=replaceWith(url);
					var skuVcmIdCombine = combineSkuVcmId(sku, vcmid,skuvcmid,url);
					var skuVcmIdCombineCheckbox_ID="#checkbox_"+skuVcmIdCombine;
					var checkBoxId="#"+id;
					var checkbox_=$("#checkbox_"+skuVcmIdCombine);
					var checkbox_checked=checkbox_.attr("checked");					
					if(skuVcmIdCombineCheckbox_ID==checkBoxId){
						isFoundSku= true;						
					}					
				}				
				if(isFoundSku){
					parent_div.addClass("ez-checked");
				}else{
					parent_div.removeClass("ez-checked");
				}
				
			});
			
			
		}
		function paginationSearch(gsaUrl){
			
			var searchUrl= gsaServer+gsaUrl;
			var ar=gsaUrl.split("&start=");
			if(ar[1]==undefined){
				ar[1]="all";
			}
			setSessionStorage("session_pages",ar[1]);
			$("#searchURL").attr("value",searchUrl);
			
			getData();
			
		}
		
		function reCheckBox(name){
		    var key=$("#"+name).attr("value");
		    
		    if(key!=null){
		        var arr= key.split("||");
		        if(arr!=null){
		            for(var i=0;i<arr.length;i++){
		                var value=arr[i];
		                compareCheckBoxValue(name,value);
		            }
		        }
		    }
		    
		    
		}
		function compareCheckBoxValue(name, value){
		    $("input[name='"+name+"']").each(function(){
				var objValue =  $(this).attr("value");
				if(objValue!=null && value!=null && objValue == value){
					$(this).parent("div").addClass("ez-checked");
					$(this).attr("checked",true);
				}
			});
		}

		
$(document).ready(function(){
	
	if(isProductFinderSearchResults){
		if(sessionStorage.prod_link_detail!=undefined && sessionStorage.prod_link_detail=="1"){	
			if(sessionStorage.prod_comparion!=undefined && sessionStorage.prod_comparion!=""){
				$(".tabContentComparison").html(sessionStorage.prod_comparion);
				$(".tabContentComparison").show();
			}
			if(sessionStorage.prod_nav!=undefined && sessionStorage.prod_nav!=""){
				$(".mainSubNavCateg.clearfix").hide();
				$(".mainSubNavCateg.clearfix").html(sessionStorage.prod_nav);	
			}
			if(sessionStorage.prod_grid!=undefined && sessionStorage.prod_grid!=""){
				$("#tab_1").hide();
				$("#tab_1").html(sessionStorage.prod_grid);	
			}
			
			sessionStorage.prod_link_detail="0";
			sessionStorage.prod_nav="";
			sessionStorage.prod_grid="";
			sessionStorage.prod_comparion="";

			load_flag=true;
			$("a.btnCompare").fancybox({
			   'padding' : 0,
			   'autoScale' : false,
			   'transitionIn' : 'none',
			   'transitionOut' : 'none'
			});
          	$('.btnDifferent').click(forDifferent);
			$('.btnSame').click(forSame);
			$('.prod_detail_link').click(bindProdLinkDetail);
			$('.btnCloseProduct.tdtd').click(btnCloseProductClick);
			if (window.addthis) {
				window.addthis = null;
			}
			if($("#at20mc")!=null){
				$("#at20mc").remove();
			}
			var tempaddthis="<li class=\"btnPrint\"><a id=\"btn-overview-print\" href=\"JavaScript:window.print();\" title='Print'>Print</a></li>";
tempaddthis=tempaddthis+"<li class=\"btnMail\"><a id=\"btn-overview-mail\" class=\"addthis_button_email at300b\" href=\"#\" title='Mail'>Mail</a></li>";
tempaddthis=tempaddthis+"<li class=\"btnShare\"><a id=\"btn-overview-share\" class=\"addthis_button_compact at300m\" href=\"#\">Share</a></li>";
tempaddthis=tempaddthis+"<li class=\"btnLike\"><a id=\"btn-overview-like\" class=\"addthis_button_facebook_like at300b\" fb:like:layout=\"button_count\" href=\"#\" title='Like'></a></li>";
			$("ul.socList.clearfix.ddthis_toolbox.addthis_default_style").html(tempaddthis);
			$.getScript("http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-4dc164cc63a08feb", function() {
					addthis.init();
					addthis.toolbox("#socList");
			});
			}else{	
								
				if(sessionStorage.session_SUBCATEGORY_KEY!=undefined){
					sessionStorage.session_SUBCATEGORY_KEY ="";
				}
				if(sessionStorage.session_INTERFACE_KEY!=undefined){
					sessionStorage.session_INTERFACE_KEY ="";
				}
				if(sessionStorage.session_SPIN_KEY!=undefined){
					sessionStorage.session_SPIN_KEY ="";
				}
				if(sessionStorage.session_CAPACITY_KEY!=undefined){
					sessionStorage.session_CAPACITY_KEY ="";
				}
				if(sessionStorage.session_FORMFACTOR_KEY!=undefined){
					sessionStorage.session_FORMFACTOR_KEY ="";
				}
				if(sessionStorage.session_pages!=undefined){
					sessionStorage.session_pages ="";
				}
					
				if(sessionStorage.session_selectedSKU!=undefined){
					sessionStorage.session_selectedSKU="";
				}
				if(sessionStorage.session_selectedVCMID!=undefined){
					sessionStorage.session_selectedVCMID="";
				}

				if(sessionStorage.session_selectedSKUVCMID!=undefined){
					sessionStorage.session_selectedSKUVCMID="";
				}
				
				$("#SUBCATEGORY_KEY").attr("value","");
				$("#CAPACITY_KEY").attr("value","");
				$("#INTERFACE_KEY").attr("value","");
				$("#SPIN_KEY").attr("value","");
				$("#FORMFACTOR_KEY").attr("value","");
	
				getData();
		}
		
	}
	
	
});

$(document).ready(function(){
    var url_address= location.href;
	
	$(window).hashchange(function(){
		var hash = document.location.hash;
		if(url_address.indexOf("/product-finder/")!=-1){
			var session_selectSKU_val="";
			if(sessionStorage.session_selectedSKU!=undefined && sessionStorage.session_selectedSKU!=""){
				session_selectSKU_val="#"+sessionStorage.session_selectedSKU;
			}
			if(session_selectSKU_val==hash){
				return false;
			}
			if(hash==""){
				if(!load_flag||!compare_now_click){
					compareNow(false);
				}
					
			}else if(hash!=cp_first_click){
				if(!load_flag||!compare_now_click){
					compareNow(false);
				}
					
			}
			
		
		}
	
  });
  
  $(window).hashchange();
  load_flag=false;
 
	
});

function combineSkuVcmId(sku, vcmid, skuVcmIdNew,url){
	return sku+"_"+vcmid+"_"+skuVcmIdNew+"_"+url;
}
function checkUnCheck(sku,name,url,image,skuVcmId,skuVcmIdNew){
	var replacedurl = replaceWith(url);
	var skuVcmIdCombine = combineSkuVcmId(sku, skuVcmId,skuVcmIdNew,replacedurl);
    var cp_table_tds = $("div.compareListHold.clearfix").find("table tbody tr td");
    var cp_table_tds_count=cp_table_tds.length;
    var isEmpty =0;
    cp_table_tds.each(function(){
		if($(this).hasClass("empty")){
		   isEmpty++;
		}
    });
	var s_v_url=$("#selectedURLs").text();
	var s_v_array_url="";
	if(s_v_url!=""){
		s_v_array_url=s_v_url.split(",");
	}
    var checkbox_=$("#checkbox_"+skuVcmIdCombine);
	var checkbox_checked=checkbox_.attr("checked");
	var parent_div=checkbox_.parent("div");
	
	

	if($.browser.mozilla && navigator.userAgent.indexOf("Trident")<0){
		if(checkbox_checked==undefined || parent_div.hasClass("ez-checked")){
			parent_div.removeClass("ez-checked");
			removeComparison(sku,skuVcmId,skuVcmIdNew,url);
		}else{
			if(isEmpty==0){
				checkbox_.removeAttr("checked");
				parent_div.removeClass("ez-checked");
				var tooltip_div=$("#tooltip_"+skuVcmIdCombine);
				tooltip_div.show();
				tooltip_div.delay(3000).fadeOut("slow");
				return false;
			}else{
				var selected_products = $("#selectedProducts").text();
				parent_div.addClass("ez-checked");
				addComparison(sku,name,url,image,skuVcmId,selected_products,skuVcmIdNew);
			}
		}
	}else{
		if((checkbox_checked==undefined &&  parent_div.hasClass("ez-checkbox"))){
			
			parent_div.removeClass("ez-checked");
			removeComparison(sku,skuVcmId,skuVcmIdNew,url);
		}else if((checkbox_checked=="checked" && parent_div.hasClass("ez-checkbox") && parent_div.hasClass("ez-checked"))){
			if(isEmpty==0){
				var s=0;
				for(var i=0;i<s_v_array_url.length;i++){
					if(url==s_v_array_url[i]){
						s=1;
					}
				}
				if(s==0){
					checkbox_.removeAttr("checked");
					parent_div.removeClass("ez-checked");
					var tooltip_div=$("#tooltip_"+skuVcmIdCombine);
					tooltip_div.show();
					tooltip_div.delay(3000).fadeOut("slow");
					return false;
				}
			}else{
				if(s_v_array_url!="" && url==s_v_array_url[s_v_array_url.length-1]){
					return false;
				}
				var selected_products = $("#selectedProducts").text();
				parent_div.addClass("ez-checked");
				addComparison(sku,name,url,image,skuVcmId,selected_products,skuVcmIdNew);
			}
		}else{
			if(isEmpty==0){
				checkbox_.removeAttr("checked");
				parent_div.removeClass("ez-checked");
				var tooltip_div=$("#tooltip_"+skuVcmIdCombine);
				tooltip_div.show();
				tooltip_div.delay(3000).fadeOut("slow");
				return false;
			}else{
				var selected_products = $("#selectedProducts").text();
				parent_div.addClass("ez-checked");
				addComparison(sku,name,url,image,skuVcmId,selected_products,skuVcmIdNew);
			}
		}
	}
	
    disableEnableCompareNowButton();
}

function addComparison(sku,name,url,image,skuVcmId,selected_products,skuVcmIdNew){
	var replaceurl = replaceWith(url);
	var skuVcmIdCombine = combineSkuVcmId(sku, skuVcmId,skuVcmIdNew,replaceurl);
	var cp_id_ahref="aComparison_"+skuVcmIdCombine;
	var selectedSKU=$("#selectedSKU").text();
	var selectedVCMID = $("#selectedVCMID").text();
	var selectedSKUVCMID = $("#selectedSKUVCMID").text();
	var selectedURLs = $("#selectedURLs").text();
	var cp_section_td="<div class=\"compareListItem\">";
	cp_section_td+="<a id='"+cp_id_ahref+"' class=\"btnCloseProduct\" href=\"javascript:removeComparison('"+sku+"','"+skuVcmId+"','"+skuVcmIdNew+"','"+url+"');\">close</a>";
	cp_section_td+="<div class=\"pict\">";
	cp_section_td+="<a href=\""+url+"\"><img src=\""+image+"\" alt=\"\" height=\"67\" width=\"67\"></a>";
	cp_section_td+="</div>";
	cp_section_td+="<div class=\"wrap clearfix\">";
	cp_section_td+="<strong><a href=\""+url+"\">"+name+"</a></strong>";
	cp_section_td+="<p>"+sku+"</p>";
	cp_section_td+="<span class='prodvcmid' style='display:none;'>"+skuVcmId+"</span>";
	cp_section_td+="<span class='skuvcmid' style='display:none;'>"+skuVcmIdNew+"</span>";
	cp_section_td+="<span class='url' style='display:none;'>"+url+"</span>";
	cp_section_td+="</div>";
	cp_section_td+="</div>";
	var cp_table_tr = $("div.compareListHold.clearfix").find("table tbody tr");
	cp_table_tr.find("td").each(function(){
		if($(this).hasClass("empty")){
		    $(this).html(cp_section_td)
		    $(this).removeClass("empty");
		    $("#selectedProducts").text(4-cp_table_tr.find("td.empty").length);
			var trimSku="";
			var trimVcmId="";
			var trimSkuVcmId="";
			var trimurl ="";
		    if($.trim(selectedSKU)=="" && $.trim(selectedVCMID)=="" && $.trim(selectedSKUVCMID)=="" && $.trim(selectedURLs)==""){
				trimSku=$.trim(sku);
				trimVcmId=$.trim(skuVcmId);
				trimSkuVcmId=$.trim(skuVcmIdNew);				
				trimurl=$.trim(url);				
		        $("#selectedSKU").text(trimSku);
		        $("#selectedVCMID").text(trimVcmId);
		        $("#selectedSKUVCMID").text(trimSkuVcmId);
		        $("#selectedURLs").text(trimurl);
		    }else{
		    	if($.trim(selectedSKU)==""){
					trimSku=$.trim(sku);
					trimVcmId=$.trim(skuVcmId);
					trimSkuVcmId=$.trim(skuVcmIdNew);
				}else {
					trimSku=$.trim(selectedSKU+","+sku);
					trimVcmId=$.trim(selectedVCMID+","+skuVcmId);
					trimSkuVcmId=$.trim(selectedSKUVCMID+","+skuVcmIdNew);
				}
				trimurl=$.trim(selectedURLs+","+url);
		        $("#selectedSKU").text(trimSku);
		        $("#selectedVCMID").text(trimVcmId);
		        $("#selectedSKUVCMID").text(trimSkuVcmId);
		        $("#selectedURLs").text(trimurl);
		    }
			setSessionStorage("session_selectedSKU",trimSku);
			setSessionStorage("session_selectedVCMID",trimVcmId);
			setSessionStorage("session_selectedSKUVCMID",trimSkuVcmId);
			
		    return false;
		}     
	});
}
function removeComparison(sku, skuVcmId,skuVcmIdNew,url){
	var replacedurl = replaceWith(url);
	var skuVcmIdCombine = combineSkuVcmId(sku, skuVcmId,skuVcmIdNew,replacedurl);
	
	var cp_id_ahref=$("#aComparison_"+skuVcmIdCombine);
	var cp_section_td=cp_id_ahref.parent("div").parent("td"); 
	
    cp_section_td.remove();
    var check_box_=$("#checkbox_"+skuVcmIdCombine);
    check_box_.removeAttr("checked");
    check_box_.parent("div").removeClass("ez-checked");
    var selectedSKU=$("#selectedSKU").text();
    selectedSKU=$.trim(selectedSKU);
    var selectedSKUArray = selectedSKU.split(",");
    selectedSKU="";
    var foundSKU=false;
	var selectedVCMID=$("#selectedVCMID").text();
	selectedVCMID=$.trim(selectedVCMID);
	var selectVCMIDArray = selectedVCMID.split(",");
	selectedVCMID="";
	var foundVCMID=false;
	var selectedSKUVCMID = $("#selectedSKUVCMID").text();
	selectedSKUVCMID=$.trim(selectedSKUVCMID);
	var selectedSKUVCMIDArray = selectedSKUVCMID.split(",");
	selectedSKUVCMID="";
	var foundSKUVCMID=false;
	var selectedURLs = $("#selectedURLs").text();
	selectedURLs=$.trim(selectedURLs);
	var selectedURLsArray = selectedURLs.split(",");
	selectedURLs="";
	var foundURLs=false;
	for(var i= 0;i<selectedURLsArray.length;i++){
		var selectedURLExp=selectedURLsArray[i].replace(/[-:?=./]/g,"");
		var urlExp=url.replace(/[-:?=./]/g,"");
		if(urlExp==selectedURLExp && !foundURLs){
			foundURLs=true;
		}else{
			selectedURLs+=selectedURLsArray[i]+",";
			selectedVCMID +=selectVCMIDArray[i]+",";
			selectedSKU+=selectedSKUArray[i]+",";
			selectedSKUVCMID+=selectedSKUVCMIDArray[i]+",";
		}
	}
	selectedVCMID=$.trim(selectedVCMID);
	if(selectedVCMID.lastIndexOf(",")!=-1){
		selectedVCMID = selectedVCMID.substring(0, selectedVCMID.length-1);
	}
	selectedSKU=$.trim(selectedSKU);
	if(selectedSKU.lastIndexOf(",")!=-1){
		selectedSKU = selectedSKU.substring(0, selectedSKU.length-1);
	}
	selectedSKUVCMID=$.trim(selectedSKUVCMID);
	if(selectedSKUVCMID.lastIndexOf(",")!=-1){
		selectedSKUVCMID = selectedSKUVCMID.substring(0, selectedSKUVCMID.length-1);
	}
	selectedURLs=$.trim(selectedURLs);
	if(selectedURLs.lastIndexOf(",")!=-1){
		selectedURLs = selectedURLs.substring(0, selectedURLs.length-1);
	}
	
	$("#selectedSKU").text(selectedSKU);
	$("#selectedVCMID").text(selectedVCMID);
	$("#selectedSKUVCMID").text(selectedSKUVCMID);
	$("#selectedURLs").text(selectedURLs);
	var s_v=$("#selectedSKU").text();
	if(s_v==""){
		$("#selectedProducts").text(0);
	}else{
		var s_v_array=s_v.split(",");
		$("#selectedProducts").text(s_v_array.length);
	}
	setSessionStorage("session_selectedSKU",selectedSKU);
	setSessionStorage("session_selectedVCMID",selectedVCMID);
	setSessionStorage("session_selectedSKUVCMID",selectedSKUVCMID);
	reorderComparison();
	disableEnableCompareNowButton();     
	
	
}
function loadSessionStorage(){
	
	$("#session_selectedSKU").text(sessionStorage.session_selectedSKU);
	$("#session_INTERFACE_KEY").text(sessionStorage.session_INTERFACE_KEY);
	$("#session_CAPACITY_KEY").text(sessionStorage.session_CAPACITY_KEY);
	$("#session_SUBCATEGORY_KEY").text(sessionStorage.session_SUBCATEGORY_KEY);
	$("#session_SPIN_KEY").text(sessionStorage.session_SPIN_KEY);
	$("#session_FORMFACTOR_KEY").text(sessionStorage.session_FORMFACTOR_KEY);
	$("#session_pages").text(sessionStorage.session_pages);
	$("#session_selectedVCMID").text(sessionStorage.session_selectedVCMID);
	$("#session_selectedSKUVCMID").text(sessionStorage.session_selectedSKUVCMID);

}
function removeSessionStorageAll(){
	$("#session_INTERFACE_KEY").text("");
	$("#session_CAPACITY_KEY").text("");
	$("#session_SUBCATEGORY_KEY").text("");
	$("#session_SPIN_KEY").text("");
	$("#session_FORMFACTOR_KEY").text("");
	$("#session_pages").text("");
	$("#session_selectedSKU").text("");
	$("#session_selectedVCMID").text("");
	$("#session_selectedSKUVCMID").text("");
	sessionStorage.session_INTERFACE_KEY="";
	sessionStorage.session_CAPACITY_KEY="";
	sessionStorage.session_SUBCATEGORY_KEY="";
	sessionStorage.session_SPIN_KEY="";
	sessionStorage.session_FORMFACTOR_KEY="";
	sessionStorage.session_pages="";
	sessionStorage.session_selectedSKU="";
	sessionStorage.session_selectedVCMID="";
	sessionStorage.session_selectedSKUVCMID="";
}
function removeSessionStorage(){
	$("#session_INTERFACE_KEY").text("");
	$("#session_CAPACITY_KEY").text("");
	$("#session_SUBCATEGORY_KEY").text("");
	$("#session_SPIN_KEY").text("");
	$("#session_FORMFACTOR_KEY").text("");
	$("#session_pages").text("");
	sessionStorage.session_INTERFACE_KEY="";
	sessionStorage.session_CAPACITY_KEY="";
	sessionStorage.session_SUBCATEGORY_KEY="";
	sessionStorage.session_SPIN_KEY="";
	sessionStorage.session_FORMFACTOR_KEY="";
	sessionStorage.session_pages="";
}

function removeSessionStorageByName(name){
	if(name=="session_INTERFACE_KEY"){
		$("#session_INTERFACE_KEY").text("");
		sessionStorage.session_INTERFACE_KEY="";
	}else if(name=="session_CAPACITY_KEY"){
		$("#session_CAPACITY_KEY").text("");
		sessionStorage.session_CAPACITY_KEY="";
	}else if(name=="session_SUBCATEGORY_KEY"){
		$("#session_SUBCATEGORY_KEY").text("");
		sessionStorage.session_SUBCATEGORY_KEY="";
	}else if(name=="session_SPIN_KEY"){
		$("#session_SPIN_KEY").text("");
		sessionStorage.session_SPIN_KEY="";
	}else if(name=="session_FORMFACTOR_KEY"){
		$("#session_FORMFACTOR_KEY").text("");
		sessionStorage.session_FORMFACTOR_KEY="";
	}else if(name=="session_selectedSKU"){
		$("#session_selectedSKU").text("");
		sessionStorage.session_selectedSKU="";
	}else if(name=="session_pages"){
		$("#session_pages").text("");
		sessionStorage.session_pages="";
	}else if(name=="session_selectedVCMID"){
		$("#session_selectedVCMID").text("");
		sessionStorage.session_selectedVCMID="";
	}else if(name=="session_selectedSKUVCMID"){
		$("#session_selectedSKUVCMID").text("");
		sessionStorage.session_selectedSKUVCMID="";
	}
	
}
function setSessionStorage(name,value){
	
	if(name=="session_selectedSKU"){
		if(value!=sessionStorage.session_selectedSKU){
			sessionStorage.session_selectedSKU=value;
			$("#session_selectedSKU").text(sessionStorage.session_selectedSKU);

		}
		
	}else if(name=="session_INTERFACE_KEY"){
		if(value!=sessionStorage.session_INTERFACE_KEY){
			sessionStorage.session_INTERFACE_KEY=value;
			$("#session_INTERFACE_KEY").text(sessionStorage.session_INTERFACE_KEY);
		}		
	}else if(name=="session_CAPACITY_KEY"){
		if(value!=sessionStorage.session_CAPACITY_KEY){
			sessionStorage.session_CAPACITY_KEY=value;
			$("#session_CAPACITY_KEY").text(sessionStorage.session_CAPACITY_KEY);
		}
		
	}else if(name=="session_SUBCATEGORY_KEY"){
		if(value!=sessionStorage.session_SUBCATEGORY_KEY){
			sessionStorage.session_SUBCATEGORY_KEY=value;
			$("#session_SUBCATEGORY_KEY").text(sessionStorage.session_SUBCATEGORY_KEY);
		}
		
	}else if(name=="session_SPIN_KEY"){
		if(value!=sessionStorage.session_SPIN_KEY){
			sessionStorage.session_SPIN_KEY=value;
			$("#session_SPIN_KEY").text(sessionStorage.session_SPIN_KEY);
		}
		
	}else if(name=="session_FORMFACTOR_KEY"){
		if(value!=sessionStorage.session_FORMFACTOR_KEY){
			sessionStorage.session_FORMFACTOR_KEY=value;
			$("#session_FORMFACTOR_KEY").text(sessionStorage.session_FORMFACTOR_KEY);
		}
		
	}else if(name=="session_pages"){
		if(value!=sessionStorage.session_pages){
			sessionStorage.session_pages=value;
			$("#session_pages").text(sessionStorage.session_pages);
		}
		
	}else if(name=="session_selectedVCMID"){
		if(value!=sessionStorage.session_selectedVCMID){
			sessionStorage.session_selectedVCMID=value;
			$("#session_selectedVCMID").text(sessionStorage.session_selectedVCMID);
		}
		
	}else if(name=="session_selectedSKUVCMID"){
		if(value!=sessionStorage.session_selectedSKUVCMID){
			sessionStorage.session_selectedSKUVCMID=value;
			$("#session_selectedSKUVCMID").text(sessionStorage.session_selectedSKUVCMID);
		}
		
	}else{
		sessionStorage.name=value;
	}
	
}
function reorderComparison(){
    var cp_section_tr = $("div.compareListHold.clearfix").find("table tbody tr");
    var cp_section_tds = cp_section_tr.find("td");
    var cp_section_tds_count=cp_section_tds.length;
    var add_cp_section_td = 4- cp_section_tds_count;
	var cp_section_empty_td="<td class=\"empty\">";
	cp_section_empty_td+="<div class=\"compareListItem\">";
	cp_section_empty_td+="</div>";
	cp_section_empty_td+="</td>";
    for(var i=0;i<add_cp_section_td;i++ ){
		cp_section_tr.append(cp_section_empty_td);
    }     
}

function disableEnableCompareNowButton(){
	var selectedProducts = $("#selectedProducts").text();
	if(selectedProducts!=0){
		$("#comparison_button").removeClass();
		$("#comparison_button").addClass("btnTealLrg compareNowBtn btn-bs");
	}else{
		$("#comparison_button").removeClass();
		$("#comparison_button").addClass("btnDisabled btn-bs btn-bs-dsd");
	}
}
function btnCloseProductClick(event){
	event.preventDefault();
	var curr_index = $(this).index('.btnCloseProduct.tdtd')+1;
	var row_=0;
	$("#comparisonHoldTableBody").children("tr").each(function(){
	    row_++;
		if(row_==1){
			var sku__=$(this).find("td").eq(curr_index).find("p").text();
			var vcmId__=$(this).find("td").eq(curr_index).find("span.prodvcmid").text();
			var skuvcmId__=$(this).find("td").eq(curr_index).find("span.skuvcmid").text();
			var selectedURL = $(this).find("td").eq(curr_index).find("span.url").text();
			removeComparison($.trim(sku__),$.trim(vcmId__),$.trim(skuvcmId__),$.trim(selectedURL));
		}
		if(row_!=2){
			$(this).find("td").eq(curr_index).remove();
		}
	});
	row_=0;
	$("#comparisonHoldTableBody").children("tr").each(function(){
	    row_++;
		if(row_==1){
			 var tdTemp="<td class=\"itemDetail itemEmpty\">";
			 tdTemp+="<div class=\"itemEmptyHold\">";
			 tdTemp+="<a href=\"javascript:compareNow(false);\">"+addAnotherLable+"</a>";
			 tdTemp+="</div>";
			 tdTemp+="</div>";
			 var trHtml=$(this).html();
				$(this).append(tdTemp);
			}else if(row_>2){
			var lastTd=$(this).children("td:last");
			var class_=lastTd.attr("class");
			if(!lastTd.hasClass("em")){
				class_="em "+class_;
			}
			var tdTemp="<td class=\""+class_+"\"></td>";
			var trHtml=$(this).html();
				$(this).append(tdTemp);
			}
		});
		$("#comparisonHoldTableBody").children("tr:first").each(function(){
			var itemEmptyLen=$(this).find("td.itemDetail.itemEmpty").length;
			var itemLen=$(this).find("td").length-1;
			if(itemEmptyLen==itemLen){
				removeBG();
			}
		});
}
function compareNow(flag){
	if(flag==true){
		
		var selectedProducts=$("#selectedProducts").text();
		if(selectedProducts=="0"){
			return;
		}
		
		var selectedSKU=$("#selectedSKU").text();
        selectedSKU=$.trim(selectedSKU);
        var selectedVCMID = $("#selectedVCMID").text();
        selectedVCMID=$.trim(selectedVCMID);
        var selectedSKUVCMID =$("#selectedSKUVCMID").text();
        selectedSKUVCMID=$.trim(selectedSKUVCMID);
        
        
		var rclocale=rcLocaleJS;
		$(".mainSubNavCateg.clearfix").hide();
		$(".tabContentGrid").hide();
		if (waitMsgStr == undefined)
		{
			waitMsgStr = "Searching......Please wait......";
		}

		$(".tabContentComparison").show().html(waitMsgStr);
		compare_now_click=true;
		document.location.hash = selectedSKU;
		cp_first_click=document.location.hash;
		
		$.ajax({
				type: "POST",
				url: "/ww/jsp/productfinder/productfindercomparison.jsp",
				cache: false,
				data: { sku: selectedSKU, locale:rclocale, subcategory:encoding($("#SUBCATEGORY_KEY").attr("value")), vcmid:selectedVCMID, skuvcmid:selectedSKUVCMID},
				success: function(msg){
				    $("#tab_1").hide();
					$(".tabContentComparison").html(msg).show();
					$("a.btnCompare").fancybox({
							   'padding' : 0,
							   'autoScale' : false,
							   'transitionIn' : 'none',
							   'transitionOut' : 'none'
					});
                	$('.btnDifferent').click(forDifferent);
					$('.btnSame').click(forSame);
					$('.prod_detail_link').click(bindProdLinkDetail);

					$('.btnCloseProduct.tdtd').click(btnCloseProductClick);
					if (window.addthis) {
						window.addthis = null;
						window._adr = null;
						window._atc = null;
						window._atd = null;
						window._ate = null;
						window._atr = null;
						window._atw = null;
					}
					if($("#at20mc")!=null){
						$("#at20mc").remove();
					}
					$.getScript("http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-4dc164cc63a08feb", function() {
						addthis.init();
						addthis.toolbox("#socList");
					});
					compare_now_click=false;
					createResellerLinks();
					
				},
				error: function(request,status){
					$(".tabContentComparison").show().html("ERROR..."+request+status);
					compare_now_click=false;
				}
		     }
		);
	}else{
		$(".tabContentComparison").hide();
		$(".mainSubNavCateg.clearfix").show();
		$(".tabContentGrid").show();
		cp_first_click=0;
	}
	
	
}
function checkSame(tds){
	var t="";
	var count=0;
	var ret=true;
	$(tds).find("td").each(function(){
	    if(!$(this).hasClass("em")){
			if(count==1){
				t=$(this).html();
				
			}else if(count>1){
				var tt=$(this).html();
				if($.trim(t)!=$.trim(tt)){
					ret=false;
					return ret;
				}
			}
		}
		
		count++;
	});
	return ret;
}
function changeBG(tds){
	var count=0;
	$(tds).find("td").each(function(){
		if(count>0){
			var tt=$(this).addClass("bg");
		}
		count++;
	});
}
function removeBG(){
	var row_=0;
	$("#comparisonHoldTableBody").children("tr").each(function(){
	    row_++;
		if(row_>2){
			var count=0;
			$(this).find("td").each(function(){
				if(count>0){
					$(this).removeClass("bg");
				}
				count++;
			});
		}
	});
}
function checkD(flag){
	var row_=0;
	
	$("#comparisonHoldTableBody").children("tr").each(function(){
	    row_++;
		var class_=$(this).attr("class");
		if(class_!=""){
			if(row_>2){
				if(flag){
					if(checkSame(this)){
						changeBG(this);
					}
				}else{
					if(!checkSame(this)){
						changeBG(this);
					}
				}
			}
		}
	});
}

function isSignle(){
	
	if(sessionStorage.session_selectedSKU!=undefined && sessionStorage.session_selectedSKU!=""){
	     var skuArray=sessionStorage.session_selectedSKU.split(",");
		  
		 if(skuArray.length>1){
			return true;
		 }else{
			return false;
		 }
	}else{
		return false;
	}
}
function forDifferent(event){
	event.preventDefault(event);
	removeBG();
	if(isSignle()){
		checkD(false);
	}
	
}
function forSame(event){
	event.preventDefault(event);
	removeBG();
	if(isSignle()){
		checkD(true);
	}

}

function bindProdLinkDetail(event){
	sessionStorage.prod_link_detail="1";
	sessionStorage.prod_nav=$(".mainSubNavCateg.clearfix").html();
	sessionStorage.prod_grid=$("#tab_1").html();
	sessionStorage.prod_comparion=$(".tabContentComparison").html();
	
	
}

function createResellerLinks() {
	var pf_ecommLocale = "";
	if(getCookie('ecommSessionCookie')!=null && getCookie('ecommSessionCookie')!=undefined && getCookie('ecommSessionCookie')!=""){		
		pf_ecommLocale=getCookie('ecommSessionCookie');
	}else if(getCookie('ecommLocaleCookie')!=null && getCookie('ecommLocaleCookie')!=undefined && getCookie('ecommLocaleCookie')!=""){
		pf_ecommLocale=getCookie('ecommLocaleCookie');
	}else{
		pf_ecommLocale=rcLocaleJS;
	}
	
	var RGID = getRGID(pf_ecommLocale, 'embed');
	if(RGID !=null && RGID!=undefined){
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
							ciButtonScriptOutput[i] = ciButtonScriptOutput[i].replace('>',' class="btnOrangeMiddle btnOrangeMiddleArrow btn-bs btn-bs-sec btn-bs-sm btn-bs-icn">');
						}
						ciButtonHTML += ciButtonScriptOutput[i];
					}
					ciButtonHTML += "<span>" + labels.buy_now + '</span><b class="btn-bs-caret">&#8250;</b></a>';
					$('.ciModelNumber:contains('+sku+')').parents('.holder').find('.ciButton').html(ciButtonHTML);	
				}
			});
		});
	}
	
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

