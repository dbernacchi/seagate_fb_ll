$(function()
{			
	$(".firstlevel").click(function(event) {
		if ($("#compareModelIndex").val() != 0 || $(this).next().attr("id") != "comparisonBlock"){
		if ($(this).hasClass('firstlevel')){
			$(this).next(".secondlevel").removeClass('hidethis');
			$(this).next(".secondlevel").slideToggle(0);	
			if($(this).parent().hasClass('active') != true){
				$(this).parent().addClass('active');}
			else{
				$(this).parent().removeClass('active');
			}
		}
		}
	});	 	
});
