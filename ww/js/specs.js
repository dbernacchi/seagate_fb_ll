function createHtml()
    {    
       var html = "<div class=\"modelsTable\">\n";
        html += "<table>\n";
        html +="<tr>\n";
			html += "<td class=\"model\">\n";
		        html += "<table>\n";
		         html +="<tr>\n";
					html += "<th>Model Numbers</th>\n";
		        html += "</tr>\n";
				for (i = 0; i < ProductInfoStruct.releaseList[0].modelList.length; i++)
				{
					html+="<tr><td><span>"+ProductInfoStruct.releaseList[0].modelList[i].modelNumber;
					html+="</span></td></tr>";
				}
	        	html +="</table>\n"	
			html +="</td>\n";

			 for (k = 0; k < ProductInfoStruct.releaseList[0].attributes.length; k++)
			{
				html +="<td class=\"column\">\n";
					html +="<table>\n"
					html +="<tr>\n"
						html+= "<th><span>"+ProductInfoStruct.releaseList[0].attributes[k].title+"</span></th>\n";
					html +="</tr>\n";
					for (i = 0; i < ProductInfoStruct.releaseList[0].modelList.length; i++)
					{  	
						html+=((i%2==0)?"<tr>":"<tr class=\"even\">");
						html+="<td>";
						if(ProductInfoStruct.releaseList[0].attributes[k].subitem!=null){
							html +=ProductInfoStruct.releaseList[0].modelList[i][ProductInfoStruct.releaseList[0].attributes[k].name][ProductInfoStruct.releaseList[0].attributes[k].subitem];
						}else{
							html +=ProductInfoStruct.releaseList[0].modelList[i][ProductInfoStruct.releaseList[0].attributes[k].name];
						}
						html+="</td>";
						html+="</tr>";
					}  
					html +="</table>\n";
					html +="</td>\n";
			}

			html +="</tr></table>";
		html +="</div>";
		return html;
	}
function createAccessoriesHtml()
{
   var html = "<div class=\"specsTableHolder clearfix\">\n";
      html += "<div class=\"highLighter\">&nbsp;</div>\n";
      html += "<table class=\"specificationTable\">\n";
      html +="<tr>\n";
      html +="<td class=\"name\">\n";
      html += "<table>\n";
      html +="<tr>\n";
      html +="<th class=\"spacer\">&nbsp;</th>\n";
      html +="</tr>\n";
      html+="<tr class=\"row\">\n";
      html +="<td>\n";
      html+="<ul class=\"actionList\">\n";
      html+="<li>\n";
      html+="<a class=\"btnPrint\" href=\"#\">\n";
      html+="<a href=\"#\">print</a>\n";
      html+="</a>\n";
      html+="</li>\n";
      
      html+="<li>\n";
      html+="<a class=\"btnPrint\" href=\"#\">\n";
      html+="<a href=\"#\">mail</a>\n";
      html+="</a>\n";
      html+="</li>\n";
      html+="</ul>\n";
      html +="</td>\n";
      html +="</tr>\n";
      //html +="<tr>\n";
     // html+="<td class=\"borderCell\">&nbsp;</td>\n";
      //html +="</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";
      html +="<tr>\n";
      html += "<td><strong>Model Number</strong></td>\n";
      html += "</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";


      html +="<tr>\n";
      html += "<td><strong>Interface</strong></td>\n";
      html += "</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";

      html +="<tr>\n";
      html += "<td><strong>Cable Length</strong></td>\n";
      html += "</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";

      html +="<tr>\n";
      html += "<td><strong>Type of Cable</strong></td>\n";
      html += "</tr>\n";
      html +="<tr>\n";
      html+="<td class=\"borderCell\">&nbsp;</td>\n";
      html +="</tr>\n";
      html+="</table>\n";
      html+="</td>\n";

      html+="<td class=\"celWide\">"
      html+="<table>";
      html+="<tr>\n";
      html+="<th class=\"spacer\"><strong>Specs</strong></th>\n";
      html+="</tr>\n";
      html+="<tr class=\"row\">";
      html+="<td>&nbsp;</td>";
      html+="</tr>";
      html+="<tr>";
      html+="<td class=\"borderCell\">&nbsp;</td>";
      html+="</tr>";
      html+="<tr class=\"greySection\">";
      html+="<td class=\"dividerCell\">&nbsp;</td>";
      html+="</tr>";
    for (i = 0; i < ProductInfoStruct.releaseList[0].modelList.length; i++)
    {
        if(ProductInfoStruct.releaseList[0].modelList[i]["standardModel"]){

           html+="<tr class=\"greySection\">";
           html +="<td>"+ProductInfoStruct.releaseList[0].modelList[i]["modelNumber"]+"</td>";
            html+="</tr>";
            html+="<tr class=\"greySection\">";
            html+="<td class=\"borderCell\">&nbsp;</td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td class=\"dividerCell\">&nbsp;</td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td>"
            try{
                html+=ProductInfoStruct.releaseList[0].modelList[i]["interface"]["interfaceType"];
            }catch(e){}
            html+="</td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td class=\"borderCell\">&nbsp;</td>";
            html+="</tr>";
            html+="<tr class=\"greySection\">";
            html+="<td class=\"dividerCell\">&nbsp;</td>";
            html+="</tr>";
            html+="<tr class=\"greySection\">";
            html +="<td>";
           try{
               html+=ProductInfoStruct.releaseList[0].modelList[i]["CableLength"];
            }catch(e){}
            html+="</td>";
            html+="</tr>";
            html+="<tr class=\"greySection\">";
            html+="<td class=\"borderCell\">&nbsp;</td>";
            html+="</tr>";
            html+="<tr>";
                    html+="<td class=\"dividerCell\">&nbsp;</td>";
            html+="</tr>";
            html+="<tr>";
           html +="<td>";
           try{
               html+=ProductInfoStruct.releaseList[0].modelList[i]["TypeofCable"];
            }catch(e){}
           html+="</td>";
           html+="</tr>";
        }
    }
                html+="<tr>";
                        html+="<td class=\"borderCell\">&nbsp;</td>";
                html+="</tr>";
        html+="</table>";
        html+="</td>";
        html+="</tr>";
            html+="</table>";
    html+="</div>";
    return html;
}


