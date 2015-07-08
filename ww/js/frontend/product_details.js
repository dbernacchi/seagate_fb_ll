var mousedowned = false;
$(document).ready(function() {
	$.getScript("http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-4dc164cc63a08feb", function() {
		addthis.init();
		addthis.toolbox(".socList");
		addthis.toolbox(".actionList");
	});
    // Info/Support Header Button
    if($('.slideArea').length>0){
        $('.slideArea').slideAreaProduct( {
            'navigate'  		: false,
            'automove'  		: false,
            'moveArea'  		: '.slider',
                    'sliderButton'		: '.sliderButton' 
        });
    }
    var supportCornerUrl = $('#supportCorner').attr('href');
    var infoCornerUrl = $('#infoCorner').attr('href');    
    var sc_width = $('#supportCorner').outerWidth();
    var sc_left = 0;
    if ($('#supportCorner').offset() != null)
        sc_left = $('#supportCorner').offset().left;
    var ic_width = $('#infoCorner').outerWidth();
    var sb_width = $('#sliderButton').outerWidth();
	$('#supportCorner').parent().click(function(event) {
		event.preventDefault();
	});
	$('#infoCorner').parent().click(function(event) {
		event.preventDefault();
	});
    $('#supportCorner').parent().mouseup(function(event) {
        event.preventDefault();
		moves = sb_width-2;
        $('#sliderButton').animate({left: moves}, 500, function() {window.location = supportCornerUrl;});
        mousedowned = false;
    });
    $('#infoCorner').parent().mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '-10'}, 500, function() {window.location = infoCornerUrl;});
        mousedowned = false;
    });    
    $('#sliderBox').attr('unselectable', 'on');
    $('#sliderBox').mousedown(function(event) {
        event.preventDefault();
        event.stopPropagation();
        oldpos = event.pageX;
        mousedowned = true;
    }); 
    $('#sliderBox').mouseup(function(event) {
        event.preventDefault();
        if (mousedowned)
        {
            if ($('#sliderButton').offset().left > 1100)
            {
                $('#sliderButton').animate({left: 118}, 500, function() {window.location = supportCornerUrl;});
            }
            else
            {
                $('#sliderButton').animate({left: -10}, 500, function() {window.location = infoCornerUrl;});
            }
        }
        mousedowned = false;
    });
	$('#sliderBox').mousemove(function(event) {
		if (mousedowned)
		{
			var current_left = $('#sliderButton').css('left').replace('px', '');
			var current_x_offset = $('#sliderButton').offset().left;
			var movement = event.pageX - oldpos;
            if (current_x_offset + movement <= (sc_left+sc_width-sb_width) && (current_x_offset + movement) >= 1044)
            {
			    $('#sliderButton').offset({left: current_x_offset + movement})
			    oldpos = event.pageX;
            }
            else if (current_x_offset + movement > (sc_left+sc_width-sb_width))
            {
                $('#sliderButton').css('left', 118);
            }
            else if ((current_x_offset + movement) < 1044)
            {
                $('#sliderButton').css('left', -10);
            }
		}
	});
/*	
	$$('#sliderBox').swipeLeft(function() {
   		$.when($('#infoCorner').mouseup()).then(function(){
   				mousedowned=false;
     			$(location).attr('href', infoCornerUrl);
       });

   		
	});
	$$('#sliderBox').swipeRight(function() {
   		$.when($('#supportCorner').mouseup()).then(function(){
   				mousedowned=false;
     			$(location).attr('href', supportCornerUrl);
       });

	});	
*/
     //Info/Support Header Button
	 /*Comment The Function	  
	 $('#ALGContainer').ALGGallery({
		'elements' : '#MyThumbnails',
		'text'     : '#MyText'
	});*/
	//Comment The Function
	//Comment The Function
	$("a.videoCallBtn ").fancybox({
		'padding'			: 0,
		'autoScale'			: false,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none'
	}); 
	//Comment The Function
	//Comment The Function
    jQuery('.carousel').fadeGallery({
		listSelector: '.fadeGallery> li',
		navHolder:		'div.switcher',
		navCreate:		true,
		// swichTime:		3000,
		// delay:			800,
		fadeIEfix:		false
	});
	//Comment The Function
	//Comment The Function
	$(function() {
		$('.quickLinkBox .contentScrol').jScrollPane({showArrows: true});
		//initTabs('#main', '.tabset li', '.tabBox .tabEl');
		initTabs('.tabBox2', '.tabList2 li', '.tabContent2 .tab2');
		$('input.check').ezMark();
	}); 
