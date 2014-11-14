/* 
 List of plugins: 
 	- Trace 1.0
	- Placeholder	
	- Get ducument size
	- Easing 1.3	
	
	- ColorBox v1.3.20.1
	- Tiny Scrollbar 1.81
	- jAlert 1.1
	- jQuery custom selectboxes version 0.6.1
*/





/*
 * Trace Debug
 */
function trace(s){
	var logExist = $('#log').html();
	if (logExist==null || logExist=="undefined"){ $('body').append('<div id="log"></div>'); $("#log").draggable(); }
	$('#log').prepend('<p>'+s+'</p>');
}





/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/
(function(b){function d(a){this.input=a;a.attr("type")=="password"&&this.handlePassword();b(a[0].form).submit(function(){if(a.hasClass("placeholder")&&a[0].value==a.attr("placeholder"))a[0].value=""})}d.prototype={show:function(a){if(this.input[0].value===""||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},
hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(b.browser.msie&&a[0].outerHTML){var c=b(a[0].outerHTML.replace(/type=(['"])?password\1/gi,
"type=$1text$1"));this.fakePassword=c.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");b(this).hide()});b(a[0].form).submit(function(){c.remove();a.show()})}}};var e=!!("placeholder"in document.createElement("input"));b.fn.placeholder=function(){return e?this:this.each(function(){var a=b(this),c=new d(a);c.show(!0);a.focus(function(){c.hide()});a.blur(function(){c.show(!1)});b.browser.msie&&(b(window).load(function(){a.val()&&a.removeClass("placeholder");c.show(!0)}),
a.focus(function(){if(this.value==""){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);








/* 
 * Get ducument size
 * @param int 0 ~ 3
 * @return array [width of current page] [height of current page] [width of window] [height of window]
 *
 */
function getDocumentSize(val){
	var xScroll,yScroll,value;
	
	if(window.innerHeight&&window.scrollMaxY){	xScroll=window.innerWidth+window.scrollMaxX;  yScroll=window.innerHeight+window.scrollMaxY;	}
	else if(document.body.scrollHeight>document.body.offsetHeight){	xScroll=document.body.scrollWidth;  yScroll=document.body.scrollHeight; }
		else{ xScroll=document.body.offsetWidth;  yScroll=document.body.offsetHeight;	}
	
	var windowWidth,windowHeight;	
	if(self.innerHeight){
			if(document.documentElement.clientWidth){ windowWidth=document.documentElement.clientWidth; 	}
			else{ windowWidth=self.innerWidth; }
				windowHeight=self.innerHeight;
	}
	else if(document.documentElement&&document.documentElement.clientHeight){
			windowWidth=document.documentElement.clientWidth;  windowHeight=document.documentElement.clientHeight; }
		else if(document.body){
			windowWidth=document.body.clientWidth;  windowHeight=document.body.clientHeight;	}
	
	if(yScroll<windowHeight){	pageHeight=windowHeight;	}
	else{	pageHeight=yScroll	}
	
	if(xScroll<windowWidth){	pageWidth=xScroll	}
	else{	pageWidth=windowWidth }
	
	arrayPageSize=new Array(pageWidth, pageHeight, windowWidth, windowHeight);
	return arrayPageSize[val];
};


	



/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
*/
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);	},
	easeInQuad: function (x, t, b, c, d) {	return c*(t/=d)*t + b;	},
	easeOutQuad: function (x, t, b, c, d) {	return -c *(t/=d)*(t-2) + b;	},
	easeInOutQuad: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t + b;
											return -c/2 * ((--t)*(t-2) - 1) + b;	},
	easeInCubic: function (x, t, b, c, d) {	return c*(t/=d)*t*t + b;	},
	easeOutCubic: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b;	},
	easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;
											return c/2*((t-=2)*t*t + 2) + b;	},
	easeInQuart: function (x, t, b, c, d) {	return c*(t/=d)*t*t*t + b;	},
	easeOutQuart: function (x, t, b, c, d) {return -c * ((t=t/d-1)*t*t*t - 1) + b;	},
	easeInOutQuart: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
											return -c/2 * ((t-=2)*t*t*t - 2) + b;	},
	easeInQuint: function (x, t, b, c, d) {	return c*(t/=d)*t*t*t*t + b;	},
	easeOutQuint: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b;	},
	easeInOutQuint: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
											return c/2*((t-=2)*t*t*t*t + 2) + b;	},
	easeInSine: function (x, t, b, c, d) {	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;	},
	easeOutSine: function (x, t, b, c, d) {	return c * Math.sin(t/d * (Math.PI/2)) + b;	},
	easeInOutSine: function (x, t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;	},
	easeInExpo: function (x, t, b, c, d) {	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;	},
	easeOutExpo: function (x, t, b, c, d) {	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;	},
	easeInOutExpo: function (x, t, b, c, d) {if (t==0) return b; if (t==d) return b+c; if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
											return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;	},
	easeInCirc: function (x, t, b, c, d) {	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;	},
	easeOutCirc: function (x, t, b, c, d) {	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;	},
	easeInOutCirc: function (x, t, b, c, d) {if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
											return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;	},
	easeInElastic: function (x, t, b, c, d) {	var s=1.70158;var p=0;var a=c;
											if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
											if (a < Math.abs(c)) { a=c; var s=p/4; }
											else var s = p/(2*Math.PI) * Math.asin (c/a);
											return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;	},
	easeOutElastic: function (x, t, b, c, d) {	var s=1.70158;var p=0;var a=c;
											if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
											if (a < Math.abs(c)) { a=c; var s=p/4; }
											else var s = p/(2*Math.PI) * Math.asin (c/a);
											return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;	},
	easeInOutElastic: function (x, t, b, c, d) { var s=1.70158;var p=0;var a=c;
											if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
											if (a < Math.abs(c)) { a=c; var s=p/4; }
											else var s = p/(2*Math.PI) * Math.asin (c/a);
											if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
											return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;	},
	easeInBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158;
											return c*(t/=d)*t*((s+1)*t - s) + b;	},
	easeOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;
											return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;	},
	easeInOutBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158; 
											if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
											return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;	},
	easeInBounce: function (x, t, b, c, d) {return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;	},
	easeOutBounce: function (x, t, b, c, d) {if ((t/=d) < (1/2.75)) {
												return c*(7.5625*t*t) + b;
											} else if (t < (2/2.75)) {
												return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
											} else if (t < (2.5/2.75)) {
												return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
											} else {
												return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
											}
										},
	easeInOutBounce: function (x, t, b, c, d) {
											if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
											return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;	}
});







