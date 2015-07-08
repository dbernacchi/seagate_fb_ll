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

    //changeRegion();
	// $('#productConfigurator').ProductConfigurator();

	if ($("input[id='region'][name='region']").length > 0) {
		$("input[id='region'][name='region']").each(function() {
			if ($(this).parents("div.phoneSupport tr").length > 0) {
				$(this).parents("div.phoneSupport tr").each(function(index, domEle) {
					if (index == 0) {
						$(domEle).remove();
					}
				});
			}
		});
	}
	
	$("#regionC").change(function() {
		var si = $("#regionC").val();
		$("#region-1").hide();
		$("#region-2").hide();
		$("#region-3").hide();
		$("#region-" + si).show();
	});
	
});

function changeRegion()
{
        
    var id = $('#region').val();
    $('.tableHold').find('table').find('tr').hide();
    $('.tableHold').find('table').find('tr').eq(0).show();
    $('.tableHold').find('table').find('tr').eq($('.tableHold').find('table').find('tr').length-1).show();
    $('.regions' + id).show();
}