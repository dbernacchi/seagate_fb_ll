
function setValTab()
{
	var valTab="tab1";
	if(document.getElementById("tabIndexVar").value!='')
	{
		valTab=document.getElementById("tabIndexVar").value;
	}
	document.getElementById(valTab).className="active";
}
function setTab(idVal)
{
	document.getElementById("tabIndexVar").value=idVal;

    if(idVal && (idVal == 'tab1')){
        doSearchAll();
    }else if(idVal && (idVal == 'tab2')){
        doSearchProdServ();
        document.getElementById("searchRightRailProdServ").innerHTML = document.getElementById("searchRightRailAll").innerHTML; 
    }else if(idVal && (idVal == 'tab3')){
        kbChecksObj = undefined;
        doSearchKB();
    }else if(idVal && (idVal == 'tab4')){
        doSearchSupport();
        document.getElementById("searchRightRailSupport").innerHTML = document.getElementById("searchRightRailAll").innerHTML;
    }else if(idVal && (idVal == 'tab5')){
        doSearchBlogs();
        document.getElementById("searchRightRailBlogs").innerHTML = document.getElementById("searchRightRailAll").innerHTML;
    }else if(idVal && (idVal == 'tab6')){
        doSearchForums();
        document.getElementById("searchRightRailForums").innerHTML = document.getElementById("searchRightRailAll").innerHTML;
    }else if(idVal && (idVal == 'tab7')){
        doSearchDownloads();
        document.getElementById("searchRightRailDownloads").innerHTML = document.getElementById("searchRightRailAll").innerHTML;
    }

    return;
}
