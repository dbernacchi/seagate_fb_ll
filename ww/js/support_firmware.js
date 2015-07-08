$(document).ready(function() {
	$('#acceptEULA').click(function() {
		$('.stepList .btnDownloading').addClass('active');
		$('.introHolder').removeClass('active');
		$(".secondlevel").slideToggle('hidethis');
	});
});
