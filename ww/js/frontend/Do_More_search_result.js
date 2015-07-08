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
			'transitionOut'		: 'none',
			'type'              : 'ajax'
		}
	);

//init tabs 
	initTabs('#main', '.tabFilter li', '.resultsArea .tab');
       
});
 var divID="";
 var siteId="";
 var updateResultTab="";
function moveNextPage(pageUsed,total,pageDivId,tabId,siteNameId)
{
    
    if(pageDivId==undefined)
    {
        pageDivId=divID;
    }
    if(siteNameId==undefined)
    {
        siteNameId=siteId;
    }
        updateResultTab=tabId;
        divID = pageDivId;
        siteId = siteNameId;
       
        total=parseInt(total);
        pageUsed=parseInt(pageUsed);
        var pageUsed=(pageUsed-1)*10;
        document.getElementById("startParam").value=pageUsed;
                var site=siteId;
                var q=$("#paramQId").val();
                var contentType=$("#contentTypeId").val();
                $.ajax({
                type: "GET",
                url: "/ww/jsp/domore/list/searchResultsDoMoreAjax.jsp?paramStart="+pageUsed+"&paramSite="+site+"&paramQ="+q+"&paramcontentType="+contentType+"&paramLocale="+$("#rclocaleId").val()+"&paramDivID="+pageDivId+"&paramSiteID="+siteNameId+"&paramTabID="+tabId,
                dataType: "text",
                success: function(text) {
                        $("#"+pageDivId).html(text);

	$("a.videoCallBtn ").fancybox(
		{
			'padding'			: 0,
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'type'              : 'ajax'
		}
	);

                        } //close success(
                }); //close $.ajax(
}

 $(window).load(function () {
	if($('#totalRecordAll').val()==undefined || $('#totalRecordAll').val()=="" ){
		$('#allSpanId').html($('#allSpanId').html()+"(0)");
	}else{
		$('#allSpanId').html($('#allSpanId').html()+"("+$('#totalRecordAll').val()+")");
	}


});