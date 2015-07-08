$(document).ready(function() {
	//init accordion
		$('ul.accordion').accordion({
			active: ".selected",
			autoHeight: false,
			header: ".opener",
			collapsible: true,
			event: "click"
		});
});
