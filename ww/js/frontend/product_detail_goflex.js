/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 11:05
 */
var mousedowned = false;
/** Do No Remove.. Added for Bazaar Voice Start **/
	$('.reviwsTabs li:first-child').click(function() {
		$('.reviwsTabs li:nth-child(2)').removeClass('active');
		$('.reviwsTabs li:first-child').addClass('active');
		
		$('.tabContentReviews .tab:first-child').show();
		$('.tabContentReviews .tab:nth-child(2)').hide();
	});
	
	$('.reviwsTabs li:nth-child(2)').click(function() {
		$('.reviwsTabs li:nth-child(2)').addClass('active');
		$('.reviwsTabs li:first-child').removeClass('active');
		
		$('.tabContentReviews .tab:first-child').hide();
		$('.tabContentReviews .tab:nth-child(2)').show();
	});

/** Do No Remove.. Added for Bazaar Voice END **/

$(document).ready(function() {
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
    
    $('#sliderBox').attr('unselectable', 'on');

    $('#sliderBox').mousedown(function(event) {
        event.preventDefault();
        event.stopPropagation();
        oldpos = event.pageX;
        mousedowned = true;
    });     

    $(document).mouseup(function(event) {
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

	
        
        $('#productConfigurator').ProductConfigurator();

//init tabs
	//initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');

	slideDownConfigurator();

	$('.tabset li').click(function(event) {
		event.preventDefault();
		if ( $(this).index('.tabset li') == 0 )
		{
			slideDownConfigurator();
		}
		else
		{
			slideUpConfigurator();
		}
	});
	$('.specTableProduct .contentScroll').jScrollPane(
		{
			showArrows: true,
			horizontalGutter: 30
		}
	);

});

function slideUpConfigurator()
{
	var _parentSlide = '.infoGoods';
    var _linkSlide = '.btnConfigure';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'infoGoodsOpen';
    var _durationSlide = 300;


    $(_linkSlide).parents(_parentSlide).removeClass(_openClassS);
    $(_linkSlide).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
}

function slideDownConfigurator()
{
	var _parentSlide = '.infoGoods';
    var _linkSlide = '.btnConfigure';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'infoGoodsOpen';
    var _durationSlide = 300;

	$(_linkSlide).parents(_parentSlide).addClass(_openClassS);
    $(_linkSlide).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
}