/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
   //initTabs('.tabBox', '.tabList li', '.tabContent .tab');
//   initTabs('#main', '.tabset li', '.tabBox .tabEl');
   
   //init custom scroll
   $(function() {
	$('.mapPlaceholder .results').jScrollPane({showArrows: true});
   }); 
   initialize();
   
   $('#btnSearch').click(function(event) {
      event.preventDefault();
      codeAddress();
   });  
   
   $('#address').focus(function(event) {
        if ($(this).val() == 'address, city, state, zip') {
            $(this).val('');
        }
   });
   
   $('#address').focusout(function(event) {
        if ($(this).val() == '') {
            $(this).val('address, city, state, zip');
        }
   });    
});

var geocoder;
var map;
var markers;
  
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}
 
function codeAddress() {
    var address = document.getElementById("address").value;
    $('.resultsList').children('li').each(function() {
       $(this).remove();
    });
    $('.mapPlaceholder').find('p').html('');
    geocoder.geocode( {'address': address}, function(results, status) {            
      if (status == google.maps.GeocoderStatus.OK) {
        if (results.length == 1)
        {
            $('.resCol').html('1 Results');
        }
        else
        {
            $('.resCol').html(results.length + ' Results');
        }        
        $('.mapPlaceholder').find('p').html('for ' + address);
        map.setCenter(results[0].geometry.location);
        markers = new Array();
        var mapPlaceholder = "";
        for (i = 0; i < results.length; i++) 
        {                                         
            mapPlaceholder += addMarker(results[i], i);             
        }
        $('.mapPlaceholder').html(mapPlaceholder);        
      } else {
        $('.resCol').html('0 Results');        
      }
    });
}

function addMarker(result, index) {
    var marker = new google.maps.Marker({
                map: map, 
                position: result.geometry.location
    });
    markers.push(marker);
    var street = "";    
    var city = "";
    var zip = "";
    var state = "";    
    
    for (m = 0; m < result.address_components.length; m++)
    {        
        for (k = 0; k < result.address_components[m].types.length; k++)
        {
            if (result.address_components[m].types[k] == 'locality')
            {
                city = result.address_components[m].long_name;
            }
            else if (result.address_components[m].types[k] == 'postal_code')
            {
                zip = result.address_components[m].long_name;     
            }
            else if (result.address_components[m].types[k] == 'street_address')
            {
                street = result.address_components[m].long_name;     
            }
            else if (result.address_components[m].types[k] == 'administrative_area_level_1')
            {
                state = result.address_components[m].long_name;     
            }
        }
    }
    
    var li = "<li>\n";
    li += "  <strong class=\"pin\">" + String.fromCharCode(65 + index) + "</strong>\n";
    li += "  <div class=\"caption clearfix\">\n";
    li += "    <strong class=\"CompanyName\"><a href=\"#\">Company Name</a></strong>\n";
    li += "    <address>\n";
    li += "      <span>" + street + "</span>\n";
    li += "      <span>" + city + ", " + state + ", " + zip + " </span>\n";
    li += "      <span>(xxx) xxx-xxxx</span>\n";
    li += "    </address>\n";
    li += "    <ul class=\"actionList clearfix\">\n";
    li += "      <li><a href=\"#\">Directions</a></li>\n";
    li += "      <li><a href=\"#\">Search nearby</a></li>\n";
    li += "      <li><a class=\"btnMore\" href=\"#\">More</a></li>\n";
    li += "    </ul>\n";
    li += "  </div>\n";
    li += "</li>\n"; 
    
    return li;     
}

