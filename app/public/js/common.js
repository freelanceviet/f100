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

    $(".ctnIn").colorbox({inline:true, width:"50%"});

    //Style selectbox
    $('.default-usage-select').selectbox();
    $( "#sliderhand, #sliderhandPer" ).slider();

    $('.innFrmLf li input[type="radio"]').click(function(){
        var _parent = $(this).attr('parent');
        $('#'+_parent).trigger('click');
    });

    $('.ip_lfin input[type="radio"]').click(function(){
        var _name = $(this).attr('name');
        var _this = $(this);
        $('.ip_lfin input[name="'+_name+'"]').each(function(){
            var _id = $(this).attr('id'); // id = onsite
            if(_this.attr('id') != _id){
                $('.innFrmLf li input[parent="'+_id+'"]').attr('checked', false);
            }else{
                var flag = false;
                $('.innFrmLf li input[parent="'+_id+'"]').each(function(){
                    if($(this).is(":checked")){
                        flag = true;
                    }
                });
                if(flag == false){
                    $('.innFrmLf li input[parent="'+_id+'"]').eq(0).attr('checked', true);
                }
            }
        });
    });

});

/* SWF Object
var flashvars = {};
var params = {};
var attributes = {};
swfobject.embedSWF("flash.swf", "divID", "100%", "100%", "9.0.0","expressInstall.swf", flashvars, params, attributes);*/

function test(){
	trace('a');
}