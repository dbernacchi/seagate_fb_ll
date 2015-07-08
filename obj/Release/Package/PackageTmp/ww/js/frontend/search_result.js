/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 13:44
 */
$(document).ready(function() {
    $("a.videoCallBtn ").fancybox(
    {
        'padding'            : 0,
        'autoScale'            : false,
        'transitionIn'        : 'none',
        'transitionOut'        : 'none'
    }
            );

    //init tabs
    initTabs('#main', '.tabFilter li', '.resultsArea .tab');

});

var divID = "";
var siteId = "";
var updateResultTab = "";

function kbEncoding(source){
    var target = source;

    target = encodeURI(target);
    target = encodeURI(target);

    return target;
}

function moveNextPage(pageUsed, total, pageDivId, tabId, siteNameId, rFields){
    if (pageDivId == undefined){
        pageDivId = divID;
    }

    if(rFields){
        rFields = kbEncoding(rFields);
    }

    if (siteNameId == undefined){
        siteNameId = siteId;
    }

    updateResultTab = tabId;
    divID = pageDivId;
    siteId = siteNameId;

    total = parseInt(total);
    pageUsed = parseInt(pageUsed);

    var pageUsed = (pageUsed - 1) * 10;
    document.getElementById("startParam").value = pageUsed;

    var site = siteId;
    var q = $("#paramQId").val();

    if (!q) {
        document.getElementById(pageDivId).innerHTML = document.getElementById('noResultsHtml').value;
        return;
    }
    
    var product_finder_searching="";
	if($("#product_finder_searching")[0]){
	    product_finder_searching=$("#product_finder_searching").attr("value");
	}else{
	    product_finder_searching="Loading......";
	}
    
    document.getElementById(pageDivId).innerHTML = product_finder_searching;

    if(tabId != "KnowledgebaseSpanId"){
        rFields = "";        
    }

    $.ajax({
        type: "GET",
        url: "/ww/jsp/JSRPortlet/search/searchResultsAjax.jsp?paramStart=" + pageUsed + "&paramSite="
                + site + "&paramQ=" + q + "&paramLocale=" + $("#rclocaleId").val() + "&paramDivID="
                + pageDivId + "&paramSiteID=" + siteNameId + "&paramTabID=" + tabId + "&rFields=" + ( rFields ? rFields : "" ),
        dataType: "text",
        success: function(text) {
            $("#" + pageDivId).html(text);
            var count = document.getElementById("updatedTotalRecordAll" + tabId);
            if(count){
                document.getElementById(tabId).innerHTML = "(" + count.value + ")";
            }else{
                document.getElementById(tabId).innerHTML = "";    
            }

            if(tabId == "KnowledgebaseSpanId"){
                $.ajax({
                    type: "GET",
                    url: "/ww/jsp/search/rightKBSearch.jsp?searchUrl=" + encodeURIComponent($("#searchUrl" + siteNameId).val()),
                    dataType: "text",
                    success: function(text) {
                        $("#searchRightRailKB").html(text);
                    }
                });
            }
        }
    });

    if(pageUsed == 0){
        $.ajax({
            type: "GET",
            url: "/ww/jsp/search/rightSuggSearchAll.jsp?paramLocale=" + $("#rclocaleId").val() + "&paramQ=" + q,
            dataType: "text",
            success: function(text) {
            	 $(".suggestedSearches").html(text.replace(/\+/g," "));  
            }
        });
    }

    return;
}
