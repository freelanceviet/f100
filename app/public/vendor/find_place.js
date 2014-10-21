$(document).ready(function () {
	var inputSeachLocation = $('input.sfp_input');
	var inputSeachCurrentLocation = $('input#searchTextField');
	// ------------------------------------
	// Event action with input search location
	// document: 
	// callback:
	// ------------------------------------
	inputSeachLocation.bind('focus', function() {
		$('#search_find_content').css('display','block');
	}).bind('blur', function() {
		$('#search_find_content').css('display','none');
	}).keyup(function() {
		if($(inputSeachLocation).val().length>1){
			var value = $(inputSeachLocation).val();
		}
	});
	// ------------------------------------
	// Event action with input current location
	// document: 
	// callback:
	// ------------------------------------
	inputSeachCurrentLocation.bind('focus', function() {
		$('.sfp_input').css('display','none');
		$(this).css('width','305px');
		$(this).css('border','none');
		$(this).css('padding-left','6px');
		$(this).css('padding-top','0px');
    }).bind('blur', function() {
        $('.sfp_input').css('display','block');
		$(this).css('width','90px');
		$(this).addClass('sfp_select');
		$(this).css('padding-left','5px');
		$(this).css('padding-top','0px');
		$(this).css('padding-right','24px');
    }).keyup(function() {
       
    });
	
});