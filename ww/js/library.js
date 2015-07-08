// Fix background image flickering in IE
try {
  document.execCommand('BackgroundImageCache', false, true);
} catch(e) { }

// Run jQuery in no conflict mode so that it will work in the same page as Prototype
// See jQuery docs for more info: http://docs.jquery.com/Core/jQuery.noConflict
//jQuery.noConflict();

// To restore "normal usage" (not running in no conflict mode), simply delete the noConflict()
// line above and replace 'jQuery(' with '$(' in this file and any templates. Do not change any
// other JavaScript files as they are already built to support "normal" and no conflict mode
// correctly.

//prevents any word in cell of class .chopname from going over 13 chars. used to control length of names in spa tables
function fnInit() {
   Products.init();
}

function processEnterKey(e){ 
    if (null == e)
        e = window.event ;
    if (e.keyCode == 13)
    { 
        document.getElementById("ProgramSearch").click();
        return false;   
    }
}

function fnStrFormat(origText) {
    var v1 = origText;
	var v2 = origText;
	var secondLine = "";
	var breakChar = origText;
	var lnCnt = 25;
	var tmpCnt = "";
	//alert (" v1 " +v1);
	var strLen = v1.length;
	//alert(breakChar);
	if ( strLen > lnCnt ) {
        //v2 = v1.substring(0,lnCnt);
		tmpCnt = lnCnt;
		while ( breakChar != ' ' && breakChar != '\n' && breakChar !='\t' && breakChar != '') {
		    tmpCnt = tmpCnt + 1;
			breakChar = v1.charAt(tmpCnt);
		}
		v2 = v1.substring(0, tmpCnt);
		//v2 = v1.substring(0, tmpCnt) + "<br>";
		//if ( v1.length > tmpCnt+22 ) {
		//	v2 = v2 + v1.substring(tmpCnt, tmpCnt+22);
		//}
		//else {
		//	v2 = v2 + v1.substring(tmpCnt, v1.length);
		//}
		//alert (" v2 " + v2);
	}
	return v2;
}

// Create Waiting image while the GeneralCommunications is loaded into the dashboard
function PendingGLCRendering() {
	var pendingHtml = "<div id='PendingGLCDisplay'>";
    pendingHtml += "<img src='/portal/images/misc/in_progress.gif' height='18' width='20' alt='starting...'/>";
    pendingHtml += "</div>";
	
	jQuery('#GeneralStatusPortletHeader').blur();
	jQuery('#GLCDisplayMessage').empty().append(pendingHtml);
}

// Create Waiting image while the Program Communications is loaded into the dashboard
function PendingPLRendering() {
	var pendingHtml = "<div id='PendingPLDisplay'>";
    pendingHtml += "<img src='/portal/images/misc/in_progress.gif' height='18' width='20' alt='starting...'/>";
    pendingHtml += "</div>";
	
	jQuery('#ProgramsStatusPortletHeader').blur();
	jQuery('#PLDisplayMessage').empty().append(pendingHtml);
	return;
}

// Create Waiting image while the Policies Communications is loaded into the dashboard
function PendingPLCRendering() {
	var pendingHtml = "<div id='PendingPLCDisplay'>";
    pendingHtml += "<img src='/portal/images/misc/in_progress.gif' height='18' width='20' alt='starting...'/>";
    pendingHtml += "</div>";
	
	jQuery('#PoliciesStatusPortletHeader').blur();
	jQuery('#PLCDisplayMessage').empty().append(pendingHtml);
}

// Create Waiting image while the Products Communications is loaded into the dashboard
function PendingPRCRendering() {
	var pendingHtml = "<div id='PendingPRCDisplay'>";
    pendingHtml += "<img src='/portal/images/misc/in_progress.gif' height='18' width='20' alt='starting...'/>";
    pendingHtml += "</div>";
	
	jQuery('#ProductsStatusPortletHeader').blur();
	jQuery('#PRCDisplayMessage').empty().append(pendingHtml);
}

var LocationPopup = {
  open: false,
  mapSrc: null,
  init: function() {
    var lp = this;
    lp.mapSrc = jQuery('#LocationPopupMap').attr('src');
    jQuery('#LocationPopup .header ul').click(
      function() {
        if (! lp.open)
        {
          jQuery('div.wrapper', jQuery('#LocationPopup').addClass('lpActive')).slideDown(200);
          lp.open = true;
        }
        return false;
      }
    );
    jQuery('#LocationPopup a.close').click(
      function() {
        if (lp.open)
        {
          jQuery('div.wrapper', jQuery('#LocationPopup').removeClass('lpActive')).slideUp(200);
          lp.open = false;
        }
        return false;
      }
    );
  },
  hilite: function(region) {
    var $map = jQuery('#LocationPopupMap');
    if ($map)
      $map.attr('src', $map.attr('src').replace(/map_short[\-a-z]*\.gif/g,"map_short-"+region+".gif"));
  },
  unhilite: function(region) {
    var $map = jQuery('#LocationPopupMap');
    if ($map)
      $map.attr('src', LocationPopup.mapSrc);
  },
  hiliteLinks: function(id) {
    jQuery('ul.countryList ul').removeClass('hilited');
    jQuery('#'+id).addClass('hilited');
    return false;
  }
};
jQuery(function() { LocationPopup.init(); });

/* Special search behavior */
var Search = {
  prompt: "Search", // default value - should get real value from markup
  init: function() { this.prompt = jQuery('#searchText').focus(this.focus).blur(this.blur).val(); },
  focus: function() { if (this.value == Search.prompt) { this.value = ''; } },
  blur: function() { if (this.value.length == 0) { this.value = Search.prompt; } }
};

jQuery(function() {
  Search.init();
});

/*
// Activate Target Tracker tab if it is present
// Highlight the Target Tracker tab
jQuery(function() {
	var hasTargetTracker = false;
	jQuery('ul.tabs li').each(function() {
		if ( jQuery('a', jQuery(this)).attr('href') == '#TargetTracker' ) {
			jQuery(this).addClass("active");
			hasTargetTracker = true;
		}
	});
	
	if (hasTargetTracker) {
		jQuery('ul.tabs li').each(function() {
			if ( jQuery('a', jQuery(this)).attr('href') == '#Links' )
				jQuery(this).removeClass("active");
		});
		jQuery('#Links').attr('style','display: none;');
		jQuery('#Links').removeClass("tabContent ui-tabs-panel").addClass("tabContent ui-tabs-panel ui-tabs-hide");
		// Active Target Tracker as default tab
		jQuery('#TargetTracker').attr('style','');
		jQuery('#TargetTracker').removeClass("tabContent ui-tabs-panel ui-tabs-hide").addClass("tabContent ui-tabs-panel");
	}
});
*/


jQuery(function() {
  jQuery('ul.tabs li').hover( function() { jQuery(this).addClass('hover'); }, function() { jQuery(this).removeClass('hover'); });
  jQuery('ul.tabs li a').click(
	function() { 
		var contentCategory = '/direct.seagate.com/home/dashboard';
		var pageName = jQuery(this).attr('href').replace('#','');
		//_hbPageView(pageName, contentCategory);
   });
});
		
// add custom parser through the tablesorter addParser method for english numbers with commas
jQuery.tablesorter.addParser({
  // set a unique id 
  id: 'englishNumber', 
  // return false so this parser is not auto detected
  is: function(s) { 
  	// return false so this parser is not auto detected 
    return false;
  }, 
  // format your data for normalization
  format: function(s) { 
    return jQuery.tablesorter.formatFloat(s.replace(/(\,|\%)/g,""));
  }, 
  // set type, either numeric or text 
  type: "numeric" 
}); 

/* Login Box */
var LoginBox = {
  loginLink: null,
  loginBox: null,
  closeLink: null,
  passwordCleared: false,
  usernamePrompt: 'User Id',
  usernameField: null,
  passwordField: null,
  init: function() {
    var LB = this;
    LB.loginLink = jQuery('#Toolbar a.login');
    LB.loginBox = jQuery('#Login');
    LB.usernameField = jQuery('input:eq(0)', LB.loginBox);
    LB.usernamePrompt = LB.usernameField.val();
    LB.passwordField = jQuery('input:eq(1)', LB.loginBox);
    LB.closeLink = jQuery('a.close', LB.loginBox).click( LB.close );
    LB.loginLink.click( LB.open );
    LB.usernameField.focus(
      function(e) {
        var $$ = jQuery(this);
        if ($$.val() == LB.usernamePrompt)
          $$.val("");
      }
    ).blur(
      function(e) {
        var $$ = jQuery(this);
        if ($$.val() == "")
          $$.val(LB.usernamePrompt);
      }
    );
    LB.passwordField.focus(
      function(e) {
        if (! LB.passwordCleared)
        {
          LB.passwordField.val("");
          LB.passwordCleared = true;
        }
      }
    );
  },
  close: function(e) {
    var LB = LoginBox;
    LB.loginBox.slideUp();
    LB.loginLink.removeClass('hover');
    e.preventDefault();
  },
  open: function(e) {
    var LB = LoginBox;
    // Act like a toggle
    if (LB.loginBox.is(':visible'))
      return LB.close(e);

    LB.loginBox.slideDown();
    LB.loginLink.addClass('hover');
    e.preventDefault();
  }
};
jQuery(function() { LoginBox.init(); });

jQuery.preloadImages = function()
{
  for(var i = 0; i<arguments.length; i++)
    jQuery("<img>").attr("src", arguments[i]);
};

jQuery(function() { 
	if (jQuery.fn.tablesorter) {
		jQuery('table.sortable').tablesorter( { cssHeader: 'sortable' })
				.bind('sortEnd', function(e) {
						// Only re-apply alt class if it's already present
						if (jQuery('tr.alt', jQuery(this)).length > 0)
						jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
				});
	
		// Support text style change on sortable table headers
		jQuery('th.sortable').hover(
			function() { jQuery(this).addClass('hover'); },
			function() { jQuery(this).removeClass('hover'); }
		);
	}
		
	if (jQuery.fn.facebox)
		jQuery('a.modal').facebox({
				opacity: 0.1,
				loadingImage: '/images/common/loading.gif',
				modalId: 'PortalModal',
				contentSelector: '.channel .content',
				faceboxHtml: '\
			<div id="PortalModal" style="display:none;"> \
					<div class="popup"> \
						<div class="header"> \
							<div class="content"> \
								<a href="#" class="close"><span>Close</span></a> \
							</div> \
						</div> \
						<div class="channel"> \
							<div class="content"> \
							</div> \
						</div> \
						<div class="footer"> \
							<div class="content"> \
							</div> \
						</div> \
					</div> \
			</div>'
			});
	
	if (jQuery.fn.bgiframe)
		jQuery('#PortalModal').bgiframe();
	
	jQuery('li.subMenu').hover(
		function() { jQuery('> a', jQuery(this).addClass('open')).addClass('hover');	},
		function() { jQuery('> a', jQuery(this).removeClass('open')).removeClass('hover'); }
	);

});