//Comment The Function
//Comment The Function
/*commented by Ashok	$('#productConfigurator').ProductConfigurator();
	slideDownConfigurator();*/
	
//Display galery when overview tab is clicked
	$('.tabset li').click(function(event) {
		event.preventDefault();
		if ( $(this).index('.tabset li') == 0 )
		{	
		$('.ALGImage').css('margin-top' , '45px');	 
		showGallery();
		}

	});
	//Comment The Function
	/*Comment The Function
	$('.specTableProduct .contentScroll').jScrollPane(
		{
			showArrows: true,
			horizontalGutter: 30
		}
	);
	//Comment The Function*/
	//Comment The Function
	//initTabs('.tabBoxQuick', '.tabListQuick li', '.tabContentQuick .tabQuick');
	initTabs('.tabBox', '.tabListOverview li', '.tabContent .tab');
	//$('.quickLinkBox .contentScrol').jScrollPane({showArrows: true});
	//$('input.check').ezMark();
	//$('.btnQuickLink').click(function(event) {
		//event.preventDefault();
		//if (!$('.quickLinkBox').hasClass('quickLinkBoxOpen'))
			//$('.quickLinkBox').addClass('quickLinkBoxOpen');
		//else
			//$('.quickLinkBox').removeClass('quickLinkBoxOpen');
	//});
//Comment The Function
//Comment The Function
	$('.model-shortlist').click(function(event) {
		event.preventDefault();
		$('.tooltipAdded').css('display', 'block');
	});
//Comment The Function
//Comment The Function
	//commented by Ashok $('#productConfigurator').ProductConfigurator( { url : 'json_data_file_momentus.txt', gallery: null, quick_links: true });
//Comment The Function
//Comment The Function
	$('.productLine').find('a.btnClose').click(function(event) {
		event.preventDefault();
		var li = $(this).parent('li');
		var parent_div = li.parent('ul').parent('div').parent('div');
		li.fadeOut(200, function() {
				var all_hided = true;
				parent_div.find('.infoProductList').children('li').each(function(index) {
					if ($(this).is(':visible'))
					{
						all_hided = false;
					}
				});
				if (all_hided) parent_div.fadeOut(200);
		});
	});
	//Comment The Function
	if (typeof(ProductInfoStruct) == 'undefined'  && document.getElementById("link-prodoverview-compareallmodels")!= null){
		//if(ProductInfoStruct.releaseList[0].modelList.length <= 0){
		document.getElementById("link-prodoverview-compareallmodels").style.display="none";
		//}
	}
