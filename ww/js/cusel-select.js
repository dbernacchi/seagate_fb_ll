		var params = {
			changedEl: ".partnerLoginFrm select",
			visRows: 5,
			scrollArrows: true
		}
		cuSel(params);
		var params = {
			changedEl: ".supportFrm select",
			visRows: 5,
			scrollArrows: true
		}
		cuSel(params);
		var params = {
			changedEl: ".lineForm select",
			visRows: 5,
			scrollArrows: true
		}
		cuSel(params);
		var params = {
			changedEl: ".tabListBox select",
			scrollArrows: false
		}
		cuSel(params);
		/*var params = {
			changedEl: ".filterFrm select",
			scrollArrows: false
		}
		cuSel(params);*/
		var params = {
			changedEl: ".advSearchFrm select",
			scrollArrows: false
		}
		cuSel(params);
		var params = {
			changedEl: ".frmSearch select",
			scrollArrows: false
		}
		cuSel(params);
		var params = {
			changedEl: ".regionFrm select",
			visRows: 5,
			scrollArrows: true
		}
		cuSel(params);
		var params = {
			changedEl: ".customerSelectorFrm select",
			scrollArrows: false
		}
		cuSel(params);
		jQuery(document).ready(function(){
		jQuery("#addSelect").click(
		function()
		{
			var addedSelect =	'<select id="add-select" name="add-select">'+
								'<option value="1">United States</option>'+
								'<option value="2">China</option>'+
								'<option value="3">Japan</option>'+
								'<option value="4">Korea</option>'+
								'<option value="5">Taiwan</option>'+
								'<option value="6">Germany</option>'+
								'<option value="7">Spain</option>'+
								'</select>';
			jQuery(this).replaceWith(addedSelect);
			var params = {
				changedEl: ".lineForm select",
				visRows: 4,
				checkZIndex: true
			}
			cuSel(params);
		});
		jQuery("#showSel").click(
		function()
		{
			jQuery(this).prev().fadeIn();
			params = {
			refreshEl: "#city",
			visRows: 4
			}
			cuSelRefresh(params);
		});
		jQuery("#addAnimals").click(
		function()
		{
			var newAnimals = '<span value="4">Elephant</span><span value="5">Monkey</span>';
			jQuery("#cusel-scroll-animals").append(newAnimals);
			var params = {
				refreshEl: "#animals",
				visRows: 4
			}
			cuSelRefresh(params);
		});
		jQuery("#butTest").click(
		function()
		{
			if(jQuery(this).val()=="Задизайблить селект") 
			{
				jQuery("#cuselFrame-amimals3").addClass("classDisCusel");
				jQuery(this).val("Раздизайблить селект");
			}
			else
			{
				jQuery("#cuselFrame-amimals3").removeClass("classDisCusel");
				jQuery(this).val("Задизайблить селект");
			}
		});
	});