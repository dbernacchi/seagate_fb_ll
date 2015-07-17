/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:39
 */
$(document).ready(function() {
    //init tabs
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
/*
    var max_height = 0;
    $(".tabList").find('a').each(function() {
        if ($(this).height() > max_height) max_height = $(this).height();
    });    
    $(".tabList").find('a').each(function() {
        $(this).height(max_height);        
    });
    $('.spacer').height(max_height);
*/
});