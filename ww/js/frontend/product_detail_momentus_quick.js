/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 13:29
 */
var mousedowned = false;

$(document).ready(function() {

//init custom scroll
$(function() {
	$('.quickLinkBox .contentScrol').jScrollPane({showArrows: true});
	//initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');
	initTabs('.tabBox2', '.tabList2 li', '.tabContent2 .tab2');
	$('input.check').ezMark();
}); 
 $('#productConfigurator').ProductConfigurator();

});