/*
 * Version 1.1
 */

$(document).ready(function(){

	// Get current year
	now = new Date;
	theYear = now.getYear();
	if (theYear < 1900)	theYear = theYear+1900;
	$('#currentYear').html(theYear);


	// Fix placeholer HTML5
	$('input[placeholder], textarea[placeholder]').placeholder();

    $('.bxslider').bxSlider({
        mode: 'fade',
        auto: true
    });

    $('#scrolbr').tinyscrollbar();


    //Style selectbox
    $('.default-usage-select').selectbox();
});


/* SWF Object
var flashvars = {};
var params = {};
var attributes = {};
swfobject.embedSWF("flash.swf", "divID", "100%", "100%", "9.0.0","expressInstall.swf", flashvars, params, attributes);*/

function test(){
	trace('a');
}