//	showGallery();
	

    try{
        var location = window.location.href;

        if(location.indexOf("/features") != -1){
            $('.tabset').find('li').removeClass('active');
            $('#li-prodfeatures').addClass('active');
            $('.pdpTab').css('display', 'none');
            $('#featuresTab').css('display', 'block');
            if( $('#featuresTab').parent().hasClass('pdpTab'))
            {
                $('#featuresTab').parent().css('display', 'block');
            }
        }else if(location.indexOf("/specs") != -1){
            $('.tabset').find('li').removeClass('active');
            $('#li-prodspecification').addClass('active');
            $('.pdpTab').css('display', 'none');
            $('#specificationsTab').css('display', 'block');
            if( $('#specificationsTab').parent().hasClass('pdpTab'))
            {
                $('#specificationsTab').parent().css('display', 'block');
            }
        }else if(location.indexOf("/productaccessories") != -1){
            $('.tabset').find('li').removeClass('active');
            $('#li-prodaccessories').addClass('active');
            $('.pdpTab').css('display', 'none');
            $('#accessoriesTab').css('display', 'block');
            if( $('#accessoriesTab').parent().hasClass('pdpTab'))
            {
                $('#accessoriesTab').parent().css('display', 'block');
            }
        }else{
        	$('.tabset').find('li').removeClass('active');
        	$('#li-prodoverview').addClass('active');
        	$('.pdpTab').css('display', 'none');
        	$('#overviewTab').css('display', 'block');

        	if( $('#overviewTab').parent().hasClass('pdpTab')){
        		$('#overviewTab').parent().css('display', 'block');
        	}
        }
    }catch(err){ }
});
//Initialize Gallery
//Doesn't execute because not for product detail - possible clean up item
function showGallery(){ 
	if (typeof(ProductInfoStruct) == 'undefined'){
		var largeimg = new Array();
		var mediumimg = new Array();
		var thumbimg = new Array();
		var typeimg = new Array();
		var altText = new Array();
		$("input[name='thumbArrayId']").each(function(index) {
			largeimg[index] = $("input[name='largeArrayId']").eq(index).val();
			mediumimg[index] = $("input[name='mediumArrayId']").eq(index).val();
			thumbimg[index] = $("input[name='thumbArrayId']").eq(index).val();
			typeimg[index] = $("input[name='types']").eq(index).val();
			altText[index] = $("input[name='altText']").eq(index).val();
		});
		$('#ALGContainer').ALGGallery({
			'elements'		:	[{
				'large'   		:	largeimg,
				'medium'      	:	mediumimg,
				'thumbnails' 	:	thumbimg,
				'types'			:	typeimg,
				'altText'       :   altText
			}]
		});
	}
}
//Initialize Gallery
//Comment The Function
function slideUpConfigurator()
{
	var _parentSlide = '.infoGoods';
    var _linkSlide = '.btnConfigure';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'infoGoodsOpen';
    var _durationSlide = 300;
    $(_linkSlide).parents(_parentSlide).removeClass(_openClassS);
    $("div.sideBar_productInfoTop").css("margin-top", '0');
    $(_linkSlide).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide, function() {
    	$("div.sideBar_productInfoTop").css("margin-top", '0');
  	});

}
function slideDownConfigurator()
{
	var _parentSlide = '.infoGoods';
    var _linkSlide = '.btnConfigure';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'infoGoodsOpen';
    var _durationSlide = 300;
	$(_linkSlide).parents(_parentSlide).addClass(_openClassS);
	//set height to grid 4
	$(_linkSlide).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide, function() {
    	$("div.sideBar_productInfoTop").css("margin-top", $("#productConfigurator").height());
  	});	
}
//Comment The Function
//Parses specs table for contents of each cell and stores in the details array
function initCompareArray(specTableRows) {
	var specTable = $('div.specProdHold').find('.specificationTable');
	// If spec table has a generation row get column count from the second row, otherwise get count from the first row
	if (specTable.find('tr.generation').length > 0) {
		var numCol = specTable.find('tr')[1].cells.length;
	} else {
		var numCol = specTable.find('tr')[0].cells.length;
	}
	for(var i=1;i<numCol;i++) {	
		var rowArray = new Array();
		specTableRows.find("td:eq("+i+")").each(function(index,value) {	
			if($(this).attr('colspan')) {
				return true;
			}
			rowArray.push($(this).html());	
		});
		details.push(rowArray);
	};
}

/* Product Specification Table Alignment
 * Refactored 2012.01.25 DMB
 * This function sets up the click event listeners for what's different and what's the same. 
 * It first grabs all the rows of the spec table, calls initCompareArray to store the data 
 * in an array, then runs it through a few loops to compare them and adds a class accordingly.
 * Note that the details array only contains the spec data so when adding a class there is an offset
 * to the current index value so the correct row is selected.
 *
 * There is a second set of commands that this function does that appears to calculate the dimensions of the table.
 * I believe it is for the scrolling functionality but left as is.
*/
details = new Array();

