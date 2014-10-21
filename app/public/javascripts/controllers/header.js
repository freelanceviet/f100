
//-----------------------------------------------------
// Mod		: Controllers
// Author	: Nguyen Huu Hai
// Day		: 19/02/2014
// Name		: header (Controller header)  
//-----------------------------------------------------
function Header(){
	// Connect to room send message accept ket ban
	this.newConnectIoPlace = function(arr){
		socket.emit('connect_accout_room', { my:arr });
	} 
	// Connect to room send message accept ket ban
	this.newConnectSendKB = function(id){
		socket.emit('connect_accout_room_kb_re', { my:id});
	} 
}
//-----------------------------------------------------
// Conect to room of account to send message
//-----------------------------------------------------
Header.prototype.connectToRoomAccount=function(arr){
	this.newConnectIoPlace(arr);
}
Header.prototype.connectToRoomKb=function(id){
	this.newConnectSendKB(id);
}
Header.prototype.faceBookActivi=function(){
	if($('.main_right').find('.m_r_item').length==0){
		$.get('https://graph.facebook.com//oauth/access_token?client_id=767167036678428&client_secret=05cf797e5d80e7d18f6064d4c4b708a6&grant_type=client_credentials', function (data) {
			var accessToken = data.split('=')[1];
			//$.get("https://graph.facebook.com/mangxahoidiadiem/posts?access_token=" + accessToken, function (data2) {
			$.get("https://graph.facebook.com/zixzacviet/posts?access_token=" + data.split('=')[1], function (data2) {
				console.log(data2);
				console.log("https://graph.facebook.com/mangxahoidiadiem/posts?access_token=" + accessToken);
				for(var i=0;i<data2.data.length;i++){
					if(data2.data[i].message!=undefined){
						var img_avatar = "https://graph.facebook.com/"+data2.data[i].from.id+"/picture?type=large";
						$('.default_activiti_facebook').find('.location_name').find('a').text(data2.data[i].from.name);
						$('.default_activiti_facebook').find('.inp_avatar').find('img').attr('src',img_avatar);
						$('.default_activiti_facebook').find('.ic_content').find('span').html(data2.data[i].message);
						if(data2.data[i].type=="photo"){
							if(data2.data[i].picture!=undefined){
								var src_img = "http://graph.facebook.com/"+data2.data[i].object_id+"/picture?type=normal";
								$('.default_activiti_facebook').find('.ic_image_status').css('display','block');
								$('.default_activiti_facebook').find('.ic_image_status').html('<img src="'+src_img+'">');
							}
						}else if(data2.data[i].type=="video"){
							if(data2.data[i].source!=undefined){
								$('.default_activiti_facebook').find('.ic_image_status').css('display','block');
								var video_ifram = '<iframe width="452" height="318" src="'+data2.data[i].source+'?autoplay=0" frameborder="0" allowfullscreen></iframe>';
								$('.default_activiti_facebook').find('.ic_image_status').html(video_ifram);
							}
						}
						$(".main_right ").append($('.default_activiti_facebook').html());
						$('.default_activiti_facebook').find('.ic_image_status').css('display','none');
						$('.default_activiti_facebook').find('.ic_image_status').empty();
						//$(".main_right ").html(JSON.stringify(data2));
					}
				}
			});
		});
	}
}
$(document).ready(function () {
    $.get('https://graph.facebook.com//oauth/access_token?client_id=767167036678428&client_secret=05cf797e5d80e7d18f6064d4c4b708a6&grant_type=client_credentials', function (data) {
        $.get("https://graph.facebook.com/zixzacviet/posts?access_token=" + data.split('=')[1], function (data2) {
            // Todo with json data result from FB
            $("#result").html(JSON.stringify(data2));
        });
    });
});