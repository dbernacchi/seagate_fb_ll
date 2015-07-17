/**
 * @author Mamliga
 */
var box_index = 2;
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
	//init ezmar
	$('.registerFrm input[type="radio"]').ezMark();
	//cusel init
/*	var params = {
		changedEl: ".registerFrm select",
		visRows: 5,
		scrollArrows: true
	}
	cuSel(params);
	//cusel init
	var params = {
		changedEl: ".regFrm select",
		visRows: 5,
		scrollArrows: true
	}
	cuSel(params);
*/
        
        $('.btnLogin').click(function(event) {
           event.preventDefault(); 
           $('.box').eq(box_index).css('display', 'none');
           box_index--;
           $('.box').eq(box_index).css('display', 'block');
        });
        
        $('.btnNext').click(function(event) {
            event.preventDefault();            
            if (box_index > 0)
            {
                $('.box').eq(box_index).css('display', 'none');
                box_index--;
                $('.box').eq(box_index).css('display', 'block');
            }
        });
});