/*!
 Colorbox v1.4.28 - 2013-09-04
 jQuery lightbox and modal window plugin
 (c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(A+e)%t;return 0>i?t+i:i}function l(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function h(e,t){return e.photo||e.photoRegex.test(t)}function s(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(z,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(z));B.rel=B.rel||z.rel||e(z).data("rel")||"nofollow",B.href=B.href||e(z).attr("href"),B.title=B.title||z.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),ht.trigger(i),e.isFunction(o)&&o.call(z)}function u(i){q||(z=i,d(),k=e(z),A=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),A=k.index(z),-1===A&&(k=k.add(z),A=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(y):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(st,"LoadedContent","width:0; height:0; overflow:hidden"),y.css({width:"",height:""}).append(H),O=x.height()+C.height()+y.outerHeight(!0)-y.height(),_=b.width()+T.width()+y.outerWidth(!0)-y.width(),D=H.outerHeight(!0),N=H.outerWidth(!0),B.w=l(B.initialWidth,"x"),B.h=l(B.initialHeight,"y"),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),ht.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&ht.one(rt,function(){e(z).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(st).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(st,"Overlay").hide(),F=e([o(st,"LoadingOverlay")[0],o(st,"LoadingGraphic")[0]]),v=o(st,"Wrapper"),y=o(st,"Content").append(L=o(st,"Title"),S=o(st,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),F),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(st).append(o(st,"TopLeft"),x=o(st,"TopCenter"),o(st,"TopRight")),o(st,!1,"clear:left").append(b=o(st,"MiddleLeft"),y,T=o(st,"MiddleRight")),o(st,!1,"clear:left").append(o(st,"BottomLeft"),C=o(st,"BottomCenter"),o(st,"BottomRight"))).find("div div").css({"float":"left"}),W=o(st,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,W)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,j=!1,z=k[A],d(),c(lt),c(it,B.onLoad),B.h=B.height?l(B.height,"y")-D-O:B.innerHeight&&l(B.innerHeight,"y"),B.w=B.width?l(B.width,"x")-N-_:B.innerWidth&&l(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=l(B.maxWidth,"x")-N-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=l(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){F.show()},100),B.inline?(a=o(st).hide().insertBefore(e(n)[0]),ht.one(lt,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):h(B,n)?(n=s(B,n),j=t.createElement("img"),e(j).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(st,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(j.alt=e(z).attr("alt")||e(z).attr("data-alt")||"",B.retinaImage&&i.devicePixelRatio>1&&(j.height=j.height/i.devicePixelRatio,j.width=j.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){j.height-=j.height*t,j.width-=j.width*t},B.mw&&j.width>B.mw&&(t=(j.width-B.mw)/j.width,r()),B.mh&&j.height>B.mh&&(t=(j.height-B.mh)/j.height,r())),B.h&&(j.style.marginTop=Math.max(B.mh-j.height,0)/2+"px"),k[1]&&(B.loop||k[A+1])&&(j.style.cursor="pointer",j.onclick=function(){Q.next()}),j.style.width=j.width+"px",j.style.height=j.height+"px",setTimeout(function(){u(j)},1))}),setTimeout(function(){j.src=n},1)):n&&W.load(n,B.data,function(t,i){f===at&&u("error"===i?o(st,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,y,x,b,T,C,k,E,H,W,F,L,S,M,R,I,K,P,B,O,_,D,N,z,A,j,U,$,q,G,Q,J,V,X={transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,trapFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",lt=Z+"_purge",ht=e("<a/>"),st="div",at=0,dt={},ct=function(){function e(){clearTimeout(n)}function t(){(B.loop||k[A+1])&&(e(),n=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(l).one(l,o),ht.bind(ot,t).bind(it,e).bind(nt,o),g.removeClass(r+"off").addClass(r+"on")}function o(){e(),ht.unbind(ot,t).unbind(it,e).unbind(nt,o),M.html(B.slideshowStart).unbind(l).one(l,function(){Q.next(),i()}),g.removeClass(r+"on").addClass(r+"off")}var n,r=Z+"Slideshow_",l="click."+Z,h=!1;return function(){if(h){if(B.slideshow)return;h=!1,M.hide(),e(),ht.unbind(ot,t).unbind(it,e).unbind(nt,o),g.removeClass(r+"off "+r+"on")}else B.slideshow&&k[1]&&(h=!0,B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){x[0].style.width=C[0].style.width=y[0].style.width=parseInt(g[0].style.width,10)-_+"px",y[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,h,s,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),B.fixed?(c.top-=h,c.left-=s,g.css({position:"fixed"})):(a=h,d=s,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-N-_-l(B.right,"x"),0):B.left!==!1?l(B.left,"x"):Math.round(Math.max(E.width()-B.w-N-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-l(B.bottom,"y"),0):B.top!==!1?l(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+N+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+N+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,Q.position)},1),i&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=l(e.width,"x")-N-_),e.innerWidth&&(B.w=l(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=l(e.height,"y")-D-O),e.innerHeight&&(B.h=l(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function l(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(st,"LoadedContent").append(i),H.hide().appendTo(W.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:l()}).prependTo(y),W.hide(),e(j).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,l,a=k.length,u="frameBorder",f="allowTransparency";U&&(l=function(){clearTimeout(G),F.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",A+1).replace("{total}",a)).show(),R[B.loop||a-1>A?"show":"hide"]().html(B.next),I[B.loop||A?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&h(r,i)&&(i=s(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",l).appendTo(H),ht.one(lt,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):l(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[A+1])&&(A=r(1),u(k[A]))},Q.prev=function(){!$&&k[1]&&(B.loop||A)&&(A=r(-1),u(k[A]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(lt),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(z)},Q.settings=X)})(jQuery,document,window);











/*
 * Tiny Scrollbar 1.81
 * http://www.baijs.nl/tinyscrollbar/
 * 
	axis: 'x' -- Vertical or horizontal scroller? 'x' or 'y'.
	wheel: 40 -- How many pixels must the mouswheel scrolls at a time.
	scroll: true -- Enable or disable the mousewheel.
	lockscroll: true -- Return scrollwheel event to browser if there is no more content.
	size: 'auto' -- Set the size of the scrollbar to auto or a fixed number.
	sizethumb: 'auto' -- Set the size of the thumb to auto or a fixed number.
	invertscroll: false -- Enable mobile invert style scrolling.
 
 *	
	
	var g-scroll = $('.scroll').tinyscrollbar();
	
	$('.scroll-anchor').click(function(){
		g-scroll.tinyscrollbar_update(50);
		return false;
	});
 *
 */
 (function (a) {
    a.tiny = a.tiny || {};
    a.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: true,
            lockscroll: true,
            size: "auto",
            sizethumb: "auto",
            invertscroll: false
        }
    };
    a.fn.tinyscrollbar = function (d) {
        var c = a.extend({}, a.tiny.scrollbar.options, d);
        this.each(function () {
            a(this).data("tsb", new b(a(this), c))
        });
        return this
    };
    a.fn.tinyscrollbar_update = function (c) {
        return a(this).data("tsb").update(c)
    };

    function b(q, g) {
		q.each(function(){
			$(this).removeClass('scroll').addClass('scrolled').wrapInner('<div class="g-viewport"><div class="g-overview"></div></div>').prepend('<div class="g-scrollbar"><div class="g-track"><div class="g-thumb"><div class="g-end"></div></div></div></div>');
		});
		
        var k = this,
            t = q,
            j = {
                obj: a(".g-viewport", q)
            }, h = {
                obj: a(".g-overview", q)
            }, d = {
                obj: a(".g-scrollbar", q)
            }, m = {
                obj: a(".g-track", d.obj)
            }, p = {
                obj: a(".g-thumb", d.obj)
            }, l = g.axis === "x",
            n = l ? "left" : "top",
            v = l ? "Width" : "Height",
            r = 0,
            y = {
                start: 0,
                now: 0
            }, o = {}, e = "ontouchstart" in document.documentElement;

        function c() {
            k.update();
            s();
            return k
        }
        this.update = function (z) {
            j[g.axis] = j.obj[0]["offset" + v];
            h[g.axis] = h.obj[0]["scroll" + v];
            h.ratio = j[g.axis] / h[g.axis];
            d.obj.toggleClass("g-disable", h.ratio >= 1);
            m[g.axis] = g.size === "auto" ? j[g.axis] : g.size;
            p[g.axis] = Math.min(m[g.axis], Math.max(0, (g.sizethumb === "auto" ? (m[g.axis] * h.ratio) : g.sizethumb)));
            d.ratio = g.sizethumb === "auto" ? (h[g.axis] / m[g.axis]) : (h[g.axis] - j[g.axis]) / (m[g.axis] - p[g.axis]);
            r = (z === "relative" && h.ratio <= 1) ? Math.min((h[g.axis] - j[g.axis]), Math.max(0, r)) : 0;
            r = (z === "bottom" && h.ratio <= 1) ? (h[g.axis] - j[g.axis]) : isNaN(parseInt(z, 10)) ? r : parseInt(z, 10);
            w()
        };

        function w() {
            var z = v.toLowerCase();
            p.obj.css(n, r / d.ratio);
			h.obj.css(n, - r);
            o.start = p.obj.offset()[n];
            d.obj.css(z, m[g.axis]);
            m.obj.css(z, m[g.axis]);
            p.obj.css(z, p[g.axis])
        }
        function s() {
            if (!e) {
                p.obj.bind("mousedown", i);
                m.obj.bind("mouseup", u)
            } else {
                j.obj[0].ontouchstart = function (z) {
                    if (1 === z.touches.length) {
                        i(z.touches[0]);
                        z.stopPropagation()
                    }
                }
            }
            if (g.scroll && window.addEventListener) {
                t[0].addEventListener("DOMMouseScroll", x, false);
                t[0].addEventListener("mousewheel", x, false)
            } else {
                if (g.scroll) {
                    t[0].onmousewheel = x
                }
            }
        }
        function i(A) {
            a("body").addClass("g-noSelect");
            var z = parseInt(p.obj.css(n), 10);
            o.start = l ? A.pageX : A.pageY;
            y.start = z == "auto" ? 0 : z;
            if (!e) {
                a(document).bind("mousemove", u);
                a(document).bind("mouseup", f);
                p.obj.bind("mouseup", f)
            } else {
                document.ontouchmove = function (B) {
                    B.preventDefault();
                    u(B.touches[0])
                };
                document.ontouchend = f
            }
        }
        function x(B) {
            if (h.ratio < 1) {
                var A = B || window.event,
                    z = A.wheelDelta ? A.wheelDelta / 120 : -A.detail / 3;
                r -= z * g.wheel;
                r = Math.min((h[g.axis] - j[g.axis]), Math.max(0, r));
                p.obj.css(n, r / d.ratio);
                
				//h.obj.css(n, - r);
				h.obj.stop().animate({top: -r}, 750, 'easeOutQuart');
				
                if (g.lockscroll || (r !== (h[g.axis] - j[g.axis]) && r !== 0)) {
                    A = a.event.fix(A);
                    A.preventDefault()
                }
            }
        }
        function u(z) {
            if (h.ratio < 1) {
                if (g.invertscroll && e) {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + (o.start - (l ? z.pageX : z.pageY)))))
                } else {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + ((l ? z.pageX : z.pageY) - o.start))))
                }
                r = y.now * d.ratio;
                
				h.obj.css(n, - r);
				//h.obj.stop().animate({top: -r}, 750, 'easeOutQuart');
				
                p.obj.css(n, y.now)
            }
        }
        function f() {
            a("body").removeClass("g-noSelect");
            a(document).unbind("mousemove", u);
            a(document).unbind("mouseup", f);
            p.obj.unbind("mouseup", f);
            document.ontouchmove = document.ontouchend = null
        }
        return c()
    }
}(jQuery));
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
// jQuery Alert Dialogs Plugin 1.1
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
				
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {	if( callback ) callback(result);	});
		},		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {	if( callback ) callback(result);	});
		},			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {	if( callback ) callback(result);	});
		},
		
		_show: function(title, msg, value, type, callback) {			
			$.alerts._hide();
			$.alerts._overlay('show');			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({	position: pos,	zIndex: 99999,	padding: 0,	margin: 0	});			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );			
			$("#popup_container").css({	minWidth: $("#popup_container").outerWidth(), maxWidth: $("#popup_container").outerWidth()});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({	top: top + 'px', left: left + 'px'	});
			$("#popup_overlay").height( $(document).height() );
		},		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}		
	}
	
	jAlert = function(message, title, callback) {		$.alerts.alert(message, title, callback);	}	
	jConfirm = function(message, title, callback) {		$.alerts.confirm(message, title, callback);	};		
	jPrompt = function(message, value, title, callback){$.alerts.prompt(message, value, title, callback);	};	
})(jQuery);


