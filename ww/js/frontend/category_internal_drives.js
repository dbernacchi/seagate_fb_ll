/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 13:35
 */
var mousedowned = false;

/*function initCategorySlider(ind){ 
	 $('.slideArea').navSlider_Category( {
        'navigate'  		: false,
        'automove'  		: false,
        'moveArea'  		: '.tableProductHold',
		'moveAreaCaption'	: '.tableCaptionAllHold',
		'moveAreaIndex'		: ind,
        'sliderWidth'   	: 234
    } );
}*/

var a1 = $('.tabContent .tableProductCateg');
a1.each(function (i) {
	//alert($(this).find('.slideArea').html());
	var j = i + 1;
	$(this).find('.slideArea').navSlider_Category({
		'sliderLine'    : '.tabContent .tableProductCateg:nth-child(' + j + ') .slideArea .slider',
		'sliderButton'  : '.tabContent .tableProductCateg:nth-child(' + j + ') .slideArea .sliderButton',
		'navigate'  : false,
		'automove'  : false,
		'moveArea'  : '.tabContent .tableProductCateg:nth-child(' + j + ') .tableProductHold, .tabContent .tableProductCateg:nth-child(' + j + ') .tableCaptionAllHold',
		'sliderWidth'   : 234
	});
});

$(document).ready(function() {
	$("ul.specs li:last-child").css('padding-right', '0');
		
    var supportCornerUrl = $('#supportCorner').attr('href');
    var infoCornerUrl = $('#infoCorner').attr('href');
    
    var sc_width = $('#supportCorner').outerWidth();
    var sc_left = 0;
    if ($('#supportCorner').offset() != null)
        sc_left = $('#supportCorner').offset().left;
    var ic_width = $('#infoCorner').outerWidth();
    var sb_width = $('#sliderButton').outerWidth();


	$('#supportCorner').click(function(event) {
        event.preventDefault();
    });

    $('#infoCorner').click(function(event) {
        event.preventDefault();
    });

    $('#supportCorner').mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '+118'}, 500, function() {window.location = supportCornerUrl;});
        mousedowned = false;
    });

    $('#infoCorner').mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '-10'}, 500, function() {window.location = infoCornerUrl;});
        mousedowned = false;
    });
/*
    $('#sliderBox').mousedown(function(event) {
        event.preventDefault();
        oldpos = event.pageX;
        mousedowned = true;
        $(document).trigger(mouseup);
    });

    $(document).mouseup(function(event) {
        event.preventDefault();
        if (mousedowned)
        {
            if ($('#sliderButton').offset().left > 1100)
            {
                $('#sliderButton').animate({ left: 118}, 500, function() { window.location = supportCornerUrl; });
            }
            else
            {
                $('#sliderButton').animate({ left: -10}, 500, function() { window.location = infoCornerUrl; });
            }
        }
        mousedowned = false;
    });
*/
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

	$("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);

    jQuery('.carousel').fadeGallery({
		listSelector: '.fadeGallery> li',
		navHolder:		'div.switcher',
		navCreate:		true,
		// swichTime:		3000,
		// delay:			800,
		fadeIEfix:		false
	});


//init tabs
	//initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');
	
	/* Model Color Display Div */
   $('.modelColorId').each(function(index) {
	   var divColor = $(this).children().filter(':input').val();
	   if (divColor){
		   var selected = divColor.split(","); 
		   var writecolor = '<div style="float:left; height:18px; border:1px solid #999; padding:0px; margin:0px;"><div style="position:relative; height:0px; z-index:10; top:0px; left:0px; padding:0px;"><img src="/ww/images/global/pic/productColorBack.png" height="18" style="border:none; padding:0px; margin:0px; width:44px;" alt="" /></div>';
		   if(selected.length == 1){
			   var colorWidth = 45;
		   }
		   if(selected.length == 2){
			   var colorWidth = 22.5;
		   }
		   if(selected.length == 3){
			   var colorWidth = 15;
		   }
   		   if(selected.length == 4){
			   var colorWidth = 11;
		   }
		   for(i=0; i<selected.length; i++){
		   		writecolor += '<div style="float:left; padding:0px; position:relative; height:18px; background-color:'+selected[i]+'; width:'+colorWidth+'px"></div>';
		   }
		   writecolor += '</div>'
			$(this).html(writecolor);
	   }	   
	});
	/* Model Color Display Div */
	/* Enable SliderBox in Sub-category Enterprise */
	// initCategorySlider();	
	/* Enable SliderBox in Sub-category Enterprise */		
});

