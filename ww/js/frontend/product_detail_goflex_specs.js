/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 11:05
 */

var details = new Array();
function AlignSpecificationTable(){ 
//init tabs
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	
	initCompareArray();
	
	$('.cel > table').each(function() {
		$(this).find('tr').removeClass('coloredSection');
	});
	
	$('#btnDifferent').click(function(event) { 		
		event.preventDefault();	
		$('.cel > table').each(function() {
			$(this).find('tr').removeClass('coloredSection');
		});
			for (var k = 0; k < details[0].length; k++)
			{
				var different = false;
				for(var m = 0; m < details.length; m++)
				{
					for (var n = 0; n < details.length; n++)
					{
						if (m != n)
						{ /* STX-1290 */
							if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
							{/* STX-1290 */
								different = true;
								$('.cel > table').each(function() {
									if ($(this).find('tr').eq(k).find('td').eq(0).hasClass('dividerCell'))
									{
										$(this).find('tr').eq(k).addClass('coloredSection');
									}
									$(this).find('tr').eq(k+1).addClass('coloredSection');
									
									if ($(this).find('tr').eq(k+2).find('td').eq(0).hasClass('borderCell'))
									{
										$(this).find('tr').eq(k+2).addClass('coloredSection');
									}
								});								
								break;
							}
						}
					}
					if (different) break;
				}
			}		
	});
	
	$('#btnSame').click(function(event) {
		event.preventDefault();		
		$('.cel > table').each(function() {
			$(this).find('tr').removeClass('coloredSection');
		});
			for (var k = 0; k < details[0].length; k++)
			{
				var different = false;
				/* STX-1290 */
				var space = false;
				for(var m = 0; m < details.length; m++)
				{
					for (var n = 0; n < details.length; n++)
					{
						if (m != n)
						{																							
							if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
							{								
								different = true;								
								break;
							}
								if (jQuery.trim(details[n][k])!="&nbsp;") space=true;
						}
					}
					if (different) break;
				}
				if (space && !different && !$('.cel > table').eq(0).find('tr').eq(k+1).find('td').eq(0).hasClass('dividerCell') && !$('.cel > table').eq(0).find('tr').eq(k+1).find('td').eq(0).hasClass('borderCell') && !$('.cel > table').eq(0).find('tr').eq(k+1).hasClass('row'))
				{
					$('.cel > table').each(function() {
						if ($(this).find('tr').eq(k).find('td').eq(0).hasClass('dividerCell'))
						{
							$(this).find('tr').eq(k).addClass('coloredSection');
						}
						$(this).find('tr').eq(k+1).addClass('coloredSection');						
						if ($(this).find('tr').eq(k+2).find('td').eq(0).hasClass('borderCell'))
						{
							$(this).find('tr').eq(k+2).addClass('coloredSection');
						}
					});
				}
				/* STX-1290 */
			}		
	}); 
	$('td.cel').eq(0).children('table').find('tr').each(function(index) {
		var max_right_height = $(this).height();
	/* STX */
		 var max_left_height = $('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).innerHeight();	 
	var heights = [];
	var max_left_row
		$('td.cel').each(function() {
			max_left_row = $(this).children('table').find('tr').eq(index).children('td').innerHeight();
			heights.push(max_left_row);
		});
		var maxHeight = Math.max.apply(this, heights); 			
		if (maxHeight>max_left_height){			
			$('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).height(maxHeight+'px');
			$('td.cel').each(function() {
				 $(this).children('table').find('tr').eq(index).children('td').height(maxHeight+'px');
			})
		}
		if (maxHeight<max_left_height){			
			$('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).height(max_left_height+'px');
			$('td.cel').each(function() {
				 $(this).children('table').find('tr').eq(index).children('td').height(max_left_height+'px');
			})
		}		
	});

	$('.specTableProduct .contentScroll').jScrollPane(
		{
			showArrows: true,
			horizontalGutter: 30
		}
	);

}
$(document).ready(function() {
$('.slideArea').navSlider();


//init tabs
	initTabs('#main', '.tabset li', '.tabBox .tabEl');
	
	initCompareArray();
	
	$('.cel > table').each(function() {
		$(this).find('tr').removeClass('coloredSection');
	});
	
	$('#btnDifferent').click(function(event) { 
		event.preventDefault();		
		$('.cel > table').each(function() {
			$(this).find('tr').removeClass('coloredSection');
		});
			for (var k = 0; k < details[0].length; k++)
			{
				var different = false;
				for(var m = 0; m < details.length; m++)
				{
					for (var n = 0; n < details.length; n++)
					{
						if (m != n)
						{/* STX-1290 */
							if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
							{/* STX-1290 */
								different = true;
								$('.cel > table').each(function() {
									if ($(this).find('tr').eq(k).find('td').eq(0).hasClass('dividerCell'))
									{
										$(this).find('tr').eq(k).addClass('coloredSection');
									}
									$(this).find('tr').eq(k+1).addClass('coloredSection');
									
									if ($(this).find('tr').eq(k+2).find('td').eq(0).hasClass('borderCell'))
									{
										$(this).find('tr').eq(k+2).addClass('coloredSection');
									}
								});								
								break;
							}
						}
					}
					if (different) break;
				}
			}		
	});
	
	$('#btnSame').click(function(event) {
		event.preventDefault();		
		$('.cel > table').each(function() {
			$(this).find('tr').removeClass('coloredSection');
		});
			for (var k = 0; k < details[0].length; k++)
			{
				var different = false;
				/* STX-1290 */
				var space = false;
				for(var m = 0; m < details.length; m++)
				{
					for (var n = 0; n < details.length; n++)
					{
						if (m != n)
						{																							
							if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
							{								
								different = true;								
								break;
							}
								if (jQuery.trim(details[n][k])!="&nbsp;") space=true;
						}
					}
					if (different) break;
				}
				if (space && !different && !$('.cel > table').eq(0).find('tr').eq(k+1).find('td').eq(0).hasClass('dividerCell') && !$('.cel > table').eq(0).find('tr').eq(k+1).find('td').eq(0).hasClass('borderCell') && !$('.cel > table').eq(0).find('tr').eq(k+1).hasClass('row'))
				{
					$('.cel > table').each(function() {
						if ($(this).find('tr').eq(k).find('td').eq(0).hasClass('dividerCell'))
						{
							$(this).find('tr').eq(k).addClass('coloredSection');
						}
						$(this).find('tr').eq(k+1).addClass('coloredSection');						
						if ($(this).find('tr').eq(k+2).find('td').eq(0).hasClass('borderCell'))
						{
							$(this).find('tr').eq(k+2).addClass('coloredSection');
						}
					});
				}
				/* STX-1290 */
			}		
	}); 

	$('td.cel').eq(0).children('table').find('tr').each(function(index) {
		var max_height = $(this).height();
		$('td.cel').each(function() {
			if (max_height < $(this).children('table').find('tr').eq(index).height()) max_height = $(this).children('table').find('tr').eq(index).height();
		});
		$('td.cel').each(function() {
			$(this).children('table').find('tr').eq(index).height(max_height);
			//$(this).children('table').find('tr').eq(index).children('td').height(max_height);
		});
		$('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').eq(index).height(max_height);
	});

	$('.specTableProduct .contentScroll').jScrollPane(
		{
			showArrows: true,
			horizontalGutter: 30
		}
	);

});

function initCompareArray()
{
	$('.cel > table').each(function() {		
		var rowArray = new Array();		//
		$(this).find('td').each(function() {			
			rowArray.push($(this).html());
		});				
		details.push(rowArray);
	});	
}


