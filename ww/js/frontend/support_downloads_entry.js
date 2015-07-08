/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 12:10
 **/

$(document).ready(function() {
//init tabs
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');

    /*$('#driveParam').change(function(event) {
		checkDriveParam();
    });
    $('#drive').change(function(event) {
		checkDrive();
    });
    checkDriveParam();
    checkDrive();
    */
	$("#drive").val("");
	$("#driveModel").val("");
    initLoadCategory();

    $(".cusel-scroll-wrap").css({"overflow-y": "auto", "max-height": "176px"});
	
	$(".openAccept").click(function (event){
		event.preventDefault();
		$(".openAccept").each(function (i, o) {
			$(o).parent('div').removeClass('error');
		});	
		var url = $(this).attr('href');
		if(url==null||url=="#"||url==""){
			$(this).parent('div').addClass('error');
			return false;
		}
	});

	$("input[type=hidden]").change(function(event) {
		if ($(this).val()) {
			$(this).parent('div').parent('div').parent('div').removeClass('error');
			$(".openAccept").each(function (i, o) {
				$(o).parent('div').removeClass('error');
			});
		}
	});		
	
});

function clearSpan(obj){
	
	$.each(obj,function(i){
		if(i!=0){
		$(this).remove();
		
		}
		
	});
}
function clearHiddenValue(id){
	$("#"+id).attr("value","");
}
function initLoadCategory(){

	var org=$("#cuselFrame-driveParam").find("span");
	clearSpan(org);
	clearHiddenValue("driveParam");

    var categoryListLength=filterSectionList.category.length;
	var categoryList=filterSectionList.category;

    var SortByName = function(a, b){
      var aName = a.categoryName.toLowerCase();
      var bName = b.categoryName.toLowerCase();

        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    }

    categoryList.sort(SortByName);
	
	var $driveParam = $("#driveParam");
	var $drive = $("#drive");
	var $driveModel = $("#driveModel");
	
     $.each(categoryList, function() {
        var categoryID=this.categoryID;
		var categoryName=this.categoryName;
		//$("#cusel-scroll-driveParam").append("<span val='"+categoryID+"'>"+categoryName+"</span>");
		$driveParam.append("<option value=\"" + categoryID + "\">" + categoryName + "</option>");
     });
	 
	 $driveParam.change(function () {
		$drive.find(".v").remove();
		$driveModel.find(".v").remove();
		$drive.attr("disabled", "disabled");
		$driveModel.attr("disabled", "disabled");
		$("#modelHiddenParam").val("");
		$("#skuParam").val("");
		$("#productHiddenParam").val("");
		var categoryVal = $(this).val();
		$("#categoryHiddenParam").val(categoryVal);
		
		var SortByName = function(a, b){
		  var aName = a.productName.toLowerCase();
		  var bName = b.productName.toLowerCase();

			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		}
			
		$.each(categoryList, function () {
			var categoryID = this.categoryID;
			if (categoryVal == categoryID) {
				var productList = this.product;
				productList.sort(SortByName);
				 $.each(productList, function() {
					var productID = this.productID;
					var productName = this.productName;
					$drive.append("<option value=\"" + productID + "\" class=\"v\">" + productName + "</option>");
				 });
				 $drive.removeAttr("disabled");
			}
		});
	 });
	 
	 $drive.change(function () {
		$driveModel.find(".v").remove();
		$driveModel.attr("disabled", "disabled");
		$("#modelHiddenParam").val("");
		$("#skuParam").val("");
		var categoryVal = $driveParam.val();
		var productVal = $(this).val();
		$("#productHiddenParam").val(productVal);
		
		var SortByName = function(a, b){
		  var aName = a.modelNumber.toLowerCase();
		  var bName = b.modelNumber.toLowerCase();

			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		}
			
		$.each(categoryList, function () {
			var categoryID = this.categoryID;
			if (categoryVal == categoryID) {
				var productList = this.product;
				 $.each(productList, function() {
					var productID = this.productID;
					if (productVal == productID) {
						var modelList = this.modellist;
						modelList.sort(SortByName);
						$.each(modelList, function() {
							//var modelID = this.modelID;
							var modelNumber = this.modelNumber;
							$driveModel.append("<option value=\"" + modelNumber + "\" class=\"v\">" + modelNumber + "</option>");
						});
						$driveModel.removeAttr("disabled");
					}
				 });
			}
		});
		$driveModel.change(function () {
			var modelVal = $(this).val();
			$("#modelHiddenParam").val(modelVal);
			$("#skuParam").val(modelVal);
		});
	 });
	/*$("#cusel-scroll-driveParam span").click(function(){
		$("#cuselFrame-driveParam .cuselText").text($(this).text());
		$("#cuselFrame-driveParam .cusel-scroll-wrap").css("display","none");
		$("#driveParam").attr("value",$(this).attr("val"));
		if($("#categoryHiddenParam").attr("value")!=$(this).attr("val")){
			$("#drive").attr("value","");
			$("#driveModel").attr("value","");
			$("#categoryHiddenParam").attr("value",$(this).attr("val"));
			$("#productHiddenParam").attr("value","");
			$("#modelHiddenParam").attr("value","");
			$("#skuParam").attr("value","");
		}
		
	});*/
	 }
