$(document).ready(function() {
   initTabs('.tabBox2', '.tabList2 li', '.tabContent2 .tab2');
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
        
        
        var spec_index = $('.tabList2').children('li.active').index('.tabList2 > li');  
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
            var spec_index = $(this).parent('li').index('.tabList2 > li');            
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