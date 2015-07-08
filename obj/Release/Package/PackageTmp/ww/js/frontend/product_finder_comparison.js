/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:35
 */

var details = new Array();
var prolength = 0;
$(document).ready(function() {

    //initTabs('.tabBox', '.tabList li', '.tabContent .tab');
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');
        
    initCompareArray();
	
	$('.comparisonHold').each(function() {
            $(this).children('table').children('tbody').children('tr').eq(2).find('td.itemDetail').each(function() {
                $(this).find('td').removeClass('bg');
            });
        });
	
	$('.btnDifferent').click(function(event) {                
		event.preventDefault();	
        var curr_index = $(this).index('.btnDifferent'); 
		$('.comparisonHold').eq(curr_index).children('table').children('tbody').children('tr').eq(2).find('td.itemDetail').each(function() {
			$(this).find('td').removeClass('bg');
		}); 
		var start=0; var end=1;
		if(details.length>0){
			var startRow=details[0];
			for(var i=0;i<startRow.length;i++){
				var different = false;				
				for(var k=1;k<details.length;k++){					
					if (jQuery.trim(details[0][i]) != jQuery.trim(details[k][i])){
						different = true;
						$('.comparisonHold').eq(curr_index).children('table').children('tbody').children('tr').eq(2).find('td.itemDetail').each(function() {						
							$(this).find('td').eq(i).addClass('bg')
						});								
						break; 	
					}  
				}
			}
		}              
	});	
	$('.btnSame').click(function(event) {
		event.preventDefault();	
        var curr_index = $(this).index('.btnSame');
		$('.comparisonHold').eq(curr_index).children('table').children('tbody').children('tr').eq(2).find('td.itemDetail').each(function() {
			$(this).find('td').removeClass('bg');
		});
		var start=0; var end=1;
		if(details.length>0){
			var startRow=details[0];
			var different = false;				
			for(var i=0;i<startRow.length;i++){							
				for(var k=1;k<details.length;k++){	
				var space = false;
					if (jQuery.trim(details[0][i]) != jQuery.trim(details[k][i])){ 																		
							different = true;					 	
							break;
					} 
					if (jQuery.trim(details[k][i])=="<span>&nbsp;</span>") space=true;
					if (!space && different){
						$('.comparisonHold').eq(curr_index).children('table').children('tbody').children('tr').eq(2).find('td.itemDetail').each(function() {						
							$(this).find('td').eq(i).addClass('bg')
						});								
					}
					
				}
				
			}
		}             
	});
});
function initCompareArray()
{
	$('.comparisonHold > table').each(function() {
            var superArray = new Array();
            $(this).children('tbody').children('tr').eq(2).find('td.itemDetail').each(function(index) {		
				var rowArray = new Array();		
				$(this).find('td').each(function() {			
					rowArray.push($(this).html());
					
				});
				prolength = index
				details.push(rowArray);                
            });	
            //superArray.pop();
           // details.push(superArray);
        });        
}