// Parse XML to HTML via a call to a Web Service Proxy
function BuildHTMLFromXMLParsing( objectToRender, fileLoc, displayType ) {
	var _renderObject = objectToRender;

	if (_renderObject) {
		// cancel any in-flight jQuery.ajax calls for the objectToRender 
		if(_renderObject.xhrObject != null) {
			try {
				_renderObject.xhrObject.abort();
			}
			catch(e) {}
			
			_renderObject.xhrObject = null;
		}
		
		jQuery(document).ready(function(){//when the entire DOM is loaded but before the page contents is loaded, call the function
			_renderObject.xhrObject = jQuery.ajax({//parse the XML with AJAX call
				type: "POST",//form POST to retrieve the XML file and load it in memory
				url: fileLoc,//specify the location of the XML
				dataType: "xml",//specify the data type
				timeout:120000, // timeout set to 2 mins.
				error: function (XMLHttpRequest, textStatus, errorThrown) {//if the retrieval of XML fails
							_renderObject.xhrObject = null;
							
							// Display back-end critical error message
							if (displayType == 'orderStatus') {//for failure when pulling Order Status
								jQuery('#OrderStatus #PendingDisplay').attr('style','display: none;');//hide this div
								jQuery('#OrderStatusLimitedResultsMsg').attr('style','display: none;');//hide this div
								jQuery('#OrderStatus #NoItems').attr('style','display: none;');//hide this div
								jQuery('#OrderStatus #CriticalError').removeAttr("style");//show this div with the error message 
							}
							if (displayType == 'orderDetails') {//for failure when pulling Order Details	
								jQuery('#OrderDetailsWrapper').remove();//remove this div
								jQuery('div.newsContainer #CriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == 'billingStatus') {//for failure when pulling Billing Status
								jQuery('#Billing #CriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == 'targetTracker') {//for failure when pulling Target Tracker
  								jQuery('#TargetTrackerMessages').attr('style','display: none;');//hide this div
  								jQuery('#Empty').removeAttr("style");
  								jQuery('#Empty #NoItems').attr('style','display: none;');//hide this div
  								jQuery('#Empty #CriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == 'distributionMetrics') {//for failure when pulling RTDM
								jQuery('#RTDMPortletHeader').removeAttr("style");
								jQuery('#RTDMMessages').attr('style','display: none;');//hide this div
								jQuery('#DistMetrics table.sortable').empty();
								jQuery('#DistMetrics #NoItems').attr('style','display: none;');//hide this div
								jQuery('#DistMetrics').removeAttr("style");
								jQuery('#DistMetrics #CriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "invoiceSPA") {//for failure when pulling Invoice SPA
								jQuery('#invoiceCriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "debitSPA") {//for failure when pulling Debit SPA
								jQuery('#debitCriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "Claims") {//for failure when pulling Claims data
								jQuery('#ClaimsStatusPortletHeader').attr('style','display: none;');
								jQuery('#ClaimsDisplayMessage').attr('style','display: none;');
								jQuery('#claimsNoItems').attr('style','display: none;');
								jQuery('#claimsCriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "Programs") {//for failure when pulling Program Communications data
								jQuery('#ProgramsStatusPortletHeader').attr('style','display: none;');
								jQuery('#PLDisplayMessage').attr('style','display: none;');
								jQuery('#programsNoItems').attr('style','display: none;');
								jQuery('#programsCriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "GeneralCommunications") {//for failure when pulling General Communications data
								jQuery('#GeneralStatusPortletHeader').attr('style','display: none;');
								jQuery('#GLCDisplayMessage').attr('style','display: none;');
								jQuery('#generalNoItems').attr('style','display: none;');
								jQuery('#generalCriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "Products") {//for failure when pulling Product Communications data
								jQuery('#ProductsStatusPortletHeader').attr('style','display: none;');
								jQuery('#PRCDisplayMessage').attr('style','display: none;');
								jQuery('#productsNoItems').attr('style','display: none;');
								jQuery('#productsCriticalError').removeAttr("style");//show this div with the error message
							}
							if (displayType == "Policies") {//for failure when pulling Policy Communications data
								jQuery('#PoliciesStatusPortletHeader').attr('style','display: none;');
								jQuery('#PLCDisplayMessage').attr('style','display: none;');
								jQuery('#policiesNoItems').attr('style','display: none;');
								jQuery('#policiesCriticalError').removeAttr("style");//show this div with the error message
							}
							
						},		
				success: function(xml) {
					_renderObject.xhrObject = null;
							
					// Order Status detail
					if (displayType == 'orderStatus') {
						var orderTypes = [];
						var orderType = '';
						
						// Build an HTML string
						_renderObject.headerHtml += '<thead><tr><th title="Click to view this order in SOLO">Sales Order #</th><th>PO #</th><th>PO<br />Date</th><th>Bill-to #</th>';
						_renderObject.headerHtml += '<th>Ship-to #</th><th>Status</th>';
						//_renderObject.headerHtml +=	'<th title="Click to display order details">Model #/Qty<br />/Ship Information</th>';
						_renderObject.headerHtml += '</tr></thead><tbody>';
						
						var soloURI = jQuery('#SoloURL').text() + '';//grab the SOLO URL from the DOM since it is entered through the SOLO portlet config
						_renderObject.soloDetailsURL = soloURI; // + _renderObject.soloQueryString;//add a query string to the URL ; 05/12/09 updated to accoodate new SOLO URL
						
						jQuery('orderSummary',xml).each(function() {//parse the XML and set the object's attributes with the values from the XML
							_renderObject.salesOrder = jQuery(this).attr("referenceNumber");
							_renderObject.cartKey = jQuery(this).find("cartKey").text();
							_renderObject.purchaseOrder = jQuery(this).find("xPoNumber").text();
							_renderObject.purchaseOrderDate = jQuery(this).find("poDate").text();
							_renderObject.billToNo = jQuery(this).find("siteUseBillToReferenceNumber").text();
							_renderObject.shipToNo = jQuery(this).find("siteUseShipToReferenceNumber").text(); 
							_renderObject.status = jQuery(this).find("erpStatus").text();
							
							// Build a sorted array of unique order status types
							if ( _renderObject.status && _renderObject.status.length > 0 ) {
								if ( _renderObject.status.toLowerCase() != orderType.toLowerCase()) {
									orderType = _renderObject.status;
									var exists = false;
									for (var i = 0; i < orderTypes.length; i++) {
										if (orderType.toLowerCase() == orderTypes[i].toLowerCase()) { exists = true; break; }//if the type already exists, don't add it to the array
									}
									if (!exists) orderTypes[orderTypes.length] = orderType;//add the order type to an array if it is unique
								}
							}
							
							// Call the function to construct a single table row of order status results
							_renderObject.bodyHtml += BuildOrderStatusTableRow( _renderObject.counter,
																				_renderObject.orderDetailsUrl,
																				_renderObject.soloDetailsURL,
																				_renderObject.salesOrder,
																				_renderObject.cartKey,
																				_renderObject.purchaseOrder,
																				_renderObject.purchaseOrderDate,
																				_renderObject.billToNo,
																				_renderObject.shipToNo,
																				_renderObject.status);
							_renderObject.counter++;
						});
						
						// Display no orders message
						if (_renderObject.counter < 2) {
							jQuery('#OrderStatus #PendingDisplay').attr('style','display: none;');
							jQuery('#OrderStatusLimitedResultsMsg').attr('style','display: none;');
							jQuery('#OrderStatus #CriticalError').attr('style','display: none;');
							jQuery('#OrderStatus #NoItems').removeAttr("style");
						}
						else {
							// Dynamically insert HTML into Order Status div element
							_renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.bodyHtml + _renderObject.footerHtml;
							
							// Sort order status types
							var orderTypeOptions = '';
							if (orderTypes && orderTypes.length > 0) {
								orderTypes.sort();//sort the order types to display inside the drop-down
								orderTypes.unshift('Search All');//add "Search All" as the very first value inside the array
								// Build the options for a order type select list
								for (var i = 0; i < orderTypes.length; i++) {
									orderTypeOptions += '<option value="' + orderTypes[i] + '">' + orderTypes[i] + '</option>';//build the drop-down options
								}
							}
							
							// Populate the options of the Order Status select list inside the SOLO dashboard
							jQuery('#orderTypes').append(orderTypeOptions);
							
							// Register Order Status Search
							jQuery('#OrderSearch').click(function () {//add an event for the "Search" button
								var keywords = "";
								var option = "";
								var modified = false;
								keywords = jQuery('#keywords').val();
								option = jQuery('#orderTypes option:selected').text();
								
								if (keywords.length > 0 && keywords != 'Enter PO#') {
									modified = true;
									
									// Manipulate the Order Status table
									jQuery('#OrderStatus tbody tr').each(function () {
										var tdno = 1;
										var del = false;
										
										// Check Order Status
										if (option != 'Search All') {
											var statusValue = jQuery('td.status', jQuery(this)).text();	
											if (statusValue != option) del = true;
										}
										// Check Order PO Number
										if (del == false) {
											jQuery('td', jQuery(this)).each(function () {
												if (tdno == 2) {
													var poNumber = jQuery(this).text();
													if ( poNumber.toLowerCase().indexOf(keywords.toLowerCase()) < 0 ) {//delete any order lines that do not fit the search criteria
														del = true;
													}
												}
												tdno++;
											});	
										}
										if (del) { jQuery(this).remove(); }
									});
								}
								else if (option != 'Search All') {
									// manipulate the Order Status table
									jQuery('#OrderStatus').empty().append(_renderObject.HtmlOutput);
									//AddOrderStatusSortAndOverlay();
									// Remove rows that do not match order status
									jQuery('#OrderStatus tbody tr').each(function () {
										var statusValue = jQuery('td.status', jQuery(this)).text();	
										if (statusValue != option) { jQuery(this).remove(); modified = true; }
									});
									
									
								}

                                                                //call DownloadCsv servlet
                                                                jQuery.post("/proxy/DownloadCsv/DownloadFile", {type: "write", module: "Orders", poNumber: keywords, status: option});
								// Add 'View All' button
								if (modified) {
									var exists = false;
									jQuery('#OrderStatusPortletHeader ul.filters li').each(function () {
										if(jQuery('a', jQuery(this)).text() == 'View All') exists = true;
									});
									
									// add "View All" button only when the order lines are pre-filtered based on some search criteria and if the button does not yet exist
									if (!exists)
									jQuery('#OrderStatusPortletHeader ul.filters').append('<li><a href="#" id="ViewAll" name="ViewAll" class="button"><span>View All</span></a></li>');
										
									// Add onClick logic to the View All button
									jQuery('#OrderStatusPortletHeader ul.filters li').each(function () {
										if(jQuery('a', jQuery(this)).text() == 'View All') {	
											jQuery(this).click(function () {//even handling for View All button
												jQuery(this).remove();
												var bob = document.getElementById("orderTypes");
												bob.options[0].selected = true;
												jQuery('#OrderStatus').empty();
												jQuery('#OrderStatus').append(_renderObject.HtmlOutput);//replace the order view with a complete list of order lines
												AddOrderStatusSortAndOverlay();
                                                                                                //call DownloadCsv servlet
                                                                                                jQuery.post("/proxy/DownloadCsv/DownloadFile", {type: "write", module: "Orders"});
											});	
										}
									});
									// Change the bind since the table has been modified
									jQuery("#OrderStatus table.sortable").trigger("update");//update the sorting whenever there is a filter on the order table
								}
									
								// Support text style change on sortable table headers
								var counter=1;
								jQuery('#OrderStatus tbody tr').each(function () {					
									if ( counter%2 ) {// add different coloring for alternate rows
										if (jQuery(this).hasClass('alt')) jQuery(this).removeClass('alt');
									}
									else if (!jQuery(this).hasClass('alt')) jQuery(this).addClass('alt');
									counter++;
								});
								
							});
														
							jQuery('#OrderStatus').append(_renderObject.HtmlOutput);
							jQuery('#OrderStatusPortletHeader').removeAttr("style");
							jQuery('#OrderStatus #PendingDisplay').attr('style','display: none;');
							
							// Add Table Sorter and Dynamic Overlays to the Order Status portlet
							AddOrderStatusSortAndOverlay();
							
						}
					}
					
					// Build the Order Details overlay 
					if (displayType == 'orderDetails') {
						// Build an HTML string
						var items = 0;
						
						_renderObject.headerHtml = '<table class="nonsortable">';
						_renderObject.headerHtml += '<thead><tr><th title="Click to view this order in SOLO">Sales Order #</th><th>PO #</th><th>PO<br />Date</th><th>Bill-to #</th>';
						_renderObject.headerHtml += '<th>Ship-to #</th><th>Status</th></tr></thead><tbody>';
						_renderObject.bodyHtml = '';
						_renderObject.footerHtml = '</tbody></table>';
						
						var soloURI = jQuery('#SoloURL').text() + '';//grab the SOLO URL from the DOM since it is entered through the SOLO portlet config
						_renderObject.soloDetailsURL = soloURI + _renderObject.soloQueryString;//add a query string to the URL
						
						jQuery('orderSummary ',xml).each(function() {//parse the XML to build the top portion which contains the order header
							_renderObject.salesOrder = jQuery(this).attr("referenceNumber");
							_renderObject.cartKey = jQuery(this).find("cartKey").text();
							_renderObject.purchaseOrder = jQuery(this).find("xPoNumber").text();
							_renderObject.purchaseOrderDate = jQuery(this).find("poDate").text();
							_renderObject.billToNo = jQuery(this).find("siteUseBillToReferenceNumber").text();
							_renderObject.shipToNo = jQuery(this).find("siteUseShipToReferenceNumber").text(); 
							_renderObject.status = jQuery(this).find("erpStatus").text();
							
							_renderObject.bodyHtml += '<tr>';
							_renderObject.bodyHtml += '<td><a href="' + _renderObject.soloDetailsURL + 
													  'ShoppingCartKey=' + _renderObject.cartKey + '" target="_blank" title="Click to view this order in SOLO">' +
													  _renderObject.salesOrder +'</a></td>';
							_renderObject.bodyHtml += '<td>' + _renderObject.purchaseOrder + '</td>'; 
							_renderObject.bodyHtml += '<td class="date">' + _renderObject.purchaseOrderDate + '</td>'; 
							_renderObject.bodyHtml += '<td>' + _renderObject.billToNo + '</td>'; 
							_renderObject.bodyHtml += '<td>' + _renderObject.shipToNo + '</td>'; 
							_renderObject.bodyHtml += '<td class="status">' + _renderObject.status + '</td>'; 
							_renderObject.bodyHtml += '</tr>';
							items++;
						});
						
						// Display no orders message
						if (items < 1) {
							jQuery('#OrderDetailsWrapper').remove();
							jQuery('div.newsContainer #NoItems').removeAttr("style");
						}
						
						else {
						
							// Dynamically insert HTML into Order Details Header div element
							_renderObject.orderHeaderHtmlOutput = _renderObject.headerHtml + _renderObject.bodyHtml + _renderObject.footerHtml;
							jQuery('#OrderDetailsHeader').append(_renderObject.orderHeaderHtmlOutput);
							
							_renderObject.headerHtml = '<table class="sortable">';
							_renderObject.headerHtml += '<thead><tr><th>Model #</th><th>Request<br /> Quantity</th><th>Shipped<br />Quantity</th><th>Status</th>';
							_renderObject.headerHtml += '<th>Requested<br />Dock Date</th><th>Ship Date</th></tr></thead><tbody>';
							_renderObject.bodyHtml = '';
							_renderObject.footerHtml = '</tbody></table>';
							
							_renderObject.counter = 1;
							jQuery('orderLine',xml).each(function() {//parse the XML to build the bottom portion which contains the order lines
								_renderObject.modelNo = jQuery(this).find("itemModelNumber").text();
								_renderObject.requestQty = jQuery(this).find("requestedQuantity").text();
								_renderObject.shippedQty = jQuery(this).find("shippedQuantity").text();
								_renderObject.lineStatus = jQuery(this).find("erpStatus").text();
								_renderObject.requestDate = jQuery(this).find("requestedDate").text();
								_renderObject.shipDate = jQuery(this).find("shippedDate").text(); 
								
								if ( _renderObject.counter%2 ) { _renderObject.bodyHtml += '<tr class="">'; }
								else { _renderObject.bodyHtml += '<tr class="alt">'; }
								_renderObject.bodyHtml += '<td>' + _renderObject.modelNo + '</td>';
								_renderObject.bodyHtml += '<td>' + _renderObject.requestQty + '</td>'; 
								_renderObject.bodyHtml += '<td>' + _renderObject.shippedQty + '</td>'; 
								_renderObject.bodyHtml += '<td class="status">' + _renderObject.lineStatus + '</td>'; 
								_renderObject.bodyHtml += '<td class="date">' + _renderObject.requestDate + '</td>'; 
								_renderObject.bodyHtml += '<td class="date">' + _renderObject.shipDate + '</td>'; 
								_renderObject.bodyHtml += '</tr>';
								_renderObject.counter++;
							});
							
							// Dynamically insert HTML into Order Details div element
							_renderObject.orderDetailsHtmlOutput = _renderObject.headerHtml + _renderObject.bodyHtml + _renderObject.footerHtml;
							jQuery('#OrderDetails').append(_renderObject.orderDetailsHtmlOutput);
							
							jQuery('#OrderDetailsWrapper').removeAttr("style");
							
							// Bind table sorting for Order Details table
							if (jQuery.fn.tablesorter)//add sorting to the order details lines table
								jQuery('#OrderDetails table.sortable').tablesorter( { cssHeader: 'sortable' })
									.bind('sortEnd', function(e) {
										// Only re-apply alt class if it's already present
										if (jQuery('tr.alt', jQuery(this)).length > 0)
										jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
									});
						
							// Support text style change on sortable table headers
							jQuery('#OrderDetails th.sortable').hover(
								function() { jQuery(this).addClass('hover'); },
								function() { jQuery(this).removeClass('hover'); }
							);
							
						}
					}
					// Claims Visibility detail
					if (displayType == 'Claims') { 
					      jQuery('#claimsNoItems').attr('style','display: none;');
					      jQuery('#claimsCriticalError').attr('style','display: none;');
					     //_renderObject.headetHtml = '<table class="sortable">';
					     //_renderObject.headetHtml = '';
					     //_renderObject.footerHtml = '';
					     _renderObject.headerHtml += '<table class="sortable"><thead><tr><th>Status</th><th>Amount <br/> Claimed</th><th>Amount<br/>Credited</th>'; 
					     _renderObject.headerHtml += '<th>Customer<br/> Reference</th><th>Program<br>End Date</th><th>Payment Memo<br/>Number</th><th>Payment<br>Date</th><th>Req.<br/>Description</th></tr></thead><tbody>'; 
					     _renderObject.footerHtml = '</tbody></table>';
					     
					     var customers = [];
					     var programs = [];
					     var startYrQtrs = [];
					     var endYrQtrs = [];
   					     var yqIndexes = [];
					     var counter = 0;
					     
					     if ( customers && customers.length <= 0 ) {
					    	 jQuery('Customer',xml).each(function() { 
					    	     customers[counter] = jQuery(this).find("name").text();
					    	     counter++;
					    	 });
					     }
					    
					     counter = 0;
					     if ( programs && programs.length <= 0 ) {
					    	 jQuery('Program',xml).each(function() { 
					    		 programs[counter] = jQuery(this).find("name").text();
					    	     counter++;
					    	 });
					     } 
					     
					     counter = 0;
					     if ( startYrQtrs && startYrQtrs.length <= 0 ) {
					    	 jQuery('YearQtr',xml).each(function() { 
					    		 startYrQtrs[counter] = jQuery(this).find("start").text();
					    		 endYrQtrs[counter] = jQuery(this).find("end").text();
					    		 yqIndexes[counter] = jQuery(this).find("YQIndex").text();
					    	     counter++;
					    	 });
					     }
					     
					     if ( (customers && customers.length <= 0 ) || (programs && programs.length <= 0 ) || (startYrQtrs && startYrQtrs.length <= 0) ) {
					         jQuery('#ClaimsStatusPortletHeader').attr('style','display: none;');
						 jQuery('#ClaimsDisplayMessage').attr('style','display: none;');
						 jQuery('#claimsCriticalError').attr('style','display: none;');
						 jQuery('#claimsNoItems').removeAttr("style");//show this div message
					         return;
					     }
					  					     
					     var customerOptions = '';
					     var programOptions = '';
					     var startYRQtrOptions = '';
					     var endYRQtrOptions = '';
					  
						 if (customers && customers.length > 0) {
							customers.unshift('SHOW ALL');//add "Search All" as the very first value inside the array
							// Build the options for customers select list
							for (var i = 0; i < customers.length; i++) {
								customerOptions += '<option value="' + customers[i] + '">' + customers[i] + '</option>';//build the drop-down options
							}
						 }
						 
						 if (programs && programs.length > 0) {
							programs.unshift('SHOW ALL');//add "Search All" as the very first value inside the array
							// Build the options for programs select list
							for (var i = 0; i < programs.length; i++) {
								programOptions += '<option value="' + programs[i] + '">' + programs[i] + '</option>';//build the drop-down options
							}
						 }
						 
						 if (startYrQtrs && startYrQtrs.length > 0) {
								// Build the options start year/qtr select list
								for (var i = 0; i < startYrQtrs.length; i++) {
									startYRQtrOptions += '<option value="' + yqIndexes[i] + '">' + startYrQtrs[i] + '</option>';//build the drop-down options
								}
						 }
						 
						 if (endYrQtrs && endYrQtrs.length > 0) {
								// Build the options start year/qtr select list
								for (var i = 0; i < startYrQtrs.length; i++) {
									endYRQtrOptions += '<option value="' + yqIndexes[i] + '">' + endYrQtrs[i] + '</option>';//build the drop-down options
								}
						 }
							
						 // Populate the options of the Customers, Programs select list inside Claims
						 if ( processClaimsClick ) {
    						 jQuery('#Customers').append(customerOptions);
    						 jQuery('#Programs').append(programOptions);
    						 jQuery('#StartYrQtr').append(startYRQtrOptions);
    						 jQuery('#EndYrQtr').append(endYRQtrOptions);
					     }
					     var displayRowCount = '';
					     var rowCount = '';
					     jQuery('Claims',xml).each(function() {
					       displayRowCount = jQuery(this).find("displayrowcount").text();
					       rowCount = jQuery(this).find("rowcount").text();
					     });
					     
					     
					     //var rowCountDisplay = '';
					     _renderObject.bodyHtml += '<ul><i>Number of Claims matching current search criteria : ' + rowCount + '</i><p></ul>';
					     _renderObject.bodyHtml += '<ul><i>Number of Claims displayed : ' + displayRowCount + '</i><p></ul>';
					     //_renderObject.bodyHtml += '<ul><i>A Maximum of 500 Claims are displayed</i><p></ul>';

					     
					     jQuery('#ClaimsDisplayMessage').append(_renderObject.bodyHtml);
					     
					     counter = 1;
			     
   					     jQuery('Claim',xml).each(function() { 
					     	  if ( counter%2 ) { 
					     		_renderObject.headerHtml += '<tr class="">'; 
					     	  } else { 
					     		_renderObject.headerHtml += '<tr class="alt">'; 
					     	  } counter++;
					     	  Status = jQuery(this).find("Status").text(); 
					     	  amountClaimed = jQuery(this).find("AmountClaimed").text(); 
					     	  amountCredited = jQuery(this).find("AmountCredited").text(); 
					     	  customerReference = jQuery(this).find("CustomerReference").text(); 
					     	  programEndDate = jQuery(this).find("ProgramEndDate").text();
					     	  creditMemoNumber = jQuery(this).find("CreditMemoNumber").text();
					     	  paymentDate = jQuery(this).find("PaymentDate").text();
					     	  requestDescription=jQuery(this).find("RequestDescription").text(); 
					     	  cIndex = jQuery(this).find("cIndex").text();
					     	  pIndex = jQuery(this).find("pIndex").text();
					     	  yqIndex = jQuery(this).find("yqIndex").text();
					     	  					     						
						      _renderObject.headerHtml += '<td>'+ Status +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ amountClaimed +'</td>'; 
					     	  _renderObject.headerHtml += '<td class="status">'+ amountCredited + '<div id="hiddencID" style="display:none">-'+cIndex+'</div></td>'; 
					     	  _renderObject.headerHtml += '<td>'+ customerReference +'</td>'; 
					     	 _renderObject.headerHtml += '<td>'+ programEndDate +'</td>';
					     	  _renderObject.headerHtml += '<td>'+ creditMemoNumber +'</td>';
					     	 _renderObject.headerHtml += '<td>'+ paymentDate +'</td>';
					     	  _renderObject.headerHtml += '<td>'+ requestDescription +'</td>'; 
					     	  //_renderObject.headerHtml += '<td><div id="hiddencID" style="display:none">'+ cIndex + '</div><div id="hiddenpID" style="display:none">' + pIndex + '</div><div id="hiddenyqID" style="display:none">' + yqIndex + '</div></td></tr>'; 
					     	 _renderObject.headerHtml +='</tr>'; 
 				              });
   					          
   					          var dCount = 0;
				              var divVal = 'div';
				              var selectedCustomer = '';
				              var selectedProgram = '';
				              var selectedStartYQ = '';
				              var selectedEndYQ = ''; 
                              if ( processClaimsClick) {
    				              jQuery('#ClaimSearch').click(function () { 
                                      jQuery('#ClaimsValidationError').attr('style','display: none;');
    				                  selectedCustomer = jQuery('#Customers option:selected').val();  
    				                  selectedProgram = jQuery('#Programs option:selected').val();  
    				                  selectedStartYQ = jQuery('#StartYrQtr option:selected').val();
    				                  selectedEndYQ = jQuery('#EndYrQtr option:selected').val();

                                      if ( selectedStartYQ > selectedEndYQ)         {
                                          jQuery('#ClaimsValidationError').removeAttr("style");
                                      } else  {

        				                  jQuery('#ClaimSearch').blur();
        				          
        				                  jQuery('#ClaimsTable thead tr').each(function () {
                                            jQuery(this).remove(); 
        						          });
                                          jQuery('#ClaimsTable tbody tr').each(function () {
                                            jQuery(this).remove(); 
        						          }); 
        						          jQuery('#ClaimsDisplayMessage ul').each(function() {
        						              jQuery(this).remove();
        						          });
        						          _renderObject.headerHtml = '';
        						          _renderObject.footerHtml = '';
                                          jQuery('#ClaimsTable').trigger("update");
                                          claimsProxyURL = '/proxy/ClaimsAccess/RetrieveClaims?customer='+selectedCustomer+'&program='+selectedProgram+'&syq='+selectedStartYQ+'&eyq='+selectedEndYQ;
                                           
    
        				                  jQuery(function() { Claims.init(); });
        				         				                  
          			                      processClaimsClick = false; 
                                     }
    				                  
     				              });
                              } 

 				              _renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 

					          jQuery('#ClaimsTable').append(_renderObject.HtmlOutput); 
					 }
					 
					 var pdfIcon = "/direct/staticfiles/images/shared/pdf.gif ";
					 var pptIcon = "/direct/staticfiles/images/shared/ppt.gif ";
					 var zipIcon = "/direct/staticfiles/images/shared/winzip.gif ";
					 var fileIcon = "/direct/staticfiles/images/shared/download.gif ";
					 var excelIcon = "/direct/staticfiles/images/shared/excel.gif ";
					 var docIcon = "/direct/staticfiles/images/shared/word.gif ";
					 var txtIcon = "/direct/staticfiles/images/shared/text.gif ";
					 //var communicationsBaseURL = sfdcAttachmentsURL;
					 
					 // Online Communications Programs Tab
					 if (displayType == 'Programs') { 
					     var counter = 0; 
						 var plcSearchOptions = '';
						 var plcKeywords = "";
						 var plcDate1 = "";
						 var plcDate2 = "";
						 var plcOption = "";
						 var plcMode = "";
						 var plcBpasID = "";
						 var plcStage = "";
						 var plcViewModified = false;
						 var LetterID = '';
						 var Date = '';
						 var Name = '';
						 var Products = '';
						 var programBeginDate = '';
						 var programEndDate = '';
						 var plAttachmentCount = '';
						 var plAttachmentID = "";
						 var plAttachmentName = "";
						 var plAttachmentType = "";
						 var plAttachmentContactID = "";
						 var plCommunicationID = "";
						 var plKit = '';
						 var plCommunicationsURL = "";
						 var plFormatText = "";
						 var plNoData = "";
						 //var plClearButtonClick = false;
						 
					      jQuery('#programsNoItems').attr('style','display: none;');
					      jQuery('#programsCriticalError').attr('style','display: none;');
					      
					      					     
					     _renderObject.headerHtml += '<table class="sortable"><thead><tr><th>Letter ID#</th><th>Date</th><th>Name</th>'; 
					     _renderObject.headerHtml += '<th>Products</th><th>Begin<br>Date</th><th>End<br/>Date</th><th>Links</th></tr></thead><tbody>'; 
					     _renderObject.footerHtml = '</tbody></table>';
						 
					     if ( processProgramsClick ) {
							plcSearchOptions += '<option value="' + 'Search BY' + '">' + 'Search By:' + '</option>';
						    plcSearchOptions += '<option value="' + 'LetterID' + '">' + 'LetterID' + '</option>';
							plcSearchOptions += '<option value="' + 'Date' + '">' + 'Date' + '</option>';
							plcSearchOptions += '<option value="' + 'Name' + '">' + 'Name' + '</option>';
							plcSearchOptions += '<option value="' + 'Products' + '">' + 'Products' + '</option>';
							plcSearchOptions += '<option value="' + 'BeginDate' + '">' + 'BeginDate' + '</option>';
							plcSearchOptions += '<option value="' + 'EndDate' + '">' + 'EndDate' + '</option>';
							jQuery('#PLCSearchBy').append(plcSearchOptions);
							
    					 } 
    					     
    					     
						  
		 
				             counter = 1;
			     
   					     jQuery('Program',xml).each(function() { 
					     	  if ( counter%2 ) { 
					     		_renderObject.headerHtml += '<tr class="">'; 
					     	  } else { 
					     		_renderObject.headerHtml += '<tr class="alt">'; 
					     	  } counter++;
					     	  LetterID = jQuery(this).find("LetterID").text(); 
					     	  Date = jQuery(this).find("Date").text(); 
					     	  Name = jQuery(this).find("Name").text(); 
					     	  Products = jQuery(this).find("Products").text(); 
							  plFormatText = fnStrFormat(Products); 
					     	  programBeginDate = jQuery(this).find("BDATE").text();
					     	  programEndDate = jQuery(this).find("EDATE").text();
					     	  //plKit = jQuery(this).find("PLKIT").text();
							  plAttachmentCount = jQuery(this).find("ATTACHMENT_COUNT").text();
							  plAttachmentContactID = jQuery(this).find("ATTACHMENT_CONTACT").text();
							  plCommunicationID = jQuery(this).find("COMMUNICATION_ID").text();
							  
							  if ( plAttachmentCount > 0 ) { 
								plKit = "";
								var tmpCount = 0;
								plCommunicationsURL = "";
								for(var plCount = 0; plCount<plAttachmentCount; plCount++) { 
								   tmpCount = plCount + 1; 
								   plAttachmentID = jQuery(this).find("ATTACHMENT_ID"+tmpCount).text(); 
								   plAttachmentName = jQuery(this).find("ATTACHMENT_NAME"+tmpCount).text(); 
								   plAttachmentType = jQuery(this).find("ATTACHMENT_TYPE"+tmpCount).text(); 
								   plCommunicationsURL = _renderObject.programsBaseURL + plAttachmentID + '&cmId=' + plCommunicationID + '&ctId=' + plAttachmentContactID + '&source=Portal';
								   //plKit = plKit + '<a href="about:blank" target="_blank">'; 
								   plKit = plKit + '<a href="' + plCommunicationsURL + '" target="_blank">'; 
								   if ( plAttachmentType.length > 0 && plAttachmentType =='.pdf')
								       plKit = plKit + '<img src="' +pdfIcon + '" alt="' + plAttachmentName + '" title="' + plAttachmentName + '"></a>';
								   else if (plAttachmentType.length > 0 && plAttachmentType =='.ppt')		
								       plKit = plKit + '<img src="' +pptIcon + '" alt="' + plAttachmentName + '" title="' + plAttachmentName + '"></a>';
								   else if ( plAttachmentType.length > 0 && plAttachmentType =='.zip')
								       plKit = plKit + '<img src="' +zipIcon + '" alt="' + plAttachmentName + '" title="' + plAttachmentName + '"></a>';
								   else if ( plAttachmentType.length > 0 && (plAttachmentType =='.xls' || plAttachmentType =='.xlsx'))
								       plKit = plKit + '<img src="' +excelIcon + '" alt="' + plAttachmentName + '" title="' + plAttachmentName + '"></a>'; 
								   else if ( plAttachmentType.length > 0 && (plAttachmentType =='.doc'|| plAttachmentType =='.docx'))
								       plKit = plKit + '<img src="' +docIcon + '" alt="' + plAttachmentName + '" title="' + plAttachmentName + '"></a>';	
								   else if ( plAttachmentType.length > 0 && plAttachmentType =='.txt')
								       plKit = plKit + '<img src="' +txtIcon + '" alt="' + plAttachmentName + '" title="' + plAttachmentName + '"></a>';
								   if (tmpCount%3 == 0) {
								       plKit = plKit + '<br/>';	   
								   }
								}
							  }
					     	 					     	  					     						
						      _renderObject.headerHtml += '<td>'+ LetterID +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ Date +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ Name +'</td>'; 
						      _renderObject.headerHtml += '<td>'+ plFormatText + '<a title="'; //+ Products + '">....</a></td>';
						      if ( plFormatText == Products ) {
						    	  _renderObject.headerHtml += Products + '"></a></td>';
						      }
						      else {
						    	  _renderObject.headerHtml += Products + '">....</a></td>'
						      }
					     	  _renderObject.headerHtml += '<td>'+ programBeginDate +'</td>';
					     	 _renderObject.headerHtml += '<td>'+ programEndDate +'</td>';

					     	  //_renderObject.headerHtml += '<td><a href="about:blank" target="_blank">'+ plKit +'</a></td>'; 
							  _renderObject.headerHtml += '<td>' + plKit + '</td>';
					     	 _renderObject.headerHtml +='</tr>'; 
 				              });
						 _renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
			             jQuery('#ProgramsTable').append(_renderObject.HtmlOutput); 
						 jQuery('#PendingPLDisplay').attr('style','display: none;');
						 
						 // Bind table sorting for Programs table
						 if (jQuery.fn.tablesorter)//add sorting to the order details lines table
							jQuery('#ProgramsTable table.sortable').tablesorter( { cssHeader: 'sortable', sortList: [[1,1]] })
								.bind('sortEnd', function(e) {
									// Only re-apply alt class if it's already present
									if (jQuery('tr.alt', jQuery(this)).length > 0)
										jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
									});
						
						// Support text style change on sortable table headers
						jQuery('#ProgramsTable th.sortable').hover(
							function() { jQuery(this).addClass('hover'); },
							function() { jQuery(this).removeClass('hover'); }
						);
							
						jQuery('#PLCSearchBy').change(function() {
                            var plcSelectedOption = jQuery('#PLCSearchBy option:selected').text();  							
							if (  plcSelectedOption == 'Date' || plcSelectedOption == 'BeginDate' || plcSelectedOption == 'EndDate') {
								jQuery('#plcKeywords').attr("disabled", true); 
							}else { 
							    jQuery('#plcKeywords').attr("disabled", false);
							}
						});  	
												 
						 if ( processProgramsClick) {
    				              jQuery('#ProgramSearch').click(function () { 

								     plcKeywords = jQuery('#plcKeywords').val();
									 plcDate1 = jQuery('#plcDate1').val();
								     plcDate2 = jQuery('#plcDate2').val();
									 plcOption = jQuery('#PLCSearchBy option:selected').text();
									 plcMode = jQuery('#glcMode').val();
									 plcStage = jQuery('#glcStage').val();
									 plcBpasID = jQuery('#plcBpasID').val();

									 if (plcMode == 'test' || (plcOption != 'Search By:' && ( (plcKeywords.length > 0 && plcKeywords != 'Keywords') || (plcDate1.length > 0 && plcDate1 != 'mm/dd/yy') || (plcDate2.length > 0 && plcDate2 != 'mm/dd/yy') ) ) ) {
                                         
                                         if ( plcMode == 'test' && plcOption == 'Search By:')										 
										     plcOption = 'default';
									     if ( !plcViewModified )
									         jQuery('#ProgramsStatusPortletHeader ul.filters').append('<li><h4>&nbsp;</h4><a href="#" id="plcClear" name="plcClear" class="button"><span>Clear</span></a></li>');
										 plcViewModified = true;
										 
										 jQuery('#ProgramSearch').blur();
        				          
        				                  jQuery('#ProgramsTable thead tr').each(function () {
                                            jQuery(this).remove(); 
        						          });
                                          jQuery('#ProgramsTable tbody tr').each(function () {
                                            jQuery(this).remove(); 
        						          }); 
									
										 jQuery('#ProgramsStatusPortletHeader ul.filters li').each(function () {
										   if ( jQuery('a', jQuery(this)).text() == 'Clear' ) {
										      jQuery(this).click(function () {//even handling for Clear button
												jQuery(this).remove();
												
												var plcSelect = document.getElementById("PLCSearchBy");
												plcSelect.options[0].selected = true;
												document.getElementById("plcKeywords").value = 'Keywords';
												document.getElementById("plcDate1").value = 'mm/dd/yy';
												document.getElementById("plcDate2").value = 'mm/dd/yy';
												//document.getElementById("plcBpasID").value = 'BPAS ID';
												
												jQuery('#ProgramSearch').blur();
        				          
        				                        jQuery('#ProgramsTable thead tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												
                                                jQuery('#ProgramsTable tbody tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
                                                plcMode = jQuery('#glcMode').val();  
                                                if(typeof(plcMode)=="undefined"){ plcMode = "";}
												//alert(plcMode);
                                                programsProxyURL = '/proxy/CommunicationsAccess/RetrievePrograms?searchby=default&STAGE='+plcStage;
												if ( plcMode.length > 0 || typeof(plcMode)!="undefined")
												    programsProxyURL = programsProxyURL + '&mode=' + plcMode
												jQuery(function() { Programs.init(); });
												plcViewModified = false;
												processProgramsClick = false; 
												_renderObject.plClearButtonClick = true;
												//jQuery(function() { Programs.init(); });
											  }); }
										 });
                                     
									     if ( plcOption == 'default') {
											programsProxyURL = '/proxy/CommunicationsAccess/RetrievePrograms?searchby=default&STAGE='+plcStage;
											if ( plcMode.length > 0 )
												    programsProxyURL = programsProxyURL + '&mode=' + plcMode
											if ( plcDate1.length > 0 && plcDate1 != 'mm/dd/yy')
											    programsProxyURL = programsProxyURL + '&bdate=' + plcDate1;
											if ( plcDate2.length > 0 && plcDate2 != 'mm/dd/yy')
											    programsProxyURL = programsProxyURL + '&edate=' + plcDate2;	
										 }
										 else { 	
											programsProxyURL = '/proxy/CommunicationsAccess/RetrievePrograms?searchby='+plcOption+'&keywords='+plcKeywords+'&mode='+plcMode+'&STAGE='+plcStage;
											
											if ( plcDate1.length > 0 && plcDate1 != 'mm/dd/yy')
											    programsProxyURL = programsProxyURL + '&bdate=' + plcDate1;
											if ( plcDate2.length > 0 && plcDate2 != 'mm/dd/yy')
											    programsProxyURL = programsProxyURL + '&edate=' + plcDate2;	
										 }	
										 if ( plcMode == 'test' && ( plcBpasID != 'BPAS ID' && plcBpasID.length > 0)  )
										     programsProxyURL = programsProxyURL + '&bpasID=' + plcBpasID;
										 //alert(programsProxyURL); 

                                         jQuery(function() { Programs.init(); });
										 processProgramsClick = false; 
										 _renderObject.plClearButtonClick = false;
									 }
								  });
							  
								  //processProgramsClick = false;
						 }
						 
						 jQuery('OnlineCommunications',xml).each(function() {
						    plNoData = jQuery(this).find("nodata").text(); 
						 });
						 					     					     
						 if ( plNoData == 'yes' || plNoData == 'no contact found') {
						    jQuery('#programsCriticalError').attr('style','display: none;');
						    jQuery('#PLDisplayMessage').attr('style','display: none;');
						    jQuery('#ProgramsTable thead tr').each(function () {
                                jQuery(this).remove(); 
					        });
	                        var plcHtml = ""; 
						    if ( !processProgramsClick && !_renderObject.plClearButtonClick ) {
						    	//plcHtml = '<p><h2 class="' + 'intro' + '"><strong>No items found</strong></h2>';
						    	if ( plNoData == 'no contact found' )
						    		plcHtml = plcHtml + '<span class="' + 'intro' + '">There are no Program documents to display (PGM1004)<br/>';
						    	else 
						    		plcHtml = plcHtml + '<span class="' + 'intro' + '">Your search did not return any documents. Click "Clear" above to remove filter criteria (PGM1002) <br/>';
						    	//plcHtml = plcHtml + 'If you think there was an error retrieving your communications,';
						    	//plcHtml = plcHtml + 'please contact Partner Support for help. <a href="mailto:Partner.support@seagate.com">Partner.support@seagate.com</a><br/></span></p>';
						    	jQuery('#programsNoItems').html("");
						    	jQuery('#programsNoItems').html(plcHtml);
						    } else if (processProgramsClick || (_renderObject.plClearButtonClick ||_renderObject.plClearButtonClick == '') ) { 
						    	//plcHtml = '<p><h2 class="' + 'intro' + '"><strong>No items found</strong></h2>';
						    	if ( plNoData == 'no contact found' )
						    		plcHtml = plcHtml + '<span class="' + 'intro' + '">There are no Program documents to display (PGM1004)<br/>';
						    	else 
						    		plcHtml = plcHtml + '<span class="' + 'intro' + '">There are no Program documents to display (PGM1001)<br/>';
						    	//plcHtml = plcHtml + 'If you think there was an error retrieving your communications,';
						    	//plcHtml = plcHtml + 'please contact Partner Support for help. <a href="mailto:Partner.support@seagate.com">Partner.support@seagate.com</a><br/></span></p>';
						    	jQuery('#programsNoItems').html("");
						    	jQuery('#programsNoItems').append(plcHtml);
						    }
						    
						    jQuery('#programsNoItems').removeAttr("style");//show this div message
						    //return;
					     }
						 
					 }
					 
					 // Online Communications General Communications Tab
					 if (displayType == 'GeneralCommunications') { 
					     var counter = 0; 
						 var glcSearchOptions = '';
						 var glcKeywords = "";
						 //var glcDate1 = "";
						 //var glcDate2 = "";
						 var glcOption = "";
						 var glcMode = "";
						 var glcStage = "";
						 var glcBpasID = "";
						 var glcViewModified = false;
						 var glcLetterID = '';
						 var glcDate = '';
						 var glcName = '';
						 var glcProducts = '';
						 var glcProgramBeginDate = '';
						 var glcProgramEndDate = '';
						 var glcAttachmentCount = '';
						 var glcAttachmentID = "";
						 var glcAttachmentName = "";
						 var glcAttachmentType = "";
						 var glcAttachmentContactID = "";
						 var glcCommunicationID = "";
						 var gcPLKit = '';
						 var glcCommunicationsURL = "";
						 var glcFormatText = "";
						 var glcNoData = "";
						 
					     jQuery('#generalNoItems').attr('style','display: none;');
					     jQuery('#generalCriticalError').attr('style','display: none;');
						 					     
					     _renderObject.headerHtml += '<table class="sortable"><thead><tr><th>Letter ID#</th><th>Date</th><th>Name</th>'; 
					     _renderObject.headerHtml += '<th>Products</th><th>Links</th></tr></thead><tbody>'; 
					     _renderObject.footerHtml = '</tbody></table>';
						 
						  if ( processGCClick ) {
							glcSearchOptions += '<option value="' + 'Search BY' + '">' + 'Search By:' + '</option>';
						    glcSearchOptions += '<option value="' + 'LetterID' + '">' + 'LetterID' + '</option>';
							glcSearchOptions += '<option value="' + 'Date' + '">' + 'Date' + '</option>';
							glcSearchOptions += '<option value="' + 'Name' + '">' + 'Name' + '</option>';
							glcSearchOptions += '<option value="' + 'Products' + '">' + 'Products' + '</option>';
							
														
							jQuery('#GLCSearchBy').append(glcSearchOptions);
							
    					  } 
						  
		 
						 counter = 1;
			     
   					     jQuery('Program',xml).each(function() { 
					     	  if ( counter%2 ) { 
					     		_renderObject.headerHtml += '<tr class="">'; 
					     	  } else { 
					     		_renderObject.headerHtml += '<tr class="alt">'; 
					     	  } counter++;
					     	  glcLetterID = jQuery(this).find("LetterID").text(); 
					     	  glcDate = jQuery(this).find("Date").text(); 
					     	  glcName = jQuery(this).find("Name").text(); 
					     	  glcProducts = jQuery(this).find("Products").text(); 
							  glcFormatText = fnStrFormat(glcProducts); 
					     	  //glcProgramBeginDate = jQuery(this).find("BDATE").text();
					     	  //glcProgramEndDate = jQuery(this).find("EDATE").text();
					     	  //gcPLKit = jQuery(this).find("PLKIT").text();
							  glcAttachmentCount = jQuery(this).find("ATTACHMENT_COUNT").text();
							  glcAttachmentContactID = jQuery(this).find("ATTACHMENT_CONTACT").text();
							  glcCommunicationID = jQuery(this).find("COMMUNICATION_ID").text();
							  
							  if ( glcAttachmentCount > 0 ) { 
								gcPLKit = "";
								var tmpCount = 0;
								glcCommunicationsURL = "";
								for(var glcCount = 0; glcCount<glcAttachmentCount; glcCount++) { 
								   tmpCount = glcCount + 1;
								   glcAttachmentID = jQuery(this).find("ATTACHMENT_ID"+tmpCount).text(); 
								   glcAttachmentName = jQuery(this).find("ATTACHMENT_NAME"+tmpCount).text(); 
								   glcAttachmentType = jQuery(this).find("ATTACHMENT_TYPE"+tmpCount).text(); 
								   glcCommunicationsURL = _renderObject.generalBaseURL + glcAttachmentID + '&cmId=' + glcCommunicationID + '&ctId=' + glcAttachmentContactID + '&source=Portal';
								   //plKit = plKit + '<a href="about:blank" target="_blank">'; 
								   gcPLKit = gcPLKit + '<a href="' + glcCommunicationsURL + '" target="_blank">'; 
								   if ( glcAttachmentType.length > 0 && glcAttachmentType =='.pdf')
								       gcPLKit = gcPLKit + '<img src="' +pdfIcon + '" alt="' + glcAttachmentName + '" title="' + glcAttachmentName + '"></a>';
								   else if (glcAttachmentType.length > 0 && glcAttachmentType =='.ppt')		
								       gcPLKit = gcPLKit + '<img src="' +pptIcon + '" alt="' + glcAttachmentName + '" title="' + glcAttachmentName + '"></a>';
								   else if ( glcAttachmentType.length > 0 && glcAttachmentType =='.zip')
								       gcPLKit = gcPLKit + '<img src="' +zipIcon + '" alt="' + glcAttachmentName + '" title="' + glcAttachmentName + '"></a>';
								   else if ( glcAttachmentType.length > 0 && (glcAttachmentType =='.xls' || glcAttachmentType =='.xlsx'))
								       gcPLKit = gcPLKit + '<img src="' +excelIcon + '" alt="' + glcAttachmentName + '" title="' + glcAttachmentName + '"></a>';
								   else if ( glcAttachmentType.length > 0 && (glcAttachmentType =='.doc' || glcAttachmentType =='.docx'))
								       gcPLKit = gcPLKit + '<img src="' +docIcon + '" alt="' + glcAttachmentName + '" title="' + glcAttachmentName + '"></a>';	
								   else if ( glcAttachmentType.length > 0 && glcAttachmentType =='.txt')
								       gcPLKit = gcPLKit + '<img src="' +txtIcon + '" alt="' + glcAttachmentName + '" title="' + glcAttachmentName + '"></a>';
								   if (tmpCount%3 == 0) {
									   gcPLKit = gcPLKit + '<br/>';	   
								   }
								}
							  }
					     	 					     	  					     						
						      _renderObject.headerHtml += '<td>'+ glcLetterID +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ glcDate +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ glcName +'</td>'; 
					     	 //_renderObject.headerHtml += '<td>'+ glcProducts +'</td>';
							 _renderObject.headerHtml += '<td>'+ glcFormatText + '<a title="'; //+ glcProducts + '">....</a></td>';
							 if ( glcFormatText == glcProducts ) {
						    	  _renderObject.headerHtml += glcProducts + '"></a></td>';
						     }
						     else {
						    	  _renderObject.headerHtml += glcProducts + '">....</a></td>'
						     }
					     	  //_renderObject.headerHtml += '<td>'+ glcProgramBeginDate +'</td>';
					     	 //_renderObject.headerHtml += '<td>'+ glcProgramEndDate +'</td>';

					     	  //_renderObject.headerHtml += '<td><a href="about:blank" target="_blank">'+ gcPLKit +'</a></td>'; 
							  _renderObject.headerHtml += '<td>' + gcPLKit + '</td>';
					     	 _renderObject.headerHtml +='</tr>'; 
 				              });
						 _renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
			             jQuery('#GCTable').append(_renderObject.HtmlOutput);  
						 jQuery('#PendingGLCDisplay').attr('style','display: none;');
						 // Bind table sorting for General Communications table
							if (jQuery.fn.tablesorter)//add sorting to the order details lines table
								jQuery('#GCTable table.sortable').tablesorter( { cssHeader: 'sortable', sortList: [[1,1]] })
									.bind('sortEnd', function(e) {
										// Only re-apply alt class if it's already present
										if (jQuery('tr.alt', jQuery(this)).length > 0)
										jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
									});
						
						 // Support text style change on sortable table headers
						 jQuery('#GCTable th.sortable').hover(
							function() { jQuery(this).addClass('hover'); },
							function() { jQuery(this).removeClass('hover'); }
						 );
						 
						 jQuery('#GLCSearchBy').change(function() {
	                        var glcSelectedOption = jQuery('#GLCSearchBy option:selected').text();  							
							if (  glcSelectedOption == 'Date') {
								jQuery('#glcKeywords').attr("disabled", true); 
						 	}else { 
						 	    jQuery('#glcKeywords').attr("disabled", false);
							}
						 });  		
							
						 if ( processGCClick) {
    				              jQuery('#GeneralSearch').click(function () { 
								     //alert ("plc Sneralearch");
								     glcKeywords = jQuery('#glcKeywords').val();
									 //glcDate1 = jQuery('#glcDate1').val();
								     //glcDate2 = jQuery('#glcDate2').val();
									 glcOption = jQuery('#GLCSearchBy option:selected').text();
									 glcMode = jQuery('#glcMode').val();
									 glcStage = jQuery('#glcStage').val();
									 glcBpasID = jQuery('#glcBpasID').val();
									 //alert ("CLICK - " +plcOption + " ; " + plcKeywords + " ; " + plcDate1 + " ; " + plcDate2);
									 if (glcMode == 'test' || ( glcOption != 'Search By:' && ( (glcKeywords.length > 0 && glcKeywords != 'Keywords')  ) ) ) {
                                         
                                         if ( glcMode == 'test' && glcOption == 'Search By:')										 
										     glcOption = 'default';
											 
									     if ( !glcViewModified )
									         jQuery('#GeneralStatusPortletHeader ul.filters').append('<li><h4>&nbsp;<br>&nbsp;</h4><a href="#" id="plcClear" name="plcClear" class="button"><span>Clear</span></a></li>');
										 glcViewModified = true;
										 
										 jQuery('#GeneralSearch').blur();
        				          
        				                  jQuery('#GCTable thead tr').each(function () {
                                            jQuery(this).remove(); 
        						          });
                                          jQuery('#GCTable tbody tr').each(function () {
                                            jQuery(this).remove(); 
        						          }); 
									
										 jQuery('#GeneralStatusPortletHeader ul.filters li').each(function () {
										   if ( jQuery('a', jQuery(this)).text() == 'Clear' )
										      jQuery(this).click(function () {//even handling for Clear button
												jQuery(this).remove();
												
												var glcSelect = document.getElementById("GLCSearchBy");
												glcSelect.options[0].selected = true;
												document.getElementById("glcKeywords").value = 'Keywords';
												//document.getElementById("glcDate1").value = 'mm/dd/yy';
												//document.getElementById("glcDate2").value = 'mm/dd/yy';
												//document.getElementById("glcBpasID").value = 'BPAS ID';
												
												jQuery('#GeneralSearch').blur();
        				          
        				                        jQuery('#GCTable thead tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												
                                                jQuery('#GCTable tbody tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												// Code Added by Nagendra to Fix Clear Defect *Start*
												glcMode = jQuery('#glcMode').val();  
												if(typeof(glcMode)=="undefined"){ glcMode = "";}
												//alert(plcMode);
												generalCommunicationsProxyURL = '/proxy/CommunicationsAccess/RetrieveGeneralCommunications?searchby=default&STAGE='+glcStage;
												if ( glcMode.length > 0 || typeof(glcMode)!="undefined")
												// Code Added by Nagendra to Fix Clear Defect *END*
												
												    generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&mode=' + glcMode
												jQuery(function() { GeneralCommunications.init(); });
												glcViewModified = false;
												processGCClick = false; 
												_renderObject.glClearButtonClick = true;
												
											  });
										 });

                                         if ( glcOption == 'default') {
											generalCommunicationsProxyURL = '/proxy/CommunicationsAccess/RetrieveGeneralCommunications?searchby=default&STAGE='+glcStage;
											if ( glcMode.length > 0 )
												    generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&mode=' + glcMode
											//if ( glcDate1.length > 0 && glcDate1 != 'mm/dd/yy')
											//    generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&bdate=' + glcDate1;
											//if ( glcDate2.length > 0 && glcDate2 != 'mm/dd/yy')
											//    generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&edate=' + glcDate2;	
										 }
										 else { 	
											generalCommunicationsProxyURL = '/proxy/CommunicationsAccess/RetrieveGeneralCommunications?searchby='+glcOption+'&keywords='+glcKeywords+'&mode='+glcMode+'&STAGE='+glcStage;
											
											//if ( glcDate1.length > 0 && glcDate1 != 'mm/dd/yy')
											//    generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&bdate=' + glcDate1;
											//if ( glcDate2.length > 0 && glcDate2 != 'mm/dd/yy')
											//    generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&edate=' + glcDate2;	
										 }	
										 if ( glcMode == 'test' && ( glcBpasID != 'BPAS ID' && glcBpasID.length > 0)  )
										     generalCommunicationsProxyURL = generalCommunicationsProxyURL + '&bpasID=' + glcBpasID;
										 //alert(generalCommunicationsProxyURL);
                                         jQuery(function() { GeneralCommunications.init(); });
										 processGCClick = false; 
										 _renderObject.glClearButtonClick = false;
									 }
								  });
							  
								  //processGCClick = false;
						 }
						 
						 jQuery('OnlineCommunications',xml).each(function() {
							glcNoData = jQuery(this).find("nodata").text();
					     });
							 					     					     
						 if ( glcNoData == 'yes' || glcNoData =='no contact found') {
							    jQuery('#generalCriticalError').attr('style','display: none;');
							    jQuery('#GLCDisplayMessage').attr('style','display: none;');
							    jQuery('#GCTable thead tr').each(function () {
	                                jQuery(this).remove(); 
						        });
		                        var glcHtml = ""; 
							    if ( !processGCClick && !_renderObject.glClearButtonClick ) {
							    	if ( glcNoData == 'no contact found')
							    		glcHtml = glcHtml + '<span class="' + 'intro' + '">There are no General documents to display (PGM1004)<br/>';
							    	else
							    		glcHtml = glcHtml + '<span class="' + 'intro' + '">Your search did not return any documents. Click "Clear" above to remove filter criteria (PGM1002) <br/>';
							    	jQuery('#generalNoItems').html("");
							    	jQuery('#generalNoItems').html(glcHtml);
							    } else if (processGCClick || (_renderObject.glClearButtonClick ||_renderObject.glClearButtonClick == '') ) { 
							    	if ( glcNoData == 'no contact found')
							    		glcHtml = glcHtml + '<span class="' + 'intro' + '">There are no General documents to display (PGM1004)<br/>';
							    	else 
							    		glcHtml = glcHtml + '<span class="' + 'intro' + '">There are no General documents to display (PGM1001)<br/>';
							    	jQuery('#generalNoItems').html("");
							    	jQuery('#generalNoItems').append(glcHtml);
							    }
							    
							    jQuery('#generalNoItems').removeAttr("style");//show this div message
						 }
						 
					 }
					 
					  // Online Communications Poilicies Tab
					 if (displayType == 'Policies') { 
					     var counter = 0; 
						 var pocSearchOptions = '';
						 var pocKeywords = "";
						 var pocDate1 = "";
						 //var pocDate2 = "";
						 var pocOption = "";
						 var pocMode = "";
						 var pocStage = "";
						 var pocBpasID = "";
						 var pocViewModified = false;
						 var pocLetterID = '';
						 var pocDate = '';
						 //var pocType = '';
						 var pocName = '';
						 var pocProducts = '';
						 var pocProgramBeginDate = '';
						 var pocProgramEndDate = '';
						 var pocAttachmentCount = '';
						 var pocAttachmentID = "";
						 var pocAttachmentName = "";
						 var pocAttachmentType = "";
						 var pocAttachmentContactID = "";
						 var pocCommunicationID = "";
						 var pocPLKit = '';
						 var pocCommunicationsURL = "";
						 var pocFormatText = "";
						 var pocNoData = "";
						 
					     jQuery('#policiesNoItems').attr('style','display: none;');
					     jQuery('#policiesCriticalError').attr('style','display: none;');
					     
					     _renderObject.headerHtml += '<table class="sortable"><thead><tr><th>Letter ID#</th><th>Date</th><th>Name</th>'; 
					     _renderObject.headerHtml += '<th>Products</th><th>Begin<br>Date</th><th>Links</th></tr></thead><tbody>'; 
					     _renderObject.footerHtml = '</tbody></table>';
						 
						  if ( processPoliciesClick ) {
							pocSearchOptions += '<option value="' + 'Search BY' + '">' + 'Search By:' + '</option>';
						    pocSearchOptions += '<option value="' + 'LetterID' + '">' + 'LetterID' + '</option>';
							pocSearchOptions += '<option value="' + 'Date' + '">' + 'Date' + '</option>';
							pocSearchOptions += '<option value="' + 'Name' + '">' + 'Name' + '</option>';
							pocSearchOptions += '<option value="' + 'Products' + '">' + 'Products' + '</option>';
							pocSearchOptions += '<option value="' + 'BeginDate' + '">' + 'BeginDate' + '</option>';										
							jQuery('#POCSearchBy').append(pocSearchOptions);
							
    					  } 
						  
		 
						 counter = 1;
			     
   					     jQuery('Program',xml).each(function() { 
					     	  if ( counter%2 ) { 
					     		_renderObject.headerHtml += '<tr class="">'; 
					     	  } else { 
					     		_renderObject.headerHtml += '<tr class="alt">'; 
					     	  } counter++;
					     	  pocLetterID = jQuery(this).find("LetterID").text(); 
					     	  pocDate = jQuery(this).find("Date").text(); 
							  //pocType = jQuery(this).find("Type").text(); 
					     	  pocName = jQuery(this).find("Name").text(); 
					     	  pocProducts = jQuery(this).find("Products").text(); 
							  pocFormatText = fnStrFormat(pocProducts);
					     	  pocProgramBeginDate = jQuery(this).find("BDATE").text();
					     	  //pocProgramEndDate = jQuery(this).find("EDATE").text();
					     	  //pocPLKit = jQuery(this).find("PLKIT").text();
					     	  pocPLKit = "policy1";					     	  					     						
						      _renderObject.headerHtml += '<td>'+ pocLetterID +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ pocDate +'</td>'; 
							  //_renderObject.headerHtml += '<td>'+ pocType +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ pocName +'</td>'; 
					     	 //_renderObject.headerHtml += '<td>'+ pocProducts +'</td>';
							 _renderObject.headerHtml += '<td>'+ pocFormatText + '<a title="'; //+ pocProducts + '">....</a></td>';
							 if ( pocFormatText == pocProducts ) {
						    	  _renderObject.headerHtml += pocProducts + '"></a></td>';
						     }
						     else {
						    	  _renderObject.headerHtml += pocProducts + '">....</a></td>'
						     }
					     	  _renderObject.headerHtml += '<td>'+ pocProgramBeginDate +'</td>';
					     	 //_renderObject.headerHtml += '<td>'+ pocProgramEndDate +'</td>';
							 pocAttachmentCount = jQuery(this).find("ATTACHMENT_COUNT").text();
							 pocAttachmentContactID = jQuery(this).find("ATTACHMENT_CONTACT").text();
							 pocCommunicationID =  jQuery(this).find("COMMUNICATION_ID").text();
							  
							  if ( pocAttachmentCount > 0 ) { 
								pocPLKit = "";
								var tmpCount = 0;
								pocCommunicationsURL = "";
								for(var pocCount = 0; pocCount<pocAttachmentCount; pocCount++) { 
								   tmpCount = pocCount + 1;
								   pocAttachmentID = jQuery(this).find("ATTACHMENT_ID"+tmpCount).text(); 
								   pocAttachmentName = jQuery(this).find("ATTACHMENT_NAME"+tmpCount).text(); 
								   pocAttachmentType = jQuery(this).find("ATTACHMENT_TYPE"+tmpCount).text(); 
								   pocCommunicationsURL = _renderObject.policiesBaseURL + pocAttachmentID + '&cmId=' + pocCommunicationID + '&ctId=' + pocAttachmentContactID + '&source=Portal';
								   //plKit = plKit + '<a href="about:blank" target="_blank">'; 
								   pocPLKit = pocPLKit + '<a href="' + pocCommunicationsURL + '" target="_blank">'; 
								   if ( pocAttachmentType.length > 0 && pocAttachmentType =='.pdf')
								       pocPLKit = pocPLKit + '<img src="' +pdfIcon + '" alt="' + pocAttachmentName + '" title="' + pocAttachmentName + '"></a>';
								   else if (pocAttachmentType.length > 0 && pocAttachmentType =='.ppt')		
								       pocPLKit = pocPLKit + '<img src="' +pptIcon + '" alt="' + pocAttachmentName + '" title="' + pocAttachmentName + '"></a>';
								   else if ( pocAttachmentType.length > 0 && pocAttachmentType =='.zip')
								       pocPLKit = pocPLKit + '<img src="' +zipIcon + '" alt="' + pocAttachmentName + '" title="' + pocAttachmentName + '"></a>';
								   else if ( pocAttachmentType.length > 0 && (pocAttachmentType =='.xls' || pocAttachmentType =='.xlsx'))
								       pocPLKit = pocPLKit + '<img src="' +excelIcon + '" alt="' + pocAttachmentName + '" title="' + pocAttachmentName + '"></a>';
								   else if ( pocAttachmentType.length > 0 && (pocAttachmentType =='.doc'||pocAttachmentType =='.docx'))
								       pocPLKit = pocPLKit + '<img src="' +docIcon + '" alt="' + pocAttachmentName + '" title="' + pocAttachmentName + '"></a>';
								   else if ( pocAttachmentType.length > 0 && pocAttachmentType =='.txt')
								       pocPLKit = pocPLKit + '<img src="' +txtIcon + '" alt="' + pocAttachmentName + '" title="' + pocAttachmentName + '"></a>';
								   if (tmpCount%3 == 0) {
									   pocPLKit = pocPLKit + '<br/>';	   
								   }
								}
							  }

					     	  //_renderObject.headerHtml += '<td><a href="about:blank" target="_blank">'+ pocPLKit +'</a></td>'; 
							   _renderObject.headerHtml += '<td>' + pocPLKit + '</td>';
					     	 _renderObject.headerHtml +='</tr>'; 
 				              });
						 _renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
			             jQuery('#PoliciesTable').append(_renderObject.HtmlOutput); 
						 jQuery('#PendingPLCDisplay').attr('style','display: none;');
						 // Bind table sorting for Policies table
							if (jQuery.fn.tablesorter)//add sorting to the order details lines table
								jQuery('#PoliciesTable table.sortable').tablesorter( { cssHeader: 'sortable', sortList: [[1,1]] })
									.bind('sortEnd', function(e) {
										// Only re-apply alt class if it's already present
										if (jQuery('tr.alt', jQuery(this)).length > 0)
										jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
									});
						
						 // Support text style change on sortable table headers
						 jQuery('#PoliciesTable th.sortable').hover(
							function() { jQuery(this).addClass('hover'); },
							function() { jQuery(this).removeClass('hover'); }
						 );
						 
						 jQuery('#POCSearchBy').change(function() {
	                        var pocSelectedOption = jQuery('#POCSearchBy option:selected').text();  							
							if (  pocSelectedOption == 'Date' || pocSelectedOption == 'BeginDate') {
								jQuery('#pocKeywords').attr("disabled", true); 
						 	}else { 
						 	    jQuery('#pocKeywords').attr("disabled", false);
							}
						 });  	
						 
						 if ( processPoliciesClick) {
    				              jQuery('#PolicySearch').click(function () { 
								     pocKeywords = jQuery('#pocKeywords').val();
									 pocDate1 = jQuery('#pocDate1').val();
								     //pocDate2 = jQuery('#pocDate2').val();
									 pocOption = jQuery('#POCSearchBy option:selected').text();
									 pocMode = jQuery('#pocMode').val();
									 pocStage = jQuery('#pocStage').val();
									 pocBpasID = jQuery('#pocBpasID').val();
									 //alert ("CLICK - " +plcOption + " ; " + plcKeywords + " ; " + plcDate1 + " ; " + plcDate2);
									 if (pocMode == 'test' || ( pocOption != 'Search By:' && ( (pocKeywords.length > 0 && pocKeywords != 'Keywords') || (pocDate1.length > 0 && pocDate1 != 'mm/dd/yy') ) ) ) {
                                         
                                         if ( pocMode == 'test' && pocOption == 'Search By:')										 
										     pocOption = 'default';										 
											 
									     if ( !pocViewModified )
									         jQuery('#PoliciesStatusPortletHeader ul.filters').append('<li><h4>&nbsp;</h4><a href="#" id="pocClear" name="pocClear" class="button"><span>Clear</span></a></li>');
										 pocViewModified = true;
										 
										 jQuery('#PolicySearch').blur();
        				          
        				                  jQuery('#PoliciesTable thead tr').each(function () {
                                            jQuery(this).remove(); 
        						          });
                                          jQuery('#PoliciesTable tbody tr').each(function () {
                                            jQuery(this).remove(); 
        						          }); 
									
										 jQuery('#PoliciesStatusPortletHeader ul.filters li').each(function () {
										   if ( jQuery('a', jQuery(this)).text() == 'Clear' )
										      jQuery(this).click(function () {//even handling for Clear button
												jQuery(this).remove();
												
												var pocSelect = document.getElementById("POCSearchBy");
												pocSelect.options[0].selected = true;
												document.getElementById("pocKeywords").value = 'Keywords';
												document.getElementById("pocDate1").value = 'mm/dd/yy';
												//document.getElementById("pocDate2").value = 'mm/dd/yy';
												//document.getElementById("pocBpasID").value = 'BPAS ID';
												
												jQuery('#PolicySearch').blur();
        				          
        				                        jQuery('#PoliciesTable thead tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												
                                                jQuery('#PoliciesTable tbody tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												
												// Code Added by Nagendra For Fix Clear Defect *Start*
												pocMode = jQuery('#pocMode').val();  
												if(typeof(pocMode)=="undefined"){ pocMode = "";}
												//alert(pocMode);
												policiesProxyURL = '/proxy/CommunicationsAccess/RetrievePolicies?searchby=default&STAGE='+pocStage;
												if ( pocMode.length > 0 || typeof(pocMode)!="undefined")
												    policiesProxyURL = policiesProxyURL + '&mode=' + pocMode
												// Code Added by Nagendra For Fix Clear Defect *END*
												jQuery(function() { Policies.init(); });
												pocViewModified = false;
												processPoliciesClick = false; 
												_renderObject.pocClearButtonClick = true;
											  });
										 });

                                         if ( pocOption == 'default') {
											policiesProxyURL = '/proxy/CommunicationsAccess/RetrievePolicies?searchby=default&STAGE='+pocStage;
											if ( pocMode.length > 0)
												    policiesProxyURL = policiesProxyURL + '&mode=' + pocMode
											if ( pocDate1.length > 0 && pocDate1 != 'mm/dd/yy')
											    policiesProxyURL = policiesProxyURL + '&bdate=' + pocDate1;
											//if ( pocDate2.length > 0 && pocDate2 != 'mm/dd/yy')
											//    policiesProxyURL = policiesProxyURL + '&edate=' + pocDate2;	
										 }
										 else { 	
											policiesProxyURL = '/proxy/CommunicationsAccess/RetrievePolicies?searchby='+pocOption+'&keywords='+pocKeywords+'&mode='+pocMode+'&STAGE='+pocStage;
											
											if ( pocDate1.length > 0 && pocDate1 != 'mm/dd/yy')
											    policiesProxyURL = policiesProxyURL + '&bdate=' + pocDate1;
											//if ( pocDate2.length > 0 && pocDate2 != 'mm/dd/yy')
											//    policiesProxyURL = policiesProxyURL + '&edate=' + pocDate2;	
										 }	
										 if ( pocMode == 'test' && ( pocBpasID != 'BPAS ID' && pocBpasID.length > 0)  )
										     policiesProxyURL = policiesProxyURL + '&bpasID=' + pocBpasID;
										 //alert(policiesProxyURL);
                                         jQuery(function() { Policies.init(); });
										 processPoliciesClick = false; 
										 _renderObject.pocClearButtonClick = false;
										 
									 }
								  });
							  
								  //processPoliciesClick = false;
						 }
						 
						 jQuery('OnlineCommunications',xml).each(function() {
							pocNoData = jQuery(this).find("nodata").text();
						 });
								 					     					     
						 if ( pocNoData == 'yes' || pocNoData == 'no contact found') {
							    jQuery('#policiesCriticalError').attr('style','display: none;');
							    jQuery('#PLCDisplayMessage').attr('style','display: none;');
							    jQuery('#PoliciesTable thead tr').each(function () {
	                                jQuery(this).remove(); 
						        });
		                        var pocHtml = ""; 
							    if ( !processPoliciesClick && !_renderObject.pocClearButtonClick ) {
							    	if ( pocNoData == 'no contact found')
							    		pocHtml = pocHtml + '<span class="' + 'intro' + '">There are no Policy documents to display (PGM1004)<br/>';
							    	else
							    		pocHtml = pocHtml + '<span class="' + 'intro' + '">Your search did not return any documents. Click "Clear" above to remove filter criteria (PGM1002) <br/>';
							    	jQuery('#policiesNoItems').html("");
							    	jQuery('#policiesNoItems').html(pocHtml);
							    } else if (processPoliciesClick || (_renderObject.pocClearButtonClick ||_renderObject.pocClearButtonClick == '') ) { 
							    	if ( pocNoData == 'no contact found')
							    		pocHtml = pocHtml + '<span class="' + 'intro' + '">There are no Policy documents to display (PGM1004)<br/>';
							    	else 
							    		pocHtml = pocHtml + '<span class="' + 'intro' + '">There are no Policy documents to display (PGM1001)<br/>';
							    	jQuery('#policiesNoItems').html("");
							    	jQuery('#policiesNoItems').append(pocHtml);
							    }
							    
							    jQuery('#policiesNoItems').removeAttr("style");//show this div message
						 }
						 
					 }
					 
					  // Online Communications Products Tab
					 if (displayType == 'Products') { 
					     var counter = 0; 
						 var prcSearchOptions = '';
						 var prcKeywords = "";
						 //var prcDate1 = "";
						 //var prcDate2 = "";
						 var prcOption = "";
						 var prcMode = "";
						 var prcStage = "";
						 var prcBpasID = "";
						 var prcViewModified = false;
						 var prcLetterID = '';
						 var prcDate = '';
						 var prcType = '';
						 var prcName = '';
						 var prcProducts = '';
						 var prcProgramBeginDate = '';
						 var prcProgramEndDate = '';
						 var prcAttachmentCount = '';
						 var prcAttachmentID = "";
						 var prcAttachmentName = "";
						 var prcAttachmentType = "";
						 var prcAttachmentContactID = "";
						 var prcCommunicationID = "";
						 var prcPLKit = '';
						 var prcCommunicationsURL = "";
						 var prcFormatText = "";
						 var prcNoData = "";
						 
					     jQuery('#productsNoItems').attr('style','display: none;');
					     jQuery('#productsCriticalError').attr('style','display: none;');
						 					     
					     _renderObject.headerHtml += '<table class="sortable"><thead><tr><th>Letter ID#</th><th>Date</th><th>Type</th><th>Name</th>'; 
					     _renderObject.headerHtml += '<th>Products</th><th>Links</th></tr></thead><tbody>'; 
					     _renderObject.footerHtml = '</tbody></table>';
						 
						  if ( processProductsClick ) {
							prcSearchOptions += '<option value="' + 'Search BY' + '">' + 'Search By:' + '</option>';
						    prcSearchOptions += '<option value="' + 'LetterID' + '">' + 'LetterID' + '</option>';
							prcSearchOptions += '<option value="' + 'Date' + '">' + 'Date' + '</option>';
							prcSearchOptions += '<option value="' + 'Type' + '">' + 'Type' + '</option>';
							prcSearchOptions += '<option value="' + 'Name' + '">' + 'Name' + '</option>';
							prcSearchOptions += '<option value="' + 'Products' + '">' + 'Products' + '</option>';
														
							jQuery('#PRCSearchBy').append(prcSearchOptions);
							
    					  } 
						  
		 
						 counter = 1;
			     
   					     jQuery('Program',xml).each(function() { 
					     	  if ( counter%2 ) { 
					     		_renderObject.headerHtml += '<tr class="">'; 
					     	  } else { 
					     		_renderObject.headerHtml += '<tr class="alt">'; 
					     	  } counter++;
					     	  prcLetterID = jQuery(this).find("LetterID").text(); 
					     	  prcDate = jQuery(this).find("Date").text(); 
							  prcType = jQuery(this).find("Type").text(); 
					     	  prcName = jQuery(this).find("Name").text(); 
					     	  prcProducts = jQuery(this).find("Products").text(); 
							  prcFormatText = fnStrFormat(prcProducts);
					     	  //prcProgramBeginDate = jQuery(this).find("BDATE").text();
					     	  //prcProgramEndDate = jQuery(this).find("EDATE").text();
					     	  //prcPLKit = jQuery(this).find("PLKIT").text();
					     	  //prcPLKit = "product1";					     	  					     						
							  prcAttachmentCount = jQuery(this).find("ATTACHMENT_COUNT").text();
							  prcAttachmentContactID = jQuery(this).find("ATTACHMENT_CONTACT").text();
							  prcCommunicationID = jQuery(this).find("COMMUNICATION_ID").text();
							  
							  if ( prcAttachmentCount > 0 ) { 
								prcPLKit = "";
								var tmpCount = 0;
								prcCommunicationsURL = "";
								for(var prcCount = 0; prcCount<prcAttachmentCount; prcCount++) { 
								   tmpCount = prcCount + 1;
								   prcAttachmentID = jQuery(this).find("ATTACHMENT_ID"+tmpCount).text(); 
								   prcAttachmentName = jQuery(this).find("ATTACHMENT_NAME"+tmpCount).text(); 
								   prcAttachmentType = jQuery(this).find("ATTACHMENT_TYPE"+tmpCount).text(); 
								   prcCommunicationsURL = _renderObject.productsBaseURL + prcAttachmentID + '&cmId=' + prcCommunicationID + '&ctId=' + prcAttachmentContactID + '&source=Portal';
								   //plKit = plKit + '<a href="about:blank" target="_blank">'; 
								   prcPLKit = prcPLKit + '<a href="' + prcCommunicationsURL + '" target="_blank">'; 
								   if ( prcAttachmentType.length > 0 && prcAttachmentType =='.pdf')
								       prcPLKit = prcPLKit + '<img src="' +pdfIcon + '" alt="' + prcAttachmentName + '" title="' + prcAttachmentName + '"></a>';
								   else if (prcAttachmentType.length > 0 && prcAttachmentType =='.ppt')		
								       prcPLKit = prcPLKit + '<img src="' +pptIcon + '" alt="' + prcAttachmentName + '" title="' + prcAttachmentName + '"></a>';
								   else if ( prcAttachmentType.length > 0 && prcAttachmentType =='.zip')
								       prcPLKit = prcPLKit + '<img src="' +zipIcon + '" alt="' + prcAttachmentName + '" title="' + prcAttachmentName + '"></a>';
								   else if ( prcAttachmentType.length > 0 && (prcAttachmentType =='.xls'||prcAttachmentType =='.xlsx'))
								       prcPLKit = prcPLKit + '<img src="' +excelIcon + '" alt="' + prcAttachmentName + '" title="' + prcAttachmentName + '"></a>'; 
								   else if ( prcAttachmentType.length > 0 && (prcAttachmentType =='.doc' || prcAttachmentType =='.docx'))
								       prcPLKit = prcPLKit + '<img src="' +docIcon + '" alt="' + prcAttachmentName + '" title="' + prcAttachmentName + '"></a>'; 
								   else if ( prcAttachmentType.length > 0 && prcAttachmentType =='.txt')
								       prcPLKit = prcPLKit + '<img src="' +txtIcon + '" alt="' + prcAttachmentName + '" title="' + prcAttachmentName + '"></a>'; 
								   if (tmpCount%3 == 0) {
									   prcPLKit = prcPLKit + '<br/>';	   
								   }
								}
							  }

						      _renderObject.headerHtml += '<td>'+ prcLetterID +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ prcDate +'</td>'; 
							  _renderObject.headerHtml += '<td>'+ prcType +'</td>'; 
					     	  _renderObject.headerHtml += '<td>'+ prcName +'</td>'; 
					     	 //_renderObject.headerHtml += '<td>'+ prcProducts +'</td>';
							 _renderObject.headerHtml += '<td>'+ prcFormatText + '<a title="'; //+ prcProducts + '">....</a></td>';
							 if ( prcFormatText == prcProducts ) {
						    	  _renderObject.headerHtml += prcProducts + '"></a></td>';
						     }
						     else {
						    	  _renderObject.headerHtml += prcProducts + '">....</a></td>'
						     }
					     	 // _renderObject.headerHtml += '<td>'+ prcProgramBeginDate +'</td>';
					     	 //_renderObject.headerHtml += '<td>'+ prcProgramEndDate +'</td>';

					     	  //_renderObject.headerHtml += '<td><a href="about:blank" target="_blank">'+ prcPLKit +'</a></td>'; 
							 _renderObject.headerHtml += '<td>' + prcPLKit + '</td>';
					     	 _renderObject.headerHtml +='</tr>'; 
 				              });
						 _renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
			             jQuery('#ProductsTable').append(_renderObject.HtmlOutput); 
						 jQuery('#PendingPRCDisplay').attr('style','display: none;');
						 // Bind table sorting for Products table
							if (jQuery.fn.tablesorter)//add sorting to the order details lines table
								jQuery('#ProductsTable table.sortable').tablesorter( { cssHeader: 'sortable', sortList: [[1,1]] })
									.bind('sortEnd', function(e) {
										// Only re-apply alt class if it's already present
										if (jQuery('tr.alt', jQuery(this)).length > 0)
										jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
									});
						
						 // Support text style change on sortable table headers
						 jQuery('#ProductsTable th.sortable').hover(
							function() { jQuery(this).addClass('hover'); },
							function() { jQuery(this).removeClass('hover'); }
						 );
						 
						 jQuery('#PRCSearchBy').change(function() {
		                        var prcSelectedOption = jQuery('#PRCSearchBy option:selected').text();  							
								if (prcSelectedOption == 'Date') {
									jQuery('#prcKeywords').attr("disabled", true); 
							 	}else { 
							 	    jQuery('#prcKeywords').attr("disabled", false);
								}
						 });  	
						 
						 if ( processProductsClick) {
    				              jQuery('#ProductSearch').click(function () { 
								     //alert ("plc Search");
								     prcKeywords = jQuery('#prcKeywords').val();
									 //prcDate1 = jQuery('#prcDate1').val();
								     //prcDate2 = jQuery('#prcDate2').val();
									 prcOption = jQuery('#PRCSearchBy option:selected').text();
									 prcMode = jQuery('#prcMode').val();
									 prcStage = jQuery('#prcStage').val();
									 prcBpasID = jQuery('#prcBpasID').val();
									 //alert ("CLICK - " +plcOption + " ; " + plcKeywords + " ; " + plcDate1 + " ; " + plcDate2);
									 if ( prcMode == 'test' || ( prcOption != 'Search By:' && ( (prcKeywords.length > 0 && prcKeywords != 'Keywords') ) ) ) {
                                         
										 if ( prcMode == 'test' && prcOption == 'Search By:')										 
										     prcOption = 'default';	
									     if ( !prcViewModified )
									         jQuery('#ProductsStatusPortletHeader ul.filters').append('<li><h4>&nbsp;</h4><a href="#" id="prcClear" name="prcClear" class="button"><span>Clear</span></a></li>');
										 prcViewModified = true;
										 
										 jQuery('#ProductSearch').blur();
        				          
        				                  jQuery('#ProductsTable thead tr').each(function () {
                                            jQuery(this).remove(); 
        						          });
                                          jQuery('#ProductsTable tbody tr').each(function () {
                                            jQuery(this).remove(); 
        						          }); 
									
										 jQuery('#ProductsStatusPortletHeader ul.filters li').each(function () {
										   if ( jQuery('a', jQuery(this)).text() == 'Clear' ) 
										      jQuery(this).click(function () {//even handling for Clear button
												jQuery(this).remove();
												
												var prcSelect = document.getElementById("PRCSearchBy");
												prcSelect.options[0].selected = true;
												document.getElementById("prcKeywords").value = 'Keywords';
												//document.getElementById("prcDate1").value = 'mm/dd/yy';
												//document.getElementById("prcDate2").value = 'mm/dd/yy';
												//document.getElementById("prcBpasID").value = 'BPAS ID';
												
												jQuery('#ProductSearch').blur();
        				          
        				                        jQuery('#ProductsTable thead tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												
                                                jQuery('#ProductsTable tbody tr').each(function () {
                                                   jQuery(this).remove(); 
        						                });
												
												// Code Added by Nagendra For Fix Clear Defect *Start*
												prcMode = jQuery('#prcMode').val();  
												if(typeof(prcMode)=="undefined"){ prcMode = "";}
												//alert(prcMode);
												productsProxyURL = '/proxy/CommunicationsAccess/RetrieveProducts?searchby=default&STAGE=' + prcStage;
												if ( prcMode.length > 0 || typeof(prcMode)!="undefined")
												    productsProxyURL = productsProxyURL + '&mode=' + prcMode
												// Code Added by Nagendra For Fix Clear Defect *END*
												
												//jQuery(function() { Products.init(); });
												fnInit();
												prcViewModified = false;
												processProductsClick = false; 
												_renderObject.prcClearButtonClick = true;
											  }); 
										 });

                                         if ( prcOption == 'default') {
											productsProxyURL = '/proxy/CommunicationsAccess/RetrieveProducts?searchby=default&STAGE='+prcStage;
											if ( prcMode.length > 0 )
												    productsProxyURL = productsProxyURL + '&mode=' + prcMode
											//if ( prcDate1.length > 0 && prcDate1 != 'mm/dd/yy')
											//    productsProxyURL = productsProxyURL + '&bdate=' + prcDate1;
											//if ( prcDate2.length > 0 && prcDate2 != 'mm/dd/yy')
											//    productsProxyURL = productsProxyURL + '&edate=' + prcDate2;	
										 }
										 else { 	
											productsProxyURL = '/proxy/CommunicationsAccess/RetrieveProducts?searchby='+prcOption+'&keywords='+prcKeywords+'&mode='+prcMode+'&STAGE='+prcStage;
											
											//if ( prcDate1.length > 0 && prcDate1 != 'mm/dd/yy')
											//    productsProxyURL = productsProxyURL + '&bdate=' + prcDate1;
											//if ( prcDate2.length > 0 && prcDate2 != 'mm/dd/yy')
											//    productsProxyURL = productsProxyURL + '&edate=' + prcDate2;	
										 }	
										 if ( prcMode == 'test' && ( prcBpasID != 'BPAS ID' && prcBpasID.length > 0)  ) {
										     productsProxyURL = productsProxyURL + '&bpasID=' + prcBpasID;
										 }
										 //alert(productsProxyURL);
                                         //jQuery(function() { Products.init(); });
										 //Products.init();
										 fnInit();
										 processProductsClick = false; 
										 _renderObject.prcClearButtonClick = false;
									 }
								  });
							  
								  //processProductsClick = false;
						 }
						 
						 jQuery('OnlineCommunications',xml).each(function() {
						 	prcNoData = jQuery(this).find("nodata").text();
						 });
									 					     					     
						 if ( prcNoData == 'yes' || prcNoData == 'no contact found') {
							    jQuery('#productsCriticalError').attr('style','display: none;');
							    jQuery('#PRCDisplayMessage').attr('style','display: none;');
							    jQuery('#ProductsTable thead tr').each(function () {
	                                jQuery(this).remove(); 
						        });
		                        var prcHtml = ""; 
							    if ( !processProductsClick && !_renderObject.prcClearButtonClick ) {
							    	if ( prcNoData == 'no contact found')
							    		prcHtml = prcHtml + '<span class="' + 'intro' + '">There are no Product documents to display (PGM1004)<br/>';
							    	else 
							    		prcHtml = prcHtml + '<span class="' + 'intro' + '">Your search did not return any documents. Click "Clear" above to remove filter criteria (PGM1002) <br/>';
							    	jQuery('#productsNoItems').html("");
							    	jQuery('#productsNoItems').html(prcHtml);
							    } else if (processProductsClick || (_renderObject.prcClearButtonClick ||_renderObject.prcClearButtonClick == '') ) { 
							    	if ( prcNoData == 'no contact found')
							    		prcHtml = prcHtml + '<span class="' + 'intro' + '">There are no Product documents to display (PGM1004)<br/>';
							    	else
							    		prcHtml = prcHtml + '<span class="' + 'intro' + '">There are no Product documents to display (PGM1001)<br/>';
							    	jQuery('#productsNoItems').html("");
							    	jQuery('#productsNoItems').append(prcHtml);
							    }
							    
							    jQuery('#productsNoItems').removeAttr("style");//show this div message
						 }
						 
						 
					 }

					// Render Billing Status portlet 
					if (displayType == 'billingStatus') { 
						 // Build an HTML string 
						 	//make sure other info is hidden
						 	jQuery('#Billing #CriticalError').attr('style','display: none;');
						 	jQuery('#noresultBillingStatus').attr('style','display: none;');
							
						 
						 
						_renderObject.headerHtml += '<thead><tr><th>Customer #</th><th>Customer<br />Name</th><th>Customer<br />Type</th>'; 
						_renderObject.headerHtml += '<th>Overdue<br />Invoices</th><th>Open<br />Invoices</th><th>Account<br />Balance</th></tr></thead><tbody>'; 
						billingStatusresults = 0;
						jQuery('BillingStatus',xml).each(function() { 
							if ( _renderObject.counter%2 ) { 
								_renderObject.headerHtml += '<tr class="">'; 
							} else { 
								_renderObject.headerHtml += '<tr class="alt">'; 
							} 
							custNumber = jQuery(this).find("Customer_Number").text(); 
							custName = jQuery(this).find("Customer_Name").text(); 
							custType = jQuery(this).find("Access_Level").text(); 
							AccountBalance = jQuery(this).find("AccountBalance").text(); 
							OverdueInvoices = jQuery(this).find("OverdueInvoices").text(); 
							OpenInvoices=jQuery(this).find("OpenInvoices").text(); 
							CurrencyCode=jQuery(this).find("Currency_Code").text(); 
							SalesChannelCode=jQuery(this).find("Sales_Channel_Code").text(); 
							var linkappend = "&i_currency_code=" + CurrencyCode + "&i_customer=" + custNumber + "&i_cust_name=" + custName; 
							
							_renderObject.headerHtml += '<td>'+ custNumber +'</td>'; 
							_renderObject.headerHtml += '<td>'+ custName +'</td>'; 
							_renderObject.headerHtml += '<td>'+ SalesChannelCode +'</td>'; 
							_renderObject.headerHtml += '<td><a href="'+OverDueInvoiceLink +linkappend +'" target=_blank>' + OverdueInvoices +'</a></td>'; 
							_renderObject.headerHtml += '<td><a href="'+OpenInvoicesLink +linkappend +'" target=_blank>' + OpenInvoices +'</a></td></td>'; 
							_renderObject.headerHtml += '<td><a href="'+AccountBalanceLink +linkappend +'" target=_blank>' + AccountBalance +'</a></td></tr>'; 
							
							// Build row HTML data and store in string 
							//mydata = BuildBillingStatusHTML(custNumber,custName,custType,AccountBalance,OverdueInvoices,OpenInvoices,SalesChannelCode,CurrencyCode); 
							//myHTMLOutput = myHTMLOutput + mydata; 
							_renderObject.counter ++; 
							billingStatusresults ++;
							
						}); 
						
						
						if (billingStatusresults==0) {
							jQuery('#Billing #CriticalError').attr('style','display: none;');
							jQuery('#noresultBillingStatus').removeAttr("style");
						} else {
						
							// get the complete HTML; 
							_renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
							jQuery('#BillingTable').append(_renderObject.HtmlOutput); 

							// Bind table sorting for Billingstatus table 
							if (jQuery.fn.tablesorter) {
								jQuery('#BillingTable table.sortable').tablesorter( {
									 headers: { 
										3 : {  sorter: "englishNumber" },
										4 : {  sorter: "englishNumber" },
										5 : {  sorter: "englishNumber" }
									  },
									  cssHeader: 'sortable' }) 
									.bind('sortEnd', function(e) { 
										// Only re-apply alt class if it's already present 
										if (jQuery('tr.alt', jQuery(this)).length > 0) 
										jQuery('tr', jQuery(this)).removeClass('alt').filter(':even').addClass('alt'); 
									}); 
							} 

							// Support text style change on sortable table headers 
							jQuery('#BillingTable th.sortable').hover( 
								function() { jQuery(this).addClass('hover'); }, 
								function() { jQuery(this).removeClass('hover'); } 
							); 
						}	
					} 
					
					// debit Spa Display
					
					if (displayType == 'debitSPA') {
						 // Build an HTML string 
						 var debititems = 0;
						 
						 // set the defaults
						 	_renderObject.headerHtml = '<table class="sortable tightTable" width="700px">';
							_renderObject.HtmlOutput = "";
							
						 //make sure other info is hidden
						 	jQuery('#debitCriticalError').attr('style','display: none;');
							jQuery('#DebitNoItems').attr('style','display: none;');
							jQuery('#LoginError').attr('style','display: none;');
						
						_renderObject.headerHtml += '<thead><tr><th>SPA #</th><th>Model<br />Number</th><th>Reseller<br />Name</th>'; 
						_renderObject.headerHtml += '<th>Program</th><th>Req.<br />Price</th><th>Req.<br />Vol.</th><th>App.<br />Price</th>';
						_renderObject.headerHtml += '<th>Begin<br />Date</th><th>End<br />Date</th><th>Status</th></tr></thead><tbody>'; 

				                if ( jQuery("#FieldSelectSPA").val() == '1') {
				                	var downloadURL = '';
			                        	//downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '/proxy/DownloadCsv/DownloadFile?type=download&module=SPA&SPA=debit"' + 'target="' + '_blank"' + '>Download to Excel</a></p><br>';
			                                downloadURL = '<p class="homeLink"><a href="#" onclick="updateCatalyst(\'spa_debit\')">Download to Excel</a></p><br>';
			                                //downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '#"' + 'onclick="' + 'updateCatalyst("' + 'spa_debit"' + ')"' + '>Download to Excel</a></p><br>';
				                	jQuery('#SPADownloadLink').html("");
				                	jQuery('#SPADownloadLink').append(downloadURL);
				                	jQuery('#SPADownloadLink').removeAttr("style");//show SPA download div
				                }
						jQuery('DebitSpaDetail',xml).each(function() { 
						        	
						        	error = jQuery(this).find("error").text(); 
						        	
						        	if (error.length != 0) {
						        	 //  _renderObject.headerHtml = '<tr></td><div id="AuthFailed">';
						        	 //  _renderObject.headerHtml +='<p class="intro">Your login attempt has failed <br>The username or password may be incorrect,'; 
						        	 //  _renderObject.headerHtml +='or your location or login time may be restricted. Please contact the administrator at your company;'
						        	 //  _renderObject.headerHtml +='</p></div></td></tr>';
						        	   debititems = "error";
	           						
	           						} else {
						        	
									if ( _renderObject.counter%2 ) { 
										_renderObject.headerHtml += '<tr class="">'; 
									} else { 
										_renderObject.headerHtml += '<tr class="alt">'; 

									} 



									spaNumber = jQuery(this).find("spa_number").text(); 

									if (spaNumber =="NONE") {
									   spaNumber = jQuery(this).find("pre_spa").text();
									}
									custName = "";
									modelNumber = "";
									resellerName = "";
									program = "";
									reprice = "";
									reqVolume = "";
									aprvPrice="";
									bdate="";
									edate="";
									debitspastatus="";

									//custName = jQuery(this).find("customer_name").text();
									modelNumber = jQuery(this).find("model_number").text(); 
									resellerName = jQuery(this).find("reseller").text(); 
									program = jQuery(this).find("program").text(); 
									reprice = jQuery(this).find("reqPrice").text(); 
									reqVolume = jQuery(this).find("reqVolume").text(); 
									aprvPrice=jQuery(this).find("appPrice").text(); 
									bdate=getFormattedDate(jQuery(this).find("bdate").text(),' '); 
									edate=getFormattedDate(jQuery(this).find("edate").text(),' ');
									debitspastatus=jQuery(this).find("status").text();

									//var linkappend = "&i_currency_code=" + CurrencyCode + "&i_customer=" + custNumber + "&i_cust_name=" + custName; 

									_renderObject.headerHtml += '<td>'+ spaNumber +'</td>'; 
									//_renderObject.headerHtml += '<td class="chopname">'+ custName +'</td>'; 
									_renderObject.headerHtml += '<td>'+ modelNumber +'</td>'; 
									_renderObject.headerHtml += '<td class="chopname">'+ resellerName +'</td>'; 
									_renderObject.headerHtml += '<td class="chopname">' + program +'</td></td>';
									_renderObject.headerHtml += '<td>' + reprice +'</td></td>';
									_renderObject.headerHtml += '<td>' + reqVolume +'</td></td>';
									_renderObject.headerHtml += '<td>' + aprvPrice +'</td></td>';
									_renderObject.headerHtml += '<td>' + bdate +'</td>'; 
									_renderObject.headerHtml += '<td>' + edate +'</td>'; 
									_renderObject.headerHtml += '<td>' + debitspastatus +'</td></tr>'; 

									_renderObject.counter ++; 
									debititems ++;
								}	
						}); 
						
						// check if there are results
						
						if (debititems == 0)  {
							
							//make sure other info is hidden
							jQuery('#debitCriticalError').attr('style','display: none;');
							jQuery('#DebitNoItems').removeAttr("style");
							jQuery('#LoginError').attr('style','display: none;');
						
						} else if (debititems=="error") {
						// get the complete HTML; 
							
							jQuery('#debitCriticalError').attr('style','display: none;');
							jQuery('#DebitNoItems').attr('style','display: none;');
							jQuery('#LoginError').removeAttr("style");
							
							//_renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
							//jQuery('#debitSpaTable').append(_renderObject.HtmlOutput); 
						
						} else { 
							// get the complete HTML; 
							_renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
							jQuery('#debitSpaTable').append(_renderObject.HtmlOutput); 

							// reset the variables
							_renderObject.headerHtml = '<table class="sortable tightTable" width="700px">';
							_renderObject.HtmlOutput = "";

							// Bind table sorting for Debit SPA table
							if (jQuery.fn.tablesorter) {
							jQuery('#debitSpaTable table.sortable').tablesorter( {
							         headers: { 
								        0 : {  sorter: "englishNumber" },
									5 : {  sorter: "englishNumber" },
									6 : {  sorter: "englishNumber" }
								  }, cssHeader: 'sortable' })
								.bind('sortEnd', function(e) {
						          		// Only re-apply alt class if it's already present
									if (jQuery('tr.alt', jQuery(this)).length > 0)
						         		jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
								});
							}

							// Support text style change on sortable table headers
							jQuery('#debitSpaTable th.sortable').hover(
								function() { jQuery(this).addClass('hover'); },
								function() { jQuery(this).removeClass('hover'); }
							);
							
							// check the formatting 
							jQuery('.chopname').each(function(){
								 var val = breakdownName(jQuery(this).html(),13);
							  	jQuery(this).html(val);
  							});
						}
					}
					
					
					// Invoice SPA detail
					//alert(displayType);
					if (displayType == "invoiceSPA") {
						 // Build an HTML string 
						 
						 // set the defaults
						 _renderObject.headerHtml = '<table class="sortable tightTable">';
						 _renderObject.HtmlOutput = "";
						 				
						  //make sure other info is hidden
						  	jQuery('#invoiceCriticalError').attr('style','display: none;');
							jQuery('#invoiceNoItems').attr('style','display: none;');
						
						var totalItems = 0;
						_renderObject.headerHtml += '<thead><tr><th>SPA #</th><th>Customer<br />Name</th><th>Model<br />Number</th><th>Requested<br />Price</th><th>Approved<br />Price</th>';
						_renderObject.headerHtml += '<th>Begin<br />Date</th><th>End<br />Date</th><th>Status</th></tr></thead><tbody>'; 
 
						if ( jQuery("#FieldSelectSPA").val() == '0') {
							var downloadURL = '';
							//downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '/proxy/DownloadCsv/DownloadFile?type=download&module=SPA&SPA=invoice"' + 'target="' + '_blank"' + '>Download to Excel</a></p><br>';
                                                        downloadURL = '<p class="homeLink"><a href="#" onclick="updateCatalyst(\'spa_invoice\')">Download to Excel</a></p><br>';
                                                        //downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '#"' + 'onclick="' + 'updateCatalyst("' + 'spa_invoice"' + ')"' + '>Download to Excel</a></p><br>';
							jQuery('#SPADownloadLink').html("");
							jQuery('#SPADownloadLink').append(downloadURL);
							jQuery('#SPADownloadLink').removeAttr("style");//show SPA download div
						}
						jQuery('InvoiceSpaDetail',xml).each(function() { 
								if ( _renderObject.counter%2 ) { 
										_renderObject.headerHtml += '<tr class="">'; 
								} else { 
										_renderObject.headerHtml += '<tr class="alt">'; 

								} 
								spaNumber = jQuery(this).find("spa_number").text(); 
								custName = jQuery(this).find("customer_name").text(); 
								modelNumber = jQuery(this).find("model_number").text(); 
								reprice = jQuery(this).find("reqPrice").text(); 
								appPrice = jQuery(this).find("appPrice").text(); 
								//bdate=jQuery(this).find("bdate").text();
								//edate=jQuery(this).find("edate").text();
								bdate=getFormattedDate(jQuery(this).find("bdate").text(),' '); 
								edate=getFormattedDate(jQuery(this).find("edate").text(),' ');
								
								invoicespastatus=jQuery(this).find("status").text();

								//var linkappend = "&i_currency_code=" + CurrencyCode + "&i_customer=" + custNumber + "&i_cust_name=" + custName; 

								_renderObject.headerHtml += '<td>'+ spaNumber +'</td>'; 
								_renderObject.headerHtml += '<td>'+ custName +'</td>'; 
								_renderObject.headerHtml += '<td>'+ modelNumber +'</td>'; 
								_renderObject.headerHtml += '<td>' + reprice +'</td></td>';
								_renderObject.headerHtml += '<td>' + appPrice +'</td></td>';
								_renderObject.headerHtml += '<td>' + bdate +'</td>'; 
								_renderObject.headerHtml += '<td>' + edate +'</td>'; 
								_renderObject.headerHtml += '<td>' + invoicespastatus +'</td></tr>'; 


								_renderObject.counter ++; 
								totalItems ++;
						}); 
						
						// check if there are results
												
						if (totalItems == 0)  {
							
							//make sure other info is hidden
							jQuery('#invoiceCriticalError').attr('style','display: none;');
							jQuery('#invoiceNoItems').removeAttr("style");
												
						} else { 
							// get the complete HTML; 
							_renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.footerHtml; 
							jQuery('#invoiceSpaTable').append(_renderObject.HtmlOutput); 

							// reset the variables
							_renderObject.headerHtml = '<table class="sortable tightTable">';
							_renderObject.HtmlOutput = "";

							// Bind table sorting for Invoice SPA Details table
							if (jQuery.fn.tablesorter) {
								jQuery('#invoiceSpaTable table.sortable').tablesorter( {
									headers: { 
										0 : {  sorter: "englishNumber" },
										3 : {  sorter: "englishNumber" },
										4 : {  sorter: "englishNumber" }
									  }, cssHeader: 'sortable' })
									.bind('sortEnd', function(e) {
										// Only re-apply alt class if it's already present
										if (jQuery('tr.alt', jQuery(this)).length > 0)
										jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
									});
							}

							// Support text style change on sortable table headers
							jQuery('#invoiceSpaTable th.sortable').hover(
								function() { jQuery(this).addClass('hover'); },
								function() { jQuery(this).removeClass('hover'); }
							);
						}
					} 

					// Target Tracker detail
					if (displayType == 'targetTracker') {
					
						var participants = [];
						var trackerTypes = [];
						var lastUpdateString = '';
						var participant = '';
						var trackerType = '';
						var fiscalYear = '';
						var fiscalQuarter = '';
						var fiscalQuarterYearString = '';
						
						//Vasavi added for fiscalqtr drop-down
						var fiscalqtr = '';	
						var fiscalqtrs = [];
						//End
						
						//Vasavi
						//Build FiscalQuarter drop-down
						jQuery('fiscalqtr', xml).each(function() {//parse XML to get all of the fiscalQtrs
							if ( jQuery(this).contents("name").text() != null &&
								 fiscalqtr != jQuery(this).contents("name").text() ) {
								fiscalqtr = jQuery(this).contents("name").text();
								fiscalqtrs[fiscalqtrs.length] = fiscalqtr;//add the fiscalQtrs into the array to be used later
							}
						});
						//End
						
						
						// Build participants drop-down
						jQuery('participant', xml).each(function() {//parse XML to get all of the participants
							if ( jQuery(this).contents("name").text() != null &&
								 participant.toLowerCase() != jQuery(this).contents("name").text().toLowerCase() ) {
								participant = jQuery(this).contents("name").text();
								participants[participants.length] = participant;//add the participants into the array to be used later
							}
						});
						
						if (participants == null || participants.length <= 0) {//if there are no participants, display a "No Items" message
							jQuery('#TargetTrackerMessages').attr('style','display: none;');
							jQuery('#Empty').removeAttr("style");
							jQuery('#Empty #CriticalError').attr('style','display: none;');
							jQuery('#Empty #NoItems').removeAttr("style");
						}
						else {
								
							//Moved By Vasavi for testing	
							// Render Fiscal Quarter and Year
							fiscalYear = jQuery('root', xml).find("FISCAL_YEAR").text();
							fiscalQuarter = jQuery('root', xml).find("FISCAL_QUARTER").text();
															
							// Vasavi Render fiscalQtr drop-down
							var selectedFiscalQtr = jQuery('#FieldFiscalQtr option:selected').text();//get the selected fiscalQtr
							var FQDDStringOptions = []; 
															
							if (fiscalqtrs && fiscalqtrs.length > 0) {
								var fiscalqtrOptions = '';
								fiscalqtrs.sort();
								
								// Logic to build drop down based on 'fiscalqtr' got from XML
								if (fiscalqtrs[0] == '1' && fiscalqtrs[1] == '4') {
									FQDDStringOptions[0] = fiscalYear + ' - ' + 'Q1' ;
									FQDDStringOptions[1] = (fiscalYear - 1) + ' - ' + 'Q4' ;
								} else {
									FQDDStringOptions[0] = fiscalYear + ' - ' + 'Q' + fiscalQuarter;
									FQDDStringOptions[1] = fiscalYear + ' - ' + 'Q' + (fiscalQuarter - 1);												
								}									
								
								// Build the options for a Quarter select list
								for (var i = 0; i < FQDDStringOptions.length; i++) {
								
									if (selectedFiscalQtr == null || selectedFiscalQtr.length < 1)
										fiscalqtrOptions += '<option value="' + FQDDStringOptions[i] + '">' + FQDDStringOptions[i] + '</option>';
									else if (selectedFiscalQtr == FQDDStringOptions[i])
										fiscalqtrOptions += '<option value="' + FQDDStringOptions[i] + '" selected>' + FQDDStringOptions[i] + '</option>';
									else
										fiscalqtrOptions += '<option value="' + FQDDStringOptions[i] + '">' + FQDDStringOptions[i] + '</option>';
								}
								
								jQuery('#FieldFiscalQtr').empty().append(fiscalqtrOptions); 
								
							}							
							//End
							
							var selectedFiscalQtrStr = jQuery('#FieldFiscalQtr option:selected').text();
							var selectedFiscalYear = selectedFiscalQtrStr.substring(2,4);
							var selectedFQ = 'Q'+ selectedFiscalQtrStr.substring(8,9);
														
							if (fiscalYear != null && fiscalYear.length > 0 &&
								fiscalQuarter != null && fiscalQuarter.length > 0) {
								
								if (fiscalYear.length == 4) fiscalYear = fiscalYear.substring(2, fiscalYear.length);
								if (fiscalQuarter.length == 1) fiscalQuarter = 'Q' + fiscalQuarter;
								//fiscalQuarterYearString = "Program Period: " + fiscalQuarter + " FY '" + fiscalYear;//build the string to display on the Target Tracker left side
								fiscalQuarterYearString = "Program Period: " + selectedFQ + " FY '" + selectedFiscalYear;//build the string to display on the Target Tracker left side
								jQuery('#FiscalQuarterYear').empty().append(fiscalQuarterYearString);
							}
							
							
							var selectedParticipant = jQuery('#FieldParticipant option:selected').text();//get the selected participant								
							// Render participants drop-down
							if (participants && participants.length > 0) {
								var participantOptions = '';
								participants.sort();//sort the participants array
								// Build the options for a order type select list
								for (var i = 0; i < participants.length; i++) {
									if (selectedParticipant == null || selectedParticipant.length < 1)
										participantOptions += '<option value="' + participants[i] + '">' + participants[i] + '</option>';
									else if (selectedParticipant == participants[i])
										participantOptions += '<option value="' + participants[i] + '" selected>' + participants[i] + '</option>';
									else
										participantOptions += '<option value="' + participants[i] + '">' + participants[i] + '</option>';
								}
								
								jQuery('#FieldParticipant').empty().append(participantOptions);
								//jQuery('#FieldParticipant').attr('style','width: 165px;');
							}	
							
							// Render Last Update Date	
							lastUpdateString = jQuery('root', xml).find("ETL_LOAD_DATE").text();
							if (lastUpdateString && lastUpdateString.length > 0) {//format the ETL LOAD Date into a date string
								
								var lastUpdateArray = lastUpdateString.split('-');
								if (lastUpdateArray.length > 2) {
									var m_names = new Array("January", "February", "March", 
														"April", "May", "June", "July", "August", "September", 
														"October", "November", "December");
									var m_date = (lastUpdateArray[2].split(' '))[0];
									var index = lastUpdateArray[1]-1;
									var m_month = '';
									if (index >= 0)
										m_month = m_names[index];
									else
										m_month = m_names[0];
									var m_year = lastUpdateArray[0];
									
									lastUpdateString = m_month + ' ' + m_date + ', ' + m_year;
								}
							}
							
							jQuery('#LastUpdateDate').append(lastUpdateString);
							
													
							selectedParticipant = jQuery('#FieldParticipant option:selected').text();
							
							// Render the Tracker drop-down
							//Vasavi Start
							 selectedFiscalQtrStr = jQuery('#FieldFiscalQtr option:selected').text();
							selectedFiscalQtr = selectedFiscalQtrStr.substring(8,9);
														
						// Render the Tracker drop-down							
						jQuery('fiscalqtr', xml).each(function() {
							var selected_qtr = jQuery(this).contents("name").text();
							if (selected_qtr == selectedFiscalQtr) {  
							//End
							jQuery('participant', jQuery(this)).each(function() {
								var selected_participant = jQuery(this).contents("name").text();
								if (selected_participant == selectedParticipant) {
									jQuery('type', jQuery(this)).each(function() {
										if ( jQuery(this).contents("name").text() != null &&
											 participant.toLowerCase() != jQuery(this).contents("name").text().toLowerCase()) {
											 trackerType = jQuery(this).contents("name").text();
											// Choices could be anything...
											//if ( trackerType.toUpperCase() == "SPIN" || trackerType.toUpperCase() == "SLIP" || trackerType.toUpperCase() == "RADVIR" ) {
												trackerTypes[trackerTypes.length] = trackerType;//build the list of tracker types
											//}
										}
									});
								}
							})
							}
							});
								
		
							var selectedTrackerType = jQuery('#FieldSelectTracker option:selected').text().toUpperCase();
							
							// Render Tracker Types drop-down
							if (trackerTypes && trackerTypes.length > 0) {
								var trackerTypeOptions = '';
								// Build the options for a order type select list
								for (var i = 0; i < trackerTypes.length; i++) {
									if (selectedTrackerType == null || selectedTrackerType.length < 1) {
										if (trackerTypes[i].toUpperCase() == 'SPIN')//default the drop-down to SPIN if there is nothing else selected previously
											trackerTypeOptions += '<option value="' + trackerTypes[i] + '" selected>' + trackerTypes[i] + '</option>';
										else
											trackerTypeOptions += '<option value="' + trackerTypes[i] + '">' + trackerTypes[i] + '</option>';
									} else if (selectedTrackerType == trackerTypes[i].toUpperCase()) {
										trackerTypeOptions += '<option value="' + trackerTypes[i] + '" selected>' + trackerTypes[i] + '</option>';
									} else {
										trackerTypeOptions += '<option value="' + trackerTypes[i] + '">' + trackerTypes[i] + '</option>';
									}
								}
								
								jQuery('#FieldSelectTracker').empty().append(trackerTypeOptions);
							}
							
							// Render Target Tracker open dashboard
							selectedTrackerType = jQuery('#FieldSelectTracker option:selected').text().toUpperCase();
			
			                  //Vsavi
							  selectedFiscalQtrStr = jQuery('#FieldFiscalQtr option:selected').text();
							  selectedFiscalQtr = selectedFiscalQtrStr.substring(8,9);
							  selectedFiscalYear = selectedFiscalQtrStr.substring(2,4);
													  
							 
							if (selectedParticipant != null && selectedParticipant.length > 0 &&
								selectedTrackerType != null && selectedTrackerType.length > 0) {
								
                                                                //call DownloadCsv servlet 
																//Vasavi Added two extra parameters to support modified xml structure for previous, current FQs.
                                                                jQuery.post("/proxy/DownloadCsv/DownloadFile", {type: "write", module: "TargetTracker", participant: selectedParticipant, view: selectedTrackerType, fiscalQtr: selectedFiscalQtr, fiscalYear: selectedFiscalYear});
																//jQuery.post("/proxy/DownloadCsv/DownloadFile", {type: "write", module: "TargetTracker", participant: selectedParticipant, view: selectedTrackerType});
								
								// Predetermine if the Sales-Out will have a max payout column or not by searching for valid GOAL_VALUE  
								var includeMaxPayoutColumn = false;
								
						//Vasavi Start
						jQuery('fiscalqtr', xml).each(function() {
							var selected_qtr = jQuery(this).contents("name").text();
							if (selected_qtr == selectedFiscalQtr) { 						
								jQuery('participant', jQuery(this)).each(function() {   //End
									var selected_participant = jQuery(this).contents("name").text();
									if (selected_participant == selectedParticipant) {
										jQuery('type', jQuery(this)).each(function() {
											var trackerType = jQuery(this).contents("name").text();
											if (trackerType.toUpperCase() == selectedTrackerType) {
												jQuery('goal', jQuery(this)).each(function() {
													var type = jQuery(this).contents("name").text();
													// for rev. 2, use SO, SI
													// if (type == 'POS') {
													if (type == 'SO') {
														jQuery('row', jQuery(this)).each(function() {
															var maxPayout = jQuery(this).find("GOAL_VALUE").text().replace('null','').replace('NULL', '');//get weight
															if (maxPayout.length > 0 && !isNaN(maxPayout)) {
																//includeMaxPayoutColumn = true;
															}
														});													
													}
												});
											}
										});
									}
								})
								}
								});		
								
								// override ... always show whether data is available or not 
								//includeMaxPayoutColumn = true;
								includeMaxPayoutColumn = false;
								
								var divTag = '#' + selectedTrackerType;
								var table1Tag = '#' + selectedTrackerType + '_Main';
								var table2Tag = '#' + selectedTrackerType + '_SalesIn';
								var headerHTML = '<table class="sortable">';
								var mainTitlesHTML = '';
								var salesInTitlesHTML = '';
/*								
								if (selectedTrackerType == 'SPIN') {
									mainTitlesHTML = '<thead>';
									if(includeMaxPayoutColumn) {
										mainTitlesHTML += '<tr><th width="28%"><b>SPIn Sales-Out</b></th>';
										mainTitlesHTML += '<th width="18%">SO<br />QTD Units</th>';
										mainTitlesHTML += '<th width="18%">SO<br />Goal</th>';
										mainTitlesHTML += '<th width="18%">%&nbsp;Attained</th>'; 
										mainTitlesHTML += '<th width="18%">Max Payout&nbsp;%</th>';
									}
									else {
										mainTitlesHTML += '<tr><th width="34%"><b>SPIn Sales-Out</b></th>';
										mainTitlesHTML += '<th width="22%">SO<br />QTD Units</th>';
										mainTitlesHTML += '<th width="22%">SO<br />Goal</th>';
										mainTitlesHTML += '<th width="22%">%&nbsp;Attained</th>'; 
									}
									mainTitlesHTML += '</tr></thead><tbody>';

									salesInTitlesHTML = '<thead>';
									salesInTitlesHTML += '<tr><th width="34%"><b>SPIn Sales-In</b></th>';
									salesInTitlesHTML += '<th width="22%">SI<br />QTD Units</th>';
									salesInTitlesHTML += '<th width="22%">SI<br />Goal</th>';
									salesInTitlesHTML += '<th width="22%">%&nbsp;Attained</th>'; 
									salesInTitlesHTML += '</tr></thead><tbody>';
								}
								else */
								//if (selectedTrackerType == 'SLIP') {
									mainTitlesHTML = '<thead>';
									//if(includeMaxPayoutColumn) {
									//	mainTitlesHTML += '<tr><th width="28%"><b>SLIP Sales-Out</b></th>';
									//	mainTitlesHTML += '<th width="18%">SO<br />QTD Units</th>';
									//	mainTitlesHTML += '<th width="18%">SO<br />Goal</th>';
									//	mainTitlesHTML += '<th width="18%">%&nbsp;Attained</th>'; 
									//	mainTitlesHTML += '<th width="18%">Max Payout&nbsp;%</th>';
									//}
									//else {
										//mainTitlesHTML += '<tr><th width="34%"><b>SLIP Sales-Out</b></th>';
										mainTitlesHTML += '<tr><th width="34%"><b>' + selectedTrackerType + ' Sales-Out</b></th>';
										mainTitlesHTML += '<th width="22%">SO<br />QTD Units</th>';
										mainTitlesHTML += '<th width="22%">SO<br />Goal</th>';
										mainTitlesHTML += '<th width="22%">%&nbsp;Attained</th>'; 
									//}
									mainTitlesHTML += '</tr></thead><tbody>';
/*
									salesInTitlesHTML = '<thead>';
									//salesInTitlesHTML += '<tr><th width="34%"><b>SLIP Sales-In</b></th>';
									salesInTitlesHTML += '<tr><th width="34%"><b>' + selectedTrackerType + '</b></th>';
									salesInTitlesHTML += '<th width="22%">SO<br />QTD Units</th>';
									salesInTitlesHTML += '<th width="22%">SO<br />Goal</th>';
									salesInTitlesHTML += '<th width="22%">%&nbsp;Attained</th>'; 
									salesInTitlesHTML += '</tr></thead><tbody>';
*/									
								//}
/*								
								else if (selectedTrackerType == 'RADVIR') {
									mainTitlesHTML = '<thead>';
									if(includeMaxPayoutColumn) {
										mainTitlesHTML += '<tr><th width="28%"><b>RADVIR Sales-Out</b></th>';
										mainTitlesHTML += '<th width="18%">SO<br />QTD Units</th>';
										mainTitlesHTML += '<th width="18%">SO<br />Goal</th>';
										mainTitlesHTML += '<th width="18%">%&nbsp;Attained</th>'; 
										mainTitlesHTML += '<th width="18%">Max Payout&nbsp;%</th>';
									}
									else {
										mainTitlesHTML += '<tr><th width="34%"><b>RADVIR Sales-Out</b></th>';
										mainTitlesHTML += '<th width="22%">SO<br />QTD Units</th>';
										mainTitlesHTML += '<th width="22%">SO<br />Goal</th>';
										mainTitlesHTML += '<th width="22%">%&nbsp;Attained</th>'; 
									}
									mainTitlesHTML += '</tr></thead><tbody>';

									salesInTitlesHTML = '<thead>';
									salesInTitlesHTML += '<tr><th width="34%"><b>RADVIR Sales-In</b></th>';
									salesInTitlesHTML += '<th width="22%">SI<br />QTD Units</th>';
									salesInTitlesHTML += '<th width="22%">SI<br />Goal</th>';
									salesInTitlesHTML += '<th width="22%">%&nbsp;Attained</th>'; 
									salesInTitlesHTML += '</tr></thead><tbody>';
								}
*/
								var footerHTML = '</tbody></table>';
								var mainBodyHTML = '';
								var slipMainTotalHTML = '';
								var salesInBodyHTML = '';
								var region = '';
								var coverageArea = '';
								var pos_main_rows = 0;
								var ship_main_rows = 0;
								var slip_main_counter = 0;
								var slip_salesin_counter = 0;
																
								// Parse the XML to populate the main Target Tracker table
						//Vasavi Start
						jQuery('fiscalqtr', xml).each(function() {
							var selected_qtr = jQuery(this).contents("name").text();
							if (selected_qtr == selectedFiscalQtr) {  
						//End
								jQuery('participant',jQuery(this)).each(function() {
									var selected_participant = jQuery(this).contents("name").text();
									if (selected_participant == selectedParticipant) {
										jQuery('type', jQuery(this)).each(function() {
											var trackerType = jQuery(this).contents("name").text();
											if (trackerType.toUpperCase() == selectedTrackerType) {
												jQuery('goal', jQuery(this)).each(function() {
													var type = jQuery(this).contents("name").text();
													jQuery('row', jQuery(this)).each(function() {
														// Get the coverage area and region
														coverageArea = jQuery(this).find("COVERAGE_AREA").text();
														region = jQuery(this).find("TARGET_TRACKER_REGION").text();  // !!! Not working !!!
														
														// Build each row
														var goalDesc = jQuery(this).find("GOAL_DESC").text().replace('null','N/A').replace('NULL', 'N/A');
														var units = jQuery(this).find("ACTUAL_VALUE").text().replace('null','-').replace('NULL', '-');
														var goalValue = jQuery(this).find("GOAL_VALUE").text().replace('null','-').replace('NULL', '-').replace('NaN', '-');
														var percentAttained = 0;
														if (units.length > 0 && !isNaN(units) && units != '-' &&
															goalValue.length > 0 && !isNaN(goalValue) && goalValue != '-' && goalValue != 0)
															percentAttained = Math.round(((units*100)/goalValue)*Math.pow(10,2))/Math.pow(10,2);//calculate percentage
														else
															percentAttained = '0.00';
														if (units.length > 0 && !isNaN(units) && units != '-')
															units = addCommas(units);
														if (goalValue.length > 0 && !isNaN(goalValue) && goalValue != '-')
															goalValue = addCommas(goalValue);
														// For rev 2
														// if (type == 'POS') {
														if (type == 'SO') {
															pos_main_rows++;

															if ( pos_main_rows%2 ) { mainBodyHTML += '<tr class="">'; }
															else { mainBodyHTML += '<tr class="alt">'; }

															if (selectedTrackerType == 'SLIP' || selectedTrackerType == 'RADVIR') {	
																slip_main_counter++;
															}
															mainBodyHTML += '<td>' + goalDesc + '</td>';
															mainBodyHTML += '<td>' + units + '</td>';
															mainBodyHTML += '<td>' + goalValue + '</td>';
															
															if (percentAttained < 100)
																mainBodyHTML += '<td class="warning">';
															else
																mainBodyHTML += '<td class="good">';

															mainBodyHTML += percentAttained + '%</td>';
															
															// Build the extra forth column for Max Payout (if there is data for one)
															// if(includeMaxPayoutColumn) {
															if(false) {
																var maxPayout = jQuery(this).find("GOAL_VALUE").text().replace('null','').replace('NULL', '');//get weight
																if (maxPayout.length > 0 && !isNaN(maxPayout)) {
																	maxPayout = Math.round(maxPayout*100*Math.pow(10,0))/Math.pow(10,0);	//convert weight from fraction into percentage
																	maxPayout = maxPayout + '%';
																}
																else {
																	maxPayout = '&nbsp;';
																}
																// not using this now
																//mainBodyHTML += '<td>' + maxPayout + '</td>';
															}
														} 
														// else if (type == 'SHIPMENT') {
														// for rev 2
														else if (type == 'SI') {
															ship_main_rows++;
															if ( ship_main_rows%2 ) { salesInBodyHTML += '<tr class="">'; }
															else { salesInBodyHTML += '<tr class="alt">'; }
															
															salesInBodyHTML += '<td>' + goalDesc + '</td>';
															salesInBodyHTML += '<td>' + units + '</td>';
															salesInBodyHTML += '<td>' + goalValue + '</td>';
																	
															if (percentAttained < 100)
																salesInBodyHTML += '<td class="warning">';
															else
																salesInBodyHTML += '<td class="good">';
															salesInBodyHTML += percentAttained + '%</td>';
														}
														
														mainBodyHTML += '</tr>';
														//salesInBodyHTML += '</tr>';
														salesInBodyHTML = ''; 
			
														// Commenting this logic since no need to query extra summary row
														// For SLIP build the total row
														/*
														if (selectedTrackerType == 'SLIP') {
															var totalDesc = jQuery(this).find("MEASURE_NAME_1").text().replace('null','N/A').replace('NULL', 'N/A');
															if (type == 'POS') {
																slipMainTotalHTML = '<tr><td><b>' + totalDesc + '</b></td>';
																slipMainTotalHTML += '<td><b>-</b></td><td><b>-</b></td><td><b>0.00%</b></td></tr>';
															} else if (type == 'SHIPMENT') {
																slipSalesInTotalHTML = '<tr><td><b>' + totalDesc + '</b></td>';
																slipSalesInTotalHTML += '<td><b>-</b></td><td><b>-</b></td><td><b>0.00%</b></td></tr>';
															}
														}
														*/
														_renderObject.counter++;
													});	
													
													//if (ship_main_rows == 0)
													//	salesInBodyHTML += '<tr><td width="25%"></td><td width="25%"></td><td width="25%"></td><td width="25%"></td></tr>';
												});
											}
										});		
									}
								})
								}
								});	
								
								// Check if there are any items returned, if not display no items message
								if (_renderObject.counter < 2) {
									jQuery('#TargetTrackerMessages').attr('style','display: none;');
									jQuery('#Empty').removeAttr("style");
									jQuery('#Empty #CriticalError').attr('style','display: none;');
									jQuery('#Empty #NoItems').removeAttr("style");
								}
								else {
									// Render the main table
									if (selectedTrackerType == 'SLIP') {
										headerHTML = '<table class="nonsortable">';							
										_renderObject.MainTableHtmlOutput = headerHTML + mainTitlesHTML + mainBodyHTML + slipMainTotalHTML + footerHTML;
										//_renderObject.SalesInTableHtmlOutput = headerHTML + salesInTitlesHTML + salesInBodyHTML + footerHTML;
									}
									else {
										_renderObject.MainTableHtmlOutput = headerHTML + mainTitlesHTML + mainBodyHTML + footerHTML;
										//_renderObject.SalesInTableHtmlOutput = headerHTML + salesInTitlesHTML + salesInBodyHTML + footerHTML;
									}
									
									// Paul Biagi - do this differently???
									// RADVIR tag does not exist, so just use SLIP
									// Not sure why we use different style tags???
									// Q1: Force everything to use the SLIP tag...
									//if (selectedTrackerType == 'RADVIR') {
										divTag = '#' + 'SLIP';
										table1Tag = '#' + 'SLIP' + '_Main';
										table2Tag = '#' + 'SLIP' + '_SalesIn';
									//}									
									
									// *********************************************
									// Render the constructed Target Tracker HTML
									// *********************************************
		
									jQuery('#TTRegion').append(region);
									jQuery('#TTCoverageArea').append(coverageArea);
									jQuery(table1Tag).append(_renderObject.MainTableHtmlOutput);
									//jQuery(table2Tag).append(_renderObject.SalesInTableHtmlOutput);
									jQuery(divTag).removeAttr('style');
									
									// Bind table sorting
									if (jQuery.fn.tablesorter) {
										jQuery('#TargetTrackerPortletContent table.sortable').tablesorter({
											headers: { 
												1 : {  sorter: "englishNumber" },//add english number sorting for the first column inside Target Tracker
												2 : {  sorter: "englishNumber" },//add english number sorting for the second column inside Target Tracker
												3 : {  sorter: "englishNumber" },//add english number sorting for the third column inside Target Tracker
												4 : {  sorter: "englishNumber" }//add english number sorting for the fourth column inside Target Tracker
											},
											cssHeader: 'sortable' 
										})
										.bind('sortEnd', function(e) {
											// Only re-apply alt class if it's already present
											if (jQuery('tr.alt', jQuery(this)).length > 0)
											jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
										});
									}
									
									// Support text style change on sortable table headers
									jQuery('#TargetTrackerPortletContent th.sortable').hover(
										function() { jQuery(this).addClass('hover'); },
										function() { jQuery(this).removeClass('hover'); }
									);
								}
							}
						}
							
						jQuery('#TargetTrackerMessages').attr('style','display: none;');
						jQuery('#TargetTrackerPortletHeader').removeAttr("style");
						jQuery('#TargetTrackerPortletContent').removeAttr('style');
					}
					
					// Distribution Metrics detail
					if (displayType == 'distributionMetrics') {
						var quarter = '';
						var week = '';
						var selection = '';
						var exists = false;
						var titles = [];
						var titlesHtml = [];
						var qtyHtml = [];
						var dolHtml = [];
						var totalHtml = [];
						var backlogHtml = [];
						var quarterHtml = [];
						var weekHtml = [];
						var wohHtml = [];
						var row_counter = 0;
					
						
						// Get the quarter and week
						quarter = jQuery('root', xml).attr("quarter");
						if (quarter == null || quarter == 'null') quarter = 'Q1';
						week = jQuery('root', xml).attr("week");
						if (week == null || week == 'null') week = '200904';
						
						// Get the current drop-down selection
						selection = jQuery('#RTDMSelectView option:selected').text();
						if (selection == null || selection.length < 1) selection = 'Segment';
						
						// Build an HTML string
						_renderObject.headerHtml += '<thead><th>' + selection + '<br />In</th><th>QTD Sales In</th><th>QTD Sales<br />In $</th>';
						_renderObject.headerHtml += '<th>QTD POS</th><th>Backlog </th><th>' + quarter + '<br />Schedule</th>'; 
						_renderObject.headerHtml +=	'<th>WOH</th><th>' + week + '<br />POS</th></thead><tbody>';
						
						// Build the open dashboard
						jQuery('wohData',xml).each(function() {
							jQuery('row', jQuery(this)).each(function() {
								var title = jQuery(this).attr("name");	
								if (title != null && title.length > 0 && title.toUpperCase() != 'UNREFERENCED') {
									if ( _renderObject.counter%2 ) { titlesHtml[titlesHtml.length] = '<tr class=""><td>' + title + '</td>'; }
									else { titlesHtml[titlesHtml.length] = '<tr class="alt"><td>' + title + '</td>'; }
									
									titles[titles.length] = title;
									
									var woh = jQuery(this).find("woh").text();
									if (woh.length > 0 && !isNaN(woh)) woh = Math.round(woh*Math.pow(10,2))/Math.pow(10,2);//round the number to the last two decimal points
									else woh = '-';
									wohHtml[wohHtml.length] = '<td>' + woh + '</td>';
									
									_renderObject.counter++;
								}
							});
						});
						
						if (_renderObject.counter < 2) {
							jQuery('#RTDMPortletHeader').removeAttr("style");
							jQuery('#RTDMMessages').attr('style','display: none;');
							jQuery('#DistMetrics table.sortable').empty();
							jQuery('#DistMetrics #CriticalError').attr('style','display: none;');
							jQuery('#DistMetrics').removeAttr("style");
							jQuery('#DistMetrics #NoItems').removeAttr("style");
						}
						else {
								jQuery('revData',xml).each(function() {
									jQuery('row',jQuery(this)).each(function() {
										var title = jQuery(this).attr("name");				
										var index = -1;
										if (title != null && title.length > 0 && title.toUpperCase() != 'UNREFERENCED') {
											for (var i = 0; i < titles.length; i++) {
												if (title == titles[i]) { index = i; break; }
											}
											
											if (index >= 0) {
												var qty = jQuery(this).find("qty").text();
												if (qty.length > 0 && !isNaN(qty)) qty = addCommas(qty);
												else qty = '-';
												qtyHtml[index] = '<td>' + qty + '</td>';
												
												var dol = jQuery(this).find("dol").text();
												if (dol.length > 0 && !isNaN(dol)) {
													dol = Math.round(dol*Math.pow(10,0))/Math.pow(10,0);//round the number to remove any decimal points
													dol = addCommas(dol);
												}
												else dol = '-';
												dolHtml[index] = '<td>' + dol + '</td>';
											}
										}
									});
								});
							
								jQuery('posData',xml).each(function() {
									jQuery('row',jQuery(this)).each(function() {
										var title = jQuery(this).attr("name");	
										var index = -1;
										if (title != null && title.length > 0 && title.toUpperCase() != 'UNREFERENCED') {
											for (var i = 0; i < titles.length; i++) {
												if (title == titles[i]) { index = i; break; }
											}
											
											if (index >= 0) {
												var total = jQuery(this).find("total").text();
												if (total.length > 0 && !isNaN(total)) total = addCommas(total);
												else total = '-';
												totalHtml[index] = '<td>' + total + '</td>';
												
												var week_sales = jQuery(this).find("current").text();
												if (week_sales.length > 0 && !isNaN(week_sales)) week_sales = addCommas(week_sales);
												else week_sales = '-';
												weekHtml[index] = '<td>' + week_sales + '</td>';	
											}
										}
									});
								});
							
								jQuery('backData',xml).each(function() {
									jQuery('row',jQuery(this)).each(function() {
										var title = jQuery(this).attr("name");
										var index = -1;
										if (title != null && title.length > 0 && title.toUpperCase() != 'UNREFERENCED') {
											for (var i = 0; i < titles.length; i++) {
												if (title == titles[i]) { index = i; break; }
											}
											
											if (index >= 0) {
												var backlog = jQuery(this).find("t_backlog").text();
												if (backlog.length > 0 && !isNaN(backlog)) {
													backlog = Math.round(backlog*Math.pow(10,0))/Math.pow(10,0);//round the number to remove any decimal points	
													backlog = addCommas(backlog);
												}
												else backlog = '-';
												backlogHtml[index] = '<td>' + backlog + '</td>';
												
												var quarter_sales = jQuery(this).find("c_backlog").text();
												if (quarter_sales.length > 0 && !isNaN(quarter_sales)) {
													quarter_sales = Math.round(quarter_sales*Math.pow(10,0))/Math.pow(10,0);//round the number to remove any decimal points	
													quarter_sales = addCommas(quarter_sales);
												}
												else quarter_sales = '-';
												quarterHtml[index] = '<td>' + quarter_sales + '</td>';
											}
										}
									});
								});
								
								// Build the final HTML
								for (var i = 0; i < titlesHtml.length; i++) {
									if (titlesHtml[i]) _renderObject.bodyHtml += titlesHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (qtyHtml[i]) _renderObject.bodyHtml += qtyHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (dolHtml[i]) _renderObject.bodyHtml += dolHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (totalHtml[i]) _renderObject.bodyHtml += totalHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (backlogHtml[i]) _renderObject.bodyHtml += backlogHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (quarterHtml[i]) _renderObject.bodyHtml += quarterHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (wohHtml[i]) _renderObject.bodyHtml += wohHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									if (weekHtml[i]) _renderObject.bodyHtml += weekHtml[i];
									else _renderObject.bodyHtml += '<td>-</td>';
									_renderObject.bodyHtml += '</tr>';
								}
							
								// Dynamically insert HTML into Distribution Metrics div element
								_renderObject.HtmlOutput = _renderObject.headerHtml + _renderObject.bodyHtml + _renderObject.footerHtml;
								jQuery('#DistMetrics #CriticalError').attr('style','display: none;');
								jQuery('#DistMetrics table.sortable').empty();
								jQuery('#DistMetrics #NoItems').attr('style','display: none;');
								jQuery('#RTDMMessages').attr('style','display: none;');
								jQuery('#DistMetrics').append(_renderObject.HtmlOutput);
								jQuery('#RTDMPortletHeader').removeAttr("style");
								jQuery('#DistMetrics').removeAttr("style");
								
								if (jQuery.fn.tablesorter) {
									jQuery('#DistMetrics table.sortable').tablesorter({
										headers: { 
											1 : {  sorter: "englishNumber" },//add english number sorting for second column inside RTDM
											2 : {  sorter: "englishNumber" },//add english number sorting for third column inside RTDM
											3 : {  sorter: "englishNumber" },//add english number sorting for forth column inside RTDM
											4 : {  sorter: "englishNumber" },//add english number sorting for fifth column inside RTDM
											5 : {  sorter: "englishNumber" },//add english number sorting for sixth column inside RTDM
											6 : {  sorter: "englishNumber" },//add english number sorting for seventh column inside RTDM
											7 : {  sorter: "englishNumber" }//add english number sorting for eighth column inside RTDM
										},
										cssHeader: 'sortable' 
									})
									.bind('sortEnd', function(e) {
										// Only re-apply alt class if it's already present
										if (jQuery('tr.alt', jQuery(this)).length > 0)
											jQuery('tr', jQuery	(this)).removeClass('alt').filter(':odd').addClass('alt');
									});
								}
								
								// Support text style change on sortable table headers
								jQuery('#DistMetrics th.sortable').hover(
									function() { jQuery(this).addClass('hover'); },
									function() { jQuery(this).removeClass('hover'); }
								);	
							}	
						}
					}
				});
			});
	}
}


/* SOLO JS - Start */

// Create Waiting image while the orders are loaded into the dashboard
function PendingOrdersRendering() {
	var pendingHtml = "<div id='PendingDisplay'>";
    pendingHtml += "<img src='in_progress.gif' height='18' width='20' alt='starting...'/>";
    pendingHtml += "</div>";
	
	jQuery('#OrderStatusPortletHeader').attr('style','display: none;');
	jQuery('#OrderStatus #PendingDisplay').empty();
	jQuery('#OrderStatus').append(pendingHtml);
}

// Construct Order Status table row
function BuildOrderStatusTableRow( counter, url, soloDetailsURL, salesOrder, cartKey, purchaseOrder, purchaseOrderDate, billTo, shipTo, status ) {
	var output = '';
	
	if ( counter%2 ) { output += '<tr class="">'; }
	else { output += '<tr class="alt">'; }
	output += '<td><a href="' + soloDetailsURL + 
					'&ShoppingCartKey=' + cartKey + '" target="_blank" title="Click to view this order in SOLO">' + salesOrder +'</a></td>';
	output += '<td>' + purchaseOrder + '</td>'; 
	output += '<td class="date">' + purchaseOrderDate + '</td>'; 
	output += '<td>' + billTo + '</td>'; 
	output += '<td>' + shipTo + '</td>'; 
	output += '<td class="status">' + status + '</td>'; 
	//output += '<td class="status"><a href="' + url + 'height=484&amp;width=860&id=' + cartKey+ '" class="modal" title="Click to display order details">' + status + '</a></td>'; 
	//output += '<td><a href="' + url + 'height=484&amp;width=860&id=' + cartKey + '" class="modal" title="Click to display order details">Order Details</a></td>'; 
	output += '</tr>';	
	
	return output;
}


// Provide Sort and Filter for Order Status
function AddOrderStatusSortAndOverlay() {
	if (jQuery.fn.tablesorter)
		jQuery('#OrderStatus table.sortable').tablesorter( { cssHeader: 'sortable' })
				.bind('sortEnd', function(e) {
						// Only re-apply alt class if it's already present
						if (jQuery('tr.alt', jQuery(this)).length > 0)
						jQuery('tr', jQuery	(this)).removeClass('alt').filter(':even').addClass('alt');
				});
	
	// Support text style change on sortable table headers
	jQuery('#OrderStatus th.sortable').hover(
		function() { jQuery(this).addClass('hover'); },
		function() { jQuery(this).removeClass('hover'); }
	);
	
	// Add event handling for clicking on the link that opens an overlay with the order details
	jQuery('#OrderStatus a.modal').click(
		function() {
			var hrefV = jQuery(this).attr("href");
			alert(hrefV);
			if (hrefV && hrefV.length > 0) {
				var qsParams = hrefV.split('&');
				for (var i=0; i<qsParams.length; i++) {
					var pos = qsParams[i].indexOf('=');
					if (pos > 0) {
						var key = qsParams[i].substring(0,pos);
						if (key == 'id') {
							var value = qsParams[i].substring(pos+1);
							jQuery("#PassedCartKey").empty().append(value);
							break;
						}
					}
				}
			}
		}
	);
	
	if (jQuery.fn.facebox)
		jQuery('#OrderStatus a.modal').facebox({
			
			opacity: 0.1,
			loadingImage: '/images/common/loading.gif',
			modalId: 'PortalModal',
			contentSelector: '.channel .content',
			faceboxHtml: '\
			<div id="PortalModal" style="display:none;"> \
				<div class="popup"> \
					<div class="header"> \
						<div class="content"> \
							<a href="#" class="close"><span>Close</span></a> \
						</div> \
					</div> \
					<div class="channel"> \
						<div class="content"> \
						</div> \
					</div> \
					<div class="footer"> \
						<div class="content"> \
						</div> \
					</div> \
				</div> \
			</div>'
		})
	
}

// Declare Claims object
var Claims = {
	headerHtml: '',
	bodyHtml: '',
	footerHtml: '',
	HtmlOutput: '',
  	init: function() { 
  	        this.headerHtml = '';
  	        this.footerHtml = '';
  	        this.bodyHtml = '';
            var clURL = claimsProxyURL; 
            processClaimsClick = true;
			BuildHTMLFromXMLParsing(this,clURL, "Claims");
	    }
}; 
// Declare Order Status object
var OrderStatus = {
	headerHtml: '<table class="sortable">',
	bodyHtml: '',
	footerHtml: '</tbody></table>',
	HtmlOutput: '',
	orderDetailsUrl: '/portal/site/direct/orderDetails?',
	soloQueryString: '/Comergent/direct/matrix?cmd=PlacedOrderDisplay&SessOnly=1&',
	counter: 1,
	salesOrder: null,
	cartKey: null,
	purchaseOrder: null,
	purchaseOrderDate: null,
	billToNo: null,
	shipToNo: null,
	status: null,
	modelNo: 'Order Details',
  	init: function() {		
			PendingOrdersRendering();
			BuildHTMLFromXMLParsing(
				this,	
				"/proxy/SoloWebServiceProxy/RetrieveOrderStatus",
				"orderStatus"
			 );
	    }
}; 

// Declare Order Details object
var OrderDetails = {
	orderCartKey: null,
	headerHtml: '<table class="sortable">',
	bodyHtml: '',
	footerHtml: '</tbody></table>',
	orderHeaderHtmlOutput: '',
	orderDetailsHtmlOutput: '',
	soloQueryString: '/Comergent/direct/matrix?cmd=PlacedOrderDisplay&SessOnly=1&',
	soloDetailsURL: '',
	salesOrder: null,
	cartKey: null,
	purchaseOrder: null,
	purchaseOrderDate: null,
	billToNo: null,
	shipToNo: null,
	status: null,
	modelNo: null,
	requestQty: null,
	shippedQty: null,
	lineStatus: null,
	requestDate: null,
	shipDate: null,
	counter: 1,
  	init: 
		function(param) {
				this.orderCartKey = param;
				if (this.orderCartKey) {
					BuildHTMLFromXMLParsing(
						this,	
						"/proxy/SoloWebServiceProxy/RetrieveOrderLinesDetail/" + this.orderCartKey,
						"orderDetails"
					);
				}
		}
};

// Declare Programs object
var Programs = {
	headerHtml: '',
	bodyHtml: '',
	footerHtml: '',
	HtmlOutput: '',
	programsBaseURL: '',
	plClearButtonClick: '',
  	init: function() { 
	        PendingPLRendering();
  	        this.headerHtml = '';
  	        this.footerHtml = '';
  	        this.bodyHtml = '';
  	        this.programsBaseURL = programsAttachmentsURL;
            var pmURL = programsProxyURL; 
            processProgramsClick = true; 
			BuildHTMLFromXMLParsing(this,pmURL, "Programs");
	    }
}; 

// Declare GeneralCommunications object
var GeneralCommunications = {
	headerHtml: '',
	bodyHtml: '',
	footerHtml: '',
	HtmlOutput: '',
	generalBaseURL: '',
	glClearButtonClick: '',
  	init: function() { 
	        PendingGLCRendering();
  	        this.headerHtml = '';
  	        this.footerHtml = '';
  	        this.bodyHtml = '';
  	        this.generalBaseURL = generalAttachmentsURL;
            var gcURL = generalCommunicationsProxyURL; 
            processGCClick = true;
			BuildHTMLFromXMLParsing(this,gcURL, "GeneralCommunications");
	    }
}; 

// Declare Products object
var Products = {
	headerHtml: '',
	bodyHtml: '',
	footerHtml: '',
	HtmlOutput: '',
	productsBaseURL: '',
	prcClearButtonClick: '',
  	init: function() { 
	        PendingPRCRendering();
  	        this.headerHtml = '';
  	        this.footerHtml = '';
  	        this.bodyHtml = '';
  	        this.productsBaseURL = productsAttachmentsURL;
            var prURL = productsProxyURL; 
            processProductsClick = true; 
			BuildHTMLFromXMLParsing(this,prURL, "Products");
	    }
}; 

// Declare Policies object
var Policies = {
	headerHtml: '',
	bodyHtml: '',
	footerHtml: '',
	HtmlOutput: '',
	policiesBaseURL: '',
	pocClearButtonClick: '',
  	init: function() { 
	        PendingPLCRendering();
  	        this.headerHtml = '';
  	        this.footerHtml = '';
  	        this.bodyHtml = '';
  	        this.policiesBaseURL = policiesAttachmentsURL;
            var plURL = policiesProxyURL; 
            processPoliciesClick = true;
			BuildHTMLFromXMLParsing(this,plURL, "Policies");
	    }
}; 




/* Order Status Portlet */
jQuery(function() {  OrderStatus.init();});

/* SOLO JS - Stop */

/* Target Tracker JS - Start */

// Create Waiting image while the Target Tracker is loaded into the dashboard
function PendingTTRendering() {
	var pendingHtml = "<div id='PendingDisplay'>";
    pendingHtml += "<img src='in_progress.gif' height='18' width='20' alt='starting...'/>";
    pendingHtml += "</div>";
	
	jQuery('#TargetTrackerPortletHeader').attr('style','display: none;');
	jQuery('#TargetTrackerMessages').empty().append(pendingHtml);
	jQuery('#TargetTrackerPortletContent').attr('style','display: none;');
}

// Declare Target Tracker object
var TargetTracker = {
	MainTableHtmlOutput: '',
	SalesInTableHtmlOutput: '',
	counter: 1,
  	init: function() {
		    //PendingTTRendering();
			BuildHTMLFromXMLParsing(
				this,	
				"/proxy/TargetTrackerWebServiceProxy/RetrieveTargetTrackerData",
				"targetTracker"
			);
		}
};


// Process Target Tracker Type Drop-Down Selection
jQuery(document).ready(function(){
	jQuery('#FieldParticipant').change(function () {
		clearTargetTrackerView();
		jQuery(function() { TargetTracker.init(); });
	});
	jQuery('#FieldSelectTracker').change(function () {
		clearTargetTrackerView();
		jQuery(function() { TargetTracker.init(); });
	});
	//Vasavi
	jQuery('#FieldFiscalQtr').change(function () {
		clearTargetTrackerView();
		jQuery(function() { TargetTracker.init(); });
	});
});

/* Target Tracker Portlet */
jQuery(function() { TargetTracker.init(); });

/* Target Tracker JS - Stop */

/* RTDM JS - Start */ 

// Declare Distribution Metrics
var DistributionMetrics = {
	headerHtml: '<table class="sortable">',
	bodyHtml: '',
	footerHtml: '</tbody></table>',
	HtmlOutput: '',
	counter: 1,
  	init: function( param ) {	
			var fileLoc = param;
			// Default to Segments view
			if (fileLoc == null || fileLoc.length < 1) {
				fileLoc = '/proxy/RtdmWebServiceProxy/RetrieveRtdmSegments';
			}
			BuildHTMLFromXMLParsing(
				this,	
				fileLoc,
				"distributionMetrics"
			);
		}
};

// Process Distribution Metrics Type Drop-Down Selection
jQuery(document).ready(function(){
	jQuery('#RTDMSelectView').change(function () {
		DistributionMetrics.headerHtml = '<table class="sortable">';
		DistributionMetrics.bodyHtml = '';
		DistributionMetrics.footerHtml = '</tbody></table>';
		DistributionMetrics.HtmlOutput = '';
		DistributionMetrics.counter = 1;
		var fileLoc = jQuery('#RTDMSelectView option:selected').val();
		jQuery(function() { DistributionMetrics.init( fileLoc ); });
	});
});

/* Distribution Metrics Portlet */
jQuery(function() {  DistributionMetrics.init('/proxy/RtdmWebServiceProxy/RetrieveRtdmSegments'); });

/* RTDM JS - Stop */ 

// Register Billing Status
var BillingStatus = { 
	headerHtml: '<table class="sortable">', 
	bodyHtml: '', 
	footerHtml: '</tbody></table>', 
	HtmlOutput: '', 
	counter: 1, 
	init: function() {
			var fileLoc = WSDLLINK;
			//var fileLoc = '';
			BuildHTMLFromXMLParsing(this,fileLoc,"billingStatus");
	} 
}; 


/* SPA JS - Start */ 

//global Variable 

var debitSPA = { 
	headerHtml: '<table class="sortable tightTable" width="700px">', 
	bodyHtml: '', 
	footerHtml: '</tbody></table>', 
	HtmlOutput: '', 
	counter: 1, 
	init: function(params) { 
			var fileLoc = ""; 
			fileLoc = SPAproxyURL+ queryParams 
			BuildHTMLFromXMLParsing(this,fileLoc,"debitSPA" ); 
	} 
}; 

var invoiceSPA = { 
	headerHtml: '<table class="sortable tightTable">', 
	bodyHtml: '', 
	footerHtml: '</tbody></table>', 
	HtmlOutput: '', 
	counter: 1, 
	init: function() { 
			var fileLoc = invoiceSPALink + queryParams; 
			BuildHTMLFromXMLParsing(this,fileLoc,"invoiceSPA"); 
	   } 
}; 


// default variable for view all button for SPA tab
IsViewAllDisplayedForInvoiceSPA = "no";
IsViewAllDisplayedForDebitSPA = "no";



jQuery(document).ready(function(){ 
    jQuery("#FieldSelectSPA").change(function() 
 {    
	    	var downloadURL = '';
		jQuery(".spaDiv").hide();//hide all 
		switch (jQuery(this).val()) 
		{ 
			case '0': 
					searchType = 1; // set the searchtype to InvoieSPA
					//resetformValues() ; //reset the search values
					displayViewAllButton(IsViewAllDisplayedForInvoiceSPA); // display the viewAll flag
					jQuery('#invoiceSpa').show(); 
					//downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '/proxy/DownloadCsv/DownloadFile?type=download&module=SPA&SPA=invoice"' + 'target="' + '_blank"' + '>Download to Excel</a></p><br>';
                                        downloadURL = '<p class="homeLink"><a href="#" onclick="updateCatalyst(\'spa_invoice\')">Download to Excel</a></p><br>';
                                        //downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '#"' + 'onclick="' + 'updateCatalyst("' + 'spa_invoice"' + ')"' + '>Download to Excel</a></p><br>';
					jQuery('#SPADownloadLink').html("");
					jQuery('#SPADownloadLink').append(downloadURL);
					jQuery('#SPADownloadLink').removeAttr("style");
					
			break; 
			case '1': 
					
					searchType = 0;  // set the searchtype to DebitSPA
					//resetformValues() ; //reset the search values
					displayViewAllButton(IsViewAllDisplayedForDebitSPA);	// display the viewAll flag				
					jQuery('#debitSpa').show(); 
					//downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '/proxy/DownloadCsv/DownloadFile?type=download&module=SPA&SPA=debit"' + 'target="' + '_blank"' + '>Download to Excel</a></p><br>';
                                        downloadURL = '<p class="homeLink"><a href="#" onclick="updateCatalyst(\'spa_debit\')">Download to Excel</a></p><br>';
                                        //downloadURL = '<p class="' + 'homeLink"' + '><a href="' + '#"' + 'onclick="' + 'updateCatalyst("' + 'spa_debit"' + ')"' + '>Download to Excel</a></p><br>';
					jQuery('#SPADownloadLink').html("");
					jQuery('#SPADownloadLink').append(downloadURL);
					jQuery('#SPADownloadLink').removeAttr("style");
					
			break; 
			default: 
					searchType = 0;  // set the searchtype to DebitSPA
					//resetformValues() ; // reset the search values
					displayViewAllButton(IsViewAllDisplayedForDebitSPA); // display the viewAll flag
					jQuery('#debitSpa').show(); 
					
		} 
	}); 
}); 

function validDate(fld) { 
   var RegExPattern = /^(?=\d)(?:(?:(?:(?:(?:0?[13578]|1[02])(\/)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:0?2(\/)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:(?:0?[1-9])|(?:1[0-2]))(\/)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))($|\ (?=\d)))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/; 

   if ((fld.value.match(RegExPattern)) && (fld.value!='') && (fld.value.length==10)) { 
       return true; 
   } else { 
       return false; 
   } 
} 
function checkDateRange(date1, date2){ 
		var form =  window.document.spaSearch; 
		var server_date = form.serverdate.value; 
		//alert ("not real server date. fix before golive") 


		// Break up the start date - using the delimiter "/" - into an array of strings 
		date1 = date1.split("/") 

		var year1 = date1[2]; 
		var month1 = date1[0]; 
		var day1 = date1[1]; 
		date2 = date2.split("/") 

		var year2 = date2[2]; 
		var month2 = date2[0]; 
		var day2 = date2[1]; 

		
		date3 = server_date.split("/");
                var year3 = date3[2]; 
		var month3 = date3[0]; 
		var day3 = date3[1]; 
		
		
		var from_date = new Date(year1,month1-1,day1); 
		var to_date = new Date(year2,month2-1,day2); 
		server_date = new Date(year3,month3-1,day3);
		
		


		var diff = server_date - from_date; 

		// get the difference in days 
		diff = Math.ceil(diff/1000/60/60/24); 


		if (diff > 46) { 
		  alert('Invalid "From" date. Please specify a date \nthat is no more than 45 days in the past.'); 
		  return false 
		} 

		diff = to_date - from_date; 

		// get the difference in days 
		diff = Math.ceil(diff/1000/60/60/24); 

		if (diff < 0) { 
				  alert('Invalid date range. "From" date must be earlier than "To" date'); 
				  return false 
		} 
		
	return true; 
} 

exists = false;

function SPASearchSubmit() { 

		var default_date="mm/dd/yyyy"; 
		var keyword_search; 
		var no_keyword; 
		var empty_date1; 
		var empty_date2; 
		queryParams =""; 
		
		var default_keywords="Enter SPA#, Model#, Customer Name"; 
					var form =  window.document.spaSearch; 



			if ( form.searchby.value=="" ) { 
									keyword_search = false; 
			}else{//keyword search is true, so we're confirming valid keywords exist 
						keyword_search = true; 
						if ((form.keywords.value==default_keywords)||(form.keywords.value=="")){ 
								no_keyword= true; 
						}else{ 
								no_keyword= false; 
						} 
			} 

			if (form.date1.value=="") { 
							empty_date1=true; 
			}else{ 
							empty_date1=false; 
			} 

			if (form.date2.value=="") { 
							empty_date2=true; 
			}else{ 
							empty_date2=false; 
			} 

			if(keyword_search){ 
					if(no_keyword && (empty_date1 || empty_date2)){ 
							alert('Please enter search criteria\n and a keyword and select a\n date range'); 
							return false; 
					}else{ 
						    
					     if(no_keyword){ 
								alert('Please enter a valid keyword for this criteria!'); 
								return false; 
							  } 
					   
							  if(validDate(form.date1)==false){ 
								alert('Please enter a valid "From" date\nusing the mm/dd/yyyy format.'); 
								return false; 
							  } 
							  
							  // set the queryParams 
							  queryParams += "&bDate="+form.date1.value; 
					    
					  
					  
							if(validDate(form.date2)==false){ 
								alert('Please enter a valid "To" date\nusing the mm/dd/yyyy format.'); 
								return false; 
							  } 
							  // set the queryParams 
							  queryParams += "&eDate="+form.date2.value; 
					   
						
					   // if both dates got validated above test them for date range validity 
							   if(!checkDateRange(form.date1.value,form.date2.value)) { 
								  return false; } 
					


									   queryParams += "&keywords="+form.keywords.value; 
									   queryParams += "&searchby="+form.searchby.value; 
							    
					   //return true; 
					 } 
			
	 }else{ 
			 //if not a keyword search we make sure there is a date specified 

							 if(validDate(form.date1)==false){ 
									  alert('Please enter a valid "From" date\nusing the mm/dd/yyyy format.'); 
									  //alert('returning false 5'); 
									return false; 
							 } 
  

							if(validDate(form.date2)==false){ 
									 alert('Please enter a valid "To" date\nusing the mm/dd/yyyy format.'); 
											  //alert('returning false 7'); 
									return false; 
							} 
							         
					   if(!checkDateRange(form.date1.value,form.date2.value)) { 
								  return false; 
						} 
													 // set the queryParams 
							  queryParams += "&bDate="+form.date1.value; 
					      queryParams += "&eDate="+form.date2.value;  
				
			//return true; 
	 }//end of else. Not a keyword search, but dates are valid 
                
                // display the view all button
	 	 jQuery('#ViewAll').removeAttr("style");
	         callAjaxService(); 
}//end function 

var gvdebitspacalledCount =1;
var gvlspacalledCount = 1;

function callAjaxService() { 
	
	if(typeof(SPAproxyURL)=="undefined"){ 
	   SPAproxyURL = "";
	   searchType = 1;
	}
	if (searchType==0) { 
			
			if (gvdebitspacalledCount == 0) {
				IsViewAllDisplayedForDebitSPA = "no"; 
			} else {
				IsViewAllDisplayedForDebitSPA = "yes"; 
				gvdebitspacalledCount = 1;
			}
			debitspacalledCount ++; 
			var FileLink = SPAproxyURL+queryParams; 
			// need to remove the table. 
			// remove the whole table. 
			jQuery('#debitSpaTable table tr').each(function () { 
			jQuery(this).remove(); }); 
			jQuery(function() { debitSPA.init(FileLink);  });
	} else { 
			if (gvlspacalledCount == 0) {
				IsViewAllDisplayedForInvoiceSPA = "no";
			} else {
				IsViewAllDisplayedForInvoiceSPA = "yes";
				gvlspacalledCount =1;
			}	
			spacalledCount ++; 
			invoiceSPALink=invoiceSPALink;
			// need to remove the table. 
			// remove the whole table. 
			jQuery('#invoiceSpaTable table tr').each(function () { 
			jQuery(this).remove(); }); 
			jQuery(function() { invoiceSPA.init(); });
	} 
} 

function viewAllAction() {
	// remove the view all button
	RemoveViewAllActionButton();
	queryParams = "";
	queryParams = "&bDate="+window.document.spaSearch.bDateHidden.value;
    	queryParams += "&eDate="+window.document.spaSearch.eDateHidden.value;
    	resetformValues();
    	callAjaxService();
    	
}

function resetformValues() {
	// set the default date
    	window.document.spaSearch.date1.value =window.document.spaSearch.bDateHidden.value
    	window.document.spaSearch.date2.value =window.document.spaSearch.eDateHidden.value
    	window.document.spaSearch.keywords.value ="Enter SPA#, Model#, Customer Name";
    	window.document.spaSearch.searchby.value ="";

}

function displayViewAllButton(DisplayFlag) {
	if (DisplayFlag=="no") {
		// make sure viewALL is hidden
		jQuery('#ViewAll').attr('style','display: none;');
	} else {
		 // display the view all button
		jQuery('#ViewAll').removeAttr("style"); 
	}
}

function RemoveViewAllActionButton() {
	if (searchType==0) { 
		IsViewAllDisplayedForDebitSPA = "no";
		gvdebitspacalledCount = 0;
	} else {
		gvlspacalledCount = 0;
		IsViewAllDisplayedForInvoiceSPA = "no";
	}
	jQuery('#ViewAll').attr('style','display: none;');
	
}
//used to clear the fields in spaSearch from default values. 
jQuery.fn.search = function() { 
	return this.focus(function() { 
			if( this.value == this.defaultValue ) { 
					this.value = ""; 
			} 
	}).blur(function() { 
			if( !this.value.length ) { 
					this.value = this.defaultValue; 
			} 
	}); 
}; 

jQuery(document).ready(function(){ 
    jQuery("input").search(); 
}); 

		

/* SPA JS - Stop */ 

// Activate My Profile tab
jQuery(document).ready(function(){
	jQuery('li.profile').removeClass('profile ui-tabs-disabled').addClass('profile');
});


/* This function reformats the dates of the news items to "Oct. 8" style.*/
jQuery(document).ready(function(){

	var dates = jQuery('#NewsTable > tbody> tr ' ).children(); // the td cells in the NewsTable 
  var bob='';
  
	for (k=0; k<6; k=k+2){ //process every other cell to get the dates but skip the content
		bob=jQuery(dates[k]).html(); //get the date
		if(bob!='' &&  bob!=null){
			bob=formatDate(bob);//and pass it to the formatting function
			jQuery(dates[k]).html(bob);//rewrite the html of the date td with the reformatted code
		}
	}
});

	
		
	// Empty the Target Tracker display
function clearTargetTrackerView() {
	// While the target tracker view is reloading, keep the body size at least as high as it was so that the screen 
	// doesn't jump for the user
	var curBodyHeight = jQuery('body').height();
	jQuery('body').css('height', '' + curBodyHeight + 'px');
	
	// Clear all the divs
	jQuery('#LastUpdateDate').empty();
	jQuery('#TTRegion').empty();
	jQuery('#TTCoverageArea').empty();
	jQuery("#SLIP").attr('style','display: none;');
	jQuery("#SLIP_Main").empty();
	jQuery("#SLIP_SalesIn").empty();
	jQuery("#SPIN").attr('style','display: none;');
	jQuery("#SPIN_Main").empty();
	jQuery("#SPIN_SalesIn").empty();
	TargetTracker.counter = 1;
}	
//function to update the SiteCatalyst data
function updateCatalyst(module)
{
    var name = "direct:en-us:apps:" + module + ":download";
    s.pageName=name;
    s.channel="direct";
    s.prop1="direct:en-us";
    s.prop2="direct:en-us:apps";
    s.prop3="direct:en-us:apps:" + module;
    s.prop4=name;
    s.prop5=name;

    void(s.t());
	
	// variables for sales out detail
	var selectedParticipant = jQuery('#FieldParticipant option:selected').text();//get the selected participant
	//Vasavi
	var selectedFiscalQtrYear   = jQuery('#FieldFiscalQtr option:selected').text();  
	var selectedFiscalYear = selectedFiscalQtrYear.substring(0,4);
	var selectedFQ = selectedFiscalQtrYear.substring(8,9);

	//Vasavi 26-04-2011
	var fiscalQuarterYear = jQuery('#FieldFiscalQtr option:selected').text();; //get the fiscal year
	var fiscalQuarter = selectedFiscalQtrYear.substring(8,9);
	var fiscalYear = selectedFiscalQtrYear.substring(0,4);;
	var selectedFiscalQtr = selectedFiscalQtrYear.substring(8,9);

    if (module == "claims")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=Claims";
    else if (module == "billing")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=Billing";
    else if (module == "target_tracker")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=TargetTracker";
    else if (module == "order")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=Orders";
    else if (module == "distribution_metrics")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=Rtdm";
	//Vasavi
	else if (module == "distribution_sales_out_detail")  
      window.open("https://realtime-ext.seagate.com/realtime/realtime/channel?pos&frame=SOredirector&participant="+selectedParticipant+"&selectedQuarter=" + selectedFiscalYear + ":" + selectedFQ, "Sales_Out_Invoice_Detail", "toolbar=0,scrollbars=0,location=0,status=0,menubar=0,resizable=1,width=820,height=200,left=0,top=0");
	else if (module == "spa_invoice")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=SPA&SPA=invoice";
    else if (module == "spa_debit")
        document.location.href = "/proxy/DownloadCsv/DownloadFile?type=download&module=SPA&SPA=debit";
}
	