/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 13:29
 */
var mousedowned = false;

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
        $('#sliderButton').animate({left: '+118'}, 500, function() { window.location = supportCornerUrl; });
        mousedowned = false;
    });

    $('#infoCorner').mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '-10'}, 500, function() { window.location = infoCornerUrl; });
        mousedowned = false;
    });

    $('#sliderBox').mousedown(function(event) {
        event.preventDefault();
        oldpos = event.pageX;
        mousedowned = true;
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
	initTabs('.tabBoxQuick', '.tabListQuick li', '.tabContentQuick .tabQuick');
	$('.quickLinkBox .contentScrol').jScrollPane({showArrows: true});
	$('input.check').ezMark();

	$('.btnQuickLink').click(function(event) {
		event.preventDefault();
		if (!$('.quickLinkBox').hasClass('quickLinkBoxOpen'))
			$('.quickLinkBox').addClass('quickLinkBoxOpen');
		else
			$('.quickLinkBox').removeClass('quickLinkBoxOpen');
	});

	$('.model-shortlist').click(function(event) {
		event.preventDefault();
		$('.tooltipAdded').css('display', 'block');
	});

	$('#productConfigurator').ProductConfigurator( { url : 'json_data_file_momentus.txt', gallery: null, quick_links: true });

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

});