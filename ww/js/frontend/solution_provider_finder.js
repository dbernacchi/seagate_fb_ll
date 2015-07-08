/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 13:44
 */
$(document).ready(function() {
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
	
	$('input').ezMark();


//init tabs
	//initTabs('.filterForm', '.tabFilter li', '.tabContent .tab');
        
        $('.checkbox').change(function(event) {
           if ($(this).is(':checked')) {
               var label = $('label[for=' + $(this).attr('id') +']').html();               
               var block = '<li id="li_' + $(this).attr('id') +'"><a class="btnClose" href="#" rel="' + $(this).attr('id') + '">close</a><span>' + label + '</span></li>';
               var fullhtml = $('.filterParams').html() + block;
               $('.filterParams').html(fullhtml);
               assignCloseClick();
           }
           else
           {
              $('#li_' + $(this).attr('id')).remove();     
           }
        });   
        
        $('.btnReset').click(function(event) {
            event.preventDefault();
            /*$('.filterParams').find('li').each(function() {
               $(this).remove();
            });   */
            $('.checkbox').each(function() {
               if ($(this).is(':checked')) 
               {
                   $(this).attr("checked", false);
                   $(this).trigger('change');       
               }
            });
        });
});

function assignCloseClick() {
    $('.btnClose').click(function(event) {            
            event.preventDefault();
            var id = $(this).attr('rel');            
            $('#' + id).attr("checked", false);
            $('#' + id).trigger('change');            
        });
}