function loadProductSelection(categoryVal){
	
	var org=$("#cusel-scroll-drive").find("span");
	
	clearSpan(org);
	org=$("#cusel-scroll-driveModel").find("span");
	
	clearSpan(org);

	var categoryListLength=filterSectionList.category.length;			
	var categoryList=filterSectionList.category;
	$.each(categoryList,function(){
		var categoryID=this.categoryID;
		var categoryName=this.categoryName;
		if(categoryVal==categoryID){
			var productList=this.product;

            var SortByName = function(a, b){
              var aName = a.productName.toLowerCase();
              var bName = b.productName.toLowerCase();

                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            productList.sort(SortByName);

            $.each(productList,function(i){
					var productID=this.productID;
					var productName=this.productName;
					
					$("#cusel-scroll-drive").append("<span val='"+productID+"'>"+productName+"</span>");
			});
			
			
			$("#cuselFrame-drive .cuselText").text(select_product);
			
			$("#cuselFrame-driveModel .cuselText").text(select_model);
		}
	});
	$("#cusel-scroll-drive span").click(function(){
		$("#cuselFrame-drive .cuselText").text($(this).text());
		$("#cuselFrame-drive .cusel-scroll-wrap").css("display","none");
		$("#drive").attr("value",$(this).attr("val"));
		if($("#productHiddenParam").attr("value")!=$(this).attr("val")){
			$("#driveModel").attr("value","");
			$("#productHiddenParam").attr("value",$(this).attr("val"));
			$("#modelHiddenParam").attr("value","");
			$("#skuParam").attr("value","");
		}
	});
	
}

function loadModelSelection(categoryVal,productVal){
	
	var org=$("#cuselFrame-driveModel").find("span");
	
	clearSpan(org);
	
	var categoryListLength=filterSectionList.category.length;			
	var categoryList=filterSectionList.category;
	$.each(categoryList,function(){
		var categoryID=this.categoryID;
		var categoryName=this.categoryName;
		if(categoryVal==categoryID){
			var productList=this.product;
			$.each(productList,function(){
				var productID=this.productID;
				var productName=this.productName;
				if(productVal==productID){
					var modelList=this.modellist;

                    var SortByName = function(a, b){
                      var aName = a.modelNumber.toLowerCase();
                      var bName = b.modelNumber.toLowerCase();

                        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                    }

                    modelList.sort(SortByName);
                    
                    $.each(modelList,function(){
						var modelID=this.modelID;
						var modelNumber=this.modelNumber;
						$("#cusel-scroll-driveModel").append("<span val='"+modelNumber+"'>"+modelNumber+"</span>");
					});
					$("#cuselFrame-driveModel .cuselText").text(select_model);
					
				}
			});
			$("#cusel-scroll-driveModel span").click(function(){
				$("#cuselFrame-driveModel .cuselText").text($(this).text());
				$("#cuselFrame-driveModel .cusel-scroll-wrap").css("display","none");
				$("#driveModel").attr("value",$(this).attr("val"));
				if($("#modelHiddenParam").attr("value")!=$(this).attr("val")){
					$("#modelHiddenParam").attr("value",$(this).attr("val"));
					$("#skuParam").attr("value",$(this).attr("val"));
				}
				
			});

		}
		
		
	});
}
function resetSelection(){
	
	$("#categoryHiddenParam").attr("value","");
	$("#productHiddenParam").attr("value","");
	$("#modelHiddenParam").attr("value",$("#modelNum").val());
	$("#skuParam").attr("value",$("#modelNum").val());
}

function filterFormSubmit(){
	if(jQuery.trim($("#modelNum").val())!=""){
		resetSelection();
	}else{
		$("#categoryHiddenParam").attr("value",$("#driveParam").attr("value"));
		$("#productHiddenParam").attr("value",$("#drive").attr("value"));
		$("#modelHiddenParam").attr("value",$("#driveModel").attr("value"));
		$("#skuParam").attr("value",$("#driveModel").attr("value"));
		
	}
	$("#filterForm").submit();
	
	
}
function clearHeight(){
	$("#cusel-scroll-driveParam").css("height","auto");
	$("#cusel-scroll-drive").css("height","auto");
	$("#cusel-scroll-driveModel").css("height","auto");
	$(".jScrollPaneContainer").css("height","auto");
	
	
}
function checkDriveParam()
{

  if ($('#driveParam').val().length > 0)
  {	
	$('#cuselFrame-drive').removeClass('classDisCusel');
	if($('#drive').val().length == 0){
		$('#cuselFrame-driveModel').addClass('classDisCusel');
	}
	$(".driveParamHold").removeClass('error');
	var driveParam=$("#cuselFrame-driveParam").find("span.cuselActive").attr("val");

	loadProductSelection(driveParam);
	
  }
  else
  {
	$("#cuselFrame-drive .cuselText").text(select_product);
		
	$("#cuselFrame-driveModel .cuselText").text(select_model);
	$('#cuselFrame-drive').addClass('classDisCusel');
	$('#cuselFrame-driveModel').addClass('classDisCusel');
	
  }
  clearHeight();

}

function checkDrive()
{
	if ($('#drive').val().length > 0)
    {
	$('#cuselFrame-driveModel').removeClass('classDisCusel');

	var driveParam=$("#cuselFrame-driveParam").find("span.cuselActive").attr("val");
	var drive=$("#cuselFrame-drive").find("span.cuselActive").attr("val");
	
	loadModelSelection(driveParam,drive);

    }
    else
    {
    	
    	$("#cuselFrame-driveModel .cuselText").text(select_model);
    	$('#cuselFrame-driveModel').addClass('classDisCusel');	
    }
    clearHeight();

}
function onChangeSelect(id,lang){
	//var hostname=window.location.hostname;
	var aID="#a_"+id;
	var aVal=$("#"+id).val();
	var aUrl="/ww/jsp/support/download/supportDownloadEntryPopUpNew.jsp?locale="+lang+"&oid="+aVal;
	if(aVal==""){
		aUrl="#";
	}
	$(aID).attr("href",aUrl);
}

function filterAction(type,category,product,sku,locale){
	//var hostname=window.location.hostname;
	category=$("#categoryHiddenParam").val();
	product=$("#productHiddenParam").val();
	sku=$("#modelHiddenParam").val();
	if(category==null){
		category="";
	}
	if(product==null){
		product="";
	}
	if(sku==null){
		sku="";
	}
	if(locale==null){
		locale="en-us";
	}
	//$("#supportDownloadSearchResultsBody").html("type="+type+"&category="+category+"&product="+product+"&sku="+sku+"&locale="+locale+"");
	var product_finder_searching="";
	if($("#product_finder_searching")[0]){
	    product_finder_searching=$("#product_finder_searching").attr("value");
	}else{
	    product_finder_searching="Loading......";
	}
	$("#supportDownloadSearchResultsBody").html(product_finder_searching);
	if(type==""){
		$.ajax({
			type: "POST",
			url: "/ww/jsp/support/download/supportDownloadSearchResultsNavigationAjax.jsp",
			cache: false,
			data: "q=*&start=0&num=100&type="+type+"&category="+category+"&product="+product+"&sku="+sku+"&locale="+locale+"",
			success: function(msg){
				$("#supportDownloadSerchResultsFilter").html(msg);
			}
		});
	}
	$.ajax({
		   type: "POST",
		   url: "/ww/jsp/support/download/supportDownloadSearchResultsAjax.jsp",
		   cache: false,
		   data: "q=*&start=0&num=100&type="+type+"&category="+category+"&product="+product+"&sku="+sku+"&locale="+locale+"",
		   success: function(msg){
		   	 
		   	 $("#supportDownloadSearchResultsBody").html(msg);
		   	 var totalRecord=$("#totalRecord").attr("value");
		   	 var totalRecordHTML="<h2><strong>"+totalRecord+"</strong> "+amount_files+"</h2>";
		   	 if(totalRecord==0){
		   		$("#supportDownloadSerchResultsFilter").html(totalRecordHTML);
		   		    initDropdownload();
                    $(".cusel-scroll-wrap").css({"overflow-y": "auto", "max-height": "176px"});
                }
			   	
		   }
	});
}
$(document).ready(function(){
	category=$("#categoryReqParamVal").val();
	product=$("#productReqParamVal").val();
	sku=$("#modelReqParamVal").val();
	lang=$("#rclocale").val();
	if(isSupportDownlaodSearchResultsFilter){
	    filterAction("",category,product,sku,lang);
	}
	
});
function liActive(obj){
	
	$("#supportDownloadSerchResultsFilter .tabFilter li").removeClass('active');
	$(obj).parents('li:first').addClass('active');
}

function paginationSearch(gsaurl){
	var product_finder_searching="";
	if($("#product_finder_searching")[0]){
	    product_finder_searching=$("#product_finder_searching").attr("value");
	}else{
	    product_finder_searching="Loading......";
	}
    $("#supportDownloadSearchResultsBody").html(product_finder_searching);
    $.ajax({
		   type: "POST",
		   url: "/ww/jsp/support/download/supportDownloadSearchResultsPaginationAjax.jsp",
		   cache: false,
		   data: gsaurl,
		   success: function(msg){
		   	    $("#supportDownloadSearchResultsBody").html(msg);
			   	initDropdownload();
                $(".cusel-scroll-wrap").css({"overflow-y": "auto", "max-height": "176px"});
           }
	});
}
$(document).ready(function(){
					$("#modelNum").keyup(function(e) {
						if(e.which==13){
							$("#modelNum").val($.trim($("#modelNum").val()));	
							if($("#modelNum").val()!=""){
								e.preventDefault();
								submitSupportDownloadForm();
							}						
						}
						
					});
});
function disableButtons(){
	$('#btn-support-download-filter-bymodelnumber-go').attr('disabled', 'disabled');
	$('#btn-support-download-filter-bydrive-go').attr('disabled', 'disabled');
}
function enableButtons(){
	$('#btn-support-download-filter-bymodelnumber-go').removeAttr("disabled");
	$('#btn-support-download-filter-bydrive-go').removeAttr("disabled");
}
function submitSupportDownloadForm(buttonType){
disableButtons();	
if(!buttonType){
buttonType=3;
}
					var tabedSearchFilterID=jQuery("#tabedSearchFilterID");
					var supportDownloadSearchResultsBody=jQuery("#supportDownloadSearchResultsBody");
					
					if(tabedSearchFilterID.length>0){
						tabedSearchFilterID.remove();
					}
					
					var arrow=jQuery(".filterFrm");
					/*if(jQuery("#arrowID").length==0){
					  arrow.after("<div id=\"arrowID\" class=\"arrow\"></div>");
					 
					}*/
					

					
					var formobj=jQuery(".filterSection.downloadsFilter.clearfix");
					
					var type="";
					var category="";
					var product="";
					var sku="";
					var locale=rcLocaleJS;
					
					sku=jQuery("#modelNum").attr("value");
					sku = jQuery.trim(sku);
					
					
					
					
					if(buttonType == 1){
					   
					    //jQuery("#searchModelNumberText").attr("style","border-style:solid;border-width:2px;border-color:red;");
						if(sku==null||sku==""){
							jQuery("#tabedSearchFilterID").empty();
							jQuery("#supportDownloadSearchResultsBody").empty();
							jQuery(".searchModelNumber").addClass("error");
							jQuery(".driveParamHold").removeClass("error");
							jQuery("#arrowID").remove();
							enableButtons();
							return false;
						}else{
							jQuery(".searchModelNumber").removeClass("error");
							jQuery(".driveParamHold").removeClass("error");
						}
						
					}else if(buttonType == 2){
						//jQuery("#searchModelNumberText").attr("style","");
					    //alert("Please category.");
					    //jQuery("#categoryHiddenParam").attr("style","border-style:solid;border-width:2px;border-color:red;");
						category=jQuery("#driveParam").attr("value");
						product=jQuery("#drive").attr("value");
						sku=jQuery("#driveModel").attr("value");
						
						if(category==null||category==""){
							jQuery("#tabedSearchFilterID").empty();
							jQuery("#supportDownloadSearchResultsBody").empty();
							jQuery(".searchModelNumber").removeClass("error");
							jQuery(".driveParamHold").addClass("error");
							jQuery("#arrowID").remove();
							enableButtons();
							return false;
						}else{
							jQuery(".searchModelNumber").removeClass("error");
							jQuery(".driveParamHold").removeClass("error");
						}
						
					}else{
					    //jQuery("#searchModelNumberText").attr("style","");
					    //jQuery("#categoryHiddenParam").attr("style","");
						jQuery(".searchModelNumber").removeClass("error");
					    jQuery(".driveParamHold").removeClass("error");
						arrow.after("<div id=\"arrowID\" class=\"arrow\"></div>");
					}
					jQuery("#categoryHiddenParam").attr("value",category);
					jQuery("#productHiddenParam").attr("value",product);
					jQuery("#modelHiddenParam").attr("value",sku);
					jQuery("#typeParam").attr("value",type);
					var fo=jQuery(".downloadsModule");
					var product_finder_searching="";
					if($("#product_finder_searching")[0]){
					    product_finder_searching=$("#product_finder_searching").attr("value");
					}else{
					    product_finder_searching="Loading......";
					}
					fo.html(product_finder_searching);
					
					
					jQuery.ajax({
						type: "POST",
						url: "/ww/jsp/support/download/supportDownloadEntrySearchResultAjaxSignle.jsp",
						cache: false,
						data: "q=*&start=0&num=100&type="+type+"&category="+category+"&product="+product+"&sku="+sku+"&locale="+locale+"",
						success: function(msg){
						
							fo.remove();
							supportDownloadSearchResultsBody.remove();
							var updatedobj=formobj.after(msg);
							initDropdownload();
							$(".cusel-scroll-wrap").css({"overflow-y": "auto", "max-height": "176px"});
							enableButtons();	
                        }
					});
					
				}

				function initDropdownload(){
					/*var paramsline = {
							changedEl: ".lineForm select",
							visRows: 5,
							scrollArrows: true
					}
					cuSel(paramsline);*/
				   	function bg_overlay(){
				        if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
				        	$("body","html").css({
				                height: "100%",
				                width: "100%"
				            });
				        	jQuery("html").css("overflow","hidden");
				            if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				                $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
				                $("#TB_overlay").click(tb_remove);
				            }
				        }
				        else{//all others
				            if(document.getElementById("TB_overlay") === null){
				                $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
				                $("#TB_overlay").click(tb_remove);
				            }
				        }
				    }
					
				    function tb_remove() {
				        $("#TB_window").fadeOut("fast",function(){
				            $('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();
				        });
				        $("#TB_load").remove();
				        if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
				            $("body","html").css({
				                height: "auto",
				                width: "auto"
				            });
				            $("html").css("overflow","");
				        }
				        document.onkeydown = "";
				        document.onkeyup = "";

				        $('#boxLogin, #boxDownload, #boxAccept, #boxProductEntry').remove();
						$(".boxDownload_container").remove();
				        return false;
				    }
				   	$(".openAccept").click(function (event){
						event.preventDefault();
						$(".openAccept").each(function (i, o) {
							$(o).parent('div').removeClass('error');
						});	
						var url = $(this).attr('href');
						if(url==null||url=="#"||url==""){
                            $(this).parent('div').addClass('error');
                            return false;
						}
						bg_overlay();
						
						var top = $(this).offset().top - 230;
						$.ajax({
							url: url,
							cache: false,
							success: function(data) {
								$('body').append(data);

								//$('.boxDownload_container').offset({top : top});
								//$('.boxDownload_container').css("left","50%");
								//$('.boxDownload_container').css("top","50%");
								//$('.boxDownload_container').css("position","fixed");
								//$(".boxDownload_container").css({marginLeft: '-' + parseInt((678 / 2),10) + 'px', width: 678 + 'px'});
								/*if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
									$(".boxDownload_container").css({marginTop: '-' + parseInt((500 / 2),10) + 'px'});
								}*/	
								
								$('#boxAccept').fadeIn(100, function(){
								});
								$(window).resize();
								$(".btnAcceptOpen").click(function (event){
									event.preventDefault();
									bg_overlay();
									$('#boxDownload').fadeIn(100, function(){
									});
									$('#boxAccept').fadeOut(100, function(){
									});
								});
								$(".btnClose").click(function (event) {
									event.preventDefault();
									tb_remove();
									$('#boxAccept').hide();
								});
							}
						});

					});
					$("input[type=hidden]").change(function(event) {
						if ($(this).val()) {
							$(this).parent('div').parent('div').parent('div').removeClass('error');
							$(".openAccept").each(function (i, o) {
								$(o).parent('div').removeClass('error');
							});
						}
					});					
				}
				function filterByDownloadType(type,category,product,sku,locale){
					var fo=jQuery(".downloadsModule");
					var product_finder_searching="";
					if($("#product_finder_searching")[0]){
					    product_finder_searching=$("#product_finder_searching").attr("value");
					}else{
					    product_finder_searching="Loading......";
					}
					fo.html("product_finder_searching");
					jQuery.ajax({
						type: "POST",
						url: "/ww/jsp/support/download/supportDownloadEntrySearchResultAjaxSignlePage.jsp",
						cache: false,
						data: "q=*&start=1&num=100&type="+type+"&category="+category+"&product="+product+"&sku="+sku+"&locale="+locale+"",
						success: function(msg){
						
							jQuery("#supportDownloadSearchResultsBody").html(msg);

							initDropdownload();
                            $(".cusel-scroll-wrap").css({"overflow-y": "auto", "max-height": "176px"});

                        }
					});
					
				}