function AlignSpecificationTable(){
	if ($('#specsTabInit').val() == 0){
		var specTableRows = $('.specProdHold .specificationTable tbody tr');
		initTabs('#main', '.tabset li', '.tabBox .tabEl');	
		initCompareArray(specTableRows);
		$('#btnDifferent').click(function(event) { 		
			event.preventDefault();	
			specTableRows.find("td").removeClass('coloredSection');
			//loop for the number of rows of the first column of details array. Assumes all columns have same number of rows.
			for (var k = 0; k < details[0].length; k++)
			{
				var different = false;
				
				// loop for the number of columns in the details array.
				for(var m = 0; m < details.length; m++)
				{
					// nested loop for the number of columns in the details array.
					for (var n = 0; n < details.length; n++)
					{
						if (m != n)
						{
							 //STX-1290
							if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
							{
								//STX-1290
								different = true;
								specTableRows.eq(k+1).find("td").addClass("coloredSection");						
								break;
							}
						}
					}
					if (different) break;
				}
			}		
		});	
		$('#btnSame').click(function(event) {
			event.preventDefault();		
			specTableRows.find("td").removeClass('coloredSection');
				for (var k = 0; k < details[0].length; k++)
				{
					var different = false;
					//STX-1290 
					var space = false;
					for(var m = 0; m < details.length; m++)
					{
						for (var n = 0; n < details.length; n++)
						{
							if (m != n)
							{																							
								if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
								{								
									different = true;								
									break;
								}
								if (jQuery.trim(details[n][k])!="&nbsp;") space=true;
							}
						}
						if (different) break;
					}
					if (space && !different)
					{
						specTableRows.eq(k+1).find("td").addClass("coloredSection");
					}
					//STX-1290
				}		
		}); 
		//These functions get dimensions of the table and establish alignment???
		$('td.cel').eq(0).children('table').find('tr').each(function(index) {
			var max_right_height = $(this).height();
			var max_left_height = $('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).innerHeight();	 
			var heights = [];
			var max_left_row
			$('td.cel').each(function() {
				max_left_row = $(this).children('table').find('tr').eq(index).children('td').innerHeight();
				heights.push(max_left_row);
			});
			var maxHeight = Math.max.apply(this, heights); 			
			if (maxHeight>=max_left_height){		 
				$('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).height(maxHeight+'px');
				$('td.cel').each(function() {
					 $(this).children('table').find('tr').eq(index).children('td').height(maxHeight+'px');
				})
			}
			if (maxHeight<=max_left_height){			
				$('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).height(max_left_height+'px');
				$('td.cel').each(function() {
					 $(this).children('table').find('tr').eq(index).children('td').height(max_left_height+'px');
				})
			}		
		});
		// Lower Table	
		$('td.column_lower').children('table').find('tr').each(function(index) { 
			var max_right_height = $(this).height();
			var max_left_height = $('td.model').find('table').find('tr').find('td').eq(index).innerHeight();	 
			var heights = [];
			var max_left_row;
			$('td.column_lower').each(function() {
				max_left_row = $(this).children('table').find('tr').eq(index).children('td').innerHeight();
				heights.push(max_left_row);
			});
			var maxHeight = Math.max.apply(this, heights); 
			if (maxHeight>=max_left_height){		
				$('td.model').find('table').find('tr').find('td').eq(index).height(maxHeight+1+'px');
				$('td.column_lower').each(function() {
					 $(this).children('table').find('tr').eq(index).children('td').height(maxHeight+1+'px');
				})
			}
			if (maxHeight<=max_left_height){		
				$('td.model').find('table').find('tr').find('td').eq(index).height(max_left_height+'px');
				$('td.column_lower').each(function() {
					 $(this).children('table').find('tr').eq(index).children('td').height(max_left_height+'px');
				})
			}		
		})
		// Lower Table
		$('#specsTabInit').val(1);
	}
}



            
function goToProductTab(currentTab) {
	if(document.getElementById("Ajax" + currentTab.charAt(0).toUpperCase() + currentTab.slice(1) + "Box") !== null) {	
			var loc = new String(window.location);
			if(currentTab == 'overviewTab')
			{
				if(document.getElementById('overviewTab'))
				{
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodoverview').addClass('active');
							$('.pdpTab').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block'); 
                    		if( $('#' + currentTab).parent().hasClass('pdpTab'))
                    		{
                    			$('#' + currentTab).parent().css('display', 'block');
                    		}
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === false){
                    				slideDownConfigurator();
                    			} else {
                    				slideUpConfigurator();
                    			}
                    		}
				}
				//this segment will never execute unless we decide to load overview on click only too.
				/*else if(document.getElementById('AjaxOverviewTabBox'))
				{
            		$.ajax({
                		type: "GET",
                		url: loc.substring(0, loc.indexOf("?"))+"?tabName=pdpOverview&ajax=1",
                		dataType: "text",
                		success: function(text) { 
                    		document.getElementById("AjaxOverviewTabBox").innerHTML= text;
                    		var x = document.getElementById("AjaxOverviewTabBox").getElementsByTagName("script");   
                    		for(var i=0;i<x.length;i++) {  
                        		eval(x[i].text);  
                    		}
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodoverview').addClass('active');
                    		for(var z=0; z<4; z++){
                    			$('.tabBox:eq(0) > div:eq(' +z+ ') > div').css('display', 'none');
                    		}
                    		$('.tabBox:eq(0) > div:last').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block'); 
                    		$("div.sideBar_productInfoTop").css('margin-top', $("#productConfigurator").height());
                    		showGallery();
                    		 if(document.getElementById('productConfigurator')!=null){
            						$('#productConfigurator').ProductConfigurator();         
                					if(document.getElementById('productConfigurator')!=null){
                    				    if(configuratorCollapsed === null || configuratorCollapsed === false){
                    					   slideDownConfigurator();
                    				    } else {
                    					slideUpConfigurator();
                    		             }
                    		          }
        					 }
                		}
            		});
            	}*/
			}
			else if(currentTab == 'featuresTab') 
			{
				if(document.getElementById('featuresTab'))
				{
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodfeatures').addClass('active');
                    		$('.pdpTab').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block'); 
                    		if( $('#' + currentTab).parent().hasClass('pdpTab'))
                    		{
                    			$('#' + currentTab).parent().css('display', 'block');
                    		}
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === false){
                    				slideDownConfigurator();
                    			} else {
                    				slideUpConfigurator();
                    			}
                    		}
				}
				else if(document.getElementById('AjaxFeaturesTabBox'))
				{            		
            		$.ajax({
                		type: "GET",
                		url: loc.substring(0, loc.indexOf("?"))+"?tabName=pdpFeatures&ajax=1",
                		dataType: "text",
                		success: function(text) {
                    		document.getElementById("AjaxFeaturesTabBox").innerHTML= text;
                    		var x = document.getElementById("AjaxFeaturesTabBox").getElementsByTagName("script");   
                    		for(var i=0;i<x.length;i++) {  
                        		eval(x[i].text);  
                    		}
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodfeatures').addClass('active');
                    		$('.pdpTab').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block'); 
                    		if( $('#' + currentTab).parent().hasClass('pdpTab'))
                    		{
                    			$('#' + currentTab).parent().css('display', 'block');
                    		}
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === false){
                    				slideDownConfigurator();
                    			} else {
                    				slideUpConfigurator();
                    			}
                    		}
                    		$("div.sideBar_productInfoTop").css('margin-top', $("#productConfigurator:visible").height());
               	 		}
            		});
            		//goToProductTab(currentTab);
            	}
			}else if(currentTab == 'accessoriesTab') 
			{
                if(document.getElementById('accessoriesTab'))
				{
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodaccessories').addClass('active');
                    		$('.pdpTab').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block');
                    		if( $('#' + currentTab).parent().hasClass('pdpTab'))
                    		{
                    			$('#' + currentTab).parent().css('display', 'block');
                    		}
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === true){
                    				slideUpConfigurator();
                    			} else {
                    				slideDownConfigurator();
                    			}
                    		}
                }
				else if(document.getElementById('AjaxAccessoriesTabBox'))
				{
                    $.ajax({
                        type: "GET",
                        url: loc.substring(0, loc.indexOf("?"))+"?tabName=pdpAccessories&ajax=1",
                        dataType: "text",
                        success: function(text) {
                            document.getElementById("AjaxAccessoriesTabBox").innerHTML= text;
                            $('.tabset').find('li').removeClass('active');
                            $('#li-prodaccessories').addClass('active');
                            $('.pdpTab').css('display', 'none');
                            $('#' + currentTab).css('display', 'block');
                            if( $('#' + currentTab).parent().hasClass('pdpTab'))
                            {
                                $('#' + currentTab).parent().css('display', 'block');
                            }
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === true){
                    				slideUpConfigurator();
                    			} else {
                    				slideDownConfigurator();
                    			}
                    		}
                            $("div.sideBar_productInfoTop").css('margin-top', $("#productConfigurator:visible").height());							
                        }
                    });
                }
			 }//              
			 else if(currentTab == 'specificationsTab') 
			 {
				 AlignSpecificationTable();
				if(document.getElementById('specificationsTab'))			
				{
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodspecification').addClass('active');
                    		$('.pdpTab').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block'); 
                    		if( $('#' + currentTab).parent().hasClass('pdpTab'))
                    		{
                    			$('#' + currentTab).parent().css('display', 'block');
                    		}
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === true){
                    				slideUpConfigurator();
                    			} else {
                    				slideDownConfigurator();
                    			}
                    		}
				}
				else if(document.getElementById('AjaxSpecificationsTabBox'))
				{
            		$.ajax({
                		type: "GET",
                		url: loc.substring(0, loc.indexOf("?"))+"?tabName=pdpSpecs&ajax=1",
                		dataType: "text",
                		success: function(text) {
                    		document.getElementById("AjaxSpecificationsTabBox").innerHTML= text;
                    		var x = document.getElementById("AjaxSpecificationsTabBox").getElementsByTagName("script");   
                    		for(var i=0;i<x.length;i++) {  
                    	    	eval(x[i].text);  
                    		} 
                    		$('.tabset').find('li').removeClass('active');
                    		$('#li-prodspecification').addClass('active');
                    		$('.pdpTab').css('display', 'none');
                    		$('#' + currentTab).css('display', 'block');                     		
                    		if( $('#' + currentTab).parent().hasClass('pdpTab'))
                    		{
                    			$('#' + currentTab).parent().css('display', 'block');
                    		}
                    		if(document.getElementById('productConfigurator')!=null){
                    			if(configuratorCollapsed === null || configuratorCollapsed === true){
                    				slideUpConfigurator();
                    			} else {
                    				slideDownConfigurator();
                    			}
                    		}
                    			// set scrollbar for top table
							$('.specTableProduct .contentScroll').jScrollPane({
							showArrows: true,
							horizontalGutter: 30
							});
                		}
            		});
            		//goToProductTab(currentTab)
            	}
			}
			//$('#' + currentTab).css('display', 'block')
			//document.getElementById(currentTab).style.display = 'block';
	}
	window.scrollTo(0,0);
}
//this function includes all necessary js files for the application
function includeScript(srcPath,idVar)
{

  var script  = document.createElement('script');
  script.src  = srcPath;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementById(idVar).appendChild(script);
}

