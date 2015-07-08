/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 15:16
 */
$(document).ready(function() {
//init tabs
    //initTabs('.tabBox', '.tabList li', '.tabContent .tab');
    //initTabs('#main', '.tabset li', '.tabBox .tabEl');

    
	$('#acceptEULA').click(function() {
		$('.stepList .btnTealLrg').addClass('active');
		$('.stepList .btnTealLrg').removeClass('btn-bs-ter');
		$('.introHolder').removeClass('active');
		$(".secondlevel").slideToggle('hidethis');
	});
	//init accordion
	$('ul.accordion').accordion({
		active: ".selected",
		autoHeight: false,
		header: ".openLink",
		collapsible: true,
		event: "click"
	});
	 //$('#productConfigurator').ProductConfigurator();
});