/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 13:31
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

	$('#ALGContainer').ALGGallery({
		'elements' : '#MyThumbnails',
		'text'     : '#MyText'
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
	 $('#productConfigurator').ProductConfigurator();


//init tabs
	//initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');

});