
function onChangeSelect(idDrop,idBtn,lang){
	var aID="#"+idBtn;
	var aVal=$("#"+idDrop).val();
	var aUrl="/ww/jsp/support/download/supportDownloadEntryPopUpNew.jsp?locale="+lang+"&oid="+aVal;
	if(aVal==""){
		aUrl="#";
	}
	$(aID).attr("href",aUrl);
}