function createAccessoriesResellersLinks() {
	var RGID = getRGID(rcLocaleJS, 'embed');
	$('.ciModelNumber').each(function(index) {
		var sku = $(this).text();
		$.getScript("http://seagate.links.channelintelligence.com/scripts/cii_CBL_DataService.asp?sSKU=" + sku + "&nRGID=" + RGID, function() { 
			var ciButtonScript = "cii_ShowCBLButton('" + sku + "', oCIIPrimaryLink, oCIIAlternateLink, " + (index+2) + ", '" + RGID + "', CI_LinkID);";
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

//ecommerce expansion
var accessories_dr_locale ="";
var accessories_currentPid ="";
var accessories_ecomm_currency="";
var accessories_ecommLocale = "";
if(getCookie('ecommSessionCookie')!=null && getCookie('ecommSessionCookie')!=undefined && getCookie('ecommSessionCookie')!=""){		
	accessories_ecommLocale=getCookie('ecommSessionCookie');
}else if(getCookie('ecommLocaleCookie')!=null && getCookie('ecommLocaleCookie')!=undefined && getCookie('ecommLocaleCookie')!=""){
	accessories_ecommLocale=getCookie('ecommLocaleCookie');
}else{
	accessories_ecommLocale=rcLocaleJS;
}
if(ecommLocaleMap!=null || ecommLocaleMap!=undefined){
	for (var i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == accessories_ecommLocale){
			accessories_dr_locale = ecommLocaleMap.ecommLocalesList[i].drLocale;
			accessories_ecomm_currency = ecommLocaleMap.ecommLocalesList[i].currency;
			break;
		}
	}
}
var gsaFeedFlag = false;
if(gsaEcommLocaleMap!=null || gsaEcommLocaleMap!=undefined ){
	for (var i = 0; i < gsaEcommLocaleMap.gsaEcommLocalesList.length; i++) {							
		if (gsaEcommLocaleMap.gsaEcommLocalesList[i].ecommLocale == accessories_ecommLocale){								
			gsaFeedFlag = true;
			break;
		}
	}
}
function addToCart(drid) {
	var addToCartUrl = 'http://shop.seagate.com/store/sgateus/' + accessories_dr_locale + '/buy/productID.' + drid + '/quantity.1/Currency.' + accessories_ecomm_currency;
	
	document.location = addToCartUrl;
}

$(document).ready(function(){
	if($("div.container_12.accessories")[0]!=undefined){
			if(gsaFeedFlag){
				var DR_preorder = $("#DR_preorder").val();
				var DR_instock = $("#DR_instock").val();
				var DR_outofstock = $("#DR_outofstock").val();
				var DR_backorder = $("#DR_backorder").val();
				var SG_preorder = $("#SG_preorder").val();
				var SG_instock = $("#SG_instock").val();
				var SG_outofstock = $("#SG_outofstock").val();
				var SG_backorder = $("#SG_backorder").val();
				var AddToCartText = $("#addToCartText").val(); 
				var btnAddToCartClass = "btnOrangeMiddle";
				var btnAddToCartClassDisabled = "btnGreyMd";
				var drids="";			
				$("div.prodBox").each(function(i){
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
								  var $div = $("div.prodBox[data-drid='"+productid+"']");
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
				createAccessoriesResellersLinks();
			}
		}	
	
});