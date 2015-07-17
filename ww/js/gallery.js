/**
 * Created by JetBrains WebStorm.
 * User: root
 * Date: 18.01.11
 * Time: 23:43
 * To change this template use File | Settings | File Templates.
 */
jQuery.fn.ALGGallery = function(method)
{
    
    var methods = {
        init : function(custom_options)
        {
            $.extend(options, custom_options);

            innerContainer = $(this).children('.ALGInnerContainer');
            textBlock = innerContainer.children('.ALGText');
            imgBlock = innerContainer.children('.ALGImage');
            thumbnails = $(this).children('.ALGThumbnails');           

            $(this).css('width', options.gallery_width);
            innerContainer.css('width', options.gallery_width - 2);
            textBlock.css('width', innerContainer.width() - options.start_img_width - 4);

            options.gallery_height = textBlock.innerHeight() + thumbnails.innerHeight();
            if (options.start_img_height > textBlock.innerHeight()) options.gallery_height = options.start_img_height + thumbnails.innerHeight();


            $(this).css('height', options.gallery_height);

            innerContainer.css('height', options.gallery_height - thumbnails.height() - 4);

            imgBlock.css('width', options.start_img_width);
            imgBlock.css('height', options.start_img_height);

            central_pos_y = innerContainer.height() / 2 - options.start_img_height / 2;

            imgBlock.css('margin-top', central_pos_y);

            initialize();

            initLoad(options.defaultModel);
            reloadElements(options.defaultModel);   
                        
            
            $(this).data('options', options);
            $(this).data('container', container);
            $(this).data('states', states);
            $(this).data('state', state);
            $(this).data('image_index', image_index);
            $(this).data('model_index', model_index);
            $(this).data('c_m_l', c_m_l);
            $(this).data('c_m_t', c_m_t);
            $(this).data('innerContainer', innerContainer);
            $(this).data('textBlock', textBlock);
            $(this).data('imgBlock', imgBlock);
            $(this).data('thumbnails', thumbnails);
            $(this).data('central_pos_y', central_pos_y);           
            $(this).data('current_model_index', model_index);
            
            assignThumbnailsHover();
            assignThumbnailClick();
            assignCloseClick();
            
            return this;
        },
        changeModel : function(model)
        {
        	
            options = $(this).data('options');            
            container = $(this).data('container');
            states = $(this).data('states');
            state = $(this).data('state');
            //image_index = $(this).data('image_index');
            image_index = $(this).data('image_index');           
            model_index = $(this).data('model_index');
            current_model_index = $(this).data('current_model_index');
            c_m_l = $(this).data('c_m_l');
            c_m_t = $(this).data('c_m_t');
            innerContainer = $(this).data('innerContainer');
            textBlock = $(this).data('textBlock');
            imgBlock = $(this).data('imgBlock');
            thumbnails = $(this).data('thumbnails');
            central_pos_y = $(this).data('central_pos_y');                 
            
            for (z = 0; z < options.elements.length; z++)
            {
                if (options.elements[z].model == model)
                {
                    model_index = z;
                    $(this).data('model_index', model_index);
                    //if a different model, then reset the gallery, otherwise keep state.
                    if (model_index !== current_model_index)
                    {             
                    	$('.ALGImage').find('.btnPlay').remove();
                    	$(this).data('image_index', 0);
                    	$(this).data('current_model_index', model_index);
                    }
                    break;
                }
            }
            reloadElements();
            if (state == states.large)
            {
				if (options.elements.length > 0)
                	imgBlock.children('img').attr('src', options.elements[model_index].large[image_index]);
				else if (options.video_elements.thumbnails.length > 0)
					imgBlock.children('img').attr('src', options.video_elements.large[image_index]);
                thumbnails.children('ul.ALGThumbnailList').children('li.ALGZoom').hide();
            }
            else if (state == states.start)
            {
				if (options.elements.length > 0)
                	imgBlock.children('img').attr('src', options.elements[model_index].medium[image_index]);
				else if (options.video_elements.thumbnails.length > 0)
					imgBlock.children('img').attr('src', options.video_elements.large[image_index]);
            }
            $('#ALGThumbItem_' + image_index).addClass('active');
            assignThumbnailsHover();
            assignThumbnailClick();
            assignCloseClick();
        }
  
    };
    
    var options =
    {
        'gallery_width'     : 648,
        'gallery_height'    : 420,
        'start_img_width'   : 313,
        'start_img_height'  : 313,
        'large_img_width'   : 500,
        'large_img_height'  : 500,
        'video_width'       : 648,
        'video_height'      : 324,
        'zoom_img_width'    : 1200,
        'zoom_img_height'   : 1200,
        'elements'          : [],
		'video_elements'	: {'thumbnails' : [], 'large' : [], 'video_code' : []},
        'text'              : '',
        'defaultModel'      : 'default'
    };
    
    var container = $(this);
    var states = {'start': 1, 'large': 2, 'zoom': 3, 'progress': 4};
    var state = states.start;
    var image_index;
    var model_index = 0;

    var c_m_l = 0, c_m_t = 0;    
    
    var innerContainer;
    var textBlock;
    var imgBlock;
    var thumbnails; 
    var central_pos_y;

	var images_count = 0;
	var video_count = 0;
	
	var paddingType = 'padding-left';
    var margingType = 'margin-right';
    if (isArEm)
    {
	    paddingType = 'padding-right';
	    margingType = 'margin-left';
    }
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  
    
    function initialize()
    {
        for (i = 0; i < options.elements.length; i++)
        {
            if (options.elements[i].model == options.defaultModel)
            {	
            	//defaulting to product images if no sku ones are found
            	if(options.elements[i].medium != null && options.elements[i].medium != "")
            	{	
                	model_index = i;
                }else{
                	model_index = 0; //product images are mandatory and always first in the array.
                }
                break;
            }
        }
    }        
    
    function reloadElements()
    {
		container.find('.ALGThumbnailList.ALGThumbnailImage').html('');
		if (options.elements.length > 0)			
		{	
        	var thumbnails_html = '';
        	for (m = 0; m < options.elements[model_index].thumbnails.length; m++) {
        		if(options.elements[model_index].thumbnails[m].length > 0){
        			thumbnails_html +=  '<li class="ALGZoom"><a href="#" class="ALGBtnZoom"><span>zoom</span></a></li>';
        		}
        		break;
        	}
        	
        	for (n = 0; n < options.elements[model_index].thumbnails.length; n++)
        	{
				if (options.elements[model_index].types[n] == 'image')
				{
            		thumbnails_html += '<li id="ALGThumbItem_' + n + '"><a href="#"><img src="' + options.elements[model_index].thumbnails[n] + '" alt="' + options.elements[model_index].altText[n] + '" title="' + options.elements[model_index].altText[n] + '" /></a></li>';
					images_count++;
				}
        	}
        	thumbnails_html += '</ul>';
        	container.find('.ALGThumbnailList.ALGThumbnailImage').html(thumbnails_html);
		}
		container.data('images_count', images_count);

		container.find('.ALGThumbnailList.ALGThumbnailVideo').html('');
		if (options.elements.length > 0)
		{
			var video_thumbnails_html = '';
			for (n = 0; n < options.elements[model_index].thumbnails.length; n++)
			{
				if (options.elements[model_index].types[n] == 'video')
				{
					video_thumbnails_html += '<li class="ALGThumbItemVideo" id="ALGThumbItem_' + n + '"><a class="videoCallBtnG" href="#"><img src="' + options.elements[model_index].thumbnails[n] + '" alt="' + options.elements[model_index].altText[n] + '" title="' + options.elements[model_index].altText[n] + '" /><span class="btnPlaySmall"><em>play</em></span></a></li>';
					video_count++;
				}
			}
			video_thumbnails_html += '</ul>';
			container.find('.ALGThumbnailList.ALGThumbnailVideo').html(video_thumbnails_html);
		}
		container.data('video_count', video_count);
    }

    
    function assignThumbnailsHover()
    {         
        thumbnails.children('ul.ALGThumbnailList').children('li').mouseenter(function() {
           $('.ALGImage').find('.btnPlay').remove();
           state = container.data('state');
           options = container.data('options');
           textBlock = container.data('textBlock');
           imgBlock = container.data('imgBlock');
           thumbnails = container.data('thumbnails');
           innerContainer = container.data('innerContainer');
           state = container.data('state');
           model_index = container.data('model_index');
           image_index = container.data('image_index');

		   images_count = container.data('images_count');
		   video_count = container.data('video_count');
    	  
           if (state == states.start)
           {
               if (!$(this).hasClass('ALGZoom'))
               {
		   
				   var is_video = $(this).hasClass('ALGThumbItemVideo');
                   $(this).addClass('active');
                   state = states.progress;
                   container.data('state', state);
                   $('#ALGThumbItem_' + image_index).removeClass('active');
                   image_index = $(this).attr('id').replace('ALGThumbItem_', '');
                   container.data('image_index', image_index);



                   var start_src = '';                  
				   if (options.elements.length > 0) start_src = options.elements[model_index].medium[image_index];
                   imgBlock.children('img').fadeOut(3, function() {
                       $('.ALGImage').addClass('galleryVideo');
                       imgBlock.children('img').addClass('triggeredImage');
                       if(is_video == true  && $('.ALGImage').find('.btnPlay').html() == null )
                       {
                    	   $('.ALGImage').find('img').after('<span class=\"btnPlay\" onclick=\"heroVideoClick(' + image_index + ')\"><em>play</em></span>');
                     //  }else if(is_video == false  && $('.ALGImage').find('.btnPlay').html() != null )
                      // {
                    	//   $('.ALGImage').find('.btnPlay').remove();
                       }               
                       $('#ALGThumbItem_' + image_index).triggerHandler("click");
                       $(".triggeredImage").click(function(){
                    	   $('#ALGThumbItem_' + image_index).triggerHandler("click");
                       });  
                        imgBlock.children('img').attr('src', start_src);
                        imgBlock.children('img').css('width', options.start_img_width);
                        imgBlock.children('img').css('height', options.start_img_height);
                        imgBlock.children('img').fadeIn(3, function() {                            
                            state = states.start;
                            container.data('state', state);
                        });
                   });
                            
               }
           }
        });
    }

    function initLoad()
    {
        image_index = 0;        
        container.data('image_index', image_index);
		if (options.elements.length > 0)
		{
        	var start_src = options.elements[model_index].medium[image_index];
        	var start_alt = options.elements[model_index].altText[image_index];
        	insertImage(options.start_img_width, options.start_img_height, start_src, start_alt);
        	thumbnails.children('ul.ALGThumbnailList').children('li:first').addClass('active');
        	thumbnails.children('strong.text').hide();
		}
    }

    function assignThumbnailClick()
    {
        thumbnails.children('ul.ALGThumbnailList').children('li').click(function(event) {
           event.preventDefault();
           options = container.data('options');
           textBlock = container.data('textBlock');
           imgBlock = container.data('imgBlock');
           thumbnails = container.data('thumbnails');
           innerContainer = container.data('innerContainer');
           state = container.data('state');
           model_index = container.data('model_index');
           image_index = container.data('image_index');
		   images_count = container.data('images_count');
		   video_count = container.data('video_count');		  
           if (!$(this).hasClass('ALGZoom'))
           {
	       if (state != states.progress)
               {
		   if (state == states.start)
                   {
		       innerContainer.addClass('enlarged');
                       state = states.progress;
                       container.data('state', state);                            
                       $('#ALGThumbItem_' + image_index).removeClass('active');
                       $(this).addClass('active');
                       image_index= $(this).attr('id').replace('ALGThumbItem_', '');                       
                       container.data('image_index', image_index);
                       var is_video = $(this).hasClass('ALGThumbItemVideo');                       
                       var video_html = '';
                       if (is_video) video_html = "<object width=\"" + options.video_width + "\" height=\"" + options.video_height +"\"><param name=\"allowFullScreen\" value=\"true\"><param value=\"" + options.elements[model_index].large[image_index] + "\" name=\"movie\"><embed width=\"" + options.video_width + "\" height=\"" + options.video_height + "\" wmode=\"transparent\" type=\"application/x-shockwave-flash\" src=\"" + options.elements[model_index].large[image_index] + "&autoplay=1\" allowfullscreen=\"true\"></object>";
                       var start_src = '';
                       var start_alt = '';
					   if (options.elements.length > 0) 
					   {
						   start_src = options.elements[model_index].medium[image_index];
						   start_alt = options.elements[model_index].altText[image_index];
					   }
                       insertImage(options.start_img_width, options.start_img_height, start_src, start_alt);
                       var large_src = '';
					   if (options.elements.length > 0) large_src = options.elements[model_index].large[image_index];
                       container.children('.ALGCloseBtn').show();


                       var img_width = options.large_img_width;
                       if (is_video) img_width = options.video_width;
                       var img_height = options.large_img_height;
                       if (is_video) img_height = options.video_height;

                       var central_pos_x = innerContainer.width() / 2 - img_width / 2;

                       //innerContainer.css('overflow', 'hidden');
                       $('.multimediaModule').css('border', '1px solid #ccc');
                       $('.multimediaModule').css('background', '#ffffff');
					   
					   var params_thumbnails = {};
                       params_thumbnails[paddingType] = 15;
                       thumbnails.animate(params_thumbnails, 400);
					   
                       textBlock.css('position', 'absolute');
                       textBlock.fadeOut(400);
					   var central_pos_y =  options.large_img_height / 2 - img_height / 2;
					   innerContainer.animate({height: options.large_img_height}, 400);
					   					   
					   var params_imgBlock = {};
                       params_imgBlock['width'] = img_width;
					   params_imgBlock['height'] = img_height;
					   params_imgBlock[margingType] = central_pos_x;
					   params_imgBlock['margin-top'] = central_pos_y;
                       imgBlock.animate(
                                params_imgBlock,
                                400,
                                function() {
                                    if (is_video) $(this).children('img').fadeOut(150, function() {
                                       $(this).children('img').remove();
                                       imgBlock.html(video_html);
                                       thumbnails.children('ul.ALGThumbnailList').children('li.ALGZoom').hide();
                                       thumbnails.children('strong.text').show();
                                       state = states.large;
                                       container.data('state', state);                            
                                    });
                                    else
                                    {
                                       thumbnails.children('ul.ALGThumbnailList').children('li.ALGZoom').hide();
                                       thumbnails.children('strong.text').show();
                                       state = states.large;
                                       container.data('state', state);                            
                                    }
                                }
                       );
                       imgBlock.children('img').animate(
                                {
                                    'width': img_width,
                                    'height': img_height
                                },
                                400,
                                function() {
                                    $(this).attr('src', large_src);
                                }
                       );
                   }
                   else if (state == states.large)
                   {
		       if (image_index == $(this).attr('id').replace('ALGThumbItem_', ''))
                       {
						   container.children('.ALGCloseBtn').trigger('click');
                       }
                       else
                       {
                           state = states.progress;
                           container.data('state', state);
						   images_count = container.data('images_count');
		   				   video_count = container.data('video_count');
                           $('#ALGThumbItem_' + image_index).removeClass('active');
                           $(this).addClass('active');
                           image_index= $(this).attr('id').replace('ALGThumbItem_', '');                           
                           container.data('image_index', image_index);
						   var is_video = $(this).hasClass('ALGThumbItemVideo');

                           var large_src = '';
                           var altText = '';
						   if (options.elements.length > 0) 
						   {
							   large_src = options.elements[model_index].large[image_index];
							   altText = options.elements[model_index].altText[image_index];
						   }

                           var video_html = '';
                           if (is_video) video_html = "<object width=\"" + options.video_width + "\" height=\"" + options.video_height +"\"><param name=\"allowFullScreen\" value=\"true\"><param value=\"" + options.elements[model_index].large[image_index] + "\" name=\"movie\"><embed width=\"" + options.video_width + "\" height=\"" + options.video_height + "\" wmode=\"transparent\" type=\"application/x-shockwave-flash\" src=\"" + options.elements[model_index].large[image_index] + "&autoplay=1\" allowfullscreen=\"true\"></object>";
                           var img_width = options.large_img_width;
                           if (is_video) img_width = options.video_width;
                           var img_height = options.large_img_height;
                           if (is_video) img_height = options.video_height;

                           insertImage(img_width, img_height, large_src, altText);


                           var central_pos_x = innerContainer.width() / 2 - img_width / 2;
						   var central_pos_y =  options.large_img_height / 2 - img_height / 2;
                           //var central_pos_y = 0;

						   var params_imgBlock = {};
						   params_imgBlock['width'] = img_width;
						   params_imgBlock['height'] = img_height;
						   params_imgBlock[margingType] = central_pos_x;
						   params_imgBlock['margin-top'] = central_pos_y;
                           imgBlock.animate(
                                    params_imgBlock,
                                    400,
                                    function() {

                                       if (is_video) $(this).children('img').fadeOut(150, function() {
                                           $(this).children('img').remove();
                                           imgBlock.html(video_html);
                                           state = states.large;
                                           thumbnails.children('ul.ALGThumbnailList').children('li.ALGZoom').hide();
                                           container.data('state', state);                                           
                                       });
                                       else
                                       {
                                           state = states.large;
                                           thumbnails.children('ul.ALGThumbnailList').children('li.ALGZoom').hide();
                                           container.data('state', state);                                           
                                       }
                                    }
                           );
						   innerContainer.animate({height: options.large_img_height}, 400);
                           imgBlock.children('img').animate(
                                    {
                                        'width': img_width,
                                        'height': img_height
                                    },
                                    400,
                                    function() {
                                        $(this).attr('src', large_src);
                                    }
                           );
                       }
                   }
               }
           } else {
	       if (state == states.start)
               {
                     $('#ALGThumbItem_' + image_index).trigger('click');
               }
           }
		if(options.elements[model_index].altText!=undefined){
		thumbnails.children('strong.text').html(options.elements[model_index].altText[image_index]);
		}
        });
    }

    function assignCloseClick()
    {
        container.children('.ALGCloseBtn').click(function(event) {
            event.preventDefault();
            options = container.data('options');
            textBlock = container.data('textBlock');
            imgBlock = container.data('imgBlock');
            thumbnails = container.data('thumbnails');
            innerContainer = container.data('innerContainer');
            state = container.data('state');
            model_index = container.data('model_index');
            image_index = container.data('image_index');
			images_count = container.data('images_count');
		    video_count = container.data('video_count');
            if (state != states.progress)
            {
                if (state == states.large)
                {
					innerContainer.removeClass('enlarged');
                    state = states.progress;
                    container.data('state', state);                            
                    container.children('.ALGCloseBtn').hide();
                    var is_video = $('#ALGThumbItem_' + image_index).hasClass('ALGThumbItemVideo');
					//innerContainer.css('height', options.gallery_height - thumbnails.height() - 4);
                    var central_pos_y = (options.gallery_height - thumbnails.height()) / 2 - options.start_img_height / 2;
                    var start_src = '';
					if (options.elements.length > 0) start_src = options.elements[model_index].medium[image_index];
                    var large_src = '';
                    var altText = '';
					if (!is_video && options.elements.length > 0) large_src = options.elements[model_index].large[image_index];
					else if (is_video && options.elements.length > 0) large_src = options.elements[model_index].medium[image_index];
                    if (options.elements.length > 0) altText = options.elements[model_index].altText[image_index];
					insertImage(options.large_img_width, options.large_img_height, large_src, altText);
                    textBlock.fadeIn(1000, 'linear', function() {
                        textBlock.css('position', 'static');
                    });
                    imgBlock.children('img').addClass('triggeredImage'); 
                    $('.ALGImage').addClass('galleryVideo');
                    if(is_video == true  && $('.ALGImage').find('.btnPlay').html() == null )
                    {
                 	   $('.ALGImage').find('img').after('<span class=\"btnPlay\"><em>play</em></span>');
                    }else if(is_video == false  && $('.ALGImage').find('.btnPlay').html() != null )
                    {
                 	   $('.ALGImage').find('.btnPlay').remove();
                    }               
                    $('#ALGThumbItem_' + image_index).triggerHandler("click");
                    $(".triggeredImage").click(function(){
                 	   $('#ALGThumbItem_' + image_index).triggerHandler("click");
                    });     

                    $('.multimediaModule').css('border', '0');
                    $('.multimediaModule').css('background', 'none');
                    $('.multimediaModule').css('border-bottom', '1px solid #ccc');
					
					var params_thumbnails = {};
                    params_thumbnails[paddingType] = 0;
                    thumbnails.animate(params_thumbnails, 400);

					var params_imgBlock = {};
                    params_imgBlock['width'] = options.start_img_width;
					params_imgBlock['height'] = options.start_img_height;
					params_imgBlock[margingType] = 0;
					params_imgBlock['margin-top'] = central_pos_y;
                    imgBlock.animate(params_imgBlock, 400);
					
					innerContainer.animate({height: options.gallery_height - thumbnails.height()}, 400);
                    imgBlock.children('img').animate(
                            {
                                'width': options.start_img_width,
                                'height': options.start_img_height
                            },
                            400,
                            function() {
                                $(this).attr('src', start_src);
                                thumbnails.children('ul.ALGThumbnailList').children('li.ALGZoom').show();
                                thumbnails.children('strong.text').hide();
                                //innerContainer.css('overflow', 'visible');
                                state = states.start;
                                container.data('state', state);                            
                            }
                    );
                }
            }
        });
    }

    
    function insertImage(width, height, src, alt)
    {
        imgBlock.html("<img src='' />");
        imgBlock.children('img').css('width', width);
        imgBlock.children('img').css('height', height);
        imgBlock.children('img').attr('src', src);
        imgBlock.children('img').attr('alt', alt);
        imgBlock.children('img').attr('title', alt);
    }    
    
    function addVideoTrigger(){}
    function removeVideoTrigger(){}
}

function heroVideoClick(image_index) {
	$('#ALGThumbItem_' + image_index).click();
}