/**
 * jQuery custom selectboxes
 * 
 * Copyright (c) 2008 Krzysztof SuszyÅ"ski (suszynski.org)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @ 
 * @category visual
 * @package jquery
 * @subpakage ui.selectbox
 * @author Krzysztof SuszyÅ"ski <k.suszynski@wit.edu.pl>
**/
jQuery.fn.selectbox = function(options){
    /* Default settings */
    var settings = {
        className: 'jquery-selectbox',
        animationSpeed: "normal",
        listboxMaxSize: 10,
        replaceInvisible: false
    };
    var commonClass = 'jquery-custom-selectboxes-replaced';
    var listOpen = false;
    var showList = function(listObj) {
        var selectbox = listObj.parents('.' + settings.className + '');
        listObj.slideDown(settings.animationSpeed, function(){
            listOpen = true;
        });
        selectbox.addClass('selecthover');
        jQuery(document).bind('click', onBlurList);
        return listObj;
    }
    var hideList = function(listObj) {
        var selectbox = listObj.parents('.' + settings.className + '');
        listObj.slideUp(settings.animationSpeed, function(){
            listOpen = false;
            jQuery(this).parents('.' + settings.className + '').removeClass('selecthover');
        });
        jQuery(document).unbind('click', onBlurList);
        return listObj;
    }
    var onBlurList = function(e) {
        var trgt = e.target;
        var currentListElements = jQuery('.' + settings.className + '-list:visible').parent().find('*').andSelf();
        if(jQuery.inArray(trgt, currentListElements)<0 && listOpen) {
            hideList( jQuery('.' + commonClass + '-list') );
        }
        return false;
    }
    
    /* Processing settings */
    settings = jQuery.extend(settings, options || {});
    /* Wrapping all passed elements */
    return this.each(function() {
        var _this = jQuery(this);
        if(_this.filter(':visible').length == 0 && !settings.replaceInvisible)
            return;
        var replacement = jQuery(
            '<div class="' + settings.className + ' ' + commonClass + '">' +
                '<div class="' + settings.className + '-moreButton" />' +
                '<div class="' + settings.className + '-list ' + commonClass + '-list" />' +
                '<span class="' + settings.className + '-currentItem" />' +
            '</div>'
        );
        jQuery('option', _this).each(function(k,v){
            var v = jQuery(v);
            var listElement =  jQuery('<span class="' + settings.className + '-item value-'+v.val()+' item-'+k+'">' + v.text() + '</span>');    
            listElement.click(function(){
                var thisListElement = jQuery(this);
                var thisReplacment = thisListElement.parents('.'+settings.className);
                var thisIndex = thisListElement[0].className.split(' ');
                for( k1 in thisIndex ) {
                    if(/^item-[0-9]+$/.test(thisIndex[k1])) {
                        thisIndex = parseInt(thisIndex[k1].replace('item-',''), 10);
                        break;
                    }
                };
                var thisValue = thisListElement[0].className.split(' ');
                for( k1 in thisValue ) {
                    if(/^value-.+$/.test(thisValue[k1])) {
                        thisValue = thisValue[k1].replace('value-','');
                        break;
                    }
                };
                thisReplacment
                    .find('.' + settings.className + '-currentItem')
                    .text(thisListElement.text());
                thisReplacment
                    .find('select')
                    .val(thisValue)
                    .triggerHandler('change');
                var thisSublist = thisReplacment.find('.' + settings.className + '-list');
                if(thisSublist.filter(":visible").length > 0) {
                    hideList( thisSublist );
                }else{
                    showList( thisSublist );
                }
            }).bind('mouseenter',function(){
                jQuery(this).addClass('listelementhover');
            }).bind('mouseleave',function(){
                jQuery(this).removeClass('listelementhover');
            });
            jQuery('.' + settings.className + '-list', replacement).append(listElement);
            if(v.filter(':selected').length > 0) {
                jQuery('.'+settings.className + '-currentItem', replacement).text(v.text());
            }
        });
        replacement.find('.' + settings.className + '-moreButton').click(function(){
            var thisMoreButton = jQuery(this);
            var otherLists = jQuery('.' + settings.className + '-list')
                .not(thisMoreButton.siblings('.' + settings.className + '-list'));
            hideList( otherLists );
            var thisList = thisMoreButton.siblings('.' + settings.className + '-list');
            if(thisList.filter(":visible").length > 0) {
                hideList( thisList );
            }else{
                showList( thisList );
            }
        }).bind('mouseenter',function(){
            jQuery(this).addClass('morebuttonhover');
        }).bind('mouseleave',function(){
            jQuery(this).removeClass('morebuttonhover');
        });
        _this.hide().replaceWith(replacement).appendTo(replacement);
        //var thisListBox = replacement.find('.' + settings.className + '-list');
//        var thisListBoxSize = thisListBox.find('.' + settings.className + '-item').length;
//        if(thisListBoxSize > settings.listboxMaxSize)
//            thisListBoxSize = settings.listboxMaxSize;
//        if(thisListBoxSize == 0)
//            thisListBoxSize = 1;    
//        var thisListBoxWidth = Math.round(_this.width() + 5);
//        if(jQuery.browser.safari)
//            thisListBoxWidth = thisListBoxWidth * 0.94;
//        replacement.css('width', thisListBoxWidth + 'px');
//        thisListBox.css({
//            width: Math.round(thisListBoxWidth-5) + 'px',
//            height: thisListBoxSize + 'em'
//        });
    });
}
jQuery.fn.unselectbox = function(){
    var commonClass = 'jquery-custom-selectboxes-replaced';
    return this.each(function() {
        var selectToRemove = jQuery(this).filter('.' + commonClass);
        selectToRemove.replaceWith(selectToRemove.find('select').show());       
    });
}

