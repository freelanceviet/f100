$(document).ready(function(){
	// Check point
	$('.wapper_all_age').css('width','100%');
	var width_full_screen =  $(window).width();
	$('#friend_list').css('margin-left', width_full_screen-240);
	$('.qc_09').css('width', width_full_screen-1190);
	$('._66_about').find('._513x').css('display','block');
	// Event click edit info of about
	$('body').on('click', '.cvbi_icon_edit', function (e) {
		var se = $(this);
		var getUrl = "/inputGetPlace";
		$.get(getUrl, function(data){
			se.parents('.cvhv-block').find('a').css('display','none');
			se.parents('.cvhv-block').find('.experienceBody').css('display','none');
			se.parents('.cvhv-block').find('.cvb-icon').css('display','none');
			se.parents('.cvhv-block').find('.cvbi_icon_close').css('display','block');
			se.parents('.cvhv-block').find('.cvbi_icon_edit').css('display','none');
			se.parents('.a_hfef_option').find('.cvbi_input_place').append(data);
		});
	});
	//Event click close input place
	$('body').on('click', '.cvbi_icon_close', function (e) {
		var se = $(this);
		se.parents('.cvhv-block').find('a').css('display','block');
		se.parents('.cvhv-block').find('.experienceBody').css('display','block');
		se.parents('.cvhv-block').find('.cvb-icon').css('display','block');
		se.parents('.cvhv-block').find('.cvbi_icon_close').css('display','none');
		se.parents('.cvhv-block').find('.cvbi_icon_edit').css('display','block');
		se.parents('.cvhv-block').find('.cvbi_input_place').empty();
	});
	// Event click edit basic info
	$('body').on('click', '.cie_ns', function (e) {
		var se = $(this);
		var getUrl = "/inputGetBasicInfo?mode="+se.attr('data-mode')+"";
		$.get(getUrl, function(data){
			se.parents('tr').find('.td_title_').css('display','none');
			se.parents('tr').find('.basic_option_co').remove();
			se.parents('tr').find('.info_basic_content').append(data);
		});
	});
	//Event click close input basic info
	$('body').on('click', '.close_input_basic_info', function (e) {
		var se = $(this);
		se.parents('tr').find('.td_title_').css('display','block');
		se.parents('tr').find('.info_basic_content').find('.basic_option_co').remove();
	});
	// Event change day of user
	$('body').on('change', '.is_event_birth', function (e) {
		var se = $(this);
		var res  = se.val();
		var type = se.attr('data-type'); 
		if(res){
			var getUrl = "/update_date_birth?value_="+res+"&type="+type+"";
			$.get(getUrl, function(data){
				se.find('.info_basic_content').find('.td_title_').remove();
				se.find('.info_basic_content').append(data);
			});
		}
	});
	// Event click choose sex male or female
	$('body').on('click', '.ab_sex_event', function (e) {
		var se = $(this);
		var res  = se.val();
		if(res){
			var getUrl = "/update_sex_user?value_="+res+"";
			$.get(getUrl, function(data){
				se.parents('tr').find('.td_title_').css('display','block');
				se.parents('tr').find('.info_basic_content').find('.basic_option_co').remove();
				if(data==1){
					$('.tdt_sex').html('Male');
				}else{
					$('.tdt_sex').html('Female');
				}
			});
		}
	});
	// Event change marriage of user
	$('body').on('change', '.about_user_marriage', function (e) {
		var se = $(this);
		var res  = se.val();
		if(res){
			var getUrl = "/update_marriage?value_="+res+"";
			$.get(getUrl, function(data){
				se.parents('tr').find('.td_title_').css('display','block');
				se.parents('tr').find('.info_basic_content').find('.basic_option_co').remove();
				if(data==0){
					$('.tdt_marriage').html('Độc thân');
				}else{
					$('.tdt_marriage').html('Đã kết hôn');
				}
			});
		}
	});
	// Event click update phone
	$('body').on('click', '.abount_phone_bt', function (e) {
		var se = $(this);
		var phone = se.parents('.basic_option_co').find('.about_phone').val();
		if(phone){
			var getUrl = "/update_phone?value_="+phone+"";
			$.get(getUrl, function(data){
				$('.tdt_phone').html(data);
				se.parents('.basic_option_co').find('.close_input_basic_info').trigger('click');
			});
		}
	});
});
