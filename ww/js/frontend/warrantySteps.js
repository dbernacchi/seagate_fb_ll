 function openDiv(index,obj) {
			index=parseInt(index);
			if (index > ACCORDION_PANEL_COUNT ) {
				index = ACCORDION_PANEL_COUNT;
			}
			$('ul.accordion').accordion("option", "active", index);
	}