$(document).ready(function() {
	//initTabs('.tabBoxQuick', '.tabListQuick li', '.tabContentQuick .tabQuick');
	
	$(function() {
		$('.quickLinkBox .contentScrol').jScrollPane({showArrows: true});
	}); 
        
        $('.tabListBar').find('a').click(function(event) {
            event.preventDefault();
            var className = $(this).attr('rel');
            if (className && className !== undefined)
            {
                $('.tabWrapAlfa').children('div').each(function() {
                    if (!$(this).hasClass('tabListBar'))
                    {
                        if ($(this).hasClass(className)) $(this).show();
                        else $(this).hide();
                    }
                });               
            }
        });
        
        
        var spec_index = $('.tabListQuick').children('li.active').index('.tabListQuick > li');  
        var className = $('.tabListBar').eq(spec_index).find('li.active').children('a').attr('rel');
        if (className && className !== undefined)
        {
            $('.tabWrapAlfa').children('div').each(function() {
                if (!$(this).hasClass('tabListBar'))
                {
                    if ($(this).hasClass(className)) $(this).show();
                    else $(this).hide();
                }
            });               
        }
        
        $('.tabList').find('a').mouseup(function(event) {            
            event.preventDefault();
            var spec_index = $(this).parent('li').index('.tabListQuick > li');            
            var className = $('.tabListBar').eq(spec_index).find('li.active').children('a').attr('rel');            
            if (className && className !== undefined)
            {
                $('.tabWrapAlfa').children('div').each(function() {
                    if (!$(this).hasClass('tabListBar'))
                    {
                        if ($(this).hasClass(className)) $(this).show();
                        else $(this).hide();
                    }
                });               
            }
        });
});
