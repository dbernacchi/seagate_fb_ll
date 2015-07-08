/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 08.02.11
 * @time: 15:40
 */
$(document).ready(function() {
//init tabs
	//initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');
//init custom scroll
	$(function()
	{
		$('.mapPlaceholder .results').jScrollPane({showArrows: true});
	});

});