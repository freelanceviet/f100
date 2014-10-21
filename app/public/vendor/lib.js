var alert2 = new Array();
var BASE_URL = "http://yatlat.loc";
var CONS = {
    IMG_INFO_TMP: "http://k14.vcmedia.vn/thumb_w/600/Z3WxvDWHkkhwglFfVOnyhzOPBKmr9M/Image/2013/05/blog01/enhanced-buzz-wide-13499-1367332741-14-bd864.jpg",
    AnotherValue: 3
}
$.fn.animateRotate = function(angle, duration, easing, complete) {
    return this.each(function() {
        var $elem = $(this);

        $({
            deg: 0
        }).animate({
            deg: angle
        }, {
            duration: duration,
            easing: easing,
            step: function(now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

jQuery.fn.copyCSS = function(source){
    this.css("font-size", jQuery(source).css("font-size"));
    this.css("font-weight", jQuery(source).css("font-weight"));
    this.css("font-family", jQuery(source).css("font-family"));
    this.css("color", jQuery(source).css("color"));
    this.css("text-decoration", jQuery(source).css("text-decoration"));
    this.css("text-align", jQuery(source).css("text-align"));
}
function log(object, tag){
    if(!isDef(tag)) tag = "MM";
    if(!isDef(object)) object = "Object undefined!";
    console.log(tag,":", object);
}

function isDef(variable){
    if(typeof variable === 'undefined') return false;
    if(!variable) return false;
    if(variable instanceof jQuery) {
        if(variable.size() == 0) return false;
    }
    return true;
}
// function imgError(image) {
// image.onerror = "";
// image.src = "/images/noimage.gif";
// return true;
// }

var NotifyDialog = function() {

    var self = this;
    var text = "";
    var title = "";
    var type = 0;
    var required = 0;
    var dialog = new Array();
    var overlay = new Array();
    var currentObj = new Array();

    var dialog_id = "";
    var overlay_id = "";



    // constructor
    this.init = function(){

        this.dialog_id = "mm-notify";
        this.overlay_id = "overlay";

        var notifyDialogStr = "<div id='" + this.dialog_id + "' class='mm-popup' style='z-index: 10000;'><div id='mm-notify-close' ></div><div id='mm-notify-title'></div><div id='mm-notify-content'><div id='mm-notify-icon'></div><div id='mm-notify-text'></div></div></div>";
        this.overlay = jQuery("<div id='" + this.overlay_id + "' style='display:block;width:100%;height:100%;position:fixed;background:#444;display:none;opacity:0.6;top:0;left:0;z-index: 9999;' ></div>");
        this.dialog = jQuery(notifyDialogStr);
        jQuery("body").append(this.overlay);
        jQuery("body").append(this.dialog);
        this.overlay.click(function(){
            if(self.required === 0) self.hide();
            else self.flash();
        });
        this.dialog.find('#mm-notify-close').click(function(){
            if(self.required === 0) self.hide();
            else self.flash();
        });
        this.hide();
    }

    this.hide = function(effect){
        if(!isDef(effect)) {
            this.dialog.hide();
            this.overlay.hide();
        } else {
            this.dialog.fadeOut();
            this.overlay.fadeOut();
        }
        if(isDef(this.currentObj)) {
            jQuery(this.currentObj).focus();
            delete this.currentObj;
        }
        this.required = 0;
    }


    this.show = function(obj, text, title, required, type) {

        if(isDef(obj)) this.currentObj = obj;

        this.clear();

        if(isDef(required)) {
            this.required = required;
        } else {
            this.required = 0;
        }
        if(isDef(text)) {
            this.text = text;
        } else {
            log("Not provide arg notify text");
            return;
        }
        if(isDef(title)) {
            this.title = title;
        } else {
            this.title = "Notification";
        }
        if(isDef(type)) {
            this.type = type;
        } else {
            this.type = 0;
        }

        this.refesh();

        this.dialog.css("position","fixed");

        this.dialog.css("z-index", parseInt(this.overlay.css('z-index')) + 1);
        this.dialog.css("top",
            Math.max(0, ((jQuery(window).height() - this.dialog.outerHeight()) / 2)));
        this.dialog.css("left",
            Math.max(0, ((jQuery(window).width() - this.dialog.outerWidth()) / 2)));

        this.overlay.show("fade");
        this.dialog.show();

        this.flash();
    }


    this.flash = function(){
        jQuery(this.dialog).stop().css('background-color','#FFFFFF').effect("highlight", {}, 300);
    }

    this.refesh = function(){
        jQuery(this.dialog).children("#mm-notify-content").children("#mm-notify-text").html(this.text);
        jQuery(this.dialog).children("#mm-notify-title").text(this.title);
    // @TODO: icon
    }

    // this.isRequired = function(){
    // if(isDef(this.required)){
    // if(this.required == 1){
    // if(jQuery(this.dialog).is(":visible")){
    // this.flash();
    // return true;
    // }else{
    // this.clear();
    // return false;
    // }
    // }
    // else{
    // this.clear();
    // return false;
    // }
    // }
    // }


    this.clear = function(){
        this.text = "";
        this.title = "";
        this.type = 0;
        this.required = 0;
        this.refesh();
    }
}


var Maxwidth = function (selector, max_width) {

    jQuery(document).on("keypress", selector, function(event) {

        var inp = String.fromCharCode(event.charCode);
        if (/[a-zA-Z0-9-_ ]/.test(inp)){

            var tmp = new Array();
            tmp = jQuery(this).parent().find('.tmp-calculate')[0];

            if( !isDef(tmp) ) {
                tmp = jQuery("<div class='tmp-calculate' style='display: inline; left: 0; position: absolute; z-index: -1;'></div>");
                jQuery(this).parent().append(tmp);
            }

            jQuery(tmp).html(jQuery(this).val().replace(/\s+/g, '&nbsp;'));
            jQuery(tmp).copyCSS(jQuery(this));

            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

            var text_width = jQuery(tmp).width();
            if(!isDef(max_width))
                max_width = jQuery(this).width() - 70;
            if(text_width > max_width) {

                var current_text = jQuery(this).val();

                if(Math.ceil(text_width - max_width) > 15) {
                    jQuery(this).val('');
                }
                else {
                    jQuery(this).val(current_text.substring(0, current_text.length - 2));
                }
                alert2.show(this, "Tieu de khong duoc qua dai");

                return false;
            }
        }
    });

    jQuery(document).on("paste", selector, function(event) {

        var self = this;
        setTimeout(function() {

            var tmp = new Array();
            tmp = jQuery(self).parent().find('.tmp-calculate')[0];

            if( !isDef(tmp) ) {
                tmp = jQuery("<div class='tmp-calculate' style='display: inline; left: 0; position: absolute; z-index: -1;'></div>");
                jQuery(self).parent().append(tmp);
            }

            jQuery(tmp).html(jQuery(self).val().replace(/\s+/g, '&nbsp;'));
            jQuery(tmp).copyCSS(jQuery(self));

            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

            var text_width = jQuery(tmp).width();
            if(!isDef(max_width))
                max_width = jQuery(self).width() - 70;

            if(text_width > max_width) {

                var current_text = jQuery(self).val();

                if(Math.ceil(text_width - max_width) > 15) {
                    jQuery(self).val('');
                }
                else {
                    jQuery(self).val(current_text.substring(0, current_text.length - 2));
                }
                alert2.show(self, "Tieu de khong duoc qua dai");
                return false;
            }

        }, 0);
    });

};

/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: http://stackoverflow.com/a/10315969/624466
 */
function validateYoutubeURL(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}
// only url pattern
function validateURL(urltext) {
    var urlregex = new RegExp(
        "^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
    return urlregex.test(urltext);
}
// check by send header on real server , not localhost
function urlExists(url){

    //    jQuery.ajax({
    //        type: 'HEAD',
    //        url: url,
    //        success: function(text){
    //            log(text.status, "hijhoioihTrue");
    //            return true;
    //        },
    //        error: function(text) {
    //            log(text.status, "HEHHEFALSE");
    //            return false;
    //        }
    //    });

    return validateURL(url);
}

jQuery.extend({
    jYoutube: function( url, size ){
        if(url === null || !validateYoutubeURL(url)){
            return false;
        }
        size = (size === null) ? "big" : size;
        var vid;
        var results;

        results = url.match("[\\?&]v=([^&#]*)");

        vid = ( results === null ) ? url : results[1];

        if(size == "small"){
            return "http://img.youtube.com/vi/"+vid+"/2.jpg";
        }else {
            return "http://img.youtube.com/vi/"+vid+"/0.jpg";
        }
    }
});



(function($) {
    var origAppend = $.fn.append;
    $.fn.append = function () {
        return origAppend.apply(this, arguments).trigger("append");
    };
})(jQuery);


//
//// END OF LIB
//

jQuery(document).ready(function() {

    alert2 = new NotifyDialog();
    alert2.init();

});





































