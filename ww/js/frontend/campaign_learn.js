/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 15:13
 */
$(document).ready(function() {
	var params = { allowScriptAccess: "always", wmode: 'transparent', scale: "noborder", salign: "BL", play:false};
	var len = document.videoForm.videoUrl.length;
	if(len>0)
	{
		for(var i=0;i<len;i++)
		{
			//var atts = { id: "myytplayer"+(i+1) };
			var movievar = document.videoForm.videoUrl[i].value; 
			//swfobject.embedSWF(movievar, "ytapiplayer"+(i+1), "648", "340", "8", null, null, params, atts);
			generateVideoObject("ytapiplayer" + (i + 1), "myytplayer" + (i + 1), movievar, "648", "340");
		}
	}
	else
	{
		//var atts = { id: "myytplayer1" };
		var movievar = document.videoForm.videoUrl.value[0]; 
		//swfobject.embedSWF(movievar, "ytapiplayer1", "648", "340", "8", null, null, params, atts);
		generateVideoObject("ytapiplayer1", "myytplayer1", movievar, "648", "340");
	}

    $('.thumbnail').find('li').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var index = $('.thumbnail').find('li').index(this);
        $('.campaignVideoGallery').find('li').each(function(i) {
            var player = document.getElementById("myytplayer" + (i+1));
			if (player != null)
			{
				$("#myytplayer" + (i+1)).after('<div id="ytapiplayer' + (i+1) + '"></div>').remove();
				//addPlayParam(player);
				//player.StopPlay();
			}
        });

        $('.thumbnail').find('li a').removeClass("active");
        $(this).find('a').addClass("active");
        
        var movievar = document.videoForm.videoUrl[index].value; 
        generateVideoObject("ytapiplayer" + (index+1), "myytplayer" + (index+1), movievar, "648", "340");
        //var player = document.getElementById("myytplayer" + (index+1));
        //removePlayParam(player);
        //player.Play();

        //$('.campaignVideoGallery').css('margin-left', -(parseInt($('.campaignVideoGallery').find('li').width()) * index));
    });

});

function generateVideoObject(divId, videoId, videoUrl, width, height)
{
	var videoObjStr = getVideoObject(videoId, videoUrl, width, height);
	$("#" + divId).after(videoObjStr).remove();
}

function getVideoObject(id, videoUrl, width, height)
{
	var objStr = '<object codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0"';
	objStr += ' id=' + id;
	objStr += ' width="' + width + '"';
	objStr += ' height="' + height + '">';
	objStr += '<param name="allowScriptAccess" value="sameDomain" />';
	objStr += '<param name="allowFullScreen" value="false" />';
	objStr += '<param name="movie" value="' + videoUrl + '?autoplay=1" />';
	objStr += '<param name="wmode" value="transparent">';
	objStr += '<param name="scale" value="noborder">';
	objStr += '<param name="salign" value="BL">';
	objStr += '<embed src="' + videoUrl + '?autoplay=1"';
	objStr += ' quality="high"';
	objStr += ' width="' + width + '"';
	objStr += ' height="' + height + '"';
	objStr += ' allowScriptAccess="sameDomain" allowFullScreen="false" wmode="transparent" scale="noborder" salign="BL" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	return objStr;
}

function removePlayParam(player)
{
	for(var i = 0; i < player.childNodes.length; i++)
	{
		var childNode = player.childNodes[i];
		if (childNode.name == "play")
		{
			player.removeChild(childNode);
			break;
		}
	}
}

function addPlayParam(player)
{
	if (!containsPlayParam(player))
	{
		var param = document.createElement("param");
		param.name = "play";
		param.value = "false";
		player.appendChild(param);
	}
}

function containsPlayParam(player)
{
	for(var i = 0; i < player.childNodes.length; i++)
	{
		var childNode = player.childNodes[i];
		if (childNode.name == "play")
		{
			return true;
		}
	}
	return false;
}