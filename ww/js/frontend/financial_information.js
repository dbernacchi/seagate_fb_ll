(function($)
{
	var validateChecker = 'validator';
	
	var Data = {
		defaults: {
			className: 'validator_error',
			trigger: 'submit',
			format: null,
			invalidEmpty: false,
			minLength: null,
			maxLength: null,
			minValue: null,
			maxValue: null,
			contains: null,
			notContains: null,
			equals: null,
			notEquals: null,
			checked: null,
			before: null, // define function that will be called before validation (output will be used for validation); this = field; agrs(field, value);
			after: null, // define function that will be called after default validation (output will be used for error notification (true - valid, false - invalid)); this = field; agrs(field, value, error);
			error: null, // define function that will be called after error occurs (return: true/false - default error code run); this = field; agrs(field, value, error);
			correct: null // define function that will be called after correct state occurs (return: true/false - default correct code run); this = field; agrs(field, value, error);
		},
		formats: {
			date: /^\d{2}[- \/.]\d{2}[- \/.]\d{4}$/,
			datetime: /^\d{2}[- \/.]\d{2}[- \/.]\d{4}\s*?\d{2}[- :.]\d{2}$/,
			numeric: /^\d+$/,
			decimal: /^[0-9\.,]+$/,
			alphanumeric: /^([a-z]|\d|\s|-|\.|_|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+$/i
		},
		errors: {
			empty: 'Cannot be empty',
			checked: 'Should be checked',
			date: 'Date has wrong format. Example: mm/dd/yyyy',
			datetime: 'Date and time has wrong format. Example: mm/dd/yyyy hh:mm',
			numeric: 'Number can have only digits',
			decimal: 'Number has wrong format',
			alphanumeric: 'Only alphanumeric characters are allowed'
		}
	};
	
	var checker = {
		initialized: false,
		init: function()
		{
			checker.initialized = true;
		},
		attach: function(o)
		{
			var $el = $(this);
			o = $.extend({}, Data.defaults, o);
			// save options
			$el.data(validateChecker, o);
			// set trigger events
			$.each(o.trigger.split(' '), function(i, eventType) {
				eventType += '.' + validateChecker;
				$el.unbind(eventType).bind(eventType, function(e) {
					checker.runValidation(this);
				});
			});
		},
		validate: function()
		{
			var error = false;
			$(this).each(function(i, el) {
				if(!checker.runValidation(el)) {
					error = true;
				}
			});
			return !error;
		},
		runValidation: function(field)
		{
			$field = $(field);
			var er = {
				status: false,
				type: '',
				message: ''
			};
			var o = $field.data(validateChecker);
			// check if validator activated for element
			if(!o) return true;
			// get field value to validate
			var v = $field.val();
			// call before function (assign return to value)
			if(o.before) {
				v = o.before.apply($field[0], [$field[0], $field.val()]);
			}
			// make sure value is a string
			v += '';
			// validate
			if($field.is(':checkbox') || $field.is(':radio')) {
				if(o.checked != null && o.checked != $field.is(':checked')) {
					er.status = true;
					er.type = 'checked';
					er.message = Data.errors.checked;
				}
			}
			else {
				if(v.length == 0) {
					if(o.invalidEmpty == true) {
						er.status = true;
						er.type = 'invalidEmpty';
						er.message = Data.errors.empty;
					}
				}
				else {
					if(o.format != null && v.length > 0 && v.search(Data.formats[o.format]) == -1) {
						er.status = true;
						er.type = 'format';
						er.message = Data.errors[o.format];
					}
					else if(o.minLength != null && v.length < o.minLength) {
						er.status = true;
						er.type = 'minLength';
						er.message = 'should be at least ' + o.minLength + ' characters long';
					}
					else if(o.maxLength != null && v.length > o.maxLength) {
						er.status = true;
						er.type = 'maxLength';
						er.message = 'should be no more than ' + o.maxLength + ' characters';
					}
					else if(o.minValue != null && !isNaN(v) && (v * 1 < o.minValue)) {
						er.status = true;
						er.type = 'minValue';
						er.message = 'cannot be less than ' + o.minValue;
					}
					else if(o.maxValue != null && !isNaN(v) && (v * 1 > o.maxValue)) {
						er.status = true;
						er.type = 'maxValue';
						er.message = 'cannot be greater than ' + o.maxValue;
					}
					else if(o.contains != null && v.search(o.contains) == -1) {
						er.status = true;
						er.type = 'contains';
						er.message = 'should contain "' + o.contains + '"';
					}
					else if(o.notContains != null && v.search(o.notContains) != -1) {
						er.status = true;
						er.type = 'notContains';
						er.message = 'should not contain "' + o.notContains + '"';
					}
					else if(o.equals != null && v != o.equals) {
						er.status = true;
						er.type = 'equals';
						er.message = 'should be equal to "' + o.equals + '"';
					}
					else if(o.notEquals != null && v == o.notEquals) {
						er.status = true;
						er.type = 'notEquals';
						er.message = 'should not be equal to "' + o.notEquals + '"';
					}
				}
			}
			
			// run after function
			if(o.after) {
				o.after.apply($field[0], [$field[0], $field.val(), er]);
			}
			if(er.status === true) {
				$field.data('validatorError', true);
				if(o.error == null || o.error.apply($field[0], [$field[0], $field.val(), er]) !== false) {
					$field.addClass(o.className);
				}
			}
			else if(er.status === false) {
				$field.removeData('validatorError');
				if(o.correct == null || o.correct.apply($field[0], [$field[0], $field.val(), er]) !== false) {
					$field.removeClass(o.className);
				}
			}
			return !er.status;
		}
	};
	
	$.fn.validator = function()
	{
		if(!checker.initialized) {
			checker.init();
		}
		var output;
		if(typeof arguments[0] == 'string') {
			if($.isFunction(checker[arguments[0]])) {
				output = checker[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
		else {
			output = checker.attach.apply(this, [arguments[0]]);
		}
		return (output != undefined ? output : this);
	};
	
	$.validator = Data;
	
})(jQuery);

//PrintArea
(function($) {
	var printAreaCount = 0;
	$.fn.printArea = function() {
		var ele = $(this);
		var idPrefix = "printArea_";
		removePrintArea(idPrefix + printAreaCount);
		printAreaCount++;
		var iframeId = idPrefix + printAreaCount;
		var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
		iframe = document.createElement('IFRAME');
		$(iframe).attr({
			style : iframeStyle,
			id : iframeId
		});
		document.body.appendChild(iframe);
		var doc = iframe.contentWindow.document;
		$(document).find("link").filter(function() {
			return $(this).attr("rel").toLowerCase() == "stylesheet";
		}).each(
				function() {
					doc.write('<link type="text/css" rel="stylesheet" href="'
							+ $(this).attr("href") + '" >');
				});
		doc.write('<div class="' + $(ele).attr("class") + '">' + $(ele).html()
				+ '</div>');
		doc.close();
		var frameWindow = iframe.contentWindow;
		frameWindow.close();
		frameWindow.focus();
		frameWindow.print();
	}
	var removePrintArea = function(id) {
		$("iframe#" + id).remove();
	};
})(jQuery);

//init financial new search
function initFinancialNewsSearch(){
	if(null==rcLocaleJS){
	    rcLocaleJS="en-us";
	}
	var q="q= inmeta:publicationDate:daterange:..&site="+financialNewsSearchSite+"&output=xml_no_dtd&ie=UTF-8&getfields=*&filter=0&requiredfields=(pressReleaseType:press_release_type_financial).(lang:"+rcLocaleJS+")&rclocale="+rcLocaleJS+"&sort=date:D:S:d1&num=10";
	
	$.ajax({
		type: "POST",
		url: "/ww/jsp/aboutSeagate/investors/financialNewsSearchAjax.jsp",
		cache: false,
		data: q,
		success: function(msg){
		$("#financialNewsSearchTable").html(msg);
				
		}
	});
}

// check if the the date format is MM/DD/YYYY
function isdate(strDate){ 
	var strSeparator = "/"; 
	var strDateArray;
	var intYear;
	var intMonth;
	var intDay;
	var boolLeapYear;
	strDateArray = strDate.split(strSeparator);

	if(strDateArray.length!=3) return false;

	intYear = parseInt(strDateArray[2],10);
	intMonth = parseInt(strDateArray[0],10);
	intDay = parseInt(strDateArray[1],10);

	if(isNaN(intYear)||isNaN(intMonth)||isNaN(intDay)) return false;

	if(intMonth>12||intMonth<1) return false;

	if((intMonth==1||intMonth==3||intMonth==5||intMonth==7||intMonth==8||intMonth==10||intMonth==12)&&(intDay>31||intDay<1)) return false;

	if((intMonth==4||intMonth==6||intMonth==9||intMonth==11)&&(intDay>30||intDay<1)) return false;

	if(intMonth==2){
		if(intDay<1) return false;

		boolLeapYear = false;
		if((intYear%100)==0){
			if((intYear%400)==0) boolLeapYear = true;
		}else{
			if((intYear%4)==0) boolLeapYear = true;
		}

		if(boolLeapYear){
			if(intDay>29) return false;
		}
		else{
			if(intDay>28) return false;
		}
	}

	return true;
}

// validation for search date on financial news and news release page
function checkSearchDate(date,textID,divID){
	var isValid=false;
	isValid=isdate(date);
	if(!isValid){
		$("#"+textID).addClass("default validator_error");
		$("#"+textID).parent("span").addClass("text error");
		$("#"+divID).attr("style","display: block;");
	}else{
		$("#"+textID).removeClass("validator_error");
		$("#"+textID).parent("span").removeClass("error");
		$("#"+divID).attr("style","display: none;");
	}
	return isValid;
	
}

function strToDate(strDate) {
	var strDateArray = strDate.split("/");
	if (strDateArray.length != 3) return false;
	var intYear = parseInt(strDateArray[2], 10);
	var intMonth = parseInt(strDateArray[0], 10) - 1;
	var intDay = parseInt(strDateArray[1], 10);
	var d = new Date();
	d.setYear(intYear);
	d.setMonth(intMonth);
	d.setDate(intDay);
	return d;
}

function checkSearchDates(datefromstr, datetostr, textID, divID){
	var isValid = false;
	var datefrom = strToDate(datefromstr);
	var dateto = strToDate(datetostr);
	if (dateto >= datefrom) {
		isValid = true;
	}
	if (!isValid) {
		$("#"+textID).addClass("default validator_error");
		$("#"+textID).parent("span").addClass("text error");
		$("#"+divID).show();
	} else {
		$("#"+textID).removeClass("validator_error");
		$("#"+textID).parent("span").removeClass("error");
		$("#"+divID).hide();
	}
	return isValid;
}

function dismissError() {
	if ($('#startPressDate').hasClass('validator_error')) {
		$("#startPressDate").removeClass("validator_error");
		$("#startPressDate").parent("span").removeClass("error");
		$("#startPressDateError").hide();
		$("#startPressDate").val(dateVar);
	}
	if ($('#endPressDate').hasClass('validator_error')) {
		$("#endPressDate").removeClass("validator_error");
		$("#endPressDate").parent("span").removeClass("error");
		$("#endPressDateError").hide();
		$("#endPressDate").val(dateVar);
	}
}

function dismissErrorFin() {
	if ($('#startFinDate').hasClass('validator_error')) {
		$("#startFinDate").removeClass("validator_error");
		$("#startFinDate").parent("span").removeClass("error");
		$("#startFinDateError").hide();
		$("#startFinDate").val(dateVar);
	}
	if ($('#endFinDate').hasClass('validator_error')) {
		$("#endFinDate").removeClass("validator_error");
		$("#endFinDate").parent("span").removeClass("error");
		$("#endFinDateError").hide();
		$("#endFinDate").val(dateVar);
	}
}

$(function() {
	$('#pressSearch').blur(dismissError);
	$('#finSearch').blur(dismissErrorFin);
});

$(document).ready(function() {
	//initTabs('.tabBox2', '.tabList li', '.tabContent2 .tab2');
	initTabs('.tabBox3', '.tabList3 li', '.tabContent3 .tab3');
	initTabs('.tabBox3', '.tabList3 td', '.tabContent3 .tab3');
	//initTabs('.tabBox4', '.tabList4 li', '.tabContent4 .tab4');

    /*add for keyup event for text box on financial news and news release tab*/
    $("#keyword2").keyup(function(e) {
		
		if(e.which==13){
			e.preventDefault();
			financialNewsSearch();
		}
		
	});
	$("#startFinDate").keyup(function(e) {
		
		if(e.which==13){
			e.preventDefault();
			financialNewsSearch();
		}
		
	});
	$("#endFinDate").keyup(function(e) {
		
		if(e.which==13){
			e.preventDefault();
			financialNewsSearch();
		}
		
	});
	$("#keyword").keyup(function(e) {
		
		if(e.which==13){
			e.preventDefault();
			submitSearchFormPromo();
		}
		
	});
	$("#startPressDate").keyup(function(e) {
		
		if(e.which==13){
			e.preventDefault();
			submitSearchFormPromo();
		}
		
	});
	$("#endPressDate").keyup(function(e) {
		
		if(e.which==13){
			e.preventDefault();
			submitSearchFormPromo();
		}
		
	});
	//init financial new search
	if($("#financialNewsTabSearch")[0]){
		$("#startFinDate").val(dateVar);
		$("#endFinDate").val(dateVar);
		$("#keyword2").val(qVar);
	    initFinancialNewsSearch();
	}
	
	
	// init press release search
	if ($("#searchPressDivID")[0]) {
		$("#startPressDate").val(dateVar);
		$("#endPressDate").val(dateVar);
		$("#keyword").val(qVar);
		ajaxPressRelease(1);
	}
	
	//init custom scroll
	$(function() {
		$('.box .contentScrol').jScrollPane({autoReinitialise: true, hijackInternalLinks: true, showArrows: true});
	});

	$('.newsFeed').fadeGallery({
		listSelector: '.newsFaderList li',
		navCreate:		true,
		swichTime:		7000,
		delay:			800,
		fadeIEfix:		false,
		autoHeight:		false,
		mouseOverPause:	true
	});

	$("a.btnSeeMore ").fancybox(
		{
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			centerOnScroll		: true,
			'onComplete'	: function(){
				$('.galleryProduct').galleryScroll({
					btPrev: 'a.btnPrev',
					btNext: 'a.btnNext',
					holderList: 'div.holder',
					scrollElParent: 'ul',
					scrollEl: 'li',
					slideNum: 'div.switcher',
					duration : 1000,
					circleSlide: true,
					disableClass: 'disable',
					funcOnclick: null,
					autoSlide:false
				});
				$("a.videoCallBtn ").fancybox(
					{
						'padding'			: 0,
						'autoScale'			: false,
						'transitionIn'		: 'none',
						'transitionOut'		: 'none',
						centerOnScroll		: true
					}
				);
			}
		}
	);
	
	$("a.btnMore").filter(".popupwin").fancybox(
			{
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none',
				centerOnScroll		: true,
				'onComplete'	: function(){
					$('.galleryProduct').galleryScroll({
						btPrev: 'a.btnPrev',
						btNext: 'a.btnNext',
						holderList: 'div.holder',
						scrollElParent: 'ul',
						scrollEl: 'li',
						slideNum: 'div.switcher',
						duration : 1000,
						circleSlide: true,
						disableClass: 'disable',
						funcOnclick: null,
						autoSlide:false
					});
					$("a.videoCallBtn ").fancybox(
							{
								'padding'			: 0,
								'autoScale'			: false,
								'transitionIn'		: 'none',
								'transitionOut'		: 'none',
								centerOnScroll		: true
							}
					);
				}
			}
	);

	$("a.openTeamPopup").fancybox(
		{
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none'
		}
	);
	$("a.videoCallBtn").fancybox(
		{
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none'
		}
	);
	$("a.btnTealSm").fancybox(
		{
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none'
		}
	);
	$("a.openFinancial").fancybox(
		{
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'onComplete'	:function(){
				$('.contentScrol').jScrollPane({autoReinitialise: true, hijackInternalLinks: true, showArrows: true});
			}
		}
	);

	$(function() {
		$('.coloredBoxJobs .contentScrol').jScrollPane({autoReinitialise: true, hijackInternalLinks: true, showArrows: true});
	});

		$('.tabListBar').find('a').click(function(event) {
			event.preventDefault();
			var className = $(this).attr('rel');
			if (className && className !== undefined)
			{
				$('.tabWrapAlfa').children('div').each(function() {
					if (!$(this).hasClass('tabListBar'))
					{
						if ($(this).hasClass(className)) $(this).show();
						else $(this).hide();
					}
				});
			}
		});


		var spec_index = $('.tabList2').children('li.active').index('.tabList2 > li');
		var className = $('.tabListBar').eq(spec_index).find('li.active').children('a').attr('rel');
		if (className && className !== undefined)
		{
			$('.tabWrapAlfa').children('div').each(function() {
				if (!$(this).hasClass('tabListBar'))
				{
					if ($(this).hasClass(className)) $(this).show();
					else $(this).hide();
				}
			});
		}

		$('.tabList').find('a').mouseup(function(event) {
			event.preventDefault();
			var spec_index = $(this).parent('li').index('.tabList2 > li');
			var className = $('.tabListBar').eq(spec_index).find('li.active').children('a').attr('rel');
			if (className && className !== undefined)
			{
				$('.tabWrapAlfa').children('div').each(function() {
					if (!$(this).hasClass('tabListBar'))
					{
						if ($(this).hasClass(className)) $(this).show();
						else $(this).hide();
					}
				});
			}
		});
		
		/*$(function() {
			$('#startFinDate').validator({
				format: 'date',
				invalidEmpty: false,
				correct: function() {
					$(this).parent().removeClass('error');
					$('#startFinDateError').hide();
				},
				error: function() {
					$(this).parent().addClass('error');
					$('#startFinDateError').show();
				}
			});
			
			$('#finSearch').click(function(e) {
				$('#startFinDate').validator('validate');
			});
		});
		
		$(function() {
			$('#endFinDate').validator({
				format: 'date',
				invalidEmpty: false,
				correct: function() {
					$(this).parent().removeClass('error');
					$('#endFinDateError').hide();
				},
				error: function() {
					$(this).parent().addClass('error');
					$('#endFinDateError').show();
				}
			});
			
			$('#finSearch').click(function(e) {
				$('#endFinDate').validator('validate');
			});
		});
		
		
		$(function() {
			$('#startPressDate').validator({
				format: 'date',
				invalidEmpty: false,
				correct: function() {
					$(this).parent().removeClass('error');
					$('#startPressDateError').hide();
				},
				error: function() {
					$(this).parent().addClass('error');
					$('#startPressDateError').show();
				}
			});
			
			$('#pressSearch').click(function(e) {
				$('#startPressDate').validator('validate');
			});
		});
		
		$(function() {
			$('#endPressDate').validator({
				format: 'date',
				invalidEmpty: false,
				correct: function() {
					$(this).parent().removeClass('error');
					$('#endPressDateError').hide();
				},
				error: function() {
					$(this).parent().addClass('error');
					$('#endPressDateError').show();
				}
			});
			
			$('#pressSearch').click(function(e) {
				$('#endPressDate').validator('validate');
			});
		});
		*/
		
		if(document.newsFeedForm != undefined && document.newsFeedForm.twitterID != undefined){
			getTwitterFeed(document.newsFeedForm.twitterID.value,"twitterFeed", "#newsFeed > li");
		} else {
			$("#twitterFeed").remove();
			$('#newsBarHoldLI').fadeGallery({
				listSelector: '#newsFeed > li',
				navCreate:		true,
				swichTime:		7000,
				delay:			800,
				fadeIEfix:		false,
				mouseOverPause:	true
			});
		}
});

$(document).ready(function() {
	if(document.getElementById("videoCountId")!=null && document.getElementById("ALGThumbItem")!=null)
                document.getElementById("ALGThumbItem").id="ALGThumbItem_"+document.getElementById("videoCountId").value;
              if(document.doMoreForm!=null && document.doMoreForm.mediumArrayId!=null && document.doMoreForm.largeArrayId!=null && document.doMoreForm.thumbArrayId!=null)  {

                var mediumArray=new Array();
                if(document.doMoreForm.mediumArrayId.length>0)
                    {
                for(var i=0; i<document.doMoreForm.mediumArrayId.length;i++)
                    {
                        mediumArray[i]=document.doMoreForm.mediumArrayId[i].value;
                    }
                    }
                    else
                        {
                             mediumArray[0]=document.doMoreForm.mediumArrayId.value;
                        }

				var typesArray=new Array();
                if(document.doMoreForm.types.length>0)
                    {
                for(var i=0; i<document.doMoreForm.types.length;i++)
                    {
                        typesArray[i]=document.doMoreForm.types[i].value;
                    }
                    }
                    else
                        {
                             typesArray[0]=document.doMoreForm.types.value;
                        }
  		   var largeArray=new Array();
                   if(document.doMoreForm.largeArrayId.length>0)
                       {
                for(var i=0; i<document.doMoreForm.largeArrayId.length;i++)
                    {
                        largeArray[i]=document.doMoreForm.largeArrayId[i].value;
                    }
                       }
                       else
                        {
                             largeArray[0]=document.doMoreForm.largeArrayId.value;
                        }
                    var thumbArray=new Array();
                    if(document.doMoreForm.largeArrayId.length>0)
                       {
                for(var i=0; i<document.doMoreForm.thumbArrayId.length;i++)
                    {
                        thumbArray[i]=document.doMoreForm.thumbArrayId[i].value;
                    }
                       }
                       else
                           {
                               thumbArray[0]=document.doMoreForm.thumbArrayId.value;
                           }
                    var altArray=new Array();
                    if(document.doMoreForm.altArrayId.length>0)
                    {
                    	for(var i=0; i<document.doMoreForm.altArrayId.length;i++)
                    	{
                    		altArray[i]=document.doMoreForm.altArrayId[i].value;
                    	}
                    }
                    else
                    {
                    	altArray[0]=document.doMoreForm.altArrayId.value;
                    }

			              }
		     if(thumbArray != undefined){ 
		$('#ALGContainer').ALGGallery({
				'elements'     : [{					
					color	   : 'default',
					medium     : mediumArray,
					large      : largeArray,
					thumbnails : thumbArray,
					types      : typesArray,
					altText    : altArray
			}],
			'defaultColor'  :  'default'
        });
	}	

	$('.galleryVideo').galleryScroll({
		btPrev: 'a.btnPrev',
		btNext: 'a.btnNext',
		holderList: '.holder',
		scrollElParent: 'ul',
		scrollEl: 'li',
		slideNum: 'div.switcher',
		duration : 1000,
		step: false,
		circleSlide: true,
		disableClass: 'disable',
		funcOnclick: null,
		autoSlide:false
	});
	$('.gallery').galleryScroll({
		btPrev: 'a.btnPrev',
		btNext: 'a.btnNext',
		holderList: '.holder',
		scrollElParent: 'ul',
		scrollEl: 'li',
		slideNum: 'div.switcher',
		duration : 1000,
		step: false,
		circleSlide: true,
		disableClass: 'disable',
		funcOnclick: null,
		autoSlide:false
	});
	$("a.OpenCommunity").fancybox(
	{
		'padding'		: 0,
		'autoScale'		: false,
		'transitionIn'	: 'none',
		'transitionOut'	: 'none'
	});
	/* URL ENCODING */
	var qs = (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i){
			var p=a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})
	(window.location.search.substr(1).split('&'));
 	var firstNode = qs["firstlevel"];
	var secNode = qs["secondlevel"];	
	initTabs('.tabBox4', '.tabList4 li', '.tabContent4 .tab4');	
	if (firstNode){		
		$('.tabListBar').find('ul').find('li').each(function(l) { 
 			$(this).removeClass("active");
			$('.tabContent4 .tab4').eq(l).css({
				position: 'absolute',
				top:'-9999px',
				left:'-9999px'
			});                        
			if(firstNode == $(this).find('a').attr('id')){  
				$(this).addClass("active"); 
				$('.tabContent4 .tab4').eq(l).css({
					position: 'static',
					top:'0',
					left:'0'
				});			 	
			}
		})
	}	
	if (secNode){
		$('.tabBox3').find('li').each(function(i) {
 			$(this).removeClass("active");
			$('.infoTabText .tabBox3 .tabContent3 .tab3').eq(i).css({
				position: 'absolute',
				top:'-9999px',
				left:'-9999px'
			});                        
			if(secNode ==  $(this).find('a').attr('id')){
				$(this).addClass("active"); 
				$('.infoTabText .tabBox3 .tabContent3 .tab3').eq(i).css({
					position: 'static',
					top:'0',
					left:'0'
				});			 	
			}
		})
	}	 
});
/* URL ENCODING */
function openTabLink(firstNode, secNode){
	if (firstNode){		
		$('.tabListBar').find('ul').find('li').each(function(l) { 
			$(this).removeClass("active");
			$('.tabContent4 .tab4').eq(l).css({
				position: 'absolute',
				top:'-9999px',
				left:'-9999px'
			});    
			if(firstNode == $(this).find('a').attr('id')){  				
				$(this).addClass("active"); 
				$('.tabContent4 .tab4').eq(l).css({
					position: 'static',
					top:'0',
					left:'0'
				});			 	
			}
		});
	}
	if (secNode){
		$('.tabList3').find('li').each(function(i) {
 			$(this).removeClass("active");
			$('.tabContent3 .tab3').eq(i).css({
				position: 'absolute',
				top:'-9999px',
				left:'-9999px'
			});          
			if(secNode ==  $(this).find('a').attr('id')){
				$(this).addClass("active"); 
				$('.tabContent3 .tab3').eq(i).css({
					position: 'static',
					top:'0',
					left:'0'
				});			 	
			}
		});
	}	
}
/* URL ENCODING */
/*window.onload = function() {

	$('#newsBarHoldLI').fadeGallery({
		listSelector: '#newsFeed > li',
		navCreate:		true,
		swichTime:		7000,
		delay:			800,
		fadeIEfix:		false,
		mouseOverPause:	true
	});
};*/
function clickTab(trgLink){
	$("#" + trgLink).click();
	/*var evt='click';
	var lnk =document.getElementById(trgLink);
	var fireOnThis = lnk;
	if( document.createEvent ) {
	  var evObj = document.createEvent('MouseEvents');
	  evObj.initEvent( evt, true, false );
	  fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	  fireOnThis.fireEvent('on'+evt);
	}*/
}
function clickTabTwice(trgLink1,trgLink2){
	clickTab(trgLink1);
	clickTab(trgLink2);
}

$(document).ready(function() {
	var navTab =  $(document).getUrlParam("navtab");
	var subNavTab = $(document).getUrlParam("subnavtab");
	if(navTab){
		var navTabLink = "#" + navTab + "-li4";  // build id of the link
		var navTabContent = "#" + navTab + "-cd4"; // build id of the content div
		var navTabContentF = $(navTabContent).parents('div.tab4');
		var navTabContentF1 = $(navTabContent).parents('div.tab');
		if($(navTabLink).html()){ // clear all "active" class elements and add back to desired tab/content
			$(navTabLink).siblings().removeClass('active');
			$(navTabLink).addClass('active');
			if (navTabContentF.length > 0) {
				navTabContentF.siblings().removeClass('active');
				navTabContentF.addClass('active');
			}
			if ($(navTabLink).length > 0) {
				$(navTabLink).click();
			}
		}
		if(subNavTab){	//repeat for subnav
			var subNavTabLink = "#" + subNavTab + "-li3";
			var subNavTabContent = "#" + subNavTab + "-cd3";
			var subNavTabContentF = $(subNavTabContent).parents('div.tab3');
			if($(subNavTabLink).html()){		
				$(subNavTabLink).siblings().removeClass('active');
				$(subNavTabLink).addClass('active');
				if (subNavTabContentF.length > 0) {
					subNavTabContentF.siblings().removeClass('active').css({
						'position' : 'absolute',
						'top' : '-99999px',
						'left' : '-99999px'
					});
					subNavTabContentF.addClass('active').css({
						'position' : 'static',
						'top' : '0px',
						'left' : '0px'
					});
				}
				if ($(subNavTabLink).length > 0) {
					$(subNavTabLink).click();
				}
			}
		}
	}
});
$(document).ready(function() {
	var url_address= location.href;
	if(url_address.indexOf("/about/investors/")!=-1){
		var hash1;
		var hash2;
		$(window).hashchange( function(){
			var hash = location.hash;
			hash= hash.replace( /^#/, '');
				if(hash.indexOf("|")!=-1){
					hash1=hash.split("|")[0];
					hash2=hash.split("|")[1];
				}else{
					hash1=hash
				}
			backUrl(hash1,hash2);
		});
		$(window).hashchange();
	}
});

function backUrl(navTab,subNavTab){
	if(navTab){
		var navTabLink = "#" + navTab + "-li4";  // build id of the link
		var navTabContent = "#" + navTab + "-cd4"; // build id of the content div
		var navTabContentF = $(navTabContent).parents('div.tab4');
		var navTabContentF1 = $(navTabContent).parents('div.tab');
		if($(navTabLink).html()){ // clear all "active" class elements and add back to desired tab/content
			$(navTabLink).siblings().removeClass('active');
			$(navTabLink).addClass('active');
			if (navTabContentF.length > 0) {
				navTabContentF.siblings().removeClass('active');
				navTabContentF.addClass('active');
			}
			if ($(navTabLink).length > 0) {
				$(navTabLink).click();
			}
		}
		if(subNavTab){	//repeat for subnav
			var subNavTabLink = "#" + subNavTab + "-li3";
			var subNavTabContent = "#" + subNavTab + "-cd3";
			var subNavTabContentF = $(subNavTabContent).parents('div.tab3');
			if($(subNavTabLink).html()){		
				$(subNavTabLink).siblings().removeClass('active');
				$(subNavTabLink).addClass('active');
				if (subNavTabContentF.length > 0) {
					subNavTabContentF.siblings().removeClass('active').css({
						'position' : 'absolute',
						'top' : '-99999px',
						'left' : '-99999px'
					});
					subNavTabContentF.addClass('active').css({
						'position' : 'static',
						'top' : '0px',
						'left' : '0px'
					});
				}
				if ($(subNavTabLink).length > 0) {
					$(subNavTabLink).click();
				}
			}
		}
	}
}