window.onload = function() {

    if($("#promoSwfFileId").val()!=undefined && $("#promoSwfFileId").val()=='true'){

	swfobject.embedSWF($("#promoSwfFileValueId").val(),'flashContainerSub' ,'980', '280', '9.0.0', 'swf/expressInstall.swf', {}, {
	    wmode: 'transparent'
	}, {}, function result(e) {
	    if (e.success==false)
	    {
		if($("#promoMediumImageId").val()!=undefined && $("#promoMediumImageId").val()=='true'){
		    $("#fullBannerId").removeClass('displayNone');
		}else if($("#promoSmallImageId").val()!=undefined && $("#promoSmallImageId").val()=='true'){
		    $("#halfBannerId").removeClass('displayNone');
		    $("#halfBannerPromoTextId").removeClass('displayNone');
		    $("#fullBannerId").addClass(' displayNone');
		    $("#fullBannerPromoTextId").addClass(' displayNone');
		}else{
			$("#halfBannerPromoTextId").removeClass('displayNone');
			$("#fullBannerPromoTextId").addClass(' displayNone');

		}

	    }
	});
    }else{
	if($("#promoMediumImageId").val()!=undefined && $("#promoMediumImageId").val()=='true'){
	    $("#fullBannerId").removeClass('displayNone');
	}else if($("#promoSmallImageId").val()!=undefined && $("#promoSmallImageId").val()=='true'){
	    $("#halfBannerId").removeClass('displayNone');
	    $("#halfBannerPromoTextId").removeClass('displayNone');
	    $("#fullBannerId").addClass(' displayNone');
	    $("#fullBannerPromoTextId").addClass(' displayNone');
	}else{
		    $("#halfBannerPromoTextId").removeClass('displayNone');
		    $("#fullBannerPromoTextId").addClass(' displayNone');

		}
    }
	
	showBanner($("#promoFlash"));
};

function showBannerFunction(bannerDiv, flashHolder, spanClassName, width, height){
	var flashDiv = $('<div></div>');
	$(flashDiv).attr('id', $(bannerDiv).find(flashHolder).attr('id') + '_Flash');
	$(bannerDiv).find(flashHolder).append(flashDiv);
	swfobject.embedSWF(
		$(bannerDiv).find(spanClassName).html(), 
		$(flashDiv).attr('id'), 
		width, height, '9.0.0', 
		'swf/expressInstall.swf', 
		{}, 
		{ wmode: 'transparent' }, 
		{}, 
		function result(e) {
			if (e.success==false) {
				$("#promoImage").css('display', 'block');
				$("#promoFlash").css('display','none');
			}
		});
}

function showBanner(bannerDiv){

    //decide to show flash or jpg
    //if flash exists try to show that, fall back on jpg
 	if($(bannerDiv).find('span.data.fullFlash').html()!=""){
	 	$(".promoHalfFlash").css('display','none');
		showBannerFunction(bannerDiv,".fullFlashHolder","span.data.fullFlash",980,280);
        /*var flashDiv = $('<div></div>');
        $(flashDiv).attr('id', $(bannerDiv).find('.flashHolder').attr('id') + '_Flash');
        $(bannerDiv).find('.flashHolder').append(flashDiv);
        swfobject.embedSWF(
			$(bannerDiv).find('span.flash').html(), 
			$(flashDiv).attr('id'), 
			"980", "280", '9.0.0', 
			'swf/expressInstall.swf', 
			{}, 
			{ wmode: 'transparent' }, 
			{}, 
			function result(e) {
            	if (e.success==false) {
                 	$("#promoImage").css('display', 'block');
					$("#promoFlash").css('display','none');
            	}
        	});
			*/
    }else if($(bannerDiv).find('span.data.halfFlash').html()!=""){
		$(".promoFullFlash").css('display','none');
		showBannerFunction(bannerDiv,".halfFlashHolder","span.data.halfFlash",490,100);
    }else {
		$("#promoImage").css('display', 'block');
		$("#promoFlash").css('display','none');	   
    }
}