//////////////////////////END


/*

CUSTOM FORM ELEMENTS

Created by Ryan Fait
www.ryanfait.com

The only things you may need to change in this file are the following
variables: checkboxHeight, radioHeight and selectWidth (lines 24, 25, 26)

The numbers you set for checkboxHeight and radioHeight should be one quarter
of the total height of the image want to use for checkboxes and radio
buttons. Both images should contain the four stages of both inputs stacked
on top of each other in this order: unchecked, unchecked-clicked, checked,
checked-clicked.

You may need to adjust your images a bit if there is a slight vertical
movement during the different stages of the button activation.

The value of selectWidth should be the width of your select list image.

Visit http://ryanfait.com/ for more information.

*/

var checkboxHeight = "25";
var radioHeight = "25";
var selectWidth = "190";


/* No need to change anything after this */


document.write('<style type="text/css">input.styled { display: none; } select.styled { position: relative; width: ' + selectWidth + 'px; opacity: 0; filter: alpha(opacity=0); z-index: 5; } .disabled { opacity: 0.5; filter: alpha(opacity=50); }</style>');

var Custom = {
	init: function() {
		var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
		for(a = 0; a < inputs.length; a++) {
			if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className == "styled") {
				span[a] = document.createElement("span");
				span[a].className = inputs[a].type;

				if(inputs[a].checked == true) {
					if(inputs[a].type == "checkbox") {
						position = "0 -" + (checkboxHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					} else {
						position = "0 -" + (radioHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					}
				}
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				inputs[a].onchange = Custom.clear;
				if(!inputs[a].getAttribute("disabled")) {
					span[a].onmousedown = Custom.pushed;
					span[a].onmouseup = Custom.check;
				} else {
					span[a].className = span[a].className += " disabled";
				}
			}
		}
		inputs = document.getElementsByTagName("select");
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].className == "styled") {
				option = inputs[a].getElementsByTagName("option");
				active = option[0].childNodes[0].nodeValue;
				textnode = document.createTextNode(active);
				for(b = 0; b < option.length; b++) {
					if(option[b].selected == true) {
						textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
					}
				}
				span[a] = document.createElement("span");
				span[a].className = "select";
				span[a].id = "select" + inputs[a].name;
				span[a].appendChild(textnode);
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				if(!inputs[a].getAttribute("disabled")) {
					inputs[a].onchange = Custom.choose;
				} else {
					inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
				}
			}
		}
		document.onmouseup = Custom.clear;
	},
	pushed: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight*3 + "px";
		} else if(element.checked == true && element.type == "radio") {
			this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
		} else if(element.checked != true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight + "px";
		} else {
			this.style.backgroundPosition = "0 -" + radioHeight + "px";
		}
	},
	check: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 0";
			element.checked = false;
		} else {
			if(element.type == "checkbox") {
				this.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
			} else {
				this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
				group = this.nextSibling.name;
				inputs = document.getElementsByTagName("input");
				for(a = 0; a < inputs.length; a++) {
					if(inputs[a].name == group && inputs[a] != this.nextSibling) {
						inputs[a].previousSibling.style.backgroundPosition = "0 0";
					}
				}
			}
			element.checked = true;
		}
	},
	clear: function() {
		inputs = document.getElementsByTagName("input");
		for(var b = 0; b < inputs.length; b++) {
			if(inputs[b].type == "checkbox" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
			} else if(inputs[b].type == "checkbox" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			} else if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
			} else if(inputs[b].type == "radio" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			}
		}
	},
	choose: function() {
		option = this.getElementsByTagName("option");
		for(d = 0; d < option.length; d++) {
			if(option[d].selected == true) {
				document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
			}
		}
	}
}
window.onload = Custom.init;