var configuratorCollapsed = null;
if (typeof (ProductInfoStruct) != 'undefined'){
	if(ProductInfoStruct.releaseList[0].collapsed == true) configuratorCollapsed = true;
}
$(document).ready(function(){
    // Slide effect
    var _parentSlide = '.infoGoods';
    var _linkSlide = '.btnConfigure';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'infoGoodsOpen';
    var _durationSlide = 300;
    $(_parentSlide).each(function(){
        if (!$(this).is('.'+_openClassS)) {
            $(this).find(_slideBlock).css('display','none');
        }
    });
 
    $(_linkSlide,_parentSlide).click(function(){
        if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
            $(this).parents(_parentSlide).removeClass(_openClassS);
            $("div.sideBar_productInfoTop").css("margin-top", '0');
            configuratorCollapsed = true;
            $(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide, function() {
          	});

        } else {
            $(this).parents(_parentSlide).addClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide, function() {
            $("div.sideBar_productInfoTop").css("margin-top", $("#productConfigurator").height());
            configuratorCollapsed = false;
          	});
			//if ($(this).attr("id") == "btn-prodoverview-configure"){
			//	hideBlocks();
			//}
        }
        return false;
    });
});
$(document).ready(function(){
    // Slide effect
    var _parentSlide = '.btnGoTo';
    var _linkSlide = '.opener';
    var _slideBlock = '.slide';
    var _openClassS = 'active';
    var _durationSlide = 300;
    $(_parentSlide).each(function(){
        if (!$(this).is('.'+_openClassS)) {
            $(this).find(_slideBlock).css('display','none');
        }
    });
    $(_linkSlide,_parentSlide).click(function(){
        if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
            $(this).parents(_parentSlide).removeClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
        } else {
            $(this).parents(_parentSlide).addClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
        }
        return false;
    });
});
$(document).ready(function(){
    // Slide effect
    var _parentSlide = '.searchEntry';
    var _linkSlide = '.btnTopic';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'searchEntryOpen';
    var _durationSlide = 300;
    $(_parentSlide).each(function(){
        if (!$(this).is('.'+_openClassS)) {
            $(this).find(_slideBlock).css('display','none');
        }
    });
    $(_linkSlide,_parentSlide).click(function(){
        if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
            $(this).parents(_parentSlide).removeClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
        } else {
            $(this).parents(_parentSlide).addClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
        }
        return false;
    });
});
$(document).ready(function(){
    // Slide effect
    var _parentSlide = '.informHold';
    var _linkSlide = '.btnMail a, .btnSend';
    var _slideBlock = '.headingSend';
    var _openClassS = 'boxDownloadOpen';
    var _durationSlide = 300;
    $(_parentSlide).each(function(){
        if (!$(this).is('.'+_openClassS)) {
            $(this).find(_slideBlock).css('display','none');
        }
    });
    $(_linkSlide,_parentSlide).click(function(){
        if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
            $(this).parents(_parentSlide).removeClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
        } else {
            $(this).parents(_parentSlide).addClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
        }
        return false;
    });
});
$(document).ready(function(){
    // Slide effect
    var _parentSlide = '.sliderItem';
    var _linkSlide = '.slideLink, .slideClose';
    var _slideBlock = '.infoVisible';
    var _openClassS = 'sliderItemOpen';
    var _durationSlide = 300;
    $(_parentSlide).each(function(){
        if (!$(this).is('.'+_openClassS)) {
            $(this).find(_slideBlock).css('display','none');
        }
    });
    $(_linkSlide,_parentSlide).click(function(){
        if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
            $(this).parents(_parentSlide).removeClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
        } else {
            $(this).parents(_parentSlide).addClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
        }
        return false;
    });
});
// conflict with toggle.js (there don't work add and remove class active)
/* $(document).ready(function(){
    // Slide effect
    var _parentSlide = '.introHolder';
    var _linkSlide = '.title';
    var _slideBlock = '.slide';
    var _openClassS = 'active';
    var _durationSlide = 300;
    $(_parentSlide).each(function(){
        if (!$(this).is('.'+_openClassS)) {
            $(this).find(_slideBlock).css('display','none');
        }
    });
    $(_linkSlide,_parentSlide).click(function(){
        if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
            $(this).parents(_parentSlide).removeClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
        } else {
            $(this).parents(_parentSlide).addClass(_openClassS);
            $(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
        }
        return false;
    });
});*/
// popup login
$(document).ready(function(){
    
    function bg_overlay(){
        if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
            $("body","html").css({
                height: "100%",
                width: "100%"
            });
            $("html").css("overflow","hidden");
            if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
                $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
                $("#TB_overlay").click(tb_remove);
            }
        }
        else{//all others
            if(document.getElementById("TB_overlay") === null){
                $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
                $("#TB_overlay").click(tb_remove);
            }
        }
    }
	
    function tb_remove() {
        $("#TB_window").fadeOut("fast",function(){
            $('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();
        });
        $("#TB_load").remove();
        if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
            $("body","html").css({
                height: "auto",
                width: "auto"
            });
            $("html").css("overflow","");
        }
        document.onkeydown = "";
        document.onkeyup = "";
        //add by huashuai , line 178-179
        $('#boxLogin, #boxDownload, #boxAccept, #boxProductEntry').remove();
		$(".boxDownload_container").remove();
        return false;
    }
    /*$("#openLogin").click(function (event){
        event.preventDefault();
        bg_overlay();
        $('#boxLogin').fadeIn(100, function(){
            initTabs('.boxLoginHold', '.choiceNav_list li', '.tabHold_login');
        });
    });*/
    $(".btnAcceptOpen").click(function (event){
        event.preventDefault();
        bg_overlay();
        $('#boxDownload').fadeIn(100, function(){
        });
        $('#boxAccept').fadeOut(100, function(){
        });
    });
	jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
        this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
        return this;
	};
    $(".openAccept").click(function (event){
        event.preventDefault();
        var url = $(this).attr('href');
		//var top = $(this).offset().top - 230;
		var container = $(this);
		//replace by huashuai , change container.parent('div').find('input').val()>1 to container.parent('div').find('input').val()!=""
		if ((container.parent('div').find('input').length > 0 && container.parent('div').find('input').val()!="") || (container.parent('div').find('input').length == 0))
		{
            bg_overlay();
            
			$.ajax({
				url: url,
                                beforeSend: function() { 
                                },
				success: function(data) {
					$('body').append(data);
					//$('.boxDownload_container').css({top : top});
					$('#boxAccept').fadeIn(100, function(){
					});
					$('.boxDownload_container').center();
					//add by huashuai , line 221-228
					$(".btnAcceptOpen").click(function (event){
    					event.preventDefault();
    					bg_overlay();
    					$('#boxDownload').fadeIn(100, function(){
    					});
    					$('#boxAccept').fadeOut(100, function(){
    					});
    				});
					$(".btnClose").click(function (event) {
						event.preventDefault();
						tb_remove();
						$('#boxAccept').hide();
					});
				}
			});
		}
        else
        {
            container.parent('div').addClass('error');
        }

    });
    /*$(".openAccept").click(function (event){
        event.preventDefault();
        bg_overlay();
        $('#financialPopup').fadeIn(100, function(){
        });
        $(function() {
			$('.box .contentScrol').jScrollPane({showArrows: true});
	   	});
    });*/
    //init social popup
    $(".OpenPopupTwitter").click(function (event){
        event.preventDefault();
        bg_overlay();
        var pos = $(this).offset();        
        $('#financialSocialTwitter').css('top', (pos.top + 28) + 'px');
        $('#financialSocialTwitter').css('left', (pos.left-170) + 'px');
        $('#financialSocialTwitter').fadeIn(100, function(){
        });
    });
    $(".OpenPopupFacebook").click(function (event){
        event.preventDefault();
        bg_overlay();
        var pos = $(this).offset();
        var pos = $(this).offset();        
        $('#financialSocialFacebook').css('top', (pos.top + 24) + 'px');
        $('#financialSocialFacebook').css('left', (pos.left-170) + 'px');
        $('#financialSocialFacebook').fadeIn(100, function(){
        });
    });
    $(".OpenPopupForums").click(function (event){
        event.preventDefault();
        bg_overlay();
        var pos = $(this).offset();
        $('#financialSocialTwitter').css('top', (pos.top + 28) + 'px');
        $('#financialSocialTwitter').css('left', (pos.left-170) + 'px');
        $('#financialSocialTwitter').fadeIn(100, function(){
        });
    });
    $(".btnClose").click(function (event) {
        event.preventDefault();
        tb_remove();
        $('#boxLogin, #boxDownload, #boxAccept, #boxProductEntry , #financialSocialTwitter , #financialSocialFacebook , #financialSocialForums, #boxCommunity ').hide();
    });
    $(".btnClose").click(function (event) {
        event.preventDefault();
        tb_remove();
        $('#boxLogin, #boxDownload, #boxAccept, #boxProductEntry , #financialPopup, #boxCommunity').hide();
    });
    $("input[type=hidden]").parent('div').parent('div').parent('div').removeClass('error');
    $("input[type=hidden]").change(function(event) {
        if ($(this).val()) $(this).parent('div').parent('div').parent('div').removeClass('error');
    });
});
$(window).scroll(function() {
	if($('.boxDownload_container').length>0){
	$('.boxDownload_container').center();
	}
});
$(window).resize(function(){
	$('.boxDownload_container').center();
});

