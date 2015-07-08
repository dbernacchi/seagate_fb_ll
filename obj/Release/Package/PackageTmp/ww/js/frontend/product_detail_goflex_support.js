/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 14:18
 */
$.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      },
      getUrlVar: function(name){
        var value = $.getUrlVars()[name];
        if(value==undefined){
            value="";
        }
        return value;
      }
}); 
$(document).ready(function(){
    
    var allVars = $.getUrlVars();
    var q=$.getUrlVar("q");
    if(q!=""){
        $.ajax(
            {
                type:"post",
                url:"/ww/jsp/support/productDetails/pdhtitleajax.jsp",
                cache:false,
                timeout:30000,
                data:{
                "searchURLPrefix":pdh_data.searchURLPrefix,
                "site":pdh_data.site,
                "locale":pdh_data.locale,
                "start":pdh_data.start,
                "num":pdh_data.num,
                "client":pdh_data.client,
                "ie":pdh_data.ie,
                "oe":pdh_data.oe,
                "tlen":pdh_data.tlen,
                "getfields":pdh_data.getfields,
                "lr":pdh_data.lr,
                "filter":pdh_data.filter,
                "sort":pdh_data.sort,
                "requiredfields":pdh_data.requiredfields,
                "output":pdh_data.output,
                "q":q               
                },
                beforeSend:function(){
                    
                },
                success:function(msg){
                        $("#pdhtitle").html(msg);
                        var pdh_type=$("#pdh_type").text();
                       
                        /*if(pdh_type=="2"){
                            var pdh_title=$("#pdh_title").html();
                            $("#pdhtitle").html(pdh_title);
                            $('html head').find('title').html(pdh_title);
                        }else if(pdh_type=="1"){
                            var pdh_title=$("#pdh_title").html();
                            $("#pdhtitle").html(pdh_title);
                        }*/
						var pdh_title=$("#pdh_title").html();
                            $("#pdhtitle").html(pdh_title);
                            $('html head').find('title').html(pdh_title);
                        
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#pdhtitle").html("<!--"+errorThrown+"-->");
                    
                }
                
                
            }
        );
    }
    
    
});
var mousedowned = false;
var inAnimation = false;
var currentClassName = 'video_1';

//Comment The Function
//Parses specs table for contents of each cell and stores in the details array
function initCompareArray(specTableRows) {
    //alert("inside initCompareArray" );
    var specTable = $('div.specProdHold').find('.specificationTable');
    //alert("specTable : " + specTable );
    // If spec table has a generation row get column count from the second row, otherwise get count from the first row
    if (specTable.find('tr.generation').length > 0) {
        var numCol = specTable.find('tr')[1].cells.length;
    } else {
        var numCol = specTable.find('tr')[0].cells.length;
    }
    for(var i=1;i<numCol;i++) { 
        var rowArray = new Array();
        specTableRows.find("td:eq("+i+")").each(function(index,value) { 
            if($(this).attr('colspan')) {
                return true;
            }
            rowArray.push($(this).html());  
        });
        //alert("rowarray:" + rowArray);
        details.push(rowArray);
    };
}

details = new Array();

