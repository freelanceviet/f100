// Css for all page
function set_css_all_page(){
	var height_colleft = $(window).height() - 40;
	var width_full_screen =  $(window).width();
	var height_full_screen =  $(window).height();
	var height_friend_list = $(window).height();
	$('#leftCol').css('height', height_colleft);
	$('.main_right').css('height', (height_colleft+7));
	$('.main_right_warper').css('height', (height_colleft));
	$('#friend_list').css('height', height_friend_list-45);
	$('#friend_online').css('height', (height_friend_list - 483));
	$('#search_friend').css('margin-top', '0px');
	$('.olc_content').css('height',(height_full_screen-470));
}
// Css for find place
function set_css_find_place(){
	var width_full_screen =  $(window).width();
	var height_full_screen =  $(window).height();
	var height_colleft = $(window).height() - 40;
	$('#map_view').css('height',(height_full_screen-47));
	$('#category_default_fb').css('height', height_colleft-7);
	$('#friend_list').css('margin-left',width_full_screen-240);
	$('.wapper_all_age').css('width','100%');
	$('#map_view').css('width','99.5%');
	$('#navSearch').css('display','none');
	$('.cdfb_list_category').perfectScrollbar();
	$('.cdfb_list_category').css('height', height_colleft-132);
}
// Css_ for plan trip
function set_css_plan_trip(){
	var width_full_screen =  $(window).width();
	var height_full_screen =  $(window).height();
	var height_colleft = $(window).height() - 40;
	
	$('#map_plan_trip').css('height', height_colleft);
	
	$('#plan_loca_place').perfectScrollbar();
	$('.wapper_all_age').css('width','100%');
	$('#friend_list').css('margin-left',(width_full_screen-238));
	$('#plan_loca_place').css('max-width',(width_full_screen-238));
	$('.your_bucket_trip').css('height',(height_full_screen-44));
	$('#main_route').css('height', (height_full_screen-45));
	
}
// Css for image view
function set_css_image_view(){
	var width_full_screen =  $(window).width();
	var height_full_screen =  $(window).height();
	var height_colleft = $(window).height() - 40;

	$('.wapper_all_age').css('width','100%');
	$('#friend_list').css('margin-left',(width_full_screen-238));
}
// Css_ for place view
function set_css_place_view(){
	var height_full_screen =  $(window).height();
	var height_colleft = $(window).height() - 40;
	var width_full_screen =  $(document).width();
	$('#review_place').css('height',(height_full_screen-40));
	$('#np-content').css('height',(height_full_screen-85));
	$('.place_view_left').css('height',(height_full_screen-47));
	$('.place_view_right').css('height',(height_full_screen-47));
	$('.pvl_comment').css('height', (height_colleft - 51));
	var temp = (height_colleft - 435)+190;
	$('.s_place_usually').css('height', (temp/2));
	$('.s_place_content_sub').css('height', (temp/2));
	if($('#id_user').val()){
		$('.pdb_center').css('height', (height_colleft - 104));
	}else{
		$('.pdb_center').css('height', (height_colleft - 50));
	}
	$('.wapper_all_age').css("width","100%");
	$('.pl2c_list_chat').perfectScrollbar();
	
	//
	if(width_full_screen>1366){
		var height_big_image  = (280*width_full_screen/1366);
		$('.pip_img_big').css('height',height_big_image);
		$('.pdbmit_image_placeview').css('height', height_colleft-(490+(height_big_image-245)));
	}else{
		if($('#id_user').val()){
			$('.pdbmit_image_placeview').css('height', (height_colleft-527));
        }else{
			$('.pdbmit_image_placeview').css('height', (height_colleft-490));
		}
	}
	if(!$('#id_user').val()){
		$('.sp_c_item_name').css('margin-top','25px');
	}
	$('#friend_list').css('margin-left', width_full_screen-221);
	// Scrollbar for similar place and USUALLY GO AFTER
	$('.s_place_content').perfectScrollbar();
	$('.pdb_center').perfectScrollbar();
	// set width height for map zoom
	$('#map-zoom-big').css('width',$('#pd_bottom').width());
	$('#map-zoom-big').css('height',$('#pd_bottom').height());
	$('.pdb_center').perfectScrollbar();
	$('.pip_talk_about').css('display','block');
	$('.pdb_option').css('width', "100%");
	$('.pdb_option').css('margin-left', "0px");
}
// Css_ for road trip
function set_css_road_trip(){
	var height_full_screen =  $(window).height();
	var width_full_screen =  $(window).width();
	$('#road-tripper').css('min-height',(height_full_screen-45));
	$('.wapper_all_age').css('width','100%');
	$('#friend_list').css('margin-left',(width_full_screen-238));
	$('#rt-left').css('height',(height_full_screen-44));
	$('#rt-bottom').css('width',(width_full_screen-537));
}
// Css_ for profile
function set_css_profile(){
	$('.wapper_all_age').css('width','100%');
	var width_full_screen =  $(window).width();
	$('#friend_list').css('margin-left', width_full_screen-240);
	$('.qc_09').css('width', width_full_screen-1190);
	// css_ for list chat
	var height_friend_list_chat = $(window).height();
	$('#friend_list').css('height', height_friend_list_chat-452);
	var height = height_friend_list_chat-452;
	var fiend_online = height_friend_list_chat - 510;
	$(window).scroll(function(){
		var po_Y = $(this).scrollTop();
		if(po_Y>0){
			var temp_m_t = 408 - po_Y;
			var temp_height = height + po_Y;
			var temp_f_online = fiend_online + po_Y;
			if(temp_m_t >= 8){
				$('#friend_list').css('margin-top', temp_m_t);
				$('#friend_list').css('height', temp_height);
				$('#friend_online').css('height', temp_f_online);
			}
		}else{
		}
		if(po_Y==0){
			$('#friend_list').css('margin-top', 408);
			$('#friend_list').css('height', height);
		}
	});	
	if($('.pr_content').length>0){
		$('.ttc-right').css('margin-top','20px');
		$('.ttc-left').css('margin-top','-5px');
	}
}
// right col_ when user login
function autoShowListSidebar(){
	var height_brower  = $(window).height();
	var height_friends = $('#friend_online').height();
	var height_temp    = $('#friend_online').find('.fo_item').length * 51;
	if(height_friends-height_temp>0){
		var temp = (height_friends-height_temp)/2;
		$('#list_content_promotion').css('height',($('#list_content_promotion').height()+temp));
		$('.olc_new_trips').css('height',($('.olc_new_trips').height()+temp));
	}
}
(function ($) {
    $(document).ready(function () {
		set_css_all_page();
		autoShowListSidebar();
    });
})(jQuery);