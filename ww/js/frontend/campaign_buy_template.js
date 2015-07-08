/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 11:05
 */
var mousedowned = false;

$(document).ready(function() {
	$(document).ready(function(){
		$('.rotator').galleryScroll({
			btPrev: 'a.btnPrev',
			btNext: 'a.btnNext',
			holderList: '.holder',
			scrollElParent: 'ul',
			scrollEl: 'li',
			slideNum: 'span.switcher',
			duration : 1000,
			step: false,
			circleSlide: true,
			disableClass: 'disable',
			funcOnclick: null 
		});
	});	
});