function AlignSpecificationTable(){
    //alert("inside AlignSpecificationTable ");
    if ($('#specsTabInit').val() == 0){
        //alert("inside #specsTabInit is 0 ");
        var specTableRows = $('.specProdHold .specificationTable tbody tr');
        //alert( "specTableRows:" + specTableRows);
        initTabs('#main', '.tabset li', '.tabBox .tabEl');  
        initCompareArray(specTableRows);
        //alert("details:" + initCompareArray(specTableRows));
        $('#btnDifferent').click(function(event) {      
            event.preventDefault(); 
            specTableRows.find("td").removeClass('coloredSection');
            //loop for the number of rows of the first column of details array. Assumes all columns have same number of rows.
            for (var k = 0; k < details[0].length; k++)
            {
                var different = false;
                
                // loop for the number of columns in the details array.
                for(var m = 0; m < details.length; m++)
                {
                    // nested loop for the number of columns in the details array.
                    for (var n = 0; n < details.length; n++)
                    {
                        if (m != n)
                        {
                             //STX-1290
                            if (jQuery.trim(details[m][k]) != jQuery.trim(details[n][k]))
                            {
                                //STX-1290
                                different = true;
                                specTableRows.eq(k+1).find("td").addClass("coloredSection");                        
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
            specTableRows.find("td").removeClass('coloredSection');
                for (var k = 0; k < details[0].length; k++)
                {
                    var different = false;
                    //STX-1290 
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
                    if (space && !different)
                    {
                        specTableRows.eq(k+1).find("td").addClass("coloredSection");
                    }
                    //STX-1290
                }       
        }); 
        //These functions get dimensions of the table and establish alignment???
        $('td.cel').eq(0).children('table').find('tr').each(function(index) {
            var max_right_height = $(this).height();
            var max_left_height = $('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).innerHeight();    
            var heights = [];
            var max_left_row
            $('td.cel').each(function() {
                max_left_row = $(this).children('table').find('tr').eq(index).children('td').innerHeight();
                heights.push(max_left_row);
            });
            var maxHeight = Math.max.apply(this, heights);          
            if (maxHeight>=max_left_height){         
                $('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).height(maxHeight+'px');
                $('td.cel').each(function() {
                     $(this).children('table').find('tr').eq(index).children('td').height(maxHeight+'px');
                })
            }
            if (maxHeight<=max_left_height){            
                $('.specTableName').find('.specificationTable').find('tr').eq(1).find('table').find('tr').find('td').eq(index-1).height(max_left_height+'px');
                $('td.cel').each(function() {
                     $(this).children('table').find('tr').eq(index).children('td').height(max_left_height+'px');
                })
            }       
        });
        // Lower Table  
        $('td.column_lower').children('table').find('tr').each(function(index) { 
            var max_right_height = $(this).height();
            var max_left_height = $('td.model').find('table').find('tr').find('td').eq(index).innerHeight();     
            var heights = [];
            var max_left_row;
            $('td.column_lower').each(function() {
                max_left_row = $(this).children('table').find('tr').eq(index).children('td').innerHeight();
                heights.push(max_left_row);
            });
            var maxHeight = Math.max.apply(this, heights); 
            if (maxHeight>=max_left_height){        
                $('td.model').find('table').find('tr').find('td').eq(index).height(maxHeight+1+'px');
                $('td.column_lower').each(function() {
                     $(this).children('table').find('tr').eq(index).children('td').height(maxHeight+1+'px');
                })
            }
            if (maxHeight<=max_left_height){        
                $('td.model').find('table').find('tr').find('td').eq(index).height(max_left_height+'px');
                $('td.column_lower').each(function() {
                     $(this).children('table').find('tr').eq(index).children('td').height(max_left_height+'px');
                })
            }       
        })
        // Lower Table
        $('#specsTabInit').val(1);
    }
}


$(document).ready(function() {

/** Do No Remove.. Added for Bazaar Voice Start **/
    $('.reviwsTabs li:first-child').click(function() {
        $('.reviwsTabs li:nth-child(2)').removeClass('active');
        $('.reviwsTabs li:first-child').addClass('active');
        
        $('.tabContentReviews .tab:first-child').show();
        $('.tabContentReviews .tab:nth-child(2)').hide();
    });
    
    $('.reviwsTabs li:nth-child(2)').click(function() {
        $('.reviwsTabs li:nth-child(2)').addClass('active');
        $('.reviwsTabs li:first-child').removeClass('active');
        
        $('.tabContentReviews .tab:first-child').hide();
        $('.tabContentReviews .tab:nth-child(2)').show();
    });

/** Do No Remove.. Added for Bazaar Voice END **/

/** added for spec tab **/
    
    $('#tab-productdetailspec').click(function() {
        $('.tabBox').find('div.grid_4').hide();
        $('.mainFrame').removeClass('mainFrame');
        $('.tabBox').find('.grid_8').first().find('.tabEl').last().find('.grid_8').removeClass('grid_8').addClass('grid_12');
        AlignSpecificationTable();
    });

    $('#tab-productdetailgettingstarted').click(function() {
        $('.container_12').first().addClass('mainFrame');
        $('.tabBox').find('div.grid_4').show();
    });
    
    $('#tab-productdetailhowto').click(function() {
        $('.container_12').first().addClass('mainFrame');
        $('.tabBox').find('div.grid_4').show();
    });
    
    $('#tab-productdetailtroubleshooting').click(function() {
        $('.container_12').first().addClass('mainFrame');
        $('.tabBox').find('div.grid_4').show();
    });
    
    $('#tab-productdetaildownloads').click(function() {
        $('.container_12').first().addClass('mainFrame');
        $('.tabBox').find('div.grid_4').show();
    });
    
    
/** End **/ 
    
    $.fancybox.init();
    if ($('.slideArea').length > 0) {
        $('.slideArea').slideAreaProduct( {
            'navigate'          : false,
            'automove'          : false,
            'moveArea'          : '.slider',
            'sliderButton'      : '.sliderButton' 
        }); 
    }
  
  if ($(".slider").attr("id") == "support"){
        moves = $('#sliderButton').outerWidth()-2;
        $('#sliderButton').animate({left: moves}, 1);
    }
    $('#sliderButton').css("display", "block");
    
    var supportCornerUrl = $('#supportCorner').attr('href');
    var infoCornerUrl = $('#infoCorner').attr('href');
    var sc_width = $('#supportCorner').outerWidth();
    var sc_left = 0;
    if ($('#supportCorner').offset() != null)
        sc_left = $('#supportCorner').offset().left;
    var ic_width = $('#infoCorner').outerWidth();
    var sb_width = $('#sliderButton').outerWidth();
    $('#supportCorner').parent().click(function(event) {
        event.preventDefault();
    });
    $('#infoCorner').parent().click(function(event) {
        event.preventDefault();
    });
    $('#supportCorner').parent().mouseup(function(event) {
        event.preventDefault();
        moves = sb_width-2;
        $('#sliderButton').animate({left: moves}, 500, function() {window.location = supportCornerUrl;});
        mousedowned = false;
    });
    $('#infoCorner').parent().mouseup(function(event) {
        event.preventDefault();
        $('#sliderButton').animate({left: '-10'}, 500, function() { window.location = infoCornerUrl; });
        mousedowned = false;
    });
    $('#sliderBox').attr('unselectable', 'on');
    $('#sliderBox').mousedown(function(event) {
        event.preventDefault();
        event.stopPropagation();
        oldpos = event.pageX;
        mousedowned = true;
    });
    $('#sliderBox').mouseup(function(event) {
        event.preventDefault();
        if (mousedowned)
        {
            if ($('#sliderButton').offset().left > 1100)
            {
                $('#sliderButton').animate({ left: 118}, 500, function() { window.location = supportCornerUrl; });
            }
            else
            {
                $('#sliderButton').animate({ left: -10}, 500, function() { window.location = infoCornerUrl; });
            }
        }
        mousedowned = false;
    });
    $('#sliderBox').mousemove(function(event) {
        if (mousedowned)
        {
            var current_left = $('#sliderButton').css('left').replace('px', '');
            var current_x_offset = $('#sliderButton').offset().left;
            var movement = event.pageX - oldpos;
            if (current_x_offset + movement <= (sc_left+sc_width-sb_width) && (current_x_offset + movement) >= 1044)
            {
                $('#sliderButton').offset({left: current_x_offset + movement})
                oldpos = event.pageX;
            }
            else if (current_x_offset + movement > (sc_left+sc_width-sb_width))
            {
                $('#sliderButton').css('left', 118);
            }
            else if ((current_x_offset + movement) < 1044)
            {
                $('#sliderButton').css('left', -10);
            }
        }
    });
    /*$('#ALGContainer').ALGGallery({
        'elements' : '#MyThumbnails',
        'text'     : '#MyText'
    });*/

    /*$("a.videoCallBtn ").fancybox(
        {
            'padding'           : 0,
            'autoScale'         : false,
            'transitionIn'      : 'none',
            'transitionOut'     : 'none'
        }
    );*/
    $("a.videoCallBtnNoFancy").click(function(event) {
            event.preventDefault();

            var container = $(this).parent('div.boxInfo');
            if (container.length == 0) container = $(this).parent('div').parent('div.boxInfo');
            

            $('a.videoCallBtnNoFancy').parent('div.clearfix').removeClass('active-video');
            container.addClass('active-video');

            $('div.mainVideo:first').html(container.children('.video').html());
            $('div.holdVideo').children('.toolbar').children('.title').html(container.children('.holder').children('h4').html());
        });
    jQuery('.carousel').fadeGallery({
        listSelector: '.fadeGallery> li',
        navHolder:      'div.switcher',
        navCreate:      true,
        // swichTime:       3000,
        // delay:           800,
        fadeIEfix:      false
    });

    $('.video_carousel').fadeGallery({
        listSelector: '.fadeGallery> li',
        navHolder:      'div.switcher',
        navCreate:      true,
        // swichTime:       3000,
        // delay:           800,
        fadeIEfix:      false
    });

    $("a.videoCallBtn").click(function(event) {
        event.preventDefault();
        var className = $(this).attr('rel');
        $('a.videoCallBtn[rel="' + currentClassName + '"]').parent('div.clearfix').removeClass('active-video');
        $('a.videoCallBtn[rel="' + className + '"]').parent('div.clearfix').addClass('active-video');

        $('div.video').html($('.' + className).html());
        $('div.holdVideo').children('.toolbar').children('.title').html($('a.videoCallBtn[rel="' + className + '"]').parent('div.clearfix').children('.holder').children('h4').html());
        currentClassName = className;


        /*$('.' + className).html();
        inAnimation = true;
        $('div.video').fadeOut(500, function() {
            $(this).html($('.' + className).html());
            $('div.video').fadeIn(500, function() {
                currentClassName = className;
                inAnimation = false;
            });
        });*/
    });

//init tabs
    //initTabs('.tabBox', '.tabList li', '.tabContent .tab');
    //initTabs('#main', '.tabset li', '.tabBox .tabEl');

});