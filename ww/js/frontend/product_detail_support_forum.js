/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 15:21
 */
$(document).ready(function() {
//init tabs
    //initTabs('.tabBox', '.tabList li', '.tabContent .tab');
    //initTabs('#main', '.tabset li', '.tabBox .tabEl');
	//init accordion
	$('ul.accordion').accordion({
		active: ".selected",
		autoHeight: false,
		header: ".openLink",
		collapsible: true,
		event: "click"
	});
	 $('#productConfigurator').ProductConfigurator();
});