var mousedowned = false;
var homepageBannerTimer = null; //referenced in onload function

$(document).ready(function(){		
	/*if(document.newsFeedForm.twitterID != undefined){
		getTwitterFeed(document.newsFeedForm.twitterID.value,"twitterFeed", "#newsFeed > li");	
	} else {*/
		$("#twitterFeed").remove();
		$('#newsBarHoldLI').fadeGallery({
			listSelector: '#newsFeed > li',
			navCreate:		true,
			swichTime:		7000,
			delay:			800,
			fadeIEfix:		false,
			mouseOverPause:	true
		});
	/*}*/
});

window.onload = function() {
	/*$('#newsBarHoldLI').fadeGallery({
		listSelector: '#newsFeed > li',
		navCreate:		true,
		swichTime:		7000,
		delay:			800,
		fadeIEfix:		false,
		mouseOverPause:	true
	});*/

	// loads product carousel
	$('.mainGallery').SlideCarousel();

    // creates button wrapper div for flash/javascript banner and appends them to flashFrame div
    buttonDiv = $('<div></div>');
    $(buttonDiv).attr('id', 'carouselButtons');
    $(buttonDiv).css('height', '10px');
    $(buttonDiv).css('position', 'absolute');
    if(rcLocaleJS=="ar-em"){
		$(buttonDiv).css('right', '50%');
		$(buttonDiv).css('margin-right', '420px');
	}else{
		$(buttonDiv).css('left', '50%');
		$(buttonDiv).css('margin-left', '420px');
	}
    $(buttonDiv).css('bottom', '10px');
    $(buttonDiv).css('z-index', '50');
    $(buttonDiv).css('min-width', '150px');
    $('.mainSliderHold  .flashFrame').append($(buttonDiv));

    /* finds banner divs, assigns unique ids to each, adds click event listeners and shows the first banner. Expects the following structure:
     * <div class="banner">
	 *	<div class="holder"></div>
 	 *	<span class="data playtime">5</span>
	 *	<span class="data link">url</span>
	 *  <span class="data imageSrc">imagePath</span>
	 *  <span class="data imageAlt">altText</span>
 	 *  <span class="data imageWidth">imageWidth</span>
	 *	<span class="data imageHeight">imageHeight</span>
	 *	<span class="data flash">urlToFlash</span>
	 *	<span class="data background-color">#000000</span>
	 * </div>
     */
    $('.mainSliderHold .flashFrame').find('div.banner').each(function(i,banner){
        
        $(banner).attr('id', 'Homepage_Carousel_' + i);
        $(banner).find('.holder').attr('id', 'Carousel_Holder_' + i);
		$(banner).find('.holder').click(function(){
            document.location = $(banner).find('span.data.link').text();
        });
        
        if($('.mainSliderHold .flashFrame').find('div[id^=Homepage_Carousel_]').length>1){
            $(banner).find('.holder').each(function(){
                            $(this).mouseenter(function(){
                                    clearTimeout(homepageBannerTimer);
                            }).mouseleave(function(){
                                    restartTimer($(this).parent());
                            });
            });
        }
					
        if(i > 0){
            $(banner).css('display', 'none');
        }

        //add the button container
        button = $('<a>&nbsp;</a>');
        $(button).addClass('switcher');
        $(button).click(function(){
            showBanner(banner);
        });
        $(buttonDiv).append($(button));
    });
        
    //displays the first banner
    $('.mainSliderHold .flashFrame').find('div[id^=Homepage_Carousel_]:first').each(function(){
        showBanner($(this));
    });
};

function showBanner(bannerDiv){
    
    //clear button state
    $(bannerDiv).parent().find('div[id^=carouselButtons] a.switcher').each(function(){
        $(this).removeClass('active');
    });

    //clear timer
    if(homepageBannerTimer!=null){
        clearTimeout(homepageBannerTimer);
    }

    //changes background color for current banner
    if($(bannerDiv).find('span.data.background-color').html()!=""){
        $(bannerDiv).parent().css('background-color', $(bannerDiv).find('span.data.background-color').html());
    } else {
        $(bannerDiv).parent().css('background', 'none');
    }

    //hide all banners
    $(bannerDiv).parent().find('div[id^=Homepage_Carousel_]').each(function(index, e){

        //set button state
        if($(e).attr('id') == $(bannerDiv).attr('id')){
            var btn =$(bannerDiv).parent().find('div[id^=carouselButtons] a.switcher').get(index);
            $(btn).addClass('active');
        }
	    $(this).find('.holder').html('');
        $(this).css('display', 'none');
    });
    
    //decide to show flash or jpg
    //if flash exists try to show that, fall back on jpg
	if($(bannerDiv).find('span.data.flash').html()!=""){
	    var flashDiv = $('<div></div>');
	    $(flashDiv).attr('id', $(bannerDiv).find('.holder').attr('id') + '_Flash');
	    $(bannerDiv).find('.holder').append(flashDiv);
	    swfobject.embedSWF($(bannerDiv).find('span.data.flash').html(), $(flashDiv).attr('id'), "1168", "416", '9.0.0', 'swf/expressInstall.swf', {}, { wmode: 'opaque', scale: 'noscale' }, {}, function result(e) {
	        if (e.success==false)
	        {
	            var img = $('<img />');
	            $(img).attr('src',$(bannerDiv).find('span.data.imageSrc').html());
	            $(img).attr('alt',$(bannerDiv).find('span.data.imageAlt').html());
	            $(img).attr('width',$(bannerDiv).find('span.data.imageWidth').html());
	            $(img).attr('height',$(bannerDiv).find('span.data.imageHeight').html());
	            $(bannerDiv).find('.holder').html(img); 
	        }
	    });
    } else {
      	var img = $('<img />');
	    $(img).attr('src',$(bannerDiv).find('span.data.imageSrc').html());
	    $(img).attr('alt',$(bannerDiv).find('span.data.imageAlt').html());
	    $(img).attr('width',$(bannerDiv).find('span.data.imageWidth').html());
	    $(img).attr('height',$(bannerDiv).find('span.data.imageHeight').html());
	    $(bannerDiv).find('.holder').html(img);
    }

    //show this banner
    $(bannerDiv).fadeIn('slow');
    
    if($('.mainSliderHold .flashFrame').find('div[id^=Homepage_Carousel_]').length>1){
        restartTimer($(bannerDiv));
    } else {
        $('#carouselButtons').css('display', 'none');
    }
    //figure out if this is the last banner, if so next = first;
}

function restartTimer(bannerDiv){   
    nextBannerDiv = $(bannerDiv).next();
    if(nextBannerDiv.length==0){
        nextBannerDiv = $(bannerDiv).parent().find('div[id^=Homepage_Carousel_]:first');
    }

    //setTimeout to show next banner
    var playTime = $(bannerDiv).find('span.data.playtime').html();
    homepageBannerTimer = setTimeout('showBanner($(nextBannerDiv));', playTime * 1000);
}

